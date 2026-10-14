import { projectAuditEvents, } from "./audit.js";
import { encodeBeaconState, } from "@dotln/beacons/beacon-codebook.mjs";
export { BEACON_CODEBOOK, encodeBeaconState, decodeBeaconSize, } from "@dotln/beacons/beacon-codebook.mjs";
export function deriveBeaconProjections(events) {
    const episodes = new Map();
    const receipts = projectAuditEvents(events).receipt.receipts;
    for (const receipt of receipts) {
        if (receipt.scope.episodeId === undefined)
            continue;
        const key = JSON.stringify([
            receipt.scope.workstreamId,
            receipt.scope.episodeId,
        ]);
        const denied = receipt.actionClass === "authority-decision" &&
            receipt.outcome === "denied";
        const refusalCount = Math.min(3, (episodes.get(key)?.refusalCount ?? 0) + Number(denied));
        episodes.set(key, {
            recordType: "beacon-projection",
            codebookVersion: 1,
            provenance: "host-projected",
            refusalCount,
            receipt,
        });
    }
    return [...episodes.values()];
}
export function beaconScope(record) {
    const scope = record.recordType === "beacon-projection"
        ? record.receipt.scope
        : record.scope;
    if (!scope.workstreamId || !scope.episodeId)
        throw new Error("a beacon requires a workstream and episode");
    return { workstreamId: scope.workstreamId, episodeId: scope.episodeId };
}
export function encodeBeacon(record) {
    beaconScope(record);
    const host = record.recordType === "beacon-projection";
    if (record.provenance !== (host ? "host-projected" : "self-reported"))
        throw new Error("beacon record and provenance disagree");
    const state = {
        codebookVersion: record.codebookVersion,
        actionClass: host ? record.receipt.actionClass : record.actionClass,
        outcome: host ? record.receipt.outcome : record.outcome,
        refusalCount: record.refusalCount,
        provenance: record.provenance,
    };
    const size = encodeBeaconState(state);
    const mtimeMs = host ? record.receipt.time : record.claimedAt;
    if (!Number.isSafeInteger(mtimeMs) || mtimeMs < 0 || mtimeMs > 8.64e15)
        throw new Error("beacon mtime must be a representable nonnegative integer millisecond");
    const json = JSON.stringify(record);
    const bytes = new TextEncoder().encode(json).length;
    if (bytes >= size)
        throw new Error("beacon record exceeds its codeword size");
    return { size, mtimeMs, content: json + "\n".repeat(size - bytes) };
}
