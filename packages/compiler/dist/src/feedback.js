import { COMPILER_PACKAGE_VERSION } from "./artifact-identity.js";
import { canonicalStringify, fnv1a64 } from "./normalize.js";
import { isCompilerRelease, repositoryPath, verificationLine, } from "./verification.js";
/** Closed v1 handler vocabulary. Personal units live in the host's loadout. */
export const FEEDBACK_HANDLERS = {
    "decision-lineage": { kind: "pre-effect-guard", rung: 2 },
    "evidence-judgment": { kind: "evaluator", rung: 5 },
    "semantic-correction": { kind: "pure-reactor", rung: 3 },
    "application-evidence": { kind: "workflow-gate", rung: 6 },
    attribution: { kind: "script", rung: 1 },
    "writer-isolation": { kind: "pre-effect-guard", rung: 2 },
    "suppression-diff": { kind: "script", rung: 1 },
    "output-review": { kind: "workflow-gate", rung: 6 },
    "complete-scope": { kind: "workflow-gate", rung: 6 },
    "cleanup-scope": { kind: "pre-effect-guard", rung: 2 },
};
const requireFeedback = (ok, detail) => {
    if (!ok)
        throw new Error(`feedback contract: ${detail}`);
};
const strings = (values, name, nonempty = true) => {
    requireFeedback(Array.isArray(values) &&
        values.length <= 100 &&
        (!nonempty || values.length > 0) &&
        values.every(verificationLine) &&
        new Set(values).size === values.length, name);
    return [...values].sort();
};
const text = (value, name) => {
    requireFeedback(verificationLine(value), name);
    return value;
};
/** Lower declared corrections to executable handlers, with no prompt emission. */
export function compileFeedbackUnits(input) {
    return lowerFeedbackUnits(input, COMPILER_PACKAGE_VERSION);
}
function lowerFeedbackUnits(input, compilerPackageVersion) {
    requireFeedback(Array.isArray(input) && input.length <= 10, "bounded unit inventory");
    const units = input
        .map((unit) => {
        requireFeedback(unit && typeof unit === "object" && unit.incident && unit.mechanism, "unit shape");
        requireFeedback(Number.isSafeInteger(unit.version) && unit.version > 0, "unit version");
        requireFeedback(Object.hasOwn(FEEDBACK_HANDLERS, unit.trigger) &&
            unit.mechanism.handler === unit.trigger &&
            [1, 2].includes(unit.mechanism.version) &&
            (unit.mechanism.kind === undefined ||
                (unit.mechanism.kind === "prose" &&
                    unit.version >= 2 &&
                    unit.mechanism.version === 2 &&
                    unit.enforcement === "advisory")), "unsupported mechanism or trigger");
        requireFeedback(["hard", "soft", "advisory"].includes(unit.enforcement), "enforcement");
        requireFeedback(unit.incident.sourceTreatment === "synthesized-from-public-lineage" &&
            unit.incident.retainedSource === "public-reference", "declared source treatment");
        const sourceRefs = strings(unit.incident.sourceRefs, "incident references");
        requireFeedback(sourceRefs.every((ref) => repositoryPath(ref.split("#")[0]) &&
            !ref.startsWith("docs/intake/")), "public source references");
        return {
            unitId: text(unit.unitId, "unit id"),
            version: unit.version,
            incident: {
                sourceRefs,
                sourceTreatment: unit.incident.sourceTreatment,
                summary: text(unit.incident.summary, "incident summary"),
                retainedSource: unit.incident.retainedSource,
            },
            undesiredBehavior: text(unit.undesiredBehavior, "undesired behavior"),
            desiredBehavior: text(unit.desiredBehavior, "desired behavior"),
            scope: strings(unit.scope, "scope"),
            trigger: unit.trigger,
            mechanism: {
                handler: unit.mechanism.handler,
                version: unit.mechanism.version,
                ...(unit.mechanism.kind ? { kind: unit.mechanism.kind } : {}),
                rationale: text(unit.mechanism.rationale, "cheapest sufficient mechanism"),
            },
            enforcement: unit.enforcement,
            requiredEvidence: strings(unit.requiredEvidence, "required evidence", unit.mechanism.kind !== "prose"),
            regressionFixtures: strings(unit.regressionFixtures, "regression fixtures"),
            conflicts: strings(unit.conflicts, "conflicts", false),
            supersedes: strings(unit.supersedes, "supersedes", false),
            retirementCondition: text(unit.retirementCondition, "retirement condition"),
            nextMaturityCondition: text(unit.nextMaturityCondition, "next maturity condition"),
            proseEquivalent: text(unit.proseEquivalent, "prose equivalent"),
        };
    })
        .sort((a, b) => (a.unitId < b.unitId ? -1 : a.unitId > b.unitId ? 1 : 0));
    const ids = units.map((unit) => unit.unitId);
    requireFeedback(new Set(ids).size === ids.length, "duplicate unit id");
    requireFeedback(new Set(units.map((unit) => unit.trigger)).size === units.length, "duplicate handler");
    for (const unit of units)
        requireFeedback([...unit.conflicts, ...unit.supersedes].every((id) => !ids.includes(id)), "conflicting or superseded unit still equipped");
    const contents = {
        contractVersion: "feedback-v1",
        compilerPackageVersion,
        units,
        mechanisms: units.map((unit) => ({
            unitId: unit.unitId,
            handler: unit.mechanism.handler,
            ...FEEDBACK_HANDLERS[unit.mechanism.handler],
            ...(unit.mechanism.kind === "prose" ? { kind: "prose", rung: 7 } : {}),
            enforcement: unit.enforcement,
        })),
    };
    return {
        ...contents,
        policyHash: `fnv1a64:${fnv1a64(canonicalStringify(contents))}`,
    };
}
/** A recorded program keeps the compiler release it names; everything else
 * must be this compiler's lowering of its units, so a log recorded before a
 * release-only bump still replays and any policy drift fails (WO-154). */
