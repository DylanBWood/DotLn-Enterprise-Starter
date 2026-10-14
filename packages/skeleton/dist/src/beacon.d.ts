import type { Event } from "@dotln/kernel";
import { type AuditActionClass, type L0ReceiptEntry } from "./audit.js";
import { BEACON_CODEBOOK } from "@dotln/beacons/beacon-codebook.mjs";
export { BEACON_CODEBOOK, encodeBeaconState, decodeBeaconSize, } from "@dotln/beacons/beacon-codebook.mjs";
export type BeaconProvenance = (typeof BEACON_CODEBOOK.provenances)[number];
export interface BeaconState {
    readonly codebookVersion: 1;
    readonly actionClass: AuditActionClass;
    readonly outcome: string;
    readonly refusalCount: number;
    readonly provenance: BeaconProvenance;
}
export interface BeaconScope {
    readonly workstreamId: string;
    readonly episodeId: string;
}
export interface BeaconProjectionRecord {
    readonly recordType: "beacon-projection";
    readonly codebookVersion: 1;
    readonly provenance: "host-projected";
    readonly refusalCount: number;
    readonly receipt: L0ReceiptEntry;
}
export interface BeaconClaimRecord extends BeaconState {
    readonly recordType: "beacon-claim";
    readonly provenance: "self-reported";
    readonly scope: BeaconScope;
    readonly actor: string;
    readonly claimedAt: number;
}
export type BeaconRecord = BeaconProjectionRecord | BeaconClaimRecord;
export type BeaconDecode = {
    readonly status: "decoded";
    readonly state: BeaconState;
} | {
    readonly status: "unknown-codebook";
    readonly codebookVersion: number;
} | {
    readonly status: "malformed";
};
export declare function deriveBeaconProjections(events: readonly Event[]): readonly BeaconProjectionRecord[];
export declare function beaconScope(record: BeaconRecord): BeaconScope;
export interface EncodedBeacon {
    readonly size: number;
    readonly mtimeMs: number;
    readonly content: string;
}
export declare function encodeBeacon(record: BeaconRecord): EncodedBeacon;
