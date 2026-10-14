import { type Decision, type Event, type EventDraft, type ResultEnvelope } from "@dotln/kernel";
import { type CompiledFeedback } from "@dotln/compiler";
import { WorkerStore } from "./worker-store.js";
import { type WorkerEffort } from "./worker-protocol.js";
import type { WorkOrderTransport, TransportDispatch } from "./worker-transport.js";
import { type EvidenceWorkerRequest, type EvidenceWorkerResult } from "./verification-protocol.js";
import { type VerificationState } from "./verification.js";
import { type RuntimeState } from "./reactor.js";
/** Run inside WorkerStore.acquire's read-only preflight, including historical
 * commands whose completion removed them from the driver's pending state. */
export declare function preflightVerificationRecovery(store: WorkerStore, workstreamId: string, cwd: (commandId: string) => string, model: string, effort: WorkerEffort, feedback?: CompiledFeedback): void;
export declare class VerificationDriver {
    #private;
    readonly store: WorkerStore;
    readonly workstreamId: string;
    private readonly onEvent?;
    constructor(store: WorkerStore, workstreamId: string, onEvent?: ((event: Event, state: VerificationState) => void) | undefined);
    get state(): VerificationState;
    get decisions(): readonly Decision<RuntimeState>[];
    get log(): string;
    feed(draft: EventDraft): Event;
    record(type: string, at: number, payload: unknown, correlationId?: string): Event;
    drainContinuation(at: number): void;
    persistNext(at: number): void;
    admitResult(draft: EventDraft): Event | null;
}
export interface VerificationHostOptions {
    readonly feedback?: CompiledFeedback;
    readonly driver: VerificationDriver;
    readonly transport: WorkOrderTransport<EvidenceWorkerRequest>;
    readonly now: () => number;
    readonly afterResultSaved?: () => void;
    readonly onRunning?: (dispatch: TransportDispatch<EvidenceWorkerResult>) => void;
}
/** Narrow counterpart of WorkerHost for pinned verification/repair capsules. */
export declare class VerificationHost {
    private readonly options;
    constructor(options: VerificationHostOptions);
    preflight(cwd: string, model: string, effort: WorkerEffort): {
        request: EvidenceWorkerRequest;
        cached: EvidenceWorkerResult | undefined;
    };
    private expire;
    run(cwd: string, model: string, effort: WorkerEffort): Promise<ResultEnvelope>;
}
