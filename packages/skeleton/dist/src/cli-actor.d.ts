import type { ActorAdapter, ActorResult } from "./actor-contract.js";
import { type CliActorSpec } from "./cli-actor-contract.js";
import { type MissionSource } from "./mission-check-protocol.js";
import { type MissionDocumentReader, type MissionDocumentsResult } from "./mission-check-source.js";
import { type ProcessRunner } from "./worker-transport.js";
export interface CliActorContext {
    residentStore: string;
    episodeId: string;
}
export declare const actorFailure: (reason: string) => ActorResult;
/** Used by the disposable supervisor in production and by process doubles. */
export declare function startCliEpisode(spec: CliActorSpec, context: CliActorContext, runner?: ProcessRunner, version?: string, missionSource?: MissionSource, missionDocuments?: MissionDocumentsResult): {
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
    /** The repository's reader of the documents a mission check judges,
     * which the script-side resident launcher supplies. */
    missionDocuments?: MissionDocumentReader;
}): ActorAdapter;
