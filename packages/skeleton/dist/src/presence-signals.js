/** Replayable observations. No process, launch-path or ambient-clock input. */
export const PRESENCE_HOOK_EVENTS = [
    "UserPromptSubmit",
    "PreToolUse",
    "PostToolUse",
    "Stop",
];
export function classifyPresenceSignal(signal, stamp) {
    if (signal.kind === "progress")
        return "task";
    if (signal.kind === "away" || signal.kind === "back")
        return "human";
    return !stamp &&
        signal.event === "UserPromptSubmit" &&
        signal.interaction === "human"
        ? "human"
        : "actor";
}
const identity = (value) => typeof value === "string" &&
    value.length > 0 &&
    value.length <= 256 &&
    !/[\u0000-\u0020\u007f]/u.test(value);
export function decodePresenceObservation(value) {
    const fail = () => {
        throw new Error("invalid presence observation");
    };
    if (!value || typeof value !== "object" || Array.isArray(value))
        return fail();
    const v = value;
    if (Object.keys(v).some((k) => !["signal", "origin", "at", "stamp"].includes(k)) ||
        !Number.isFinite(v.at) ||
        v.at < 0 ||
        !v.signal ||
        typeof v.signal !== "object" ||
        Array.isArray(v.signal))
        return fail();
    if (v.stamp !== undefined &&
        (!v.stamp ||
            typeof v.stamp !== "object" ||
            Array.isArray(v.stamp) ||
            Object.keys(v.stamp).some((k) => k !== "episodeId") ||
            !identity(v.stamp.episodeId)))
        return fail();
    const s = v.signal;
    let keys;
    switch (s.kind) {
        case "away":
        case "back":
            keys = ["kind"];
            if (v.stamp)
                return fail();
            break;
        case "heartbeat":
            keys = ["kind", "event", "sessionId", "interaction"];
            if (!PRESENCE_HOOK_EVENTS.includes(s.event) ||
                !identity(s.sessionId) ||
                (s.interaction !== undefined &&
                    !["human", "scripted", "unknown"].includes(s.interaction)))
                return fail();
            break;
        case "progress":
            keys = ["kind", "taskId"];
            if (!identity(s.taskId) || v.stamp)
                return fail();
            break;
        default:
            return fail();
    }
    if (Object.keys(s).some((k) => !keys.includes(k)) ||
        v.origin !== classifyPresenceSignal(s, v.stamp))
        return fail();
    return structuredClone(v);
}
export const presenceActorKey = (signal, stamp) => (stamp ? `episode:${stamp.episodeId}` : `session:${signal.sessionId}`);
