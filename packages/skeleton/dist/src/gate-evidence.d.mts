import { lstatSync, readlinkSync, realpathSync } from "node:fs";
/** Shared with the suite fingerprint: ignored installation bytes are inputs.
 * @param {string} root */
export declare function gateInstalledInputRoots(root: string): string[];
/** A consumer pass also binds the installed runtime that Git does not track.
 * Core source evidence keeps its existing identity. Invalid aliases refuse
 * instead of attesting bytes outside the selected installation.
 * @param {string} root */
export declare function gateInstanceInputDigest(root: string): string | undefined;
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
    name?: string;
    durationMs?: number;
    finishedAt?: string;
    reused?: boolean;
    sourceRow?: {
        location?: string;
        task?: string;
        codeIdentity?: string;
    };
    failureKind?: string;
    timedOut?: boolean;
    stopped?: boolean;
    partial?: unknown;
    excludedSuites?: unknown;
    output?: string;
    outputRef?: string;
    cases?: GateDiagnostic[];
    taskTimeline?: GateDiagnostic[];
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
    instanceInputDigest?: string;
    subject: string;
    durationMs: number;
    evidenceRef: string;
    recordedAt: string;
    requiredSuites?: string[];
    identityUnchanged?: boolean;
    buildOutputUnchanged?: boolean;
    buildOutputAttested?: boolean;
    memory?: {
        failure?: unknown;
    };
    abandonedRoots?: unknown[];
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
 * Ignored host evidence stays outside the tree. A re-included untracked intake
 * directory is private source material, not a candidate Git entry; tracked
 * intake files and ordinary untracked source still participate. Git filters
 * are applied by hash-object; this never writes
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
/** @param {string} root @param {GateCheck[]} additions
 * @param {{sourceRoot?: string}} [options] */
export declare function recordGateChecks(root: string, additions: GateCheck[], { sourceRoot }?: {
    sourceRoot?: string;
}): void;
/** A row that left suites out is a partial result under any identity, never a
 * complete check (WO-140).
 * Any other shape of either field is read as partial, never as complete.
 * @param {{partial?: unknown, excludedSuites?: unknown}} row
 */
export declare const partialGateCheck: (row: {
    partial?: unknown;
    excludedSuites?: unknown;
}) => boolean;
/** Why a recorded npm test row cannot stand for the current installed runtime:
 * "missing" when the row records no digest (its gate ran where none was
 * computed), "different" when it records another one; null when they agree or
 * none is computed here.
 * @param {{instanceInputDigest?: string}} row @param {string|undefined} current */
export declare const instanceDigestMismatch: (row: {
    instanceInputDigest?: string;
}, current: string | undefined) => "different" | "missing" | null;
/** Row integrity applies to executions under every check, including runs
 * that supply no pass to the product gate.
 * @param {GateCheck} row */
export declare const intactGateExecutionRow: (row: GateCheck) => boolean;
/** @param {GateDiagnostic} result */
export declare const passingGateResult: (result: GateDiagnostic) => boolean;
/** Declared suites need a named execution or carried result in the row.
 * A legacy row without a declaration covers only an empty claim.
 * @param {GateCheck} row */
export declare function missingGateSuites(row: GateCheck): string[];
/** The execution of `name` that finished last among these rows. A result
 * carried from another row and a task that never started are not executions:
 * they neither supply a pass nor displace one. A run recorded under another
 * check answers no claim and supplies nothing. When the task's latest run
 * there did not pass, and no gate execution finished after it, that failure
 * is the task's latest run; when it passed, the latest gate execution
 * decides as if the other runs had not happened. Overlapping gates are
 * ordered by when the task finished, then by when its row was recorded.
 * `citesMain` reports a carried result this worktree took from main.
 * @param {GateCheck[]} rows @param {GateCheck[]} other
 * @param {string} name @param {string|undefined} identity */
export declare function latestGateExecution(rows: GateCheck[], other: GateCheck[], name: string, identity: string | undefined): {
    row?: GateCheck;
    result?: GateDiagnostic | undefined;
    at?: number;
    citesMain: boolean;
};
/** A complete row stands on the same execution decision used by the runner.
 * A carried main result is revalidated against main only when local history
 * supplies no execution of that task.
 * @param {GateCheck} candidate @param {GateCheck[]} rows @param {string} [root]
 */
export declare function gateCheckStands(candidate: GateCheck, rows: GateCheck[], root?: string): boolean;
/** Generic tree checks retain successful evidence; product checks also
 * reject complete rows displaced by a task's later failing execution.
 * @param {string} root @param {string} checkId @param {string} treeHash
 */
export declare const findGateCheck: (root: string, checkId: string, treeHash: string) => GateCheck | undefined;
/** @param {string} root @param {string[]} required */
export declare function requireGateChecks(root: string, required: string[]): string;
