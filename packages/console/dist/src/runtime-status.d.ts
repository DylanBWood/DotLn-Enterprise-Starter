import { type FSWatcher } from "node:fs";
import { type RuntimeStatusV1 } from "@dotln/skeleton/dist/src/runtime-status-contract.js";
export declare const RUNTIME_STATUS_FILE = "runtime-status-v1.json";
export declare function readRuntimeStatus(directory: string): RuntimeStatusV1;
export declare function renderRuntimeStatus(view: RuntimeStatusV1): string;
/** Watch the directory because the resident replaces the file by rename. */
export declare function watchRuntimeStatus(directory: string, changed: (view: RuntimeStatusV1) => void, unavailable?: () => void): FSWatcher;
export declare function statusCli(args: string[]): void;
