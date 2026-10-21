import type { DecodeResult } from "@dotln/kernel";
import { type AuthorityEnvelope, type CompiledFeedback, type CorrectionState, type HarnessEvent, type RoleOutsideWriteGrants, type AuthorityGrant } from "@dotln/compiler";
import { gateTreeHash } from "./gate-evidence.mjs";
import { type FeedbackBoundaryRequest, type feedbackBoundary } from "./feedback-boundary.js";
export { HARNESS_HOST_VERSION } from "./version.js";
type HostHookEvent = HarnessEvent | "SessionStart" | "PermissionDenied" | "PostToolUseFailure";
export interface HarnessInput {
    readonly hook_event_name: HostHookEvent;
    readonly cwd: string;
    readonly transcript_path?: string;
    readonly session_id: string;
    readonly agent_id?: string;
    readonly tool_name?: string;
    readonly tool_use_id?: string;
    readonly tool_input?: Record<string, unknown>;
    readonly tool_response?: Record<string, unknown>;
    readonly prompt?: string;
    readonly reason?: string;
    readonly effort?: {
        readonly level?: string;
    };
    readonly harness_version?: string;
    /** Claude sets this when it re-enters Stop because a Stop hook refused. */
    readonly stop_hook_active?: boolean;
    /** The failed-command event carries the host's error text here. */
    readonly error?: string;
}
export declare function harnessInputHarness(input: Pick<HarnessInput, "cwd" | "session_id">, env?: NodeJS.ProcessEnv): "claude-code" | "copilot-cli";
/** Decode declared host fields; unconsumed native metadata is forward-compatible. */
export declare function decodeHarnessInput(value: unknown, expectedEvent?: HostHookEvent): DecodeResult<HarnessInput>;
export interface HarnessCheck {
    readonly checkId: string;
    readonly subject: string;
    readonly exitCode: number;
    readonly executed: boolean;
    readonly evidenceRef: string;
    readonly treeHash?: string;
    readonly codeIdentity?: string;
    readonly durationMs?: number;
}
export interface HarnessSession {
    role?: string;
    intent?: string;
    expectedEvent?: string;
    startingEventCount: number;
    startingRevision?: string;
    reads: {
        path: string;
        hash: string;
        evidenceRef: string;
    }[];
    byteReads?: HarnessByteRead[];
    correction?: CorrectionState;
    authoredPaths?: string[];
    beforeOutputs?: Record<string, string>;
    remainingWork?: string[];
    startedAt?: string;
    usageSessionKey?: string;
    versionWarning?: string;
    versionObservation?: {
        value: string;
        channel: string;
    };
    workOrder?: string;
    releaseCloseDispatch?: {
        workOrder: string;
        recordedAt: string;
    };
    pendingCliDispatch?: {
        toolUseId: string;
        command: string;
        action: string;
        workOrder: string;
        eventCount: number;
        eventPrefixHash: string;
    };
}
interface HarnessByteRead {
    readonly path: string;
    readonly hash: string;
    readonly startByte: number;
    readonly endByte: number;
}
interface HookConfig {
    readonly outsideWriteGrants?: readonly RoleOutsideWriteGrants[];
    readonly grants?: readonly AuthorityGrant[];
    readonly compilerPackageVersion: string;
    readonly runtime: {
        readonly skeletonVersion: string;
        readonly boundaryContract: "feedback-v1";
        readonly snapshot?: string;
        readonly targetId?: string;
        readonly files?: readonly {
            readonly path: string;
            readonly hash: string;
        }[];
    };
    readonly event: HostHookEvent;
    readonly kind: "feedback" | "permission" | "observe" | "session" | "finish" | "denial";
    readonly policy?: CompiledFeedback;
    readonly envelope?: AuthorityEnvelope;
    readonly correctionToken?: string | null;
    readonly roles?: readonly {
        readonly name: string;
        readonly facetId: string;
        readonly intents: readonly string[];
    }[];
    readonly instructionFile?: string;
    readonly tools?: Readonly<Record<string, "read" | "write" | "shell" | "spawn" | "stop" | "interaction">>;
}
interface ControlView {
    readonly workOrder: string | null;
    readonly workOrderPath: string | null;
    readonly phase: string;
    readonly latestVerdict: string | null;
    readonly legalNextActions?: readonly string[];
    readonly latestVerification?: string | null;
    readonly finalReview?: string | null;
}
/** The harness process that owns a session's reservation, as the hook observed it. */
export interface HarnessProcess {
    readonly pid?: number;
    readonly startedAt?: string;
    readonly source: "CLAUDE_PID" | "ancestor" | "parent" | "codex-host" | "thread";
}
export interface HarnessWriter {
    readonly actorId: string;
    readonly worktree: string;
    readonly owner?: HarnessProcess;
    readonly reservedAt?: string;
    /** Set when the owning session found its recorded owner dead: that identity never reclaims. */
    readonly liveness?: "unavailable";
    /** The instance this one replaced when its own session recorded a new fact under a new name. */
    readonly supersedes?: string;
    readonly reclaimed?: {
        readonly actorId: string;
        readonly owner?: HarnessProcess;
        readonly at: string;
    };
}
export type HarnessWriterView = {
    readonly contract: "harness-writer-v1";
    readonly reserved: false;
} | {
    readonly contract: "harness-writer-v1";
    readonly reserved: true;
    readonly actorId: string;
    readonly owner?: HarnessProcess;
    readonly reservedAt?: string;
    readonly liveness?: "unavailable";
    readonly reclaimed?: HarnessWriter["reclaimed"];
    readonly alive: boolean | "unknown";
};
export declare const harnessStateDirectory: (root: string) => string;
export declare function harnessRoot(cwd: string): string;
export declare function harnessControl(root: string, workOrder?: string): ControlView;
/**
 * The dispatch is judged by the writer unit the installed writer hook
 * carries. The host compiles that unit from the loadout inventory it ships
 * with and refuses when the inventory's compiled policy is not the one the
 * emitted bundle's manifest recorded, so an inventory that drifted from the
 * bundle cannot admit a dispatch. A bundle without the unit has no writer
 * boundary on the tool path either, so the dispatch takes none.
 */
