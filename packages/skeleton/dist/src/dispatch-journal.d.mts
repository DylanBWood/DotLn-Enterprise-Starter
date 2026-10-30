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
