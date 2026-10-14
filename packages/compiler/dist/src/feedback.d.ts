import type { WorkOrder } from "./types.js";
/** Closed v1 handler vocabulary. Personal units live in the host's loadout. */
export declare const FEEDBACK_HANDLERS: {
    readonly "decision-lineage": {
        readonly kind: "pre-effect-guard";
        readonly rung: 2;
    };
    readonly "evidence-judgment": {
        readonly kind: "evaluator";
        readonly rung: 5;
    };
    readonly "semantic-correction": {
        readonly kind: "pure-reactor";
        readonly rung: 3;
    };
    readonly "application-evidence": {
        readonly kind: "workflow-gate";
        readonly rung: 6;
    };
    readonly attribution: {
        readonly kind: "script";
        readonly rung: 1;
    };
    readonly "writer-isolation": {
        readonly kind: "pre-effect-guard";
        readonly rung: 2;
    };
    readonly "suppression-diff": {
        readonly kind: "script";
        readonly rung: 1;
    };
    readonly "output-review": {
        readonly kind: "workflow-gate";
        readonly rung: 6;
    };
    readonly "complete-scope": {
        readonly kind: "workflow-gate";
        readonly rung: 6;
    };
    readonly "cleanup-scope": {
        readonly kind: "pre-effect-guard";
        readonly rung: 2;
    };
};
export type FeedbackHandler = keyof typeof FEEDBACK_HANDLERS;
export interface FeedbackUnit {
    readonly unitId: string;
    readonly version: number;
    readonly incident: {
        readonly sourceRefs: readonly string[];
        readonly sourceTreatment: "synthesized-from-public-lineage";
        readonly summary: string;
        /** Retained source is referenced, not duplicated into every derivative. */
        readonly retainedSource: "public-reference";
    };
    readonly undesiredBehavior: string;
    readonly desiredBehavior: string;
    readonly scope: readonly string[];
    readonly trigger: FeedbackHandler;
    readonly mechanism: {
        readonly handler: FeedbackHandler;
        readonly version: 1 | 2;
        readonly kind?: "prose";
        readonly rationale: string;
    };
    readonly enforcement: "hard" | "soft" | "advisory";
    readonly requiredEvidence: readonly string[];
    readonly regressionFixtures: readonly string[];
    readonly conflicts: readonly string[];
    readonly supersedes: readonly string[];
    readonly retirementCondition: string;
    readonly nextMaturityCondition: string;
    readonly proseEquivalent: string;
}
export interface CompiledFeedback {
    readonly contractVersion: "feedback-v1";
    readonly compilerPackageVersion: string;
    readonly units: readonly FeedbackUnit[];
    readonly mechanisms: readonly {
        readonly unitId: string;
        readonly handler: FeedbackHandler;
        readonly kind: string;
        readonly rung: number;
        readonly enforcement: FeedbackUnit["enforcement"];
    }[];
    readonly policyHash: string;
}
/** Lower declared corrections to executable handlers, with no prompt emission. */
export declare function compileFeedbackUnits(input: readonly FeedbackUnit[]): CompiledFeedback;
/** A recorded program keeps the compiler release it names; everything else
 * must be this compiler's lowering of its units, so a log recorded before a
 * release-only bump still replays and any policy drift fails (WO-154). */
