import { WorkerFailure } from "./worker-protocol.js";
import { isEvidenceRequest, parseTransportResult, validateTransportRequest, } from "./verification-protocol.js";
/** Deterministic test double. All inputs and witnesses remain labeled synthetic. */
export function fixtureVerificationResult(capsule, episodeId, resultId) {
    const envelope = {
        workOrderId: capsule.workOrder.workOrderId,
        episodeId,
        resultId,
        status: "completed",
        summary: "Synthetic fixture episode completed.",
        requiresHuman: false,
    };
    if (capsule.role === "repairer") {
        const policy = JSON.parse(capsule.subject.files.find((file) => file.path === "policy.json")
            .contents);
        return {
            kind: "repair",
            envelope,
            subjectRevision: capsule.subject.revision,
            replacements: [
                {
                    path: "policy.json",
                    contents: JSON.stringify({ ...policy, includeReferenced: false }) + "\n",
                },
            ],
        };
    }
    const findings = [];
    const evaluations = capsule.criteria.map((criterion) => {
        const evidence = capsule.subject.evidence.filter((item) => item.criterionId === criterion.criterionId);
        const failed = evidence.find((item) => item.outcome === "fail");
        const verdict = failed
            ? "fail"
            : criterion.requiredChecks.every((check) => evidence.some((item) => item.checkId === check && item.outcome === "pass"))
                ? "pass"
                : "unverified";
        if (failed)
            findings.push({
                findingId: `finding_${capsule.workOrder.workOrderId}_${criterion.criterionId}`,
                criterionId: criterion.criterionId,
                severity: "blocking",
                observed: failed.observed,
                expected: failed.expected,
                reproductionSteps: failed.reproductionSteps,
                evidenceRefs: [failed.evidenceId],
                likelySurface: ["policy.json"],
            });
        return {
            criterionId: criterion.criterionId,
            claimType: criterion.claimType,
            verdict,
            evidenceRefs: evidence.map((item) => item.evidenceId),
            exemplarRefs: [],
            dissentRefs: [],
        };
    });
    return {
        kind: "verification",
        envelope,
        subjectRevision: capsule.subject.revision,
        evaluations,
        findings,
    };
}
export class FakeVerificationTransport {
    name = "fake";
    harnessVersion = "not-applicable";
    dispatch(request, now) {
        validateTransportRequest(request);
        if (!isEvidenceRequest(request))
            throw new WorkerFailure("profile-refused");
        const result = parseTransportResult(fixtureVerificationResult(request.capsule, request.episodeId, `result_${request.command.commandId}`), request);
        return {
            receipt: Promise.resolve({
                commandId: request.command.commandId,
                transport: this.name,
                acceptedAt: now(),
            }),
            completed: Promise.resolve(result),
            alive: () => false,
            kill: () => { },
        };
    }
}
