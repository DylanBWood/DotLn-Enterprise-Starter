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
    /** The work-order cards, as the index command prints them with `--json`,
     * which the script-side launcher hands the resident: this package reads
     * no page and no Markdown. A helper over the same store has none and
     * reads the copy the owner keeps beside its binding. */
    private readonly cardSource?;
    private readonly indexError?;
    readonly store: WorkerStore;
    private readonly appendStore;
    private observedBytes;
    /** The newest reading the owner's card source has given. */
    private newest;
    constructor(directory: string, predicates?: PredicateRegistry, 
    /** The work-order cards, as the index command prints them with `--json`,
     * which the script-side launcher hands the resident: this package reads
     * no page and no Markdown. A helper over the same store has none and
     * reads the copy the owner keeps beside its binding. */
    cardSource?: (() => string) | undefined, indexError?: WorkOrderSourceReason | undefined);
    private get sourcePath();
    /** The owner's copy of the cards its launcher last gave it, inside the
     * store: what a helper reads through the binding. */
    private get cardsPath();
    private readRegular;
    /** The cards, read and nothing written, so a transaction can read them
     * before it takes its lock: what the owner's launcher source gives, or a
     * helper's copy through the owner's binding. */
    private readIndex;
    private sweepStatusTemporaries;
    /** Only the lifetime owner selects the source. Helpers, including installed
     * harness snapshots, read this private binding instead of their own checkout.
     * It holds the cards' availability with their place: the reason the owner
     * has none, at launch or at its last read, or where its copy is. */
    private bindIndex;
    /** Inside the lock, what the owner's source gave is kept where a helper
     * reads it: a copy of the cards beside the binding, and the binding. */
    private keepCards;
    /** Readers see the old complete file or the new complete file. The log is
     * authoritative; an interrupted projection write is rebuilt next
     * transaction. `index` is the cards' reading the transaction took before
     * its lock. */
    private publish;
    private replaceProjection;
    /** `observe: false` leaves the host's change baseline alone, so another
     * in-process writer (the console's receipts) cannot hide a concurrent
     * append such as a served presence change from a running tick.
     *
     * An owner whose launcher hands it a card source reads the work-order cards
     * before the append lock is taken: that source runs the index command
     * whenever a file the cards derive from has changed, for seconds, and a
     * helper waiting for the lock (a presence command, a hook's heartbeat)
     * gives up after two. Nothing the transaction appends changes the cards,
     * and every status it publishes holds the newest reading this owner has
     * taken, so a slower transaction never writes an older one back. A helper
     * reads the owner's copy through the binding inside the lock, as before:
     * a cheap read, and the order that keeps it from cards older than a
     * failure the owner has bound. */
    transaction<T>(operation: (tx: ResidentTransaction, publishWith: (tx: ResidentTransaction) => void) => T, { observe }?: {
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
