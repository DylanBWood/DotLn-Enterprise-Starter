/** Physical journal lane retained by the installed harness until loader migration.
 * @param {string} root */
export declare const dispatchJournalDirectory: (root: string) => string;
export declare class DispatchJournalError extends Error {
    file: string;
    detail: string;
    /** @param {string} file @param {unknown} cause */
    constructor(file: string, cause: unknown);
}
/** @param {import("./harness-host.js").HarnessSession | null | undefined} journal */
export declare const boundJournal: (journal: import("./harness-host.js").HarnessSession | null | undefined) => import("./harness-host.js").HarnessSession | {
    role: string;
    intent: string;
    workOrder: string | null;
    startedAt: string;
    phaseBoundary: string;
    unavailable?: string;
} | null | undefined;
/** Whether a dispatch names a work order, by its line: an order's own phase
 * (the resume phrases an executor, a verifier, a reviewer and a release
 * close are dispatched by) or a drive of one order. A planning pass, a
 * refutation and any other dispatch name none, whatever order the checkout's
 * control record happens to select: such a dispatch starts at its own
 * session and shares no attempt with an earlier session on the same line.
 * @param {unknown} intent */
export declare const dispatchNamesOrder: (intent: unknown) => boolean;
/** Read and validate one journal with the same path-bearing error at every entry.
 * @param {string} file */
export declare function readDispatchJournal(file: string): import("./harness-host.js").HarnessSession | {
    role: string;
    intent: string;
    workOrder: string | null;
    startedAt: string;
    phaseBoundary: string;
    unavailable?: string;
} | null | undefined;
/** The rows of a journal kept as one JSON object a line (a session's
 * `<key>.jsonl`, the usage ledger): every line that parses to an object, in
 * the file's order. A missing file has no rows. A line that does not parse,
 * such as a write cut short, is passed over, because the rows around it
 * still stand. Anything but a regular file is refused.
 * @param {string} file @returns {Record<string, any>[]} */
export declare function readJournalRows(file: string): Record<string, any>[];
/** @param {string} dir */
export declare function readDispatchJournals(dir: string): {
    key: string;
    journal: import("./harness-host.js").HarnessSession | {
        role: string;
        intent: string;
        workOrder: string | null;
        startedAt: string;
        phaseBoundary: string;
        unavailable?: string;
    };
}[];
