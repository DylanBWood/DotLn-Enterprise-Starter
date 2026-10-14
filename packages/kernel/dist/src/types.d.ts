export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | {
    readonly [key: string]: JsonValue;
} | readonly JsonValue[];
export type DecodeResult<T> = {
    readonly ok: true;
    readonly value: T;
} | {
    readonly ok: false;
    readonly code: string;
    readonly path: string;
    readonly message: string;
};
export interface EventEnvelope<T extends string = string, P extends JsonValue = JsonValue> {
    readonly schemaVersion: 1;
    readonly eventId: string;
    readonly type: T;
    readonly occurredAt: number;
    readonly actorId: string;
    readonly workstreamId: string;
    readonly episodeId?: string;
    readonly correlationId?: string;
    readonly causationId?: string;
    readonly payload: P;
}
export type EventDraft<T extends string = string, P extends JsonValue = JsonValue> = Omit<EventEnvelope<T, P>, "eventId">;
export type Comparison = EventEnvelope<"Comparison", {
    readonly itemA: string;
    readonly itemB: string;
    readonly dimension?: string;
    readonly judge: string;
    readonly result: "itemA" | "itemB" | "draw";
    readonly context: JsonValue;
    readonly orderRandomized: boolean;
}>;
export type Refusal = EventEnvelope<"CommandRefused", {
    readonly intentIndex: number;
    readonly reason: string;
    readonly authorityEnvelopeId: string;
}>;
export type Event = EventEnvelope | Comparison | Refusal;
export interface PredicateRef {
    readonly registryId: string;
    readonly version: number;
    readonly params?: Readonly<Record<string, JsonValue>>;
}
export interface EventPattern {
    readonly type: string;
    readonly correlationId?: string;
    readonly commandId?: string;
}
export declare namespace Program {
    type T = Done | Emit | Invoke | Await | Sequence | Choose | All | Race | Guard | Repeat | Compensate;
    interface Done {
        readonly kind: "Done";
    }
    interface Emit {
        readonly kind: "Emit";
        readonly event: EventDraft;
        readonly next: T;
    }
    interface Invoke {
        readonly kind: "Invoke";
        readonly commandId: string;
        readonly command: ActIntent;
        readonly continuationByResult: Readonly<Record<string, T>>;
    }
    interface Await {
        readonly kind: "Await";
        readonly pattern: EventPattern;
        readonly timeout: Cadence.T;
        readonly next: T;
    }
    interface Sequence {
        readonly kind: "Sequence";
        readonly programs: readonly T[];
    }
    interface Choose {
        readonly kind: "Choose";
        readonly policyRef: string;
        readonly alternatives: readonly T[];
    }
    interface All {
        readonly kind: "All";
        readonly programs: readonly T[];
    }
    interface Race {
        readonly kind: "Race";
        readonly programs: readonly T[];
    }
    interface Guard {
        readonly kind: "Guard";
        readonly conditionRef: PredicateRef;
        readonly whenTrue: T;
        readonly whenFalse: T;
    }
    interface Repeat {
        readonly kind: "Repeat";
        readonly program: T;
        readonly stopConditionRef: PredicateRef;
    }
    interface Compensate {
        readonly kind: "Compensate";
        readonly program: T;
        readonly compensation: T;
    }
    const Done: () => Done;
    function Emit(event: EventDraft, next: ExecutableProgramV1): Extract<ExecutableProgramV1, {
        kind: "Emit";
    }>;
    function Emit(event: EventDraft, next: T): Emit;
    function Invoke(commandId: string, command: ActIntent, continuationByResult: Readonly<Record<string, ExecutableProgramV1>>): Extract<ExecutableProgramV1, {
        kind: "Invoke";
    }>;
    function Invoke(commandId: string, command: ActIntent, continuationByResult: Readonly<Record<string, T>>): Invoke;
    function Await(pattern: EventPattern, timeout: Cadence.T, next: ExecutableProgramV1): Extract<ExecutableProgramV1, {
        kind: "Await";
    }>;
    function Await(pattern: EventPattern, timeout: Cadence.T, next: T): Await;
    function Sequence(programs: readonly ExecutableProgramV1[]): Extract<ExecutableProgramV1, {
        kind: "Sequence";
    }>;
    function Sequence(programs: readonly T[]): Sequence;
    const Choose: (policyRef: string, alternatives: readonly T[]) => Choose;
    const All: (programs: readonly T[]) => All;
    const Race: (programs: readonly T[]) => Race;
    function Guard(conditionRef: PredicateRef, whenTrue: ExecutableProgramV1, whenFalse: ExecutableProgramV1): Extract<ExecutableProgramV1, {
        kind: "Guard";
    }>;
    function Guard(conditionRef: PredicateRef, whenTrue: T, whenFalse: T): Guard;
    const Repeat: (program: T, stopConditionRef: PredicateRef) => Repeat;
    const Compensate: (program: T, compensation: T) => Compensate;
}
/** Runtime v1 grammar; every continuation edge stays executable. */
export type ExecutableProgramV1 = Program.Done | (Omit<Program.Emit, "next"> & {
    readonly next: ExecutableProgramV1;
}) | (Omit<Program.Invoke, "continuationByResult"> & {
    readonly continuationByResult: Readonly<Record<string, ExecutableProgramV1>>;
}) | (Omit<Program.Await, "next"> & {
    readonly next: ExecutableProgramV1;
}) | (Omit<Program.Guard, "whenTrue" | "whenFalse"> & {
    readonly whenTrue: ExecutableProgramV1;
    readonly whenFalse: ExecutableProgramV1;
}) | (Omit<Program.Sequence, "programs"> & {
    readonly programs: readonly ExecutableProgramV1[];
});
export declare namespace Cadence {
    type T = Once | After | Every | Burst | Calendar | Window | While | Until | Gate | Sequence | Merge | Race | Repeat | Backoff;
    interface Once {
        readonly kind: "Once";
        readonly at: number;
    }
    interface After {
        readonly kind: "After";
        readonly delayMs: number;
    }
    interface Every {
        readonly kind: "Every";
        readonly intervalMs: number;
        readonly startAt?: number;
    }
    interface Burst {
        readonly kind: "Burst";
        readonly count: number;
        readonly intervalMs: number;
    }
    interface Calendar {
        readonly kind: "Calendar";
        readonly expression: string;
        readonly timezone: string;
    }
    interface Window {
        readonly kind: "Window";
        readonly cadence: T;
        readonly start: number;
        readonly end: number;
    }
    interface While {
        readonly kind: "While";
        readonly cadence: T;
        readonly conditionRef: PredicateRef;
    }
    interface Until {
        readonly kind: "Until";
        readonly cadence: T;
        readonly conditionRef: PredicateRef;
    }
    interface Gate {
        readonly kind: "Gate";
        readonly cadence: T;
        readonly conditionRef: PredicateRef;
    }
    interface Sequence {
        readonly kind: "Sequence";
        readonly cadences: readonly T[];
    }
    interface Merge {
        readonly kind: "Merge";
        readonly cadences: readonly T[];
    }
    interface Race {
        readonly kind: "Race";
        readonly cadences: readonly T[];
    }
    interface Repeat {
        readonly kind: "Repeat";
        readonly cadence: T;
        readonly count: number;
    }
    interface Backoff {
        readonly kind: "Backoff";
        readonly initialMs: number;
        readonly factor: number;
        readonly maxMs: number;
        readonly attempt: number;
        readonly jitter: number;
    }
    const Once: (at: number) => Once;
    const After: (delayMs: number) => After;
    const Every: (intervalMs: number, startAt?: number) => Every;
    const Burst: (count: number, intervalMs: number) => Burst;
    const Calendar: (expression: string, timezone: string) => Calendar;
    const Window: (cadence: T, start: number, end: number) => Window;
    const While: (cadence: T, conditionRef: PredicateRef) => While;
    const Until: (cadence: T, conditionRef: PredicateRef) => Until;
    const Gate: (cadence: T, conditionRef: PredicateRef) => Gate;
    const Sequence: (cadences: readonly T[]) => Sequence;
    const Merge: (cadences: readonly T[]) => Merge;
    const Race: (cadences: readonly T[]) => Race;
    const Repeat: (cadence: T, count: number) => Repeat;
    const Backoff: (initialMs: number, factor: number, maxMs: number, attempt: number, jitter: number) => Backoff;
}
export interface ActIntent {
    readonly kind: "Act";
    readonly effect: string;
    readonly resource?: string;
    readonly payload: JsonValue;
}
export interface WaitIntent {
    readonly kind: "Wait";
    readonly cadence: Cadence.T;
}
export interface ObserveIntent {
    readonly kind: "Observe";
    readonly subject: string;
}
export interface NoOpIntent {
    readonly kind: "NoOp";
    readonly reason: string;
    readonly evidence: readonly string[];
    readonly reevaluation: Cadence.T;
    readonly usefulWhen: PredicateRef;
}
export type Intent = ActIntent | WaitIntent | ObserveIntent | NoOpIntent;
export interface DecisionTrace {
    readonly reactorId: string;
    readonly reactorVersion: string;
    readonly branchPath: readonly string[];
    readonly envInputs: readonly string[];
    readonly cadenceEvaluations: readonly string[];
}
export interface Schedule {
    readonly scheduleId: string;
    readonly cadence: Cadence.T;
    readonly eventToEmit: EventDraft;
    readonly cancelOn: readonly PredicateRef[];
}
export interface Decision<S extends JsonValue = JsonValue> {
    readonly state: S;
    readonly intents: readonly Intent[];
    readonly continuation?: Program.T;
    readonly schedules: readonly Schedule[];
    readonly trace: DecisionTrace;
}
export interface KernelEnv {
    readonly now: number;
    readonly rngState: number;
    readonly predicates: PredicateRegistry;
    readonly policy?: JsonValue;
}
export type Predicate = (context: Readonly<{
    state: JsonValue;
    event?: Event;
    env: KernelEnv;
}>, params: Readonly<Record<string, JsonValue>>) => boolean;
export type PredicateRegistry = Readonly<Record<string, Readonly<Record<number, Predicate>>>>;
export type Reactor<S extends JsonValue = JsonValue> = (state: S, event: Event, env: KernelEnv) => Decision<S>;
export interface AuthorityEnvelope {
    readonly authorityEnvelopeId: string;
    readonly allowedEffects: readonly string[];
    readonly deniedEffects: readonly string[];
    readonly resourceLimits: Readonly<Record<string, number>>;
    readonly requiredEvidence: readonly string[];
    readonly expiresAt: number;
    readonly revocationEventTypes: readonly string[];
    readonly revocationConditions?: readonly PredicateRef[];
}
export interface Command {
    readonly commandId: string;
    readonly episodeId?: string;
    readonly workstreamId: string;
    readonly intent: ActIntent;
}
export interface CommandReceipt {
    readonly commandId: string;
    readonly transport: string;
    readonly acceptedAt: number;
}
export interface WorkOrder {
    readonly workOrderId: string;
    readonly objective: string;
    readonly acceptanceCriteria: readonly string[];
    readonly knownFacts: readonly string[];
    readonly decisions: readonly string[];
    readonly constraints: readonly string[];
    readonly nonGoals: readonly string[];
    readonly repo: string;
    readonly baseCommit: string;
    readonly allowedOperations: readonly string[];
    readonly prohibitedOperations: readonly string[];
    readonly requiredEvidence: readonly string[];
    readonly outputContract: JsonValue;
}
export interface ResultEnvelope {
    readonly workOrderId: string;
    readonly episodeId: string;
    readonly status: "completed" | "failed" | "blocked";
    readonly resultId: string;
    readonly summary: string;
    readonly requiresHuman: boolean;
}
export interface OutboxEntry {
    readonly command: Command;
    readonly status: "pending" | "completed";
    readonly resultEventId?: string;
}
export interface OutboxState {
    readonly entries: Readonly<Record<string, OutboxEntry>>;
}
