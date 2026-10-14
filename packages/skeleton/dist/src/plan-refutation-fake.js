export const cannedPlanDrift = (subject) => ({
    orders: subject.orders.map((order, i) => ({
        workOrderId: order.workOrderId,
        verdict: i === 0 ? "drift" : "thesis-advancing",
        thesis: i === 0
            ? subject.standard.exclusions[0].id
            : subject.standard.theses[0].id,
        capabilityRow: i === 0 ? null : "new:fixture.capability",
        rolesServed: [subject.standard.roles[0]],
        reason: "Synthetic fixture finding; not a judgment about the repository.",
    })),
    largestGap: {
        thesis: subject.standard.theses[0].id,
        workOrderId: subject.orders[0].workOrderId,
        criterionId: subject.orders[0].criteria[0].id,
        reason: "Synthetic fixture gap.",
    },
    planVerdict: "hold",
    holdReasons: [
        {
            workOrderId: subject.orders[0].workOrderId,
            criterionId: subject.orders[0].criteria[0].id,
            reason: "Synthetic drift in the first criterion.",
        },
    ],
});
export const cannedGoalReview = (subject) => ({
    schemaVersion: "plan-goal-review-v1",
    orders: subject.orders.map((order) => ({
        workOrderId: order.workOrderId,
        verdict: "aligned",
        criticalPathAndNoOp: "Synthetic fixture gate; no observed NoOp cost.",
        systemTraps: "Synthetic fixture considers all eight system traps.",
        removalBalance: "Unknown fixture process cost; no structural hold.",
        failureBehavior: "Synthetic fixture retains the previous behavior.",
        findings: [],
    })),
    planVerdict: "aligned",
    holdReasons: [],
});
export class FakePlanRefutationTransport {
    result;
    name = "fake";
    harnessVersion = "fixture-v1";
    constructor(result = (subject) => subject.goalReview ? cannedGoalReview(subject) : cannedPlanDrift(subject)) {
        this.result = result;
    }
    dispatch(request, now) {
        return {
            receipt: Promise.resolve({
                commandId: request.command.commandId,
                transport: this.name,
                acceptedAt: now(),
            }),
            completed: Promise.resolve(this.result(request.subject)),
            alive: () => false,
            kill: () => { },
        };
    }
}
