import { usageObservation } from "./usage-observation.mjs";
import { normalizeWorkerEffort, type CommandReceipt, type WorkerRequest, type WorkerResult, type WorkerTransportName } from "./worker-protocol.js";
import { type TransportRequest, type TransportResultFor } from "./verification-protocol.js";
export { normalizeWorkerEffort };
export interface WorkerLaunch {
    readonly resident?: {
        readonly store: string;
        readonly episodeId: string;
    };
    /** A source writer's descendants share a group the host can stop/observe. */
    readonly ownProcessGroup?: boolean;
    /** Native exec gate, released only after the source host saves its identity. */
    readonly launchGate?: string;
    readonly binary: string;
    readonly args: readonly string[];
    readonly cwd: string;
    readonly input: string;
    readonly timeoutMs: number;
    /** The launch environment; the Codex launcher supplies an isolated home. */
    readonly env?: NodeJS.ProcessEnv;
}
export interface ProcessResult {
    readonly stdout: string;
    readonly stderr: string;
    readonly exitCode: number | null;
}
export interface RunningProcess {
    readonly accepted: Promise<void>;
    readonly completed: Promise<ProcessResult>;
    readonly alive: () => boolean;
    readonly kill: (signal?: NodeJS.Signals) => void;
    readonly processGroup?: number;
    readonly start?: () => void;
}
export type ProcessRunner = (launch: WorkerLaunch) => RunningProcess;
/** No shell interpolation; raw harness output is private, bounded and discarded. */
export declare const runWorkerProcess: ProcessRunner;
export interface TransportDispatch<T = WorkerResult> {
    readonly receipt: Promise<CommandReceipt>;
    readonly completed: Promise<T>;
    readonly alive: () => boolean;
    readonly kill: (signal?: NodeJS.Signals) => void;
    /** Local writer group; absence cannot establish post-crash termination. */
    readonly processGroup?: number;
    /** Wrappers may admit asynchronously; await the actual launch before recording. */
    readonly processGroupReady?: Promise<number | undefined>;
    /** Release a native writer only after its start marker is durable. */
    readonly start?: () => void;
    readonly usage?: Promise<ReturnType<typeof usageObservation>>;
    /** Codex only: the isolated episode's record once the process has ended. */
    readonly isolation?: Promise<CodexEpisodeIsolation>;
}
export interface WorkOrderTransport<R extends TransportRequest = WorkerRequest> {
    readonly name: WorkerTransportName;
    readonly harnessVersion: string;
    readonly supportsDeferredStart?: boolean;
    dispatch(request: R, now: () => number, options?: {
        readonly launchGate?: string;
    }): TransportDispatch<TransportResultFor<R>>;
}
/** The flags every Codex `exec` episode shares. They govern reading and
 * session files only: `--ignore-user-config` does not stop the CLI writing a
 * project trust entry into its home (WO-111 VER-001 B1), so the isolated home
 * below, not these flags, keeps the operator's configuration unchanged. */
export declare const CODEX_EXEC_SHARED_FLAGS: readonly ["--ephemeral", "--ignore-user-config"];
export interface CodexExecShape {
    /** Codex's global approval option; it precedes the subcommand. */
    readonly approval?: string;
    /** Options kept ahead of the shared flags, in their recorded position. */
    readonly leading?: readonly string[];
    /** Everything after the shared flags, ending with the prompt or `-`. */
    readonly rest: readonly string[];
}
/** The one builder of a Codex `exec` argv. */
export declare function codexExecArgv(shape: CodexExecShape): string[];
export type CodexDigestPair = {
    readonly before: string;
    readonly after: string;
};
/** What one episode did to the operator's user-level Codex state. Digests and
 * counts only: never the configuration, a project path or the auth file. */
