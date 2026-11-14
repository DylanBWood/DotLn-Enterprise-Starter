import { type FeedbackUnit } from "@dotln/compiler";
/** The kinds of tool each unit's facts read, by the kinds of the hosts' tool
 * table: a unit named here judges a call only where the tool is of one of
 * these kinds, so its hook is registered for those tools and for any name
 * the table does not hold. The attribution unit reads a shell command's
 * commit message; the lint-directive unit reads a file a write changed; the
 * writer unit reads what a shell command or a write may change. A unit not
 * named judges at an event that is no tool call, or judges every tool. */
export declare const feedbackUnitToolKinds: Readonly<Record<string, readonly ("shell" | "write")[]>>;
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