export declare function assertCompiledFeedback(program: CompiledFeedback): void;
/** These facts are supplied by the host, not accepted from worker result prose. */
export type FeedbackRequest = {
    readonly kind: "decision-lineage";
    readonly proposedApproach: string;
    readonly requiredOutcomes: readonly string[];
    readonly preservedOutcomes: readonly string[];
    readonly rejected: readonly {
        readonly approach: string;
        readonly reason: string;
    }[];
    readonly explicitSupersessions: readonly string[];
    readonly proposedHardConstraints: readonly string[];
    readonly explicitHardConstraints: readonly string[];
} | {
    readonly kind: "evidence-judgment";
    readonly subject: string;
    readonly claimed: "pass" | "fail";
    readonly operatorPreference: "pass" | "fail";
    readonly witnesses: readonly {
        readonly subject: string;
        readonly outcome: "pass" | "fail";
        readonly source: "independent" | "implementer";
        readonly evidenceRef: string;
    }[];
} | {
    readonly kind: "application-evidence";
    readonly subject: string;
    readonly requiredChecks: readonly string[];
    readonly runs: readonly {
        readonly checkId: string;
        readonly subject: string;
        readonly exitCode: number;
        readonly executed: boolean;
        readonly evidenceRef: string;
    }[];
} | {
    readonly kind: "attribution";
    readonly message: string;
} | {
    readonly kind: "writer-isolation";
    readonly actorId: string;
    readonly worktree: string;
    readonly cwd: string;
    readonly gitRoot: string;
    readonly branch: string;
    readonly writable: boolean;
    readonly writers: readonly {
        readonly actorId: string;
        readonly worktree: string;
    }[];
} | {
    readonly kind: "suppression-diff";
    readonly files: readonly {
        readonly path: string;
        readonly beforeComments: readonly string[];
        readonly afterComments: readonly string[];
    }[];
} | {
    readonly kind: "output-review";
    readonly outputs: readonly {
        readonly path: string;
        readonly hash: string;
    }[];
    readonly reads: readonly {
        readonly path: string;
        readonly hash: string;
        readonly evidenceRef: string;
    }[];
} | {
    readonly kind: "complete-scope";
    readonly required: readonly string[];
    readonly completed: readonly string[];
    readonly remaining: readonly string[];
    readonly status: string;
} | {
    readonly kind: "cleanup-scope";
    readonly path: string;
    readonly allowedPaths: readonly string[];
    readonly adjacent: boolean;
    readonly unambiguous: boolean;
    readonly lowRisk: boolean;
    readonly obscuresDiff: boolean;
    readonly retainedEvidence: boolean;
    readonly requiredChecks: readonly string[];
    readonly coveredChecks: readonly string[];
    readonly assessmentRef: string;
};
export interface FeedbackViolation {
    readonly unitId: string;
    readonly reason: string;
    readonly enforcement: FeedbackUnit["enforcement"];
}
export interface FeedbackVerdict {
    readonly allowed: boolean;
    readonly violations: readonly FeedbackViolation[];
    readonly eligibleUnits: readonly string[];
}
export { hasAiAttribution } from "./attribution.mjs";
export declare function evaluateFeedback(program: CompiledFeedback, request: FeedbackRequest): FeedbackVerdict;
export declare const SEMANTIC_CORRECTIONS: readonly ["OperatorCorrectionReceived", "OperatorReportsRegression", "OperatorRejectsUnsupportedAssumption", "OperatorReportsRepeatedFailure"];
export interface CorrectionState {
    readonly allowedEffects: readonly string[];
    readonly destructiveEffects: readonly string[];
    readonly scopeExpansionAllowed: boolean;
    readonly preserveEvidence: boolean;
    readonly diagnosisRequired: boolean;
    readonly corrections: readonly string[];
}
/** Monotone meet: even a mistakenly classified typed event can only tighten. */
export declare function applyFeedbackCorrection(program: CompiledFeedback, state: CorrectionState, event: {
    readonly type: string;
    readonly eventId: string;
}): CorrectionState;
export interface FeedbackObservation {
    readonly unitId: string;
    readonly episodeId: string;
    readonly source: "fixture" | "live";
    readonly activated: boolean;
    readonly prevented: boolean;
    readonly falseActivation: boolean;
    readonly overridden: boolean;
}
export declare function feedbackMaturity(program: CompiledFeedback, observations: readonly FeedbackObservation[]): {
    unitId: string;
    version: number;
    currentMechanism: "application-evidence" | "attribution" | "cleanup-scope" | "complete-scope" | "decision-lineage" | "evidence-judgment" | "output-review" | "semantic-correction" | "suppression-diff" | "writer-isolation";
    nextMaturityCondition: string;
    awakened: false;
    fixture: {
        eligibleEpisodes: number;
        activations: number;
        incidentsPrevented: number;
        falseActivations: number;
        overrides: number;
    };
    live: {
        eligibleEpisodes: number;
        activations: number;
        incidentsPrevented: number;
        falseActivations: number;
        overrides: number;
    };
}[];
/** One bounded read-only work order; execution is a fixed host subprocess. */
export declare function compileFeedbackAudit(program: CompiledFeedback, repo: string, baseCommit: string, subject: string): WorkOrder;
