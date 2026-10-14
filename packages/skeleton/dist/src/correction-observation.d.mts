/** Pure journal projection, available to source-only lifecycle commands.
 * @param {Record<string, any>[]} observations
 */
export declare function correctionCounts(observations: Record<string, any>[]): {
    total: number;
    byPhase: Record<string, number>;
    byUnit: Record<string, number>;
    byPhaseAndUnit: Record<string, Record<string, number>>;
    source: string;
};
