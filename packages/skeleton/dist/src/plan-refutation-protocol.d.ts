import type { Command, WorkOrder } from "@dotln/kernel";
import { type WorkerEffort } from "./worker-protocol.js";
export interface PlanSubject {
    readonly schemaVersion: "plan-subject-v1";
    readonly revision: string;
    readonly hash: string;
    readonly sequenceHash: string;
    readonly inputs: readonly {
        readonly name: string;
        readonly hash: string;
    }[];
    readonly standard: {
        readonly theses: readonly {
            readonly id: string;
            readonly title: string;
            readonly text: string;
        }[];
        readonly exclusions: readonly {
            readonly id: string;
            readonly text: string;
        }[];
        readonly roles: readonly string[];
        readonly rolesTable: string;
        readonly capabilities: readonly {
            readonly id: string;
            readonly level: string;
        }[];
    };
    readonly orders: readonly {
        readonly workOrderId: string;
        readonly path: string;
        readonly title: string;
        readonly objective: string;
        readonly cost?: string | null;
        readonly criteria: readonly {
            readonly id: string;
            readonly text: string;
        }[];
        readonly nonGoals: string;
    }[];
    readonly deferrals: readonly {
        readonly thesis: string;
        readonly workOrderId: string;
        readonly laterWorkOrderId: string;
    }[];
    readonly costTable?: {
        readonly observedAt?: string;
        readonly subjectSourceHash: string;
        readonly acceptances: readonly {
            readonly date: string;
            readonly scope?: string;
            readonly metric: string;
            readonly dispatch: string;
            readonly reason: string;
            readonly ceiling: number;
        }[];
        readonly rows?: readonly unknown[];
    };
    readonly goalReview?: {
        readonly platformStandard: string;
        readonly goalStandard: string;
        readonly criticalPath: string;
        readonly evidenceHash: string;
        readonly observations: readonly {
            readonly id: string;
            readonly text: string;
        }[];
        readonly costEvidenceStatus: "current" | "stale" | "unknown";
    };
    readonly judgment?: {
        readonly scope: "pass" | "full";
        readonly judgedOrderIds: readonly string[];
    };
}
export interface PlanHold {
    readonly workOrderId: string;
    readonly criterionId: string;
    readonly reason: string;
}
export interface LegacyPlanRefutationResult {
    readonly orders: readonly {
        readonly workOrderId: string;
        readonly verdict: "thesis-advancing" | "machinery" | "drift";
        readonly thesis: string | null;
        readonly capabilityRow: string | null;
        readonly rolesServed: readonly string[];
        readonly reason: string;
    }[];
    readonly largestGap: PlanHold & {
        readonly thesis: string;
    };
    readonly planVerdict: "pass" | "hold";
    readonly holdReasons: readonly PlanHold[];
}
export type GoalVerdict = "aligned" | "aligned-with-findings" | "misaligned";
export interface GoalFinding {
    readonly criterionId: string;
    readonly kind: "observed-failure" | "vision-contradiction" | "known-issue";
    readonly reason: string;
    readonly evidence: string | null;
    readonly reopenWhen: string | null;
}
export interface GoalReviewResult {
    readonly schemaVersion: "plan-goal-review-v1";
    readonly orders: readonly {
        readonly workOrderId: string;
        readonly verdict: GoalVerdict;
        readonly criticalPathAndNoOp: string;
        readonly systemTraps: string;
        readonly removalBalance: string;
        readonly failureBehavior: string;
        readonly findings: readonly GoalFinding[];
    }[];
    readonly planVerdict: GoalVerdict;
    readonly holdReasons: readonly PlanHold[];
}
export type PlanRefutationResult = LegacyPlanRefutationResult | GoalReviewResult;
export interface PlanRefutationRequest {
    readonly kind: "plan-refutation";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly subject: PlanSubject;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly cwd: string;
    readonly profile: {
        readonly profileId: "plan-refutation-v1";
        readonly modelTools: readonly [];
    };
}
export declare const PLAN_REFUTATION_LIMITS: {
    readonly timeoutMs: 1200000;
    readonly maxBudgetUsd: "5.00";
};
export declare function validatePlanResult(value: unknown, subject: PlanSubject): PlanRefutationResult;
/** Historical results keep their original normalization and receipt identity. */
export declare function validateLegacyPlanResult(value: unknown, subject: PlanSubject): LegacyPlanRefutationResult;
export declare function validateGoalReview(value: unknown, subject: PlanSubject): GoalReviewResult;
export declare function planResultSchema(subject: PlanSubject): object;
export declare function validatePlanRequest(request: PlanRefutationRequest): void;
export declare const planPrompt: (request: PlanRefutationRequest) => string;
