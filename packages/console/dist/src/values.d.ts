import type { Cell, Scalar, Source } from "./types.js";
export declare const object: (value: unknown) => Record<string, unknown>;
export declare const array: (value: unknown) => readonly unknown[];
export declare const string: (value: unknown) => string;
export declare const strings: (value: unknown) => readonly string[];
export declare const number: (value: unknown) => number;
export declare const optionalObject: (value: unknown) => Record<string, unknown>;
export declare const optionalString: (value: unknown) => string | undefined;
export declare const at: (value: unknown, ...keys: readonly string[]) => unknown;
export declare const available: <T>(ref: string, value: T) => Source<T>;
export declare const unavailable: (ref: string, reason?: string) => Source<never>;
/** Host failures carry codes only: messages and child stderr can name private
 * paths even when the source reference itself is relative. */
export declare function readFailureReason(error: unknown): string;
export declare const known: (key: string, label: string, value: Scalar | readonly Scalar[], evidence: readonly string[], explanation?: string | null) => Cell;
export declare const unknown: (key: string, label: string, evidence: readonly string[], explanation?: string) => Cell;
export declare const fact: (key: string, label: string, value: unknown, evidence: readonly string[], explanation?: string | null) => Cell;
/** Compact navigation keys only; projectBoard refuses duplicate targets. */
export declare const id: (family: string, key: string) => string;
