import { WorkerFailure } from "./worker-protocol.js";
export const interruption = (signal) => new WorkerFailure("interrupted", String(signal.reason));
export function throwIfInterrupted(signal) {
    if (signal?.aborted)
        throw interruption(signal);
}
/** A synchronous child can return before Node delivers the foreground job's
 * signal. Two check phases include a poll turn, without a timed sleep. */
export async function deliverPendingSignal(signal) {
    for (let turn = 0; signal && !signal.aborted && turn < 2; turn++)
        await new Promise((resolve) => setImmediate(resolve));
    return signal?.aborted ?? false;
}
export async function interruptionCheckpoint(signal) {
    await deliverPendingSignal(signal);
    throwIfInterrupted(signal);
}
/** Admit a synchronous host read/test only after the run has handled any
 * pending signal. Interruption takes precedence over both data and errors. */
export async function interruptibleHostCall(signal, call) {
    await interruptionCheckpoint(signal);
    let value;
    try {
        value = call();
    }
    catch (error) {
        await interruptionCheckpoint(signal);
        throw error;
    }
    await interruptionCheckpoint(signal);
    return value;
}
