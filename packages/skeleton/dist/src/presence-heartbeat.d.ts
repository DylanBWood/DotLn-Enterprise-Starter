import { type PresenceHookEvent } from "./presence-signals.js";
/** Installed profiles have no observed typed/scripted prompt discriminator
 * (WO-044 C-W10 / X-W10). A binding is explicit local host configuration. */
export declare function recordHarnessHeartbeat(event: PresenceHookEvent, input: unknown, environment?: Readonly<Record<string, string | undefined>>, now?: () => number): Promise<void>;
