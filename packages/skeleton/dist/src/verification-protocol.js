import { assertVerificationTask, CLAIM_TYPES, assertCompiledFeedback, canonicalStringify, copyFinding, compileVerificationTask, verificationLine, } from "@dotln/compiler";
import { copyReviewFindings, createReviewCompleted, reviewWorkOrder, reviewReferences, validateReviewContext, } from "./review.js";
import { planPrompt, planResultSchema, validatePlanRequest, validatePlanResult, } from "./plan-refutation-protocol.js";
import { validateReviewerOutput, } from "./loadouts/entropy-reducer.js";
import { isVerticalJudgmentRequest, validateVerticalJudgmentRequest, validateVerticalJudgmentResult, verticalJudgmentPrompt, verticalJudgmentResultSchema, } from "./vertical-judgment-protocol.js";
import { entropyRefutationPrompt, entropyRefutationResultSchema, entropyReviewPrompt, entropyReviewResultSchema, isEntropyRefutationRequest, isEntropyReviewRequest, validateEntropyRefutationRequest, validateEntropyRefutationResult, validateEntropyReviewRequest, } from "./entropy-review-protocol.js";
import { isMissionCheckRequest, missionCheckPrompt, missionCheckResultSchema, validateMissionCheckRequest, validateMissionCheckResult, } from "./mission-check-protocol.js";
import { isWriterRequest, parseStoredWriterResult, validateWriterRequest, writerPrompt, writerResultSchema, parseWorkerResult, resultId, validateRequest, WorkerFailure, workerPrompt, workerResultSchema, } from "./worker-protocol.js";
/** Fixed bound for the source-heavy feedback audit; other profiles keep WO-009 limits. */
export const FEEDBACK_VERIFIER_LIMITS = {
    timeoutMs: 600_000,
    maxBudgetUsd: "5.00",
};
export function baselineWitnessRows(witness) {
    return witness.capsule.subject.evidence.map((entry) => ({
        ...entry,
        subject: "baseline",
        origin: "host",
        source: "live",
    }));
}
/** Composition calls this before any implementation effect. */
export function baselineDisposition(witness) {
    validateBaselineWitness(witness);
    return witness.outcome === "not-reproduced"
        ? {
            kind: "BaselineNotReproduced",
            storyId: witness.story.storyId,
            limitation: witness.limitation,
        }
        : { kind: "Continue", storyId: witness.story.storyId };
}
const baselineCheck = (valid, detail) => {
    if (!valid)
        throw new WorkerFailure("profile-refused", `baseline: ${detail}`);
};
function validateBaselineStory(story, capsule) {
    const snapshot = capsule.subject.snapshot;
    baselineCheck(snapshot &&
        capsule.role === "verifier" &&
        verificationLine(story?.storyId) &&
        (story.kind === "new" || story.kind === "defect"), "story or sealed subject");
    baselineCheck(exact(story, story.kind === "new" ? ["storyId", "kind"] : ["storyId", "kind", "tests"]), "story shape");
    if (story.kind === "new")
        return;
    baselineCheck(Array.isArray(story.tests) &&
        story.tests.length > 0 &&
        story.tests.length <= 100, "named defect tests");
    const seen = new Set();
    for (const test of story.tests) {
        const key = canonicalStringify([
            test.criterionId,
            test.checkId,
            test.command,
        ]);
        baselineCheck(exact(test, [
            "criterionId",
            "checkId",
            "command",
            "expectedExitCode",
        ]) &&
            Number.isInteger(test.expectedExitCode) &&
            test.expectedExitCode > 0 &&
            test.expectedExitCode <= 255 &&
            !seen.has(key) &&
            snapshot.tests.some((named) => named.criterionId === test.criterionId &&
                named.checkId === test.checkId &&
                named.command === test.command), "defect test must name a sealed test and its failing exit");
        seen.add(key);
    }
}
export function createBaselineWitness(story, capsule, episodeId) {
    assertVerificationTask(capsule);
    validateBaselineStory(story, capsule);
    baselineCheck(capsule.subject.revision === capsule.subject.baseCommit, "episode must run on the base");
    baselineCheck(verificationLine(episodeId), "episode identity");
    const evidence = capsule.subject.evidence;
    baselineCheck(capsule.subject.snapshot.tests.every((test) => evidence.filter((entry) => entry.criterionId === test.criterionId &&
        entry.checkId === test.checkId &&
        entry.hostTest?.command === test.command).length === 1), "host witness coverage");
    const limitations = [];
    if (story.kind === "defect") {
        for (const test of story.tests) {
            const row = evidence.find((entry) => entry.criterionId === test.criterionId &&
                entry.checkId === test.checkId &&
                entry.hostTest?.command === test.command);
            if (row.outcome !== "fail" ||
                row.hostTest?.exitCode !== test.expectedExitCode)
                limitations.push(`${test.criterionId}/${test.checkId}: expected exit ${test.expectedExitCode}; observed ${row.observed}.`);
        }
    }
    else {
        for (const row of evidence.filter((entry) => entry.outcome === "unavailable"))
            limitations.push(`${row.criterionId}/${row.checkId}: test execution unavailable.`);
    }
    // Positive construction drops caller-owned references and cannot admit prose fields.
    return JSON.parse(JSON.stringify({
        story,
        capsule,
        episodeId,
        outcome: story.kind === "new"
            ? "walked"
            : limitations.length
                ? "not-reproduced"
                : "reproduced",
        limitation: limitations.length
            ? limitations.join(" ").slice(0, 2000)
            : null,
        evidenceIds: evidence.map((entry) => entry.evidenceId),
    }));
}
export function validateBaselineWitness(witness) {
    baselineCheck(witness &&
        canonicalStringify(witness) ===
            canonicalStringify(createBaselineWitness(witness.story, witness.capsule, witness.episodeId)), "witness drift");
}
export function validateBaselineContext(context, capsule) {
    baselineCheck(context && (context.kind === "baseline" || context.kind === "comparison"), "context kind");
    baselineCheck(exact(context, context.kind === "baseline" ? ["kind", "story"] : ["kind", "witness"]), "context shape");
    if (context.kind === "baseline") {
        createBaselineWitness(context.story, capsule, "preflight");
        return;
    }
    validateBaselineWitness(context.witness);
    const base = context.witness.capsule.subject, candidate = capsule.subject;
    baselineCheck(capsule.role === "verifier" &&
        candidate.snapshot &&
        base.repo === candidate.repo &&
        base.revision === candidate.baseCommit &&
        canonicalStringify(base.snapshot.contract) ===
            canonicalStringify(candidate.snapshot.contract) &&
        canonicalStringify(base.snapshot.tests) ===
            canonicalStringify(candidate.snapshot.tests), "comparison identity or named tests");
    // Recompile against the candidate criteria to check the baseline surfaces as well.
    compileVerificationTask("baseline_comparison", capsule.criteria, base);
}
export function compareBaseline(context, capsule) {
    if (context?.kind !== "comparison")
        return [];
    validateBaselineContext(context, capsule);
    const { witness } = context;
    if (witness.story.kind === "new")
        return [];
    return witness.story.tests.flatMap((test) => {
        if (!capsule.criteria.some((criterion) => criterion.criterionId === test.criterionId))
            return [];
        const base = witness.capsule.subject.evidence.find((row) => row.criterionId === test.criterionId &&
            row.checkId === test.checkId &&
            row.hostTest?.command === test.command);
        if (base?.outcome === "fail" &&
            base.hostTest?.exitCode === test.expectedExitCode)
            return [];
        const candidate = capsule.subject.evidence.find((row) => row.criterionId === test.criterionId &&
            row.checkId === test.checkId &&
            row.hostTest?.command === test.command);
        return [
            {
                kind: "baseline-test-did-not-fail",
                storyId: witness.story.storyId,
                criterionId: test.criterionId,
                checkId: test.checkId,
                command: test.command,
                candidateEvidenceId: candidate?.evidenceId ?? null,
                baselineEvidenceId: base?.evidenceId ?? null,
                observed: base?.observed ?? "baseline test witness missing",
                expected: `exit ${test.expectedExitCode}`,
            },
        ];
    });
}
export const isPlanRequest = (request) => "kind" in request && request.kind === "plan-refutation";
export const isEvidenceRequest = (request) => "kind" in request && request.kind === "evidence-worker";
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
    ? value
    : undefined;
