import type { ActorAdapter, ActorResult } from "./actor-contract.js";
import { type LocalModelTransportOptions } from "./local-model-transport.js";
import { type LocalModelActorSpec } from "./local-model-contract.js";
export interface LocalModelActorContext {
    residentStore: string;
    episodeId: string;
}
export type LocalModelRow = {
    row: string;
    label: string;
    reason: string;
};
/** One bounded HTTP episode. Unlike `cli-worker` there is no detached child, so
 * no disposable supervisor is forked: aborting the request ends the episode with
 * the resident that started it. */
export declare function startLocalModelEpisode(spec: LocalModelActorSpec, context: LocalModelActorContext, options?: LocalModelTransportOptions): {
    kill: (signal?: NodeJS.Signals) => void;
    completed: Promise<ActorResult>;
};
/** Availability is the declared row, never a live probe: the resident must be
 * able to record a reasoned NoOp without contacting the operator's endpoint. */
export declare function localModelAdapter(options?: {
    row?: LocalModelRow;
} & LocalModelTransportOptions): ActorAdapter;
