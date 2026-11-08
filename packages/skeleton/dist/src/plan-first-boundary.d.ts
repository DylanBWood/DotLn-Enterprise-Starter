/** The election read by the lifecycle's own reader, so a value it refuses
 * (`"on"`, `"true"`, `1`) throws the message the lifecycle prints and is never
 * read as off. An absent configuration elects nothing and loads no reader. A
 * root that carries no lifecycle feature reader (a synthetic launchpad) has
 * no lifecycle message to agree with and keeps the direct read the hook made
 * before (WO-258-D031). */
export declare function planFirstElected(root: string): boolean;
/** The runtime and the lifecycle use the same freshness judgment. Off keeps
 * old consumers independent of the new helper, including historical fixtures. */
export declare function planFirstBoundary(root: string, order: string | undefined): {
    refusal: string | null;
    directory?: string;
    candidate?: string;
    evidenceDirectory?: string;
    intakeDirectory?: string;
};
