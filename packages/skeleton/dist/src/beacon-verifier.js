import { observeBeaconSweep } from "./beacon-observe.js";
/** Deterministic verifier episode, like WO-009's current verifier. The host
 * alone holds the source/log/mounts; the evaluating role gets this finite capsule
 * and no tools, narrative, physical paths, key, or implementer evidence prose.
 */
export class MountedBeaconVerifier {
    options;
    constructor(options) {
        this.options = options;
    }
    dispatch(intent, candidates, driver, now) {
        if (intent.subject !== "candidates" ||
            this.options.request.audience !== "verifier")
            throw new Error("verifier episode subject/audience refused");
        const swept = observeBeaconSweep(driver.log, this.options.request, now, (log) => driver.restore(log), this.options.key ? { key: this.options.key } : {});
        if (!swept.authorized)
            return false;
        const input = {
            episodeId: "ep_beacon_verifier",
            candidatePaths: candidates.map(({ path }) => path),
            inventory: this.options.fixture.files.map(({ path, classification, referencedBy }) => ({
                path,
                classification,
                referenceCount: referencedBy.length,
            })),
            perception: { observations: swept.observations, groups: swept.groups },
        };
        // A detached JSON capsule is the actual input boundary, not a prose request
        // to ignore other fields on the executor's object or the host's log.
        const capsule = JSON.parse(JSON.stringify(input));
        return (this.options.evaluate ?? evaluateBeaconVerification)(capsule);
    }
}
export function evaluateBeaconVerification(input) {
    return (input.candidatePaths.length > 0 &&
        input.candidatePaths.every((path) => input.inventory.some((file) => file.path === path &&
            file.classification === "generated-stale" &&
            file.referenceCount === 0)));
}
