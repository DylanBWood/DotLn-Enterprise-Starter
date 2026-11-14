import type { BoardSources, DocumentStructure } from "../src/types.js";
export declare const root: string;
export declare const fixtureRoot: string;
/** The repository's Markdown reader, as the collector's script runs it: a
 * recorded authored document reaches the board as its structure. */
export declare const markdownStructure: (source: string) => DocumentStructure;
type Input = {
    path: string;
    ref: string;
    format: "json" | "text" | "log" | "markdown";
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
/** The recorded manifest with the self-host case's three inputs taken from
 * the feedback edition the evidence selection names now. The recorded case
 * reads a fixed copy; the board's property checks read this as well, so the
 * console is still exercised against live evidence. A schema 2 edition names
 * its live audit, which a carried edition keeps in another directory. */
export declare function currentSelfhostManifest(): Promise<FixtureManifest>;
export declare function loadFixture(name: string, manifest?: FixtureManifest): BoardSources;
export declare function combinedFixture(): BoardSources;
export {};
