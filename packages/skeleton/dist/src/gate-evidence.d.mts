import { lstatSync, readlinkSync, realpathSync } from "node:fs";
/** Shared with the suite fingerprint: ignored installation bytes are inputs.
 * @param {string} root */
export declare function gateInstalledInputRoots(root: string): string[];
/** Walk before normalizing parents: the kernel follows a directory symlink
 * before applying `..`, and follows a dangling final link when creating a file.
 * Native realpath retains on-disk case for every existing component.
 * The optional I/O snapshot lets a read observer use the same traversal
 * without recursively invoking its own wrapped filesystem methods.
 * @param {string} path
 * @param {{lstatSync: typeof lstatSync, readlinkSync: typeof readlinkSync, realpathSync: typeof realpathSync.native}} [io]
 * @returns {string} */
export declare function prospectiveRealpath(path: string, io?: {
    lstatSync: typeof lstatSync;
    readlinkSync: typeof readlinkSync;
    realpathSync: typeof realpathSync.native;
}): string;
/** Protect candidate-tree and installed-suite inputs, including possible inode
 * aliases. Ordinary ignored scratch is excluded; tracked files stay protected.
 * @param {string} root @param {string} path */
export declare function gateInputPath(root: string, path: string): boolean;
/** Only a selected order's records, with neither symlink escape nor inode
 * aliasing, can be written while a product gate reads its other inputs.
 * @param {string} root @param {string} path @param {string} order */
export declare function gateRecordPath(root: string, path: string, order: string): boolean;
export type GateRun = {
    contract: "gate-run-v1";
    runId: string;
    command: string;
    kind?: "product" | "document" | "machinery" | "review";
    pid: number;
    startedAt: string;
    processStartedAt: string | null;
};
export type GateStop = {
    contract: "gate-stop-v1";
    runId: string;
    requestedAt: string;
};
/** Every gate process names its own run and its ancestors' runs to its
 * children here, so a stop request for any of them reaches the whole tree
 * without signals to processes whose identity a sandbox cannot verify. */
export declare const GATE_RUN_ENVIRONMENT = "DOTLN_GATE_RUNS";
/** @param {NodeJS.ProcessEnv} [env] */
export declare const gateRunLineage: (env?: NodeJS.ProcessEnv) => string[];
/** Run ids among the given lineage that carry a stop request. A gate polls
 * this at every boundary it owns and stops itself; nothing here signals a pid.
 * @param {string} root @param {readonly string[]} [runIds] */
export declare function gateStopRequested(root: string, runIds?: readonly string[]): string[];
/** Ask every live gate in this worktree to stop, then wait a bounded time for
 * the markers to clear. The request is a file the running gate reads at its
 * next boundary; a gate that has not reached one yet keeps its request and
 * stays reported as active with its pids. Requests left by dead runs are swept.
 * @param {string} root @param {{waitMs?: number}} [options] */
export declare function requestGateStop(root: string, { waitMs }?: {
    waitMs?: number;
}): {
    contract: string;
    requestedAt: string;
    requested: {
        runId: string;
        command: string;
        pid: number;
        startedAt: string;
    }[];
    stopped: {
        runId: string;
        command: string;
        pid: number;
        startedAt: string;
    }[];
    active: {
        runId: string;
        command: string;
        pid: number;
        startedAt: string;
    }[];
};
/** Read only: dead markers never lock the tree and never let a stale observer
 * delete a newer run. Each run owns a unique, atomically published marker.
 * @param {string} root @returns {GateRun[]} */
export declare function activeGateRuns(root: string): GateRun[];
/** Gate-owned writes (build, preparation and evidence) are internal operations;
 * this marker fences new agent tool dispatches, not the gate's subprocesses.
 * @param {string} root @param {string} command
 * @param {{kind?: "product"|"document"|"machinery"|"review"}} [options] */
