import { type SnapshotIndex, type VerificationTask } from "@dotln/compiler";
/** Read only a WO-054 host-produced sealed mount. The existing validator owns
 * its inventory, bounds and seal; this module neither creates nor widens it.
 * Unavailable/refused snapshots have no index (deriveSurfaces accepts null).
 */
export declare function readSnapshotIndex(capsule: VerificationTask, snapshotPath: string): SnapshotIndex;
