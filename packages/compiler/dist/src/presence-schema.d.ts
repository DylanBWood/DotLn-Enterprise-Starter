import { type PresencePolicy } from "./types.js";
/** Validates deserialized input before normalization could silently drop it. */
export declare const normalizePresencePolicies: (values: unknown) => readonly PresencePolicy[];
