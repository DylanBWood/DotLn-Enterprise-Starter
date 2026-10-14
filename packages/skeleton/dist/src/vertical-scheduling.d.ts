import { ResidentStore } from "./resident-store.js";
import { type ResidentState } from "./resident-state.js";
import type { IntentBinding } from "./vertical.js";
import type { VerticalHostOptions } from "./vertical-host.js";
/** Only a changed log or a deciding deadline requires replay under the append
 * lock. Polling still checks current capabilities and launch/finish semantics. */
export declare function verticalAuthorityObserver(store: ResidentStore, binding: IntentBinding, now: () => number, permitted: (state: ResidentState, launch: boolean) => boolean): (launch: boolean) => Promise<boolean>;
/** A vertical step occupies the existing policy interpreter's process slot.
 * The primitive host still owns its process, lease and result admission. */
export declare function residentVerticalScheduling(store: ResidentStore, binding: IntentBinding, now: () => number, capabilities: () => readonly string[]): Pick<VerticalHostOptions, "startStep" | "active" | "settled">;
