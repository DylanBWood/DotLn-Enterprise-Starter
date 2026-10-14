import type { PlanRefutationRequest, LegacyPlanRefutationResult, GoalReviewResult, PlanRefutationResult, PlanSubject } from "./plan-refutation-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
export declare const cannedPlanDrift: (subject: PlanSubject) => LegacyPlanRefutationResult;
export declare const cannedGoalReview: (subject: PlanSubject) => GoalReviewResult;
export declare class FakePlanRefutationTransport implements WorkOrderTransport<PlanRefutationRequest> {
    private readonly result;
    readonly name: "fake";
    readonly harnessVersion = "fixture-v1";
    constructor(result?: (subject: PlanSubject) => PlanRefutationResult);
    dispatch(request: PlanRefutationRequest, now: () => number): {
        receipt: Promise<{
            commandId: string;
            transport: "fake";
            acceptedAt: number;
        }>;
        completed: Promise<PlanRefutationResult>;
        alive: () => boolean;
        kill: () => void;
    };
}
