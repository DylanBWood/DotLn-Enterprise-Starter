import type { Event, EventDraft } from "@dotln/kernel";
import type { ReviewWorkerResult } from "./verification-protocol.js";
import type { VerificationState } from "./verification.js";
import { type Evaluation, type ReviewFinding, type VerificationSubject, type VerificationTask } from "@dotln/compiler";
import { type RepairOriginal, type ReviewRepairWitness } from "./repair.js";
/** The capsule retains the prior verification contract; this is the current
 * episode's derived order, never an implementer-authored narrative. */
export declare const reviewWorkOrder: (capsule: VerificationTask) => {
    workOrderId: string;
    acceptanceCriteria: readonly string[];
    knownFacts: readonly string[];
    decisions: readonly string[];
    constraints: readonly string[];
    repo: string;
    baseCommit: string;
    allowedOperations: readonly string[];
    prohibitedOperations: readonly string[];
    requiredEvidence: readonly string[];
    objective: string;
    nonGoals: string[];
    outputContract: {
        type: string;
    };
};
/** Host-selected context. No implementer prose or worker-authored test rows. */
export interface ReviewContext {
    readonly conventionsPath: string | null;
    readonly baseline: VerificationSubject;
    readonly rows: readonly {
        readonly episodeId: string;
        readonly evaluation: Evaluation;
    }[];
    readonly implementerEpisodes: readonly string[];
}
export interface ReviewCompleted {
    readonly subjectRevision: string;
    readonly baselineRevision: string;
    readonly inputHash: string;
    readonly reviewerEpisodeId: string;
    readonly verifierEpisodeIds: readonly string[];
    readonly implementerEpisodeIds: readonly string[];
    readonly conventionsPath: string | null;
    readonly counts: Readonly<Record<ReviewFinding["severity"], number>>;
    readonly findings: readonly ReviewFinding[];
    readonly requiresHuman: boolean;
}
export declare function validateReviewOpening(conventionsPath: string | null, baseline: VerificationSubject, subject: VerificationSubject, baselineKind?: "baseline" | "comparison"): void;
export declare function validateReviewContext(review: ReviewContext, capsule: VerificationTask): void;
export declare function createReviewContext(state: VerificationState, capsule: VerificationTask): ReviewContext;
export declare function reviewReferences(capsule: VerificationTask, review: ReviewContext): string[];
/** Expected is the rule the implementation must hold; it is a review judgment,
 * not a fabricated failed behavior witness. */
export declare function copyReviewFindings(value: unknown, capsule: VerificationTask, review: ReviewContext): readonly ReviewFinding[];
export declare function createReviewCompleted(capsule: VerificationTask, review: ReviewContext, episodeId: string, findings: readonly ReviewFinding[], requiresHuman: boolean): ReviewCompleted;
export declare function reviewCompletedEvent(capsule: VerificationTask, review: ReviewContext, result: ReviewWorkerResult, admitted: Event, commandId: string): EventDraft;
/** WO-123's composition consumes the host's completed review; WO-182 consumes
 * knownItems. Only blocking findings can construct a RepairHost input. */
export declare function routeReview(review: ReviewCompleted, original: RepairOriginal, subject: VerificationSubject): {
    kind: "DeliverableKnownItems" | "NeedsHuman" | "RepairAndReverify";
    knownItems: ReviewFinding[];
    repairs: {
        original: {
            workOrder: import("@dotln/kernel").WorkOrder;
            authorityEnvelope: import("@dotln/kernel").AuthorityEnvelope;
            surfaces: readonly string[];
            tests: readonly import("@dotln/compiler").NamedVerificationTest[];
            criteria: readonly import("@dotln/compiler").AcceptanceCriterion[];
            roundLimit: number;
        };
        reviewItem: {
            witness: ReviewRepairWitness;
            finding: ReviewFinding;
        };
        derivation: import("./repair.js").RepairDerivation;
    }[];
};
