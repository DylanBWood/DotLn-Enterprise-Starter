import { type ConsoleCommandResult } from "./console-commands.js";
import { ResidentStore } from "./resident-store.js";
export declare const CONSOLE_DIRECTORY = "console";
export declare const CONSOLE_CONNECTION_FILE = "console-loopback-v1.json";
type Connection = Readonly<{
    version: 1;
    host: "127.0.0.1";
    port: number;
    token: string;
}>;
/** The console's owner-only directory inside a resident store: the connection
 * descriptor and the content-addressed result bytes its receipts name. */
export declare function consoleDirectory(store: string): string;
/** A console-originated refusal has the lifecycle CLIs' refusal shape: exit 1,
 * no stdout, one `error:` line on stderr (WO-115 D007). */
export declare function consoleRefusal(command: string, reason: string): ConsoleCommandResult;
export type ConsoleReplay = Readonly<{
    results: ConsoleCommandResult[];
    incomplete: string[];
}>;
/** Results are reproduced from the durable console receipts and their
 * digest-checked bytes without rerunning a terminal command. An invocation
 * without a result, such as one interrupted by a process failure, is named. */
export declare function replayConsoleResults(store: string): ConsoleReplay;
/** The resident's local command surface. Caller, route and request checks run
 * on arrival and a decoded request's response opens at once; admission and
 * execution run one command at a time, and each decoded request records a
 * console invocation and its result or refusal, whether or not its caller
 * stays. Start it only while holding the store's lifetime lock. */
export declare class ConsoleLoopback {
    private readonly store;
    private readonly root;
    private readonly now;
    private readonly readBoard?;
    private readonly server;
    private readonly token;
    private readonly directory;
    private readonly descriptor;
    private readonly children;
    private serial;
    private connection?;
    private envelope?;
    private closing;
    private closed?;
    constructor(store: ResidentStore, root: string, now?: () => number, readBoard?: (() => Promise<Buffer>) | undefined);
    start(): Promise<Connection>;
    /** Stops admission, interrupts in-flight commands, records their results
     * and stops serving. Repeated calls share one shutdown. */
    close(): Promise<void>;
    private shutdown;
    private accept;
    /** Caller, route and request checks; each refusal is answered here, before
     * the command lane, so none waits behind a running command. */
    private decode;
    /** One turn of the lane: the invocation receipt, the command unless its
     * caller left while queued or the resident is stopping, and the result
     * receipt. A decoded request keeps its receipts either way. */
    private run;
    /** The terminal's classifier names the effect of the equivalent terminal
     * command; the terminal hooks' decider judges it against the resident's
     * compiled program envelope (WO-115 D005). Text the classifier cannot
     * classify is refused: the hook defers it to host permissions, and the
     * console has no host-permission layer (WO-115 D010). */
    private admit;
    private execute;
}
export {};
