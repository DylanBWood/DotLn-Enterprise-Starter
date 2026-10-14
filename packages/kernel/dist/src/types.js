export var Program;
(function (Program) {
    Program.Done = () => ({ kind: "Done" });
    function Emit(event, next) {
        return {
            kind: "Emit",
            event,
            next,
        };
    }
    Program.Emit = Emit;
    function Invoke(commandId, command, continuationByResult) {
        return { kind: "Invoke", commandId, command, continuationByResult };
    }
    Program.Invoke = Invoke;
    function Await(pattern, timeout, next) {
        return { kind: "Await", pattern, timeout, next };
    }
    Program.Await = Await;
    function Sequence(programs) {
        return {
            kind: "Sequence",
            programs,
        };
    }
    Program.Sequence = Sequence;
    Program.Choose = (policyRef, alternatives) => ({ kind: "Choose", policyRef, alternatives });
    Program.All = (programs) => ({
        kind: "All",
        programs,
    });
    Program.Race = (programs) => ({
        kind: "Race",
        programs,
    });
    function Guard(conditionRef, whenTrue, whenFalse) {
        return { kind: "Guard", conditionRef, whenTrue, whenFalse };
    }
    Program.Guard = Guard;
    Program.Repeat = (program, stopConditionRef) => ({ kind: "Repeat", program, stopConditionRef });
    Program.Compensate = (program, compensation) => ({
        kind: "Compensate",
        program,
        compensation,
    });
})(Program || (Program = {}));
export var Cadence;
(function (Cadence) {
    Cadence.Once = (at) => ({ kind: "Once", at });
    Cadence.After = (delayMs) => ({ kind: "After", delayMs });
    Cadence.Every = (intervalMs, startAt) => startAt === undefined
        ? { kind: "Every", intervalMs }
        : { kind: "Every", intervalMs, startAt };
    Cadence.Burst = (count, intervalMs) => ({
        kind: "Burst",
        count,
        intervalMs,
    });
    Cadence.Calendar = (expression, timezone) => ({
        kind: "Calendar",
        expression,
        timezone,
    });
    Cadence.Window = (cadence, start, end) => ({
        kind: "Window",
        cadence,
        start,
        end,
    });
    Cadence.While = (cadence, conditionRef) => ({
        kind: "While",
        cadence,
        conditionRef,
    });
    Cadence.Until = (cadence, conditionRef) => ({
        kind: "Until",
        cadence,
        conditionRef,
    });
    Cadence.Gate = (cadence, conditionRef) => ({
        kind: "Gate",
        cadence,
        conditionRef,
    });
    Cadence.Sequence = (cadences) => ({
        kind: "Sequence",
        cadences,
    });
    Cadence.Merge = (cadences) => ({
        kind: "Merge",
        cadences,
    });
    Cadence.Race = (cadences) => ({
        kind: "Race",
        cadences,
    });
    Cadence.Repeat = (cadence, count) => ({
        kind: "Repeat",
        cadence,
        count,
    });
    Cadence.Backoff = (initialMs, factor, maxMs, attempt, jitter) => ({
        kind: "Backoff",
        initialMs,
        factor,
        maxMs,
        attempt,
        jitter,
    });
})(Cadence || (Cadence = {}));
