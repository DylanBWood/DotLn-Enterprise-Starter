import childProcess from "node:child_process";
/** @param {NodeJS.ProcessEnv} [env] */
export declare function gateLoad(env?: NodeJS.ProcessEnv): {
    name: string;
    concurrency: number;
    factor: number;
};
/** Preserve the standalone bound; only measured work can derive a larger one.
 * @param {number} baselineMs @param {number} minimumMs
 * @param {NodeJS.ProcessEnv} [env] */
export declare function deadlineLimit(baselineMs: number, minimumMs: number, env?: NodeJS.ProcessEnv): number;
/** Numeric diagnostic only: no command, environment value, process identity,
 * arbitrary stack, source contents or private path is retained.
 * @param {string} site @param {number} timeoutMs
 * @param {{env?: NodeJS.ProcessEnv, now?: () => number}} [options] */
export declare function startDeadline(site: string, timeoutMs: number, options?: {
    env?: NodeJS.ProcessEnv;
    now?: () => number;
}): {
    timeoutMs: number;
    finish: (hit?: boolean) => {
        site: string;
        task: string;
        timeoutMs: number;
        durationMs: number;
        startedAt: string;
        finishedAt: string;
        hit: boolean;
        loadClass: string;
        concurrency: number;
        loadFactor: number;
        concurrentTasks: any;
        peerObservation: string;
        hostLoadPerCpu: number;
        classification: string;
    };
    check(): void;
};
export declare const observedSpawnSync: typeof childProcess.spawnSync;
export declare const observedExecFileSync: typeof childProcess.execFileSync;
export declare const observedSpawn: typeof childProcess.spawn;
