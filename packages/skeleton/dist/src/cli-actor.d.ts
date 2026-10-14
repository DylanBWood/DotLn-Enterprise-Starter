import type { ActorAdapter, ActorResult } from "./actor-contract.js";
import { type CliActorSpec } from "./cli-actor-contract.js";
import { type MissionSource } from "./mission-check-protocol.js";
import { type ProcessRunner } from "./worker-transport.js";
export interface CliActorContext {
    residentStore: string;
    episodeId: string;
}
export declare const actorFailure: (reason: string) => ActorResult;
/** Used by the disposable supervisor in production and by process doubles. */
export declare function startCliEpisode(spec: CliActorSpec, context: CliActorContext, runner?: ProcessRunner, version?: string, missionSource?: MissionSource): {
    kill: (signal?: NodeJS.Signals) => void;
    completed: Promise<ActorResult>;
};
export declare function cliWorkerAdapter(options?: {
    rows?: Readonly<Record<string, {
        row: string;
        label: string;
        reason: string;
    }>>;
    runner?: ProcessRunner;
    version?: string;
}): ActorAdapter;