export declare function dispatchAdmissionPolicy(root: string): CompiledFeedback | null;
export declare function recordOperatorMessage(root: string, input: HarnessInput, source?: string): void;
/** Codex exposes dispatches here, not a prompt hook or mid-turn inbox. */
export declare function recordCodexDispatch(root: string, sessionId: string, action: string): void;
interface ProcessRow {
    readonly pid: number;
    readonly ppid: number;
    readonly startedAt: string;
    readonly command: string;
}
/** The running process can retain an older executable than PATH. Process-table
 * observations stay local; persist only the version and its observation channel.
 */
export declare function observeSessionHarnessVersion(inputVersion?: string, env?: NodeJS.ProcessEnv, parent?: number, table?: readonly ProcessRow[]): {
    value: string;
    channel: string;
} | undefined;
/**
 * The harness process owning this hook invocation: the declared pid when it is
 * a verified ancestor, else the nearest non-shell ancestor; when the process
 * table is unreadable, the declared pid is trusted and the parent is the last resort.
 */
export declare function harnessHostProcess(env?: NodeJS.ProcessEnv, parent?: number): HarnessProcess;
/** A Codex dispatch is a short-lived npm/node command. Only a verified Codex
 * ancestor may own its reservation; an unreadable chain is a thread owner with
 * unknown liveness, never the command process that exits at dispatch. */
export declare function codexHostProcess(parent?: number, table?: readonly ProcessRow[]): HarnessProcess;
/** Signal-zero existence, then a start-time comparison when the process table is readable. */
export declare function harnessProcessAlive(owner: Pick<HarnessProcess, "pid" | "startedAt">): boolean;
/** WO-172: the local lane of what the shell said about commands as written.
 * A row holds its class and its scope, never a pattern or a command's text,
 * and names no field a guard's count reads. */
export declare const SHELL_DIAGNOSTICS = "shell-diagnostics.jsonl";
/** Fixture and live-smoke seeding through the same conditional placement, never a hook path. */
export declare function seedHarnessWriter(root: string, writer: HarnessWriter): void;
/** Operator-facing view: a hashed session key and host process, never a path or session id. */
export declare function harnessWriterView(root: string): HarnessWriterView;
/** Lifecycle dispatches reserve before they can append a control event. */
export declare function reserveCodexDispatchWriter(root: string, sessionId: string): HarnessWriterView;
export declare const harnessSubject: typeof gateTreeHash;
export declare function harnessOutputs(root: string, since?: string): readonly {
    path: string;
    hash: string;
    bytes: number;
}[];
export declare function harnessOutputObligations(root: string, session: HarnessSession): {
    path: string;
    hash: string;
    bytes: number;
    checkId?: string;
    obligation: "check" | "read";
}[];
/** Explicit entry for harnesses without automatic hooks. Existing dirt is a
 * baseline, unless a mid-upgrade session explicitly adopts its current outputs.
 */
export declare function openOverrideAdvisory(root: string): string | null;
export declare function beginHarnessSession(root: string, sessionId: string, role: string, adoptCurrent?: boolean | readonly string[]): {
    session: string;
    scratch: string;
    inheritedOutputs: number;
};
/** Lifecycle dispatches use the existing session without rewriting its entry
 * observation when a Codex thread repeats the same dispatch.
 */
export declare function beginHarnessSessionOnce(root: string, sessionId: string, role: string): {
    session: string;
    scratch: string;
    inheritedOutputs: number;
} | null;
/** Collection serves explicit sessions and hooks; missing counters are an
 * observation, never a completion refusal. Transcript contents stay private. */
