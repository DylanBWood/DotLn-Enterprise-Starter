/** WO-123: pure admission and the persisted executable vertical. Host effects
 * live in vertical-host; source text arrives only through the bundle decoder. */
import { type AcceptanceCriterion, type AuthorityEnvelope, type AuthorityGrant, type CompiledPresencePhase, type NamedVerificationTest, type RepoSurfaceProfile, type SnapshotIndex, type SourceBundle, type StoryContract, type StoryInference, type SurfaceDerivation, type WorkOrder } from "@dotln/compiler";
import { type Event, type ExecutableProgramV1, type JsonValue } from "@dotln/kernel";
import { type Portfolio } from "./portfolio.js";
export declare const VERTICAL_EFFECTS: readonly ["repo.read", "repo.write", "git.local", "shell.run", "verification.evaluate", "repo.push", "pr.open", "pr.thread.resolve"];
export declare const VERTICAL_REMOTE_EFFECTS: readonly ["repo.push", "pr.open", "pr.thread.resolve"];
export declare const verticalHash: (value: unknown) => string;
export declare const verticalEqual: (a: unknown, b: unknown) => boolean;
export interface PreparedIntent {
    readonly draft: WorkOrder;
    readonly bundle: SourceBundle;
    readonly forgeHost: string;
    readonly inferences: readonly StoryInference[];
    /** Reviewed assertion meanings, bound to the compiled source contract. */
    readonly baselineAssessment?: unknown;
    readonly profile: RepoSurfaceProfile;
    readonly snapshot: SnapshotIndex;
    /** Host-bound physical target and commit; never taken from the filed draft. */
    readonly target: string;
    readonly baseCommit: string;
    readonly phase: CompiledPresencePhase;
    readonly at: number;
    readonly spent: {
        readonly episodes: number;
        readonly wallMs: number;
        readonly tokens: number;
    };
    readonly evidence?: readonly string[];
}
export interface IntentBinding {
    readonly key: string;
    readonly draftId: string;
    readonly portfolio: Portfolio;
    readonly target: string;
    readonly phaseId: string;
    readonly admittedAt: number;
    readonly authority: AuthorityEnvelope;
    readonly grants: readonly AuthorityGrant[];
    readonly contract: StoryContract;
    readonly baselineAssessment: BaselineAssessment;
    readonly derivation: SurfaceDerivation;
    readonly bundle: SourceBundle;
    readonly workOrder: WorkOrder;
    readonly criteria: readonly AcceptanceCriterion[];
    readonly tests: readonly NamedVerificationTest[];
    readonly statements: {
        readonly draftConstraint: "Standing authorization supersedes the draft's human-review-before-activation constraint.";
        readonly surfaceDerivation: {
            readonly beforeAdmission: true;
            readonly authorityEnvelopeId: string;
            readonly effect: "repo.read";
        };
    };
}
export type IntentAdmission = {
    readonly kind: "admitted";
    readonly binding: IntentBinding;
} | {
    readonly kind: "NeedsHuman";
    readonly step: string;
    readonly reason: string;
};
/** Only the source adapter constructs this from already-screened metadata. */
/** `transient` leaves the draft undecided. A `bounded` transient refusal is a
 * host fault that keeps its reason for the resident's unnamed-attempt bound
 * instead of retrying without limit (D047). */
export declare class IntentPreparationRefusal extends Error {
    readonly step: string;
    readonly transient: boolean;
    readonly bounded: boolean;
    constructor(step: string, reason: string, transient?: boolean, bounded?: boolean);
}
/** Positive decode of the WO-120 draft. Its bytes are never retargeted. */
export declare function assertIntentDraft(value: unknown): asserts value is WorkOrder;
/** `portfolio` and `grants` are the host's admitted configuration, not fields
 * selected by issue text. A malformed value becomes a held decision. */
export declare function admitIntent(input: PreparedIntent, definition: unknown, suppliedGrants: unknown): IntentAdmission;
/** Reserve reported token ceilings, rather than treating absent usage as zero.
 * Wall budget is a portfolio window starting at its first accepted intent. */
export declare function intentBudgetUsed(intents: Record<string, {
    kind: string;
    binding?: IntentBinding;
}>, at: number): PreparedIntent["spent"];
/** Assertion meaning is a reviewed judgment, not an English runtime rule.
 * The producer reads the original statement and context. Source identity and
 * complete coverage make execution repeatable; they do not prove its meaning. */
