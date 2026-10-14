import { evaluateCadence, } from "@dotln/kernel";
const field = (state, key) => state[key];
export const presencePredicates = {
    "dotln.presence.phase-ready": {
        1: ({ state }, params) => field(state, "present") === false &&
            field(state, "phase") === params["phaseId"] &&
            field(state, "policyId") === params["policyId"] &&
            field(state, "inFlight") === false,
    },
    "dotln.presence.returned": {
        1: ({ state }) => field(state, "present") === true,
    },
    "dotln.presence.interrupt-phase": {
        1: ({ state }, params) => field(state, "present") === true &&
            params["discretionary"] === true &&
            params["inFlightOnReturn"] === "kill",
    },
};
/** The WO-067 table interpreter. All time and outcomes are explicit inputs. */
export class PresenceMachine {
    compiled;
    predicates;
    state;
    present = true;
    now = 0;
    armedAt = 0;
    lastActivity = 0;
    generation = 0;
    current = null;
    transcript = [];
    constructor(compiled, predicates = presencePredicates, snapshot) {
        this.compiled = compiled;
        this.predicates = predicates;
        this.state = compiled.statechart.initial;
        if (snapshot)
            Object.assign(this, structuredClone(snapshot));
    }
    snapshot() {
        const { state, present, now, armedAt, lastActivity, generation, current } = this;
        return { state, present, now, armedAt, lastActivity, generation, current };
    }
    phase() {
        return this.compiled.phases.find((phase) => phase.phaseId === this.state);
    }
    projected() {
        return {
            present: this.present,
            phase: this.state,
            policyId: this.compiled.policyId,
            inFlight: this.current !== null,
        };
    }
    transition(on, episode) {
        const transition = this.compiled.statechart.transitions.find((t) => t.from === this.state && t.on === on);
        if (!transition)
            return;
        if (transition.guard === "current-policy-episode-while-absent" &&
            (this.present ||
                !this.current ||
                episode !== this.current.id ||
                this.current.generation !== this.generation))
            return;
        if (transition.guard === "idle-deadline-while-absent") {
            const deadline = evaluateCadence(this.compiled.idleCadence, this.projected(), { now: this.lastActivity, rngState: 0, predicates: this.predicates });
            if (this.present ||
                this.current ||
                deadline.dueAt === null ||
                this.now < deadline.dueAt)
                return;
        }
        this.state = transition.to;
        for (const action of transition.actions) {
            switch (action) {
                case "arm-phase":
                    this.armedAt = this.now;
                    this.lastActivity = this.now;
                    break;
                case "cancel-pending":
                case "reset-progress":
                    this.generation += 1;
                    break;
                case "expire-phase":
                    this.transcript.push("expired:attention,work-scope,effect-authority");
                    break;
                case "finish-discretionary":
                    if (this.current?.discretionary) {
                        this.current.status = "finishing";
                        this.transcript.push("in-flight:finish");
                    }
                    break;
                case "kill-discretionary":
                    if (this.current?.discretionary) {
                        this.current = null;
                        this.transcript.push("in-flight:kill");
                    }
                    break;
                case "preserve-foreground":
                    break; // Foreground state is owned by its own slice.
            }
        }
        this.transcript.push(`${on}:${this.state}`);
    }
    absence(at = this.now) {
        this.now = at;
        if (!this.present)
            return;
        this.present = false;
        this.transition("absence");
    }
    returned(at = this.now) {
        this.now = at;
        this.present = true;
        this.transition("return");
    }
    outcome(kind, episode, at = this.now) {
        this.now = at;
        if (kind !== "unverified")
            this.transition(kind, episode);
        if (kind !== "unverified" && this.current?.id === episode) {
            this.current = null;
            this.lastActivity = at;
        }
    }
    /** A durable human question frees the process slot without failing/resetting
     * the policy. Its recorded generation binds the later answer continuation. */
    waitForInput(episode) {
        if (this.current?.id === episode)
            this.current = null;
    }
    /** Read-only cadence projection for hosts; all cadence evaluation remains
     * with the policy interpreter. This does not advance the machine. */
    nextCadenceAt() {
        const phase = this.phase();
        if (!phase)
            return null;
        return evaluateCadence(phase.cadence, this.projected(), {
            now: this.armedAt,
            rngState: 0,
            predicates: this.predicates,
        }).dueAt;
    }
    due(at) {
        this.now = at;
        this.transition("idle-expired");
        const phase = this.phase();
        if (!phase) {
            this.transcript.push(`NoOp:${this.state}`);
            return null;
        }
        const dueAt = this.nextCadenceAt();
        if (dueAt === null || at < dueAt) {
            this.transcript.push("NoOp:gate-or-cadence");
            return null;
        }
        if (phase.availability.kind === "NoOp") {
            this.transcript.push(`NoOp:${phase.availability.reason}`);
            return null;
        }
        return dueAt;
    }
    dispatch(id) {
        const phase = this.phase();
        if (!phase || this.present || this.current)
            throw new Error("presence dispatch is not ready");
        this.current = {
            id,
            generation: this.generation,
            discretionary: phase.discretionary,
            status: "running",
        };
        this.lastActivity = this.now;
        this.transcript.push(`dispatch:${phase.phaseId}`);
    }
}