export declare function measureHarnessSessionUsage(root: string, session: HarnessSession, key: string, transcriptPath?: string, copilotSessionId?: string): {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    coverage?: never;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    coverage?: never;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
};
export declare function measureHarnessUsage(root: string, sessionId: string): {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    coverage?: never;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    coverage?: never;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: null;
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: import("./usage-observation.mjs").Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
    cause?: string;
    subagents: import("./subagent-budget.js").SubagentObservation;
    currentSession?: {
        available: boolean;
        harness: string;
        harnessVersion: any;
        model: string | null;
        effort: any;
        source: string;
        observedAt: string | null;
        causes: string[];
    };
};
export declare function observeHarnessSession(root: string, sessionId: string): {
    path: string;
    hash: string;
    bytes: number;
    checkId?: string;
    obligation: "check" | "read";
}[];
/** The explicit adapter consumes the actual bounded reader's delivered stdout. */
export declare function observeHarnessDelivery(root: string, sessionId: string, delivered: string): void;
export declare function harnessOutputReadArgs(args: readonly string[]): {
    path: string;
    offset: number;
    length: number;
};
/** A bounded delivery, never a read receipt. Only the post-tool observer admits it. */
export declare function readHarnessOutput(root: string, path: string, offset?: number, length?: number): {
    contract: string;
    path: string;
    hash: string;
    offset: number;
    nextOffset: number;
    totalBytes: number;
    content: string;
};
export declare function runHarnessEvidence(root: string, pendingVerdict?: string): readonly HarnessCheck[];
/** Host fact collection is separate from the sole compiled feedback predicate. */
export declare function harnessFeedbackFacts(policy: CompiledFeedback, input: HarnessInput, root: string, session: HarnessSession): readonly FeedbackBoundaryRequest[];
export declare function permissionEffect(input: HarnessInput, root: string, tools?: HookConfig["tools"], outsideEffect?: string): string;
/** Recovery is advisory: the host retains its own sandbox and approval. */
export declare const BOOTSTRAP_HATCH_TEXT = "Run node scripts/bootstrap.mjs to prepare this worktree; host permissions decide tool access.";
export declare const GATE_STOP_TEXT: string;
/** A new scratch convention, not discovery of a native harness scratch path. */
export declare const harnessSessionScratch: (sessionId: string) => string;
/**
 * WO-168 (WO-166-D015): a printed scratch path exists. Every place that
 * prints or returns the path creates the directory first, mode 0700; an
 * existing real directory the session user owns is used as it is. Anything
 * else is one advisory naming the path and the cause, never a refusal.
 */
export declare function ensureHarnessSessionScratch(sessionId: string): {
    readonly path: string;
    readonly advisory?: string;
};
/**
 * WO-158-D010 (FUP-9ac70adcd20de223): the scratchpad Claude Code prints at
 * session start, /tmp/claude-<uid>/<project key>/<session id>/scratchpad.
 * The project key is the transcript directory the host itself named, the
 * segment before `<session id>.jsonl` or the session's subagent directory,
 * so no sanitizing rule is guessed. null admits nothing.
 */
export declare function claudeHostScratchpad(input: Pick<HarnessInput, "cwd" | "session_id" | "transcript_path">): string | null;
/** Inspect every named component below the trusted temporary prefix.
 * The system temporary prefix may itself be an alias. Missing components
 * still admit creation; inspection failures retain the guard's advisory.
 * The outer shared directory need not belong to the session user. */
export declare function grantedSessionRoot(path: string, prefix: string): {
    readonly physical: string;
    readonly cause?: string;
};
export declare function evaluateHarnessHook(config: HookConfig, input: HarnessInput, root: string, boundary: typeof feedbackBoundary, moved?: unknown): Promise<Record<string, unknown>>;
export declare function runHarnessHook(config: HookConfig, boundary: typeof feedbackBoundary, decodedInput?: unknown, inputText?: string, operatorControl?: unknown): Promise<void>;
export declare function runCommitMessageHook(config: Pick<HookConfig, "compilerPackageVersion" | "runtime"> & {
    readonly policy: CompiledFeedback;
}, boundary: typeof feedbackBoundary): Promise<void>;
/** Release only this session's reservation, after the host has observed completion. */
export declare function releaseHarnessWriter(root: string, input: HarnessInput): void;
/**
 * Operator-facing release from outside a governed session. The liveness
 * decision, the retirement and the recorded event describe one observed
 * reservation. A holder that changes after the decision is judged again by
 * the same rule; a forced release of a holder that changed refuses, because
 * the operator judged a different one. A live owner refuses without force.
 */
export declare function releaseHarnessWriterByOperator(root: string, force?: boolean): {
    contract: "harness-writer-v1";
    reserved: false;
    released: boolean;
} | {
    contract: "harness-writer-v1";
    reserved: true;
    actorId: string;
    owner?: HarnessProcess;
    reservedAt?: string;
    liveness?: "unavailable";
    reclaimed?: HarnessWriter["reclaimed"];
    alive: boolean | "unknown";
    released: boolean;
};
/** The target's runtime is in the launchpad snapshot; only Git facts use target cwd. */
export declare function runTargetHarnessHook(config: HookConfig, boundary: typeof feedbackBoundary): Promise<void>;
