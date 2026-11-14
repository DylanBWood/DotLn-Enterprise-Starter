/** The disposable, versioned resident-to-UI status contract. No filesystem or
 * event payload is part of this type; hosts receive only selected facts. */
export const WORK_ORDER_SOURCE_REASONS = [
    "launchpad-unavailable",
    "configuration-invalid",
    "binding-unavailable",
    "index-unreadable",
    "index-not-regular",
    "index-invalid",
];
/** The sections each page holds: the work ahead on the index page, the
 * settled orders on the history page. */
const PAGE_SECTIONS = {
    index: ["Active", "Open"],
    history: ["Closed", "Withdrawn", "Superseded", "Historical"],
};
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const hasKeys = (value, keys) => Object.keys(value).sort().join(",") === [...keys].sort().join(",");
const CARD_KEYS = [
    "id",
    "line",
    "section",
    "title",
    "phase",
    "dependency",
    "verdict",
    "fields",
    "links",
];
export function readWorkOrderIndexRecord(text) {
    const record = JSON.parse(text);
    if (!isRecord(record) ||
        !hasKeys(record, [
            "schemaVersion",
            "index",
            "history",
            "workstreams",
            "releaseTags",
        ]) ||
        record["schemaVersion"] !== 1 ||
        !isRecord(record["index"]) ||
        !isRecord(record["history"]) ||
        !Array.isArray(record["workstreams"]) ||
        !Array.isArray(record["releaseTags"]))
        throw new Error("expected the generated work-order index record");
    return record;
}
/** One page's cards from the index record. A card outside its page's
 * sections, a repeated card or a malformed field refuses. */
export function readWorkOrderCards(text, page) {
    const recorded = readWorkOrderIndexRecord(text)[page];
    if (!hasKeys(recorded, ["cards"]) || !Array.isArray(recorded["cards"]))
        throw new Error(`expected the ${page} page's cards`);
    const seen = new Set();
    return recorded["cards"].map((card) => {
        if (!isRecord(card) ||
            !hasKeys(card, CARD_KEYS) ||
            typeof card["id"] !== "string" ||
            !/^WO-\d{3}$/u.test(card["id"]) ||
            seen.has(card["id"]) ||
            !Number.isSafeInteger(card["line"]) ||
            card["line"] < 1 ||
            typeof card["section"] !== "string" ||
            !PAGE_SECTIONS[page].includes(card["section"]) ||
            typeof card["title"] !== "string" ||
            typeof card["phase"] !== "string" ||
            !card["phase"] ||
            !["ready", "blocked", "unknown"].includes(card["dependency"]) ||
            ![null, "pass", "fail"].includes(card["verdict"]) ||
            !isRecord(card["fields"]) ||
            !Object.entries(card["fields"]).every(([label, text]) => label !== "" && typeof text === "string") ||
            !Array.isArray(card["links"]) ||
            !card["links"].every((link) => typeof link === "string"))
            throw new Error("invalid work-order card");
        seen.add(card["id"]);
        return card;
    });
}
/** The index page's cards are the only work-order status input: the active
 * and queued orders with their phase, dependency state and latest
 * verification verdict, as the index command recorded them in the index
 * record. */
