import { type ArtifactIdentityV1, type CompilationEnvironment, type CompileDiagnostic, type CompileResult, type LoadoutGraph } from "@dotln/compiler";
import type { JsonValue } from "@dotln/kernel";
export interface LoadoutEquippedPayloadV2 {
    readonly payloadVersion: 2;
    readonly graph: LoadoutGraph;
    readonly artifactIdentity: ArtifactIdentityV1;
}
export declare const ARTIFACT_REFUSAL_TYPES: readonly ["ArtifactIdentityUnavailable", "ArtifactIdentityInvalid", "ArtifactIdentityDrift", "ArtifactCompilationRefused", "UnknownScheduleRefused"];
export type ArtifactRefusalType = (typeof ARTIFACT_REFUSAL_TYPES)[number];
export type ArtifactDriftField = "compiler-contract-version" | "compiler-package-version" | "semantic-hash" | "component-definitions" | "compilation-environment" | "authority-expiry";
export interface ArtifactRefusalPayloadV1 {
    readonly payloadVersion: 1;
    readonly reason: string;
    readonly sourceEventId: string | null;
    readonly equippedEventId: string | null;
    readonly pinnedIdentity: ArtifactIdentityV1 | null;
    readonly observedIdentity: ArtifactIdentityV1 | null;
    readonly drift: readonly ArtifactDriftField[];
    readonly diagnostics: readonly CompileDiagnostic[];
}
export declare const isCompilationEnvironment: (value: unknown) => value is CompilationEnvironment;
export declare const isArtifactIdentityV1: (value: unknown) => value is ArtifactIdentityV1;
/** The one runtime compile boundary; malformed recorded input is diagnostic data. */
export declare const compileArtifact: (graph: unknown, environment: unknown) => CompileResult;
export declare const artifactIdentityDrift: (pinned: ArtifactIdentityV1, observed: ArtifactIdentityV1) => readonly ArtifactDriftField[];
/** Successful factories can mint only the v2 payload, never caller-owned pins. */
export declare const createLoadoutEquippedPayload: (graph: LoadoutGraph, environment: CompilationEnvironment) => Readonly<{
    ok: true;
    payload: LoadoutEquippedPayloadV2;
}> | Readonly<{
    ok: false;
    diagnostics: readonly CompileDiagnostic[];
}>;
export declare const artifactIdentityInputs: (identity: ArtifactIdentityV1, equippedEventId: string) => readonly string[];
export declare const isArtifactRefusalType: (type: string) => type is ArtifactRefusalType;
export declare const artifactRefusalPayload: (reason: string, sourceEventId: string | null, equippedEventId: string | null, pinnedIdentity?: ArtifactIdentityV1 | null, observedIdentity?: ArtifactIdentityV1 | null, diagnostics?: readonly CompileDiagnostic[], drift?: readonly ArtifactDriftField[]) => ArtifactRefusalPayloadV1;
export declare const isArtifactRefusalPayload: (value: JsonValue) => value is JsonValue & ArtifactRefusalPayloadV1;
