import type { ConsoleCommandRequest, ConsoleCommandResult } from "@dotln/skeleton/dist/src/console-commands.js";
/** A transport client suitable for the text host or a browser shell whose
 * local host supplies the private connection token. It imports no Node API. */
export type ConsoleConnection = Readonly<{
    version: 1;
    host: "127.0.0.1";
    port: number;
    token: string;
}>;
/** Returns the terminal's result bytes. A caller, route or request refusal
 * arrives in the same terminal refusal shape with a non-2xx status. */
export declare function invokeConsoleCommand(connection: ConsoleConnection, request: ConsoleCommandRequest, signal?: AbortSignal): Promise<ConsoleCommandResult>;
export declare function readConsoleContract(connection: ConsoleConnection, signal?: AbortSignal): Promise<unknown>;
