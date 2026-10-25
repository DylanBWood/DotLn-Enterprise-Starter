import { type FocusedTestResult, type SourceChangeRequested, type SharedRepositoryState } from "./source-change-state.js";
export declare const sourceDigest: (value: string | Buffer) => string;
export declare const HOST_GIT: readonly ["-c", "core.hooksPath=/dev/null", "-c", "core.fsmonitor=false", "-c", "core.useReplaceRefs=false", "-c", "core.commitGraph=false"];
export declare const sourceGit: (cwd: string, ...args: string[]) => string;
/** Git writes new objects only to the private store; the common store is an
 * alternate. Quote the alternate as Git's documented C-style path entry. */
export declare function sourceObjectEnvironment(cwd: string): {
    GIT_OBJECT_DIRECTORY: string;
    GIT_ALTERNATE_OBJECT_DIRECTORIES: string;
};
export declare function sourceWriterState(cwd: string): {
    version: 1;
    branch: string;
    baseCommit: string;
    objectDirectory: string;
};
/** Host preparation only. The writer receives the resulting environment. */
export declare function prepareSourceObjectStore(cwd: string, branch: string, baseCommit: string): void;
export declare class SourceWorktreeRefusal extends Error {
    readonly reason: string;
    constructor(reason: string, path: string);
}
export declare class SourceImportRefusal extends Error {
    readonly reason: string;
    constructor(commit: string, cause: unknown);
}
export declare class SourceObjectIntegrityRefusal extends Error {
    readonly reason = "private-object-integrity";
    constructor(cause: unknown);
}
export declare class SourceObjectLayoutRefusal extends Error {
    readonly reason = "private-object-layout";
    constructor();
}
export declare const sourceAdmissionReason: (check: string, error: unknown) => string;
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
export interface ImportedCandidate {
    readonly commit: string;
    readonly tree: string;
    readonly objects: string[];
    readonly pack: string;
}
/** Branch-specific lifecycle; inspection's detached worktree contract is unchanged. */
export declare class SourceChangeWorktree {
    readonly options: SourceWorktreeOptions;
    readonly path: string;
    readonly messagePath: string;
    private objectEnv?;
    get objectEnvironment(): ReturnType<typeof sourceObjectEnvironment>;
    get objectDirectory(): string;
    private get environment();
    private git;
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
    cleanAgainstCommit(): void;
    /** Keep an unadmitted candidate out of shared reachability walks without
     * changing its HEAD, index, objects or working files. Git's lock protects
     * the retained administration from pruning while its backlink is saved. */
    retainUnimported(): string | undefined;
    private get retentionLock();
    private restoreRegistration;
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
    /** The reader sees the private objects, and index-pack writes only to the
     * common store. A keep file protects the pack until a shared ref exists. */
    importCandidate(commit: string): ImportedCandidate;
    private get keepMessage();
    verifyImported(candidate: ImportedCandidate): void;
    publishCandidate(candidate: ImportedCandidate): void;
    finish(commit: string, diffHash: string): void;
}
export declare function runFocusedTest(path: string, command: string): FocusedTestResult;
