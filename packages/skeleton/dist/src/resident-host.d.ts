import { type PredicateRegistry } from "@dotln/kernel";
import { type ActorAdapter, type ActorKind } from "./actor-catalog.js";
import { type PortfolioPorts } from "./portfolio-actor.js";
import { type ResidentConfiguration } from "./resident-state.js";
import { ResidentStore } from "./resident-store.js";
export interface ResidentHostOptions {
    directory: string;
    policyId: string;
    commandRoot?: string;
    workOrderIndexPath?: string;
    workOrderIndexError?: import("./runtime-status-contract.js").WorkOrderSourceReason;
    configuration?: ResidentConfiguration;
    now?: () => number;
    catalog?: Readonly<Record<ActorKind, ActorAdapter>>;
    predicates?: PredicateRegistry;
    capabilities?: () => readonly string[];
    /** The hosts a portfolio actor runs through: WO-120, WO-052 and WO-054 (WO-100). */
    portfolio?: PortfolioPorts;
    /** Filed intents admitted and resumed by the resident itself (WO-123). */
    vertical?: {
        tick(store: ResidentStore, now: () => number, capabilities: () => readonly string[]): Promise<boolean>;
    };
}
export declare class ResidentHost {
    private readonly options;
    readonly store: ResidentStore;
    private console;
    private readonly now;
    private readonly catalog;
    private firstTick;
    private started;
    constructor(options: ResidentHostOptions);
    start(): Promise<void>;
    close(): void;
    tick(): Promise<void>;
    run(options?: {
        once?: boolean;
        tickMs?: number;
        cycles?: number;
        signal?: AbortSignal;
    }): Promise<void>;
}
