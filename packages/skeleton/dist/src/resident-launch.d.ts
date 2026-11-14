import type { ActorAdapter, ActorKind } from "./actor-contract.js";
export declare const verticalBridge: () => Promise<any>;
/** One resident run: its store, its policy, and one cycle or a tick. */
export interface ResidentLaunch {
    readonly directory: string;
    readonly policyId: string;
    readonly once: boolean;
    readonly tickMs: number;
}
/** A resident command's options, in any order: `--store` and `--policy`,
 * then `--tick <ms>` or `--once`. Anything else refuses with the usage line
 * of `command`. */
export declare function parseResidentArguments(argv: readonly string[], command?: string): ResidentLaunch;
/** What only the script side can give a resident: the work-order cards, as
 * the index command prints them with `--json`. */
export interface ResidentSources {
    readonly workOrderCards?: () => string;
}
/** Runs the resident over its store for one cycle, or until a signal stops
 * it. `catalog` replaces the default actor adapters, and `sources` is what
 * the script-side launcher hands in. A resident started without the launcher
 * has no cards and reports its work orders unavailable. */
export declare function runResident(launch: ResidentLaunch, catalog?: Readonly<Record<ActorKind, ActorAdapter>>, sources?: ResidentSources): Promise<void>;
