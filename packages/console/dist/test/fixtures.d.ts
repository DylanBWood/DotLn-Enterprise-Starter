import type { BoardSources } from "../src/types.js";
export declare const root: string;
export declare const fixtureRoot: string;
type Input = {
    path: string;
    ref: string;
    format: "json" | "text" | "log";
    sha256: string;
};
type Case = {
    stores?: readonly {
        id: string;
        label: string;
        input: string;
    }[];
    controlLog?: readonly string[];
    refutations?: readonly string[];
} & Readonly<Record<string, unknown>>;
type FixtureManifest = {
    fixtureVersion: string;
    inputs: Record<string, Input>;
    cases: Record<string, Case>;
};
export declare const readFixtureManifest: () => FixtureManifest;
export declare function loadFixture(name: string, manifest?: FixtureManifest): BoardSources;
export declare function combinedFixture(): BoardSources;
export {};
