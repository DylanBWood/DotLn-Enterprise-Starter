import { LiveReactorDriver, type FixtureTree, type ReactorStep } from "./scenario.js";
import { type ResultEnvelope, type WorkerEffort, type WorkerRequest, type WorkerResult } from "./worker-protocol.js";
import type { WorkOrderTransport, TransportDispatch } from "./worker-transport.js";
import { WorkerStore } from "./worker-store.js";
import type { BeaconClaimRecord } from "./beacon.js";
export interface WorkerHostOptions {
    readonly store: WorkerStore;
    readonly driver: LiveReactorDriver;
    readonly transport: WorkOrderTransport;
    readonly now?: () => number;
    readonly onClaim?: (claim: BeaconClaimRecord) => void;
    readonly onRunning?: (dispatch: TransportDispatch) => void;
    readonly afterResultSaved?: () => void;
}
/** This host only admits idempotent read-only inspection, never arbitrary writes. */
export declare class WorkerHost {
    private readonly options;
    readonly now: () => number;
    constructor(options: WorkerHostOptions);
    preflight(cwd: string, fixture: FixtureTree, model: string, effort: WorkerEffort): {
        request: WorkerRequest;
        cached: WorkerResult | undefined;
    };
    private record;
    expireLeases(): void;
    run(cwd: string, fixture: FixtureTree, model: string, effort: WorkerEffort): Promise<{
        envelope: ResultEnvelope;
        resultStep: ReactorStep | null;
    }>;
}
