import { lstatSync } from "node:fs";
import { join, resolve } from "node:path";
import { canonicalDestination } from "@dotln/beacons/beacon-io.mjs";
import { observeBeaconMetadata } from "@dotln/beacons/control-beacon-fs.mjs";
import { decodeGroupBeaconSize } from "@dotln/beacons/control-codebook.mjs";
/** No readdir, readFile, readlink or xattr API. The host mount record supplies
 * the complete finite address set even in a search-only directory.
 */
export function readMountedBeacons(profile, senses, key) {
    const observations = [];
    const groups = [];
    for (const mount of profile.mounts) {
        if (mount.family === "phase-group" && !senses.includes("composition"))
            continue;
        if (canonicalDestination(mount.path) !== resolve(mount.path) ||
            !lstatSync(mount.path).isDirectory())
            throw new Error("beacon mount changed since provisioning");
        for (const address of mount.addresses) {
            const observed = observeBeaconMetadata(join(mount.path, address), `${mount.mountId}:${address}`);
            if (mount.family === "phase-group") {
                groups.push({
                    ...observed,
                    decoded: observed.size === null
                        ? { status: "absent" }
                        : decodeGroupBeaconSize(BigInt(observed.size)),
                });
            }
            else {
                const state = observed.decoded.status === "decoded"
                    ? observed.decoded.state
                    : undefined;
                observations.push({
                    ...observed,
                    provenanceCheck: !state
                        ? "not-applicable"
                        : state.codebookVersion !== 3
                            ? "unauthenticated-legacy"
                            : (key?.check(state, address) ??
                                "unverifiable-provenance"),
                });
            }
        }
    }
    return {
        observations,
        groups: senses.includes("composition") ? groups : "not-sensed",
    };
}
