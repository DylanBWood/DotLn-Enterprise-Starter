import { type CompiledFeedback, type FeedbackHandler } from "./feedback.js";
import type { AuthorityEnvelope, AuthorityGrant, CompiledProgram } from "./types.js";
/** Pure output policy; the host supplies its atomic marker operation.
 * Observation failures show the message; they never alter a permission decision.
 */
export declare function showHarnessAdvisory(sessionId: string | undefined, event: string, cause: string, claimMarker: (key: string) => boolean): boolean;
/** Read only the first content line, allowing blanks, the host's own elements
 * before the operator's text and one opening paste fence. Claude Code hands a
 * pasted message wrapped in a `pasted_content` element, whose opening tag is
 * skipped so the paste's own first line is read, and can write a slash
 * command's output block (`local-command-caveat`, `command-name`,
 * `command-message`, `command-args` and `local-command-stdout`) before the
 * operator's text, each skipped as a whole element. Nothing else about the
 * line changes: a later quoted dispatch never becomes the operator's
 * instruction, and a first content line that opens any other element, or a
 * known element whose closing tag never comes, is reported by that element's
 * name, so a changed host shape is read at the next pass instead of failing
 * silently; text after a closing tag on its own line is read. The function
 * is self-contained so the generated Codex hook embeds it. */
export declare function harnessPromptLine(prompt: string | undefined): {
    text: string;
    index: number;
    element: string | null;
};
/**
 * The control-language class of one operator message, read from its form and
 * never its meaning: a recognized prefix on the first content line decides
 * it; otherwise a message that ends in a question mark is a `question`, and
 * any other is `unclassified`. An interrogative opening alone ("Do not ...",
 * "Can you ...") makes no question, and a question may still ask for an
 * action. The function is self-contained so the generated Codex hook embeds
 * it with the line reader it is given.
 */
export declare function operatorMessageClass(prompt: string | undefined, promptLine?: typeof harnessPromptLine): {
    prefix: string | null;
    prefixLine: number | null;
    class: string;
    leadingElement?: string;
};
/**
 * The journal's phase for a dispatched session: a repair dispatch is the
 * repair phase, and otherwise each role names its own. Claude's hook and the
 * generated Codex hook both use it, the latter by embedding this
 * self-contained function, so their journal rows name a phase alike.
 */
export declare function harnessSessionPhase(session: {
    readonly intent?: string | null;
    readonly role?: string | null;
}): string;
/** What the hook adds for an unprefixed question; the role text carries the
 * same two pathways for hosts whose prompts are unhooked. */
export declare const OPERATOR_QUESTION_CONTEXT = "Operator question: read it as a smell. Your next message answers it one of two ways, with the evidence: why the current course is right, or what the question changes in your reading and what you will now do differently. Keep working either way; if the message also asks for an action, including to pause, stop or wait, do that, since a request is explicit whatever its grammar; it records no rule.";
/** A dispatch may lead following direction after a semicolon or newline.
 * The worker opt-ins are a selection, not part of the lifecycle action. */
export declare function harnessPromptIntent(prompt: string | undefined): string;
/**
 * The worker options a dispatch line names, by the host whose launches they
 * select: `fable` picks Claude's opt-in worker and `astra` Codex's. Only the
 * words that close a `resume:` or `planning:` line select, the way a pass's
 * label names its worker, and those that close the dispatch phrase before
 * the line's first semicolon, where a lifecycle phrase carries its suffix
 * ahead of direction; a model named mid-line as a topic selects nothing. A
 * version after the word and a joining "and" belong to a closing run. A line
 * that names neither selects both hosts' defaults, so each dispatch states
 * its own choice; any other message returns null and changes nothing. The
 * function is self-contained so the generated Codex hook embeds it with the
 * line reader it is given.
 */
