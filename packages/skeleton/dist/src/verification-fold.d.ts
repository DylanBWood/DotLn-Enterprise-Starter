import { type AcceptanceCriterion, type VerificationSubject, type VerificationTask } from "@dotln/compiler";
import type { AuthorityEnvelope, Command, Event } from "@dotln/kernel";
import type { VerificationPending, VerificationState } from "./verification.js";
import { type BaselineContext, type EvidenceWorkerResult, type VerificationWorkerResult } from "./verification-protocol.js";
export type VerificationPayload = {
    reviewNotice?: true;
    reviewConventionsPath?: string | null;
    baselineContext?: BaselineContext;
    criteria: readonly AcceptanceCriterion[];
    baseline: VerificationSubject;
    subject: VerificationSubject;
    implementerEpisodeId: string;
    /** Optional cumulative source-worker lineage, supplied by the host. */
    implementerEpisodeIds?: readonly string[];
    episodeNamespace?: string;
    maxRepairs: number;
    authority: AuthorityEnvelope;
    command: Command;
    commandId: string;
    workerEpisodeId: string;
    role: VerificationTask["role"];
    inputHash: string;
    leaseExpiresAt: number;
    mode: string;
    verificationResultVersion: number;
    result: string;
    value: EvidenceWorkerResult;
};
export declare function foldVerificationOpening(state: VerificationState, event: Event, value: VerificationPayload): VerificationState;
/** Evaluations and findings are folded only after the reactor admits the result. */
export declare function foldVerificationEvaluation(state: VerificationState, event: Event, pending: VerificationPending, result: VerificationWorkerResult, common: VerificationState): VerificationState;
export declare function foldVerificationRepair(state: VerificationState, event: Event, value: VerificationPayload): VerificationState;
