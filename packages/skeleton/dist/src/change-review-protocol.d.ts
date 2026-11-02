import type { Command } from "@dotln/kernel";
import { type WorkerEffort } from "./worker-protocol.js";
/** The kit's change review (`npm run worker -- review`): one fresh worker
 * reads a work order's or a planning branch's change in its own checkout and
 * returns closed findings, which the helper writes into the subject's ignored
 * reviews lane for the executor, the verifier and the close. */
export declare const CHANGE_REVIEW_KINDS: readonly ["criteria", "design", "consistency", "combined"];
export type ChangeReviewKind = (typeof CHANGE_REVIEW_KINDS)[number];
/** A reviewer over files reads them: the file tools and a shell. */
export declare const CHANGE_REVIEW_TOOLS: readonly ["Read", "Grep", "Glob", "Bash"];
/** The shell commands the Claude print form pre-approves; any other command
 * is denied without a prompt, and the file tools cover reading and searching.
 * A prefix rule cannot see every option a program accepts (`git diff
 * --output` writes a file, and the bounded probe runs the test file it is
 * given), so this list narrows what a worker may run and the guarantee is
 * detection: the helper compares the checkout's contents on either side of the
 * episode and names any change. */
export declare const CHANGE_REVIEW_SHELL: readonly ["git diff", "git log", "git show", "git status", "git ls-files", "git rev-parse", "git merge-base", "git blame", "git grep", "grep", "ls", "wc", "node scripts/harness.mjs bounded -- node --test"];
/** A change review's limits. The worker is told the budget and stops itself
 * before it, returning what it has: a worker stopped at a hard limit returns
 * nothing, so the hard limits sit well above the budget. The transcript is
 * never a limit: a review's event stream echoes every command it ran (one
 * Codex review of WO-250 passed 1,000,000 bytes in six minutes), so only its
 * tail is kept, for the usage counters, and the final message has its own
 * file. The entropy review, the nearest measured episode, took 1,019.6 s and
 * USD 10.52. */
export declare const CHANGE_REVIEW_LIMITS: {
    readonly budgetMinutes: 30;
    readonly budgetToolCalls: 120;
    readonly timeoutMs: 3600000;
    readonly maxBudgetUsd: "20.00";
    readonly transcriptTailBytes: 8000000;
};
/** The file in the capture lane a Codex worker writes its final message to. */
export declare const CHANGE_REVIEW_LAST_MESSAGE = "last-message.txt";
/** The intent effect every change review command names: a read. */
export declare const CHANGE_REVIEW_EFFECT = "repo.read.review";
export type ChangeReviewSeverity = "blocking" | "should-fix" | "note";
/** What a finding stands on, in the vocabulary a verifier's blocking entry
 * carries: an acceptance criterion, or a behavior `main` had that the change
 * broke. A finding that stands on neither carries null. */
export type ChangeReviewBasis = {
    readonly criterion: string;
} | {
    readonly regression: string;
} | null;
export interface ChangeReviewFinding {
    readonly id: string;
    readonly severity: ChangeReviewSeverity;
    readonly summary: string;
    readonly file: string;
    readonly line: number | null;
    readonly basis: ChangeReviewBasis;
}
/** A recheck's judgment of one earlier finding: its fix holds or it does not. */
export interface ChangeReviewRecheck {
    readonly id: string;
    readonly outcome: "held" | "not-held";
    readonly note: string;
}
export interface ChangeReviewResult {
    readonly schemaVersion: 1;
    readonly findings: readonly ChangeReviewFinding[];
    readonly rechecks: readonly ChangeReviewRecheck[];
    /** Repository-relative paths the worker actually read. */
    readonly filesRead: readonly string[];
    /** The worker's own account, in Markdown, of what it read and found. */
    readonly report: string;
}
export interface ChangeReviewRequest {
    readonly kind: "change-review";
    readonly command: Command;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    /** The reviewed checkout; the worker reads it and changes nothing there. */
    readonly cwd: string;
    /** A host directory outside the checkout that retains the raw return. */
    readonly capture: string;
    readonly review: {
        readonly kind: ChangeReviewKind;
        readonly round: number;
        /** The order id, or `planning` for a planning branch. */
        readonly subject: string;
        /** The earlier findings a recheck confirms or refutes. */
        readonly priorFindingIds: readonly string[];
    };
    /** The canonical brief the helper rendered from the role text. */
    readonly brief: string;
    readonly profile: {
        readonly profileId: "change-review-v1";
        readonly modelTools: readonly string[];
    };
}
export declare const isChangeReviewRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: unknown;
}) => request is ChangeReviewRequest;
export declare function validateChangeReviewRequest(request: ChangeReviewRequest): void;
/** The closed shape every change review returns, strict enough for Codex's
 * output schema: every property is required and an absent value is null. */
export declare function changeReviewResultSchema(): object;
/** The prompt is the helper's canonical brief, the budget the worker keeps
 * itself within, and the output contract. */
export declare function changeReviewPrompt(request: ChangeReviewRequest): string;
/** Bind a return to the closed shape and to this request's earlier findings. */
export declare function validateChangeReviewResult(value: unknown, request: ChangeReviewRequest): ChangeReviewResult;