const exact = (value, expected) => Object.keys(value).sort().join(",") === [...expected].sort().join(",");
/** Every contract reason an evidence result can be refused for. The list is
 * closed: `check` accepts nothing else, so a new reason is added here first. */
export const EVIDENCE_RESULT_REFUSALS = [
    "episode result shape",
    "review cannot return edits or diff",
    "review finding contract",
    "review episode identity",
    "episode envelope.summary must be a string of at most 320 characters",
    "episode envelope",
    "episode role or subject",
    "repair replacements",
    "repair outside focused surface",
    "repair has no substantive change",
    "criterion coverage",
    "evaluation shape",
    "evaluation criterion",
    "claim-typed evidence",
    "unsupported pass",
    "defect baseline did not fail",
    "baseline comparison findings",
    "visual pass requires screenshot",
    "network pass requires trace",
    "console error witness",
    "contradictory witness",
    "unsupported failure",
    "finding shape",
    "finding shape or duplicate",
    "finding criterion or evidence",
    "finding observed versus expected",
    "failed criterion lacks finding",
];
/** What an `invalid-result` refusal may record and print (WO-157 item 8,
 * WO-152 D009): the contract reasons, the transport's parse phases, the
 * host's receipt check and `unclassified`. Raw model output is never among
 * them. */
