import { type CompiledFeedback, type FeedbackHandler } from "./feedback.js";
import type { AuthorityEnvelope, AuthorityGrant, CompiledProgram } from "./types.js";
/** Pure output policy; the host supplies its atomic marker operation.
 * Observation failures show the message; they never alter a permission decision.
 */
export declare function showHarnessAdvisory(sessionId: string | undefined, event: string, cause: string, claimMarker: (key: string) => boolean): boolean;
/** Read only the first content line, allowing blanks and one opening paste
 * fence. A later quoted dispatch never becomes the operator's instruction. */
export declare function harnessPromptLine(prompt: string | undefined): {
    text: string;
    index: number;
};
/** A dispatch may lead following direction after a semicolon or newline.
 * The worker opt-in is a selection, not part of the lifecycle action. */
export declare function harnessPromptIntent(prompt: string | undefined): string;
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
        readonly allow: boolean;
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
    readonly model: string;
    readonly effort: "low" | "medium" | "high" | "xhigh" | "max";
    readonly optIn?: boolean;
    readonly description?: string;
    readonly skills?: readonly string[];
    readonly body?: string;
}
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
}];
/** The shared instruction symlink carries every profile's residue on one line
 * per profile. Rule ids that share a reason are named together before it, so
 * a reason several rules share is printed once; the manifest keeps each item. */
export declare function mergeHarnessFragments(bundles: readonly HarnessBundle[]): string;
