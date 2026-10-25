export interface CommandCleanup {
    readonly removed: string[];
    readonly survived: {
        path: string;
        code: string;
    }[];
}
/** Remove both owned grants, including after a partial earlier removal. */
export declare function removeSourceChangeCommands(input: {
    readonly launchpad: string;
    readonly target: string;
    readonly commandId: string;
    readonly episodeId: string;
    readonly unlink?: (path: string) => void;
}): CommandCleanup;
export declare function installSourceChangeCommands(input: {
    readonly launchpad: string;
    readonly target: string;
    readonly commandId: string;
    readonly requestKey: string;
    readonly episodeId: string;
    readonly baseCommit: string;
    readonly branch: string;
    readonly testCommand: string;
    readonly messagePath: string;
    readonly expiresAt: number;
    readonly unlink?: (path: string) => void;
}): () => CommandCleanup;
/** A detached source episode may reserve its host-bound destination branch. */
export declare function sourceChangeWriterBranch(launchpad: string, target: string): string | undefined;
/** Exact host-selected shell commands only. Native permissions still decide. */
export declare function sourceChangeCommandEffect(launchpad: string, target: string, command: string, now?: number): "shell.run" | "git.local" | undefined;
