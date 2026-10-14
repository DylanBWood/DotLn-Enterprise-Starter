type Row = Record<string, any>;
export interface ObservationScope {
    sessionKey: string;
    workOrder: string | null;
    phase: string;
    startedAt?: string;
    usageKey?: string;
}
export declare const journalRows: (root: string, scope: ObservationScope) => Row[];
export declare function appendObservation(root: string, scope: ObservationScope, row: Row, now?: string): void;
export declare function namedJudgmentUnits(text: string): string[];
export { correctionCounts } from "./correction-observation.mjs";
export declare function observeBackgroundTool(tool: string, input: Row, output: Row, at: string, invocationId?: string): Row | null;
export declare function observedFacts(root: string, scope: ObservationScope, now?: string): {
    now: string;
    tasks: Row[];
    gates: import("./gate-evidence.mjs").GateCheck[];
    usage: any;
};
export declare function renderObservedFacts(facts: ReturnType<typeof observedFacts>): string;
export declare function scanHedges(text: string, facts: ReturnType<typeof observedFacts>): {
    phrase: string;
    quantity: string;
    marker: string;
    observed: string | number;
    source: string;
    units: string[];
}[];
export declare function transcriptMessages(path: string): Row[];
export declare function scanMessage(root: string, scope: ObservationScope, text: string, identity: string, now: string): void;
export declare function deliverHedgeAdvisories(root: string, scope: ObservationScope): string;
export declare function observeTypedCorrection(root: string, scope: ObservationScope, prompt: string, eventId?: string): void;
/** All failures are informational. Stop never returns a blocking decision. */
export declare function observationBoundary(root: string, scope: ObservationScope, options?: {
    transcriptPath?: string;
    prompt?: string;
    stop?: boolean;
    reentry?: boolean;
    output?: string;
    now?: string;
    codex?: boolean;
}): string;
export declare function codexObservationScope(sessionId: string, workOrder: string | null, phase: string, root?: string): ObservationScope;
