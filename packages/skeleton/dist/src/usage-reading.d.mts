/** The four classes of tokens, which do not overlap: input no cache served,
 * input read from a cache, input written to one, and output. */
export declare const USAGE_CLASSES: readonly string[];
export type UsageClasses = {
    uncachedInput: number | null;
    cacheRead: number | null;
    cacheWrite: number | null;
    output: number | null;
};
/** The host a usage source names, by what its counters mean.
 * @param {unknown} source @returns {"claude"|"codex"|null} */
export declare const usageHost: (source: unknown) => "claude" | "codex" | null;
/** The four classes of one usage observation, each `null` where the host
 * reported none. A Claude source counts its input apart from what a cache
 * served or took, so its counters are the classes. A Codex source counts
 * cached input inside its input and reports no cache writes, so its
 * uncached input is the input less the cached part, `null` where it
 * reported no cached part to take away, and its cache write is `null`,
 * never zero. Any other source (a Copilot session, an unavailable
 * reading) gives no class: its counters are not ones this reading can
 * place. Where a host reported every part, its classes sum to its total,
 * so no token is in two classes.
 * @param {{inputTokens?: unknown, cachedInputTokens?: unknown, cacheWriteInputTokens?: unknown, outputTokens?: unknown} | null | undefined} usage
 * @param {unknown} source
 * @returns {UsageClasses} */
export declare function usageClasses(usage: {
    inputTokens?: unknown;
    cachedInputTokens?: unknown;
    cacheWriteInputTokens?: unknown;
    outputTokens?: unknown;
} | null | undefined, source: unknown): UsageClasses;
/** The classes of several observations summed: for each class the sum of
 * what was reported, and `null` where no observation reported it.
 * @param {readonly UsageClasses[]} parts @returns {UsageClasses} */
export declare function sumUsageClasses(parts: readonly UsageClasses[]): UsageClasses;
/** The local calendar day of an instant, as YYYY-MM-DD: the host's own time
 * zone unless one is named. Null for a value that is no instant.
 * @param {unknown} instant @param {string} [timeZone] @returns {string|null} */
export declare function localDay(instant: unknown, timeZone?: string): string | null;
/** An estimate in US dollars of what the classes cost at a model's declared
 * prices, each class multiplied once by its own price for a million tokens;
 * `null` where no price is declared or no class was reported. A class the
 * host reports none of adds nothing.
 * @param {UsageClasses} classes
 * @param {Record<string, number> | null | undefined} price
 * @returns {number|null} */
export declare function estimateUsd(classes: UsageClasses, price: Record<string, number> | null | undefined): number | null;
export type UsageFigures = {
    classes: UsageClasses;
    totalTokens: number | null;
    reportedUsd: number | null;
};
/**
 * What each observation of one dispatch adds to the one before it, in the
 * order the observations were made (the instant each counts up to, and the
 * instant it was recorded where it names none or two share one): two
 * recorders of one session may write out of turn. The first is taken whole.
 * A figure a later observation does not report adds nothing known, and the
 * last value reported stands as the one before. An observation of another
 * scope than the dispatch counts something else and gives no figure. An
 * observation that adds nothing known is left out where the dispatch has
 * another; where none of them holds a figure at all, each stands on its
 * day, so that every day the session was seen says it was not measured.
 * Where a later observation counts less than an earlier one, which no
 * producer does, the later is taken whole and those after it add to it,
 * every observation of the session is marked `fell`, and the earlier ones
 * stay in their days adding nothing: the sum is the last observation's
 * count, no day is given a negative one, and each day the session touched
 * says its figure is not known.
 * @template {{observation?: {source?: string, scope?: string, observedAt?: string|null, usage?: Record<string, unknown>}, recordedAt?: string}} Row
 * @param {readonly Row[]} observations
 * @returns {{row: Row, added: UsageFigures, fell: boolean}[]} */
export declare function usageIncrements<Row extends {
    observation?: {
        source?: string;
        scope?: string;
        observedAt?: string | null;
        usage?: Record<string, unknown>;
    };
    recordedAt?: string;
}>(observations: readonly Row[]): {
    row: Row;
    added: UsageFigures;
    fell: boolean;
}[];
/**
 * The reading: the given usage rows by order and by local calendar day,
 * each observation counted once, on the day it was observed, for what it
 * adds to the one before it of the same dispatch (rows that share a
 * `series`; a row that names none stands alone). A row names its order
 * (or, for a planning pass, its dispatch), its role, its observation and,
 * where a record attests one, the model that ran. The estimate of a group is
 * the sum of its rows' estimates and `null` where any of them has none, so a
 * figure never stands for less than it names. Beside each whole figure a
 * group carries what it is known to have used at the least: `knownTokens`,
 * the sum of each observation's total where it reported one and of the
 * classes it reported where it did not, and `knownUsd`, the sum of the
 * estimates its observations have. An observation with no count or no
 * estimate adds nothing to either and takes nothing from what the others
 * measured, whichever group it falls in.
 * @param {readonly {workOrder?: string|null, dispatch?: string, role: string, model?: string|null, series?: string, recordedAt?: string, observation: {source?: string, scope?: string, observedAt?: string|null, usage?: Record<string, unknown>}}[]} rows
 * @param {{since?: string, timeZone?: string, prices?: Record<string, Record<string, number>>}} [options]
 */
export declare function usageReading(rows: readonly {
    workOrder?: string | null;
    dispatch?: string;
    role: string;
    model?: string | null;
    series?: string;
    recordedAt?: string;
    observation: {
        source?: string;
        scope?: string;
        observedAt?: string | null;
        usage?: Record<string, unknown>;
    };
}[], options?: {
    since?: string;
    timeZone?: string;
    prices?: Record<string, Record<string, number>>;
}): {
    schemaVersion: number;
    timeZone: string;
    since: string | null;
    classes: string[];
    prices: {
        [k: string]: Record<string, number> | null | undefined;
    };
    byOrder: {
        tokens: UsageClasses;
        totalTokens: number | null;
        reportedUsd: number | null;
        estimateUsd: number | null;
        knownTokens: number;
        knownUsd: number;
        observations: number;
        fell: number;
        unmeasured: number;
        subject: string;
        roles: {
            tokens: UsageClasses;
            totalTokens: number | null;
            reportedUsd: number | null;
            estimateUsd: number | null;
            knownTokens: number;
            knownUsd: number;
            observations: number;
            fell: number;
            unmeasured: number;
            subject: string;
            role: string;
            model: string | null;
        }[];
    }[];
    byDay: {
        tokens: UsageClasses;
        totalTokens: number | null;
        reportedUsd: number | null;
        estimateUsd: number | null;
        knownTokens: number;
        knownUsd: number;
        observations: number;
        fell: number;
        unmeasured: number;
        day: string;
        roles: {
            tokens: UsageClasses;
            totalTokens: number | null;
            reportedUsd: number | null;
            estimateUsd: number | null;
            knownTokens: number;
            knownUsd: number;
            observations: number;
            fell: number;
            unmeasured: number;
            subject: string;
            role: string;
            model: string | null;
        }[];
    }[];
};
/** The reading as lines an operator reads: tokens by class for each order
 * and each day, the host's own reported cost where it gave one, and the
 * estimate, marked as an estimate, or `unknown` where no price is declared
 * for the model that ran.
 * @param {ReturnType<typeof usageReading>} reading */
export declare function renderUsageReading(reading: ReturnType<typeof usageReading>): string;
