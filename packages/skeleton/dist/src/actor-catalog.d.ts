import { type ActorKind, type ActorAdapter } from "./actor-contract.js";
export * from "./actor-contract.js";
export declare function scriptAvailability(): string | null;
export declare const actorCatalog: Readonly<Record<ActorKind, ActorAdapter>>;
