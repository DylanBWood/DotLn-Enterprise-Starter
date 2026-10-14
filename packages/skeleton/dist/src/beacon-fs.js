import { createHash } from "node:crypto";
import { lstatSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { validateBeaconDirectory, writeBeaconFile, } from "@dotln/beacons/beacon-io.mjs";
export { validateBeaconDirectory } from "@dotln/beacons/beacon-io.mjs";
import { beaconScope, decodeBeaconSize, deriveBeaconProjections, encodeBeacon, } from "./beacon.js";
// Only producer identity and scope affect the address. No status/version digits.
export function beaconAddress(record) {
    const producer = record.recordType === "beacon-projection"
        ? ["host"]
        : ["executor", record.actor];
    return (createHash("sha256")
        .update(JSON.stringify([producer, beaconScope(record)]))
        .digest("hex") + ".beacon");
}
const emit = (directory, record) => {
    const encoded = encodeBeacon(record);
    writeBeaconFile(directory, beaconAddress(record), encoded, {
        maxLogicalBytes: 65536n,
        sparse: false,
        blockBytes: 4096n,
    });
};
export function createBeaconWriter(directory, repository) {
    const destination = validateBeaconDirectory(directory, repository);
    return {
        directory: destination,
        project(events) {
            const records = deriveBeaconProjections(events);
            // Check the complete batch before emitting its first file. Atomicity is per file.
            for (const record of records)
                encodeBeacon(record);
            for (const record of records)
                emit(destination, record);
        },
        claim(record) {
            if (record.recordType !== "beacon-claim" ||
                record.provenance !== "self-reported")
                throw new Error("the executor channel accepts self-reported claims only");
            emit(destination, record);
        },
    };
}
export function sweepBeacons(directory) {
    return readdirSync(directory)
        .flatMap((address) => {
        try {
            // lstat is the non-following metadata operation: a symlink cannot lend its target's state.
            const stat = lstatSync(join(directory, address), { bigint: true });
            return [
                {
                    address,
                    size: stat.size,
                    mtimeNs: stat.mtimeNs,
                    decoded: stat.isFile()
                        ? decodeBeaconSize(stat.size)
                        : { status: "malformed" },
                },
            ];
        }
        catch (error) {
            if (error.code === "ENOENT")
                return [];
            throw error;
        }
    })
        .sort((a, b) => a.size < b.size
        ? -1
        : a.size > b.size
            ? 1
            : a.address < b.address
                ? -1
                : a.address > b.address
                    ? 1
                    : 0);
}
export function renderConstellation(observations) {
    return [
        "BEACON CONSTELLATION (metadata only; size order)",
        "bytes | mtime (UTC) | state | refusals | provenance | codebook | address",
        ...observations.map(({ address, size, mtimeNs, decoded }) => {
            const prefix = `${size} | ${new Date(Number(mtimeNs / 1000000n)).toISOString()}`;
            if (decoded.status === "malformed")
                return `${prefix} | malformed | — | — | — | ${address}`;
            if (decoded.status === "unknown-codebook")
                return `${prefix} | unknown-codebook | — | — | ${decoded.codebookVersion} | ${address}`;
            const state = decoded.state;
            return `${prefix} | ${state.actionClass}/${state.outcome} | ${state.refusalCount === 3 ? "3+" : state.refusalCount} | ${state.provenance} | ${state.codebookVersion} | ${address}`;
        }),
    ].join("\n");
}
