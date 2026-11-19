import { type AuthorityGrant, type AuthorityEnvelope, type CompiledFeedback, type CompiledProgram, type FeedbackUnit, type HarnessProfile, type HarnessProgram, type HarnessRole, type LoadoutGraph, type PresencePolicy, type PresenceNarrowing } from "@dotln/compiler";
import { type ExecutorSupportSwitches } from "./executor-supports.js";
import { workerTable } from "../worker-catalog.mjs";
/** What the emitter supplies of an instance's worker choices: the named
 * workers of its configuration and the rows of its models file, as the
 * configuration module judged them. The worker table reads them over the
 * kit's own (`worker-catalog.mjs`); this loadout names no model. */
export type ContributorWorkersDeclared = NonNullable<Parameters<typeof workerTable>[0]>;
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
    readonly consistency: "The consistency reviewer solely verifies write-backs, dependencies and versions: product and operational docs, decisions, indexes, cross-references, package and lockfile versions, release metadata, generated artifacts and installed guidance, test dependencies, fixture inputs/manifests/pins, generated test baselines and evidence-source declarations. Give that reviewer the corresponding source and generated surfaces. Trace each changed document, emitted output and helper to every consuming test by path, symbol, old/new text and byte/count pins; follow transitive imports and fixture copy/export manifests. Check oracle selectors, command/field inventories, runtime setup, gate environment and timing assumptions. Use relevant retained gate failures to search for the same failure shapes. Preserve intentional contract pins; update expectations from requirements, replacing incidental prose coupling with semantic assertions. Report concrete producer/consumer pairs, their disposition and unsearched boundaries in a `Traced consumers` table (changed contract, consumer, command, result) with a generated pages row and a fixture manifests row, each naming the command run; a consistency report without that table is not recorded.";
};
/** What a recheck and the last combined round admit; it is what ends them. */
export declare const reviewAdmissionRule = "a new finding is admitted only when it breaks an acceptance criterion or a behavior `main` had, and any other new finding is recorded in the handoff, not fixed";
/** What a finding names to block, in every round of every ladder: the
 * verifier's supported-input rule, stated to the reviewer in its brief and to
 * the executor in its role text. */
export declare const reviewBlockingRule = "a finding blocks when it names the acceptance criterion it fails and an input the kit's writers or an author's ordinary text produce, or a leak (a copy, a broken link or a wrong pass admitted), or behavior `main` had with the probe that shows it; anything else is reported as a recorded finding";
/** The roles a shared rule can bind: every role but the router, whose root
 * is written whole below and is no composition of these. */
export declare const SHARED_RULE_ROLES: readonly ["executor", "verifier", "reviewer", "release-close", "planner", "refuter"];
export type SharedRuleRole = (typeof SHARED_RULE_ROLES)[number];
/** Whose a rule is. A `platform` rule says how a kit command, phrase,
 * record, file, bound or hook works: a session needs it to operate the
 * lifecycle, and every build carries it. An `author` rule says how the
 * kit's author wants work conducted: no kit mechanism needs the sentence,
 * and an instance's owner removes it, or all of them, in the build overlay
 * (ADR-0006, decisions 1 and 3). */
export type RuleLayer = "platform" | "author";
/** A shared rule: text that several roles' roots hold, under an identifier,
 * with the roles it binds and the layer it belongs to. A role's emitted
 * root holds the rules that name it, each whole and once, and no other
 * shared rule. A rule names a role when that role's procedure reaches the
 * command, the phase or the host the rule governs; the reason for each
 * role, kept or left out, is a cell of the rule-by-role table, which an
 * order that adds or edits a record changes with it (WO-276, Part F). A
 * rule is never reworded for one role. `also` names what carries the rule
 * besides the role's text. */
export interface SharedRule {
    readonly id: string;
    readonly layer: RuleLayer;
    readonly roles: readonly SharedRuleRole[];
    readonly text: string;
    readonly also?: string;
}
export declare const browserVerificationGuidance = "Browser verification uses a browser the session launches: inspect structured state, then the DOM and accessibility tree through the Playwright MCP snapshot, then network and event data, then take a screenshot and read it as an image, or use the project's own browser tests; desktop control (the operator's screen, clicks and typing outside that browser) and the operator's own browser sessions (Claude in Chrome or the desktop app's browser pane) are refused unless dotln.config.json elects features.desktop-control (off by default) and the operator explicitly requests their use in this session.";
/** The parent's steps of a refutation, as the refuter's root states them.
 * `npm run plan -- refute` prints them beside the prompt, so a planning pass
 * reaches its refutation by that command and loads no second skill. */
