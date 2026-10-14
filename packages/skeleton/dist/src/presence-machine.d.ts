import type { CompiledPresencePolicy, PresenceTransition } from "@dotln/compiler";
import { type PredicateRegistry } from "@dotln/kernel";
export declare const presencePredicates: PredicateRegistry;
export interface PresenceSnapshot {
    state: string;
    present: boolean;
    now: number;
    armedAt: number;
    lastActivity: number;
    generation: number;
    current: {
        id: string;
        generation: number;
        discretionary: boolean;
        status: string;
    } | null;
}
/** The WO-067 table interpreter. All time and outcomes are explicit inputs. */
export declare class PresenceMachine {
    readonly compiled: CompiledPresencePolicy;
    readonly predicates: PredicateRegistry;
    state: string;
    present: boolean;
    now: number;
    armedAt: number;
    lastActivity: number;
    generation: number;
    current: PresenceSnapshot["current"];
    readonly transcript: string[];
    constructor(compiled: CompiledPresencePolicy, predicates?: PredicateRegistry, snapshot?: PresenceSnapshot);
    snapshot(): PresenceSnapshot;
    phase(): import("@dotln/compiler").CompiledPresencePhase | undefined;
    projected(): {
        present: boolean;
        phase: string;
        policyId: string;
        inFlight: boolean;
    };
    transition(on: PresenceTransition["on"], episode?: string): void;
    absence(at?: number): void;
    returned(at?: number): void;
    outcome(kind: "verified-success" | "failure" | "unverified", episode: string, at?: number): void;
    /** A durable human question frees the process slot without failing/resetting
     * the policy. Its recorded generation binds the later answer continuation. */
    waitForInput(episode: string): void;
    /** Read-only cadence projection for hosts; all cadence evaluation remains
     * with the policy interpreter. This does not advance the machine. */
    nextCadenceAt(): number | null;
    due(at: number): number | null;
    dispatch(id: string): void;
}