export const INVALID_RESULT_DETAILS = [
    ...EVIDENCE_RESULT_REFUSALS,
    "wire-json",
    "final-message-absent",
    "final-message-json",
    "receipt-command",
    "unclassified",
];
/** A detail outside the vocabulary is refused verbatim and recorded as
 * `unclassified`, so the refusal itself is never lost. */
export const invalidResultDetail = (detail) => INVALID_RESULT_DETAILS.includes(detail ?? "")
    ? detail
    : "unclassified";
const check = (valid, reason) => {
    if (!valid)
        throw new WorkerFailure("invalid-result", reason);
};
const refs = (value) => Array.isArray(value) &&
    value.length <= 100 &&
    value.every(verificationLine) &&
    new Set(value).size === value.length;
export function parseEvidenceResult(value, request) {
    const root = object(value);
    const envelope = object(root?.envelope);
    const verifying = request.capsule.role === "verifier";
    const reviewing = request.review !== undefined;
    if (reviewing) {
        validateReviewContext(request.review, request.capsule);
        check(!request.review.implementerEpisodes.includes(request.episodeId) &&
            !request.review.rows.some((row) => row.episodeId === request.episodeId), "review episode identity");
        check(!root ||
            !Object.keys(root).some((key) => ["diff", "patch", "edits", "files", "replacements"].includes(key)), "review cannot return edits or diff");
    }
    const baselineEpisode = request.baseline?.kind === "baseline";
    const comparison = request.baseline?.kind === "comparison";
    if (request.baseline)
        validateBaselineContext(request.baseline, request.capsule);
    const baselineFindings = compareBaseline(request.baseline, request.capsule);
    check(root &&
        envelope &&
        exact(root, reviewing
            ? ["kind", "envelope", "subjectRevision", "findings"]
            : baselineEpisode
                ? ["kind", "envelope", "subjectRevision"]
                : verifying
                    ? [
                        "kind",
                        "envelope",
                        "subjectRevision",
                        "evaluations",
                        "findings",
                        ...(comparison ? ["baselineFindings"] : []),
                    ]
                    : ["kind", "envelope", "subjectRevision", "replacements"]), "episode result shape");
    check(typeof envelope.summary === "string" && envelope.summary.length <= 320, "episode envelope.summary must be a string of at most 320 characters");
    check(exact(envelope, [
        "workOrderId",
        "episodeId",
        "status",
        "resultId",
        "summary",
        "requiresHuman",
    ]) &&
        envelope.workOrderId === request.workOrder.workOrderId &&
        envelope.episodeId === request.episodeId &&
        envelope.resultId === resultId(request.command) &&
        verificationLine(envelope.summary) &&
        envelope.summary.length <= 320 &&
        ["completed", "failed", "blocked"].includes(String(envelope.status)) &&
        typeof envelope.requiresHuman === "boolean", "episode envelope");
    check(root.subjectRevision === request.capsule.subject.revision &&
        root.kind ===
            (reviewing
                ? "review"
                : baselineEpisode
                    ? "baseline"
                    : verifying
                        ? "verification"
                        : "repair"), "episode role or subject");
    if (reviewing) {
        try {
            copyReviewFindings(root.findings, request.capsule, request.review);
        }
        catch {
            throw new WorkerFailure("invalid-result", "review finding contract");
        }
        return root;
    }
    if (baselineEpisode)
        return root;
    if (comparison)
        check(canonicalStringify(root.baselineFindings) ===
            canonicalStringify(baselineFindings), "baseline comparison findings");
    if (!verifying) {
        check(Array.isArray(root.replacements) &&
            root.replacements.length <= 100 &&
            (envelope.status !== "completed" || root.replacements.length > 0), "repair replacements");
        const seen = new Set();
        for (const value of root.replacements) {
            const file = object(value);
            check(file &&
                exact(file, ["path", "contents"]) &&
                typeof file.path === "string" &&
                !seen.has(file.path) &&
                request.capsule.finding?.likelySurface.includes(file.path) &&
                request.capsule.subject.files.some((prior) => prior.path === file.path) &&
                typeof file.contents === "string" &&
                file.contents.length <= 100_000, "repair outside focused surface");
            seen.add(file.path);
        }
        check(envelope.status !== "completed" ||
            root.replacements.some((file) => request.capsule.subject.files.find((prior) => prior.path === file.path)?.contents !== file.contents), "repair has no substantive change");
        return root;
    }
    check(Array.isArray(root.evaluations) &&
        Array.isArray(root.findings) &&
        root.findings.length <= 100 &&
        root.evaluations.length <= request.capsule.criteria.length &&
        (envelope.status !== "completed" ||
            root.evaluations.length === request.capsule.criteria.length), "criterion coverage");
    const seen = new Set();
    for (const value of root.evaluations) {
        const item = object(value);
        check(item &&
            exact(item, [
                "criterionId",
                "claimType",
                "verdict",
                "evidenceRefs",
                "exemplarRefs",
                "dissentRefs",
            ]) &&
            typeof item.criterionId === "string" &&
            !seen.has(item.criterionId) &&
            Array.isArray(item.exemplarRefs) &&
            item.exemplarRefs.length === 0 &&
            Array.isArray(item.dissentRefs) &&
            item.dissentRefs.length === 0, "evaluation shape");
        const criterion = request.capsule.criteria.find((criterion) => criterion.criterionId === item.criterionId);
        check(criterion &&
            item.claimType === criterion.claimType &&
            ["pass", "fail", "unverified"].includes(String(item.verdict)) &&
            refs(item.evidenceRefs), "evaluation criterion");
        const evidence = item.evidenceRefs.map((ref) => request.capsule.subject.evidence.find((entry) => entry.evidenceId === ref));
        check(evidence.every((entry) => entry &&
            entry.criterionId === criterion.criterionId &&
            entry.claimType === criterion.claimType &&
            entry.source === criterion.evidenceSource), "claim-typed evidence");
        if (item.verdict === "pass") {
            check(!baselineFindings.some((finding) => finding.criterionId === criterion.criterionId), "defect baseline did not fail");
            check(!request.capsule.subject.evidence.some((entry) => entry.criterionId === criterion.criterionId &&
                criterion.requiredChecks.includes(entry.checkId) &&
                entry.witness?.kind === "console-capture" &&
                entry.witness.entries.some((message) => message.level === "error")), "console error witness");
            check(evidence.length > 0 &&
                evidence.every((entry) => entry?.outcome === "pass") &&
                criterion.requiredChecks.every((id) => evidence.some((entry) => entry?.checkId === id)), "unsupported pass");
            if (criterion.claimType === "visual")
                check(evidence.some((entry) => entry?.witness?.kind === "screenshot" && entry.outcome === "pass"), "visual pass requires screenshot");
            if (criterion.claimType === "network")
                check(evidence.some((entry) => entry?.witness?.kind === "network-trace" &&
                    entry.outcome === "pass"), "network pass requires trace");
            // Omitting an adverse witness for the same required check cannot certify it.
            check(!request.capsule.subject.evidence.some((entry) => entry.criterionId === criterion.criterionId &&
                criterion.requiredChecks.includes(entry.checkId) &&
                entry.outcome !== "pass"), "contradictory witness");
        }
        if (item.verdict === "fail")
            check(evidence.some((entry) => entry?.outcome === "fail"), "unsupported failure");
        seen.add(item.criterionId);
    }
    const findingIds = new Set();
    for (const value of root.findings) {
        let finding;
        try {
            finding = copyFinding(value);
        }
        catch {
            throw new WorkerFailure("invalid-result", "finding shape");
        }
        check(finding.class !== "review" &&
            canonicalStringify(finding) === canonicalStringify(value) &&
            !findingIds.has(finding.findingId), "finding shape or duplicate");
        const criterion = request.capsule.criteria.find((criterion) => criterion.criterionId === finding.criterionId);
        const evaluation = root.evaluations.find((entry) => entry.criterionId === finding.criterionId);
        check(criterion &&
            evaluation?.verdict === "fail" &&
            finding.likelySurface.every((path) => criterion.codeSurfaces.includes(path)) &&
            finding.evidenceRefs.every((ref) => evaluation.evidenceRefs.includes(ref)), "finding criterion or evidence");
        check(finding.evidenceRefs.some((ref) => request.capsule.subject.evidence.some((entry) => entry.evidenceId === ref &&
            entry.outcome === "fail" &&
            entry.observed === finding.observed &&
            entry.expected === finding.expected)), "finding observed versus expected");
        findingIds.add(finding.findingId);
    }
    const findings = root.findings;
    check(root.evaluations.every((item) => item.verdict !== "fail" ||
        findings.some((finding) => finding.criterionId === item.criterionId)), "failed criterion lacks finding");
    return root;
}
const schemaObject = (properties) => ({
    type: "object",
    additionalProperties: false,
    required: Object.keys(properties),
    properties,
});
const schemaText = { type: "string" };
const schemaTexts = { type: "array", items: schemaText };
/** A verificationLine as far as schema keywords the live transports accept can
 * say it; control characters stay with admission (WO-157 item 16). */
