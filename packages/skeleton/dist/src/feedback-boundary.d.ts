import { type CompiledFeedback, type FeedbackRequest, type FeedbackVerdict } from "@dotln/compiler";
export type FeedbackBoundaryRequest = Exclude<FeedbackRequest, {
    readonly kind: "suppression-diff";
}> | {
    readonly kind: "suppression-diff";
    readonly files: readonly {
        readonly path: string;
        readonly before: string;
        readonly after: string;
    }[];
};
export declare class FeedbackRefused extends Error {
    readonly verdict: FeedbackVerdict;
    constructor(verdict: FeedbackVerdict);
}
/** Only host-derived facts enter here. A model cannot call this with self-authored evidence. */
export declare function feedbackBoundary<T>(program: CompiledFeedback, facts: FeedbackBoundaryRequest, effect: () => T): T;
export declare const feedbackContentHash: (bytes: string | Uint8Array) => string;
export declare function feedbackReadOutput(path: string, evidenceRef: string): {
    contents: NonSharedBuffer;
    receipt: {
        path: string;
        hash: string;
        evidenceRef: string;
    };
};
/** Caller owns a reservation lock spanning this observation and writable dispatch. */
export declare function feedbackWriterFacts(cwd: string, actorId: string, writers: readonly {
    readonly actorId: string;
    readonly worktree: string;
}[]): Extract<FeedbackRequest, {
    readonly kind: "writer-isolation";
}>;
