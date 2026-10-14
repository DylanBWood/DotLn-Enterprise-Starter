import { type MissionCheckObserved, type MissionCheckRequest, type MissionCheckSubject } from "./mission-check-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
export declare const missionEpisodeId: (subject: MissionCheckSubject) => string;
/** An empty scratch working directory: the capsule is the only input, and no
 * project startup file may add context the judge was not given. */
export declare function missionCheckScratch(): string;
export declare function buildMissionCheckRequest(options: {
    subject: MissionCheckSubject;
    model: string;
    effort: string;
    cwd: string;
    episodeId?: string;
    at: number;
}): MissionCheckRequest;
export interface MissionCheckReceipt {
    readonly judgment: MissionCheckObserved;
    readonly subjectHash: string;
    readonly episodeId: string;
    readonly transport: string;
    readonly harnessVersion: string;
    readonly model: string;
    readonly effort: string;
    readonly mode?: "subagents";
    readonly raw?: string;
    readonly dispatchedAt: string;
    readonly completedAt: string;
    /** Present when no judgment was obtained; the verdict is then `unknown`. */
    readonly failure?: string;
}
/** One read-only episode over a pinned capsule. An unavailable verifier is an
 * honest `unknown`, never a pass: the resident holds on both. */
export declare function runMissionCheck(subject: MissionCheckSubject, transport: WorkOrderTransport<MissionCheckRequest>, model: string, effort: string, now?: () => number, episodeId?: string, cwd?: string): Promise<MissionCheckReceipt>;
export declare const MISSION_CHECK_TIMEOUT_MS: 600000;