export declare function harnessWorkerWords(prompt: string | undefined, promptLine?: typeof harnessPromptLine): {
    claude?: "fable";
    codex?: "astra";
} | null;
export type HarnessEvent = "PreToolUse" | "PostToolUse" | "Stop" | "UserPromptSubmit";
export interface HarnessObservation {
    readonly available: boolean;
    readonly evidence: string;
    readonly reason?: string;
}
export interface HarnessProfile {
    readonly kind?: "contributor-v1" | "target-worker-v1";
    readonly profileId: string;
    readonly harness: "claude-code" | "codex-cli" | "copilot-cli";
    readonly observedVersion: string;
    readonly tools?: Readonly<Record<string, "read" | "write" | "shell" | "spawn" | "retask" | "stop" | "interaction" | "desktop">>;
    readonly events: Readonly<Record<HarnessEvent, HarnessObservation>>;
    /** Separately witnessed native compaction hooks; never enables Claude hooks. */
    readonly codexContinuation?: HarnessObservation & {
        readonly observedVersion: string;
    };
    readonly skills: HarnessObservation & {
        readonly root: string;
        readonly format: "agent-skills";
    };
    readonly settings: HarnessObservation & {
        readonly path: string;
        readonly deny: boolean;
        /** Whether the settings file carries the publish helpers' allow rules. */
        readonly allow: boolean;
        /** Where the host's contract for those rules was read. */
        readonly allowEvidence?: string;
    };
    readonly instruction: HarnessObservation & {
        readonly path: string;
    };
    readonly refusal: "claude-command-json-v1" | "unavailable";
    readonly runtime: {
        readonly skeletonVersion: string;
        readonly boundaryContract: "feedback-v1";
        readonly snapshot?: string;
        /** Emit-time launchpad path; never serialized into a manifest or config. */
        readonly importRoot?: string;
        readonly targetId?: string;
        readonly files?: readonly {
            readonly path: string;
            readonly hash: string;
        }[];
    };
}
/** Harness target authority; deliberately outside the loadout-v1/kernel IR. */
export type OutsideWriteGrant = {
    readonly source: string;
} & ({
    readonly kind: "system-temp" | "session-scratch" | "host-scratchpad" | "main-intake" | "target-worktree" | "order-worktree";
} | {
    readonly kind: "operator-root";
    readonly root: string;
});
export interface RoleOutsideWriteGrants {
    readonly role: string;
    readonly grants: readonly (OutsideWriteGrant & {
        readonly originId: string;
        readonly authorityGrantId: string;
    })[];
}
export interface HarnessRole {
    readonly facetId: string;
    readonly name: string;
    readonly description: string;
    readonly intents: readonly string[];
    readonly procedure: readonly string[];
    readonly feedbackHandlers: readonly FeedbackHandler[];
    readonly outsideWriteGrants?: readonly OutsideWriteGrant[];
}
export type HarnessFacet = {
    readonly facetId: string;
    readonly kind: "permission-guard";
    readonly matchers: readonly {
        readonly effect: string;
        readonly deny: string;
    }[];
} | {
    readonly facetId: string;
    readonly kind: "prompt-fragment";
    readonly text: string;
} | ({
    readonly facetId: string;
    readonly kind: "role-procedure";
    readonly text: string;
    readonly outsideWriteGrants?: readonly OutsideWriteGrant[];
} & ({
    readonly roleName: string;
    readonly roleNames?: never;
} | {
    readonly roleNames: readonly string[];
    readonly roleName?: never;
}));
export interface HarnessWorker {
    readonly name: string;
    /** The host that launches it: a Claude agent type (the default) or a Codex
     * custom agent. */
    readonly host?: "claude" | "codex";
    readonly model: string;
    readonly effort: "low" | "medium" | "high" | "xhigh" | "max";
    readonly optIn?: boolean;
    /** How an opt-in worker's definition names the dispatch word that selects
     * it; every opt-in worker carries one. */
    readonly optInLabel?: string;
    readonly description?: string;
    readonly skills?: readonly string[];
    readonly body?: string;
}
/** No operator message is saved verbatim in committed text (the operator's
 * rule of 2026-11-07). Every role and every worker carries this sentence, and
 * the document gate compares the files a branch changes with the ignored
 * captures. */
