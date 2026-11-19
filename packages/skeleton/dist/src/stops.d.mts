export type StopClass = "work" | "record" | "host" | "bound";
export type StopLevel = "refuse" | "advise" | "off";
export type StopRow = {
    id: string;
    class: StopClass;
    protects: string;
    where: string;
    census: readonly string[];
    setBy?: string;
    file?: string;
    control?: string;
    forward?: string;
    effect?: string;
    unit?: string;
    election?: string;
};
/** What a stop protects: the owner's work, the kit's records, a property of
 * the host or a budget.
 * @typedef {"work" | "record" | "host" | "bound"} StopClass */
/** What a stop does when it is met: deny or fail, say what it found and go
 * on, or say nothing.
 * @typedef {"refuse" | "advise" | "off"} StopLevel */
/** One row of the table. `census` names the rows of the 2026-11-16 census
 * the stop covers. A row with `setBy` keeps a switch of its own, a row with
 * `file` is set in another file (at that path in the default layout;
 * `control` is the same file under a root's control root), and a row with
 * `forward` is a lifecycle command's refusal, listed with its way forward;
 * none of those three has a line in the `stops` section. `effect` is the
 * denied effect a row answers for, and `unit` the feedback unit whose
 * sentence goes with it. `election` names the feature that was a stop's
 * switch before the stop had a level: where a root makes that election and
 * writes no line for the stop, elected it advises and declined it refuses.
 * @typedef {object} StopRow
 * @property {string} id
 * @property {StopClass} class
 * @property {string} protects
 * @property {string} where
 * @property {readonly string[]} census
 * @property {string} [setBy]
 * @property {string} [file]
 * @property {string} [control]
 * @property {string} [forward]
 * @property {string} [effect]
 * @property {string} [unit]
 * @property {string} [election]
 */
export declare const STOP_CLASSES: readonly ["work", "record", "host", "bound"];
export declare const STOP_LEVELS: readonly ["refuse", "advise", "off"];
/** @type {readonly StopRow[]} */
export declare const STOPS: readonly StopRow[];
/** The stop each gate task is, for the tasks that hold one check: a task
 * that fails is that stop met. The document check and the host row hold
 * checks of more than one stop and say themselves which each failure is. A
 * task the table leaves out is the code under test and fails as it always
 * did.
 * @type {Readonly<Record<string, string>>} */
export declare const GATE_TASK_STOPS: Readonly<Record<string, string>>;
/** The line a gate task that holds several stops prints when it exits zero
 * with failures that advised: the prefix, then the stops as a JSON array.
 * The runner reads it to record the task as advised and not as passed. */
export declare const ADVISED_STOPS_LINE = "DOTLN_ADVISED_STOPS ";
/** Failures sorted by the level of the stop each is. `levelOf` gives a
 * stop's level in the root; a failure whose stop has no line in the `stops`
 * section (one with a switch or a file of its own) refuses.
 * @template {{stop: string}} T
 * @param {readonly T[]} failures @param {(id: string) => StopLevel} levelOf
 * @returns {{refused: T[], advised: T[], off: T[]}} */
export declare function failuresByLevel<T extends {
    stop: string;
}>(failures: readonly T[], levelOf: (id: string) => StopLevel): {
    refused: T[];
    advised: T[];
    off: T[];
};
/** The row of one stop, and none for an id the table does not hold.
 * @param {string} id @returns {StopRow | undefined} */
export declare const stopRow: (id: string) => StopRow | undefined;
/** Whether a row's level is a line of the `stops` section: one with no
 * switch or file of its own that is no lifecycle command's refusal.
 * @param {StopRow} entry */
export declare const stopSettable: (entry: StopRow) => boolean;
/** The stop that answers for a denied effect: the kit's own row for one of
 * its six, and the one row for any other effect an authority profile names.
 * @param {string} effect */
export declare const deniedEffectStop: (effect: string) => string;
/** The level a row has where nothing sets it: a work row refuses in every
 * root, and any other row refuses in core and advises in an instance.
 * @param {StopRow} entry @param {boolean} instance @returns {StopLevel} */
export declare const stopDefault: (entry: StopRow, instance: boolean) => StopLevel;
/** A declared `stops` section read against the table: the levels it sets,
 * and one advisory for each line that sets nothing. A line that names no
 * settable stop or no level is named and ignored, so that a mistyped line
 * stops no command.
 * @param {unknown} declared
 * @returns {{levels: Record<string, StopLevel>, advisories: string[]}} */
export declare function readStopsSection(declared: unknown): {
    levels: Record<string, StopLevel>;
    advisories: string[];
};
/** The level of one stop in a root and where it comes from: the root's own
 * line when it has one; else, for a stop that had a switch before it had a
 * level, the election the root makes of that feature (`elections` holds the
 * ones its configuration declares, true or false); otherwise the kit's
 * default for the row's class.
 * @param {string} id
 * @param {{instance: boolean, stops?: Readonly<Record<string, StopLevel>>, elections?: Readonly<Record<string, boolean>>}} root
 * @returns {{level: StopLevel, source: string}} */
export declare function resolveStop(id: string, { instance, stops, elections }: {
    instance: boolean;
    stops?: Readonly<Record<string, StopLevel>>;
    elections?: Readonly<Record<string, boolean>>;
}): {
    level: StopLevel;
    source: string;
};
/** Every settable stop's level in a root.
 * @param {{instance: boolean, stops?: Readonly<Record<string, StopLevel>>, elections?: Readonly<Record<string, boolean>>}} root
 * @returns {Record<string, StopLevel>} */
export declare const resolveStopLevels: (root: {
    instance: boolean;
    stops?: Readonly<Record<string, StopLevel>>;
    elections?: Readonly<Record<string, boolean>>;
}) => Record<string, StopLevel>;
/** The levels a hook's configuration carries: the stops that do not refuse.
 * A stop the map leaves out refuses, so a hook written before a level was
 * lowered, or one that carries no map, denies as it always did.
 * @param {Readonly<Record<string, StopLevel>>} levels
 * @returns {Record<string, "advise" | "off">} */
export declare const loweredStops: (levels: Readonly<Record<string, StopLevel>>) => Record<string, "advise" | "off">;
/** The level a hook or a command answers at, from the lowered map alone.
 * @param {Readonly<Record<string, string>> | undefined} lowered
 * @param {string} id @returns {StopLevel} */
export declare const stopLevelIn: (lowered: Readonly<Record<string, string>> | undefined, id: string) => StopLevel;
/** The line of dotln.config.json that gives a stop a level.
 * @param {string} id @param {StopLevel} level */
export declare const stopLine: (id: string, level: StopLevel) => string;
/** What a refusal that remains says after its reason: the stop's id, what
 * it protects and the line that lowers it. A level is its owner's to
 * change, so the text names the owner and never a recovery control. `hook`
 * adds the emit that carries a new level into the hooks, and `covered` says
 * where the line is written when the refusal covers the configuration file
 * itself.
 * @param {string} id @param {string} reason
 * @param {{hook?: boolean, covered?: string}} [options] */
export declare function stopRefusal(id: string, reason: string, { hook, covered }?: {
    hook?: boolean;
    covered?: string;
}): string;
/** What a stop says when it advises and the work goes on: what it found,
 * its id, what it protects and the line that makes it refuse or be quiet.
 * @param {string} id @param {string} reason */
export declare function stopAdvisory(id: string, reason: string): string;
