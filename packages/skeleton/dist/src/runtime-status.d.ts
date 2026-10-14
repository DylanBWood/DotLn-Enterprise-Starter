import { type Event, type PredicateRegistry } from "@dotln/kernel";
import { type RuntimeStatusV1 } from "./runtime-status-contract.js";
import { type ResidentState } from "./resident-state.js";
/** A pure, allowlisted projection. The event log supplies timestamps and
 * observed signal; the fold supplies current state. Neither raw payloads nor
 * paths, endpoints, session identifiers or host details are copied. */
export declare function projectRuntimeStatus(state: ResidentState | undefined, events: readonly Event[], indexText: string | null, predicates?: PredicateRegistry): RuntimeStatusV1;
