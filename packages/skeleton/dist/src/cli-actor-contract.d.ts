import { type MissionCheckObserved, type MissionCheckRequest, type MissionCheckSubject } from "./mission-check-protocol.js";
import { type WorkerRequest, type WriterRequest, type WorkerResult, type WriterResult } from "./worker-protocol.js";
import type { CodexEpisodeIsolation } from "./worker-transport.js";
export type CliTransport = "claude-cli-print" | "codex-cli-exec";
export interface CliActorSpec {
    transport: CliTransport;
    request: WorkerRequest | WriterRequest | MissionCheckRequest;
}
export declare const DETACHED_LAUNCH_ROWS: {
    readonly "claude-cli-print": {
        readonly row: "C-U1";
        readonly label: "observed";
        readonly reason: "detached parent, stored CLI authentication; lifetime unknown";
    };
    readonly "codex-cli-exec": {
        readonly row: "X-U1";
        readonly label: "observed";
        readonly reason: "detached parent, stored CLI authentication; lifetime unknown";
    };
};
export interface CliLaunchClaims {
    transport: CliTransport;
    row: string;
    profileId: string;
    model: string;
    effort: string;
    harnessVersion: string;
    origin: "actor";
    episodeId: string;
}
export interface CliActorObservation {
    launch: CliLaunchClaims;
    result?: WorkerResult | WriterResult | MissionCheckObserved;
    failure?: string;
    /** Only a mission check: the capsule this episode actually judged, which
     * completes the pinned one with a dispatch-time observation. */
    subject?: MissionCheckSubject;
    /** Only a Codex episode: its isolated-home record (WO-159). */
    isolation?: CodexEpisodeIsolation;
}
export declare function assertCliActorSpec(value: unknown): asserts value is CliActorSpec;
/** A mission check is rebuilt around its dispatch-time capsule by the episode
 * host, because its authorization is bound to the subject hash. */
export declare function cliActorRequest(spec: CliActorSpec, episodeId: string): {
    kind: "mission-check";
    command: import("@dotln/kernel").Command;
    workOrder: import("@dotln/kernel").WorkOrder;
    subject: MissionCheckSubject;
    model: string;
    effort: import("./worker-protocol.js").WorkerEffort;
    mode?: "subagents";
    raw?: string;
    cwd: string;
    profile: {
        readonly profileId: "mission-check-v1";
        readonly modelTools: readonly [];
    };
    episodeId: string;
} | {
    command: import("@dotln/kernel").Command;
    workOrder: import("@dotln/kernel").WorkOrder;
    artifactIdentity: import("@dotln/compiler").ArtifactIdentityV1;
    model: string;
    effort: import("./worker-protocol.js").WorkerEffort;
    cwd: string;
    fixture: import("./scenario.js").FixtureTree;
    profile: import("./execution-environment.js").FixtureInspectionProfile;
    episodeId: string;
} | {
    kind: "source-change";
    command: import("@dotln/kernel").Command;
    workOrder: import("@dotln/kernel").WorkOrder;
    authorityEnvelope: import("@dotln/kernel").AuthorityEnvelope;
    artifactIdentity: import("@dotln/compiler").ArtifactIdentityV1;
    model: string;
    effort: import("./worker-protocol.js").WorkerEffort;
    cwd: string;
    profile: import("./execution-environment.js").SourceChangeProfile;
    testCommand: string;
    commitMessagePath: string;
    episodeId: string;
};
export declare function assertCliObservation(value: unknown, spec: CliActorSpec, episodeId: string): asserts value is CliActorObservation;
