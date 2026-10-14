/** Synthetic findings, not observations about any repository. Two `measured`
 * and three `by inspection` keep both selection denominators non-zero without
 * crossing the sample threshold, so the fixture exercises the `all` branch;
 * the empty variant below exercises `not-applicable`. */
export const cannedReviewerOutput = (request) => ({
    schemaVersion: 1,
    findings: [
        {
            findingId: "ER-F01",
            criterion: "Synthetic fixture criterion",
            severity: "major",
            evidenceLabel: "measured",
            observed: "Synthetic fixture observation.",
            expected: "Synthetic fixture expectation.",
            reproduction: { kind: "command", command: "node --version" },
            evidenceRefs: ["fixture://entropy/1"],
            surface: "fixture/alpha",
            altitude: 4,
            standardization: {
                kind: "recurring",
                rung: "test",
                rationale: "Synthetic fixture rationale.",
            },
        },
        {
            findingId: "ER-F02",
            criterion: "Synthetic fixture criterion",
            severity: "minor",
            evidenceLabel: "measured",
            observed: "Synthetic fixture observation.",
            expected: "Synthetic fixture expectation.",
            reproduction: { kind: "command", command: "node --version" },
            evidenceRefs: ["fixture://entropy/2"],
            surface: "fixture/beta",
            altitude: 3,
            standardization: { kind: "one-off" },
        },
        {
            findingId: "ER-F03",
            criterion: "Synthetic fixture criterion",
            severity: "blocking",
            evidenceLabel: "by inspection",
            observed: "Synthetic fixture observation.",
            expected: "Synthetic fixture expectation.",
            reproduction: { kind: "inspection", steps: ["Read the fixture file."] },
            evidenceRefs: ["fixture://entropy/3"],
            surface: "fixture/alpha",
            altitude: 6,
            standardization: { kind: "one-off" },
        },
        {
            findingId: "ER-F04",
            criterion: "Synthetic fixture criterion",
            severity: "minor",
            evidenceLabel: "by inspection",
            observed: "Synthetic fixture observation.",
            expected: "Synthetic fixture expectation.",
            reproduction: { kind: "inspection", steps: ["Read the fixture file."] },
            evidenceRefs: ["fixture://entropy/4"],
            surface: "fixture/beta",
            altitude: 2,
            standardization: { kind: "one-off" },
        },
        {
            findingId: "ER-F05",
            criterion: "Synthetic fixture criterion",
            severity: "minor",
            evidenceLabel: "by inspection",
            observed: "Synthetic fixture observation.",
            expected: "Synthetic fixture expectation.",
            reproduction: { kind: "inspection", steps: ["Read the fixture file."] },
            evidenceRefs: ["fixture://entropy/5"],
            surface: "fixture/gamma",
            altitude: 5,
            standardization: { kind: "one-off" },
        },
    ],
    proposalPackets: [
        {
            schemaVersion: 1,
            kind: "ProductSuggestionPacket",
            proposedPath: "docs/proposals/fixture-suggestion/",
            sourceEpisodeId: request.episodeId,
            provenance: ["fixture://entropy/packet"],
            corroboratingEvidenceRefs: [],
            dissentingEvidenceRefs: [],
            suggestion: {
                suggestionId: "fixture-suggestion",
                submittedBy: "entropy-reducer",
                problemOrOpportunity: "Synthetic fixture opportunity.",
                scope: "Synthetic fixture scope.",
                evidenceRefs: ["fixture://entropy/packet"],
                affectedUsers: ["fixture operator"],
                affectedSystems: ["fixture system"],
                expectedValue: "Synthetic fixture value.",
                altitude: 7,
                uncertainty: "Synthetic fixture uncertainty.",
                risks: [],
                alternatives: [],
                duplicationHints: [],
                urgencyRationale: "Synthetic fixture urgency.",
            },
        },
    ],
    resultEnvelope: {
        workOrderId: request.workOrder.workOrderId,
        episodeId: request.episodeId,
        status: "completed",
        resultId: `result_${request.command.commandId}`,
        summary: "Synthetic fixture review envelope; no repository was inspected and no finding here describes real work.",
        requiresHuman: true,
    },
    cleanRoom: {
        status: "passed",
        stopConditionsFound: false,
        evidenceRefs: ["fixture://entropy/clean-room"],
    },
});
/** The zero-finding shape, so both denominators read `not-applicable`. */
export const cannedEmptyReviewerOutput = (request) => ({
    ...cannedReviewerOutput(request),
    findings: [],
    proposalPackets: [],
});
export const cannedRefutationResult = (request, result = "survived") => ({
    schemaVersion: 1,
    attempts: [
        ...request.subjects.measured.map((subject) => ({
            findingId: subject.findingId,
            result,
            reason: "Synthetic fixture attempt; the reproduction was not judged.",
            evidenceRefs: ["fixture://entropy/attempt"],
        })),
        ...request.subjects.inspection.map((subject) => ({
            findingId: subject.findingId,
            result,
            reason: "Synthetic fixture attempt; the steps were not judged.",
            evidenceRefs: ["fixture://entropy/attempt"],
        })),
    ],
});
/** Drives the command family end to end without a model. It cannot satisfy a
 * live row: the host records its name and refuses to call a `fake` receipt a
 * pinned or substitute reviewer. */
export class FakeEntropyTransport {
    review;
    refutation;
    name = "fake";
    harnessVersion = "fixture-v1";
    constructor(review = cannedReviewerOutput, refutation = (request) => cannedRefutationResult(request)) {
        this.review = review;
        this.refutation = refutation;
    }
    dispatch(request, now) {
        return {
            receipt: Promise.resolve({
                commandId: request.command.commandId,
                transport: this.name,
                acceptedAt: now(),
            }),
            completed: Promise.resolve((request.kind === "entropy-review"
                ? this.review(request)
                : this.refutation(request))),
            alive: () => false,
            kill: () => { },
        };
    }
}
