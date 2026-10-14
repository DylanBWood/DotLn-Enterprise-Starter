import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evidenceResultSchema, parseEvidenceResult, } from "../src/verification-protocol.js";
import { resultId, WorkerFailure } from "../src/worker-protocol.js";
import { replayVerification, } from "../src/verification.js";
import { initialVerificationRuntime, seiriReactor, verificationStateFromRuntime, } from "../src/reactor.js";
const fixture = JSON.parse(readFileSync(new URL("../../../compiler/fixtures/wo058-verification.json", import.meta.url), "utf8"));
const json = (value) => value;
const fold = (state, event) => verificationStateFromRuntime(seiriReactor({
    ...initialVerificationRuntime(state.workstreamId),
    verification: json(state),
}, event, { now: event.occurredAt, rngState: 17, predicates: {} }).state);
const event = (type, payload, actorId = "verification-host", eventId = "result") => ({
    schemaVersion: 1,
    eventId,
    type,
    actorId,
    workstreamId: "wo058-fixture",
    occurredAt: 10,
    payload: json(payload),
});
function start(subject = fixture.subject, criteria = fixture.criteria) {
    const events = [
        event("VerificationOpened", {
            criteria,
            subject,
            baseline: {
                ...subject,
                revision: "base",
                diff: "",
                evidence: subject.evidence.map((entry) => ({
                    ...entry,
                    subjectRevision: "base",
                })),
            },
            implementerEpisodeId: "implementer",
            maxRepairs: 0,
            authority: {
                authorityEnvelopeId: "fixture-authority",
                allowedEffects: ["verification.evaluate"],
                deniedEffects: ["repo.write"],
                resourceLimits: { episodes: 1 },
                requiredEvidence: ["pinned-subject", "baseline-witness"],
                expiresAt: 1000,
                revocationEventTypes: ["VerificationRevoked"],
            },
        }, "verification-host", "opened"),
        event("VerificationDispatchRequested", {}, "verification-host", "dispatch"),
    ];
    let state = replayVerification(events, "wo058-fixture");
    events.push(event("CommandPersisted", { command: state.pending.command }, "verification-host", "persisted"));
    state = replayVerification(events, "wo058-fixture");
    events.push(event("WorkerAttemptStarted", {
        commandId: state.pending.command.commandId,
        workerEpisodeId: "verifier",
        role: "verifier",
        inputHash: state.pending.capsule.inputHash,
        leaseExpiresAt: 1000,
    }, "verification-host", "started"));
    return replayVerification(events, "wo058-fixture");
}
const requestFor = (state) => ({
    kind: "evidence-worker",
    command: state.pending.command,
    workOrder: state.pending.capsule.workOrder,
    capsule: state.pending.capsule,
    episodeId: "verifier",
    model: "synthetic",
    effort: "unknown",
    cwd: "/synthetic-mount",
    profile: {
        profileId: "verification-snapshot-v1",
        mounts: [{ path: "/synthetic-mount", access: "read" }],
    },
});
function resultFor(state, verdict = "pass", citeErrors = false) {
    const request = requestFor(state);
    return {
        kind: "verification",
        envelope: {
            workOrderId: request.workOrder.workOrderId,
            episodeId: "verifier",
            resultId: resultId(request.command),
            status: "completed",
            summary: "Synthetic witness evaluation.",
            requiresHuman: false,
        },
        subjectRevision: request.capsule.subject.revision,
        evaluations: request.capsule.criteria.map((criterion) => ({
            criterionId: criterion.criterionId,
            claimType: criterion.claimType,
            verdict,
            evidenceRefs: request.capsule.subject.evidence
                .filter((entry) => entry.criterionId === criterion.criterionId &&
                (citeErrors || entry.outcome === "pass"))
                .map((entry) => entry.evidenceId),
            exemplarRefs: [],
            dissentRefs: [],
        })),
        findings: verdict !== "fail"
            ? []
            : request.capsule.criteria.map((criterion) => {
                const entry = request.capsule.subject.evidence.find((entry) => entry.criterionId === criterion.criterionId &&
                    entry.outcome === "fail");
                return {
                    findingId: `finding-${criterion.criterionId}`,
                    criterionId: criterion.criterionId,
                    severity: "major",
                    observed: entry.observed,
                    expected: entry.expected,
                    reproductionSteps: entry.reproductionSteps,
                    evidenceRefs: [entry.evidenceId],
                    likelySurface: criterion.codeSurfaces,
                };
            }),
    };
}
const resultEvent = (state, value, actorId = "verification-host") => event("CommandResult", {
    commandId: state.pending.command.commandId,
    workerEpisodeId: "verifier",
    verificationResultVersion: 1,
    result: "completed",
    value,
}, actorId);
function refused(state, result, reason) {
    assert.throws(() => parseEvidenceResult(result, requestFor(state)), (error) => error instanceof WorkerFailure &&
        error.code === "invalid-result" &&
        error.message === `invalid-result: ${reason}`);
    const after = fold(state, resultEvent(state, result));
    assert.deepEqual(after.rows, state.rows);
    assert.deepEqual(after.refusedResults, ["result"]);
}
function admitted(state, result, status) {
    assert.deepEqual(parseEvidenceResult(result, requestFor(state)), result);
    const after = fold(state, resultEvent(state, result));
    assert.ok(after.rows.every((row) => row.status === status));
    assert.deepEqual(after.refusedResults, []);
    return after;
}
const single = (kind, evidence) => start({ ...fixture.subject, evidence }, fixture.criteria.filter((criterion) => criterion.claimType === kind));
test("WO-058 AC1 DOM and accessibility alone leave visual incomplete; a cited screenshot verifies", () => {
    const entry = fixture.subject.evidence[0];
    const dom = { ...entry, evidenceId: "dom", witness: fixture.witnesses.dom };
    const accessibility = {
        ...entry,
        evidenceId: "accessibility",
        witness: fixture.witnesses.accessibility,
    };
    const state = single("visual", [dom, accessibility]);
    refused(state, resultFor(state), "visual pass requires screenshot");
    admitted(state, resultFor(state, "unverified"), "incomplete");
    const withScreenshot = single("visual", [dom, accessibility, entry]);
    admitted(withScreenshot, resultFor(withScreenshot), "verified");
    const omit = {
        ...resultFor(withScreenshot),
        evaluations: resultFor(withScreenshot).evaluations.map((entry) => ({
            ...entry,
            evidenceRefs: ["dom", "accessibility"],
        })),
    };
    refused(withScreenshot, omit, "visual pass requires screenshot");
});
test("WO-058 AC2 network requires a cited passing trace bound to its criterion", () => {
    const entry = fixture.subject.evidence[1];
    const snapshot = {
        ...entry,
        evidenceId: "dom",
        witness: fixture.witnesses.dom,
    };
    const state = single("network", [snapshot]);
    refused(state, resultFor(state), "network pass requires trace");
    admitted(state, resultFor(state, "unverified"), "incomplete");
    const withTrace = single("network", [snapshot, entry]);
    admitted(withTrace, resultFor(withTrace), "verified");
    const omit = {
        ...resultFor(withTrace),
        evaluations: resultFor(withTrace).evaluations.map((entry) => ({
            ...entry,
            evidenceRefs: ["dom"],
        })),
    };
    refused(withTrace, omit, "network pass requires trace");
    const crossBound = single("network", [
        snapshot,
        { ...entry, evidenceId: "other-criterion", criterionId: "other" },
    ]);
    const other = {
        ...resultFor(crossBound),
        evaluations: resultFor(crossBound).evaluations.map((entry) => ({
            ...entry,
            evidenceRefs: ["other-criterion"],
        })),
    };
    refused(crossBound, other, "claim-typed evidence");
});
test("WO-058 unavailable screenshots and traces cannot support a pass", () => {
    for (const kind of ["visual", "network"]) {
        const entry = fixture.subject.evidence.find((entry) => entry.claimType === kind);
        const state = single(kind, [{ ...entry, outcome: "unavailable" }]);
        const value = resultFor(state, "pass", true);
        refused(state, value, "unsupported pass");
        admitted(state, resultFor(state, "unverified", true), "incomplete");
    }
});
test("WO-058 AC3 a console error bound to each scenario criterion fails both and cannot be omitted or relabeled", () => {
    const errors = fixture.subject.evidence.map((entry) => ({
        ...entry,
        evidenceId: `console-${entry.criterionId}`,
        witness: fixture.witnesses.consoleError,
        outcome: "fail",
        observed: "Synthetic scenario error.",
        expected: "No console errors.",
    }));
    const state = start({
        ...fixture.subject,
        evidence: [...fixture.subject.evidence, ...errors],
    });
    for (const citeErrors of [false, true])
        refused(state, resultFor(state, "pass", citeErrors), "console error witness");
    const failed = admitted(state, resultFor(state, "fail", true), "failed");
    const forged = resultFor(state);
    for (const type of [
        "CommandResult",
        "CriterionVerified",
        "EvaluationRecorded",
    ]) {
        assert.deepEqual(fold(failed, { ...resultEvent(state, forged, "implementer"), type }), failed);
    }
    assert.equal(failed.rows.length, 2);
    assert.ok(failed.rows.every((row) => row.evaluations[0].provenance.kind === "host-admitted-verifier"));
});
test("WO-058 console info/warnings are not errors; unrelated checks retain the existing admission rule", () => {
    const captures = fixture.subject.evidence.map((entry) => ({
        ...entry,
        evidenceId: `console-${entry.criterionId}`,
        witness: {
            kind: "console-capture",
            contentHash: fixture.witnesses.console.contentHash,
            entries: [
                { level: "info", message: "Scenario completed." },
                { level: "warn", message: "Synthetic warning." },
            ],
        },
    }));
    const state = start({
        ...fixture.subject,
        evidence: [...fixture.subject.evidence, ...captures],
    });
    admitted(state, resultFor(state), "verified");
    const unrelated = start({
        ...fixture.subject,
        evidence: [
            ...fixture.subject.evidence,
            ...captures.map((entry) => ({
                ...entry,
                checkId: "unrequired",
                outcome: "fail",
                witness: fixture.witnesses.consoleError,
            })),
        ],
    });
    admitted(unrelated, resultFor(unrelated), "verified");
});
test("WO-184 criterion 14: the closed result schema exposes only the capsule's claim types", () => {
    const schema = evidenceResultSchema(requestFor(start(fixture.subject, fixture.criteria)));
    assert.deepEqual(schema.properties.evaluations.items.properties.claimType.enum, ["visual", "network"]);
});
