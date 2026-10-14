import { type FocusedTestResult, type SourceChangeRequested, type SharedRepositoryState } from "./source-change-state.js";
export declare const sourceDigest: (value: string | Buffer) => string;
export declare const HOST_GIT: readonly ["-c", "core.hooksPath=/dev/null", "-c", "core.fsmonitor=false", "-c", "core.useReplaceRefs=false", "-c", "core.commitGraph=false"];
export declare const sourceGit: (cwd: string, ...args: string[]) => string;
export interface SourceWorktreeOptions {
    readonly requested: SourceChangeRequested;
    readonly commandId: string;
    readonly parent: string;
    readonly launchpad: string;
    readonly bundleProfile: "target-worker-claude" | "target-worker-codex";
    readonly commitMessage: string;
    /** What the envelope admits of the committed change (WO-100 D016). */
    readonly change?: SourceChangeLimits;
}
export interface SourceChangeLimits {
    /** The envelope's `resourceLimits.files`; absent means uncounted. */
    readonly files?: number;
    /** True when the envelope allows `repo.delete`. */
    readonly deletion: boolean;
    /** A Sort move's declared relocation: its source may be removed. */
    readonly relocation?: {
        readonly from: string;
        readonly to: string;
    };
}
/** Branch-specific lifecycle; inspection's detached worktree contract is unchanged. */
export declare class SourceChangeWorktree {
    readonly options: SourceWorktreeOptions;
    readonly path: string;
    readonly messagePath: string;
    constructor(options: SourceWorktreeOptions);
    assertUnused(): void;
    create(): void;
    verify(): string;
    /** Observe shared state without following a substituted alternates entry.
     * Differences are not attributable to this writer: independent Git clients
     * may legitimately change any shared ref. Never restore them here. */
    sharedState(): SharedRepositoryState;
    bundle(action: "emit" | "check" | "remove"): void;
    prepare(): void;
    checkMessage(): void;
    clean(): void;
    /** The committed change, re-verified; `admit` also applies the envelope's
     * change limits, which judge a change once, when it is first observed, so a
     * receipt saved before WO-157 still finishes and recovers. */
    effect(admit?: boolean): {
        commit: string;
        diffHash: string;
    } | undefined;
    /** Counts committed paths against the envelope's files ceiling and refuses
     * a removal or type change the envelope does not allow. With renames off, a
     * file replaced by a directory shows as the file's deletion. */
    private checkChangeLimits;
    finish(commit: string, diffHash: string): void;
}
export declare function runFocusedTest(path: string, command: string): FocusedTestResult;
