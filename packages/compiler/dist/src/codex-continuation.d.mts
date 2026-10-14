/**
 * Source-only Codex adapter, embedded in its generated project hook. No model
 * transcript is read, no lifecycle command is dispatched, and no writer is
 * acquired or released. Missing observations leave native stopping available.
 * @param {Record<string, any>} input
 * @param {typeof import('./operator-control.mjs').operatorControl} operatorControl
 * @returns {Promise<Record<string, any>>}
 */
export declare function codexContinuation(input: Record<string, any>, operatorControl: typeof import('./operator-control.mjs').operatorControl): Promise<Record<string, any>>;