export function assertCompiledFeedback(program) {
    requireFeedback(isCompilerRelease(program.compilerPackageVersion) &&
        canonicalStringify(program) ===
            canonicalStringify(lowerFeedbackUnits(program.units, program.compilerPackageVersion)), "compiled policy drift");
}
export { hasAiAttribution } from "./attribution.mjs";
import { hasAiAttribution } from "./attribution.mjs";
// Host-parsed comment bodies only; language parsing belongs to the adapter.
function suppressionComments(comments) {
    return comments
        .flatMap((comment) => comment.split(/\r?\n/u))
        .map((line) => line.trim().replace(/^\*\s*/u, ""))
        .filter((line) => /^(?:@ts-(?:ignore|expect-error|nocheck)\b|eslint-disable(?:-next-line|-line)?\b|tslint:disable\b)/u.test(line));
}
const includesAll = (available, required) => required.length > 0 && required.every((id) => available.includes(id));
function reason(request, reuseEvidence = false) {
    switch (request.kind) {
        case "decision-lineage":
            if (!includesAll(request.preservedOutcomes, request.requiredOutcomes))
                return "desired outcome lost";
            if (request.rejected.some((entry) => entry.approach === request.proposedApproach &&
                !request.explicitSupersessions.includes(entry.approach)))
                return "rejected approach repeated without explicit supersession";
            return request.proposedHardConstraints.every((id) => request.explicitHardConstraints.includes(id))
                ? null
                : "example or inference promoted to a hard constraint";
        case "evidence-judgment": {
            const witnesses = request.witnesses.filter((item) => item.subject === request.subject &&
                item.source === "independent" &&
                verificationLine(item.evidenceRef));
            return witnesses.length > 0 &&
                witnesses.every((item) => item.outcome === request.claimed)
                ? null
                : "claim lacks consistent independent evidence";
        }
        case "application-evidence":
            return request.requiredChecks.length > 0 &&
                request.requiredChecks.every((id) => {
                    const runs = request.runs.filter((run) => run.checkId === id && run.subject === request.subject);
                    return (runs.length > 0 &&
                        runs[reuseEvidence ? "some" : "every"]((run) => run.executed &&
                            run.exitCode === 0 &&
                            verificationLine(run.evidenceRef)));
                })
                ? null
                : "required application check missing, stale, unexecuted, or failing";
        case "attribution":
            return hasAiAttribution(request.message)
                ? "AI attribution footer or trailer"
                : null;
        case "writer-isolation":
            // Preserve the original unit's replay semantics; its replacement permits
            // a reserved writer on every branch, including main.
            if (!reuseEvidence && request.writable && request.branch === "main")
                return "write dispatch lacks a verified exclusive worktree";
            return !request.writable ||
                (request.cwd === request.gitRoot &&
                    request.cwd === request.worktree &&
                    request.branch !== "HEAD" &&
                    request.branch.length > 0 &&
                    request.writers.filter((writer) => writer.worktree === request.worktree).length === 1 &&
                    request.writers.some((writer) => writer.actorId === request.actorId &&
                        writer.worktree === request.worktree))
                ? null
                : "write dispatch lacks a verified exclusive worktree";
        case "suppression-diff":
            return request.files.some((file) => {
                if (!/\.[cm]?[jt]sx?$/u.test(file.path))
                    return false;
                const remaining = [...suppressionComments(file.beforeComments)];
                return suppressionComments(file.afterComments).some((comment) => {
                    const index = remaining.indexOf(comment);
                    if (index < 0)
                        return true;
                    remaining.splice(index, 1);
                    return false;
                });
            })
                ? "new lint/type suppression comment"
                : null;
        case "output-review":
            return (reuseEvidence || request.outputs.length > 0) &&
                request.outputs.every((output) => request.reads.some((read) => read.path === output.path &&
                    read.hash === output.hash &&
                    verificationLine(read.evidenceRef)))
                ? null
                : "output not read at its current bytes";
        case "complete-scope":
            return request.status === "completed" &&
                request.remaining.length === 0 &&
                includesAll(request.completed, request.required)
                ? null
                : "required work remains incomplete";
        case "cleanup-scope":
            return request.allowedPaths.includes(request.path) &&
                request.adjacent &&
                request.unambiguous &&
                request.lowRisk &&
                !request.obscuresDiff &&
                !request.retainedEvidence &&
                verificationLine(request.assessmentRef) &&
                includesAll(request.coveredChecks, request.requiredChecks)
                ? null
                : "cleanup needs a separate candidate or retained-evidence review";
    }
}
export function evaluateFeedback(program, request) {
    assertCompiledFeedback(program);
    const kind = request.kind;
    requireFeedback(Object.hasOwn(FEEDBACK_HANDLERS, kind) && kind !== "semantic-correction", "boundary request kind");
    const mechanisms = program.mechanisms.filter((item) => item.handler === request.kind && item.kind !== "prose");
    const violation = mechanisms.length
        ? reason(request, program.units.some((unit) => unit.trigger === request.kind && unit.version >= 2))
        : null;
    const violations = violation === null
        ? []
        : mechanisms.map((item) => ({
            unitId: item.unitId,
            enforcement: item.enforcement,
            reason: violation,
        }));
    return {
        allowed: !violations.some((item) => item.enforcement === "hard"),
        violations,
        eligibleUnits: mechanisms.map((item) => item.unitId),
    };
}
export const SEMANTIC_CORRECTIONS = [
    "OperatorCorrectionReceived",
    "OperatorReportsRegression",
    "OperatorRejectsUnsupportedAssumption",
    "OperatorReportsRepeatedFailure",
];
/** Monotone meet: even a mistakenly classified typed event can only tighten. */
export function applyFeedbackCorrection(program, state, event) {
    assertCompiledFeedback(program);
    if (!program.mechanisms.some((item) => item.handler === "semantic-correction" &&
        item.kind !== "prose" &&
        item.enforcement === "hard") ||
        !SEMANTIC_CORRECTIONS.some((type) => type === event.type) ||
        state.corrections.includes(event.eventId))
        return state;
    requireFeedback(verificationLine(event.eventId), "correction event identity");
    return {
        ...state,
        allowedEffects: state.allowedEffects.filter((effect) => !effect.includes("*") && !state.destructiveEffects.includes(effect)),
        scopeExpansionAllowed: false,
        preserveEvidence: true,
        diagnosisRequired: true,
        corrections: [...state.corrections, event.eventId],
    };
}
export function feedbackMaturity(program, observations) {
    assertCompiledFeedback(program);
    const seen = new Set();
    for (const observation of observations) {
        const key = `${observation.unitId}:${observation.episodeId}`;
        requireFeedback(program.units.some((unit) => unit.unitId === observation.unitId) &&
            verificationLine(observation.episodeId) &&
            !seen.has(key) &&
            ["fixture", "live"].includes(observation.source) &&
            [
                observation.activated,
                observation.prevented,
                observation.falseActivation,
                observation.overridden,
            ].every((value) => typeof value === "boolean") &&
            (!(observation.prevented ||
                observation.falseActivation ||
                observation.overridden) ||
                observation.activated) &&
            !(observation.prevented && observation.falseActivation), "maturity observation");
        seen.add(key);
    }
    const count = (unitId, source) => {
        const rows = observations.filter((item) => item.unitId === unitId && item.source === source);
        return {
            eligibleEpisodes: rows.length,
            activations: rows.filter((item) => item.activated).length,
            incidentsPrevented: rows.filter((item) => item.prevented).length,
            falseActivations: rows.filter((item) => item.falseActivation).length,
            overrides: rows.filter((item) => item.overridden).length,
        };
    };
    return program.units.map((unit) => ({
        unitId: unit.unitId,
        version: unit.version,
        currentMechanism: unit.mechanism.handler,
        nextMaturityCondition: unit.nextMaturityCondition,
        awakened: false,
        fixture: count(unit.unitId, "fixture"),
        live: count(unit.unitId, "live"),
    }));
}
/** One bounded read-only work order; execution is a fixed host subprocess. */
export function compileFeedbackAudit(program, repo, baseCommit, subject) {
    assertCompiledFeedback(program);
    requireFeedback(verificationLine(repo) &&
        /^[a-f0-9]{40}$/u.test(baseCommit) &&
        verificationLine(subject), "audit subject");
    return {
        workOrderId: "WO-011-feedback-audit",
        repo,
        baseCommit,
        objective: "Audit this repository's ten FeedbackUnits through their executable regression and removal fixtures.",
        acceptanceCriteria: [
            "Every equipped unit's regression passes and fails when that mechanism is removed.",
            "Report measured instruction bytes using the WO-004 accounting method.",
        ],
        knownFacts: [
            `Pinned source: ${subject}`,
            `Equipped feedback: ${program.policyHash}`,
        ],
        decisions: [
            "Execute the fixed local regression runner; independently verify its pinned evidence.",
        ],
        constraints: [
            "Read-only source access",
            "Controlled fixtures do not establish general live prevention rates",
        ],
        nonGoals: [
            "Change repository source",
            "Publish",
            "General self-hosting switchover",
        ],
        allowedOperations: ["feedback.audit"],
        prohibitedOperations: ["repo.write", "repo.delete", "publish"],
        requiredEvidence: [
            "present-and-removed-fixtures",
            "context-accounting",
            "independent-verification",
        ],
        outputContract: {
            type: "feedback-audit-v1",
            policyHash: program.policyHash,
            subject,
        },
    };
}
