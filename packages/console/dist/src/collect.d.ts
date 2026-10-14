import type { BoardSources, Source, StoreSource } from "./types.js";
/** A recorded stream by value. A schema 2 feedback edition commits its
 * verifier stream by reference (WO-154), which projections cannot read; it
 * is rebuilt from Git first, `candidates` supplying the judged report. A
 * stream without references is returned unchanged. */
export declare function editionStream(root: string, text: string, candidates?: readonly string[]): string;
export declare function storeFromLog(id: string, label: string, source: Source<string>): StoreSource;
/** Host adapter only. Fixed read-only commands; no command text comes from data. */
export declare function collectSources(root: string, requestedStores?: readonly string[]): Promise<BoardSources>;
