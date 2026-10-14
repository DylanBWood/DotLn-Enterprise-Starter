export { validateBeaconDirectory } from "@dotln/beacons/beacon-io.mjs";
import type { Event } from "@dotln/kernel";
import { type BeaconClaimRecord, type BeaconDecode, type BeaconRecord } from "./beacon.js";
export declare function beaconAddress(record: BeaconRecord): string;
export declare function createBeaconWriter(directory: string, repository: string): {
    directory: string;
    project(events: readonly Event[]): void;
    claim(record: BeaconClaimRecord): void;
};
export interface BeaconObservation {
    readonly address: string;
    readonly size: bigint;
    readonly mtimeNs: bigint;
    readonly decoded: BeaconDecode;
}
export declare function sweepBeacons(directory: string): readonly BeaconObservation[];
export declare function renderConstellation(observations: readonly BeaconObservation[]): string;
