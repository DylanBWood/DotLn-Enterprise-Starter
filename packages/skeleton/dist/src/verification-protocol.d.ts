import { type CompiledFeedback, type Evaluation, type RepositoryFile, type VerificationFinding, type ReviewFinding, type VerificationTask } from "@dotln/compiler";
import { type ReviewContext } from "./review.js";
import type { Command, ResultEnvelope, WorkOrder } from "@dotln/kernel";
import { type PlanRefutationRequest, type PlanRefutationResult } from "./plan-refutation-protocol.js";
import { type ReviewerOutput } from "./loadouts/entropy-reducer.js";
import { type VerticalJudgmentRequest, type VerticalJudgmentResult } from "./vertical-judgment-protocol.js";
import { type EntropyRefutationRequest, type EntropyRefutationResult, type EntropyReviewRequest } from "./entropy-review-protocol.js";
import { type MissionCheckObserved, type MissionCheckRequest } from "./mission-check-protocol.js";
import { type WriterRequest, type WriterResult, type WorkerEffort, type WorkerRequest, type WorkerResult, type WorkerTransportName } from "./worker-protocol.js";
/** Fixed bound for the source-heavy feedback audit; other profiles keep WO-009 limits. */
export declare const FEEDBACK_VERIFIER_LIMITS: {
    readonly timeoutMs: 600000;
    readonly maxBudgetUsd: "5.00";
};
/** Baseline is an episode on existing behavior claims, not a compiler role. */
export type BaselineStory = {
    readonly storyId: string;
    readonly kind: "new";
} | {
    readonly storyId: string;
    readonly kind: "defect";
    readonly tests: readonly {
        readonly criterionId: string;
        readonly checkId: string;
        readonly command: string;
        readonly expectedExitCode: number;
    }[];
};
export interface BaselineWitness {
    readonly story: BaselineStory;
    readonly capsule: VerificationTask;
    readonly episodeId: string;
    readonly outcome: "reproduced" | "not-reproduced" | "walked";
    readonly limitation: string | null;
    readonly evidenceIds: readonly string[];
}
export type BaselineContext = {
    readonly kind: "baseline";
    readonly story: BaselineStory;
} | {
    readonly kind: "comparison";
    readonly witness: BaselineWitness;
};
export interface BaselineComparisonFinding {
    readonly kind: "baseline-test-did-not-fail";
    readonly storyId: string;
    readonly criterionId: string;
    readonly checkId: string;
    readonly command: string;
    readonly candidateEvidenceId: string | null;
    readonly baselineEvidenceId: string | null;
    readonly observed: string;
    readonly expected: string;
}
export declare function baselineWitnessRows(witness: BaselineWitness): {
    witness?: import("@dotln/compiler").VerificationWitness;
    hostTest?: {
        readonly kind: "host-run-test";
        readonly origin: "host";
        readonly snapshotHash: string;
        readonly command: string;
        readonly exitCode: number | null;
        readonly signal: string | null;
        readonly stdout: string;
        readonly stderr: string;
    };
    evidenceId: string;
    criterionId: string;
    checkId: string;
    claimType: import("@dotln/compiler").ClaimType;
    subjectRevision: string;
    codeSurfaces: readonly string[];
    automatedTest: string | null;
    observed: string;
    expected: string;
    outcome: "pass" | "fail" | "unavailable";
    reproductionSteps: readonly string[];
    subject: "baseline";
    origin: "host";
    source: "live";
}[];
/** Composition calls this before any implementation effect. */
export declare function baselineDisposition(witness: BaselineWitness): {
    readonly kind: "Continue";
    readonly storyId: string;
} | {
    readonly kind: "BaselineNotReproduced";
    readonly storyId: string;
    readonly limitation: string;
};
export declare function createBaselineWitness(story: BaselineStory, capsule: VerificationTask, episodeId: string): BaselineWitness;
export declare function validateBaselineWitness(witness: BaselineWitness): void;
export declare function validateBaselineContext(context: BaselineContext, capsule: VerificationTask): void;
export declare function compareBaseline(context: BaselineContext | undefined, capsule: VerificationTask): readonly BaselineComparisonFinding[];
export interface EvidenceWorkerRequest {
    readonly review?: ReviewContext;
    readonly baseline?: BaselineContext;
    readonly feedback?: CompiledFeedback;
    readonly kind: "evidence-worker";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly capsule: VerificationTask;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly cwd: string;
    readonly profile: {
        readonly profileId: "verification-snapshot-v1" | "worktree-snapshot";
        readonly mounts: readonly {
            readonly path: string;
            readonly access: "read";
        }[];
    };
}
export interface VerificationWorkerResult {
    readonly baselineFindings?: readonly BaselineComparisonFinding[];
    readonly kind: "verification";
    readonly envelope: ResultEnvelope;
    readonly subjectRevision: string;
    readonly evaluations: readonly Evaluation[];
    readonly findings: readonly VerificationFinding[];
}
export interface ReviewWorkerResult {
    readonly kind: "review";
    readonly envelope: ResultEnvelope;
    readonly subjectRevision: string;
    readonly findings: readonly ReviewFinding[];
}
export interface BaselineWorkerResult {
    readonly kind: "baseline";
    readonly envelope: ResultEnvelope;
    readonly subjectRevision: string;
}
export interface RepairWorkerResult {
    readonly kind: "repair";
    readonly envelope: ResultEnvelope;
    readonly subjectRevision: string;
    readonly replacements: readonly RepositoryFile[];
}
export type EvidenceWorkerResult = VerificationWorkerResult | RepairWorkerResult | BaselineWorkerResult | ReviewWorkerResult;
export type TransportRequest = WorkerRequest | WriterRequest | EvidenceWorkerRequest | PlanRefutationRequest | MissionCheckRequest | EntropyReviewRequest | EntropyRefutationRequest | VerticalJudgmentRequest;
export type TransportResult = WorkerResult | WriterResult | EvidenceWorkerResult | PlanRefutationResult | MissionCheckObserved | ReviewerOutput | EntropyRefutationResult | VerticalJudgmentResult;
export type TransportResultFor<R extends TransportRequest> = R extends VerticalJudgmentRequest ? VerticalJudgmentResult : R extends EntropyReviewRequest ? ReviewerOutput : R extends EntropyRefutationRequest ? EntropyRefutationResult : R extends MissionCheckRequest ? MissionCheckObserved : R extends PlanRefutationRequest ? PlanRefutationResult : R extends EvidenceWorkerRequest ? EvidenceWorkerResult : R extends WriterRequest ? WriterResult : WorkerResult;
export declare const isPlanRequest: (request: TransportRequest) => request is PlanRefutationRequest;
export declare const isEvidenceRequest: (request: TransportRequest) => request is EvidenceWorkerRequest;
/** Every contract reason an evidence result can be refused for. The list is
 * closed: `check` accepts nothing else, so a new reason is added here first. */
