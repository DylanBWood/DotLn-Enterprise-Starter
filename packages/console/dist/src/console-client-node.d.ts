import type { ConsoleConnection } from "./console-client.js";
/** The text host reads the owner-only descriptor; browser shells receive the
 * same connection from their local host rather than reading filesystem data. */
export declare function readConsoleConnection(store: string): ConsoleConnection;
