/**
 * Source-only Codex adapter, embedded in its generated project hook. It
 * dispatches no lifecycle command, and it reads the host's transcript only to
 * find the first reply after a compaction.
 *
 * For a dispatched session it journals each operator message with its form
 * class and keeps the message's bounded text beside the journal; after a
 * compaction it restores every one of those messages with the task, permits
 * one continuation after a premature stop and records the first reply against
 * the saved task. A turn that stops without asking for a continuation lets the
 * session's own writer reservation go, and the next prompt of a session whose
 * dispatch is still outstanding reserves it again, as Claude's hooks do around
 * each turn. Only a session whose prompt hook has been observed releases, so a
 * host that delivers no prompt event keeps the reservation until completion.
 * Missing observations leave native stopping available.
 * @param {Record<string, any>} input
 * @param {typeof import('./operator-control.mjs').operatorControl} operatorControl
 * @param {(prompt: string) => { prefix: string | null, prefixLine: number | null, class: string }} [classify]
 * @param {(root: string) => Promise<Record<string, any> | null>} [loadRuntime]
 * @param {(session: { intent?: string, role?: string }) => string} [phaseOf]
 *   The harness's own phase resolver, so both journal writers name a phase alike.
 * @returns {Promise<Record<string, any>>}
 */
export declare function codexContinuation(input: Record<string, any>, operatorControl: typeof import('./operator-control.mjs').operatorControl, classify?: (prompt: string) => {
    prefix: string | null;
    prefixLine: number | null;
    class: string;
}, loadRuntime?: (root: string) => Promise<Record<string, any> | null>, phaseOf?: (session: {
    intent?: string;
    role?: string;
}) => string): Promise<Record<string, any>>;
