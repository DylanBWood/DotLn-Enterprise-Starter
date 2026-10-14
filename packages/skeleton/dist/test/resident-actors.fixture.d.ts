import { type WorkerRequest, type WriterRequest } from "../src/worker-protocol.js";
import type { ProcessRunner } from "../src/worker-transport.js";
export declare function actorFixture(kind?: "writer" | "inspection"): {
    root: string;
    cwd: string;
    request: WorkerRequest | WriterRequest;
    configuration: import("../src/resident-state.js").ResidentConfiguration;
    directory: string;
    git: (directory: string, ...args: string[]) => string;
    dispose: () => void;
};
export declare const completedRunner: ProcessRunner;
