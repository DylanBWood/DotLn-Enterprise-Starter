export interface TextRow {
    readonly key: string;
    readonly line: number;
    readonly values: Readonly<Record<string, string>>;
}
/** These are pinned repository formats, not a general Markdown implementation. */
export declare function tableRows(text: string, header: readonly string[]): readonly TextRow[];
export declare const plainText: (value: string) => string;
export declare const markdownLinks: (value: string) => readonly string[];
export declare const CAPABILITY_HEADER: readonly ["Capability and declared scope", "Current level", "Target level", "Required dimensions", "Evidence links", "Dependencies", "Last change", "Next smallest promotable increment", "Blocking gate", "Efficiency"];
export declare const PUBLICATION_HEADER: readonly ["Section", "Audiences", "Status"];
export declare function parseCapabilities(text: string): readonly TextRow[];
/** The generated index's two pages (WO-190) share one card format; each
 * page is pinned by its own title. A page without cards is a valid state (an
 * empty queue, or a fresh instance's history page). */
export declare const INDEX_PAGE_TITLES: {
    readonly index: "# Work orders";
    readonly history: "# Work-order history";
};
export declare function parseWorkOrderIndex(text: string, title?: string): readonly TextRow[];
/** Workstream cells come from the index's committed JSON observation, never
 * from prose or a live target checkout. Older indexes have no groups. */
export declare function parseWorkstreams(text: string): readonly TextRow[];
export declare function parseReleases(text: string): readonly TextRow[];
export declare function parseConstellation(text: string): readonly TextRow[];
export declare function parsePendingRungs(text: string): readonly TextRow[];
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
