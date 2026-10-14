import { type DiscoveryReport } from "./work-candidate.js";
import { type CliActorSpec, type CliActorObservation } from "./cli-actor-contract.js";
import { type MissionSource } from "./mission-check-protocol.js";
import { type HandoffQuestion, type HandoffPacket } from "./handoff-contract.js";
import { type LocalModelActorSpec, type LocalModelObservation } from "./local-model-contract.js";
import { type PortfolioActivation, type PortfolioObservation } from "./portfolio.js";
/** Pure actor declarations and persisted-result validation; no process access. */
export declare const ACTOR_KINDS: readonly ["script", "cli-worker", "human-handoff", "local-model", "portfolio"];
export type ActorKind = (typeof ACTOR_KINDS)[number];
export type ActorSpec = {
    kind: ActorKind;
    effect: string;
    surface: string;
    resources: Record<string, number>;
    command?: readonly string[];
    cwd?: string;
    timeoutMs?: number;
    expectedStdoutSha256?: string;
    outputContract?: "work-candidates-v1";
    worker?: CliActorSpec;
    handoff?: HandoffQuestion;
    local?: LocalModelActorSpec;
    /** Only a mission-check worker: the capsule is completed at dispatch, so a
     * cadence judges the work as it now reads rather than a frozen snapshot. */
    missionSource?: MissionSource;
};
export interface ActorResult {
    worker?: CliActorObservation;
    local?: LocalModelObservation;
    discovery?: DiscoveryReport;
    portfolio?: PortfolioObservation;
    exitCode: number | null;
    signal: string | null;
    stdoutSha256: string;
    firstLine: string;
    verified: boolean;
    reason: string;
}
export interface ActorRun {
    handoff?: HandoffPacket;
    completed: Promise<ActorResult>;
    kill(): void;
}
export declare function assertActorResult(value: unknown): asserts value is ActorResult;
export interface ActorAdapter {
    kind: ActorKind;
    available(spec?: ActorSpec): string | null;
    run(spec: ActorSpec, context?: {
        residentStore: string;
        episodeId: string;
        /** Only a portfolio episode: the activation the resident recorded. */
        portfolio?: PortfolioActivation;
    }): ActorRun;
}
export declare const SCRIPT_SANDBOX = "(version 1)(allow default)(deny network*)";
export declare function assertActorSpec(value: unknown): asserts value is ActorSpec;
/** Schema verification is an observation contract, never repair verification. */
export declare function scriptResultVerified(spec: ActorSpec, result: ActorResult, episodeId?: string): boolean;
