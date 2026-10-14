import { Cadence, Program, type ActIntent, type AuthorityEnvelope, type Command, type Decision, type DecisionTrace, type Event, type ExecutableProgramV1, type EventDraft, type EventEnvelope, type JsonValue, type KernelEnv, type OutboxState, type PredicateRef, type PredicateRegistry, type Reactor } from "./types.js";
export declare function predicate(ref: PredicateRef, state: JsonValue, env: KernelEnv, event?: Event): boolean;
export interface CadenceResult {
    readonly dueAt: number | null;
    readonly rngState: number;
    readonly trace: string;
}
export declare const CADENCE_KINDS: readonly ["Once", "After", "Every", "Burst", "Calendar", "Window", "While", "Until", "Gate", "Sequence", "Merge", "Race", "Repeat", "Backoff"];
export declare const EVALUABLE_CADENCE_KINDS: readonly ["Once", "After", "Every", "Gate", "Until", "Backoff"];
export declare function evaluateCadence(cadence: Cadence.T, state: JsonValue, env: KernelEnv, event?: Event): CadenceResult;
export interface ProgramStep {
    readonly residual: ExecutableProgramV1;
    readonly emitted: readonly EventDraft[];
    readonly intents: readonly ActIntent[];
    readonly waits: readonly Extract<ExecutableProgramV1, {
        kind: "Await";
    }>[];
}
export declare const EVALUABLE_PROGRAM_KINDS: readonly ["Done", "Emit", "Invoke", "Await", "Guard", "Sequence"];
export declare function stepProgram(program: ExecutableProgramV1, state: JsonValue, env: KernelEnv, event?: Event): ProgramStep;
export interface ProgramDecision<S extends JsonValue = JsonValue> extends Decision<S> {
    readonly continuation: ExecutableProgramV1;
    readonly emitted: readonly EventDraft[];
    readonly waits: readonly Extract<ExecutableProgramV1, {
        kind: "Await";
    }>[];
}
export declare function decideProgram<S extends JsonValue>(program: ExecutableProgramV1, state: S, env: KernelEnv, event?: Event): ProgramDecision<S>;
export declare const serializeContinuation: (program: Program.T) => string;
export declare function stableHash(value: string): string;
export declare function commandId(workstreamId: string, episodeId: string | undefined, decisionIndex: number, intentIndex: number): string;
export type AuthorizationResult = {
    readonly authorized: true;
    readonly command: Command;
    readonly authority: AuthorityEnvelope;
    readonly trace: DecisionTrace;
} | {
    readonly authorized: false;
    readonly refusal: Omit<EventEnvelope<"CommandRefused", {
        readonly intentIndex: number;
        readonly reason: string;
        readonly authorityEnvelopeId: string;
    }>, "eventId">;
    readonly trace: DecisionTrace;
};
export declare function authorize(intent: ActIntent, envelope: AuthorityEnvelope, context: {
    readonly now: number;
    readonly actorId: string;
    readonly workstreamId: string;
    readonly episodeId?: string;
    readonly decisionIndex: number;
    readonly intentIndex: number;
    readonly evidence: readonly string[];
    readonly revokedBy: readonly Event[];
    readonly state?: JsonValue;
    readonly predicateEnv?: Omit<KernelEnv, "now">;
}): AuthorizationResult;
export interface ReplayResult<S extends JsonValue> {
    readonly state: S;
    readonly decisions: readonly Decision<S>[];
}
/** Legacy state-layout contract for callers that omit a replay projector. */
export declare function defaultEnvironmentProjection(state: JsonValue): Omit<KernelEnv, "now" | "predicates">;
export declare function replay<S extends JsonValue>(initial: S, events: readonly Event[], reactor: Reactor<S>, predicates: PredicateRegistry, projectEnvironment?: (state: S, event: Event) => Omit<KernelEnv, "now" | "predicates">): ReplayResult<S>;
export declare const emptyOutbox: () => OutboxState;
export declare function persistCommand(state: OutboxState, command: Command): OutboxState;
export declare const pendingCommands: (state: OutboxState) => readonly Command[];
export declare function replayOutbox(events: readonly Event[]): OutboxState;
export declare function replayOutbox(events: readonly Event[], options: {
    readonly includeTraces: true;
}): {
    readonly state: OutboxState;
    readonly traces: readonly DecisionTrace[];
};
export declare function applyCommandResult(state: OutboxState, result: Event): {
    readonly state: OutboxState;
    readonly trace: DecisionTrace;
};
export interface PresenceDecision<S extends JsonValue = JsonValue> extends Decision<S> {
    readonly cancelledScheduleIds: readonly string[];
}
export declare function guardQueuedPulse<S extends JsonValue>(state: S, pulse: Event, env: KernelEnv, presenceRef: PredicateRef, futureScheduleIds: readonly string[]): PresenceDecision<S>;
