import { type AcceptanceCriterion, type AuthorityGrant, type NamedVerificationTest, type VerificationFinding, type ReviewFinding, type VerificationSubject, type VerificationTask, type WorktreeVerificationContract } from "@dotln/compiler";
import { type AuthorityEnvelope, type Command, type EventDraft, type ExecutableProgramV1, type WorkOrder } from "@dotln/kernel";
import type { EvidenceWorkerResult } from "./verification-protocol.js";
export declare const REPAIR_HOST = "repair-host";
export declare const repairEventTypes: readonly ["RepairOpened", "RepairTick", "RepairCommandPersisted", "RepairCommandResult", "RepairDerived", "RepairCompleted", "RepairExhausted", "NeedsHuman"];
export interface RepairOriginal {
    readonly workOrder: WorkOrder;
    readonly authorityEnvelope: AuthorityEnvelope;
    readonly surfaces: readonly string[];
    readonly tests: readonly NamedVerificationTest[];
    readonly criteria: readonly AcceptanceCriterion[];
    readonly roundLimit?: number;
}
/** Fields consumed by the open repair event envelope; branches validate their
 * own inputs before admitting them into the state. */
export interface RepairEventPayload {
    readonly original: RepairOriginal;
    readonly grants: RepairGrants;
    readonly baseline: VerificationSubject;
    readonly subject: VerificationSubject;
    readonly continuation: unknown;
    readonly reviewItem?: {
        readonly finding: VerificationFinding;
        readonly witness: ReviewRepairWitness;
    };
    readonly command: Command;
    readonly commandId: string;
    readonly result: string;
    readonly capsule: VerificationTask;
    readonly value: EvidenceWorkerResult;
    readonly verifierCommand: Command;
    readonly observation: unknown;
    readonly tests: unknown;
    readonly reason: unknown;
    readonly offending: unknown;
    readonly derivation: RepairDerivation;
}
/** Host-recorded PR item, supplied separately from the triage judgment.
 * It authorizes no expansion and is never verifier evidence. */
export interface ReviewRepairWitness {
    readonly evidenceId: string;
    readonly subjectRevision: string;
    readonly criterionId: string;
    readonly itemId: string;
    readonly class: "automated-review" | "ci-failure" | "independent-review";
    readonly reviewFinding?: ReviewFinding;
    readonly path?: string;
    readonly line?: number;
    readonly checkName?: string;
    readonly testCommand: string;
    readonly observed: string;
    readonly expected: string;
}
/** Scope is admitted separately from verifier output. The registry is host-owned. */
export interface RepairScopeGrant {
    readonly grant: AuthorityGrant;
    readonly surfaces: readonly string[];
    readonly tests: readonly string[];
}
export interface RepairGrants {
    readonly requested: readonly RepairScopeGrant[];
    readonly registry: readonly RepairScopeGrant[];
}
export declare const noRepairGrants: RepairGrants;
export interface RepairOrder extends RepairOriginal {
    readonly contract: WorktreeVerificationContract;
    readonly contractHash: string;
    readonly round: number;
    readonly executionBaseCommit: string;
    readonly finding: VerificationFinding;
    readonly grantIds: readonly string[];
}
export type RepairDerivation = {
    readonly kind: "derived";
    readonly order: RepairOrder;
} | {
    readonly kind: "NeedsHuman";
    readonly reason: string;
    readonly offending: string;
};
export declare const repairContract: (order: WorkOrder) => WorktreeVerificationContract;
export declare const repairHash: (value: unknown) => string;
export declare const repairEqual: (a: unknown, b: unknown) => boolean;
export declare const repairContains: (surfaces: readonly string[], path: string) => boolean;
/** Pure derivation: evidence IDs never become filesystem paths or shell prose. */
export declare function deriveRepairOrder(findingInput: VerificationFinding, input: RepairOriginal & {
    readonly subject: VerificationSubject;
    readonly round: number;
    readonly reviewItem?: ReviewRepairWitness;
}, grants?: RepairGrants): RepairDerivation;
export interface RepairState {
    readonly workstreamId: string;
    readonly original: RepairOriginal;
    readonly grants: RepairGrants;
    readonly baseline: VerificationSubject;
    readonly subject: VerificationSubject;
    readonly round: number;
    readonly currentCommit: string;
    readonly continuation: ExecutableProgramV1;
    readonly pending: Command | null;
    readonly emission: EventDraft | null;
    readonly order: RepairOrder | null;
    readonly finding: VerificationFinding | null;
    readonly verified: boolean;
    readonly status: "running" | "complete" | "exhausted" | "needs-human";
    readonly reason: string | null;
}
export declare function repairEvent(state: Pick<RepairState, "workstreamId" | "round" | "finding">, type: string): EventDraft;
export declare function repairCommand(state: Pick<RepairState, "workstreamId" | "round">, kind: "write" | "verify"): Command;
export declare function repairVerificationProgram(state: RepairState): ExecutableProgramV1;
export declare function repairRoundProgram(state: RepairState): ExecutableProgramV1;
/** Terminal exhaustion and containment refusals never offer another dispatch. */
export declare const repairNextAction: (state: RepairState) => "run" | "human" | "none";
