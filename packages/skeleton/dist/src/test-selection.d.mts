/** The package manager Corepack runs for a word that follows it: Corepack
 * runs the manager it is given, at a version or not, with every later word
 * (`corepack npm@11 test` is `npm test`). Null for any other word, one of
 * Corepack's own commands among them.
 * @param {string | undefined} word @returns {string | null} */
export declare const corepackManager: (word: string | undefined) => string | null;
/** The argument lists npm may hand a script it runs: in each reading of the
 * line (`npmWordReadings`) whose verb is `run` or one of its aliases and
 * whose next word is the script's name, the words after that name. Null
 * where no reading runs that script.
 * @param {readonly string[]} words @param {string} script
 * @returns {string[][] | null} */
export declare function npmScriptArgReadings(words: readonly string[], script: string): string[][] | null;
/** The commands pnpm or yarn may run for a line as a program and not as a
 * script: `yarn node …`, `pnpm node …`, either running npm or the other,
 * and `exec`, `run` or `run-script` before any of them, since `run` runs a
 * program where no script has the name. Each is the words from the program
 * on, to be read as if it ran alone. Empty for any other line.
 * @param {readonly string[]} written
 * @returns {(readonly string[])[]} */
export declare function managerRuns(written: readonly string[]): (readonly string[])[];
/** The argument lists a package script may be handed by a package manager:
 * npm's readings of the line, or pnpm's and yarn's. Null where no reading
 * runs that script.
 * @param {readonly string[]} words @param {string} script
 * @returns {string[][] | null} */
export declare function packageScriptArgReadings(words: readonly string[], script: string): string[][] | null;
/** The arguments Node's own script runner hands a package script: `node
 * --run <script>` or `--run=<script>` runs it with the words behind the
 * first separator and with none where there is no separator. Null where the
 * words run no such script.
 * @param {readonly string[]} words @param {string} script
 * @returns {string[] | null} */
export declare function nodeRunScriptArgs(words: readonly string[], script: string): string[] | null;
/** The arguments a run of the test runner is given, by any spelling that
 * starts it: npm's test command under any of its names, the `test` or
 * `test:full` script under npm's `run`, pnpm, yarn or Node's own script
 * runner, and the runner run by Node. npm's commands that install and then
 * test pass the runner nothing. Null where the words start no such run.
 * @param {readonly string[]} words
 * @returns {readonly string[] | null} */
export declare function testSelectionArgs(words: readonly string[]): readonly string[] | null;
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
/** What follows `bounded` in each reading of an invocation of the bounded
 * probe wrapper: the harness script run by Node, by npm's `run` under any
 * of its spellings, by pnpm or yarn, or by Node's own script runner. Empty
 * where the words are no such invocation.
 * @param {readonly string[]} words
 * @returns {(readonly string[])[]} */
export declare function boundedArgReadings(words: readonly string[]): (readonly string[])[];
/** The command the bounded probe wrapper runs, when this invocation is the
 * wrapper (`node scripts/harness.mjs bounded -- …`, `npm run harness --
 * bounded -- …` or `node --run harness -- bounded -- …`), so the wrapped
 * command is judged as if it ran alone.
 * @param {readonly string[]} words
 * @returns {readonly string[] | null} */
export declare function boundedCommand(words: readonly string[]): readonly string[] | null;
/** Whether one invocation starts a test-runner gate in any form: npm's
 * test command under any of its names or arguments, npm's commands that
 * install and then test, a package script that runs the runner under npm's
 * `run`, pnpm, yarn or Node's own script runner, the runner or the target
 * gate run by Node with any options, or any of these inside the bounded
 * probe wrapper. Where a line reads two ways, a gate under either is a
 * gate. A single test under the wrapper is not a gate.
 * @param {readonly string[]} words
 * @returns {boolean} */
export declare function gateInvocation(words: readonly string[]): boolean;
/** @param {readonly string[]} words */
export declare function diagnosticTestSelection(words: readonly string[]): boolean;
