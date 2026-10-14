/** The disposable, versioned resident-to-UI status contract. No filesystem or
 * event payload is part of this type; hosts receive only selected facts. */
export declare const WORK_ORDER_SOURCE_REASONS: readonly ["launchpad-unavailable", "configuration-invalid", "binding-unavailable", "index-unreadable", "index-not-regular", "index-invalid"];
export type WorkOrderSourceReason = (typeof WORK_ORDER_SOURCE_REASONS)[number];
export interface RuntimeStatusV1 {
    viewModelVersion: "runtime-status-v1";
    observedAt: number;
    actors: {
        phase: string;
        kind: string;
        availability: "available" | "unavailable" | "unknown";
        lastEpisode: string | null;
    }[];
    liveEpisodes: {
        episodeId: string;
        order: string | null;
        actor: string;
        transport: string;
        phase: string;
        startedAt: number;
        elapsedMs: number;
        launchClaims: {
            source: "request" | "none";
            model: string | null;
            effort: string | null;
        };
    }[];
    presence: {
        signal: "away" | "back" | "progress" | "heartbeat" | "unknown";
        present: boolean;
        phase: string | null;
        cadences: {
            phase: string;
            nextFireAt: number | null;
        }[];
    };
    holds: {
        kind: "mission" | "handoff" | "dispatch";
        reason: string;
        order: string | null;
    }[];
    budget: {
        status: "configured" | "unavailable";
        episodes: {
            consumed: number;
            remaining: number | null;
        };
        wallMs: {
            consumed: number;
            remaining: number | null;
        };
        tokens: {
            consumed: number;
            remaining: number | null;
        };
    };
    workOrders: {
        reason?: WorkOrderSourceReason;
        status: "available" | "unavailable";
        items: {
            order: string;
            phase: string;
            dependency: "ready" | "blocked" | "unknown";
            verdict: "pass" | "fail" | null;
        }[];
    };
}
/** The generated index is the only work-order status input. Derived and
 * hand-written orders use the same WO-NNN heading and fields. */
export declare function runtimeOrdersFromIndex(text: string | null): RuntimeStatusV1["workOrders"];
/** Reject a different version and malformed local files before rendering. */
export declare function decodeRuntimeStatus(value: unknown): RuntimeStatusV1;
