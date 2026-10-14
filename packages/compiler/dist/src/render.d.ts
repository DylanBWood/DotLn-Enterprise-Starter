import type { CompileDiagnostic, CompiledProgram } from "./types.js";
export declare const renderDiagnostic: (value: CompileDiagnostic) => string;
export declare const renderCompiledDiff: (before: CompiledProgram | undefined, after: CompiledProgram | undefined) => string;
export declare const renderViewHashes: (values: readonly Readonly<{
    view: string;
    semanticHash: string;
}>[]) => string;
