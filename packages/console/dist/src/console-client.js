function endpoint(connection, path) {
    if (connection.version !== 1 ||
        connection.host !== "127.0.0.1" ||
        !Number.isSafeInteger(connection.port) ||
        connection.port < 1 ||
        connection.port > 65535 ||
        !/^[a-f0-9]{64}$/u.test(connection.token))
        throw new Error("invalid local console connection");
    return `http://127.0.0.1:${connection.port}${path}`;
}
/** Retain only diagnostic codes: error messages, stacks and arbitrary cause
 * objects can contain the private token or request arguments. */
function transportCodes(error, seen = new Set()) {
    if (!error || typeof error !== "object" || seen.has(error) || seen.size >= 8)
        return [];
    seen.add(error);
    const row = error;
    const names = [
        "Error",
        "TypeError",
        "AggregateError",
        "AbortError",
        "TimeoutError",
    ];
    return [
        ...(typeof row.name === "string" && names.includes(row.name)
            ? [row.name]
            : []),
        ...(typeof row.code === "string" &&
            /^(?:E[A-Z0-9_]{2,40}|UND_ERR_[A-Z0-9_]{1,40})$/.test(row.code)
            ? [row.code]
            : []),
        ...transportCodes(row.cause, seen),
        ...(Array.isArray(row.errors)
            ? row.errors.flatMap((item) => transportCodes(item, seen))
            : []),
    ];
}
async function transport(url, init, operation) {
    try {
        return await fetch(url, init);
    }
    catch (error) {
        const detail = [...new Set(transportCodes(error))].join(" > ") ||
            "unknown transport error";
        throw new Error(`console request ${operation} failed (${detail})`);
    }
}
function decodeResult(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        throw new Error("invalid console command result");
    const result = value;
    if (result.version !== 1 ||
        typeof result.command !== "string" ||
        !Number.isSafeInteger(result.exitCode) ||
        typeof result.stdoutBase64 !== "string" ||
        typeof result.stderrBase64 !== "string")
        throw new Error("invalid console command result");
    return result;
}
/** Returns the terminal's result bytes. A caller, route or request refusal
 * arrives in the same terminal refusal shape with a non-2xx status. */
export async function invokeConsoleCommand(connection, request, signal) {
    const response = await transport(endpoint(connection, "/console-commands-v1/invoke"), {
        method: "POST",
        headers: {
            authorization: `Bearer ${connection.token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify(request),
        ...(signal ? { signal } : {}),
    }, /^[a-z][a-z.-]{0,59}$/.test(request.command) ? request.command : "invoke");
    const result = decodeResult(await response.json());
    if (response.ok ? result.command !== request.command : result.exitCode === 0)
        throw new Error("invalid console command result");
    return response.ok ? result : { ...result, command: request.command };
}
export async function readConsoleContract(connection, signal) {
    const response = await transport(endpoint(connection, "/console-commands-v1"), {
        headers: { authorization: `Bearer ${connection.token}` },
        ...(signal ? { signal } : {}),
    }, "contract");
    if (!response.ok)
        throw new Error(`console contract refused (${response.status})`);
    return response.json();
}
