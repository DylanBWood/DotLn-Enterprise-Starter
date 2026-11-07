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
