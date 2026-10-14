import type { AuthorityEnvelope, CompilationEnvironment, CompileResult, LoadoutGraph, SupportFacet } from "./types.js";
export declare const SENSE_IDS: readonly ["beacon-sight", "fine-spectrum", "composition"];
export type SenseId = (typeof SENSE_IDS)[number];
export declare const BEACON_METADATA_CAPABILITY = "beacons.individual.metadata";
export declare const GROUP_METADATA_CAPABILITY = "beacons.group.metadata";
export declare const beaconSenses: {
    readonly "beacon-sight": SupportFacet;
    readonly "fine-spectrum": SupportFacet;
    readonly composition: SupportFacet;
};
/** The host supplies authority; equipping a support does not edit its envelope. */
export declare function beaconSenseLoadout(senses: readonly SenseId[], authority: AuthorityEnvelope, audience?: "public" | "verifier"): LoadoutGraph;
export declare function compileBeaconSenses(senses: readonly SenseId[], environment: CompilationEnvironment, authority: AuthorityEnvelope, audience?: "public" | "verifier"): CompileResult;
