import { type AcceptanceCriterion, type VerificationSubject } from "@dotln/compiler";
import { type AuthorityEnvelope, type Decision, type Event, type ResultEnvelope } from "@dotln/kernel";
import { type WorkerEffort } from "./worker-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
import type { EvidenceWorkerRequest } from "./verification-protocol.js";
import { type VerificationHostOptions } from "./verification-host.js";
import { type AcceptanceEvidenceMatrix, type VerificationState } from "./verification.js";
import type { RuntimeState } from "./reactor.js";
export declare const VERIFICATION_WORKSTREAM = "ws_independent_verification";
export declare const verificationFixtureCriteria: readonly AcceptanceCriterion[];
/** Real store reads and a real subprocess, over an explicitly synthetic fixture. */
export declare function witnessVerificationFixture(repository: string, baseCommit: string): VerificationSubject;
export interface VerificationDemoOptions {
    readonly directory: string;
    readonly transport: WorkOrderTransport<EvidenceWorkerRequest>;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly now?: () => number;
    readonly maxRepairs?: number;
    readonly authority?: AuthorityEnvelope;
    readonly implementerNarrative?: string;
    readonly onEvent?: (event: Event, state: VerificationState) => void;
    readonly afterResultSaved?: VerificationHostOptions["afterResultSaved"];
    readonly afterRepairApplied?: () => void;
    readonly onRunning?: VerificationHostOptions["onRunning"];
}
export declare function runVerificationDemo(options: VerificationDemoOptions): Promise<{
    envelope: ResultEnvelope;
    matrix: AcceptanceEvidenceMatrix;
    log: string;
    decisions: readonly Decision<RuntimeState>[];
}>;
