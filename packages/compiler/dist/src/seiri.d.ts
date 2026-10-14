import type { CompilationEnvironment, CompileResult, LoadoutGraph } from "./types.js";
export declare const SEIRI_MINUTE = 60000;
export declare const SEIRI_PULSE_SCHEDULE = "schedule_seiri_20m";
export declare const SEIRI_QUEUED_PULSE = "schedule_seiri_already_queued";
export declare const seiriPresenceRefs: {
    readonly away: {
        readonly registryId: "operator.away";
        readonly version: 1;
    };
    readonly returned: {
        readonly registryId: "operator.returned";
        readonly version: 1;
    };
    readonly returnEvent: {
        readonly registryId: "operator.return-event";
        readonly version: 1;
    };
};
export declare const seiriSupports: {
    readonly repositoryScope: {
        readonly version: 1;
        readonly semanticsModified: readonly [];
        readonly authorityChanges: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "seiri.repo-scope";
        readonly name: "Bounded repository scope";
        readonly supportedTags: readonly ["observe"];
        readonly requiredCapabilities: readonly ["fixture-repository"];
        readonly semanticsAdded: readonly ["bounded repository scope"];
        readonly emissions: readonly [{
            readonly kind: "work-order";
            readonly emissionId: "scope.constraint";
            readonly field: "constraints";
            readonly values: readonly ["Inspect only the fixture tree"];
            readonly order: 10;
        }, {
            readonly kind: "work-order";
            readonly emissionId: "scope.non-goal";
            readonly field: "nonGoals";
            readonly values: readonly ["Inspect another repository"];
            readonly order: 20;
        }];
        readonly cost: {
            readonly mechanismType: "work-order";
            readonly promptTokens: 0;
            readonly runtimeCost: {
                readonly quantity: 0;
                readonly unit: "operations";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly restrictions: readonly ["Inspect only the bounded fixture repository"];
        };
    };
    readonly readOnly: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly supportFacetId: "seiri.read-only";
        readonly name: "Read only";
        readonly supportedTags: readonly ["observe", "plan"];
        readonly semanticsAdded: readonly ["never delete", "read only"];
        readonly authorityChanges: readonly ["deny repo.delete", "deny repo.write"];
        readonly emissions: readonly [{
            readonly kind: "work-order";
            readonly emissionId: "read-only.decision";
            readonly field: "decisions";
            readonly values: readonly ["Deletion remains operator-owned"];
            readonly order: 10;
        }, {
            readonly kind: "work-order";
            readonly emissionId: "read-only.constraint";
            readonly field: "constraints";
            readonly values: readonly ["Do not mutate repository contents"];
            readonly order: 20;
        }, {
            readonly kind: "work-order";
            readonly emissionId: "read-only.non-goal";
            readonly field: "nonGoals";
            readonly values: readonly ["Delete files"];
            readonly order: 10;
        }, {
            readonly kind: "permission-guard";
            readonly emissionId: "read-only.permissions";
            readonly allowedOperations: readonly [];
            readonly prohibitedOperations: readonly ["repo.delete", "repo.write"];
            readonly allowedEffects: readonly [];
            readonly deniedEffects: readonly ["repo.delete", "repo.write"];
        }];
        readonly claims: readonly [{
            readonly claimId: "read-only.delete";
            readonly target: "authority.repo.delete";
            readonly value: "deny";
            readonly layer: "hard-permissions";
            readonly hard: true;
        }];
        readonly cost: {
            readonly mechanismType: "permission-guard";
            readonly promptTokens: 0;
            readonly runtimeCost: {
                readonly quantity: 1;
                readonly unit: "guard-checks-per-effect";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly restrictions: readonly ["Do not mutate repository contents", "Deletion remains operator-owned"];
        };
    };
    readonly evidenceCapture: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly authorityChanges: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "seiri.evidence-capture";
        readonly name: "Evidence capture";
        readonly supportedTags: readonly ["observe", "verify"];
        readonly semanticsAdded: readonly ["attach evidence"];
        readonly evidenceRequirements: readonly ["inventory", "classification", "reference-analysis"];
        readonly emissions: readonly [{
            readonly kind: "work-order";
            readonly emissionId: "evidence.acceptance";
            readonly field: "acceptanceCriteria";
            readonly values: readonly ["Attach reference evidence to every candidate"];
            readonly order: 30;
        }, {
            readonly kind: "evidence-schema";
            readonly emissionId: "evidence.schema";
            readonly schemaId: "seiri.candidates.v1";
            readonly schema: {
                readonly type: "array";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["path", "classification", "evidence"];
                };
            };
            readonly outputContract: {
                readonly type: "CommandResult";
                readonly result: "candidates";
                readonly candidateFields: readonly ["path", "classification", "evidence"];
            };
        }];
        readonly cost: {
            readonly mechanismType: "evidence-schema";
            readonly promptTokens: 0;
            readonly runtimeCost: {
                readonly quantity: 1;
                readonly unit: "schema-validations-per-result";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly obligations: readonly ["Attach inventory, classification, and reference evidence to every candidate"];
        };
    };
    readonly absenceCadence: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "seiri.absence-cadence";
        readonly name: "Absent-only cadence";
        readonly supportedTags: readonly ["schedule"];
        readonly semanticsAdded: readonly ["active only while operator is absent", "interrupt on operator return", "re-evaluate every 20 virtual minutes"];
        readonly authorityChanges: readonly ["revoke inspection on operator return"];
        readonly emissions: readonly [{
            readonly kind: "cadence";
            readonly emissionId: "absence.cadence";
            readonly cadenceId: "seiri.every-20m-until-return";
            readonly scheduleId: "schedule_seiri_20m";
            readonly queuedScheduleId: "schedule_seiri_already_queued";
            readonly queuedDelayMs: 7;
            readonly cadence: {
                readonly kind: "Until";
                readonly cadence: {
                    readonly kind: "Gate";
                    readonly cadence: {
                        readonly kind: "Every";
                        readonly intervalMs: number;
                    };
                    readonly conditionRef: {
                        readonly registryId: "operator.away";
                        readonly version: 1;
                    };
                };
                readonly conditionRef: {
                    readonly registryId: "operator.returned";
                    readonly version: 1;
                };
            };
            readonly cancelOn: readonly [{
                readonly registryId: "operator.returned";
                readonly version: 1;
            }];
        }, {
            readonly kind: "statechart-gate";
            readonly emissionId: "absence.guard";
            readonly activationCondition: {
                readonly registryId: "operator.away";
                readonly version: 1;
            };
            readonly interruptionCondition: {
                readonly registryId: "operator.returned";
                readonly version: 1;
            };
            readonly authorityRevocationCondition: {
                readonly registryId: "operator.return-event";
                readonly version: 1;
            };
        }];
        readonly cost: {
            readonly mechanismType: "statechart-gate";
            readonly promptTokens: 0;
            readonly runtimeCost: {
                readonly quantity: 2;
                readonly unit: "predicate-evaluations-per-pulse";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly passive: readonly ["Active only while the operator is absent"];
            readonly pulse: readonly ["Re-evaluate every 20 virtual minutes"];
            readonly interrupt: readonly ["Stop on operator return; queued pulses become a traced NoOp"];
        };
    };
    readonly independentVerification: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly authorityChanges: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "seiri.independent-verification";
        readonly name: "Independent verification";
        readonly supportedTags: readonly ["verify"];
        readonly semanticsAdded: readonly ["independent verification"];
        readonly emissions: readonly [{
            readonly kind: "verifier-episode";
            readonly emissionId: "verification.candidates";
            readonly episodeId: "seiri-candidate-verifier";
            readonly subject: "candidates";
            readonly required: true;
        }];
        readonly cost: {
            readonly mechanismType: "verifier-episode";
            readonly promptTokens: 0;
            readonly runtimeCost: {
                readonly quantity: 1;
                readonly unit: "verifier-dispatches";
            };
            readonly extraEpisodes: 1;
        };
        readonly inspection: {
            readonly obligations: readonly ["Independently verify proposed candidates"];
        };
    };
};
export declare const seiriLoadout: LoadoutGraph;
export declare const seiriCodeDslView: import("./types.js").CodeDslView;
export declare const seiriFunctionTableView: import("./types.js").FunctionTableView;
export declare const seiriStatechartJsonView: import("./types.js").StatechartJsonView;
export declare const seiriEnvironment: (baseCommit?: string) => CompilationEnvironment;
export declare const compileSeiri: (baseCommit?: string) => CompileResult;
