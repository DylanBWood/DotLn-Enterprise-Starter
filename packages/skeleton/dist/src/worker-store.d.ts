import { type Event } from "@dotln/kernel";
import type { PlanRefutationRequest } from "./plan-refutation-protocol.js";
import type { WriterRequest } from "./worker-protocol.js";
import { type SourceChangeObserved } from "./source-change-state.js";
import { type TransportRequest, type TransportResultFor } from "./verification-protocol.js";
type StoredRequest = Exclude<TransportRequest, PlanRefutationRequest>;
export declare function workerRequestKey(request: TransportRequest): string;
/** A single host holds the lock; status only reads the canonical JSONL file. */
export declare class WorkerStore {
    #private;
    readonly directory: string;
    readonly logPath: string;
    constructor(directory: string);
    read(): string;
    /** Inspect every stored artifact before reclaiming a lock. Contextual callers
     * additionally load their receipts here, while the acquisition guard is held. */
    acquire(preflight?: () => void): void;
    release(): void;
    append: (event: Event) => void;
    saveResult<R extends StoredRequest>(request: R, result: TransportResultFor<R>): void;
    loadResult<R extends StoredRequest>(request: R): TransportResultFor<R> | undefined;
    private resultPath;
    /** A Git observation is an effect receipt, never a fabricated worker result. */
    saveSourceChangeReceipt(request: WriterRequest, observation: SourceChangeObserved): void;
    loadSourceChangeReceipt(request: WriterRequest): SourceChangeObserved | undefined;
    private sourceChangePath;
}
export {};
