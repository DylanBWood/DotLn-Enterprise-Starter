import type { Command, WorkOrder } from "@dotln/kernel";
import { type LensBrief, type NonEmptyStrings, type RefutationAttempt, type RefutationSelection } from "./loadouts/entropy-reducer.js";
import { type WorkerEffort } from "./worker-protocol.js";
/** The dispatch shapes for the compiled Entropy Reducer. The loadout owns the
 * review contract, the selection rule and the report builder; this file only
 * carries them to a worker and binds what comes back. REVIEW-001 measured
 * 1,019.6 s and USD 10.52 for the review and 745.9 s and USD 6.22 for the
 * refutation, so both limits sit above the one observed run rather than at the
 * 180 s worker default. */
export declare const ENTROPY_REVIEW_LIMITS: {
    readonly timeoutMs: 2400000;
    readonly maxBudgetUsd: "20.00";
};
export declare const ENTROPY_REFUTATION_LIMITS: {
    readonly timeoutMs: 1800000;
    readonly maxBudgetUsd: "12.00";
};
/** The tools the review profile names. The file tools are confined to the
 * working directory by `--restricted`; command execution is admitted so the
 * reviewer can measure rather than infer, and its confinement to the frozen
 * copy is instructed, then checked by the tracked-status hash the host
 * records on either side of the episode. */
export declare const ENTROPY_REVIEW_TOOLS: readonly ["Bash", "Read", "Glob", "Grep"];
export type EntropyEpisodeKind = "entropy-review" | "entropy-refutation";
/** What was frozen, named by value rather than by trust in the worker. */
export interface EntropyReviewSubject {
    readonly schemaVersion: "entropy-review-v1";
    readonly baseCommit: string;
    readonly repository: string;
    readonly scratchRepository: string;
    readonly trackedStatusSha256: string;
    readonly scratchInventorySha256: string;
    readonly scratchInventoryCount: number;
    readonly hash: string;
}
export interface EntropyReviewRequest {
    readonly kind: "entropy-review";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly subject: EntropyReviewSubject;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly cwd: string;
    /** The episode’s other writable root, beside the frozen copy. */
    readonly temporaryDirectory?: string;
    /** A host-owned directory outside the frozen copy where the transport
     * retains the raw return. Writing it inside `cwd` would show up as a
     * scratch delta and make the confinement inventory lie. */
    readonly capture: string;
    readonly residue: string;
    readonly lensBriefs: readonly LensBrief[];
    /** The operator's optional concern. A hypothesis to inspect, never a
     * required finding. */
    readonly concern: string | null;
    readonly profile: {
        readonly profileId: "entropy-review-v1";
        readonly modelTools: readonly string[];
    };
}
/** Only the blinded subjects the compiled selection rule chose. No reviewer
 * narrative, observed-versus-expected conclusion, severity, proposal or
 * desired survival count crosses this boundary. */
export interface EntropyRefutationSubjects {
    readonly measured: readonly Readonly<{
        findingId: string;
        command: string;
    }>[];
    readonly inspection: readonly Readonly<{
        findingId: string;
        steps: NonEmptyStrings;
    }>[];
}
export interface EntropyRefutationRequest {
    readonly kind: "entropy-refutation";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly subject: EntropyReviewSubject;
    readonly subjects: EntropyRefutationSubjects;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly cwd: string;
    /** The episode’s other writable root, beside the frozen copy. */
    readonly temporaryDirectory?: string;
    readonly capture: string;
    readonly profile: {
        readonly profileId: "entropy-refutation-v1";
        readonly modelTools: readonly string[];
    };
}
export interface EntropyRefutationResult {
    readonly schemaVersion: 1;
    readonly attempts: readonly RefutationAttempt[];
}
export declare const isEntropyReviewRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: Command;
}) => request is EntropyReviewRequest;
export declare const isEntropyRefutationRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: Command;
}) => request is EntropyRefutationRequest;
export declare const isEntropyRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: Command;
}) => request is EntropyReviewRequest | EntropyRefutationRequest;
export declare function assertEntropySubject(value: unknown): asserts value is EntropyReviewSubject;
export declare function validateEntropyReviewRequest(request: EntropyReviewRequest): void;
export declare function validateEntropyRefutationRequest(request: EntropyRefutationRequest): void;
/** The review returns exactly the loadout's own output contract. The host
 * revalidates it with `validateReviewerOutput` against this episode. */
export declare const entropyReviewResultSchema: () => object;
export declare const entropyRefutationResultSchema: (request: EntropyRefutationRequest) => object;
export declare function validateEntropyRefutationResult(value: unknown, request: EntropyRefutationRequest): EntropyRefutationResult;
export declare const entropyReviewPrompt: (request: EntropyReviewRequest) => string;
export declare const entropyRefutationPrompt: (request: EntropyRefutationRequest) => string;
export type { RefutationAttempt, RefutationSelection };
