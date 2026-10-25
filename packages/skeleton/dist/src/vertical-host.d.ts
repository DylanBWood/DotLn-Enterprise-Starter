import type { WorkOrder } from "@dotln/compiler";
import { WorkerStore } from "./worker-store.js";
export { interruption, throwIfInterrupted } from "./host-interruption.js";
/** The source host retained a pending command while revoking a surviving
 * command grant. A later vertical invocation must resume that same command. */
export declare class RetryableSourceCleanupError extends Error {
    constructor();
}
import { type IntentBinding, type VerticalCommand, type VerticalReceipt, type VerticalState } from "./vertical.js";
export interface VerticalPorts {
    materialize(binding: IntentBinding): Promise<{
        workOrder: WorkOrder;
        workOrderPath: string;
    }>;
    /** Real bindings call the existing primitive host; tests replace external actors. */
    execute(command: VerticalCommand, state: VerticalState, active?: (launch: boolean) => Promise<boolean>): Promise<Omit<VerticalReceipt, "command">>;
}
export interface VerticalHostOptions {
    directory: string;
    binding: IntentBinding;
    ports: VerticalPorts;
    now?: () => number;
    /** A fixture kill boundary, after the step's durable receipt. */
    afterStep?: (receipt: VerticalReceipt) => void;
    /** Recheck resident presence/revocation at every effect boundary. */
    permitted?: () => Promise<boolean>;
    startStep?: (command: VerticalCommand) => Promise<boolean>;
    active?: (launch: boolean) => Promise<boolean>;
    settled?: (receipt: VerticalReceipt, terminal: boolean) => Promise<void>;
    /** Operator interruption preserves the current command for a later run. */
    signal?: AbortSignal;
}
export declare class VerticalHost {
    readonly options: VerticalHostOptions;
    readonly store: WorkerStore;
    state: VerticalState | undefined;
    private log;
    private readonly now;
    constructor(options: VerticalHostOptions);
    private restore;
    private append;
    private projectReceipt;
    run({ steps, }?: {
        steps?: number;
    }): Promise<VerticalState>;
}