export function runtimeOrdersFromIndex(text) {
    if (text === null)
        return { status: "unavailable", items: [] };
    let cards;
    try {
        cards = readWorkOrderCards(text, "index");
    }
    catch {
        throw new Error("invalid generated work-order index");
    }
    return {
        status: "available",
        items: cards.map(({ id, phase, dependency, verdict }) => {
            if (!/^[a-z][a-z-]*$/u.test(phase))
                throw new Error(`invalid index status for ${id}`);
            return { order: id, phase, dependency, verdict };
        }),
    };
}
/** Reject a different version and malformed local files before rendering. */
export function decodeRuntimeStatus(value) {
    const record = (v) => {
        if (!v || typeof v !== "object" || Array.isArray(v))
            throw new Error("invalid runtime-status-v1 structure");
        return v;
    };
    const shape = (v, keys) => {
        const item = record(v);
        if (Object.keys(item).sort().join(",") !== [...keys].sort().join(","))
            throw new Error("invalid runtime-status-v1 fields");
        return item;
    };
    const str = (v) => typeof v === "string";
    const nullable = (v) => v === null || str(v);
    const order = (v) => typeof v === "string" && /^WO-\d{3}$/u.test(v);
    const number = (v) => typeof v === "number" && Number.isFinite(v) && v >= 0;
    const list = (v, check) => Array.isArray(v) && v.every(check);
    const choice = (v, values) => str(v) && values.includes(v);
    const quantity = (v) => {
        const item = shape(v, ["consumed", "remaining"]);
        return (number(item["consumed"]) &&
            (item["remaining"] === null || number(item["remaining"])));
    };
    const v = shape(value, [
        "viewModelVersion",
        "observedAt",
        "actors",
        "liveEpisodes",
        "presence",
        "holds",
        "budget",
        "workOrders",
    ]);
    const presence = shape(v["presence"], [
        "signal",
        "present",
        "phase",
        "cadences",
    ]);
    const budget = shape(v["budget"], ["status", "episodes", "wallMs", "tokens"]);
    const orders = shape(v["workOrders"], [
        "status",
        "items",
        ...(Object.hasOwn(record(v["workOrders"]), "reason") ? ["reason"] : []),
    ]);
    if (v["viewModelVersion"] !== "runtime-status-v1" ||
        !number(v["observedAt"]) ||
        !list(v["actors"], (entry) => {
            const row = shape(entry, [
                "phase",
                "kind",
                "availability",
                "lastEpisode",
            ]);
            return (str(row["phase"]) &&
                str(row["kind"]) &&
                choice(row["availability"], ["available", "unavailable", "unknown"]) &&
                nullable(row["lastEpisode"]));
        }) ||
        !list(v["liveEpisodes"], (entry) => {
            const row = shape(entry, [
                "episodeId",
                "order",
                "actor",
                "transport",
                "phase",
                "startedAt",
                "elapsedMs",
                "launchClaims",
            ]);
            const claim = shape(row["launchClaims"], ["source", "model", "effort"]);
            return (str(row["episodeId"]) &&
                (row["order"] === null || order(row["order"])) &&
                str(row["actor"]) &&
                str(row["transport"]) &&
                str(row["phase"]) &&
                number(row["startedAt"]) &&
                number(row["elapsedMs"]) &&
                choice(claim["source"], ["request", "none"]) &&
                nullable(claim["model"]) &&
                nullable(claim["effort"]));
        }) ||
        !choice(presence["signal"], [
            "away",
            "back",
            "progress",
            "heartbeat",
            "unknown",
        ]) ||
        typeof presence["present"] !== "boolean" ||
        !nullable(presence["phase"]) ||
        !list(presence["cadences"], (entry) => {
            const row = shape(entry, ["phase", "nextFireAt"]);
            return (str(row["phase"]) &&
                (row["nextFireAt"] === null || number(row["nextFireAt"])));
        }) ||
        !list(v["holds"], (entry) => {
            const row = shape(entry, ["kind", "reason", "order"]);
            return (choice(row["kind"], ["mission", "handoff", "dispatch"]) &&
                str(row["reason"]) &&
                (row["order"] === null || order(row["order"])));
        }) ||
        !choice(budget["status"], ["configured", "unavailable"]) ||
        !quantity(budget["episodes"]) ||
        !quantity(budget["wallMs"]) ||
        !quantity(budget["tokens"]) ||
        !choice(orders["status"], ["available", "unavailable"]) ||
        (Object.hasOwn(orders, "reason") &&
            (orders["status"] !== "unavailable" ||
                !choice(orders["reason"], [...WORK_ORDER_SOURCE_REASONS]))) ||
        !list(orders["items"], (entry) => {
            const row = shape(entry, ["order", "phase", "dependency", "verdict"]);
            return (order(row["order"]) &&
                str(row["phase"]) &&
                choice(row["dependency"], ["ready", "blocked", "unknown"]) &&
                (row["verdict"] === null || choice(row["verdict"], ["pass", "fail"])));
        }))
        throw new Error("invalid runtime-status-v1 values");
    return value;
}
