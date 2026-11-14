import type { DocumentCell, DocumentStructure } from "./types.js";
export interface TextRow {
    readonly key: string;
    readonly line: number;
    readonly values: Readonly<Record<string, string>>;
}
/** One row of a document table: its first cell, its line and every cell by
 * its column's header. */
export interface TableRow {
    readonly key: DocumentCell;
    readonly line: number;
    readonly values: Readonly<Record<string, DocumentCell>>;
}
/** A document's structure as the collector received it, checked before any
 * projection reads it. */
export declare function documentStructure(value: unknown): DocumentStructure;
/** A cell's text on one line: a line break in a table cell reads as "; ". */
export declare const cellText: (cell: DocumentCell) => string;
/** The rows of every table whose header row is `header`, in document order;
 * a row with another column count refuses. */
export declare function tableRows(document: DocumentStructure, header: readonly string[]): readonly TableRow[];
export declare const CAPABILITY_HEADER: readonly ["Capability and declared scope", "Current level", "Target level", "Required dimensions", "Evidence links", "Dependencies", "Last change", "Next smallest promotable increment", "Blocking gate", "Efficiency"];
export declare const PUBLICATION_HEADER: readonly ["Section", "Audiences", "Status"];
/** Every row of the capability table's recognized tables, in line order, each
 * with the assessment its nearest level-two heading names. A table with any
 * other header refuses. */
export declare function parseCapabilities(value: unknown): readonly TableRow[];
/** One workstream member: its `WS-NNN/WO-NNN` key and its cells. */
export interface WorkstreamRow {
    readonly key: string;
    readonly values: Readonly<Record<string, string>>;
}
/** Workstream cells come from the index record's workstream observation,
 * never from prose or a live target checkout. */
export declare function parseWorkstreams(text: string): readonly WorkstreamRow[];
export declare function parseReleases(text: string): readonly TextRow[];
export declare function parseConstellation(text: string): readonly TextRow[];
/** The roadmap's pending application rungs: each level-two heading that
 * names an application version still pending. */
export declare function parsePendingRungs(value: unknown): readonly TextRow[];
export interface RefutationSummary {
    readonly receipt: string;
    readonly format: string;
    readonly scope: string;
    readonly planVerdict: string;
    readonly holdReasons: readonly string[];
    readonly rows: readonly {
        readonly workOrder: string;
        readonly verdict: string;
        readonly reason: string;
        readonly thesis: string | null;
        readonly capabilityRow: string | null;
        readonly roles: readonly string[];
    }[];
}
/** Latest is selected by the dated immutable filename, never by a prose verdict. */
export declare function parseRefutation(ref: string, value: unknown): RefutationSummary;
