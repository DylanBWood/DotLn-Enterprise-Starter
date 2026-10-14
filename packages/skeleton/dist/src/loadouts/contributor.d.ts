import { type AuthorityGrant, type AuthorityEnvelope, type CompiledProgram, type HarnessProfile, type HarnessProgram, type HarnessRole, type LoadoutGraph, type PresencePolicy, type PresenceNarrowing } from "@dotln/compiler";
import { type ExecutorSupportSwitches } from "./executor-supports.js";
/** Operator-authorized policy input; never inferred from a submitted support. */
export declare const contributorOutsideAuthority: readonly AuthorityGrant[];
export declare const contributorSupportIds: string[];
export declare const defaultContributorSupportIds: string[];
export type ContributorSupportSwitches = ExecutorSupportSwitches & Readonly<{
    "process-cost"?: boolean;
    "goal-alignment"?: boolean;
}>;
export declare const contributorRoles: readonly HarnessRole[];
export declare const contributorEnvelope: AuthorityEnvelope;
/** The Contributor build's absence policy is one read-only pulse: while the
 * operator is away, ask whether the running work is still inside its contract
 * and on the vision's theses. It changes nothing; a drift holds the rest.
 * The surface and both ceilings are zero because the judge only reads. */
export declare const CONTRIBUTOR_MISSION_POLICY = "contributor.mission-check";
export declare const CONTRIBUTOR_MISSION_PHASE = "mission-check";
export declare const CONTRIBUTOR_MISSION_SURFACE = "contributor.mission";
export declare const contributorPresence: readonly PresencePolicy[];
export declare const contributorLoadout: LoadoutGraph;
/** The current Contributor graph without WO-099's mission-check cadence.
 * The authority evidence tool restores historical vocabulary before comparing
 * the frozen WO-042 identity; filed receipts are never edited to match a later
 * build. Both graphs compile in that one evidence run. */
export declare const contributorLoadoutBeforeMissionCheck: LoadoutGraph;
/** Keep the original saved build intact; equipment creates a new build. */
export declare function contributorWithSupports(supportIds?: readonly string[]): LoadoutGraph;
export declare function contributorRolesFor(program: CompiledProgram): readonly HarnessRole[];
export interface ContributorBuildOverlay {
    readonly identity?: LoadoutGraph["identity"];
    readonly narrow?: PresenceNarrowing;
    readonly grants?: readonly AuthorityGrant[];
}
export declare const contributorProgram: (supportIds?: readonly string[], overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorConfiguredProgram: (switches?: ContributorSupportSwitches, overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorProfiles: readonly HarnessProfile[];
/** Bounded writing-worker observations; no Contributor lifecycle or skills. */
export declare const targetWorkerProfiles: readonly HarnessProfile[];
