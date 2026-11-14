/** Parse a boundary's immutable before/after inputs in one short-lived
 * process; each source's comment bodies, in order. The parser identifies
 * context-sensitive literals, so regex, templates and JSX text cannot
 * impersonate trivia. */
export declare function feedbackSourcesComments(inputs: readonly {
    readonly path: string;
    readonly source: string;
}[]): readonly (readonly string[])[];
/** Parse token boundaries first so regex, templates, and JSX text cannot impersonate trivia. */
export declare function feedbackSourceComments(path: string, source: string): readonly string[];
