import { type CompilationEnvironment, type CompiledPresencePhase, type CompiledPresencePolicy, type LoadoutGraph } from "@dotln/compiler";
import { type Event, type PredicateRegistry } from "@dotln/kernel";
import { type ActorSpec } from "./actor-contract.js";
import { PresenceMachine, type PresenceSnapshot } from "./presence-machine.js";
import { type HandoffPacket } from "./handoff-contract.js";
import { type MissionCheckFinding, type MissionCheckObserved } from "./mission-check-protocol.js";
import type { DiscoveryReport } from "./work-candidate.js";
import { type PortfolioActivation, type PortfolioBinding } from "./portfolio.js";
import { type IntentBinding } from "./vertical.js";
export interface ResidentConfiguration {
    graph: LoadoutGraph;
    environment: CompilationEnvironment;
    policyId: string;
    actors: Record<string, ActorSpec>;
    evidence: string[];
    heartbeatBudgetMs?: number;
    /** WO-100: the preauthorized portfolio its `portfolio` actors derive from. */
    portfolio?: PortfolioBinding;
}
/** A mission check that did not come back `on-mission` holds unattended
 * dispatch. The check itself stays armed; nothing else runs until a human
 * answers or a fresh judgment over changed work clears it. */
export interface MissionHold {
    reason: string;
    episodeId: string;
    subjectHash: string;
    verdict: "drift" | "unknown";
    findings: MissionCheckFinding[];
    correctionEventId?: string;
}
export interface ResidentState {
    intentStep?: {
        key: string;
        commandId: string;
    } | null;
    intents?: Record<string, {
        kind: "admitted";
        binding: IntentBinding;
    } | {
        kind: "NeedsHuman";
        step: string;
        reason: string;
    }>;
    configuration: ResidentConfiguration | null;
    policy: CompiledPresencePolicy | null;
    machine: PresenceSnapshot | null;
    at: number;
    present: boolean;
    episodes: Record<string, "dispatched" | "observed" | "lost">;
    episodePhases: Record<string, string>;
    episodeGenerations: Record<string, number>;
    revokedBy: Event[];
    lastNoOp: string | null;
    lastHumanAt: number | null;
    actors: Record<string, {
        lastHeartbeatAt: number;
        status: "live" | "stalled" | "stopped";
        failureAt?: number;
        episodeId?: string;
    }>;
    progress: Record<string, number>;
    handoffs: Record<string, {
        packet: HandoffPacket;
        phaseId: string;
        generation: number;
        answer?: string;
    }>;
    missionChecks: Record<string, {
        subjectHash: string | null;
        verdict: MissionCheckObserved["verdict"];
    }>;
    dispatchHeld: MissionHold | null;
    /** The latest verified WO-119 observation a portfolio derives from. */
    discovery: {
        episodeId: string;
        report: DiscoveryReport;
    } | null;
    portfolio: {
        activations: Record<string, PortfolioActivation & {
            at: number;
        }>;
        /** WO-120 provenance keys already activated: one attempt per candidate. */
        sources: string[];
        episodes: number;
        wallMs: number;
        tokens: number;
    };
}
export declare function decodeResidentConfiguration(value: unknown): ResidentConfiguration;
export declare const emptyResidentState: () => ResidentState;
export declare function residentMachine(state: ResidentState, predicates?: PredicateRegistry): PresenceMachine;
/** The host and replay fold share the scheduling predicate. Input/authority
 * decoding remains admitIntent's job; a temporarily unavailable slot is no
 * admission decision. */
export declare function intentAdmissionReady(state: ResidentState, phase: CompiledPresencePhase | undefined, operator?: boolean, predicates?: PredicateRegistry): boolean;
export declare function intentStepReady(state: ResidentState, binding: IntentBinding, commandId: string, predicates?: PredicateRegistry, resuming?: boolean): boolean;
export declare function residentEpisodeId(machine: PresenceMachine, dueAt: number): string;
export declare const residentEventTypes: readonly ["IntentAdmitted", "IntentHeld", "IntentStepStarted", "IntentStepSettled", "ResidentConfigured", "ClockSampled", "ScriptEpisodeDispatched", "ScriptEpisodeObserved", "ScriptEpisodeLost", "ScriptEpisodeRefused", "ActorUnavailable", "OperatorPresenceObserved", "HandoffRequested", "HandoffAnswered", "CliWorkerObserved", "MissionDriftObserved", "MissionHoldCleared", "PortfolioOrderActivated", "PortfolioOrderObserved"];
/** The read-only judge of running work, declared as a CLI worker actor. */
export declare const isMissionActor: (spec: ActorSpec) => boolean;
/** WO-100: the one order a portfolio phase may activate now, or the NoOp
 * reason. Pure over recorded state, so the fold recomputes what the host
 * recorded; the budget is checked first, and nothing dispatches past it. */
export declare function portfolioSelection(state: ResidentState, phase: CompiledPresencePhase): {
    activation: PortfolioActivation;
} | {
    refusal: string;
};
export declare function residentRefusal(state: ResidentState, machine: PresenceMachine): string | null;
export declare function foldResidentEvent(previous: ResidentState | undefined, event: Event, predicates: PredicateRegistry): ResidentState;
