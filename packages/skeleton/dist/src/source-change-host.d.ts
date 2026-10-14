import { type Command, type Event, type JsonValue } from "@dotln/kernel";
import type { ArtifactIdentityV1 } from "@dotln/compiler";
import type { AuthorityEnvelope, WorkOrder } from "@dotln/kernel";
import { WorkerStore } from "./worker-store.js";
import { type WriterRequest, type WriterResult } from "./worker-protocol.js";
import type { WorkOrderTransport, TransportDispatch } from "./worker-transport.js";
import { type SourceChangeObserved, type SourceChangeRefused } from "./source-change-state.js";
import { SourceChangeWorktree } from "./source-change-worktree.js";
export interface SourceChangeHostOptions {
    readonly store: WorkerStore;
    readonly workOrder: WorkOrder;
    /** Repair execution parent; the original contract base stays in workOrder. */
    readonly executionBaseCommit?: string;
    readonly repairContext?: JsonValue;
    readonly authorityEnvelope: AuthorityEnvelope;
    /** Evidence already established by the compilation/dispatch host. */
    readonly authorityEvidence: readonly string[];
    readonly artifactIdentity: ArtifactIdentityV1;
    readonly branch: string;
    readonly surfaces: readonly string[];
    /** A Sort move: the one removal a portfolio order may make without
     * `repo.delete`, because the host checks the exact relocation. */
    readonly relocation?: {
        readonly from: string;
        readonly to: string;
    };
    readonly worktreeParent: string;
    readonly launchpadCheckout: string;
    readonly testCommand: string;
    readonly commitMessage: string;
    readonly model: string;
    readonly effort: string;
    readonly transport: WorkOrderTransport<WriterRequest>;
    readonly now?: () => number;
    readonly onRunning?: (dispatch: TransportDispatch<WriterResult>) => void;
    readonly afterResult?: () => void;
    readonly afterReceiptSaved?: () => void;
    readonly onEvent?: (event: Event) => void;
    /** Run-owned interruption; its reason is the received host signal. */
    readonly signal?: AbortSignal;
}
export type SourceChangeOutcome = {
    readonly status: "observed";
    readonly observation: SourceChangeObserved;
} | {
    readonly status: "refused";
    readonly refusal: SourceChangeRefused;
};
/** One compiled order, one branch and one host-owned commit receipt. No publication. */
export declare class SourceChangeHost {
    readonly options: SourceChangeHostOptions;
    readonly now: () => number;
    readonly tree: SourceChangeWorktree;
    readonly command: Command;
    readonly workstreamId: string;
    private readonly logicalEpisode;
    private driver;
    constructor(options: SourceChangeHostOptions);
    private request;
    private get state();
    private events;
    private record;
    private preflight;
    private acquire;
    private checkAuthority;
    private attempts;
    private fence;
    private before;
    private attemptEvents;
    private stopped;
    private recordStopped;
    private settle;
    private processIdentity;
    private recoverTermination;
    private checkIntegrity;
    private closeCommand;
    private refuse;
    private observe;
    run(): Promise<SourceChangeOutcome>;
    finish(): void;
}