export declare const operatorWordsRule = "Committed text (a document, record or source file) paraphrases the operator and cites the ignored intake capture by its SHA-256; the operator's words stay in ignored intake. A quotation is written only when the operator asks in the session to save that message, as an `operatorQuote` with `captureSha256` and `requestedIn` (the request's capture), or where the instance elects `features.verbatim-operator-words`.";
/** What a worker never reads or prints: the ignored local lane holds session
 * journals, ledgers and the private terms list, and a commit header carries an
 * author's name and address. Every role and every worker carries both. */
export declare const workerNoPrintRules = "A worker never reads or prints the contents of `docs/control/local/` (journals, ledgers, the terms list, the reviews lane beyond the report it was given) and never prints a commit header or an author line: `git log` takes a format naming only the hash and subject (`--format='%h %s'`), and `git show` takes `--format=` so it prints no header.";
/** The generated Markdown and print-session transport consume one worker contract. */
export declare function workerSpecification(worker: HarnessWorker): {
    name: string;
    description: string;
    model: string;
    effort: "high" | "low" | "max" | "medium" | "xhigh";
    skills: readonly string[];
    prompt: string;
};
/** Separate target input. It never extends or changes the loadout-v1 preimage. */
export interface HarnessProgram {
    readonly contractVersion: "harness-v1";
    readonly loadout: CompiledProgram;
    readonly roles: readonly HarnessRole[];
    readonly facets: readonly HarnessFacet[];
    readonly correctionToken: string | null;
    /** Instance election, supplied by the emitter; the compiler reads no files. */
    readonly desktopControl?: boolean;
    /** Compatibility for programs declaring one default worker. */
    readonly worker?: HarnessWorker;
    readonly workers?: readonly HarnessWorker[];
}
/** Host tool namespaces that act in the operator's desktop or signed-in browser.
 * The hook and host settings share this inventory; unrelated MCP tools keep
 * their existing classification. */
export declare const desktopControlToolPrefixes: readonly ["mcp__computer-use__", "mcp__remote-devices__computer_", "enable__mcp__remote-devices__computer", "mcp__claude-in-chrome__", "mcp__Claude_Browser__", "mcp__remote-devices__Claude_Browser__", "enable__mcp__claude-in-chrome", "enable__mcp__remote-devices__Claude_Browser"];
export declare const desktopControlSkills: readonly ["anthropic-skills:computer-use", "anthropic-skills:chrome-browser", "anthropic-skills:built-in-browser", "claude-in-chrome"];
/** Each listed skill under every name the host documents for it: a skill
 * synced from claude.ai as `anthropic-skills:<name>` also answers to its short
 * `<name>` and to the `<name>:<name>` plugin form Claude Desktop delivers it
 * as. The hook classifies all of them; the host's parameter rule below covers
 * any alias or display name besides. */
