import type { ActiveMechanic, AmbientEffect, ArtifactIdentityV1, CompilationEnvironment, CompiledProgram, ComponentManifestEntry, LoadoutGraph, SupportFacet } from "./types.js";
export declare const COMPILER_PACKAGE_VERSION = "0.28.0";
export declare const COMPONENT_DEFINITION_HASH_SCHEME: "dotln-component-definition-fnv1a64-v1";
export declare const COMPONENT_DEFINITION_DOMAIN = "dotln:component-definition:v1";
/** The definition must come from normalizeLoadoutGraph, not a source view. */
export declare const componentDefinitionPreimage: (componentKind: ComponentManifestEntry["componentKind"], definition: ActiveMechanic | SupportFacet | AmbientEffect) => string;
/** Called only after successful compilation, with its normalized source. */
export declare const deriveArtifactIdentity: (graph: LoadoutGraph, program: CompiledProgram, environment: CompilationEnvironment, semanticHash: string) => ArtifactIdentityV1;
