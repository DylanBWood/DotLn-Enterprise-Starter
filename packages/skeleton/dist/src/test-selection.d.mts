/** @param {readonly string[]} words @param {string} script */
export declare function npmScriptArgs(words: readonly string[], script: string): string[] | null;
/** @param {readonly string[]} words */
export declare function testSelectionArgs(words: readonly string[]): string[] | null;
/** @param {readonly string[]} words */
export declare function completeTestSelection(words: readonly string[]): boolean;
/** @param {readonly string[]} words */
export declare function diagnosticTestSelection(words: readonly string[]): boolean;
