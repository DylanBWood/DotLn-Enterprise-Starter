export type TemporaryClass = "gate-fixture" | "session-scratch" | "worker-capture" | "warm-fixture" | "coordination" | "closed-journal";
export type TemporaryOwner = {
    pid: number | null;
    birth: string | null;
    repository: string;
    gateId?: string;
    suite?: string;
    session?: string;
    workOrder?: string;
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
/** @typedef {"gate-fixture"|"session-scratch"|"worker-capture"|"warm-fixture"|"coordination"|"closed-journal"} TemporaryClass */
/** @typedef {{pid: number|null, birth: string|null, repository: string, gateId?: string, suite?: string, session?: string, workOrder?: string}} TemporaryOwner */
/** @typedef {{schemaVersion: 1, token: string, class: TemporaryClass, owner: TemporaryOwner, createdAt: string, retentionHours: number|null, retentionOverride?: number|null, fixtureOwner?: {token: string, gateId: string, suite?: string}, device: number, inode: number, endedAt?: string, endSource?: "completion"|"owner-death-observation", outcome?: "passed"|"failed"|"abandoned", cacheKey?: string}} TemporaryRecord */
/** @typedef {{class: TemporaryClass, owner?: Partial<TemporaryOwner>, repository?: string, retentionHours?: number|null, cacheKey?: string, adoptExisting?: boolean}} TemporaryOptions */
/** @typedef {{pid: number, birth: string, ppid?: number, command?: string}} ProcessIdentity */
/** @typedef {{files: number, bytes: number, directories: number}} Inventory */
export declare const TEMPORARY_OWNER_FILE = ".dotln-owner.json";
/** Where a removal moves a root before deleting it: beside it, so the rename
 * stays on its volume, under a name its token derives. A root already there
 * is its own place aside.
 * @param {string} path @param {string} token */
export declare const temporaryRemovalAside: (path: string, token: string) => string;
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
    "closed-journal": 720;
}>;
/** The entries a closed-journal root may hold beside its owner record: the
 * session journals and other append-only logs, the session states and their
 * per-session sidecars, the gate index, the suite-success and deadline
 * directories, the order's change review reports, and a superseded state kept
 * when a retried close merged a newer one. Anything else is not the close's
 * to remove.
 * @param {string} name @param {boolean} directory */
export declare const closedJournalEntry: (name: string, directory: boolean) => boolean;
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
export type WalkOptions = {
    budget?: (path: string) => void;
    repair?: boolean;
    chmod?: (path: string, mode: number) => void;
    repaired?: Array<{
        path: string;
        mode: number;
    }>;
};
/** What a walk over an owned root may be given. `budget` is called before
 * each directory is listed or entry examined, and throws once a prune's time
 * is spent. `repair` lets the walk grant the owner access to an entry the
 * owner cannot read, through `chmod` (chmodSync unless a fixture makes it
 * fail), and `repaired` collects each grant's path and former mode, so a
 * caller that then keeps the root can put them back.
 * @typedef {{budget?: (path: string) => void, repair?: boolean, chmod?: (path: string, mode: number) => void, repaired?: Array<{path: string, mode: number}>}} WalkOptions */
/** Nearest nested owner boundaries, including invalid markers. A parent must
 * not erase a descendant's independent retention or live ownership. A
 * directory its owner cannot list stops the walk as a restricted entry,
 * unless `repair` is set: the walk then grants the owner read, write and
 * search on it and lists it.
 * @param {string} path @param {WalkOptions} [options] @returns {string[]} */
export declare function nestedTemporaryRoots(path: string, options?: WalkOptions): string[];
/** Code of the refusal a walk or removal raises for an entry its owner
 * cannot read and, where asked, could not repair. */
export declare const RESTRICTED_ENTRY = "RESTRICTED_ENTRY";
/** Puts back the modes a walk granted, newest first. What can no longer be
 * changed back, as an entry since removed, is left as it is.
 * @param {Array<{path: string, mode: number}>} repaired */
export declare function restoreTemporaryRepairs(repaired: Array<{
    path: string;
    mode: number;
}>): void;
/** A root is its token and its inode. The token in the marker inside the
 * directory proves it is the one that was created, since fixture copies exclude
 * the marker and seeds keep it out of Git, and the inode says it was not
 * replaced on its volume. A volume's device number is assigned at mount and a
 * reboot can renumber it, so a device that differs while the inode matches is
 * re-stamped through writeTemporaryOwner, never refused for that alone.
 * @param {string} path @returns {TemporaryRecord|null} */
export declare function readTemporaryOwner(path: string): TemporaryRecord | null;
/** The ledger's word against a root's marker, for a judgment that may delete
 * it. Where the owner repository exists, its ledger must register the
 * marker's token at this path, so a record naming a repository that never
 * registered it is refused; a root whose repository is gone, as after a closed
 * worktree's removal, is judged by its marker alone.
 * @param {string} path @param {TemporaryRecord} record @returns {string|null} */
export declare function temporaryLedgerContradiction(path: string, record: TemporaryRecord): string | null;
/** Writes the record over the marker of the directory it names. The inode must
 * still match. A differing device is a renumbered volume. Where the owner
 * repository exists it is re-stamped only under the ledger binding above and
 * recorded on the root's ledger segment with both numbers. Where the owner
 * repository is gone, as after a closed worktree's removal, no ledger remains
 * to hold it, and the second proof is the marker inside the directory: it
 * must carry the record's token, beside the inode compared here, before the
 * device is re-stamped. Returns the record as written.
 * @param {string} path @param {TemporaryRecord} record @returns {TemporaryRecord} */
