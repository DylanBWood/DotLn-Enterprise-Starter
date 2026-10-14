export interface WorkerWorktree {
    readonly path: string;
    readonly baseCommit: string;
    readonly repository: string;
}
/** Host-owned detached worktrees. No branch commits, force removal, or reset. */
export declare class WorkerWorktrees {
    readonly repository: string;
    readonly directory: string;
    constructor(repository: string, directory: string);
    create(commandId: string, baseCommit: string): WorkerWorktree;
    verify(worktree: WorkerWorktree): void;
    cleanup(worktree: WorkerWorktree): void;
}
