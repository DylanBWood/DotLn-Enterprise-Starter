import { type Event, type JsonValue, type PredicateRegistry } from "@dotln/kernel";
import { type RuntimeState } from "./reactor.js";
import { type ResidentState } from "./resident-state.js";
import { WorkerStore } from "./worker-store.js";
import { type WorkOrderSourceReason } from "./runtime-status-contract.js";
import { type PresenceSignal, type ResidentStamp } from "./presence-signals.js";
export declare function replayResident(log: string, predicates?: PredicateRegistry): import("@dotln/kernel").ReplayResult<Readonly<{
    repair?: JsonValue;
    resident?: JsonValue;
    sourceChange?: import("./source-change-state.js").SourceChangeSlice;
    feedback?: JsonValue;
    verification?: JsonValue;
    presence: "away" | "returned";
    rngState: number;
    policy: Readonly<{
        maintenance: string;
    }>;
    loadout: JsonValue;
    artifactIdentity: JsonValue;
    compilationEnvironment: JsonValue;
    equippedEventId: string | null;
    identityEnforcementEventId: string | null;
    artifactIdentityBlocked: boolean;
    workOrder: JsonValue;
    candidates: readonly import("./reactor.js").Candidate[];
    verified: boolean;
    verificationCompleted: boolean;
    pulseSeen: boolean;
    inspectionCompleted: boolean;
    deletionRefused: boolean;
    queuedPulseNoOp: boolean;
    authority: JsonValue;
    revocationEvents: readonly JsonValue[];
    program: JsonValue;
    commandResult: JsonValue;
    pendingCommand: JsonValue;
    authorizationEvidence: readonly string[];
    deletionPaths: readonly string[];
    refusalReason: JsonValue;
    persistedEffect: JsonValue;
    noOpEvidence: readonly string[];
    cancelledScheduleIds: readonly string[];
    activeScheduleIds: readonly string[];
    redispatchedCommandIds: readonly string[];
    beaconObservations: readonly import("./control-beacon.js").JudgedBeacon[];
    beaconSweep: JsonValue;
    workerEpisodeId: string | null;
    workerLeaseExpired: boolean;
}>>;
export declare class ResidentTransaction {
    private readonly store;
    readonly predicates: PredicateRegistry;
    private readonly publish;
    readonly events: Event[];
    state: RuntimeState;
    published: boolean;
    constructor(store: WorkerStore, predicates: PredicateRegistry, publish: (tx: ResidentTransaction) => void);
    get resident(): ResidentState | undefined;
    append(type: string, payload: object, occurredAt?: number, actorId?: "operator" | "resident-host" | "console"): void;
    sample(at: number): void;
}
/** Lifetime ownership and short append ownership reuse the inspected worker lock.
 * Presence only takes the latter, so it remains usable during a running episode. */
export declare class ResidentStore {
    private readonly predicates;
    private readonly indexPath?;
    private readonly indexError?;
    readonly store: WorkerStore;
    private readonly appendStore;
    private observedBytes;
    constructor(directory: string, predicates?: PredicateRegistry, indexPath?: string | undefined, indexError?: WorkOrderSourceReason | undefined);
    private get sourcePath();
    private readRegular;
    private readIndex;
    private sweepStatusTemporaries;
    /** Only the lifetime owner selects the source. Helpers, including installed
     * harness snapshots, read this private binding instead of their own checkout. */
    private bindIndex;
    /** Readers see the old complete file or the new complete file. The log is
     * authoritative; an interrupted projection write is rebuilt next transaction. */
    private publish;
    private replaceProjection;
    /** `observe: false` leaves the host's change baseline alone, so another
     * in-process writer (the console's receipts) cannot hide a concurrent
     * append such as a served presence change from a running tick. */
    transaction<T>(operation: (tx: ResidentTransaction) => T, { observe }?: {
        observe?: boolean;
    }): Promise<T>;
    acquire(): Promise<void>;
    release(): void;
    read(): string;
    changed(): boolean;
}
export declare function recordPresence(directory: string, presence: "away" | "returned", now?: () => number): Promise<void>;
export declare function answerHandoff(directory: string, input: {
    episodeId: string;
    workOrderId: string;
    optionId: string;
}, now?: () => number): Promise<void>;
/** A human answer or a fresh passing judgment over a repair. A resident actor
 * cannot clear the hold its own drift raised. */
export declare function clearMissionHold(directory: string, input: {
    origin: "human";
    episodeId: string;
    answer: string;
} | {
    origin: "verified-repair";
    episodeId: string;
    subject: unknown;
    judgment: unknown;
}, now?: () => number): Promise<void>;
export declare function recordPresenceObservation(directory: string, signal: PresenceSignal, stamp?: ResidentStamp, now?: () => number): Promise<void>;
