import { type Event } from "@dotln/kernel";
import { type AcceptanceEvidenceMatrix } from "./verification.js";
export interface WorkerEpisodeStatus {
    readonly episodeId: string;
    readonly commandId: string;
    readonly model: string;
    readonly effort: string;
    readonly transport: string;
    readonly mode: string;
    readonly phase: "starting" | "running" | "interrupted" | "lease-expired" | "completed" | "quarantined";
    readonly startedAt: number;
    readonly lastHeartbeatAt: number;
    readonly leaseExpiresAt: number;
}
export interface DerivedWorkOrderStatus {
    readonly workOrderId: string;
    readonly workOrderPath: string;
    readonly phase: string;
    readonly provenance: Readonly<{
        kind: "runtime" | "ui" | "intent";
        sourceId: string;
    }>;
}
export interface WorkerStatus {
    readonly derivedOrders?: readonly DerivedWorkOrderStatus[];
    readonly acceptanceEvidenceMatrices: readonly AcceptanceEvidenceMatrix[];
    readonly episodes: readonly WorkerEpisodeStatus[];
    readonly runningEpisodes: readonly string[];
    readonly pendingCommands: readonly string[];
    readonly recentEvents: readonly {
        readonly eventId: string;
        readonly type: string;
        readonly occurredAt: number;
    }[];
}
/** No clock, filesystem, transport, mutation or synthesized lifecycle state. */
export declare function projectWorkerStatus(events: readonly Event[], derivedOrders?: readonly DerivedWorkOrderStatus[]): WorkerStatus;
export declare function renderWorkerStatus(status: WorkerStatus): string;
