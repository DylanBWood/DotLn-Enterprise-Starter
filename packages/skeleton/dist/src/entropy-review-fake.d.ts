import type { ReviewerOutput } from "./loadouts/entropy-reducer.js";
import type { EntropyRefutationRequest, EntropyRefutationResult, EntropyReviewRequest } from "./entropy-review-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
/** Synthetic findings, not observations about any repository. Two `measured`
 * and three `by inspection` keep both selection denominators non-zero without
 * crossing the sample threshold, so the fixture exercises the `all` branch;
 * the empty variant below exercises `not-applicable`. */
export declare const cannedReviewerOutput: (request: EntropyReviewRequest) => ReviewerOutput;
/** The zero-finding shape, so both denominators read `not-applicable`. */
export declare const cannedEmptyReviewerOutput: (request: EntropyReviewRequest) => ReviewerOutput;
export declare const cannedRefutationResult: (request: EntropyRefutationRequest, result?: "survived" | "refuted" | "blocked") => EntropyRefutationResult;
/** Drives the command family end to end without a model. It cannot satisfy a
 * live row: the host records its name and refuses to call a `fake` receipt a
 * pinned or substitute reviewer. */
export declare class FakeEntropyTransport implements WorkOrderTransport<EntropyReviewRequest | EntropyRefutationRequest> {
    private readonly review;
    private readonly refutation;
    readonly name: "fake";
    readonly harnessVersion = "fixture-v1";
    constructor(review?: (request: EntropyReviewRequest) => ReviewerOutput, refutation?: (request: EntropyRefutationRequest) => EntropyRefutationResult);
    dispatch(request: EntropyReviewRequest | EntropyRefutationRequest, now: () => number): {
        receipt: Promise<{
            commandId: string;
            transport: "fake";
            acceptedAt: number;
        }>;
        completed: Promise<never>;
        alive: () => boolean;
        kill: () => void;
    };
}
