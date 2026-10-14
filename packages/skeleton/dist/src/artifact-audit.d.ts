import type { Event } from "@dotln/kernel";
import { type ArtifactDriftField } from "./artifact-identity.js";
export interface ArtifactIdentityReceipt {
    readonly eventId: string;
    readonly eventType: string;
    readonly status: "matched" | "unverified" | "unavailable" | "refused";
    readonly evidenceLinks: readonly string[];
    readonly identity: Readonly<{
        semanticHash: string;
        compilerContractVersion: string;
        compilerPackageVersion: string;
        componentDefinitionCount: number;
    }> | null;
    readonly reason: string;
    readonly drift: readonly ArtifactDriftField[];
    readonly diagnosticCodes: readonly string[];
}
export interface ArtifactIdentityProjection {
    readonly assurance: "deterministic-content-equality-only";
    readonly availability: "recorded" | "unavailable";
    readonly records: readonly ArtifactIdentityReceipt[];
    readonly limitations: readonly string[];
}
/** Projection only: a recorded comparison is evidence of agreement, never authenticity. */
export declare const projectArtifactIdentities: (events: readonly Event[]) => ArtifactIdentityProjection;
/** Preserve the authority trace grammar while admitting exactly the v1 pin suffix. */
export declare const withoutArtifactIdentityInputs: (inputs: readonly string[]) => readonly string[] | undefined;
