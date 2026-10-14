import { type WorkOrder } from "@dotln/compiler";
import type { PortfolioIdentity, PortfolioPorts } from "./portfolio-actor.js";
import { type PortfolioActivation } from "./portfolio.js";
import { type SourceChangeHostOptions } from "./source-change-host.js";
import type { EvidenceWorkerRequest } from "./verification-protocol.js";
import type { WorkOrderTransport } from "./worker-transport.js";
export interface PortfolioExecutionOptions {
    /** WO-120's `materializeOrder`, bound by a launchpad-owning caller. */
    readonly materialize: (compiled: WorkOrder, provenance: PortfolioActivation["provenance"], options: {
        readonly surfaces: readonly string[];
    }) => Promise<PortfolioIdentity>;
    /** The bound repository's checkout, at the binding's base commit and clean. */
    readonly target: string;
    /** Retained child stores and verification copies, outside the target. */
    readonly directory: string;
    readonly source: Pick<SourceChangeHostOptions, "authorityEvidence" | "artifactIdentity" | "worktreeParent" | "launchpadCheckout" | "model" | "effort" | "transport">;
    readonly verifier: {
        readonly transport: WorkOrderTransport<EvidenceWorkerRequest>;
        readonly model: string;
        readonly effort: string;
    };
    readonly now?: () => number;
}
export declare function relocationHolds(target: string, baseCommit: string, commit: string, move: {
    readonly from: string;
    readonly to: string;
}): boolean;
/** WO-054 needs criterion surfaces present in both snapshots: the order's
 * paths that survive the change, plus the files its named commands run. When
 * none is in both (a Sort move checked by `npm test`), the commands still run
 * over the whole tree, so the surfaces are every file both snapshots hold. */
export declare function verificationSurfaces(target: string, baseCommit: string, commit: string, activation: PortfolioActivation): string[];
export declare function portfolioExecution(options: PortfolioExecutionOptions): PortfolioPorts;
