/** Passive, bounded projection; clock samples alone do not repaint the view. */
export declare function renderLiveView(directory: string): string;
export declare function watchLiveView(directory: string, changed: (text: string, changes: readonly string[]) => void): {
    close: () => void;
};
/** Friendly controls are aliases for existing command IDs, not new authority. */
export declare function liveCommand(line: string, directory?: string): {
    command: string;
    args: string[];
};
export declare function invokeLiveCommand(directory: string, line: string, signal?: AbortSignal): Promise<Readonly<{
    version: 1;
    command: string;
    exitCode: number;
    stdoutBase64: string;
    stderrBase64: string;
}>>;
export declare function liveCli(args: string[]): Promise<void>;
