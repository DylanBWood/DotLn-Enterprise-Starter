import { type CompiledFeedback } from "@dotln/compiler";
export declare const FEEDBACK_SOURCE_PATHS: readonly ["package-lock.json", "packages/skeleton/package.json", "packages/compiler/src/feedback.ts", "packages/compiler/src/attribution.mjs", "packages/compiler/src/artifact-identity.ts", "packages/compiler/src/verification.ts", "packages/skeleton/src/loadouts/feedback.ts", "packages/skeleton/src/feedback-boundary.ts", "packages/skeleton/src/feedback-source-comments.ts", "packages/skeleton/src/feedback-audit.ts", "packages/skeleton/src/gate-deadlines.mjs", "packages/skeleton/src/feedback-selfhost.ts", "packages/skeleton/src/reactor.ts", "packages/skeleton/src/verification-fold.ts", "packages/skeleton/src/repair.ts", "packages/skeleton/src/review.ts", "packages/skeleton/src/repair-host.ts", "packages/skeleton/src/resident-state.ts", "packages/skeleton/src/vertical.ts", "packages/skeleton/src/presence-signals.ts", "packages/skeleton/src/presence-machine.ts", "packages/skeleton/src/actor-catalog.ts", "packages/skeleton/src/actor-contract.ts", "packages/skeleton/src/cli-actor-contract.ts", "packages/skeleton/src/cli-actor.ts", "packages/skeleton/src/cli-episode.ts", "packages/skeleton/src/handoff-contract.ts", "packages/skeleton/src/handoff-actor.ts", "packages/skeleton/src/work-candidate.ts", "packages/skeleton/src/script-episode.ts", "packages/skeleton/src/discovery-sandbox.ts", "packages/skeleton/src/discovery-actor.ts", "packages/skeleton/src/discovery-cli.ts", "packages/skeleton/src/discovery.ts", "packages/skeleton/src/verification-protocol.ts", "packages/skeleton/src/entropy-review-protocol.ts", "packages/skeleton/src/mission-check-protocol.ts", "packages/skeleton/src/vertical-judgment-protocol.ts", "packages/skeleton/src/plan-refutation-protocol.ts", "packages/skeleton/src/verification-host.ts", "packages/skeleton/src/verification-worktree.ts", "packages/skeleton/src/worker-transport.ts", "packages/skeleton/src/worker-protocol.ts", "packages/skeleton/src/execution-environment.ts", "packages/skeleton/src/source-change-environment.ts", "packages/skeleton/src/source-change-command.ts", "packages/skeleton/src/source-change-host.ts", "packages/skeleton/src/host-interruption.ts", "scripts/lib/host-resources.mjs", "scripts/lib/gate-scheduling-baseline.json", "scripts/lib/host-lock.c", "scripts/lib/host-footprint.c", "packages/skeleton/src/source-change-state.ts", "packages/skeleton/src/source-change-worktree.ts", "packages/skeleton/src/usage-observation.mjs", "packages/skeleton/src/worker-store.ts", "packages/skeleton/test/feedback-fixtures.test.ts", "packages/skeleton/test/feedback-v2.test.ts", "packages/skeleton/test/feedback-audit-source.test.ts", "scripts/feedback-commit-msg.mjs"];
/** A labeled behavior dependency projection, never a claim of raw manifest bytes. */
export declare function feedbackSourceFile(path: string, contents: string): {
    path: string;
    contents: string;
};
export declare function readFeedbackSource(root: string): {
    files: {
        path: string;
        contents: string;
    }[];
    subject: string;
};
export declare function feedbackContextAccounting(program: CompiledFeedback, baseline: {
    readonly files: readonly {
        readonly lines: number;
        readonly bytes: number;
    }[];
}): {
    method: string;
    baselineRef: string;
    commonBaseline: {
        files: number;
        lines: number;
        bytes: number;
    };
    proseEquivalent: {
        files: number;
        lines: number;
        bytes: number;
    };
    compiledResidue: {
        files: number;
        lines: number;
        bytes: number;
    };
    beforeBytes: number;
    afterBytes: number;
    savedBytes: number;
    limits: string;
};
export declare function runFeedbackRegressions(root: string, program: CompiledFeedback): {
    contractVersion: string;
    policyHash: string;
    subject: string;
    fixtures: {
        unitId: string;
        present: {
            command: string;
            mechanism: string;
            exitCode: number | null;
            passed: number;
            failed: number;
            captured: string[];
        };
        removed: {
            command: string;
            mechanism: string;
            exitCode: number | null;
            passed: number;
            failed: number;
            captured: string[];
        };
    }[];
    context: {
        method: string;
        baselineRef: string;
        commonBaseline: {
            files: number;
            lines: number;
            bytes: number;
        };
        proseEquivalent: {
            files: number;
            lines: number;
            bytes: number;
        };
        compiledResidue: {
            files: number;
            lines: number;
            bytes: number;
        };
        beforeBytes: number;
        afterBytes: number;
        savedBytes: number;
        limits: string;
    };
    maturityMethod: string;
    maturity: {
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
};
export type FeedbackAuditReport = ReturnType<typeof runFeedbackRegressions>;
