import { type CompiledProgram, type CompilationEnvironment, type CompileResult, type EditableView, type LoadoutGraph } from "./types.js";
export declare const compileLoadout: (source: LoadoutGraph, environment: CompilationEnvironment) => CompileResult;
export declare const compileEditableView: (source: EditableView, environment: CompilationEnvironment) => CompileResult;
export declare const requireCompiled: (result: CompileResult) => CompiledProgram;
export declare const withLinkedSupports: (source: LoadoutGraph, supportFacetIds: readonly string[]) => LoadoutGraph;