export declare function beginGateRun(root: string, command: string, { kind }?: {
    kind?: "product" | "document" | "machinery" | "review";
}): {
    run: GateRun;
    release: () => void;
    /** True once a stop was requested for this run or an ancestor run. */
    stopRequested: () => boolean;
};
export type GateDiagnostic = {
    exitCode: number;
    executed: boolean;
    output?: string;
    outputRef?: string;
    cases?: GateDiagnostic[];
};
export type SharedRefs = {
    originMain: string;
    main: string;
    tags: {
        count: number | "unreadable";
        newest: string;
    };
    dotlnRefs: number | "unreadable";
};
export type GateCheck = GateDiagnostic & {
    checkId: string;
    treeHash: string;
    codeIdentity?: string;
    subject: string;
    durationMs: number;
    evidenceRef: string;
    recordedAt: string;
    sharedRefs?: {
        start: SharedRefs;
        end: SharedRefs;
    };
};
/** Small diagnostic snapshot of refs shared by linked worktrees. It never
 * participates in the gate's subject or verdict. Newest means tagger date,
 * with the full tag name breaking ties; lightweight tags are excluded.
 * Failed reads retain unreadable fields, never partial output or invented
 * counts. A clean unresolved branch read is absent, including a ref that
 * exists but cannot resolve to a commit.
 * @param {string} root @returns {SharedRefs} */
export declare function readSharedRefs(root: string): SharedRefs;
/** Exact candidate Git tree identity, including uncommitted and untracked files.
 * Ignored host evidence stays outside the tree. No evidence or control paths are
 * excluded specially. Git filters are applied by hash-object; this never writes
 * the shared object database or the user's index.
 * @param {string} root
 */
export declare function gateTreeHash(root: string): string;
/** @param {string} root */
export declare const checksPath: (root: string) => string;
/** @param {string} root @param {{runId:string,treeHash:string,status:"passed"|"failed"|"no-row"}} outcome */
export declare function recordGateOutcome(root: string, outcome: {
    runId: string;
    treeHash: string;
    status: "passed" | "failed" | "no-row";
}): void;
/** @param {string} root @param {string} treeHash @param {readonly string[]} [runIds] */
export declare function latestGateOutcome(root: string, treeHash: string, runIds?: readonly string[]): any;
/** Product evidence follows tracked and non-ignored untracked source bytes,
 * independent of staging, reports and generated projections. A path Git marks
 * `dotln-documentation` (the package
 * READMEs no suite reads) is documentation for a reader, never product code,
 * so editing it after a gate leaves the gate's key intact; a README a test
 * reads as an input stays unmarked and counts (WO-115 D026).
 * @param {string} root @param {string} [revision] */
export declare function gateCodeIdentity(root: string, revision?: string): string;
/** The hot index stays bounded; older executable observations remain addressed
 * by tree for reuse and meter history. Suite stdout is not an evidence field.
 */
export declare const gateCacheRows = 256;
/** @param {string} root @param {string} [treeHash] @returns {GateCheck[]} */
export declare function readGateChecks(root: string, treeHash?: string): GateCheck[];
/** @param {string} root @param {GateCheck[]} additions */
export declare function recordGateChecks(root: string, additions: GateCheck[]): void;
/** A row that left suites out is a partial result under any identity, never a
 * complete check (WO-140).
 * Any other shape of either field is read as partial, never as complete.
 * @param {GateCheck & {partial?: unknown, excludedSuites?: unknown}} row
 */
export declare const partialGateCheck: (row: GateCheck & {
    partial?: unknown;
    excludedSuites?: unknown;
}) => boolean;
/** A failed attempt does not erase a later or earlier successful run at identical bytes.
 * @param {string} root @param {string} checkId @param {string} treeHash
 */
export declare const findGateCheck: (root: string, checkId: string, treeHash: string) => GateCheck | undefined;
/** @param {string} root @param {string[]} required */
export declare function requireGateChecks(root: string, required: string[]): string;
