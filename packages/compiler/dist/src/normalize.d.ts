import type { AuthorityGrant, CompiledProgram, LoadoutGraph } from "./types.js";
export declare const compareText: (left: string, right: string) => number;
export declare const orderedUnique: (values: readonly string[]) => readonly string[];
export declare const canonicalStringify: (value: unknown) => string;
/** Validate at the normalization boundary, including deserialized view input. */
export declare const normalizeAuthorityGrants: (values: readonly AuthorityGrant[]) => readonly AuthorityGrant[];
export declare const normalizeLoadoutGraph: (value: LoadoutGraph) => LoadoutGraph;
export declare const normalizeCompiledProgram: (value: CompiledProgram) => CompiledProgram;
export declare const fnv1a64: (value: string) => string;
export declare const semanticHash: (value: CompiledProgram) => string;
