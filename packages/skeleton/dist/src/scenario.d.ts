import { LiveReactorDriver, type ReactorStep } from "./live-reactor-driver.js";
export { LiveReactorDriver, type ReactorStep } from "./live-reactor-driver.js";
import type { BeaconClaimRecord } from "./beacon.js";
import { type CompilationEnvironment } from "@dotln/compiler";
import { type Command, type Decision, type Event, type ObserveIntent, type WorkOrder } from "@dotln/kernel";
import { type Candidate, type Loadout, type RuntimeState } from "./reactor.js";
export { MINUTE, compileLoadoutProgram, compileWorkOrder, expectedInspectCommandId, loadout, type Candidate, type Loadout, type RuntimeState, } from "./reactor.js";
export interface FixtureFile {
    readonly path: string;
    readonly referencedBy: readonly string[];
    readonly classification: string;
}
export interface FixtureTree {
    readonly files: readonly FixtureFile[];
}
export interface ScenarioOptions {
    readonly crashAfterPersist?: boolean;
    readonly recoveryLogTransform?: (persistedLog: string) => string;
    readonly equippedLoadout?: Loadout;
    readonly onEvents?: (events: readonly Event[]) => void;
    readonly onExecutorClaim?: (claim: BeaconClaimRecord) => void;
    readonly verifier?: ScenarioVerifier;
}
export interface ScenarioResult {
    readonly log: string;
    readonly decisions: readonly Decision<RuntimeState>[];
    readonly timeline: readonly string[];
    readonly glyphScene: string;
    readonly workOrder: WorkOrder | null;
    readonly candidates: readonly Candidate[];
    readonly verified: boolean;
    readonly cancelledScheduleIds: readonly string[];
    readonly activeScheduleIds: readonly string[];
}
export interface LiveScenarioResult extends ScenarioResult {
    readonly adapterEffects: number;
    readonly adapterDispatches: readonly string[];
    readonly recoveredCommands: readonly Command[];
}
export declare class FakeExecutor {
    #private;
    private readonly fixture;
    private readonly emitClaim?;
    readonly dispatches: string[];
    effects: number;
    constructor(fixture: FixtureTree, emitClaim?: ((claim: BeaconClaimRecord) => void) | undefined);
    dispatch(command: Command, claimedAt?: number): readonly Candidate[];
}
export interface ScenarioVerifier {
    dispatch(intent: ObserveIntent, candidates: readonly Candidate[], driver: LiveReactorDriver, now: number): boolean;
}
export declare function renderGlyphScene(runtime: RuntimeState): string;
export declare const projectScenario: (log: string, runtime: RuntimeState, decisions: readonly Decision<RuntimeState>[]) => ScenarioResult;
export declare function replayScenario(log: string): ScenarioResult;
export declare function startScenario(driver: LiveReactorDriver, equipped?: Loadout, environment?: CompilationEnvironment, startAt?: number): {
    away: ReactorStep;
    pulse: ReactorStep;
    persisted: ReactorStep;
    command: Command;
    queuedScheduleId: string;
};
export type ScenarioOpening = ReturnType<typeof startScenario>;
export declare function restoreScenarioOpening(driver: LiveReactorDriver): ScenarioOpening;
export declare function runScenario(fixture: FixtureTree, options?: ScenarioOptions): LiveScenarioResult;
/** The same fake verifier, refusal and scheduler finish both demo transports. */
export declare function finishScenario(driver: LiveReactorDriver, fixture: FixtureTree, opening: ScenarioOpening, commandResult: ReactorStep, now?: () => number, verifier?: ScenarioVerifier): ScenarioResult;
