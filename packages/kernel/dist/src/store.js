const requiredFields = [
    "schemaVersion",
    "eventId",
    "type",
    "occurredAt",
    "actorId",
    "workstreamId",
    "payload",
];
const optionalFields = ["episodeId", "correlationId", "causationId"];
const envelopeFields = new Set([...requiredFields, ...optionalFields]);
const fieldPath = (parent, key) => /^[A-Za-z_$][\w$]*$/.test(key)
    ? `${parent}.${key}`
    : `${parent}[${JSON.stringify(key)}]`;
/** Schema 1 envelope validation; payload meaning remains the reactor's concern. */
export function tryDecodeLog(log) {
    const failure = (line, code, path, detail) => ({
        ok: false,
        code,
        path,
        message: `Malformed JSONL at line ${line}: ${detail} (${code} at ${path})`,
    });
    if (log === "")
        return { ok: true, value: [] };
    if (!log.endsWith("\n"))
        return failure(log.split("\n").length, "MISSING_NEWLINE", "$", "missing final newline");
    const events = [];
    const lines = log.slice(0, -1).split("\n");
    for (const [index, line] of lines.entries()) {
        const lineNumber = index + 1;
        if (line.trim() === "")
            return failure(lineNumber, "EXPECTED_OBJECT", "$", "expected a JSON object");
        let parsed;
        try {
            parsed = JSON.parse(line);
        }
        catch {
            return failure(lineNumber, "INVALID_JSON", "$", "invalid JSON");
        }
        if (parsed === null || Array.isArray(parsed) || typeof parsed !== "object")
            return failure(lineNumber, "EXPECTED_OBJECT", "$", "expected a JSON object");
        const record = parsed;
        for (const key of Object.keys(record))
            if (!envelopeFields.has(key))
                return failure(lineNumber, "UNKNOWN_FIELD", fieldPath("$", key), "unknown envelope field");
        for (const key of requiredFields)
            if (!Object.hasOwn(record, key))
                return failure(lineNumber, "MISSING_FIELD", `$.${key}`, "missing required field");
        if (record.schemaVersion !== 1)
            return failure(lineNumber, "UNSUPPORTED_SCHEMA", "$.schemaVersion", "expected schema version 1");
        for (const key of [
            "eventId",
            "type",
            "actorId",
            "workstreamId",
            ...optionalFields,
        ])
            if (Object.hasOwn(record, key) && typeof record[key] !== "string")
                return failure(lineNumber, "EXPECTED_STRING", `$.${key}`, "expected a string");
        if (record.eventId !== `evt_${lineNumber}`)
            return failure(lineNumber, "EVENT_ORDER", "$.eventId", `expected evt_${lineNumber}`);
        if (typeof record.occurredAt !== "number")
            return failure(lineNumber, "EXPECTED_NUMBER", "$.occurredAt", "expected a number");
        if (!Number.isFinite(record.occurredAt))
            return failure(lineNumber, "EXPECTED_FINITE_NUMBER", "$.occurredAt", "expected a finite number");
        // JSON.parse excludes non-JSON types, but accepts numeric overflow.
        // A stack keeps deeply nested valid JSON from exhausting the call stack.
        const pending = [
            { value: record.payload, path: "$.payload" },
        ];
        while (pending.length) {
            const { value, path } = pending.pop();
            if (typeof value === "number" && !Number.isFinite(value))
                return failure(lineNumber, "NON_JSON_NUMBER", path, "expected a finite JSON number");
            if (Array.isArray(value)) {
                for (let i = value.length - 1; i >= 0; i--)
                    pending.push({ value: value[i], path: `${path}[${i}]` });
            }
            else if (value !== null && typeof value === "object") {
                for (const [key, child] of Object.entries(value).reverse())
                    pending.push({ value: child, path: fieldPath(path, key) });
            }
        }
        events.push(record);
    }
    return { ok: true, value: events };
}
export function appendEvent(log, event) {
    const eventId = `evt_${decodeLog(log).length + 1}`;
    const assigned = { ...event, eventId };
    const line = `${JSON.stringify(assigned)}\n`;
    // Validate the bytes we are about to append through the same envelope
    // decoder used by readers; a malformed draft must never create a bad log.
    const appended = `${log}${line}`;
    const decoded = decodeLog(appended);
    // Live consumers receive the same JSON value that replay will read.
    return { log: appended, event: decoded[decoded.length - 1] };
}
export function decodeLog(log) {
    const result = tryDecodeLog(log);
    if (!result.ok)
        throw new Error(result.message);
    return result.value;
}
export function encodeLog(events) {
    return (events.map((event) => JSON.stringify(event)).join("\n") +
        (events.length ? "\n" : ""));
}
