import type { CompilationEnvironment, CompileDiagnostic, CompiledPresencePolicy, CompiledProgram, LoadoutGraph } from "./types.js";
export declare function compilePresence(graph: LoadoutGraph, base: CompiledProgram, environment: CompilationEnvironment): Readonly<{
    policies: readonly CompiledPresencePolicy[];
    diagnostics: readonly CompileDiagnostic[];
}>;
/** These lines are derived from compiled values, independent of authored notes. */
export declare function projectPresenceInspection(program: CompiledProgram): Readonly<{
    pulse: readonly string[];
    interrupt: readonly string[];
}>;
