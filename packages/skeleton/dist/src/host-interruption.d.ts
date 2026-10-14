import { WorkerFailure } from "./worker-protocol.js";
export declare const interruption: (signal: AbortSignal) => WorkerFailure;
export declare function throwIfInterrupted(signal: AbortSignal | undefined): void;
/** A synchronous child can return before Node delivers the foreground job's
 * signal. Two check phases include a poll turn, without a timed sleep. */
export declare function deliverPendingSignal(signal: AbortSignal | undefined): Promise<boolean>;
export declare function interruptionCheckpoint(signal: AbortSignal | undefined): Promise<void>;
/** Admit a synchronous host read/test only after the run has handled any
 * pending signal. Interruption takes precedence over both data and errors. */
export declare function interruptibleHostCall<T>(signal: AbortSignal | undefined, call: () => T): Promise<T>;
