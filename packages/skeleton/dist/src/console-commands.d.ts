/** The UI names terminal entrypoints, not an independent implementation. Each
 * ID fixes the Node entrypoint and the leading arguments that select one of its
 * commands; the terminal parser owns the remaining argument grammar and all its
 * refusals. No effect column: the resident classifies the equivalent terminal
 * command with the terminal's own permission classifier (WO-115 D005). */
export declare const CONSOLE_COMMANDS_V1: {
    readonly "resume.next": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["next"];
    };
    readonly "resume.fix": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["fix"];
    };
    readonly "resume.verify": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["verify"];
    };
    readonly "resume.final-review": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["final-review"];
    };
    readonly "resume.release-close": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["release-close"];
    };
    readonly "resume.status": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["status"];
    };
    readonly "resume.times": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["times"];
    };
    readonly "resume.activate": {
        readonly entry: "scripts/resume.mjs";
        readonly prefix: readonly ["activate"];
    };
    readonly "release.close": {
        readonly entry: "scripts/release.mjs";
        readonly prefix: readonly ["close"];
    };
    readonly "worktree.start": {
        readonly entry: "scripts/worktree.mjs";
        readonly prefix: readonly ["start"];
    };
    readonly "worktree.integrate": {
        readonly entry: "scripts/worktree.mjs";
        readonly prefix: readonly ["integrate"];
    };
    readonly "worktree.publish": {
        readonly entry: "scripts/worktree.mjs";
        readonly prefix: readonly ["publish"];
    };
    readonly "worktree.finish": {
        readonly entry: "scripts/worktree.mjs";
        readonly prefix: readonly ["finish"];
    };
    readonly "worktree.settle": {
        readonly entry: "scripts/worktree.mjs";
        readonly prefix: readonly ["settle"];
    };
    readonly "harness.emit": {
        readonly entry: "scripts/harness.mjs";
        readonly prefix: readonly ["emit"];
    };
    readonly "harness.check": {
        readonly entry: "scripts/harness.mjs";
        readonly prefix: readonly ["check"];
    };
    readonly "skeleton.compiled-diff": {
        readonly entry: "packages/skeleton/dist/src/cli.js";
        readonly prefix: readonly ["--compiled-diff"];
    };
    readonly "dotln.intent": {
        readonly entry: "packages/skeleton/dist/src/dotln.js";
        readonly prefix: readonly ["intent"];
    };
    readonly "dotln.presence-away": {
        readonly entry: "packages/skeleton/dist/src/dotln.js";
        readonly prefix: readonly ["presence", "away"];
    };
    readonly "dotln.presence-back": {
        readonly entry: "packages/skeleton/dist/src/dotln.js";
        readonly prefix: readonly ["presence", "back"];
    };
    readonly "dotln.status": {
        readonly entry: "packages/skeleton/dist/src/dotln.js";
        readonly prefix: readonly ["status"];
    };
    readonly "dotln.audit": {
        readonly entry: "packages/skeleton/dist/src/dotln.js";
        readonly prefix: readonly ["audit"];
    };
    readonly "console.status": {
        readonly entry: "packages/console/dist/src/cli.js";
        readonly prefix: readonly ["status"];
    };
    readonly "resident.bind-portfolio": {
        readonly entry: "scripts/resident-bind.mjs";
        readonly prefix: readonly ["--portfolio"];
    };
};
/** Options that make a terminal command stream until interrupted. A console
 * result is one complete exit code and byte pair, so these stay terminal-only
 * (WO-115 D006). */
export declare const CONSOLE_STREAMING_OPTIONS: Readonly<Partial<Record<ConsoleCommandId, readonly string[]>>>;
export type ConsoleCommandId = keyof typeof CONSOLE_COMMANDS_V1;
export type ConsoleCommandRequest = Readonly<{
    version: 1;
    command: string;
    args: readonly string[];
}>;
export type ConsoleCommandResult = Readonly<{
    version: 1;
    command: string;
    exitCode: number;
    stdoutBase64: string;
    stderrBase64: string;
}>;
export declare function isConsoleCommandId(value: string): value is ConsoleCommandId;
/** Only the envelope is validated here. Any command string decodes, so a name
 * outside the contract is refused and recorded as an invocation. */
export declare function decodeConsoleCommandRequest(value: unknown): ConsoleCommandRequest;
/** The command an operator types for this invocation, from the kit root. The
 * terminal permission classifier judges this exact text. */
export declare function consoleTerminalCommand(command: ConsoleCommandId, args: readonly string[]): string;
export declare function consoleChildEnvironment(environment: NodeJS.ProcessEnv): NodeJS.ProcessEnv;
export declare function consoleCommandInvocation(command: ConsoleCommandId, args: readonly string[], root: string): {
    executable: string;
    argv: string[];
    cwd: string;
};
