import { type AcceptanceCriterion, type NamedVerificationTest, type VerificationSubject, type VerificationTask, type WorktreeVerificationContract } from "@dotln/compiler";
/** Recheck the actual read mount, including cached-result recovery. */
export declare function assertWorktreeSnapshot(capsule: VerificationTask, cwd: string): void;
export interface WorktreeVerificationOptions {
    /** Existing WO-052 target worktree; ignored host scaffolding is never copied. */
    readonly worktree: string;
    readonly baseCommit: string;
    readonly observedCommit: string;
    /** Public logical identity. Physical source paths never enter the capsule. */
    readonly repo: string;
    readonly contract: WorktreeVerificationContract;
    readonly criteria: readonly AcceptanceCriterion[];
    readonly tests: readonly NamedVerificationTest[];
    /** New host-owned directory, outside the target worktree. Retained for inspection. */
    readonly directory: string;
}
export interface PreparedWorktreeVerification {
    readonly subject: VerificationSubject;
    readonly snapshotPath: string;
    readonly testPaths: readonly string[];
}
export declare function prepareWorktreeVerification(options: WorktreeVerificationOptions): PreparedWorktreeVerification;
/** The vertical admits no witness data or failure caused by its terminal
 * signal. An unfinished preparation stays inspectable; the caller retries in
 * a fresh directory, with new tests, before publishing a prepared receipt. */
export declare function prepareInterruptibleWorktreeVerification(options: WorktreeVerificationOptions, signal: AbortSignal | undefined): Promise<PreparedWorktreeVerification>;
