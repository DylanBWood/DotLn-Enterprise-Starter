import { canonicalStringify, copyFinding, fnv1a64, repositoryPath, } from "@dotln/compiler";
import { Program, } from "@dotln/kernel";
export const REPAIR_HOST = "repair-host";
export const repairEventTypes = [
    "RepairOpened",
    "RepairTick",
    "RepairCommandPersisted",
    "RepairCommandResult",
    "RepairDerived",
    "RepairCompleted",
    "RepairExhausted",
    "NeedsHuman",
];
export const noRepairGrants = { requested: [], registry: [] };
export const repairContract = (order) => ({
    workOrderId: order.workOrderId,
    objective: order.objective,
    acceptanceCriteria: [...order.acceptanceCriteria],
    constraints: [...order.constraints],
    nonGoals: [...order.nonGoals],
    requiredEvidence: [...order.requiredEvidence],
});
export const repairHash = (value) => `fnv1a64:${fnv1a64(canonicalStringify(value))}`;
export const repairEqual = (a, b) => canonicalStringify(a) === canonicalStringify(b);
const unique = (values) => [...new Set(values)].sort();
export const repairContains = (surfaces, path) => surfaces.some((surface) => path === surface || path.startsWith(`${surface}/`));
/** Pure derivation: evidence IDs never become filesystem paths or shell prose. */
export function deriveRepairOrder(findingInput, input, grants = noRepairGrants) {
    const needs = (offending, reason) => ({
        kind: "NeedsHuman",
        offending,
        reason,
    });
    if (!findingInput?.evidenceRefs?.length)
        return needs("evidenceRefs", "finding has no evidence references");
    let finding;
    try {
        finding = copyFinding(findingInput);
    }
    catch {
        return needs("finding", "malformed finding");
    }
    if (finding.severity !== "blocking")
        return needs(finding.findingId, "automatic repair requires a blocking finding");
    const limit = input.roundLimit ?? 2;
    if (!Number.isSafeInteger(limit) ||
        limit < 0 ||
        !Number.isSafeInteger(input.round) ||
        input.round < 0 ||
        input.round >= limit)
        return needs("roundLimit", "repair round limit reached or invalid");
    const review = input.reviewItem;
    if (finding.class === "review" && review?.class !== "independent-review")
        return needs(finding.findingId, "review finding requires its host review record");
    const test = input.tests.find((entry) => entry.command === review?.testCommand);
    const criterion = input.criteria.find((entry) => entry.criterionId === review?.criterionId);
    if (review &&
        (!review.itemId ||
            !review.evidenceId ||
            !criterion ||
            !test ||
            test.criterionId !== review.criterionId ||
            !criterion.requiredChecks.includes(test.checkId) ||
            review.subjectRevision !== input.subject.revision ||
            review.criterionId !== finding.criterionId ||
            (review.class !== "independent-review" &&
                (finding.evidenceRefs.length !== 1 ||
                    finding.evidenceRefs[0] !== review.evidenceId)) ||
            review.observed !== finding.observed ||
            review.expected !== finding.expected ||
            (review.class !== "independent-review" &&
                (finding.reproductionSteps.length !== 1 ||
                    finding.reproductionSteps[0] !== review.testCommand)) ||
            (review.class === "independent-review"
                ? finding.class !== "review" ||
                    !repairEqual(review.reviewFinding, finding)
                : review.class === "automated-review"
                    ? !review.path ||
                        !repositoryPath(review.path) ||
                        !Number.isSafeInteger(review.line) ||
                        review.line < 1 ||
                        finding.likelySurface.length !== 1 ||
                        finding.likelySurface[0] !== review.path
                    : review.class !== "ci-failure" ||
                        !review.checkName ||
                        finding.likelySurface.some((surface) => !criterion.codeSurfaces.includes(surface)))))
        return needs(review.itemId, "malformed or foreign host review item");
    // The host item substitutes only for the adverse witness. Scope, tests,
    // authority and round checks below remain the same derivation.
    const evidence = review
        ? [
            {
                evidenceId: review.evidenceId,
                criterionId: review.criterionId,
                subjectRevision: review.subjectRevision,
                outcome: "fail",
                checkId: test.checkId,
                claimType: criterion.claimType,
                source: criterion.evidenceSource,
                codeSurfaces: review.class === "independent-review"
                    ? finding.likelySurface
                    : review.class === "automated-review"
                        ? [review.path]
                        : criterion.codeSurfaces,
                reproductionSteps: [review.testCommand],
                automatedTest: review.testCommand,
                observed: review.observed,
                expected: review.expected,
            },
        ]
        : finding.evidenceRefs.map((id) => input.subject.evidence.find((e) => e.evidenceId === id));
    for (let i = 0; i < evidence.length; i++) {
        const witness = evidence[i];
        if (!witness ||
            witness.criterionId !== finding.criterionId ||
            witness.subjectRevision !== input.subject.revision)
            return needs(finding.evidenceRefs[i], "missing or foreign evidence reference");
    }
    const witnesses = evidence.filter((e) => e !== undefined);
    if (!witnesses.some((e) => e.outcome === "fail" &&
        e.observed === finding.observed &&
        e.expected === finding.expected))
        return needs(finding.findingId, "finding lacks its adverse host witness");
    const surfaces = unique([
        ...finding.likelySurface,
        ...witnesses.flatMap((e) => e.codeSurfaces),
    ]);
    const commands = [];
    for (const step of review?.class === "independent-review"
        ? input.tests
            .filter((test) => test.criterionId === finding.criterionId &&
            criterion.requiredChecks.includes(test.checkId))
            .map((test) => test.command)
        : finding.reproductionSteps) {
        const witness = witnesses.find((e) => e.reproductionSteps.includes(step));
        const command = witness?.hostTest?.command ?? witness?.automatedTest ?? step;
        if (witness?.hostTest && witness.automatedTest !== command)
            return needs(step, "host test command differs from evidence");
        commands.push(command);
    }
    const tests = unique(commands);
    const admitted = [];
    for (const requested of grants.requested) {
        const g = requested.grant;
        if (!g ||
            !g.grantId ||
            !Number.isSafeInteger(g.version) ||
            g.version < 1 ||
            !["operator", "host-policy", "registered-repository"].includes(g.grantedBy) ||
            !g.reason ||
            g.repo !== input.workOrder.repo ||
            !g.effects.length ||
            g.effects.some((e) => e.includes("*") ||
                !input.authorityEnvelope.allowedEffects.includes(e)) ||
            (g.operations ?? []).some((e) => e.includes("*") || !input.workOrder.allowedOperations.includes(e)) ||
            !grants.registry.some((entry) => repairEqual(entry, requested)))
            return needs(g?.grantId ?? "grant", "scope grant is not admitted by the host registry");
        if (admitted.some((entry) => entry.grant.grantId === g.grantId))
            return needs(g.grantId, "duplicate grant");
        admitted.push(requested);
    }
    const used = new Set();
    for (const path of surfaces) {
        if (!repositoryPath(path))
            return needs(path, "invalid repair path");
        if (!repairContains(input.surfaces, path)) {
            const grant = admitted.find((g) => g.surfaces.includes(path) &&
                g.grant.effects.includes("repo.write") &&
                g.grant.operations?.includes("repo.write"));
            if (!grant)
                return needs(path, "path outside original surfaces");
            used.add(grant.grant.grantId);
        }
    }
    for (const command of tests) {
        if (!/^[a-zA-Z0-9_./][a-zA-Z0-9_./-]*(?: [a-zA-Z0-9_./=-]+)*$/u.test(command))
            return needs(command, "reproduction is not an exact named command");
        if (!input.tests.some((test) => test.command === command)) {
            const grant = admitted.find((g) => g.tests.includes(command) &&
                g.grant.effects.includes("shell.run") &&
                g.grant.operations?.includes("shell.run"));
            if (!grant)
                return needs(command, "command outside original named tests");
            used.add(grant.grant.grantId);
        }
    }
    // Every consumed grant is exactly the expansion, not a wildcard authority source.
    for (const g of admitted.filter((g) => used.has(g.grant.grantId))) {
        if (g.surfaces.some((p) => !surfaces.includes(p) || repairContains(input.surfaces, p)) ||
            g.tests.some((c) => !tests.includes(c) || input.tests.some((t) => t.command === c)))
            return needs(g.grant.grantId, "grant scope exceeds the exact expansion");
    }
    const contract = repairContract(input.workOrder);
    const round = input.round + 1;
    const order = {
        workOrder: {
            ...input.workOrder,
            workOrderId: `${input.workOrder.workOrderId}_repair_${round}`,
            knownFacts: [],
            decisions: [],
        },
        authorityEnvelope: input.authorityEnvelope,
        surfaces,
        tests: tests.map((command) => input.tests.find((t) => t.command === command) ?? {
            criterionId: finding.criterionId,
            checkId: `grant:${command}`,
            command,
        }),
        criteria: input.criteria,
        roundLimit: limit,
        contract,
        contractHash: repairHash(contract),
        round,
        executionBaseCommit: input.subject.revision,
        finding,
        grantIds: [...used].sort(),
    };
    // JSON detachment prevents a caller mutating an admitted order after derivation.
    return {
        kind: "derived",
        order: JSON.parse(JSON.stringify(order)),
    };
}
export function repairEvent(state, type) {
    return {
        schemaVersion: 1,
        type,
        actorId: REPAIR_HOST,
        workstreamId: state.workstreamId,
        occurredAt: 0,
        payload: {
            round: state.round,
            finding: state.finding,
        },
    };
}
export function repairCommand(state, kind) {
    return {
        commandId: `cmd_${repairHash([state.workstreamId, state.round, kind]).slice(8)}`,
        workstreamId: state.workstreamId,
        episodeId: `repair_${kind}_${state.round}`,
        intent: {
            kind: "Act",
            effect: kind === "write" ? "repo.write" : "verification.evaluate",
            payload: { round: state.round, kind },
        },
    };
}
export function repairVerificationProgram(state) {
    const command = repairCommand(state, "verify");
    const emit = (type) => Program.Emit(repairEvent(state, type), Program.Done());
    return Program.Invoke(command.commandId, command.intent, {
        completed: Program.Guard({ registryId: "repair.verified", version: 1 }, emit("RepairCompleted"), Program.Guard({ registryId: "repair.remaining", version: 1 }, emit("RepairDerived"), emit("RepairExhausted"))),
    });
}
export function repairRoundProgram(state) {
    const command = repairCommand(state, "write");
    return Program.Sequence([
        Program.Invoke(command.commandId, command.intent, {
            accepted: Program.Done(),
        }),
        Program.Await({ type: "SourceChangeObserved", correlationId: command.commandId }, { kind: "After", delayMs: 180_000 }, Program.Done()),
        repairVerificationProgram(state),
    ]);
}
/** Terminal exhaustion and containment refusals never offer another dispatch. */
export const repairNextAction = (state) => state.status === "running"
    ? "run"
    : state.status === "complete"
        ? "none"
        : "human";