export declare function desktopControlSkillNames(skill: string): readonly string[];
export declare const desktopControlDenyRules: string[];
export interface HarnessOrigin {
    readonly ids: readonly string[];
    readonly loadoutId: string;
    readonly semanticHash: string;
}
export interface HarnessFile {
    readonly path: string;
    readonly contents: string;
    readonly origin: HarnessOrigin;
    readonly rung: number;
}
export interface HarnessResidue {
    readonly originId: string;
    readonly reason: string;
    readonly missingCapabilities: readonly string[];
    readonly text?: string;
}
export interface HarnessBundle {
    readonly contractVersion: "harness-v1";
    readonly files: readonly HarnessFile[];
    readonly manifest: {
        readonly contractVersion: "harness-v1";
        readonly compilerPackageVersion: string;
        readonly feedbackPolicyHash: string;
        readonly grants: readonly AuthorityGrant[];
        readonly outsideWriteGrants?: readonly RoleOutsideWriteGrants[];
        readonly authorityGrantRegistryHash: string | null;
        readonly profile: HarnessProfile;
        readonly loadout: {
            readonly id: string;
            readonly semanticHash: string;
            readonly targetHash: string;
        };
        readonly files: readonly {
            readonly path: string;
            readonly hash: string;
            readonly origin: HarnessOrigin;
            readonly rung: number;
        }[];
        readonly origin: HarnessOrigin;
    };
    readonly residue: {
        readonly items: readonly HarnessResidue[];
        readonly bytes: number;
        readonly fragment: string;
    };
}
export declare function assertOutsideWriteGrants(value: unknown): asserts value is readonly OutsideWriteGrant[];
/** Exact effects keep the existing envelope's GRANTS projection authoritative. */
export declare const outsideWriteEffect: (grant: OutsideWriteGrant) => string;
export declare const HARNESS_START = "<!-- dotln-harness:start -->";
export declare const HARNESS_END = "<!-- dotln-harness:end -->";
export declare function assertHarnessProfile(profile: HarnessProfile): void;
/** Pure, deterministic target lowering. Hook predicates stay in feedbackBoundary. */
export declare function lowerToHarness(program: HarnessProgram, feedback: CompiledFeedback, envelope: AuthorityEnvelope, profile: HarnessProfile): HarnessBundle;
export declare function verifyHarnessBundle(bundle: HarnessBundle): boolean;
/** The launchpad's own publish helpers by their node spelling: the update
 * and planning publishes (WO-246) and the target publish (WO-257). Claude
 * Code's auto-mode page says a narrow Bash allow rule is resolved before its
 * classifier and a wildcarded interpreter is suspended; that a rule naming one
 * script after node counts as narrow is an inference, never probed live. No
 * rule names `git push` or `gh`, because one for either would admit every push
 * or gh call unjudged. Copilot's shared settings file carries the same bytes,
 * and a release that changes them says a new session reads the emitted
 * settings. */
export declare const PUBLISH_HELPER_ALLOW_RULES: readonly ["Bash(node scripts/launchpad.mjs update --publish *)", "Bash(node scripts/refute-plan.mjs publish *)", "Bash(node scripts/worktree.mjs publish *)"];
/** Each enforced class owns one row, so the count and provenance follow it. */
export declare const HARNESS_REFUSALS: readonly [{
    readonly id: "writer";
    readonly source: "WO-135";
    readonly clause: "reserves one writer per worktree on any branch, including main";
}, {
    readonly id: "gate";
    readonly source: "WO-135";
    readonly clause: "refuses writes to gate inputs or the success record during a live gate, admitting only the active order's own evidence, verification and final-review directories at the default document roots during a product gate";
}, {
    readonly id: "planning";
    readonly source: "WO-135";
    readonly clause: "on planning/ branches refuses repository writes outside docs/ and root Markdown";
}, {
    readonly id: "subagents";
    readonly source: "WO-139";
    readonly clause: "refuses observable subagent admissions beyond docs/control/budgets.json subagentCap (default 20; null disables)";
}, {
    readonly id: "outside-write";
    readonly source: "WO-144";
    readonly clause: "refuses known outside-project write destinations without a containing root granted by the active role or equipped support";
}, {
    readonly id: "dispatch-bound";
    readonly source: "WO-234";
    readonly clause: "refuses a complete gate, bounded probe or worker launch past the dispatch bound, naming analysis: and the operator's accept-overrun route";
}, {
    readonly id: "desktop-control";
    readonly source: "WO-251";
    readonly clause: "refuses desktop control and the operator's own browser sessions unless dotln.config.json elects features.desktop-control; an election still requires the operator's explicit request in the session, and browser verification uses the Playwright MCP in a browser the session launches or the project's browser tests";
}, {
    readonly id: "worker-gate";
    readonly source: "WO-250";
    readonly clause: "refuses a review worker's test-runner gate";
}, {
    readonly id: "gh-repository";
    readonly source: "WO-246";
    readonly clause: "refuses a gh pr or gh issue command naming no repository in a clone whose origin and upstream differ and whose gh default is unset";
}];
/** The shared instruction symlink carries every profile's residue on one line
 * per profile. Rule ids that share a reason are named together before it, so
 * a reason several rules share is printed once; the manifest keeps each item. */
export declare function mergeHarnessFragments(bundles: readonly HarnessBundle[]): string;
