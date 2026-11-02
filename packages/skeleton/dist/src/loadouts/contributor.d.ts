import { type AuthorityGrant, type AuthorityEnvelope, type CompiledProgram, type HarnessProfile, type HarnessProgram, type HarnessRole, type LoadoutGraph, type PresencePolicy, type PresenceNarrowing } from "@dotln/compiler";
import { type ExecutorSupportSwitches } from "./executor-supports.js";
export declare const contributorWorkerPins: {
    readonly claude: {
        readonly model: "claude-opus-5-5";
        readonly effort: "xhigh";
    };
    readonly codex: {
        readonly model: "gpt-6.1-sol";
        readonly effort: "max";
    };
};
/** Independent verification runs at this effort on every host (product 07). */
export declare const contributorVerifierEffort = "xhigh";
/** Operator-authorized policy input; never inferred from a submitted support. */
export declare const contributorOutsideAuthority: readonly AuthorityGrant[];
export declare const contributorSupportIds: string[];
export declare const defaultContributorSupportIds: string[];
export type ContributorSupportSwitches = ExecutorSupportSwitches & Readonly<{
    "process-cost"?: boolean;
    "goal-alignment"?: boolean;
}>;
/** The three independent reviewers' briefs. The executor's role text and the
 * kit's review helper (`npm run worker -- review`) render these same strings,
 * so a review launched through either route reads one brief. */
export declare const reviewerBriefs: {
    readonly criteria: "The criteria adversary seeks concrete counterexamples, failed acceptance criteria and missing regression tests; exclude design cleanup.";
    readonly design: "The design improver seeks simpler structure, coupling, error handling and six-month maintainability; exclude criterion verdicts and adversarial test design.";
    readonly consistency: "The consistency reviewer solely verifies write-backs, dependencies and versions: product and operational docs, decisions, indexes, cross-references, package and lockfile versions, release metadata, generated artifacts and installed guidance, test dependencies, fixture inputs/manifests/pins, generated test baselines and evidence-source declarations. Give that reviewer the corresponding source and generated surfaces. Trace each changed document, emitted output and helper to every consuming test by path, symbol, old/new text and byte/count pins; follow transitive imports and fixture copy/export manifests. Check oracle selectors, command/field inventories, runtime setup, gate environment and timing assumptions. Use relevant retained gate failures to search for the same failure shapes. Preserve intentional contract pins; update expectations from requirements, replacing incidental prose coupling with semantic assertions. Report concrete producer/consumer pairs, their disposition and unsearched boundaries.";
};
/** What a recheck and the last combined round admit; it is what ends them. */
export declare const reviewAdmissionRule = "a new finding is admitted only when it breaks an acceptance criterion or a behavior `main` had, and any other new finding is recorded in the handoff, not fixed";
export declare const browserVerificationGuidance = "Browser verification uses a browser the session launches: inspect structured state, then the DOM and accessibility tree through the Playwright MCP snapshot, then network and event data, then take a screenshot and read it as an image, or use the project's own browser tests; desktop control (the operator's screen, clicks and typing outside that browser) and the operator's own browser sessions (Claude in Chrome or the desktop app's browser pane) are refused unless dotln.config.json elects features.desktop-control (off by default) and the operator explicitly requests their use in this session.";
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
    readonly desktopControl?: boolean;
    readonly identity?: LoadoutGraph["identity"];
    readonly narrow?: PresenceNarrowing;
    readonly grants?: readonly AuthorityGrant[];
}
export declare const contributorProgram: (supportIds?: readonly string[], overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorConfiguredProgram: (switches?: ContributorSupportSwitches, overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorProfiles: readonly HarnessProfile[];
/** Bounded writing-worker observations; no Contributor lifecycle or skills. */
export declare const targetWorkerProfiles: readonly HarnessProfile[];
