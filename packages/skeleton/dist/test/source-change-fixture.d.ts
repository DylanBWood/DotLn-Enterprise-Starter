import type { SourceChangeHostOptions } from "../src/source-change-host.js";
export declare const launchpad: string;
export declare const fixtureGit: (cwd: string, ...args: string[]) => string;
export declare function createSourceFixture(): string;
export declare function sourceFixtureOptions(root: string, now: () => number, behavior?: string, name?: "claude" | "codex"): SourceChangeHostOptions;
