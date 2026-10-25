import type { SourceChangeHostOptions } from "../src/source-change-host.js";
/** Faults are per path and call, without changing any host permissions. */
export declare function cleanupFaults(fail: {
    profile?: readonly number[] | "always";
    route?: readonly number[] | "always";
}): {
    calls: {
        path: string;
        kind: "profile" | "route";
        count: number;
    }[];
    unlink(path: string): void;
};
export declare const sourceEventOrder: (root: string) => string[];
export declare const launchpad: string;
export declare const fixtureObjectEnvironment: (cwd: string) => NodeJS.ProcessEnv;
export declare const fixtureGit: (cwd: string, ...args: string[]) => string;
export declare function createSourceFixture(): string;
export declare function sourceFixtureOptions(root: string, now: () => number, behavior?: string, name?: "claude" | "codex"): SourceChangeHostOptions;