export type CodexEpisodeIsolation = {
    readonly schemaVersion: 1;
    /** SHA-256 of the isolated home's path; its contents are never recorded. */
    readonly home: string;
    /** How the CLI reached the operator's authentication. */
    readonly authentication: "symlink" | "absent";
    /** The user-level `config.toml`, before and after the episode. */
    readonly userConfig: CodexDigestPair;
    /** Its `[projects]` trust table, before and after the episode. */
    readonly trustTable: CodexDigestPair;
    /** Trusted project entries the CLI wrote into the isolated home, or null
     * when it wrote no configuration there. Observed, not assumed. */
    readonly isolatedTrustEntries: number | null;
    readonly homeRemoved: boolean;
};
export interface CodexEpisode {
    /** The launch environment: the caller's, with `CODEX_HOME` isolated. */
    readonly env: NodeJS.ProcessEnv;
    /** Digest again, remove the home and return the record. Idempotent. */
    finish(): CodexEpisodeIsolation;
}
/** The operator's Codex home as the CLI would resolve it for this caller. */
export declare function userCodexHome(env?: NodeJS.ProcessEnv): string;
/** The `[projects]` trust table as its own lines, in file order: `[projects]`
 * and `[projects."<path>"]` tables (bare, basic or literal key) with their
 * keys, and a root-level `projects` value, dotted or inline, including the
 * lines a multi-line value continues onto. A line projection, not a TOML
 * parser: strings and comments are blanked before brackets are counted, and
 * multi-line strings are not modelled. The whole-file pair covers the rest. */
export declare function codexTrustTable(config: string): string;
/** A digest pair proves the file unchanged only when both sides were read,
 * or both were absent. */
export declare function codexDigestPairEqual(pair: CodexDigestPair): boolean;
/** The receipt check for live Codex episodes (WO-159): each record must be a
 * well-formed isolation record whose home was removed and whose user-level
 * configuration and trust-table pairs are equal. */
export declare function assertCodexIsolationUnchanged(records: readonly unknown[]): asserts records is readonly CodexEpisodeIsolation[];
/** A detached Codex group can outlive a launcher killed from its terminal, so
 * a home is also kept until it is older than twice the longest episode
 * deadline any DotLn launch sets. */
export declare const STALE_CODEX_HOME_MS: number;
/** Episode homes left behind by an abnormal end: their launching process has
 * exited and the home is older than STALE_CODEX_HOME_MS. A live launcher's
 * homes, including another lane's, are never stale. The next launch removes
 * these and `harness prune` lists them. */
export declare function staleCodexEpisodeHomes(root?: string, now?: number): string[];
/** Start one isolated Codex episode: a fresh `CODEX_HOME` under system temp
 * (0o700) holding only a symlink to the operator's `auth.json`. The CLI's own
 * file store opens that path for writing, so a token refresh reaches the
 * operator's file instead of dying with a copy (rust-v0.156.1
 * `FileAuthStorage::save`). Before and after the launch, `finish` digests the
 * operator's `config.toml` and its trust table. A home that cannot be built
 * refuses the launch; it never falls back to the operator's home. */
export declare function startCodexEpisode(env?: NodeJS.ProcessEnv): CodexEpisode;
export declare const OBSERVED_CLI_VERSIONS: {
    readonly claude: "2.1.270";
    readonly codex: "0.154.0";
};
export declare function canonicalWorkerArgs(name: WorkerTransportName, request: TransportRequest, schemaPath: string, harnessVersion?: string, 
/** The Codex episode's own home; its helper aliases live under it. */
codexHome?: string): readonly string[];
declare abstract class CliWorkOrderTransport implements WorkOrderTransport {
    private readonly binary;
    private readonly runner;
    private readonly onUsage?;
    /** The environment a Codex episode isolates; the caller's by default. */
    private readonly launchEnv;
    abstract readonly name: WorkerTransportName;
    readonly harnessVersion: string;
    readonly supportsDeferredStart = true;
    constructor(binary: string, observedVersion: string, runner?: ProcessRunner, version?: string, onUsage?: ((observation: ReturnType<typeof usageObservation>) => void) | undefined, 
    /** The environment a Codex episode isolates; the caller's by default. */
    launchEnv?: NodeJS.ProcessEnv);
    dispatch<R extends TransportRequest>(request: R, now: () => number, options?: {
        readonly launchGate?: string;
    }): TransportDispatch<TransportResultFor<R>>;
}
export declare class ClaudeCliPrintWorkOrderTransport extends CliWorkOrderTransport {
    readonly name: "claude-cli-print";
    constructor(runner?: ProcessRunner, version?: string, onUsage?: (observation: ReturnType<typeof usageObservation>) => void);
}
export declare class CodexCliExecWorkOrderTransport extends CliWorkOrderTransport {
    readonly name: "codex-cli-exec";
    constructor(runner?: ProcessRunner, version?: string, onUsage?: (observation: ReturnType<typeof usageObservation>) => void, 
    /** Whose Codex home an episode isolates; the caller's by default. */
    launchEnv?: NodeJS.ProcessEnv);
}
