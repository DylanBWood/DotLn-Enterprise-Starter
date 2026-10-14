export type Usage = {
    inputTokens: number | null;
    cachedInputTokens: number | null;
    cacheWriteInputTokens: number | null;
    outputTokens: number | null;
    reasoningOutputTokens: number | null;
    totalTokens: number | null;
    costUsd: number | null;
};
/** Positive projection: no transcript text, identifiers, URLs, or paths leave
 * this reader. Cumulative counters are never mistaken for window occupancy.
 * @param {unknown[]} input @param {{since?: string, until?: string}} options
 */
export declare function usageObservation(input: unknown[], options?: {
    since?: string;
    until?: string;
}): {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
};
/** @param {string} source */
export declare function decodeUsageSource(source: string): any[];
/** @param {string} path @param {{since?: string, until?: string}} options */
export declare function transcriptUsage(path: string, options?: {
    since?: string;
    until?: string;
}): {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
};
/** Only a one-way identity stays in local observations; never publish a
 * transcript path, session identifier, message, or environment value.
 * @param {string} value
 */
export declare const usageSessionKey: (value: string) => string;
/** Local record reference; not a transcript/session identifier. @param {unknown} row */
export declare const usageRecordIdentity: (row: unknown) => string;
/** @param {ReturnType<typeof usageObservation>} observation @param {string} [since] */
export declare function requireMeasuredUsage(observation: ReturnType<typeof usageObservation>, since?: string): {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
};
/** Select the actual session, never every transcript sharing a worktree.
 * Hook inputs supply Claude identity; the explicit Codex adapter uses the
 * running thread's environment. Directory overrides support isolated fixtures.
 * @param {string} root
 * @param {{sessionKey?: string, sessionId?: string, transcriptPath?: string, since?: string, until?: string, codexDirectory?: string, claudeDirectory?: string, copilotDirectory?: string, env?: NodeJS.ProcessEnv}} [options]
 */
export declare function sessionTranscript(root: string, options?: {
    sessionKey?: string;
    sessionId?: string;
    transcriptPath?: string;
    since?: string;
    until?: string;
    codexDirectory?: string;
    claudeDirectory?: string;
    copilotDirectory?: string;
    env?: NodeJS.ProcessEnv;
}): string;
/** Usage freshness is independent of the session's model/effort metadata.
 * @param {string} root
 * @param {Parameters<typeof sessionTranscript>[1]} [options]
 */
export declare function collectSessionUsage(root: string, options?: Parameters<typeof sessionTranscript>[1]): {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: null;
    coverage?: never;
} | {
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    coverage: string;
    observedAt: any;
    usage: Usage;
    context: null;
} | {
    coverage?: never;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    source: string;
    scope: string;
    observedAt: any;
    usage: Usage;
    context: {
        capacityTokens: number | null;
        lastRequestTokens: number | null;
        classification: string;
    };
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    coverage?: never;
    source: string;
    scope: string;
    observedAt: null;
    usage: Usage;
    context: null;
    cause: string;
} | {
    aiCredits: number | null;
    creditSource: string;
    creditObservedAt: any;
    creditScope: string;
    activity: {
        stepCount: number | null;
        commandsRun: number | null;
        source: string;
    };
    coverage: string;
    source: string;
    scope: string;
    observedAt: null;
    usage: Usage;
    context: null;
    cause: string;
};
/** Current Codex harness metadata only: never transcript text, IDs or paths.
 * Missing readback is informational and cannot refuse a workflow action.
 * @param {string} root
 * @param {Parameters<typeof sessionTranscript>[1]} [options]
 */
export declare function currentCodexSession(root: string, options?: Parameters<typeof sessionTranscript>[1]): {
    available: boolean;
    source: string;
    reason: string;
    harness?: never;
    harnessVersion?: never;
    model?: never;
    effort?: never;
    observedAt?: never;
} | {
    reason?: never;
    available: boolean;
    harness: string;
    harnessVersion: any;
    model: any;
    effort: any;
    source: string;
    observedAt: any;
};
/** CLI-selected Copilot metadata, not an effective-effort claim.
 * Select one verified session; never scan siblings or infer harness from model.
 * @param {string} root
 * @param {Parameters<typeof sessionTranscript>[1]} [options]
 */
export declare function currentCopilotSession(root: string, options?: Parameters<typeof sessionTranscript>[1]): {
    available: boolean;
    harness: string;
    harnessVersion: any;
    model: string | null;
    effort: any;
    source: string;
    observedAt: string | null;
    causes: string[];
};
/** @param {ReturnType<typeof currentCopilotSession>} session */
export declare function renderCopilotSession(session: ReturnType<typeof currentCopilotSession>): string;
/** The exact command a session runs to read back its own counters (WO-140).
 * @param {string} sessionId
 */
export declare const usageReadbackCommand: (sessionId: string) => string;
/** @param {string} sessionId */
export declare const usageReadbackLine: (sessionId: string) => string;
/** @param {ReturnType<typeof currentCodexSession>} session */
export declare function renderCodexSession(session: ReturnType<typeof currentCodexSession>): string;
/** @param {string} root @param {{workOrder: string|null, role: string, dispatch?: string, observation: ReturnType<typeof usageObservation>, startedAt?: string, durationMs?: number, ordinal?: number, sessionKey?: string, supersedes?: string[]}} row */
export declare function recordUsageObservation(root: string, row: {
    workOrder: string | null;
    role: string;
    dispatch?: string;
    observation: ReturnType<typeof usageObservation>;
    startedAt?: string;
    durationMs?: number;
    ordinal?: number;
    sessionKey?: string;
    supersedes?: string[];
}): void;
