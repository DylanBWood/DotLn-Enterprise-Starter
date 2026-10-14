import { type Event } from "@dotln/kernel";
import { type VerificationSubject } from "@dotln/compiler";
import { type ReviewRepairWitness, type RepairOriginal, type RepairGrants, type RepairState } from "./repair.js";
import { SourceChangeHost, type SourceChangeHostOptions } from "./source-change-host.js";
import { WorkerStore } from "./worker-store.js";
import type { WorkOrderTransport } from "./worker-transport.js";
import type { EvidenceWorkerRequest } from "./verification-protocol.js";
export interface RepairHostOptions {
    readonly store: WorkerStore;
    readonly original: RepairOriginal;
    readonly grants?: RepairGrants;
    readonly baseline: VerificationSubject;
    readonly subject: VerificationSubject;
    readonly snapshotPath: string;
    /** Stable item namespace when independent review items share one contract. */
    readonly episodeNamespace?: string;
    readonly reviewItem?: {
        readonly witness: ReviewRepairWitness;
        readonly finding: import("@dotln/compiler").VerificationFinding;
    };
    /** Retained child stores and verification copies, outside target worktrees. */
    readonly directory: string;
    readonly source: Pick<SourceChangeHostOptions, "authorityEvidence" | "artifactIdentity" | "worktreeParent" | "launchpadCheckout" | "model" | "effort" | "transport" | "signal">;
    readonly verifier: {
        readonly transport: WorkOrderTransport<EvidenceWorkerRequest>;
        readonly model: string;
        readonly effort: string;
        /** Waits out a stopped attempt's lease before the one fresh attempt; the
         * caller supplies the wait so an injected clock can advance. */
        readonly awaitLease?: (leaseExpiresAt: number) => Promise<void>;
    };
    readonly now?: () => number;
    readonly onEvent?: (event: Event) => void;
    /** Fault injection after durable child receipt, before parent observation. */
    readonly afterRepairCommit?: () => void;
    readonly afterSnapshotPrepared?: () => void;
}
/** Host effects are selected by the persisted executable program, not a retry loop. */
export declare class RepairHost {
    readonly options: RepairHostOptions;
    private runtime;
    private log;
    private lastDecision?;
    readonly now: () => number;
    readonly workstreamId: string;
    constructor(options: RepairHostOptions);
    get state(): RepairState;
    private opening;
    private restore;
    private feed;
    sourceHost(): SourceChangeHost;
    private verify;
    run(): Promise<RepairState>;
}
