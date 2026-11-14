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
/** The two generated work-order pages whose cards the index record holds. */
export type WorkOrderPage = "index" | "history";
/** One order's card on a generated page. The index command writes each
 * card's Markdown and this record from the same fields: each field's text as
 * a reader sees it, by label in the page's order, and the destinations of the
 * card's links as the page writes them. `line` is the line of the card's
 * heading on its page. */
export interface WorkOrderCard {
    readonly id: string;
    readonly line: number;
    readonly section: string;
    readonly title: string;
    readonly phase: string;
    readonly dependency: "ready" | "blocked" | "unknown";
    readonly verdict: "pass" | "fail" | null;
    readonly fields: Readonly<Record<string, string>>;
    readonly links: readonly string[];
}
/** What the index command prints with `--json`: each page's cards, the
 * workstream observation and the release tags the pages were rendered from.
 * The pages' Markdown is for people and is never read back, and no file
 * records the cards: a script-side caller hands this text in. Text that is
 * not that output refuses; each part is checked by the reader that takes it. */
export interface WorkOrderIndexRecord {
    readonly schemaVersion: 1;
    readonly index: Readonly<Record<string, unknown>>;
    readonly history: Readonly<Record<string, unknown>>;
    readonly workstreams: readonly unknown[];
    readonly releaseTags: readonly unknown[];
}
export declare function readWorkOrderIndexRecord(text: string): WorkOrderIndexRecord;
/** One page's cards from the index record. A card outside its page's
 * sections, a repeated card or a malformed field refuses. */
export declare function readWorkOrderCards(text: string, page: WorkOrderPage): readonly WorkOrderCard[];
/** The index page's cards are the only work-order status input: the active
 * and queued orders with their phase, dependency state and latest
 * verification verdict, as the index command recorded them in the index
 * record. */
export declare function runtimeOrdersFromIndex(text: string | null): RuntimeStatusV1["workOrders"];
/** Reject a different version and malformed local files before rendering. */
export declare function decodeRuntimeStatus(value: unknown): RuntimeStatusV1;
