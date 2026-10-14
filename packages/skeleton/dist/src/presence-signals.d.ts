/** Replayable observations. No process, launch-path or ambient-clock input. */
export declare const PRESENCE_HOOK_EVENTS: readonly ["UserPromptSubmit", "PreToolUse", "PostToolUse", "Stop"];
export type PresenceHookEvent = (typeof PRESENCE_HOOK_EVENTS)[number];
export type PresenceSignal = {
    kind: "away";
} | {
    kind: "back";
} | {
    kind: "heartbeat";
    event: PresenceHookEvent;
    sessionId: string;
    interaction?: "human" | "scripted" | "unknown";
} | {
    kind: "progress";
    taskId: string;
};
export interface ResidentStamp {
    episodeId: string;
}
export interface OperatorPresenceObserved {
    signal: PresenceSignal;
    origin: "human" | "actor" | "task";
    at: number;
    stamp?: ResidentStamp;
}
export declare function classifyPresenceSignal(signal: PresenceSignal, stamp?: ResidentStamp): OperatorPresenceObserved["origin"];
export declare function decodePresenceObservation(value: unknown): OperatorPresenceObserved;
export declare const presenceActorKey: (signal: Extract<PresenceSignal, {
    kind: "heartbeat";
}>, stamp?: ResidentStamp) => string;
