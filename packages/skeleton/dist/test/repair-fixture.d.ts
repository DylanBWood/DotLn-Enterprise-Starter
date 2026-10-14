import type { WorkOrderTransport } from "../src/worker-transport.js";
import { type WriterRequest } from "../src/worker-protocol.js";
import { SourceChangeHost } from "../src/source-change-host.js";
import { RepairHost, type RepairHostOptions } from "../src/repair-host.js";
export declare function repairTransport(root: string, wrong?: boolean): WorkOrderTransport<WriterRequest>;
export declare function createRepairFixture(): Promise<{
    original: {
        workOrder: {
            workOrderId: string;
            objective: string;
            acceptanceCriteria: readonly string[];
            constraints: readonly string[];
            nonGoals: readonly string[];
            requiredEvidence: readonly string[];
            repo: string;
            baseCommit: string;
            allowedOperations: readonly string[];
            prohibitedOperations: readonly string[];
            outputContract: import("@dotln/kernel").JsonValue;
            knownFacts: string[];
            decisions: string[];
        };
        authorityEnvelope: import("@dotln/kernel").AuthorityEnvelope;
        surfaces: readonly string[];
        criteria: readonly import("@dotln/compiler").AcceptanceCriterion[];
        tests: readonly import("@dotln/compiler").NamedVerificationTest[];
    };
    baseline: import("@dotln/compiler").VerificationSubject;
    subject: import("@dotln/compiler").VerificationSubject;
    snapshotPath: string;
    root: string;
    source: SourceChangeHost;
}>;
export declare function repairFixtureOptions(root: string, wrong?: boolean): RepairHostOptions;
export declare const fixtureHost: (root: string, wrong?: boolean) => RepairHost;
export declare function disposeRepairFixture(root: string): void;
