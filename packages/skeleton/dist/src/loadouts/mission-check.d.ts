import { type LoadoutGraph } from "@dotln/compiler";
import { Cadence } from "@dotln/kernel";
/** The refuter judges planning passes; this judges running work. Same read-only
 * shape, a different subject. */
export declare const MISSION_CHECK_QUESTIONS: readonly ["Does the observed diff stay inside the contract's declared surfaces?", "Does any clause of the contract now read differently from the pinned capsule?", "Does the work in this diff contradict a vision thesis or an exclusion?", "Does a recent decision commit the session to something the contract excludes?"];
/** The judge reads the capsule it was handed and returns a judgment through the
 * transport. It needs no other effect, so the Contributor build can host the
 * phase inside its existing base authority rather than widening it. */
export declare const MISSION_CHECK_ALLOWED: readonly ["repo.read"];
export declare const MISSION_CHECK_DENIED: readonly ["repo.write*", "git.mutate*", "remote.*", "settings.*", "decision.*", "decision.edit"];
export declare const MISSION_CHECK_WORK_ORDER_ID = "wo_mission_check";
export declare function missionCheckLoadout(expiresAt: number): LoadoutGraph;
export declare function compileMissionCheck(revision: string, dispatchedAt: number): {
    ok: true;
    program: import("@dotln/compiler").CompiledProgram;
    semanticHash: string;
    artifactIdentity: import("@dotln/compiler").ArtifactIdentityV1;
    diagnostics: readonly [];
    cadence: Cadence.Once;
};
