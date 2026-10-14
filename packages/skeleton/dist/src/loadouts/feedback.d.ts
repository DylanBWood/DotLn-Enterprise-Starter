import { type FeedbackUnit } from "@dotln/compiler";
/** Exactly WO-011's ten units. Source accounts stay at their canonical references. */
export declare const retainedFeedbackUnitsV1: readonly FeedbackUnit[];
export declare const correctionExample = "Example: a correction about committing opaque identifiers includes hashes; hostnames do not belong to that category.";
/** Version-one values above remain available for replay, never co-equipped. */
export declare const personalFeedbackUnits: readonly FeedbackUnit[];
export declare const personalFeedback: () => import("@dotln/compiler").CompiledFeedback;
/** Lifecycle boundaries retain hard evidence checks; Stop only advises. */
export declare const lifecycleFeedback: () => import("@dotln/compiler").CompiledFeedback;
/** Command-scoped settings only. No user, account, or repository setting is installed. */
export declare const feedbackClaudeSettings: {
    readonly autoMemoryEnabled: false;
    readonly attribution: {
        readonly commit: "";
        readonly pr: "";
        readonly sessionUrl: false;
    };
};
