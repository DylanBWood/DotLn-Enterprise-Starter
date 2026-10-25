import type { AcceptanceCriterion, NamedVerificationTest, WorktreeVerificationContract } from "@dotln/compiler";
import { SourceChangeHost } from "../src/source-change-host.js";
import { VerificationDriver, VerificationHost } from "../src/verification-host.js";
import { WorkerStore } from "../src/worker-store.js";
import { type EvidenceWorkerRequest, type VerificationWorkerResult } from "../src/verification-protocol.js";
import type { WorkOrderTransport } from "../src/worker-transport.js";
export declare const snapshotCriteria: readonly AcceptanceCriterion[];
export declare const snapshotTests: readonly NamedVerificationTest[];
export declare const snapshotContract: WorktreeVerificationContract;
export declare function snapshotResult(request: EvidenceWorkerRequest): VerificationWorkerResult;
export declare function snapshotTransport(onDispatch?: (request: EvidenceWorkerRequest) => void): WorkOrderTransport<EvidenceWorkerRequest>;
export declare function sourceSnapshotFixture(): Promise<{
    root: string;
    source: SourceChangeHost;
    result: {
        readonly status: "observed";
        readonly observation: import("../src/source-change-state.js").SourceChangeObserved;
    };
    baseline: import("../src/verification-worktree.js").PreparedWorktreeVerification;
    options: {
        worktree: string;
        baseCommit: string;
        observedCommit: string;
        repo: string;
        criteria: readonly AcceptanceCriterion[];
        tests: readonly NamedVerificationTest[];
        contract: WorktreeVerificationContract;
    };
    prepared: import("../src/verification-worktree.js").PreparedWorktreeVerification;
}>;
export declare function openSnapshotDriver(fixture: Awaited<ReturnType<typeof sourceSnapshotFixture>>, name: string): {
    store: WorkerStore;
    driver: VerificationDriver;
    host: VerificationHost;
};
export declare const forgeGraph: (file: string, commit: string, change: {
    tree: string;
} | {
    parent: string;
}) => void;
/** Each planted interpretation has a control that ordinary Git would consume. */
export declare function plantGitInterpretation(root: string, worktree: string, kind: "replace" | "graph" | "hooks", commit: string, base: string): {
    common: string;
    marker: string;
};