export interface BaselineAssessment {
    readonly schemaVersion: 1;
    readonly contractId: string;
    readonly producer: {
        /** `double`: a declared test actor answered, never a model. */
        readonly kind: "model" | "double" | "operator" | "unsupplied";
        readonly name: string;
    };
    readonly assertions: readonly {
        readonly statementId: string;
        readonly kind: "existing-failure" | "no-existing-failure" | "unresolved";
        readonly rationale: string;
    }[];
}
/** Positive decode against the *compiled* statement identities. Missing entries
 * stay unresolved, including old configurations and old persisted bindings.
 * No absence or malformed judgment is interpreted as a healthy/new story. */
export declare function decodeBaselineAssessment(contract: StoryContract, value: unknown): BaselineAssessment;
/** Independently compare the primitive's claimed story class with every active
 * assertion judgment, including failures supplied as requirements. English is
 * never reparsed here; uncertain judgments hold before primitive dispatch. */
export declare function baselineClass(contract: StoryContract, claimed?: "new" | "defect", assessment?: unknown): {
    kind: "unresolved";
    source: {
        contractId: string;
        statementIds: string[];
        rule: string;
        assessmentHash: null;
        producer?: never;
    };
    findings: string[];
} | {
    kind: "defect" | "new" | "unresolved";
    source: {
        contractId: string;
        statementIds: string[];
        rule: string;
        assessmentHash: string;
        producer: {
            /** `double`: a declared test actor answered, never a model. */
            readonly kind: "model" | "double" | "operator" | "unsupplied";
            readonly name: string;
        };
    };
    findings: string[];
};
/** Assertion facts select story kind independently of statement roles. A
 * requirement may name an actual failure; it must reproduce as a defect.
 * The host separately compares the primitive's claimed class with these facts. */
export declare function baselineStoryClass(contract: StoryContract, assessment?: unknown): {
    kind: "unresolved";
    findings: string[];
    source: {
        contractId: string;
        statementIds: string[];
        assessmentHash: null;
        producer?: never;
        rule: string;
    } | {
        contractId: string;
        statementIds: string[];
        assessmentHash: string;
        producer: {
            /** `double`: a declared test actor answered, never a model. */
            readonly kind: "model" | "double" | "operator" | "unsupplied";
            readonly name: string;
        };
        rule: string;
    };
} | {
    kind: "defect" | "new" | "unresolved";
    findings: string[];
    source: {
        contractId: string;
        statementIds: string[];
        assessmentHash: null;
        producer?: never;
        rule: string;
    } | {
        contractId: string;
        statementIds: string[];
        assessmentHash: string;
        producer: {
            /** `double`: a declared test actor answered, never a model. */
            readonly kind: "model" | "double" | "operator" | "unsupplied";
            readonly name: string;
        };
        rule: string;
    };
};
export declare const VERTICAL_STEPS: readonly ["bundle", "contract", "surfaces", "derived-order", "baseline", "source-change", "witnesses", "verification", "review", "preparation", "lint", "publish", "observation", "resolution"];
export type VerticalStep = (typeof VERTICAL_STEPS)[number] | "repair";
export interface VerticalCommand {
    readonly commandId: string;
    readonly step: VerticalStep;
    readonly round: number;
    readonly attempt: number;
    readonly episodeId: string;
}
export interface VerticalReceipt {
    readonly command: VerticalCommand;
    readonly result: "completed" | "NeedsHuman" | "refused" | "retry" | "repair";
    readonly value: JsonValue;
}
export interface VerticalState {
    binding: IntentBinding;
    workOrder: WorkOrder;
    continuation: ExecutableProgramV1;
    pending: VerticalCommand | null;
    receipts: VerticalReceipt[];
    terminal: {
        kind: "resolved" | "NeedsHuman" | "refused";
        step: VerticalStep;
        reason: string;
    } | null;
}
export declare function verticalProgram(key: string): ExecutableProgramV1;
export declare function nextVerticalCommand(state: VerticalState): VerticalCommand | null;
export declare function foldVertical(state: VerticalState | undefined, event: Event): VerticalState;