const schemaLine = { ...schemaText, minLength: 1, maxLength: 2_000 };
const schemaOneOf = (values) => values.length > 0
    ? { ...schemaText, enum: [...new Set(values)] }
    : schemaLine;
/** copyFinding's `lines`: 1-100 entries; uniqueness stays with admission. */
const schemaLines = (items) => ({
    type: "array",
    minItems: 1,
    maxItems: 100,
    items,
});
/** The strings admission and repair derivation already require of a finding.
 * A live verifier cannot guess them, so its schema and instructions state them. */
function findingContract(request) {
    const { evidence, snapshot } = request.capsule.subject;
    const adverse = evidence.filter((entry) => entry.outcome === "fail");
    // A finding needs a failing evaluation, which needs a failing witness of
    // its criterion; without one, admission can accept no finding (WO-157 D024).
    const failing = request.capsule.criteria.filter((criterion) => adverse.some((entry) => entry.criterionId === criterion.criterionId));
    return {
        criterionIds: failing.map((criterion) => criterion.criterionId),
        likelySurface: failing.flatMap((criterion) => criterion.codeSurfaces),
        evidenceIds: evidence.map((entry) => entry.evidenceId),
        observed: adverse.map((entry) => entry.observed),
        expected: adverse.map((entry) => entry.expected),
        // Only the worktree-snapshot profile turns steps into host-run commands.
        reproductionSteps: snapshot
            ? [
                ...adverse.flatMap((entry) => entry.reproductionSteps),
                ...snapshot.tests.map((test) => test.command),
            ]
            : [],
    };
}
export function evidenceResultSchema(request) {
    const contract = findingContract(request);
    const common = {
        kind: {
            ...schemaText,
            enum: [
                request.review
                    ? "review"
                    : request.baseline?.kind === "baseline"
                        ? "baseline"
                        : request.capsule.role === "verifier"
                            ? "verification"
                            : "repair",
            ],
        },
        envelope: schemaObject({
            workOrderId: { ...schemaText, enum: [request.workOrder.workOrderId] },
            episodeId: { ...schemaText, enum: [request.episodeId] },
            resultId: { ...schemaText, enum: [resultId(request.command)] },
            status: { ...schemaText, enum: ["completed", "blocked", "failed"] },
            summary: { ...schemaText, maxLength: 320 },
            requiresHuman: { type: "boolean" },
        }),
        subjectRevision: {
            ...schemaText,
            enum: [request.capsule.subject.revision],
        },
    };
    if (request.review)
        return schemaObject({
            ...common,
            findings: {
                type: "array",
                maxItems: 100,
                items: schemaObject({
                    class: { ...schemaText, enum: ["review"] },
                    findingId: schemaLine,
                    criterionId: schemaOneOf(request.capsule.criteria.map((criterion) => criterion.criterionId)),
                    severity: { ...schemaText, enum: ["blocking", "should", "nit"] },
                    observed: schemaLine,
                    expected: schemaLine,
                    reproductionSteps: schemaLines(schemaLine),
                    evidenceRefs: schemaLines(schemaOneOf(reviewReferences(request.capsule, request.review))),
                    likelySurface: schemaLines(schemaOneOf([
                        ...new Set([
                            ...request.review.baseline.files,
                            ...request.capsule.subject.files,
                        ].map((file) => file.path)),
                    ])),
                }),
            },
        });
    if (request.baseline?.kind === "baseline")
        return schemaObject(common);
    const baselineFindings = compareBaseline(request.baseline, request.capsule);
    return schemaObject(request.capsule.role === "repairer"
        ? {
            ...common,
            replacements: {
                type: "array",
                items: schemaObject({ path: schemaText, contents: schemaText }),
            },
        }
        : {
            ...common,
            ...(request.baseline?.kind === "comparison"
                ? {
                    baselineFindings: {
                        type: "array",
                        minItems: baselineFindings.length,
                        maxItems: baselineFindings.length,
                        items: schemaObject({
                            kind: {
                                ...schemaText,
                                enum: ["baseline-test-did-not-fail"],
                            },
                            storyId: schemaLine,
                            criterionId: schemaLine,
                            checkId: schemaLine,
                            command: schemaLine,
                            candidateEvidenceId: { type: ["string", "null"] },
                            baselineEvidenceId: { type: ["string", "null"] },
                            observed: schemaLine,
                            expected: schemaLine,
                        }),
                    },
                }
                : {}),
            evaluations: {
                type: "array",
                items: schemaObject({
                    criterionId: schemaOneOf(request.capsule.criteria.map((criterion) => criterion.criterionId)),
                    claimType: {
                        ...schemaText,
                        enum: CLAIM_TYPES.filter((type) => request.capsule.criteria.some((criterion) => criterion.claimType === type)),
                    },
                    verdict: {
                        ...schemaText,
                        enum: contract.criterionIds.length
                            ? ["pass", "fail", "unverified"]
                            : ["pass", "unverified"],
                    },
                    evidenceRefs: {
                        type: "array",
                        maxItems: 100,
                        items: schemaOneOf(contract.evidenceIds),
                    },
                    // Admission requires both empty.
                    exemplarRefs: { ...schemaTexts, maxItems: 0 },
                    dissentRefs: { ...schemaTexts, maxItems: 0 },
                }),
            },
            findings: {
                type: "array",
                maxItems: contract.criterionIds.length ? 100 : 0,
                items: schemaObject({
                    findingId: schemaLine,
                    criterionId: schemaOneOf(contract.criterionIds),
                    severity: { ...schemaText, enum: ["blocking", "major", "minor"] },
                    observed: schemaOneOf(contract.observed),
                    expected: schemaOneOf(contract.expected),
                    reproductionSteps: schemaLines(schemaOneOf(contract.reproductionSteps)),
                    evidenceRefs: schemaLines(schemaOneOf(contract.evidenceIds)),
                    likelySurface: schemaLines(schemaOneOf(contract.likelySurface)),
                }),
            },
        });
}
function verificationReviewNotice(request) {
    const notice = request.command.intent.payload.reviewNotice;
    if (notice === undefined)
        return undefined;
    if (notice !== true ||
        request.review ||
        request.baseline?.kind === "baseline" ||
        request.capsule.role !== "verifier")
        throw new Error("invalid behavior verification review notice");
    return true;
}
export function validateTransportRequest(request) {
    if (isVerticalJudgmentRequest(request))
        return validateVerticalJudgmentRequest(request);
    if (isEntropyReviewRequest(request))
        return validateEntropyReviewRequest(request);
    if (isEntropyRefutationRequest(request))
        return validateEntropyRefutationRequest(request);
    if (isWriterRequest(request))
        return validateWriterRequest(request);
    if (isMissionCheckRequest(request))
        return validateMissionCheckRequest(request);
    if (isPlanRequest(request))
        return validatePlanRequest(request);
    if (!isEvidenceRequest(request))
        return validateRequest(request);
    try {
        assertVerificationTask(request.capsule);
        if (request.review) {
            if (request.baseline)
                throw new Error("review cannot be a baseline or comparison episode");
            createReviewCompleted(request.capsule, request.review, request.episodeId, [], false);
        }
        if (request.baseline)
            validateBaselineContext(request.baseline, request.capsule);
        if (request.feedback !== undefined)
            assertCompiledFeedback(request.feedback);
        if (canonicalStringify(request.workOrder) !==
            canonicalStringify(request.review
                ? reviewWorkOrder(request.capsule)
                : request.capsule.workOrder) ||
            request.command.intent.kind !== "Act" ||
            request.command.intent.effect !==
                request.workOrder.allowedOperations[0] ||
            canonicalStringify(request.command.intent.payload) !==
                canonicalStringify({
                    capsule: request.capsule,
                    ...(request.review ? { review: request.review } : {}),
                    ...(request.baseline ? { baseline: request.baseline } : {}),
                    ...(verificationReviewNotice(request) ? { reviewNotice: true } : {}),
                }) ||
            !/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/u.test(request.model) ||
            request.model.length > 100 ||
            !/^[a-zA-Z0-9_-]+$/u.test(request.episodeId) ||
            request.profile.profileId !==
                (request.capsule.subject.snapshot?.profile ??
                    "verification-snapshot-v1") ||
            request.profile.mounts.length !== 1 ||
            request.profile.mounts[0]?.path !== request.cwd ||
            request.profile.mounts[0]?.access !== "read")
            throw new Error("profile mismatch");
    }
    catch (error) {
        throw new WorkerFailure("profile-refused", error instanceof Error ? error.message : "invalid verification profile");
    }
}
export function transportResultSchema(request) {
    if (isVerticalJudgmentRequest(request))
        return verticalJudgmentResultSchema(request);
    if (isEntropyReviewRequest(request))
        return entropyReviewResultSchema();
    if (isEntropyRefutationRequest(request))
        return entropyRefutationResultSchema(request);
    if (isWriterRequest(request))
        return writerResultSchema(request);
    if (isMissionCheckRequest(request))
        return missionCheckResultSchema(request.subject);
    if (isPlanRequest(request))
        return planResultSchema(request.subject);
    return isEvidenceRequest(request)
        ? evidenceResultSchema(request)
        : workerResultSchema(request);
}
export function parseTransportResult(value, request) {
    return (isVerticalJudgmentRequest(request)
        ? validateVerticalJudgmentResult(value, request)
        : isEntropyReviewRequest(request)
            ? validateReviewerOutput(value, {
                workOrderId: request.workOrder.workOrderId,
                episodeId: request.episodeId,
            })
            : isEntropyRefutationRequest(request)
                ? validateEntropyRefutationResult(value, request)
                : isMissionCheckRequest(request)
                    ? validateMissionCheckResult(value, request.subject)
                    : isWriterRequest(request)
                        ? parseStoredWriterResult(value, request)
                        : isPlanRequest(request)
                            ? validatePlanResult(value, request.subject)
                            : isEvidenceRequest(request)
                                ? parseEvidenceResult(value, request)
                                : parseWorkerResult(value, request));
}
export function transportPrompt(request, harness) {
    if (isVerticalJudgmentRequest(request))
        return verticalJudgmentPrompt(request);
    if (isEntropyReviewRequest(request))
        return entropyReviewPrompt(request);
    if (isEntropyRefutationRequest(request))
        return entropyRefutationPrompt(request);
    if (isWriterRequest(request))
        return writerPrompt(request, harness);
    if (isMissionCheckRequest(request))
        return missionCheckPrompt(request);
    if (isPlanRequest(request)) {
        validatePlanRequest(request);
        return planPrompt(request);
    }
    if (!isEvidenceRequest(request))
        return workerPrompt(request);
    validateTransportRequest(request);
    return JSON.stringify({
        capsule: request.capsule,
        ...(request.review
            ? { review: request.review, workOrder: reviewWorkOrder(request.capsule) }
            : {}),
        ...(request.baseline ? { baseline: request.baseline } : {}),
        episodeId: request.episodeId,
        resultId: resultId(request.command),
        outputInstructions: request.review
            ? `The top-level workOrder is this review episode; capsule.workOrder describes the preceding behavior-verification task, not this episode. Independently review the sealed candidate against its original contract, actual diff and declared repository conventions. Behavior verification has passed; read its baseline and candidate rows, never run a product gate or change a behavior verdict. This is the complete read projection, with no implementer narrative. No tools, edits, patches, replacements or writes are granted. ${request.review.conventionsPath === null ? "Declared conventions are absent; judge scope and contract fit only, never invent repository conventions." : `The unchanged declared conventions source is ${request.review.conventionsPath}.`} Return kind review with findings under the existing finding contract and class review: blocking for a concrete maintainability, scope or convention defect that must be repaired before delivery; should and nit are known items only and never authorize changes. Each finding gives its rule verbatim in expected, the concrete violation in observed, inspection steps in reproductionSteps, relevant likelySurface paths, and evidenceRefs from ${JSON.stringify(reviewReferences(request.capsule, request.review))}. Cite contract or the declared conventions source for the rule and diff or file references for the observation. Tie each finding to a supplied criterion. Do not invent a failed host test; review findings are separate judgments. Keep envelope.summary within 320 characters. Return only the schema object.`
            : request.baseline?.kind === "baseline"
                ? "This is the baseline episode before implementation. Inspect the sealed base and its host-run named tests. No tools, writes or implementer narrative are granted. A completed envelope acknowledges this inspection only; the host derives reproduction or its environment limitation from its own test rows. Return kind baseline, the pinned subjectRevision and envelope only; never supply rows, a verdict or an outcome. Keep envelope.summary to at most 320 characters."
                : request.capsule.role === "verifier"
                    ? `Independently assess each criterion using the pinned diff, repository snapshot and host witnesses. This is the complete read mount projection; no tools or other context are granted. Preserve evidence source labels. A pass requires every required check, matching claim type and source, with no adverse witness. Visual passes additionally require a cited passing screenshot; network passes require a cited passing network-trace. A console-capture error for the criterion's required check prevents a pass even when omitted. Missing or unavailable evidence is unverified. Emit full findings for failures, blocking when repair is required. A finding restates host evidence: reference the failing witness in evidenceRefs, which must also appear in that criterion's evaluation, and copy observed and expected verbatim from that witness; keep likelySurface within the criterion's codeSurfaces.${request.capsule.subject.snapshot
                        ? " Each reproduction step must be that witness's reproduction step copied verbatim or one of the contract's exact named commands; the host runs them and interprets no prose."
                        : ""}${request.baseline?.kind === "comparison" ? ` Copy these host comparison findings exactly into baselineFindings: ${JSON.stringify(compareBaseline(request.baseline, request.capsule))}. A criterion named by a baseline finding cannot pass; use unverified when its candidate tests pass, and explain the missing baseline reproduction in your summary.` : ""}${verificationReviewNotice(request) ? " An independent review follows this behavior verification. Scope and convention defects belong to that review: pass a behavior you have verified and leave those two defect kinds to the reviewer. Still request human attention for anything else you judge unsafe to pass." : ""} Put your own diagnosis in envelope.summary. Keep envelope.summary to at most 320 characters. Return only the schema object; completion means this evaluation finished, never implementation success.`
                    : "Propose replacement contents only for the blocking finding's likely surfaces in the pinned repository snapshot. Keep the repair focused. No file writes or other tools are granted; the host applies a validated proposal in its synthetic fixture and dispatches a fresh blinded verifier. Keep envelope.summary to at most 320 characters. Return only the schema object. You cannot certify acceptance.",
    });
}
