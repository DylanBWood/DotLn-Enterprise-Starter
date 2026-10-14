import { type WorkerRequest, type WorkerResult } from "./worker-protocol.js";
import { LOCAL_MODEL_TRANSPORT } from "./local-model-transport.js";
/** The endpoint is an operator-owned local address. It stays in the declaration
 * the host supplies, never in a prompt, result or canonical log field beyond
 * this launch claim. */
export interface LocalModelActorSpec {
    endpoint: string;
    request: WorkerRequest;
}
export interface LocalModelLaunchClaims {
    transport: typeof LOCAL_MODEL_TRANSPORT;
    row: string;
    endpoint: string;
    profileId: string;
    model: string;
    effort: string;
    harnessVersion: string;
    origin: "actor";
    episodeId: string;
}
export interface LocalModelObservation {
    launch: LocalModelLaunchClaims;
    result?: WorkerResult;
    failure?: string;
}
export declare function assertLocalModelActorSpec(value: unknown): asserts value is LocalModelActorSpec;
export declare function localModelActorRequest(spec: LocalModelActorSpec, episodeId: string): WorkerRequest;
export declare function assertLocalModelObservation(value: unknown, spec: LocalModelActorSpec, episodeId: string): asserts value is LocalModelObservation;
