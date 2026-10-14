import type { AuthorityEnvelope, Command, ResultEnvelope, WorkOrder } from "@dotln/kernel";
import type { ArtifactIdentityV1 } from "@dotln/compiler";
import type { Candidate } from "./reactor.js";
import type { FixtureTree } from "./scenario.js";
import type { FixtureInspectionProfile } from "./execution-environment.js";
import type { SourceChangeProfile } from "./execution-environment.js";
export type WorkerTransportName = "claude-cli-print" | "codex-cli-exec" | "local-model-http" | "fake";
/** A requested selector is a log value, not a discovery-registry gate. */
export type WorkerEffort = string;
export interface WorkerEffortSelection {
    readonly effort: string;
    readonly mode?: "subagents";
    readonly raw?: string;
}
export declare function normalizeWorkerEffort(effort: string): WorkerEffortSelection;
export type { CommandReceipt, ResultEnvelope } from "@dotln/kernel";
export interface WorkerResult {
    readonly envelope: ResultEnvelope;
    readonly candidates: readonly Candidate[];
    readonly beaconClaim: "inspection-completed" | "blocked";
}
export interface WorkerRequest {
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly artifactIdentity: ArtifactIdentityV1;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly cwd: string;
    readonly fixture: FixtureTree;
    readonly profile: FixtureInspectionProfile;
}
export declare const HEARTBEAT_MS = 1000;
export declare const LEASE_MS = 5000;
export declare const WORKER_TIMEOUT_MS = 180000;
export declare class WorkerFailure extends Error {
    readonly code: "model-unavailable" | "transport-failed" | "interrupted" | "invalid-result" | "deadline-exceeded" | "output-limit" | "profile-refused";
    readonly detail?: string | undefined;
    constructor(code: "model-unavailable" | "transport-failed" | "interrupted" | "invalid-result" | "deadline-exceeded" | "output-limit" | "profile-refused", detail?: string | undefined);
}
export declare const resultId: (command: Command) => string;
export declare function workerResultSchema(request: WorkerRequest): object;
/** Validate again at the host boundary; a vendor schema claim is not validation. */
export declare function parseWorkerResult(value: unknown, request: WorkerRequest): WorkerResult;
export declare function workerPrompt(request: WorkerRequest): string;
export declare function validateRequest(request: WorkerRequest): void;
/** Supplied by the compilation host; a launch profile cannot grant authority. */
export interface WriterRequest {
    readonly kind: "source-change";
    readonly command: Command;
    readonly workOrder: WorkOrder;
    readonly authorityEnvelope: AuthorityEnvelope;
    readonly artifactIdentity: ArtifactIdentityV1;
    readonly episodeId: string;
    readonly model: string;
    readonly effort: WorkerEffort;
    readonly cwd: string;
    readonly profile: SourceChangeProfile;
    readonly testCommand: string;
    readonly commitMessagePath: string;
}
export interface WriterObservations {
    readonly observedCommit?: {
        readonly sha: string;
        readonly branch: string;
    };
    readonly observedDenials: number | "unavailable";
}
export interface WriterResult {
    readonly envelope: ResultEnvelope & WriterObservations;
}
export declare const isWriterRequest: (request: {
    readonly kind?: string;
} | WorkerRequest) => request is WriterRequest;
export declare const SOURCE_CHANGE_DENIED: readonly ["repo.push", "remote.*", "credentials.*", "settings.*", "sandbox.*", "transport.*", "package.publish"];
/** Every effect a source-change writer may carry; nothing else reaches WO-052. */
export declare const SOURCE_CHANGE_ALLOWED: readonly ["repo.read", "repo.inspect", "repo.write", "git.local", "shell.run"];
export declare function validateWriterRequest(request: WriterRequest): void;
export declare function writerResultSchema(request: WriterRequest): object;
/** Vendor prose is never a source of Git/denial observations. */
export declare function parseWriterResult(value: unknown, request: WriterRequest, observations: WriterObservations): WriterResult;
/** Only the host-owned store consumes already-observed fields. */
export declare function parseStoredWriterResult(value: unknown, request: WriterRequest): WriterResult;
/** The test command is the one each harness admits: Claude's allow-list admits
 * only the host's confined spelling; Codex's own sandbox confines the declared
 * command, and a nested sandbox-exec cannot start inside it (WO-112 D017). */
export declare function writerPrompt(request: WriterRequest, harness?: WorkerTransportName): string;
