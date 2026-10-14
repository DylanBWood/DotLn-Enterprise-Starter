/** WO-139: session_id is shared by parent/children in the live Claude row.
 * agent_id is stable on child hooks; Agent's result links it to tool_use_id.
 * No ordering, agent type, transcript parsing or guessed parent join is used.
 */
export interface SpawnInput {
    readonly session_id: string;
    readonly agent_id?: string;
    readonly tool_use_id?: string;
    readonly tool_name?: string;
    readonly tool_input?: Record<string, unknown>;
    readonly tool_response?: Record<string, unknown>;
}
export interface SubagentObservation {
    count: number | null;
    cap: number | null;
    remaining: number | null;
    countKind: "exact-observed" | "minimum-observed" | "unknown";
    unresolvedAdmissions: number | null;
    unlinkedChildren: number | null;
    uncountedRemainder: "unknown";
    reason?: string;
}
export declare function readSubagentCap(root: string): number | null;
export declare function initializeSubagentCounter(directory: string, session: string): string | null;
export declare function subagentUsage(root: string, directory: string, session: string, hashed?: boolean): SubagentObservation;
export declare function subagentSummary(row: SubagentObservation): string;
export declare function admitSubagentTool(root: string, directory: string, input: SpawnInput, spawn: boolean): {
    refusal?: string;
    advisory?: string;
    usage: SubagentObservation;
};
/** PostToolUse's observed join is exact; it never guesses from arrival order. */
export declare function linkSubagentResult(directory: string, input: SpawnInput): void;
