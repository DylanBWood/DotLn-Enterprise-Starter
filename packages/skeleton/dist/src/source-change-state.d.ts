import type { Decision, Event } from "@dotln/kernel";
export type FocusedTestResult = {
    readonly command: string;
    readonly exitCode: number | null;
    readonly signal: string | null;
    readonly stdoutHash: string;
    readonly stderrHash: string;
};
export type SourceChangeRequested = {
    readonly workOrderId: string;
    readonly repo: string;
    readonly baseCommit: string;
    readonly branch: string;
    readonly surfaces: readonly string[];
};
export type SourceChangeObserved = {
    readonly workOrderId: string;
    readonly commit: string;
    readonly branch: string;
    readonly diffHash: string;
    readonly testBefore: FocusedTestResult;
    readonly testAfter: FocusedTestResult;
};
export type SourceChangeRefused = {
    readonly workOrderId: string;
    readonly reason: string;
};
/** Host-owned baseline, persisted before a writer can run. */
export type SharedRepositoryState = {
    readonly commonDirectory: string;
    /** Ref name, resolved commit (empty if unresolved), immediate symbolic target. */
    readonly refs: readonly (readonly [string, string, string])[];
    /** Lossless lowercase hexadecimal bytes; null means no alternates entry. */
    readonly alternates: string | null;
};
export type SourceChangeSlice = {
    readonly workstreamId?: string;
    readonly request?: SourceChangeRequested;
    readonly observation?: SourceChangeObserved;
    readonly refusal?: SourceChangeRefused;
};
export declare const sourceChangeEventTypes: readonly ["SourceChangeRequested", "SourceChangeObserved", "SourceChangeRefused"];
export declare const SOURCE_CHANGE_HOST = "source-change-host";
export declare function assertSourceCommit(value: unknown): asserts value is string;
export declare function assertSourceSurface(value: unknown): asserts value is string;
export declare function decodeFocusedTest(value: unknown): FocusedTestResult;
export declare function decodeSourceRequest(value: unknown): SourceChangeRequested;
export declare function decodeSourceObservation(value: unknown): SourceChangeObserved;
export declare function decodeSourceRefusal(value: unknown): SourceChangeRefused;
export declare function decodeSharedRepositoryState(value: unknown): SharedRepositoryState;
export declare const sameSourceValue: (left: unknown, right: unknown) => boolean;
/** The host observes effects. This fold neither performs nor verifies a change. */
export declare function sourceChangeDecision(state: SourceChangeSlice, event: Event): Decision<SourceChangeSlice>;
