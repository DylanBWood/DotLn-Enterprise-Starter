import type { AuthorityGrant, WorkOrder, CompiledPresencePhase } from "@dotln/compiler";
import { ResidentStore } from "./resident-store.js";
import { type IntentBinding, type PreparedIntent } from "./vertical.js";
import { VerticalHost, type VerticalPorts } from "./vertical-host.js";
export interface VerticalEntryPorts {
    /** Canonical WO-120 allocations still in draft phase. */
    drafts(): Promise<readonly WorkOrder[]>;
    /** Read-only source preparation under the current phase's repo.read authority. */
    prepare(draft: WorkOrder, phase: CompiledPresencePhase, spent: PreparedIntent["spent"]): Promise<PreparedIntent>;
    grants(): readonly AuthorityGrant[];
    /** Current host-owned entry; an unreadable entry is still a held intent. */
    portfolio?(): unknown;
    execution(binding: IntentBinding): VerticalPorts;
}
export declare function verticalResident(ports: VerticalEntryPorts, directory: string, options?: {
    steps?: number;
    afterStep?: ConstructorParameters<typeof VerticalHost>[0]["afterStep"];
    /** Backoff for preparation or a triage episode that made no decision. */
    retry?: {
        baseMs: number;
        capMs: number;
        unnamedAttempts: number;
    };
}): {
    tick(store: ResidentStore, now: () => number, capabilities?: () => readonly string[]): Promise<boolean>;
};
