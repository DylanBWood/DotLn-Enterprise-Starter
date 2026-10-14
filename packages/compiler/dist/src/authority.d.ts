import type { AuthorityGrant, CompilationEnvironment, CompileDiagnostic, CompiledProgram, LoadoutGraph } from "./types.js";
/** The registry hash names normalized host input, never text in the graph. */
export declare const authorityGrantRegistryHash: (registry: readonly AuthorityGrant[]) => string;
export declare function authorityDiagnostics(graph: LoadoutGraph, environment: CompilationEnvironment): readonly CompileDiagnostic[];
/** Claims have already resolved. Only admitted grants can extend these lists. */
export declare function applyAuthorityGrants(allowed: readonly string[], denied: readonly string[], grants: readonly AuthorityGrant[], field: "effects" | "operations"): Readonly<{
    allowed: readonly string[];
    denied: readonly string[];
}>;
/** Prefix-denial exceptions cannot be represented by the unchanged kernel. */
export declare function grantEnvelopeDiagnostics(program: CompiledProgram): readonly CompileDiagnostic[];
export declare function projectAuthorityInspection(program: CompiledProgram): Readonly<{
    grants: readonly string[];
    restrictions: readonly string[];
}>;
export declare function inspectionAuthorityDiagnostics(program: CompiledProgram): readonly CompileDiagnostic[];
