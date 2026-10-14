import { type PlanRefutationRequest, type PlanSubject } from "./plan-refutation-protocol.js";
import { type WorkOrderTransport } from "./worker-transport.js";
/** A one-shot counterpart of the blinded verification capsule host. */
export declare function runPlanRefutation(subject: PlanSubject, transport: WorkOrderTransport<PlanRefutationRequest>, model: string, effort: string, now?: () => number, retentionDirectory?: string): Promise<{
    effort: string;
    mode?: "subagents";
    raw?: string;
    result: import("./plan-refutation-protocol.js").PlanRefutationResult;
    transport: import("./worker-protocol.js").WorkerTransportName;
    harnessVersion: string;
    model: string;
    selectionSource: "host-launch";
    effectiveModel: string;
    effectiveEffort: string;
    dispatchedAt: string;
    completedAt: string;
    semanticHash: string;
    commandReceipt: import("./worker-protocol.js").CommandReceipt;
}>;
