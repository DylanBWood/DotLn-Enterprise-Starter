/** Registration attempts may overlap: their existing conditional instance
 * protocol chooses the writer. A lease prevents teardown during that attempt.
 * Publishing the lease before checking the exclusive lock closes both races.
 * @template T
 * @param {string} root
 * @param {() => T} operation
 * @returns {T}
 */
export declare function withWriterRegistration<T>(root: string, operation: () => T): T;
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
