import { type CompilationEnvironment } from "@dotln/compiler";
import { type Decision, type Event, type EventDraft, type JsonValue } from "@dotln/kernel";
import { type Loadout, type RuntimeState } from "./reactor.js";
export interface ReactorStep {
    readonly event: Event;
    readonly decision: Decision<RuntimeState>;
}
export declare class LiveReactorDriver {
    #private;
    private readonly onEvents?;
    private readonly persistEvent?;
    constructor(onEvents?: ((events: readonly Event[]) => void) | undefined, persistEvent?: ((event: Event) => void) | undefined);
    feed(draft: EventDraft): ReactorStep;
    /** Exactly once per canonical log, before accepting any new external input. */
    ensureIdentityEnforcement(at: number): void;
    equip(graph: Loadout, environment?: CompilationEnvironment, at?: number): ReactorStep;
    private append;
    restore(log: string): void;
    get log(): string;
    get state(): RuntimeState;
    get decisions(): readonly Decision<RuntimeState>[];
}
export declare const scenarioDraft: (type: string, occurredAt: number, payload: JsonValue, correlationId?: string, causationId?: string) => EventDraft;
