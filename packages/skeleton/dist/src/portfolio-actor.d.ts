/** WO-100: the resident's portfolio actor. One episode materializes the
 * activated order through WO-120, changes source through WO-052 and verifies
 * the change through WO-054; the hosts are bound by the caller, so an
 * unbound resident reports the actor unavailable and dispatches nothing. */
import { type ActorAdapter } from "./actor-contract.js";
import { type PortfolioActivation, type PortfolioObservation } from "./portfolio.js";
export interface PortfolioIdentity {
    readonly workOrderId: string;
    readonly workOrderPath: string;
}
export type PortfolioChange = PortfolioObservation["change"] & {
    readonly tokens?: number;
};
export type PortfolioVerdict = Extract<PortfolioObservation["verification"], {
    verdict: "pass" | "fail";
}> & {
    readonly tokens?: number;
};
export interface PortfolioPorts {
    /** WO-120: allocate or recover the durable identity and activate it. */
    materialize(activation: PortfolioActivation): Promise<PortfolioIdentity>;
    /** WO-052: one source change inside the derived surfaces and envelope. */
    change(activation: PortfolioActivation, identity: PortfolioIdentity): Promise<PortfolioChange>;
    /** WO-054: independent verification of the observed change. */
    verify(activation: PortfolioActivation, identity: PortfolioIdentity, change: Extract<PortfolioChange, {
        status: "observed";
    }>): Promise<PortfolioVerdict>;
}
export declare const PORTFOLIO_UNBOUND = "portfolio execution unavailable: no WO-120, WO-052 and WO-054 hosts are bound to this resident";
export declare function portfolioAdapter(ports?: PortfolioPorts): ActorAdapter;
