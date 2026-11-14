/** The instance's own list of models and prices, beside its configuration. */
export declare const WORKER_MODELS_FILE = "dotln.models.json";
/** A model's or a worker's name: a word a person says and an agent passes. */
export declare const WORKER_NAME: RegExp;
/** The four classes of tokens a price is declared for, which do not
 * overlap: input no cache served, input read from a cache, input written to
 * one, and output. A price is in US dollars for a million tokens. */
export declare const WORKER_PRICE_CLASSES: readonly string[];
export type ModelRow = {
    provider: string;
    id: string;
    effort: string;
    family?: string;
    description?: string;
};
export type WorkerBinding = {
    model: string;
    effort: string | null;
};
export type NamedWorker = {
    description: string | null;
    bindings: Record<string, WorkerBinding>;
};
export type TableModel = ModelRow & {
    source: string;
};
export type TableWorker = {
    description: string | null;
    bindings: Record<string, WorkerBinding & {
        source: string;
    }>;
};
export type WorkerTable = {
    models: Record<string, TableModel>;
    workers: Record<string, TableWorker>;
    prices: Record<string, Record<string, number>>;
};
export type ResolvedWorker = {
    name: string;
    entry: "model" | "worker";
    provider: string;
    model: {
        name: string;
        id: string;
        family: string | null;
    };
    effort: string;
    description: string | null;
    launchable: boolean;
    workerType: string | null;
    source: {
        model: string;
        id: string;
        effort: string;
    };
};
export type SessionLaunch = {
    tool: string;
    arguments: Record<string, string>;
    exact: boolean;
    note?: string;
    preamble?: string;
};
export type WorkerProvider = {
    id: string;
    label: string;
    efforts: readonly string[];
    rowKeys: readonly string[];
    transport: string;
    harness: string;
    workerType: string;
    idProblem: (id: string) => string | null;
    sessionLaunch: (resolved: ResolvedWorker, context: {
        pin?: {
            id: string;
            effort: string;
        } | null;
        preamble?: string;
    }) => SessionLaunch | null;
};
export type Fail = (detail: string, place?: string) => never;
/** The launchers the kit has, each with what is particular to it: the
 * efforts its launches take, the keys of a model row that are its own, the
 * command-line transport that runs it and the harness its attestation
 * records, the worker type a record names, and
 * how a session of that provider launches a resolved worker itself. A new
 * provider is one entry here and one transport; no caller changes.
 * @type {Readonly<Record<string, WorkerProvider>>} */
export declare const PROVIDERS: Readonly<Record<string, WorkerProvider>>;
/** The worker types a record may name: one for each provider, and the two
 * a record written before there was one worker for each provider may hold.
 * A fixed set, so that an old record reads whatever the table now holds. */
export declare const WORKER_RECORD_TYPES: readonly string[];
/** An instance's model rows as written in its models file, each whole.
 * @param {unknown} declared @param {Fail} [fail]
 * @returns {Record<string, ModelRow>} */
export declare function validateModels(declared: unknown, fail?: Fail): Record<string, ModelRow>;
/** Named workers as a configuration's `workers` section writes them: each a
 * name, an optional description and, for each provider, a model's name or a
 * model with an effort of its own.
 * @param {unknown} declared @param {Fail} [fail] @param {string} [at]
 * @returns {Record<string, NamedWorker>} */
export declare function validateNamedWorkers(declared: unknown, fail?: Fail, at?: string): Record<string, NamedWorker>;
/** An instance's prices by exact model id.
 * @param {unknown} declared @param {Fail} [fail]
 * @returns {Record<string, Record<string, number>>} */
export declare function validatePrices(declared: unknown, fail?: Fail): Record<string, Record<string, number>>;
/** The table a launch is resolved in: the kit's models with the instance's
 * over them, an instance's row of a kit model's name replacing that row
 * whole; the kit's workers with the instance's over them, an instance's
 * entry of a kit worker's name replacing the bindings it states and keeping
 * the others; and the instance's prices. Each value carries where it came
 * from. What only the whole table can show is judged here: a name that
 * would mean two things, a binding to a model that is not there or is
 * another provider's, an effort its provider does not take.
 * @param {{named?: Record<string, NamedWorker>, models?: Record<string, ModelRow>, prices?: Record<string, Record<string, number>>}} [instance]
 * @param {Fail} [fail]
 * @returns {WorkerTable} */
export declare function workerTable(instance?: {
    named?: Record<string, NamedWorker>;
    models?: Record<string, ModelRow>;
    prices?: Record<string, Record<string, number>>;
}, fail?: Fail): WorkerTable;
/** What one name runs: a worker's binding for a provider, or a model at its
 * own effort. A name that is neither is read as a model's exact id. The
 * provider is the one given, else the model's own, else the only one the
 * worker binds; a worker that binds several needs one named. An effort
 * given for this launch stands over the binding's and the model's.
 * @param {WorkerTable} table @param {string} [name]
 * @param {{provider?: string | null, effort?: string | null}} [choice]
 * @returns {ResolvedWorker} */
export declare function resolveWorker(table: WorkerTable, name?: string, choice?: {
    provider?: string | null;
    effort?: string | null;
}): ResolvedWorker;
/** The table as one listing, for a person and for an agent alike: every
 * worker and every model by name, with what each runs for each provider and
 * where each value came from.
 * @param {WorkerTable} table */
export declare function listWorkers(table: WorkerTable): ({
    name: string;
    entry: "worker";
    description: string | null;
    runs: {
        provider: string;
        model: string;
        id: string;
        effort: string;
        family: string | null;
        launchable: boolean;
        source: string;
    }[];
} | {
    name: string;
    entry: "model";
    description: string | null;
    runs: {
        provider: string;
        model: string;
        id: string;
        effort: string;
        family: string | null;
        launchable: boolean;
        source: string;
    }[];
})[];
/** What a provider's one worker definition holds: the default worker's
 * model and effort for that provider, or null where the default has no
 * binding for it.
 * @param {WorkerTable} table @param {string} provider @param {string} [worker] */
export declare function workerPin(table: WorkerTable, provider: string, worker?: string): {
    id: string;
    effort: string;
} | null;
/** How a session of the worker's provider launches it itself, or null where
 * it cannot and the kit's command-line launcher must.
 * The pin is what the provider's one worker definition holds: the table's
 * default, unless the caller read another from the definition as emitted.
 * @param {WorkerTable} table @param {ResolvedWorker} resolved
 * @param {{preamble?: string, pin?: {id: string, effort: string} | null}} [context] */
export declare function sessionLaunch(table: WorkerTable, resolved: ResolvedWorker, context?: {
    preamble?: string;
    pin?: {
        id: string;
        effort: string;
    } | null;
}): SessionLaunch | null;
