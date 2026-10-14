import type { SupportFacet } from "@dotln/compiler";
export declare const tinkererEconomy: SupportFacet;
export declare const adjacentRepair: SupportFacet;
export declare const decisionReceipts: SupportFacet;
export declare const followUpQueue: SupportFacet;
export declare const operatorCheckIn: SupportFacet;
export declare const observation: SupportFacet;
export declare const recommendation: SupportFacet;
export declare const intentToAct: SupportFacet;
export declare const executorSupports: readonly SupportFacet[];
export declare const executorSupportDefaults: {
    readonly "adjacent-repair": true;
    readonly "decision-receipts": true;
    readonly "follow-up-queue": true;
    readonly "operator-check-in": true;
    readonly "communication-observation": false;
    readonly "communication-recommendation": false;
    readonly "communication-intent": true;
    readonly "tinkerer-economy": true;
};
export declare const defaultExecutorSupportIds: readonly string[];
export type ExecutorSupportSwitches = Readonly<Partial<Record<keyof typeof executorSupportDefaults, boolean>>>;
/** Pre-run options select immutable equipment; neither switch changes authority. */
export declare function executorSupportIds(switches?: ExecutorSupportSwitches): readonly string[];
