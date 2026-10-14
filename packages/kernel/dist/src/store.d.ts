import type { DecodeResult, Event, EventEnvelope } from "./types.js";
export type JsonlLog = string;
/** Schema 1 envelope validation; payload meaning remains the reactor's concern. */
export declare function tryDecodeLog(log: JsonlLog): DecodeResult<readonly Event[]>;
export declare function appendEvent(log: JsonlLog, event: Omit<EventEnvelope, "eventId">): {
    readonly log: JsonlLog;
    readonly event: Event;
};
export declare function decodeLog(log: JsonlLog): readonly Event[];
export declare function encodeLog(events: readonly Event[]): JsonlLog;
