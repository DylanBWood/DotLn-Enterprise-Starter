import { type SenseId } from "@dotln/compiler";
export interface SourceChangeProfile {
    readonly profileId: "source-change-v1";
    readonly mounts: readonly [
        {
            readonly path: string;
            readonly access: "read-write";
        }
    ];
    readonly writableSurfaces: readonly [string];
    readonly worktreeParent: string;
    readonly launchpadCheckout: string;
}
export interface FixtureInspectionProfile {
    readonly profileId: "fixture-inspection-v1";
    readonly mounts: readonly [
        {
            readonly path: string;
            readonly access: "read";
        }
    ];
}
export interface BeaconMount {
    readonly mountId: string;
    readonly path: string;
    readonly access: "beacon-metadata";
    readonly family: "individual" | "phase-group";
    readonly addresses: readonly string[];
}
/** WO-009's host-projected input boundary, specialized for metadata. Paths stay
 * in the trusted host session, never in the model capsule or observation log.
 * This constrains model inputs/tools, not a hostile same-user host process.
 */
export interface BeaconPerceptionProfile {
    readonly profileId: "beacon-perception-v1";
    readonly audience: "public" | "verifier";
    readonly mounts: readonly BeaconMount[];
    readonly writableSurfaces: readonly [];
    readonly modelTools: readonly [];
    readonly narrativeSurfaces: readonly [];
}
export type ExecutionEnvironmentProfile = FixtureInspectionProfile | BeaconPerceptionProfile | SourceChangeProfile;
export interface PerceptionDeclaration {
    readonly version: 1;
    readonly profileId: "beacon-perception-v1" | "unmounted";
    readonly senses: readonly SenseId[];
    readonly capabilities: readonly string[];
    readonly mounts: readonly Omit<BeaconMount, "path">[];
}
/** Derive compilation capabilities only from the host's mount authority record.
 * No filesystem access here: the permission guard must run before the first stat.
 */
export declare function declareBeaconPerception(senses: readonly SenseId[], profile: BeaconPerceptionProfile | undefined, audience: "public" | "verifier"): PerceptionDeclaration;
