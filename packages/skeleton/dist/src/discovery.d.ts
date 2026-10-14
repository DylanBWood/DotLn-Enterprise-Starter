import { type ExecutableProgramV1 } from "@dotln/kernel";
import { type DiscoveryReport } from "./work-candidate.js";
export type { WorkCandidate, DiscoveryReport } from "./work-candidate.js";
export interface DiscoveryConventions {
    checks?: {
        kind: "lint" | "test";
        argv: string[];
        paths: string[];
    }[];
    placements?: {
        path: string;
        home: string;
    }[];
    generated?: {
        path: string;
        referenceTokens: string[];
    }[];
    repairHistory?: string;
}
export interface DiscoveryOptions {
    profilePath?: string;
}
export declare function decodeDiscoveryConventions(value: unknown): DiscoveryConventions;
/** No operator await, parallel All, model choice or repair effect. */
export declare const discoveryProgram: ExecutableProgramV1;
export declare function discover(worktree: string, conventions?: DiscoveryConventions, options?: DiscoveryOptions): DiscoveryReport;
/** Host-internal entry; only the supervisor supplies the inherited native boundary. */
export declare function discoverWithinActor(worktree: string, options: DiscoveryOptions): DiscoveryReport;