export declare function writeTemporaryOwner(path: string, record: TemporaryRecord): TemporaryRecord;
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
/** Removes a tree, or a single file, that its caller has already judged
 * removable: each directory is made writable, then each entry is deleted.
 * With a `budget`, both walks ask it before every entry, so a bounded removal
 * stops inside the tree, leaving it partly deleted at its path for the
 * caller's next run to judge and finish. Without one this is one recursive
 * rmSync. Links are deleted, never followed.
 * @param {string} path @param {RemovalOptions} [options] */
export declare function removeTree(path: string, options?: RemovalOptions): void;
/** Explicit creator teardown. The pruning judge performs its additional
 * liveness/retention checks before calling this identity-checked remover.
 * @param {string} path @param {string} [token] @param {RemovalOptions} [options] */
export declare function removeTemporaryRoot(path: string, token?: string, options?: RemovalOptions): Inventory;
export type RemovalOptions = {
    budget?: (path: string) => void;
    chmod?: (path: string, mode: number) => void;
};
/** One walk before a removal, or before the byte proof of a root about to
 * go: an entry its owner cannot read is granted what reading and deleting
 * need, and every entry is counted as temporaryInventory counts it. Links are
 * counted, never followed or changed.
 * @param {string} path @param {RemovalOptions} [options] @returns {Inventory} */
export declare function prepareTemporaryRemoval(path: string, options?: RemovalOptions): Inventory;
/** The act of a removal whose identity was read as `record`. Whatever holds
 * the path when the act starts is moved aside by one atomic rename, so what is
 * deleted is never chosen by a path a replacement could take after the
 * identity was read: the moved directory must carry the record's inode and its
 * marker the record's token, or it goes back to its path while that is still
 * free and nothing is deleted. A parent that refuses the rename refuses before
 * anything changes; a root already aside shows the same before any of it is
 * deleted. Nothing inside is touched before the root is verified: owned roots
 * nested in it go with it, and one that a stop leaves in its aside is bound
 * through its parent's registration (ledgerBinding). The place aside is
 * recorded before the rename, so their segments wait for it
 * (retireTemporaryLedger). Any failure after the rename
 * puts the root back at its path, and its owner record goes last, so a removal
 * that stops leaves a root its marker still names: at its path, or, stopped by
 * the process ending, aside where its ledger finds it (registeredTemporaryRoots).
 * So does a removal a prune's budget or an unrepairable entry stops: the
 * entries already deleted stay deleted, and the next prune finishes the rest.
 * @param {string} path @param {TemporaryRecord} record @param {RemovalOptions} [options] */
export declare function removeVerifiedTemporaryRoot(path: string, record: TemporaryRecord, options?: RemovalOptions): Inventory;
/** Whether a directory is what a removal leaves when it stops after deleting
 * the owner record and before the directory itself: named for a token's aside
 * and empty, so nothing in it remains to retain.
 * @param {string} path */
export declare function temporaryRemovalRemains(path: string): boolean;
/** Removes such remains with rmdir, which refuses anything that has since
 * appeared inside, after checking the directory judged is the one present.
 * Where the given repository's ledger registers that token, its registration
 * ends here as removed.
 * @param {string} path @param {number} inode @param {string} repository */
export declare function removeTemporaryRemovalRemains(path: string, inode: number, repository: string): void;
/** fs.rmSync-compatible creator cleanup, with measurements for owned material.
 * Removing unrelated files keeps fs.rmSync's ordinary behavior.
 * @param {import("node:fs").PathLike} path @param {import("node:fs").RmOptions} [options] */
export declare function removeTemporaryPath(path: import("node:fs").PathLike, options?: import("node:fs").RmOptions): void;
/** @param {string} repository @returns {Array<Record<string, any>>} */
export declare function temporaryLedger(repository: string): Array<Record<string, any>>;
/** Metrics are durable before a gate retires its completed segments. Other
 * cleanup retires only absent roots with a proven dead owner; live segments
 * are append-only and are never rewritten by a concurrent census. A segment
 * waits while its root may still be held inside a removal aside: its own,
 * wherever the removal recorded it, or an ancestor's. A caller that already
 * holds a process table passes it, so one observation serves a whole prune
 * (null is an unavailable table, which proves no owner dead); `gateIds`
 * retires several finished gates' segments in one reading of the ledger.
 * @param {string} repository @param {string} [gateId]
 * @param {{table?: ProcessIdentity[]|null, gateIds?: Set<string>}} [options] */
export declare function retireTemporaryLedger(repository: string, gateId?: string, options?: {
    table?: ProcessIdentity[] | null;
    gateIds?: Set<string>;
}): void;
/** The ledger segment files of a repository, one per token. A prune reads
 * them one at a time, so its budget can stop the listing between two.
 * @param {string} repository @returns {string[]} */
export declare function temporaryLedgerSegments(repository: string): string[];
/** The root one segment still registers, or null: its creation not followed
 * by a removal or promotion of that path, at its path or, where a stopped
 * removal left it, aside. A segment holds one token's rows.
 * @param {string} file @returns {Record<string, any>|null} */
export declare function registeredTemporaryRootOf(file: string): Record<string, any> | null;
/** Current root registrations, not individual file deletions.
 * @param {string} repository */
export declare function registeredTemporaryRoots(repository: string): Record<string, any>[];
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
