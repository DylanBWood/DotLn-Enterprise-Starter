const draft = {
    schemaVersion: 1,
    type: "Test",
    occurredAt: 0,
    actorId: "actor",
    workstreamId: "ws",
    payload: { value: 1 },
};
const continuation = {
    kind: "Emit",
    event: draft,
    next: { kind: "Done" },
};
const decision = {
    state: {},
    intents: [],
    continuation,
    schedules: [],
    trace: {
        reactorId: "typecheck",
        reactorVersion: "1",
        branchPath: [],
        envInputs: [],
        cadenceEvaluations: [],
    },
};
void decision;
export {};
