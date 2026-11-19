export type TimeLimitRow = {
    ms: number;
    bounds: string;
    miss: string;
    grace?: true;
};
/** @type {Readonly<Record<string, TimeLimitRow>>} */
export declare const TIME_LIMITS: Readonly<Record<string, TimeLimitRow>>;
/** The instance's file, in the control root. */
export declare const TIME_LIMITS_FILE = "time-limits.json";
/** The command that lists every key with the figure that applies. */
export declare const TIME_LIMITS_COMMAND = "npm run limits";
/** A figure as a reader meets it: hours and minutes from a minute up, and
 * always the milliseconds the file holds.
 * @param {number} ms */
export declare const describeTimeLimit: (ms: number) => string;
/** The root-relative path of the file that sets a root's time limits.
 * @param {string} root */
export declare const timeLimitsPath: (root: string) => string;
export type ResolvedTimeLimit = {
    ms: number | null;
    kitMs: number;
    set: unknown;
    source: "kit" | "set" | "off" | "enforce";
};
export type ResolvedTimeLimits = {
    file: string;
    present: boolean;
    enforce: boolean;
    scale: number;
    limits: Record<string, ResolvedTimeLimit>;
    unknown: string[];
    advisories: string[];
};
/** Every time limit as it applies in `root`: the kit's figures, changed by
 * the root's file where it is present and usable. Nothing here throws for
 * the file's content, and nothing is printed: a value that cannot be used is
 * an advisory of the reading.
 * @param {string} root
 * @param {{table?: Readonly<Record<string, TimeLimitRow>>}} [options]
 * @returns {ResolvedTimeLimits} */
export declare function timeLimits(root: string, { table }?: {
    table?: Readonly<Record<string, TimeLimitRow>>;
}): ResolvedTimeLimits;
/** Print a root's advisories, once for the command that calls this and the
 * processes it starts. Reading a limit prints nothing: the commands a person
 * or a session starts (the runner, the bounded wrapper, the sync) call this
 * where they begin, and the listing prints them in its own text.
 * @param {string} root
 * @param {{env?: NodeJS.ProcessEnv, print?: (line: string) => void, table?: Readonly<Record<string, TimeLimitRow>>}} [options] */
export declare function reportTimeLimitAdvisories(root: string, { env, print, table }?: {
    env?: NodeJS.ProcessEnv;
    print?: (line: string) => void;
    table?: Readonly<Record<string, TimeLimitRow>>;
}): void;
/** One digest of every figure in force in `root`, or undefined where each is
 * the kit's own. A gate row records it beside its code identity: a passing
 * result says what it says only under the limits it ran under, so a pass is
 * carried, and a complete row stands, only where this digest is the one the
 * row recorded. It is taken over the figures that apply and not over the
 * file's bytes: a note, a refreshed `kit` or a `set` equal to the kit's
 * figure changes nothing, while a raised or lowered key, a scale, a limit
 * turned off and `enforce: false` each change it. Undefined for the kit's
 * figures is what a row that names no limits records, since the runner
 * writes the field only where a root's file changed a figure.
 * @param {string} root
 * @param {{table?: Readonly<Record<string, TimeLimitRow>>}} [options]
 * @returns {string|undefined} */
export declare function timeLimitsDigest(root: string, options?: {
    table?: Readonly<Record<string, TimeLimitRow>>;
}): string | undefined;
/** The figure in milliseconds that applies to `key` in `root`, or null where
 * the root has turned that limit off. Callers pass it to a child's `timeout`
 * as it is (null sets none) and start no timer for null.
 * @param {string} root @param {string} key
 * @param {{table?: Readonly<Record<string, TimeLimitRow>>}} [options]
 * @returns {number|null} */
export declare function timeLimit(root: string, key: string, options?: {
    table?: Readonly<Record<string, TimeLimitRow>>;
}): number | null;
/** Whether a child's result, or the error its start threw, says the child
 * was ended at its `timeout`.
 * @param {unknown} outcome */
export declare const endedForTime: (outcome: unknown) => boolean;
/** The key of a suite row's limit: its own where the table has a row for its
 * suite, the default otherwise. A task of an expanded suite follows its
 * suite's name. A suite's name never reaches the default row's key or a
 * pause after a stop, whatever the suite is called.
 * @param {string} name */
export declare const suiteTimeLimitKey: (name: string) => string;
/** What a step that was ended for time says: its key, the figure that
 * applied, the file that changes it and the command that lists the keys.
 * @param {string} root @param {string} key @param {number|null} [ms] */
export declare function timeLimitMiss(root: string, key: string, ms?: number | null): string;
/** Whether a text holds what a step ended for time says (timeLimitMiss,
 * above). The gate reads a failed task's output with it: a task that ran a
 * check under a limit of its own, and says that limit ended the check,
 * judged nothing there.
 * @param {unknown} text */
export declare const namesTimeLimitMiss: (text: unknown) => boolean;
/** The text of a root's file with every key of the table. What its owner
 * wrote is written back as it stood, even where the resolver cannot use it:
 * `enforce`, `scale`, any field of the owner's own, and each entry, of which
 * an object keeps its `set` and its other fields and takes the table's
 * figure as `kit`, and anything else is left for the resolver to name.
 * Entries this kit has no limit for are kept after the table's.
 * @param {unknown} [previous]
 * @param {{table?: Readonly<Record<string, TimeLimitRow>>}} [options] */
export declare function renderTimeLimits(previous?: unknown, { table }?: {
    table?: Readonly<Record<string, TimeLimitRow>>;
}): string;
