export type TemporaryClass = "gate-fixture" | "session-scratch" | "worker-capture" | "warm-fixture" | "coordination";
export type TemporaryOwner = {
    pid: number | null;
    birth: string | null;
    repository: string;
    gateId?: string;
    suite?: string;
    session?: string;
};
export type TemporaryRecord = {
    schemaVersion: 1;
    token: string;
    class: TemporaryClass;
    owner: TemporaryOwner;
    createdAt: string;
    retentionHours: number | null;
    retentionOverride?: number | null;
    fixtureOwner?: {
        token: string;
        gateId: string;
        suite?: string;
    };
    device: number;
    inode: number;
    endedAt?: string;
    endSource?: "completion" | "owner-death-observation";
    outcome?: "passed" | "failed" | "abandoned";
    cacheKey?: string;
};
export type TemporaryOptions = {
    class: TemporaryClass;
    owner?: Partial<TemporaryOwner>;
    repository?: string;
    retentionHours?: number | null;
    cacheKey?: string;
    adoptExisting?: boolean;
};
export type ProcessIdentity = {
    pid: number;
    birth: string;
    ppid?: number;
    command?: string;
};
export type Inventory = {
    files: number;
    bytes: number;
    directories: number;
};
/** @typedef {"gate-fixture"|"session-scratch"|"worker-capture"|"warm-fixture"|"coordination"} TemporaryClass */
/** @typedef {{pid: number|null, birth: string|null, repository: string, gateId?: string, suite?: string, session?: string}} TemporaryOwner */
/** @typedef {{schemaVersion: 1, token: string, class: TemporaryClass, owner: TemporaryOwner, createdAt: string, retentionHours: number|null, retentionOverride?: number|null, fixtureOwner?: {token: string, gateId: string, suite?: string}, device: number, inode: number, endedAt?: string, endSource?: "completion"|"owner-death-observation", outcome?: "passed"|"failed"|"abandoned", cacheKey?: string}} TemporaryRecord */
/** @typedef {{class: TemporaryClass, owner?: Partial<TemporaryOwner>, repository?: string, retentionHours?: number|null, cacheKey?: string, adoptExisting?: boolean}} TemporaryOptions */
/** @typedef {{pid: number, birth: string, ppid?: number, command?: string}} ProcessIdentity */
/** @typedef {{files: number, bytes: number, directories: number}} Inventory */
export declare const TEMPORARY_OWNER_FILE = ".dotln-owner.json";
/** Call after initializing a synthetic Git repository. Keep cleanup metadata
 * out of its index without changing the fixture's tracked ignore rules.
 * @param {string} repository */
export declare function excludeFixtureOwnership(repository: string): void;
/** Ownership describes one physical directory and never travels with its
 * contents. Preserve a caller's narrower copy filter as well.
 * @param {string|URL} source
 * @param {string|URL} destination
 * @param {import("node:fs").CopySyncOptions} [options] */
export declare function copyTemporaryMaterial(source: string | URL, destination: string | URL, options?: import("node:fs").CopySyncOptions): void;
export declare const DEFAULT_RETENTION: Readonly<{
    "gate-fixture-passed": 0;
    "gate-fixture-failed": 24;
    "session-scratch": 24;
    "worker-capture": 1;
    "warm-fixture": 0;
    "legacy-backfill": 48;
    coordination: null;
}>;
export type Retention = Record<keyof typeof DEFAULT_RETENTION, number | null>;
/** @template T @param {Partial<TemporaryOwner>} owner @param {() => T} operation @returns {T} */
export declare const withTemporaryOwner: <T>(owner: Partial<TemporaryOwner>, operation: () => T) => T;
/** Locate the actual tool checkout, including from an immutable hook snapshot.
 * @param {string} [start] */
export declare function temporaryRepository(start?: string): string;
/** @param {unknown} input @returns {Retention} */
export declare function validateRetention(input: unknown): Retention;
/** @param {string} repository */
export declare function readRetention(repository: string): Retention;
/** @param {string} [repository] @returns {ProcessIdentity[]|null} */
export declare function temporaryProcessTable(repository?: string): ProcessIdentity[] | null;
/** @param {number} [pid] @param {string} [repository] */
export declare function temporaryProcessIdentity(pid?: number, repository?: string): {
    pid: number;
    birth: string | null;
};
/** null means unknown, never dead. A gate's terminal row is judged by the
 * caller as well: live child processes still protect their roots.
 * @param {Pick<TemporaryRecord, "owner">} record @param {ProcessIdentity[]|null} [table]
 * @returns {boolean|null} */
export declare function ownerAlive(record: Pick<TemporaryRecord, "owner">, table?: ProcessIdentity[] | null): boolean | null;
/** Refuse aliasing ancestors, including a symlink to a directory. The system
 * temp directory itself may have a platform alias; callers resolve it first.
 * @param {string} path */
export declare function requireTemporaryDirectory(path: string): string;
/** @param {string} repository */
export declare function markUnindexed(repository: string): void;
/** Each token owns an append-only segment. Retiring a completed root never
 * rewrites another process's live segment.
 * @param {string} repository */
export declare const temporaryLedgerPath: (repository: string) => string;
/** Nearest nested owner boundaries, including invalid markers. A parent must
 * not erase a descendant's independent retention or live ownership.
 * @param {string} path @returns {string[]} */
