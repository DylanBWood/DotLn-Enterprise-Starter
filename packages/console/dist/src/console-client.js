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
/** A transport failure names its cause, the socket error's code and message,
 * so a reset or refused connection is told apart from a refusal the resident
 * answered. The token and the request never appear in the message. */
async function transport(url, init) {
    try {
        return await fetch(url, init);
    }
    catch (error) {
        const cause = error
            .cause;
        const detail = cause && typeof cause === "object"
            ? `${typeof cause.code === "string" ? cause.code : "error"}: ${String(cause.message)}`
            : error instanceof Error
                ? error.message
                : String(error);
        throw new Error(`console request failed (${detail})`, { cause: error });
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
    });
    const result = decodeResult(await response.json());
    if (response.ok ? result.command !== request.command : result.exitCode === 0)
        throw new Error("invalid console command result");
    return response.ok ? result : { ...result, command: request.command };
}
export async function readConsoleContract(connection, signal) {
    const response = await transport(endpoint(connection, "/console-commands-v1"), {
        headers: { authorization: `Bearer ${connection.token}` },
        ...(signal ? { signal } : {}),
    });
    if (!response.ok)
        throw new Error(`console contract refused (${response.status})`);
    return response.json();
}
