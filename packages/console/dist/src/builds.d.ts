import { type CompilationEnvironment, type FeedbackObservation, type FeedbackUnit } from "@dotln/compiler";
import type { BoardSection, BoardSources, LoadoutSource } from "./types.js";
import { ProjectionContext } from "./context.js";
export declare const INSPECTION_EXPIRES_AT = 86400000;
export declare function exportedLoadouts(exports: Readonly<Record<string, unknown>>, ref: string, environment: CompilationEnvironment, onError?: (ref: string, reason: string) => void): readonly LoadoutSource[];
export declare function projectBuilds(ctx: ProjectionContext, sources: BoardSources): BoardSection;
/** The retained audit report is already a maturity fold. Reconstruct only the
 * selected fixture observations defined by its documented causal-pair method,
 * and prove equality with that fold; never turn a self-host run into live counts. */
export declare function observationsFromReport(value: unknown, units?: readonly FeedbackUnit[]): readonly FeedbackObservation[];
export declare function projectMechanisms(ctx: ProjectionContext, sources: BoardSources): BoardSection;
