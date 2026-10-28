// Runtime and source scripts share one record format and implementation.
import * as records from "./temporary-root-records.mjs";
export function createFixtureRoot(prefix) {
    return records.createFixtureRoot(prefix);
}
export function createWorkerCapture(prefix) {
    return records.createWorkerCapture(prefix);
}
export function createScratchRoot(prefix) {
    return records.createScratchRoot(prefix);
}
export function removeTemporaryPath(path, options) {
    records.removeTemporaryPath(path, options);
}
export * from "./temporary-root-records.mjs";