export declare const EVIDENCE_RESULT_REFUSALS: readonly ["episode result shape", "review cannot return edits or diff", "review finding contract", "review episode identity", "episode envelope.summary must be a string of at most 320 characters", "episode envelope", "episode role or subject", "repair replacements", "repair outside focused surface", "repair has no substantive change", "criterion coverage", "evaluation shape", "evaluation criterion", "claim-typed evidence", "unsupported pass", "defect baseline did not fail", "baseline comparison findings", "visual pass requires screenshot", "network pass requires trace", "console error witness", "contradictory witness", "unsupported failure", "finding shape", "finding shape or duplicate", "finding criterion or evidence", "finding observed versus expected", "failed criterion lacks finding"];
export type EvidenceResultRefusal = (typeof EVIDENCE_RESULT_REFUSALS)[number];
/** What an `invalid-result` refusal may record and print (WO-157 item 8,
 * WO-152 D009): the contract reasons, the transport's parse phases, the
 * host's receipt check and `unclassified`. Raw model output is never among
 * them. */
export declare const INVALID_RESULT_DETAILS: readonly ["episode result shape", "review cannot return edits or diff", "review finding contract", "review episode identity", "episode envelope.summary must be a string of at most 320 characters", "episode envelope", "episode role or subject", "repair replacements", "repair outside focused surface", "repair has no substantive change", "criterion coverage", "evaluation shape", "evaluation criterion", "claim-typed evidence", "unsupported pass", "defect baseline did not fail", "baseline comparison findings", "visual pass requires screenshot", "network pass requires trace", "console error witness", "contradictory witness", "unsupported failure", "finding shape", "finding shape or duplicate", "finding criterion or evidence", "finding observed versus expected", "failed criterion lacks finding", "wire-json", "final-message-absent", "final-message-json", "receipt-command", "unclassified"];
export type InvalidResultDetail = (typeof INVALID_RESULT_DETAILS)[number];
/** A detail outside the vocabulary is refused verbatim and recorded as
 * `unclassified`, so the refusal itself is never lost. */
export declare const invalidResultDetail: (detail: string | undefined) => InvalidResultDetail;
export declare function parseEvidenceResult(value: unknown, request: Pick<EvidenceWorkerRequest, "command" | "workOrder" | "capsule" | "episodeId" | "baseline" | "review">): EvidenceWorkerResult;
export declare function evidenceResultSchema(request: EvidenceWorkerRequest): object;
export declare function validateTransportRequest(request: TransportRequest): void;
export declare function transportResultSchema(request: TransportRequest): object;
export declare function parseTransportResult<R extends TransportRequest>(value: unknown, request: R): TransportResultFor<R>;
export declare function transportPrompt(request: TransportRequest, harness?: WorkerTransportName): string;
