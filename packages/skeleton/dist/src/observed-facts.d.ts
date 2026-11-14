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
/** The key a background task is journaled under: a digest of the host's
 * identifier, never the identifier. */
export declare const backgroundTaskKey: (id: string) => string;
/** Whether a state the host or the journal gives a task is a finished one. */
export declare const terminalTaskState: (state: unknown) => boolean;
export declare function observeBackgroundTool(tool: string, input: Row, output: Row, at: string, invocationId?: string, agentId?: string): Row | null;
export declare function observedFacts(root: string, scope: ObservationScope, now?: string): {
    now: string;
    tasks: Row[];
    workerStops: Row[];
    gates: import("./gate-evidence.mjs").GateCheck[];
    usage: any;
};
export declare function renderObservedFacts(facts: ReturnType<typeof observedFacts>): string;
/** What a day may use, as the instance's budgets declare it. */
export interface DailyFigure {
    tokens?: number | null;
    usd?: number | null;
}
/** What the day has used, by the usage report's reading. */
export interface DailyUse {
    day: string;
    totalTokens: number;
    partial: boolean;
    estimateUsd: number | null;
    /** What the sessions that have an estimate come to: the least the day
     * cost where the whole estimate is unknown. */
    pricedUsd?: number;
    unpriced: readonly string[];
    unattested: boolean;
}
/** The line a prompt's facts carry where the instance declares what a day may
 * use: the day's use so far and the figure, in tokens, in dollars at the
 * instance's declared prices, or both. Where a dollar figure meets a day
 * whose sessions ran a model with no declared price, attest no model or hold
 * no count, the estimate reads `unknown` beside the day's tokens, with what
 * the priced sessions alone come to where that is known. At or above a
 * figure, by the estimate or by that least amount, the line says to finish
 * the step in hand, write the standing and end the turn. It is advisory and
 * refuses nothing. */
export declare function renderDailyUse(figure: DailyFigure, use: DailyUse): string;
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
    /** The day's use beside the instance's figure, where one is declared. */
    daily?: string;
}): string;
export declare function codexObservationScope(sessionId: string, workOrder: string | null, phase: string, root?: string): ObservationScope;
