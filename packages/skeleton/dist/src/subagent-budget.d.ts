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
/** The hosts a kit-launched worker runs on; `unattributed` is a launch whose
 * command names no host. */
export declare const KIT_HOSTS: readonly ["claude", "codex", "unattributed"];
export type KitHost = (typeof KIT_HOSTS)[number];
export interface SubagentObservation {
    count: number | null;
    cap: number | null;
    remaining: number | null;
    countKind: "exact-observed" | "minimum-observed" | "unknown";
    unresolvedAdmissions: number | null;
    unlinkedChildren: number | null;
    uncountedRemainder: "unknown";
    /** Launches by host: agents the hooks saw are Claude's; kit launches name
     * their host. Re-tasks are counted apart, and count = launched + re-tasked. */
    launched?: number | null;
    launchedByHost?: Readonly<Record<KitHost, number>> | null;
    retasked?: number | null;
    reason?: string;
}
/** What a non-spawn tool call uses: a re-task of a known agent, or a kit
 * command that launches `uses` workers on `host`. */
export interface UseAdmission {
    readonly retask?: boolean;
    readonly kit?: {
        readonly uses: number;
        readonly host: KitHost;
    };
}
/** The control budgets file the spawn cap reads, relative to the root: the
 * configured control root's, the same file the process and retention readers
 * use. */
export declare const subagentBudgetsPath: (root: string) => string;
export declare function readSubagentCap(root: string): number | null;
export declare function initializeSubagentCounter(directory: string, session: string): string | null;
/** One line for `harness usage`: every use the counter saw, by kind and host,
 * against the cap. */
export declare function workersLine(row: SubagentObservation): string;
export declare function subagentUsage(root: string, directory: string, session: string, hashed?: boolean): SubagentObservation;
export declare function subagentSummary(row: SubagentObservation, root?: string): string;
export declare function admitSubagentTool(root: string, directory: string, input: SpawnInput, spawn: boolean, options?: {
    cap?: number | null;
    spawnerCap?: number | null;
    spawner?: string;
} & UseAdmission): {
    refusal?: string;
    advisory?: string;
    usage: SubagentObservation;
};
export interface DrivenWorkerContext {
    schemaVersion: 1;
    root: string;
    directory: string;
    session: string;
    worker: string;
    role: string;
    workOrder: string;
    cap: number | null;
    ceiling: number | null;
}
export declare function drivenWorkerContext(): DrivenWorkerContext | null;
export declare function drivenSubagentUsage(worker?: string): {
    count: number | null;
    cap: number | null;
    remaining: number | null;
    countKind: "exact-observed" | "minimum-observed" | "unknown";
    unresolvedAdmissions: number | null;
    unlinkedChildren: number | null;
    uncountedRemainder: "unknown";
    /** Launches by host: agents the hooks saw are Claude's; kit launches name
     * their host. Re-tasks are counted apart, and count = launched + re-tasked. */
    launched?: number | null;
    launchedByHost?: Readonly<Record<KitHost, number>> | null;
    retasked?: number | null;
    reason?: string;
    perSpawnerCap: number | null;
    spawnsByWorker: number;
    source: string;
} | {
    count: number | null;
    cap: number | null;
    remaining: number | null;
    countKind: "exact-observed" | "minimum-observed" | "unknown";
    unresolvedAdmissions: number | null;
    unlinkedChildren: number | null;
    uncountedRemainder: "unknown";
    /** Launches by host: agents the hooks saw are Claude's; kit launches name
     * their host. Re-tasks are counted apart, and count = launched + re-tasked. */
    launched?: number | null;
    launchedByHost?: Readonly<Record<KitHost, number>> | null;
    retasked?: number | null;
    reason?: string;
    perSpawnerCap: number | null;
    spawnsByWorker: null;
    source: string;
} | null;
export declare function admitDrivenTool(input: SpawnInput, spawn: boolean, use?: UseAdmission): {
    refusal?: string;
    advisory?: string;
    usage: SubagentObservation;
} | undefined;
export declare function linkDrivenResult(input: SpawnInput): void;
/** PostToolUse's observed join is exact; it never guesses from arrival order. */
export declare function linkSubagentResult(directory: string, input: SpawnInput): void;
