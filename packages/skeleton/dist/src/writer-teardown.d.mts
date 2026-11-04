/** The process table's state column (`ps -o stat=` on macOS and Linux) opens
 * with `Z` for a zombie: a process that has exited and waits only for its
 * parent to collect its status. Signal zero still finds it, but it holds no
 * file, runs nothing and can write nothing again, so a writer reservation it
 * owns is stale however long its row lingers in the table.
 * @param {unknown} state */
export declare const zombieProcessState: (state: unknown) => boolean;
/** One process's table state, or undefined when the table cannot say: an
 * absent row or a refused `ps` is unknown, never dead.
 * @param {number} pid */
export declare function processTableState(pid: number): string | undefined;
/** Registration attempts may overlap: their existing conditional instance
 * protocol chooses the writer. A lease prevents teardown during that attempt.
 * Publishing the lease before checking the exclusive lock closes both races.
 * @template T
 * @param {string} root
 * @param {() => T} operation
 * @param {{repository?: string}} [options]
 * @returns {T}
 */
export declare function withWriterRegistration<T>(root: string, operation: () => T, { repository }?: {
    repository?: string;
}): T;
/** Teardown excludes every registration attempt. Coordination lives outside
 * the subject so removing the subject cannot remove a lock or lease.
 * Abandoned locks or leases refuse; no process identity is guessed.
 * @template T
 * @param {string} root
 * @param {() => T} operation
 * @param {{requireGit?: boolean}} [options]
 * @returns {T}
 */
export declare function withWriterReservationLock<T>(root: string, operation: () => T, { requireGit }?: {
    requireGit?: boolean;
}): T;
/** Cleanup needs proof of no holder, not a guess about process liveness.
 * Honour both current directory instances and the legacy record. Malformed,
 * live, stale and unknown holders all preserve the worktree until released by
 * the existing writer protocol. @param {string} root
 */
export declare function writerTeardownBlocker(root: string): "writer reservation (not proven released)" | "writer reservation unreadable" | null;
