/** WO-100: a preauthorized portfolio and the pure derivation of bounded work
 * from WO-119 candidates. Nothing here reads a file, a clock or a process; the
 * resident owns activation and the WO-052/WO-054 hosts own every effect. */
import { type AuthorityEnvelope, type AuthorityGrant, type CompiledPresencePhase, type CompiledPresencePolicy, type WorkOrder } from "@dotln/compiler";
import type { ProductSuggestion } from "./loadouts/entropy-reducer.js";
import { type WorkCandidate } from "./work-candidate.js";
/** The 5S pieces that compile today: the Gardener's Seiri, the Entropy
 * Reducer's Seisō and its linked Seiketsu. Seiton and the rest join as
 * WO-093 compiles them. */
export declare const PORTFOLIO_MECHANICS: readonly ["sort", "shine", "standardize"];
export type PortfolioMechanic = (typeof PORTFOLIO_MECHANICS)[number];
export type CandidateKind = WorkCandidate["kind"];
/** Which piece owns each producer kind (product 05 §5S / 6S, WO-119). */
export declare const CANDIDATE_MECHANIC: Readonly<Record<CandidateKind, PortfolioMechanic>>;
export interface PortfolioCeiling {
    /** Exact effects a derived order may carry in this presence phase. */
    readonly effects: readonly string[];
    /** Files the order may touch, including a proposed home. The phase's
     * envelope carries it as `resourceLimits.files`; the source-change host
     * counts the committed paths against it and refuses a removal or type
     * change without `repo.delete`, except a Sort move's declared source. */
    readonly files: number;
}
export interface PortfolioBudget {
    readonly episodes: number;
    readonly wallMs: number;
    /** Counted only where an episode reports tokens. */
    readonly tokens?: number;
}
export interface Portfolio {
    /** Absent preserves the WO-100 maintenance portfolio contract. */
    readonly class?: "intent";
    readonly portfolioId: string;
    readonly version: number;
    /** `self` or a registered repository id (WO-069); orders bind to it. */
    readonly repo: string;
    readonly mechanics: readonly PortfolioMechanic[];
    /** Repository-relative files or directories derived orders may touch. */
    readonly surfaces: readonly string[];
    /** Keyed by compiled presence phase id; an absent phase derives nothing. */
    readonly phases: Readonly<Record<string, PortfolioCeiling>>;
    readonly budget: PortfolioBudget;
    /** Exact commands whose independent verification every derived order of
     * the kind requires. A kind without them yields `NeedsHuman`. */
    readonly verification: Readonly<Partial<Record<CandidateKind | "intent", readonly string[]>>>;
}
/** The resident's loadout field: a portfolio bound to the observed base. */
export interface PortfolioBinding {
    readonly definition: Portfolio;
    readonly baseCommit: string;
}
export interface DerivedWorkOrder {
    readonly candidateId: string;
    readonly mechanic: PortfolioMechanic;
    /** WO-120 provenance key: one durable identity per candidate and version. */
    readonly sourceId: string;
    readonly workOrder: WorkOrder;
    readonly surfaces: readonly string[];
    readonly size: {
        readonly files: number;
    };
    readonly tests: readonly string[];
    readonly authorityEnvelope: AuthorityEnvelope;
    readonly grant: AuthorityGrant;
    /** Only a Sort move: the host checks the exact relocation (D006). */
    readonly relocation?: {
        readonly from: string;
        readonly to: string;
    };
}
export type PortfolioDerivation = {
    readonly kind: "order";
    readonly order: DerivedWorkOrder;
} | {
    readonly kind: "ProductSuggestion";
    readonly candidateId: string;
    readonly reason: string;
    readonly suggestion: ProductSuggestion;
} | {
    readonly kind: "NeedsHuman";
    readonly candidateId: string;
    readonly reason: string;
    readonly offending: string;
} | {
    readonly kind: "deferred";
    readonly candidateId: string;
    readonly reason: string;
};
/** Structural contract. Admission under the floor is `admitPortfolio`. */
export declare function decodePortfolio(value: unknown): Portfolio;
export declare function decodePortfolioBinding(value: unknown): PortfolioBinding;
/** Validated under the floor: every ceiling names a compiled phase and stays
 * inside that phase's effective envelope and host-counted change size, which
 * WO-067 already keeps inside the compiled base envelope. */
export declare function admitPortfolio(portfolio: Portfolio, policy: CompiledPresencePolicy, floor: AuthorityEnvelope): Portfolio;
/** A derived order's envelope: the portfolio's ceiling intersected with the
 * compiled phase, and never able to carry an effect WO-052 refuses. */
export declare function portfolioEnvelope(portfolio: Portfolio, phase: CompiledPresencePhase): AuthorityEnvelope;
/** The portfolio's verification requirement as the derived contract states it;
 * WO-054 judges the order against exactly this criterion. */
export declare const portfolioVerificationCriterion: (tests: readonly string[]) => string;
/** Pure: one candidate becomes one bounded order, a suggestion, a human
 * question, or waits for a phase whose ceiling admits it. Order is stable. */
export declare function deriveWorkOrders(candidates: readonly WorkCandidate[], portfolio: Portfolio, phase: CompiledPresencePhase, target: {
    readonly baseCommit: string;
}): PortfolioDerivation[];
/** What the resident records when it activates a derived order, recomputed
 * by the fold from the persisted discovery, binding, phase and budget. */
export interface PortfolioActivation {
    readonly portfolioId: string;
    readonly version: number;
    readonly phaseId: string;
    readonly discoveryEpisodeId: string;
    readonly order: DerivedWorkOrder;
    readonly provenance: {
        readonly kind: "runtime";
        readonly sourceId: string;
    };
    readonly outcomes: {
        readonly orders: readonly string[];
        readonly suggestions: readonly ProductSuggestion[];
        readonly needsHuman: readonly {
            readonly candidateId: string;
            readonly offending: string;
            readonly reason: string;
        }[];
        readonly deferred: readonly {
            readonly candidateId: string;
            readonly reason: string;
        }[];
    };
}
export declare function summarizeDerivations(derivations: readonly PortfolioDerivation[]): PortfolioActivation["outcomes"];
/** Host-recorded result of one activated order: the WO-120 identity, the
 * WO-052 effect and the WO-054 verdict. The worker's own claim is absent. */
export interface PortfolioObservation {
    readonly workOrderId: string;
    readonly workOrderPath: string;
    readonly change: {
        readonly status: "observed";
        readonly commit: string;
        readonly branch: string;
        readonly diffHash: string;
    } | {
        readonly status: "refused";
        readonly reason: string;
    };
    readonly verification: {
        readonly verdict: "pass" | "fail";
        readonly criteria: number;
        readonly passed: number;
        readonly findings: number;
    } | {
        readonly verdict: "not-run";
        readonly reason: string;
    };
    /** Present only where a transport reported tokens. */
    readonly tokens?: number;
}
export declare function assertPortfolioObservation(value: unknown): asserts value is PortfolioObservation;
/** Only an admitted independent pass over an observed change advances. */
export declare const portfolioObservationVerified: (o: PortfolioObservation) => boolean;
