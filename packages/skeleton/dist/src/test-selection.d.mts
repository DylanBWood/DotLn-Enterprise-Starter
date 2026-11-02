/** @param {readonly string[]} words @param {string} script */
export declare function npmScriptArgs(words: readonly string[], script: string): string[] | null;
/** @param {readonly string[]} words */
export declare function testSelectionArgs(words: readonly string[]): string[] | null;
/** @param {readonly string[]} words */
export declare function completeTestSelection(words: readonly string[]): boolean;
/** The words after a named script in a Node invocation, or null when the
 * program is not Node or no word names that script. The script is found by
 * its own path wherever it stands, so no Node option spelling (a flag, a
 * flag with a separate value, `--`) can hide it, and a script Node loads
 * through an option such as `--require` is found too; a path that is the
 * value of an option Node does not run is passed over.
 * @param {readonly string[]} words
 * @param {RegExp} script
 * @returns {readonly string[] | null} */
export declare function nodeScriptArgs(words: readonly string[], script: RegExp): readonly string[] | null;
/** The command the bounded probe wrapper runs, when this invocation is the
 * wrapper (`node scripts/harness.mjs bounded -- …` or `npm run harness --
 * bounded -- …`), so the wrapped command is judged as if it ran alone.
 * @param {readonly string[]} words
 * @returns {readonly string[] | null} */
export declare function boundedCommand(words: readonly string[]): readonly string[] | null;
/** Whether one invocation starts a test-runner gate in any form: npm's test
 * command under any spelling or arguments, a package script that runs the
 * runner, the runner or the target gate run by Node with any options, or any
 * of these inside the bounded probe wrapper. A single test under the wrapper
 * is not a gate.
 * @param {readonly string[]} words
 * @returns {boolean} */
export declare function gateInvocation(words: readonly string[]): boolean;
/** @param {readonly string[]} words */
export declare function diagnosticTestSelection(words: readonly string[]): boolean;
