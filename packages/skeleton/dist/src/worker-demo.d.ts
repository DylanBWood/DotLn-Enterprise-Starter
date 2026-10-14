import { type FixtureTree, type ScenarioResult } from "./scenario.js";
import { type WorkerHostOptions } from "./worker-host.js";
import type { ResultEnvelope, WorkerEffort } from "./worker-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
/** A clean, synthetic repository keeps the example independent of operator files. */
export declare function createWorkerFixture(repository: string, fixture: FixtureTree): string;
export interface WorkerDemoOptions {
    readonly directory: string;
    readonly fixture: FixtureTree;
    readonly transport: WorkOrderTransport;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly now?: () => number;
    readonly onRunning?: WorkerHostOptions["onRunning"];
    readonly afterResultSaved?: WorkerHostOptions["afterResultSaved"];
    readonly beacons?: boolean;
}
export declare function runWorkerDemo(options: WorkerDemoOptions): Promise<{
    envelope: ResultEnvelope;
    scenario: ScenarioResult;
}>;
