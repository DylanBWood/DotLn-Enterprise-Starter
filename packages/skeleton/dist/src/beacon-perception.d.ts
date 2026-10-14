import { type AuthorityEnvelope } from "@dotln/compiler";
import type { AuthorizationResult, Event } from "@dotln/kernel";
import type { GroupObservation, SignalObservation } from "./control-beacon.js";
import type { PerceptionDeclaration } from "./execution-environment.js";
export declare function compilePerception(declaration: PerceptionDeclaration, authority: AuthorityEnvelope, audience: "public" | "verifier"): import("@dotln/compiler").CompileResult;
export declare function perceptionGate(declaration: PerceptionDeclaration, authority: AuthorityEnvelope, audience: "public" | "verifier"): string | null;
export declare function refusePerception(event: Event, authority: AuthorityEnvelope, reason: string): AuthorizationResult;
export interface PerceptionRead {
    readonly observations: readonly SignalObservation[];
    readonly groups: readonly GroupObservation[] | "not-sensed";
}
/** Whitelist the edge result. Fine Spectrum is the only path to a sub-second
 * timestamp; raw stat objects and extra adapter fields never reach the log.
 */
export declare function projectSenseObservation<T extends SignalObservation | GroupObservation>(observation: T, fine: boolean): T;
/** Replay rechecks arithmetic and disclosure. The keyed outcome is a recorded
 * host observation; pure replay never asks for a secret or a filesystem read.
 */
export declare function validatePerception(read: PerceptionRead, declaration: PerceptionDeclaration, keyEpoch: number | null): void;
/** Exactly one physical context line per equipped channel, for at most twelve
 * individual beacons and one group. No model-token estimate is claimed.
 */
export declare function renderBeaconPerception(read: PerceptionRead): string;
