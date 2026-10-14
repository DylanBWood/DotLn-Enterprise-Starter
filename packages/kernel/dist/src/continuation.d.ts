import type { DecodeResult, ExecutableProgramV1 } from "./types.js";
/** Decode serialized or parsed persisted data before it enters the stepper. */
export declare function decodeContinuation(value: unknown): DecodeResult<ExecutableProgramV1>;
