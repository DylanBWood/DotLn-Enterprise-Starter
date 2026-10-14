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
}): () => void;
/** Exact host-selected shell commands only. Native permissions still decide. */
export declare function sourceChangeCommandEffect(launchpad: string, target: string, command: string, now?: number): "shell.run" | "git.local" | undefined;