export declare function nestedTemporaryRoots(path: string): string[];
/** @param {string} path @returns {TemporaryRecord|null} */
export declare function readTemporaryOwner(path: string): TemporaryRecord | null;
/** @param {string} path @param {TemporaryRecord} record */
export declare function writeTemporaryOwner(path: string, record: TemporaryRecord): void;
/** Mark a fixed owned root, used for session scratch and cached fixtures.
 * An existing unmarked directory requires the owning protocol's explicit
 * adoption; normal fixture creation never adopts material.
 * @param {string} path @param {TemporaryOptions} options */
export declare function ensureTemporaryRoot(path: string, options: TemporaryOptions): string;
/** @param {string} prefix @param {TemporaryOptions} options */
export declare function createTemporaryRoot(prefix: string, options: TemporaryOptions): string;
/** Fixture convenience keeps each call site's existing prefix and nesting.
 * @param {string} prefix */
export declare const createFixtureRoot: (prefix: string) => string;
/** @param {string} prefix */
export declare const createWorkerCapture: (prefix: string) => string;
/** Application scratch has its own explicit operation cleanup. A containing
 * fixture still owns its fallback lifetime if that operation is interrupted.
 * @param {string} prefix */
export declare const createScratchRoot: (prefix: string) => string;
/** Promotion hands a staging directory to an existing durable protocol. Its
 * random temporary owner must never enter the published product inventory.
 * @param {string} path */
export declare function promoteTemporaryRoot(path: string): void;
/** Links are counted as entries, never followed, including node_modules links.
 * @param {string} path @param {Set<string>} [excluded] @returns {Inventory} */
export declare function temporaryInventory(path: string, excluded?: Set<string>): Inventory;
/** Change directory permissions only, never a link target or file contents.
 * @param {string} path */
export declare function makeTemporaryWritable(path: string): void;
/** Explicit creator teardown. The pruning judge performs its additional
 * liveness/retention checks before calling this identity-checked remover.
 * @param {string} path @param {string} [token] */
export declare function removeTemporaryRoot(path: string, token?: string): Inventory;
/** fs.rmSync-compatible creator cleanup, with measurements for owned material.
 * Removing unrelated files keeps fs.rmSync's ordinary behavior.
 * @param {import("node:fs").PathLike} path @param {import("node:fs").RmOptions} [options] */
export declare function removeTemporaryPath(path: import("node:fs").PathLike, options?: import("node:fs").RmOptions): void;
/** @param {string} repository @returns {Array<Record<string, any>>} */
export declare function temporaryLedger(repository: string): Array<Record<string, any>>;
/** Metrics are durable before a gate retires its completed segments. Other
 * cleanup retires only absent roots with a proven dead owner; live segments
 * are append-only and are never rewritten by a concurrent census.
 * @param {string} repository @param {string} [gateId] */
export declare function retireTemporaryLedger(repository: string, gateId?: string): void;
/** Current root registrations, not individual file deletions.
 * @param {string} repository */
export declare function registeredTemporaryRoots(repository: string): any[];
/** File inventories count each deleted incarnation and remaining entries once;
 * overwrites and material removed outside the helper are explicitly unobserved.
 * @param {string} repository @param {string} gateId */
export declare function temporaryChurn(repository: string, gateId: string): {
    filesCreated: number;
    filesDeleted: number;
    bytesWritten: number;
    source: string;
};
/** Gate-owned disposable material shares the suite's outcome even when it
 * lives outside a fixture directory. Caches and independent coordination
 * retain their own protocols.
 * @param {TemporaryRecord} record */
export declare const hasGateTemporaryLifetime: (record: TemporaryRecord) => boolean;
/** Normal completion and crash-recovery preview judge the same retention.
 * @param {TemporaryRecord} record @param {"passed"|"failed"|"abandoned"} outcome
 * @param {string} endedAt @returns {TemporaryRecord} */
export declare function temporaryOutcomeRecord(record: TemporaryRecord, outcome: "passed" | "failed" | "abandoned", endedAt: string): TemporaryRecord;
/** @param {string} path @param {"passed"|"failed"} outcome @param {string} [endedAt] */
export declare function finishTemporaryRoot(path: string, outcome: "passed" | "failed", endedAt?: string): TemporaryRecord;
/** @param {TemporaryRecord} record @param {number} [now] */
export declare function temporaryRetentionPassed(record: TemporaryRecord, now?: number): boolean;
/** The caller has established the end of this dispatch and released its
 * writer. Explicit teardown does not wait for the orphan-retention window;
 * a null window still preserves the class. Live worker processes retain
 * captures even after their supervising session has ended.
 * A turn-end caller supplies no dispatch completion; its live or unknown
 * host retains scratch for the next turn.
 * @param {string} repository @param {string} sessionId
 * @param {{dispatchEnded?: boolean}} [options] */
export declare function pruneSessionTemporaryRoots(repository: string, sessionId: string, { dispatchEnded }?: {
    dispatchEnded?: boolean;
}): {
    removed: string[];
    retained: any[];
    blockers: {
        path: string;
        reason: string;
    }[];
};
/** @param {string} path @param {number} pid */
export declare function assignTemporaryProcess(path: string, pid: number): void;
