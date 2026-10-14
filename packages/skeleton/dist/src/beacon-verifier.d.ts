import type { ObserveIntent } from "@dotln/kernel";
import type { BeaconSweepRequest } from "./control-beacon.js";
import type { BeaconProvenance } from "@dotln/beacons/beacon-provenance.mjs";
import type { PerceptionRead } from "./beacon-perception.js";
import type { Candidate, FixtureTree, LiveReactorDriver, ScenarioVerifier } from "./scenario.js";
export interface BeaconVerifierInput {
    readonly episodeId: "ep_beacon_verifier";
    readonly candidatePaths: readonly string[];
    readonly inventory: readonly {
        readonly path: string;
        readonly classification: string;
        readonly referenceCount: number;
    }[];
    readonly perception: PerceptionRead;
}
/** Deterministic verifier episode, like WO-009's current verifier. The host
 * alone holds the source/log/mounts; the evaluating role gets this finite capsule
 * and no tools, narrative, physical paths, key, or implementer evidence prose.
 */
export declare class MountedBeaconVerifier implements ScenarioVerifier {
    private readonly options;
    constructor(options: {
        readonly request: BeaconSweepRequest;
        readonly fixture: FixtureTree;
        readonly key?: BeaconProvenance;
        readonly evaluate?: (input: BeaconVerifierInput) => boolean;
    });
    dispatch(intent: ObserveIntent, candidates: readonly Candidate[], driver: LiveReactorDriver, now: number): boolean;
}
export declare function evaluateBeaconVerification(input: BeaconVerifierInput): boolean;
