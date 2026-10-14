import { type IntakeResult, type IntakeSubject, type TriageResult, type TriageSubject, type VerticalJudgmentRequest, type VerticalJudgmentTask } from "./vertical-judgment-protocol.js";
import { type WorkOrderTransport } from "./worker-transport.js";
/** What the receipt says about the episode: launch selection, never readback. */
export interface VerticalJudgmentProvenance {
    readonly kind: "model" | "double";
    readonly task: VerticalJudgmentTask;
    readonly transport: string;
    readonly harnessVersion: string;
    readonly model: string;
    readonly effort: string;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly episodeId: string;
    readonly subjectHash: string;
    readonly selectionSource: "host-launch";
    readonly effectiveModel: "unknown";
    readonly effectiveEffort: "unknown";
    readonly dispatchedAt: string;
    readonly completedAt: string;
}
type Subject<T extends VerticalJudgmentTask> = T extends "intake" ? IntakeSubject : TriageSubject;
type Result<T extends VerticalJudgmentTask> = T extends "intake" ? IntakeResult : TriageResult;
/** One tool-less episode in an empty scratch directory, like the plan refuter:
 * the subject is the whole input and the host validates the whole return. No
 * reactor grant is drawn: the episode has no effect to authorize, and its
 * caller's authority (admission's presence re-sample for intake, the vertical's
 * running-authority observer for triage) bounds when it may launch. A rejected
 * return is copied under `retain` before the scratch directory is removed. */
export declare function runVerticalJudgment<T extends VerticalJudgmentTask>(options: {
    readonly task: T;
    readonly subject: Subject<T>;
    readonly transport: WorkOrderTransport<VerticalJudgmentRequest>;
    readonly model: string;
    readonly effort: string;
    readonly retain?: string;
}, now?: () => number): Promise<{
    readonly result: Result<T>;
    readonly provenance: VerticalJudgmentProvenance;
}>;
/** A failed episode's recorded reason: its typed code and detail, or the
 * message of an untyped error, bounded so a stop names its cause. */
export declare function judgmentFailure(error: unknown): string;
/** Whether a fresh episode could succeed: an unreachable or interrupted actor,
 * never a return the host refused. */
export declare const judgmentRetryable: (error: unknown) => boolean;
/** An episode's own launch or return made no decision; `cause` is that
 * failure. Nothing else may leave a judgment undecided for a fresh episode. */
export declare class RetryableJudgmentError extends Error {
    readonly task: VerticalJudgmentTask;
    constructor(task: VerticalJudgmentTask, error: unknown);
}
/** A triage episode made no decision. Its consumer retains the pending command
 * and the resident defers it with backoff rather than ending its run loop. */
export declare class RetryableTriageError extends RetryableJudgmentError {
    constructor(error: unknown);
}
export {};
