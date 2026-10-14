import { type SourceBundle, type SourceSpan } from "@dotln/compiler";
/** Read-only SourceAdapter (WO-062). Persist only screened source text and
 * declared receipt metadata, without adding raw replies, diagnostics, author
 * logins or target selectors as metadata. The WO-060 screen is a declared
 * filter, not a detector of every secret. Consumers must inspect the receipt
 * or call requireCompleteIssueBundle before treating the input as complete.
 *
 * GitHub's observed UserContentEdit.diff values are full versions, newest first,
 * with the newest matching current text. Screen them without storing their text;
 * revisions cover retained current content and receipt history is text-free.
 * The declared fields do not supply image bytes or their hashes.
 * Image markup stays in its original text; its receipt span records that the
 * content hash is unavailable. No URL hash is misrepresented as an image hash.
 */
export declare const ISSUE_SOURCE_FIELDS: Readonly<{
    issue: string[];
    comment: string[];
    author: string[];
    edits: string[];
    connection: string[];
}>;
export declare const ISSUE_AUTOMATION_PATTERN: RegExp;
export interface AbsentIssueField {
    readonly path: string;
    readonly reason: "missing" | "unavailable";
}
export interface RefusedIssueItem {
    readonly id: string;
    readonly shape: string;
    readonly path: string;
    readonly span: SourceSpan;
}
export interface OmittedIssueItem {
    readonly id: string;
    readonly path: string;
    readonly reason: "undetermined-role";
}
export interface IssueBundleReceipt {
    readonly schemaVersion: 1;
    readonly bundleHash: string;
    readonly status: "ready" | "stopped";
    readonly refused: readonly RefusedIssueItem[];
    readonly omitted: readonly OmittedIssueItem[];
    readonly absent: readonly AbsentIssueField[];
    readonly history: readonly {
        id: string;
        editedAt: string;
        subjectId: string;
    }[];
    readonly imageReferences: readonly {
        id: string;
        referencedBy: SourceSpan;
        contentHash: "unavailable";
    }[];
}
export interface IssueBundleResult {
    readonly bundle: SourceBundle;
    readonly hash: string;
    readonly status: IssueBundleReceipt["status"];
    readonly receipt: IssueBundleReceipt;
    readonly paths: {
        readonly bundle: string;
        readonly receipt: string;
    };
}
export declare class IssueSourceRefusal extends Error {
    readonly code: "input" | "gh" | "changed" | "storage" | "incomplete";
    readonly absent: readonly AbsentIssueField[];
    constructor(code: "input" | "gh" | "changed" | "storage" | "incomplete", reason: string, absent?: readonly AbsentIssueField[]);
}
/** Fetches only through executeGh. No caller checkout or ambient GH target is
 * used. All remote reads, structural validation and screens precede storage. */
export declare function fetchIssueBundle(repo: string, number: number, options: {
    directory: string;
    cwd?: string;
}): Promise<IssueBundleResult>;
export declare function requireCompleteIssueBundle(result: IssueBundleResult): SourceBundle;
