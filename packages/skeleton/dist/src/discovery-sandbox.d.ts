/** The toolchain a confined test reads, whichever harness runs it: the same
 * roots back the Claude writer's sandbox-exec profile and the Codex writer's
 * permission profile (WO-112 D022). */
export declare function toolchainReadRoots(): string[];
/** Native boundary shared by direct checks and the whole trusted producer episode. */
export declare function discoverySandbox(root: string, runtimeReads?: readonly string[]): string;
/** Exact shell spelling used by the Claude writer's native allowlist and
 * host permission route. The named command remains the contract's input. */
export declare function writerSandboxProfilePath(launchpad: string, target: string): string;
/** Tests may write product files, never the controls that confine later tools
 * nor the paths the host's writer Write route protects. */
export declare function writerSandboxProfile(root: string): string;
export declare function confinedTestCommand(root: string, command: string, profileFile: string): string;