export declare const refutationParentSteps: readonly ["Resolve cwd and Git root. The parent coordinates one fresh background refuter without inherited conversation (Codex: spawn_agent with fork_turns none; Claude: a fresh background agent). Give it only the canonical prompt, its result schema and the shared goal card; no planner narrative, prior receipts or other subject preread. The parent remains the sole repository writer. A worker already given that prompt judges it directly; it does not spawn another refuter.", "Run `npm run plan -- refute` for planning: refute, or add `--scope full` for planning: refute full; --direct remains an alias. The helper verifies committed/workspace equality and prints the canonical prompt and closed JSON schema. Pass scope judges changed orders and sequence; other verdicts carry by hash. The worker returns its frozen JSON and a truthful single-line statement of at most 4000 characters to the parent, using scratch files if needed, with no repository or Git writes. While it runs, complete independent closeout work without changing the frozen subject.", "The parent saves the worker's result and statement in ignored local files and runs `npm run plan -- receipt <result.json> --statement <statement.txt> [--dispositions <file>]`. The helper validates, screens, files and commits the immutable pair and runs the plan check. Preserve aligned, aligned-with-findings or observed-evidence misaligned verdicts. Hypotheticals are known issues with reopening observations. Record criterion-bound dispositions using `npm run plan -- dispose <receipt-id> <hold-id> <reason>`; they discharge holds without another judgment. Apply only operator-authorized overrides. No third-hold or duration refusal applies. Repair formatting with the same worker without rerolling the judgment. Report scope, elapsed time and actual result. Use no ad hoc receipt script. External `refute --transport <name>` requires an explicit operator request; do not fall back to it after a worker failure. If background workers are unavailable, report that limitation and preserve the pending review."];
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
/** Every shared rule, in the order a root holds them: the operator's
 * controls, the rules above, the session's boundaries and the corrections. */
export declare const sharedRules: readonly SharedRule[];
/** The name an overlay's `equip` and `unequip` give every author-layer
 * unit and rule at once. */
export declare const AUTHOR_LAYER = "author";
/** A feedback unit's layer, read from the scope it declares: a unit of the
 * personal profile is the author's (product 01's layer labels). */
export declare const feedbackUnitLayer: (unit: Pick<FeedbackUnit, "scope">) => RuleLayer;
/** One row for each rule a build puts into a session's instructions beyond
 * a role's own steps: a feedback unit or a shared role rule, with whose it
 * is, how it is enforced and, where it also refuses, the stop that refusal
 * is. */
export interface ContributorRule {
    readonly id: string;
    readonly kind: "unit" | "rule";
    readonly layer: RuleLayer;
    readonly enforcement: string;
    readonly stop?: string;
}
export declare const contributorRules: readonly ContributorRule[];
/** The units and rules a build leaves out. */
export interface RuleSelection {
    readonly units: readonly string[];
    readonly rules: readonly string[];
}
/** What an overlay's `equip` and `unequip` leave out of the author's layer.
 * `author` names every author-layer unit and rule; a single id is the more
 * specific word, so `unequip: ["author"]` beside `equip: ["durations"]`
 * leaves out all of them but that one. Only an author-layer id selects
 * anything here: a support switch, a platform rule and an id this build
 * does not hold leave every rule in, and the overlay's reader says which
 * each was. */
export declare function contributorRuleSelection(overlay?: {
    readonly equip?: readonly string[];
    readonly unequip?: readonly string[];
}): RuleSelection;
/** The feedback program a build compiles: the units it equips. A program
 * that leaves none out compiles the ten, as before a unit could be left
 * out. */
export declare const contributorFeedback: (program?: Pick<HarnessProgram, "unequipped">) => CompiledFeedback;
/** A program less the author's units and rules a selection leaves out. A
 * role keeps its numbered steps and every platform rule; it loses the
 * handler of a unit left out, so that no root names the unit, and the
 * sentence of a rule left out, wherever a root holds it (the router's holds
 * a few inline). The program names what it leaves out, for the bundle's
 * record and the hooks; a selection that leaves nothing out returns the
 * program it was given. */
export declare function withoutRules(program: HarnessProgram, selection: RuleSelection): HarnessProgram;
export declare function contributorRolesFor(program: CompiledProgram): readonly HarnessRole[];
export interface ContributorBuildOverlay {
    readonly desktopControl?: boolean;
    readonly planFirst?: boolean;
    /** Whether the root the build is emitted for is an exported instance,
     * supplied by the emitter. Its Clean Room section is its owner's own
     * text, where core's is a locked floor, and the line every instruction
     * block carries about that section says which. */
    readonly instance?: boolean;
    /** The instance's named workers and model rows, supplied by the emitter;
     * the worker definitions carry what its table resolves to. */
    readonly workers?: ContributorWorkersDeclared;
    readonly identity?: LoadoutGraph["identity"];
    readonly narrow?: PresenceNarrowing;
    readonly grants?: readonly AuthorityGrant[];
    /** The overlay's lists as written. The support switches among them are
     * the caller's to apply; the author-layer units and rules, and `author`,
     * are read here (`contributorRuleSelection`). */
    readonly equip?: readonly string[];
    readonly unequip?: readonly string[];
}
export declare const contributorProgram: (supportIds?: readonly string[], overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorConfiguredProgram: (switches?: ContributorSupportSwitches, overlay?: ContributorBuildOverlay) => HarnessProgram;
export declare const contributorProfiles: readonly HarnessProfile[];
/** Bounded writing-worker observations; no Contributor lifecycle or skills. */
export declare const targetWorkerProfiles: readonly HarnessProfile[];
