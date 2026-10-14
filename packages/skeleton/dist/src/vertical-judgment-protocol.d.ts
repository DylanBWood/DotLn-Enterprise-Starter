/** WO-112: the vertical's run-time judgment episodes. Intake classifies the
 * screened issue's undecided spans and their baseline meaning; triage judges
 * one observed automated review item against the contract and candidate. Both
 * are tool-less model returns the host validates against the subject it sent;
 * no host rule reads the source's English. */
import { type SourceBundle, type SourceSpan, type StoryClassInference, type StoryContract, type StoryStatementClass } from "@dotln/compiler";
import type { Command, WorkOrder } from "@dotln/kernel";
import type { BaselineAssessment } from "./vertical.js";
import { type WorkerEffort } from "./worker-protocol.js";
export declare const VERTICAL_JUDGMENT_LIMITS: {
    readonly timeoutMs: 600000;
    readonly maxBudgetUsd: "2.00";
};
/** Classes a model may give an undecided span. Rule classes (struck, visual
 * annotation, question, answer) stay with the compiler's declared markup. */
export declare const INTAKE_CLASSES: readonly ["requirement", "non-requirement", "example", "current-behavior observation", "inference", "assumption", "contradiction", "open decision"];
export declare const BASELINE_KINDS: readonly ["existing-failure", "no-existing-failure", "unresolved"];
export declare const TRIAGE_KINDS: readonly ["accept", "reject", "acknowledge", "NeedsHuman"];
/** An inline item (path, line and thread) can be repaired or rejected on its
 * thread; a review body has neither, so it can only be acknowledged as asking
 * for nothing actionable, or left to a human. */
export declare const triageKinds: (item: TriageSubject["item"]) => readonly ["acknowledge", "NeedsHuman"] | readonly ["accept", "reject", "NeedsHuman"];
/** The whole subject travels in one prompt; a larger one is refused by name. */
export declare const MAX_SUBJECT_CHARS = 400000;
export interface IntakeSubject {
    readonly schemaVersion: "vertical-intake-v1";
    readonly bundleId: string;
    readonly revisionId: string;
    /** The whole screened source, in bundle order, as context. */
    readonly source: readonly {
        readonly unit: string;
        readonly role: string;
        readonly text: string;
    }[];
    /** Spans to judge. A fixedClass span was decided by a compiler rule; the
     * episode returns that class unchanged and judges only its baseline. */
    readonly spans: readonly {
        readonly spanId: string;
        readonly unit: string;
        readonly text: string;
        readonly fixedClass: StoryStatementClass | null;
    }[];
}
export interface IntakeResult {
    readonly spans: readonly {
        readonly spanId: string;
        readonly class: StoryStatementClass;
        readonly rationale: string;
        readonly baseline: (typeof BASELINE_KINDS)[number];
        readonly baselineRationale: string;
    }[];
    readonly summary: string;
}
export interface TriageSubject {
    readonly schemaVersion: "vertical-triage-v1";
    readonly item: {
        readonly id: string;
        readonly class: "automated-review" | "ci-failure";
        readonly path: string | null;
        readonly line: number | null;
        readonly text: string;
    };
    readonly criteria: readonly {
        readonly criterionId: string;
        readonly description: string;
    }[];
    readonly statements: readonly {
        readonly class: StoryStatementClass;
        readonly text: string;
    }[];
    readonly candidate: {
        readonly revision: string;
        readonly diff: string;
        readonly files: readonly {
            readonly path: string;
            readonly contents: string;
        }[];
    };
    /** The only references a judgment may cite. */
    readonly evidence: readonly {
        readonly ref: string;
        readonly detail: string;
    }[];
}
export interface TriageResult {
    readonly kind: (typeof TRIAGE_KINDS)[number];
    readonly criterionId: string | null;
    readonly reason: string;
    readonly evidenceRefs: readonly string[];
}
export type VerticalJudgmentTask = "intake" | "triage";
export type VerticalJudgmentResult = IntakeResult | TriageResult;
export interface VerticalJudgmentRequest {
    readonly kind: "vertical-judgment";
    readonly task: VerticalJudgmentTask;
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly subject: IntakeSubject | TriageSubject;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly cwd: string;
    readonly profile: {
        readonly profileId: "vertical-judgment-v1";
        readonly modelTools: readonly [];
    };
}
export declare const isVerticalJudgmentRequest: (request: {
    readonly kind?: string;
} | {
    readonly command: Command;
}) => request is VerticalJudgmentRequest;
export declare const verticalJudgmentSubjectHash: (subject: IntakeSubject | TriageSubject) => string;
/** Every undecided gap the compiler leaves, one span per non-blank line, and
 * every rule-decided statement with its fixed class. Offsets are the bundle's
 * own UTF-8 byte ranges, so a returned class binds to exact source. Discussion
 * by anyone but the reporter is never offered: a third party cannot add an
 * obligation through the model, so such text stays an open decision and the
 * run stops for a human. */
export declare function intakeSpans(bundle: SourceBundle): {
    spanId: string;
    span: SourceSpan;
    unit: string;
    text: string;
    fixedClass: StoryStatementClass | null;
}[];
export declare function intakeSubject(bundle: SourceBundle, spans?: {
    spanId: string;
    span: SourceSpan;
    unit: string;
    text: string;
    fixedClass: StoryStatementClass | null;
}[]): IntakeSubject;
/** The validated return becomes the compiler's inference slot and a baseline
 * assessment bound to the compiled statement identities. Rule statements keep
 * their class; the model judges only their baseline meaning. */
export declare function admitIntake(bundle: SourceBundle, result: IntakeResult, producer: {
    readonly kind: "model" | "double";
    readonly name: string;
}): {
    readonly inferences: readonly StoryClassInference[];
    readonly contract: StoryContract;
    readonly baselineAssessment: BaselineAssessment;
};
export declare function validateVerticalJudgmentRequest(request: VerticalJudgmentRequest): void;
export declare function verticalJudgmentResultSchema(request: VerticalJudgmentRequest): object;
export declare function validateIntakeResult(value: unknown, subject: IntakeSubject): IntakeResult;
export declare function validateTriageResult(value: unknown, subject: TriageSubject): TriageResult;
export declare function validateVerticalJudgmentResult(value: unknown, request: VerticalJudgmentRequest): VerticalJudgmentResult;
export declare function verticalJudgmentPrompt(request: VerticalJudgmentRequest): string;
