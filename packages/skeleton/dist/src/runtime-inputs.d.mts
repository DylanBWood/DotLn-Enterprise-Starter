/** Host metadata and compiler bookkeeping are not executable runtime inputs.
 * Do not consult Git ignores: the runtime's dist and snapshot roots are ignored
 * too, and an ignore rule must not conceal changed executable bytes.
 * @param {string} name */
export declare const runtimeEntryName: (name: string) => boolean;
/** Keep operating-system paths and parser excerpts out of diagnostics.
 * @template T
 * @param {string} path
 * @param {() => T} read
 * @returns {T} */
export declare function runtimeRead<T>(path: string, read: () => T): T;
/** @param {string} root @param {string} path */
export declare const runtimeInfo: (root: string, path: string) => import("node:fs").Stats | undefined;
/** @param {string} root @param {string} path @param {boolean} [optional] */
export declare function runtimeDirectoryNames(root: string, path: string, optional?: boolean): string[];
/** Discovery never descends through an arbitrary file or a workspace alias.
 * @param {string} root */
export declare function packageDirectories(root: string): string[];
/** Core, kit gates, bootstrap and release use the same source declaration.
 * A malformed declaration refuses instead of silently selecting another mode.
 * @param {string} root */
export declare function hasPackageSources(root: string): boolean;
/** @param {string} root */
export declare function isKitRoot(root: string): boolean;
/** Declared workspaces own runtime inputs. A minimal snapshot without a
 * lockfile discovers only regular package directories holding a manifest.
 * @param {string} root */
export declare function runtimePackageNames(root: string): string[];
/** Built workspaces ship dist; build-free packages ship src. The metadata
 * remains a file even when a package has no executable module directory.
 * @param {string} root @param {string} path */
export declare function runtimeModuleDirectory(root: string, path: string): string | null;
