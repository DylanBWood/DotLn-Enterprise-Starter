import { type CompiledProgram, type LoadoutGraph } from "@dotln/compiler";
import { Cadence, Program, type ActIntent, type ResultEnvelope } from "@dotln/kernel";
export declare const ENTROPY_REDUCER_ACTOR_ID = "entropy-reducer";
export declare const ENTROPY_REDUCER_WORKSTREAM_ID = "ws_entropy_reducer";
export declare const ENTROPY_REDUCER_WORK_ORDER_ID = "wo_entropy_review_1";
export declare const ENTROPY_REDUCER_REFERENCE_EPISODE_ID = "ep_entropy_reducer_reference";
export declare const ENTROPY_REDUCER_REFERENCE_DISPATCH_AT = 0;
export declare const ENTROPY_REDUCER_REFERENCE_EPISODE_ENDS_AT = 86400000;
export declare const ENTROPY_REDUCER_REVIEWER_MODEL = "claude-opus-5-5";
export declare const ENTROPY_REDUCER_REVIEWER_EFFORT = "xhigh";
export declare const ENTROPY_REDUCER_ALLOWED_EFFECTS: readonly ["repo.read*", "probe.run:scratch*", "intake.capture", "report.emit"];
export declare const ENTROPY_REDUCER_DENIED_EFFECTS: readonly ["repo.write*", "git.mutate*", "remote.*", "settings.*", "decision.edit"];
export interface EntropyReducerMask {
    readonly mask: "Whiteface" | "Contra-Auguste" | "Watcher" | "Lazzi";
    readonly assignment: string;
    readonly guardedFailureMode: string;
    readonly guard: string;
}
export declare const entropyReducerMasks: readonly [{
    readonly mask: "Whiteface";
    readonly assignment: "planning judgment and rule keeping";
    readonly guardedFailureMode: "over-centralization";
    readonly guard: "Treat authority as a boundary, never as proof that a judgment is correct.";
}, {
    readonly mask: "Contra-Auguste";
    readonly assignment: "blinded self-refutation";
    readonly guardedFailureMode: "destructive contrarianism";
    readonly guard: "Remove a finding that does not survive its independent reproduction instead of defending it.";
}, {
    readonly mask: "Watcher";
    readonly assignment: "whole-episode observation";
    readonly guardedFailureMode: "unattributed inference";
    readonly guard: "Label what was measured and what was established only by inspection.";
}, {
    readonly mask: "Lazzi";
    readonly assignment: "bounded read-only lens checklist";
    readonly guardedFailureMode: "lens budget creep";
    readonly guard: "Work the fixed lens checklist serially, respecting every word budget and no-fix boundary.";
}];
export interface LensBrief {
    readonly lensId: string;
    readonly files: readonly string[];
    readonly questions: readonly string[];
    readonly outputShape: readonly string[];
    readonly wordBudget: number;
    readonly noFix: true;
}
export declare const entropyReducerLensBriefs: readonly [{
    readonly lensId: "architecture-and-semantics";
    readonly files: readonly ["docs/product/", "docs/decisions/", "docs/lineage/idea-ledger.md"];
    readonly questions: readonly ["Where do implementation and durable product doctrine disagree?", "Which settled decision is accidentally being relitigated or bypassed?"];
    readonly outputShape: readonly ["criterion", "severity", "observed", "expected", "reproduction", "evidenceRefs", "surface"];
    readonly wordBudget: 650;
    readonly noFix: true;
}, {
    readonly lensId: "runtime-and-authority";
    readonly files: readonly ["packages/", "scripts/"];
    readonly questions: readonly ["Where can an effect escape its declared authority or resource budget?", "Which runtime path diverges from its compiled contract?"];
    readonly outputShape: readonly ["criterion", "severity", "observed", "expected", "reproduction", "evidenceRefs", "surface"];
    readonly wordBudget: 650;
    readonly noFix: true;
}, {
    readonly lensId: "verification-and-evidence";
    readonly files: readonly ["packages/", "corpus/", "docs/verifications/"];
    readonly questions: readonly ["Which acceptance claim lacks an executable witness or meaningful negative control?", "Where does a receipt overstate what its cited evidence establishes?"];
    readonly outputShape: readonly ["criterion", "severity", "observed", "expected", "reproduction", "evidenceRefs", "surface"];
    readonly wordBudget: 650;
    readonly noFix: true;
}, {
    readonly lensId: "maintainability-and-friction";
    readonly files: readonly ["README.md", "docs/PLAYBOOK.md", "docs/product/", "docs/publication/", "docs/planning/", "docs/work-orders/", "packages/", "scripts/"];
    readonly questions: readonly ["Which repeated operator or contributor cost should be standardized?", "Where is accidental complexity exported to a later actor?"];
    readonly outputShape: readonly ["criterion", "severity", "observed", "expected", "reproduction", "evidenceRefs", "surface"];
    readonly wordBudget: 650;
    readonly noFix: true;
}];
export declare const lensBriefSchema: {
    readonly $id: "dotln.entropy-reducer.lens-brief.v1";
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["lensId", "files", "questions", "outputShape", "wordBudget", "noFix"];
    readonly properties: {
        readonly lensId: {
            readonly type: "string";
            readonly minLength: 1;
        };
        readonly files: {
            readonly type: "array";
            readonly minItems: 1;
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
            };
            readonly $comment: "The host validator also normalizes separators and case and rejects broad, parent-traversing, absolute, backslash, and docs/intake scopes.";
        };
        readonly questions: {
            readonly type: "array";
            readonly minItems: 1;
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly outputShape: {
            readonly type: "array";
            readonly minItems: 1;
            readonly items: {
                readonly type: "string";
                readonly minLength: 1;
            };
        };
        readonly wordBudget: {
            readonly type: "integer";
            readonly minimum: 1;
        };
        readonly noFix: {
            readonly const: true;
        };
    };
};
export type FindingSeverity = "blocking" | "major" | "minor";
export type FindingEvidenceLabel = "measured" | "by inspection";
export type StandardizationRung = "test" | "lint" | "guard" | "script" | "not-applicable";
export type NonEmptyStrings = readonly [string, ...string[]];
export type FindingReproduction = Readonly<{
    kind: "command";
    command: string;
}> | Readonly<{
    kind: "inspection";
    steps: NonEmptyStrings;
}>;
interface VerificationFindingBase {
    readonly findingId: string;
    readonly criterion: string;
    readonly severity: FindingSeverity;
    readonly observed: string;
    readonly expected: string;
    readonly evidenceRefs: NonEmptyStrings;
    readonly surface: string;
    readonly altitude: number;
    readonly standardization: Readonly<{
        kind: "one-off";
    }> | Readonly<{
        kind: "recurring";
        rung: Exclude<StandardizationRung, "not-applicable">;
        rationale: string;
    }>;
}
export type VerificationFinding = (VerificationFindingBase & Readonly<{
    evidenceLabel: "measured";
    reproduction: Readonly<{
        kind: "command";
        command: string;
    }>;
}>) | (VerificationFindingBase & Readonly<{
    evidenceLabel: "by inspection";
    reproduction: Readonly<{
        kind: "inspection";
        steps: NonEmptyStrings;
    }>;
}>);
export interface ProductSuggestion {
    readonly suggestionId: string;
    readonly submittedBy: string;
    readonly problemOrOpportunity: string;
    readonly scope: string;
    readonly evidenceRefs: readonly string[];
    readonly affectedUsers: readonly string[];
    readonly affectedSystems: readonly string[];
    readonly expectedValue: string;
    readonly altitude: number;
    readonly uncertainty: string;
    readonly risks: readonly string[];
    readonly alternatives: readonly string[];
    readonly duplicationHints: readonly string[];
    readonly urgencyRationale: string;
}
export interface ProductSuggestionPacket {
    readonly schemaVersion: 1;
    readonly kind: "ProductSuggestionPacket";
    readonly proposedPath: string;
    readonly sourceEpisodeId: string;
    readonly provenance: NonEmptyStrings;
    readonly corroboratingEvidenceRefs: readonly string[];
    readonly dissentingEvidenceRefs: readonly string[];
    readonly suggestion: ProductSuggestion;
}
export interface CleanRoomResult {
    readonly status: "passed";
    readonly stopConditionsFound: false;
    readonly evidenceRefs: readonly string[];
}
export interface ReviewerOutput {
    readonly schemaVersion: 1;
    readonly findings: readonly VerificationFinding[];
    readonly proposalPackets: readonly ProductSuggestionPacket[];
    readonly resultEnvelope: ResultEnvelope;
    readonly cleanRoom: CleanRoomResult;
}
export declare const reviewerOutputContract: {
    readonly $id: "dotln.entropy-reducer.output.v1";
    readonly type: "object";
    readonly additionalProperties: false;
    readonly required: readonly ["schemaVersion", "findings", "proposalPackets", "resultEnvelope", "cleanRoom"];
    readonly properties: {
        readonly schemaVersion: {
            readonly const: 1;
        };
        readonly findings: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["findingId", "criterion", "severity", "evidenceLabel", "observed", "expected", "reproduction", "evidenceRefs", "surface", "altitude", "standardization"];
                readonly properties: {
                    readonly findingId: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly criterion: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly severity: {
                        readonly enum: readonly ["blocking", "major", "minor"];
                    };
                    readonly evidenceLabel: {
                        readonly enum: readonly ["measured", "by inspection"];
                    };
                    readonly observed: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly expected: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly reproduction: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "command"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "command";
                                };
                                readonly command: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "steps"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "inspection";
                                };
                                readonly steps: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            };
                        }];
                    };
                    readonly evidenceRefs: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly surface: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly altitude: {
                        readonly type: "integer";
                        readonly minimum: 2;
                        readonly maximum: 12;
                    };
                    readonly standardization: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "one-off";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "rung", "rationale"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "recurring";
                                };
                                readonly rung: {
                                    readonly enum: readonly ["test", "lint", "guard", "script"];
                                };
                                readonly rationale: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        }];
                    };
                };
                readonly oneOf: readonly [{
                    readonly properties: {
                        readonly evidenceLabel: {
                            readonly const: "measured";
                        };
                        readonly reproduction: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "command"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "command";
                                };
                                readonly command: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        };
                    };
                }, {
                    readonly properties: {
                        readonly evidenceLabel: {
                            readonly const: "by inspection";
                        };
                        readonly reproduction: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "steps"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "inspection";
                                };
                                readonly steps: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            };
                        };
                    };
                }];
            };
        };
        readonly proposalPackets: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["schemaVersion", "kind", "proposedPath", "sourceEpisodeId", "provenance", "corroboratingEvidenceRefs", "dissentingEvidenceRefs", "suggestion"];
                readonly properties: {
                    readonly schemaVersion: {
                        readonly const: 1;
                    };
                    readonly kind: {
                        readonly const: "ProductSuggestionPacket";
                    };
                    readonly proposedPath: {
                        readonly type: "string";
                        readonly minLength: 1;
                        readonly pattern: "^docs/proposals/(?!\\.{1,2}/$)[A-Za-z0-9][A-Za-z0-9._-]*/$";
                        readonly $comment: "The host validator also requires the final segment to equal suggestion.suggestionId.";
                    };
                    readonly sourceEpisodeId: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly provenance: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly corroboratingEvidenceRefs: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly dissentingEvidenceRefs: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly suggestion: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["suggestionId", "submittedBy", "problemOrOpportunity", "scope", "evidenceRefs", "affectedUsers", "affectedSystems", "expectedValue", "altitude", "uncertainty", "risks", "alternatives", "duplicationHints", "urgencyRationale"];
                        readonly properties: {
                            readonly suggestionId: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly pattern: "^(?!\\.{1,2}$)[A-Za-z0-9][A-Za-z0-9._-]*$";
                            };
                            readonly submittedBy: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly problemOrOpportunity: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly scope: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly evidenceRefs: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly affectedUsers: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly affectedSystems: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly expectedValue: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly altitude: {
                                readonly type: "integer";
                                readonly minimum: 2;
                                readonly maximum: 12;
                            };
                            readonly uncertainty: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly risks: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly alternatives: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly duplicationHints: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                            readonly urgencyRationale: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                        };
                    };
                };
            };
        };
        readonly resultEnvelope: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["workOrderId", "episodeId", "status", "resultId", "summary", "requiresHuman"];
            readonly properties: {
                readonly workOrderId: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly episodeId: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly status: {
                    readonly enum: readonly ["completed", "failed", "blocked"];
                };
                readonly resultId: {
                    readonly type: "string";
                    readonly minLength: 1;
                };
                readonly summary: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly $comment: "The host validator requires fewer than 200 whitespace-delimited words.";
                };
                readonly requiresHuman: {
                    readonly type: "boolean";
                };
            };
        };
        readonly cleanRoom: {
            readonly type: "object";
            readonly additionalProperties: false;
            readonly required: readonly ["status", "stopConditionsFound", "evidenceRefs"];
            readonly properties: {
                readonly status: {
                    readonly const: "passed";
                };
                readonly stopConditionsFound: {
                    readonly const: false;
                };
                readonly evidenceRefs: {
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly items: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                };
            };
        };
    };
};
export declare const entropyReducerSupports: {
    readonly standardize: {
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
        readonly supportFacetId: "entropy-reducer.seiketsu-standardize";
        readonly name: "Seiketsu (Standardize)";
        readonly supportedTags: readonly ["plan"];
        readonly semanticsAdded: readonly ["route every recurring finding to a test, lint, guard, or script rung"];
        readonly emissions: readonly [{
            readonly kind: "work-order";
            readonly emissionId: "standardize.acceptance";
            readonly field: "acceptanceCriteria";
            readonly values: readonly ["Route every recurring finding to a proposed test, lint, guard, or script rung"];
            readonly order: 10;
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "standardize.residue";
            readonly text: "Convert repetition into a cheaper executable standard.";
        }];
        readonly cost: {
            readonly mechanismType: "work-order";
            readonly promptTokens: 24;
            readonly runtimeCost: {
                readonly quantity: 0;
                readonly unit: "effects";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly obligations: readonly ["Name the cheapest executable rung for every recurring finding"];
        };
    };
    readonly verifyFirst: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly authorityChanges: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "entropy-reducer.verify-first";
        readonly name: "Verify-First";
        readonly supportedTags: readonly ["verify"];
        readonly semanticsAdded: readonly ["label each finding measured or by inspection", "attach an independent reproduction command"];
        readonly evidenceRequirements: readonly ["reproduction"];
        readonly emissions: readonly [{
            readonly kind: "evidence-schema";
            readonly emissionId: "verify-first.finding-schema";
            readonly schemaId: "dotln.entropy-reducer.finding.v1";
            readonly schema: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["findingId", "criterion", "severity", "evidenceLabel", "observed", "expected", "reproduction", "evidenceRefs", "surface", "altitude", "standardization"];
                readonly properties: {
                    readonly findingId: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly criterion: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly severity: {
                        readonly enum: readonly ["blocking", "major", "minor"];
                    };
                    readonly evidenceLabel: {
                        readonly enum: readonly ["measured", "by inspection"];
                    };
                    readonly observed: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly expected: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly reproduction: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "command"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "command";
                                };
                                readonly command: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "steps"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "inspection";
                                };
                                readonly steps: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            };
                        }];
                    };
                    readonly evidenceRefs: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly surface: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly altitude: {
                        readonly type: "integer";
                        readonly minimum: 2;
                        readonly maximum: 12;
                    };
                    readonly standardization: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "one-off";
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "rung", "rationale"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "recurring";
                                };
                                readonly rung: {
                                    readonly enum: readonly ["test", "lint", "guard", "script"];
                                };
                                readonly rationale: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        }];
                    };
                };
                readonly oneOf: readonly [{
                    readonly properties: {
                        readonly evidenceLabel: {
                            readonly const: "measured";
                        };
                        readonly reproduction: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "command"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "command";
                                };
                                readonly command: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        };
                    };
                }, {
                    readonly properties: {
                        readonly evidenceLabel: {
                            readonly const: "by inspection";
                        };
                        readonly reproduction: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["kind", "steps"];
                            readonly properties: {
                                readonly kind: {
                                    readonly const: "inspection";
                                };
                                readonly steps: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                            };
                        };
                    };
                }];
            };
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "verify-first.residue";
            readonly text: "Measure before concluding, label inspection honestly, and give every finding a runnable reproduction.";
        }];
        readonly cost: {
            readonly mechanismType: "evidence-schema";
            readonly promptTokens: 42;
            readonly runtimeCost: {
                readonly quantity: 1;
                readonly unit: "validation-per-output";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly obligations: readonly ["Every finding carries reproduction and evidence refs"];
        };
    };
    readonly lensChecklist: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "entropy-reducer.lens-checklist";
        readonly name: "Lens Checklist";
        readonly supportedTags: readonly ["observe"];
        readonly semanticsAdded: readonly ["work at most four read-only lenses serially with fixed briefs and word budgets"];
        readonly authorityChanges: readonly [];
        readonly emissions: readonly [{
            readonly kind: "evidence-schema";
            readonly emissionId: "lens-checklist.lens-brief-schema";
            readonly schemaId: "dotln.entropy-reducer.lens-brief.v1";
            readonly schema: {
                readonly $id: "dotln.entropy-reducer.lens-brief.v1";
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["lensId", "files", "questions", "outputShape", "wordBudget", "noFix"];
                readonly properties: {
                    readonly lensId: {
                        readonly type: "string";
                        readonly minLength: 1;
                    };
                    readonly files: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                        readonly $comment: "The host validator also normalizes separators and case and rejects broad, parent-traversing, absolute, backslash, and docs/intake scopes.";
                    };
                    readonly questions: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly outputShape: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                            readonly minLength: 1;
                        };
                    };
                    readonly wordBudget: {
                        readonly type: "integer";
                        readonly minimum: 1;
                    };
                    readonly noFix: {
                        readonly const: true;
                    };
                };
            };
        }, {
            readonly kind: "work-order";
            readonly emissionId: "lens-checklist.constraint";
            readonly field: "constraints";
            readonly values: readonly ["Work at most four read-only lenses serially as the reviewer; every checklist item declares files, questions, output shape, word budget, and no-fix"];
            readonly order: 20;
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "lens-checklist.residue";
            readonly text: "Work the lens briefs as your own checklist, serially, and synthesize their evidence.";
        }];
        readonly cost: {
            readonly mechanismType: "work-order";
            readonly promptTokens: 38;
            readonly runtimeCost: {
                readonly quantity: 4;
                readonly unit: "lens-checklist-items-maximum";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly restrictions: readonly ["At most four no-fix, read-only lens checklist items"];
        };
    };
    readonly mutationDrill: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "entropy-reducer.mutation-drill";
        readonly name: "Mutation Drill";
        readonly supportedTags: readonly ["verify"];
        readonly semanticsAdded: readonly ["challenge evidence with bounded perturbations in a scratch copy"];
        readonly authorityChanges: readonly ["permit probe.run:scratch* only outside the tracked tree"];
        readonly emissions: readonly [{
            readonly kind: "verifier-episode";
            readonly emissionId: "mutation-drill.refutation";
            readonly episodeId: "entropy-reducer-contra-auguste";
            readonly subject: "review-findings";
            readonly required: true;
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "mutation-drill.residue";
            readonly text: "Attempt to falsify findings from their reproduction commands in an isolated scratch copy.";
        }];
        readonly cost: {
            readonly mechanismType: "verifier-episode";
            readonly promptTokens: 28;
            readonly runtimeCost: {
                readonly quantity: 32;
                readonly unit: "scratch-probes-maximum";
            };
            readonly extraEpisodes: 1;
        };
        readonly inspection: {
            readonly obligations: readonly ["Refute independently before promoting findings"];
        };
    };
    readonly shapeFirst: {
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly authorityChanges: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly version: 2;
        readonly supportFacetId: "entropy-reducer.shape-first";
        readonly name: "Shape-First";
        readonly supportedTags: readonly ["research", "plan"];
        readonly semanticsAdded: readonly ["transfer an operator analogy's intended relationship before evaluating load-bearing literal details"];
        readonly emissions: readonly [{
            readonly kind: "prompt-fragment";
            readonly emissionId: "shape-first.residue";
            readonly text: "For an operator analogy, extract the intended relationship first and carry that useful relation across mechanisms; evaluate a literal detail only when a claim depends on it.";
        }];
        readonly cost: {
            readonly mechanismType: "prompt-fragment";
            readonly promptTokens: 34;
            readonly runtimeCost: {
                readonly quantity: 0;
                readonly unit: "effects";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly obligations: readonly ["Preserve the intended relationship first; examine literal details only when load-bearing"];
        };
    };
    readonly constraintFirst: {
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
        readonly supportFacetId: "entropy-reducer.constraint-first-ordering";
        readonly name: "Constraint-First Ordering";
        readonly supportedTags: readonly ["plan"];
        readonly semanticsAdded: readonly ["order proposals by the currently evidenced constraint before local polish"];
        readonly emissions: readonly [{
            readonly kind: "prompt-fragment";
            readonly emissionId: "constraint-first.residue";
            readonly text: "Identify the evidenced system constraint before ordering recommendations; do not mistake priority for authority.";
        }];
        readonly cost: {
            readonly mechanismType: "prompt-fragment";
            readonly promptTokens: 27;
            readonly runtimeCost: {
                readonly quantity: 0;
                readonly unit: "effects";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly passive: readonly ["Constraint-first proposal ordering"];
        };
    };
    readonly altitudeTag: {
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
        readonly supportFacetId: "entropy-reducer.altitude-tag";
        readonly name: "Altitude Tag";
        readonly supportedTags: readonly ["observe", "plan"];
        readonly semanticsAdded: readonly ["tag every finding and proposal with its mechanism altitude"];
        readonly emissions: readonly [{
            readonly kind: "work-order";
            readonly emissionId: "altitude.acceptance";
            readonly field: "acceptanceCriteria";
            readonly values: readonly ["Tag every finding with a Meadows mechanism altitude from 12 through 2"];
            readonly order: 30;
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "altitude.residue";
            readonly text: "Name the intervention altitude and prefer the highest supported mechanism over repeated parameter patching.";
        }];
        readonly cost: {
            readonly mechanismType: "work-order";
            readonly promptTokens: 24;
            readonly runtimeCost: {
                readonly quantity: 0;
                readonly unit: "effects";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly obligations: readonly ["Tag the likely surface and intervention altitude"];
        };
    };
    readonly sparseReceipt: {
        readonly version: 1;
        readonly requiredCapabilities: readonly [];
        readonly semanticsModified: readonly [];
        readonly evidenceRequirements: readonly [];
        readonly resourceMultiplier: 1;
        readonly conflictsWith: readonly [];
        readonly preservesDeterminism: true;
        readonly commutativity: "commutative";
        readonly claims: readonly [];
        readonly supportFacetId: "entropy-reducer.sparse-receipt";
        readonly name: "Sparse Receipt";
        readonly supportedTags: readonly ["narrate"];
        readonly semanticsAdded: readonly ["return a terse result envelope while retaining findings and suggestions by reference"];
        readonly authorityChanges: readonly ["validate typed output before report.emit"];
        readonly emissions: readonly [{
            readonly kind: "evidence-schema";
            readonly emissionId: "sparse-receipt.output-schema";
            readonly schemaId: "dotln.entropy-reducer.output.v1";
            readonly schema: {
                readonly $id: "dotln.entropy-reducer.output.v1";
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["schemaVersion", "findings", "proposalPackets", "resultEnvelope", "cleanRoom"];
                readonly properties: {
                    readonly schemaVersion: {
                        readonly const: 1;
                    };
                    readonly findings: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["findingId", "criterion", "severity", "evidenceLabel", "observed", "expected", "reproduction", "evidenceRefs", "surface", "altitude", "standardization"];
                            readonly properties: {
                                readonly findingId: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly criterion: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly severity: {
                                    readonly enum: readonly ["blocking", "major", "minor"];
                                };
                                readonly evidenceLabel: {
                                    readonly enum: readonly ["measured", "by inspection"];
                                };
                                readonly observed: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly expected: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly reproduction: {
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "command"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "command";
                                            };
                                            readonly command: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "steps"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "inspection";
                                            };
                                            readonly steps: {
                                                readonly type: "array";
                                                readonly minItems: 1;
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                };
                                            };
                                        };
                                    }];
                                };
                                readonly evidenceRefs: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly surface: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly altitude: {
                                    readonly type: "integer";
                                    readonly minimum: 2;
                                    readonly maximum: 12;
                                };
                                readonly standardization: {
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "one-off";
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "rung", "rationale"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "recurring";
                                            };
                                            readonly rung: {
                                                readonly enum: readonly ["test", "lint", "guard", "script"];
                                            };
                                            readonly rationale: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    }];
                                };
                            };
                            readonly oneOf: readonly [{
                                readonly properties: {
                                    readonly evidenceLabel: {
                                        readonly const: "measured";
                                    };
                                    readonly reproduction: {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "command"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "command";
                                            };
                                            readonly command: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    };
                                };
                            }, {
                                readonly properties: {
                                    readonly evidenceLabel: {
                                        readonly const: "by inspection";
                                    };
                                    readonly reproduction: {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "steps"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "inspection";
                                            };
                                            readonly steps: {
                                                readonly type: "array";
                                                readonly minItems: 1;
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                };
                                            };
                                        };
                                    };
                                };
                            }];
                        };
                    };
                    readonly proposalPackets: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["schemaVersion", "kind", "proposedPath", "sourceEpisodeId", "provenance", "corroboratingEvidenceRefs", "dissentingEvidenceRefs", "suggestion"];
                            readonly properties: {
                                readonly schemaVersion: {
                                    readonly const: 1;
                                };
                                readonly kind: {
                                    readonly const: "ProductSuggestionPacket";
                                };
                                readonly proposedPath: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly pattern: "^docs/proposals/(?!\\.{1,2}/$)[A-Za-z0-9][A-Za-z0-9._-]*/$";
                                    readonly $comment: "The host validator also requires the final segment to equal suggestion.suggestionId.";
                                };
                                readonly sourceEpisodeId: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly provenance: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly corroboratingEvidenceRefs: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly dissentingEvidenceRefs: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly suggestion: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["suggestionId", "submittedBy", "problemOrOpportunity", "scope", "evidenceRefs", "affectedUsers", "affectedSystems", "expectedValue", "altitude", "uncertainty", "risks", "alternatives", "duplicationHints", "urgencyRationale"];
                                    readonly properties: {
                                        readonly suggestionId: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                            readonly pattern: "^(?!\\.{1,2}$)[A-Za-z0-9][A-Za-z0-9._-]*$";
                                        };
                                        readonly submittedBy: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly problemOrOpportunity: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly scope: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly evidenceRefs: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly affectedUsers: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly affectedSystems: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly expectedValue: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly altitude: {
                                            readonly type: "integer";
                                            readonly minimum: 2;
                                            readonly maximum: 12;
                                        };
                                        readonly uncertainty: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly risks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly alternatives: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly duplicationHints: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly urgencyRationale: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    readonly resultEnvelope: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["workOrderId", "episodeId", "status", "resultId", "summary", "requiresHuman"];
                        readonly properties: {
                            readonly workOrderId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly episodeId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly status: {
                                readonly enum: readonly ["completed", "failed", "blocked"];
                            };
                            readonly resultId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly summary: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly $comment: "The host validator requires fewer than 200 whitespace-delimited words.";
                            };
                            readonly requiresHuman: {
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly cleanRoom: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["status", "stopConditionsFound", "evidenceRefs"];
                        readonly properties: {
                            readonly status: {
                                readonly const: "passed";
                            };
                            readonly stopConditionsFound: {
                                readonly const: false;
                            };
                            readonly evidenceRefs: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        };
                    };
                };
            };
            readonly outputContract: {
                readonly $id: "dotln.entropy-reducer.output.v1";
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["schemaVersion", "findings", "proposalPackets", "resultEnvelope", "cleanRoom"];
                readonly properties: {
                    readonly schemaVersion: {
                        readonly const: 1;
                    };
                    readonly findings: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["findingId", "criterion", "severity", "evidenceLabel", "observed", "expected", "reproduction", "evidenceRefs", "surface", "altitude", "standardization"];
                            readonly properties: {
                                readonly findingId: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly criterion: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly severity: {
                                    readonly enum: readonly ["blocking", "major", "minor"];
                                };
                                readonly evidenceLabel: {
                                    readonly enum: readonly ["measured", "by inspection"];
                                };
                                readonly observed: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly expected: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly reproduction: {
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "command"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "command";
                                            };
                                            readonly command: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "steps"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "inspection";
                                            };
                                            readonly steps: {
                                                readonly type: "array";
                                                readonly minItems: 1;
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                };
                                            };
                                        };
                                    }];
                                };
                                readonly evidenceRefs: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly surface: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly altitude: {
                                    readonly type: "integer";
                                    readonly minimum: 2;
                                    readonly maximum: 12;
                                };
                                readonly standardization: {
                                    readonly oneOf: readonly [{
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "one-off";
                                            };
                                        };
                                    }, {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "rung", "rationale"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "recurring";
                                            };
                                            readonly rung: {
                                                readonly enum: readonly ["test", "lint", "guard", "script"];
                                            };
                                            readonly rationale: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    }];
                                };
                            };
                            readonly oneOf: readonly [{
                                readonly properties: {
                                    readonly evidenceLabel: {
                                        readonly const: "measured";
                                    };
                                    readonly reproduction: {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "command"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "command";
                                            };
                                            readonly command: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                    };
                                };
                            }, {
                                readonly properties: {
                                    readonly evidenceLabel: {
                                        readonly const: "by inspection";
                                    };
                                    readonly reproduction: {
                                        readonly type: "object";
                                        readonly additionalProperties: false;
                                        readonly required: readonly ["kind", "steps"];
                                        readonly properties: {
                                            readonly kind: {
                                                readonly const: "inspection";
                                            };
                                            readonly steps: {
                                                readonly type: "array";
                                                readonly minItems: 1;
                                                readonly items: {
                                                    readonly type: "string";
                                                    readonly minLength: 1;
                                                };
                                            };
                                        };
                                    };
                                };
                            }];
                        };
                    };
                    readonly proposalPackets: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly additionalProperties: false;
                            readonly required: readonly ["schemaVersion", "kind", "proposedPath", "sourceEpisodeId", "provenance", "corroboratingEvidenceRefs", "dissentingEvidenceRefs", "suggestion"];
                            readonly properties: {
                                readonly schemaVersion: {
                                    readonly const: 1;
                                };
                                readonly kind: {
                                    readonly const: "ProductSuggestionPacket";
                                };
                                readonly proposedPath: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly pattern: "^docs/proposals/(?!\\.{1,2}/$)[A-Za-z0-9][A-Za-z0-9._-]*/$";
                                    readonly $comment: "The host validator also requires the final segment to equal suggestion.suggestionId.";
                                };
                                readonly sourceEpisodeId: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                                readonly provenance: {
                                    readonly type: "array";
                                    readonly minItems: 1;
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly corroboratingEvidenceRefs: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly dissentingEvidenceRefs: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly minLength: 1;
                                    };
                                };
                                readonly suggestion: {
                                    readonly type: "object";
                                    readonly additionalProperties: false;
                                    readonly required: readonly ["suggestionId", "submittedBy", "problemOrOpportunity", "scope", "evidenceRefs", "affectedUsers", "affectedSystems", "expectedValue", "altitude", "uncertainty", "risks", "alternatives", "duplicationHints", "urgencyRationale"];
                                    readonly properties: {
                                        readonly suggestionId: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                            readonly pattern: "^(?!\\.{1,2}$)[A-Za-z0-9][A-Za-z0-9._-]*$";
                                        };
                                        readonly submittedBy: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly problemOrOpportunity: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly scope: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly evidenceRefs: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly affectedUsers: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly affectedSystems: {
                                            readonly type: "array";
                                            readonly minItems: 1;
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly expectedValue: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly altitude: {
                                            readonly type: "integer";
                                            readonly minimum: 2;
                                            readonly maximum: 12;
                                        };
                                        readonly uncertainty: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                        readonly risks: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly alternatives: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly duplicationHints: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                            };
                                        };
                                        readonly urgencyRationale: {
                                            readonly type: "string";
                                            readonly minLength: 1;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    readonly resultEnvelope: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["workOrderId", "episodeId", "status", "resultId", "summary", "requiresHuman"];
                        readonly properties: {
                            readonly workOrderId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly episodeId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly status: {
                                readonly enum: readonly ["completed", "failed", "blocked"];
                            };
                            readonly resultId: {
                                readonly type: "string";
                                readonly minLength: 1;
                            };
                            readonly summary: {
                                readonly type: "string";
                                readonly minLength: 1;
                                readonly $comment: "The host validator requires fewer than 200 whitespace-delimited words.";
                            };
                            readonly requiresHuman: {
                                readonly type: "boolean";
                            };
                        };
                    };
                    readonly cleanRoom: {
                        readonly type: "object";
                        readonly additionalProperties: false;
                        readonly required: readonly ["status", "stopConditionsFound", "evidenceRefs"];
                        readonly properties: {
                            readonly status: {
                                readonly const: "passed";
                            };
                            readonly stopConditionsFound: {
                                readonly const: false;
                            };
                            readonly evidenceRefs: {
                                readonly type: "array";
                                readonly minItems: 1;
                                readonly items: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                };
                            };
                        };
                    };
                };
            };
        }, {
            readonly kind: "prompt-fragment";
            readonly emissionId: "sparse-receipt.residue";
            readonly text: "Return findings and suggestion packets as typed payloads, then summarize the episode in fewer than 200 words.";
        }];
        readonly cost: {
            readonly mechanismType: "evidence-schema";
            readonly promptTokens: 31;
            readonly runtimeCost: {
                readonly quantity: 1;
                readonly unit: "validation-per-report";
            };
            readonly extraEpisodes: 0;
        };
        readonly inspection: {
            readonly restrictions: readonly ["The result-envelope summary stays under 200 words"];
        };
    };
};
export declare const entropyReducerIdentity: {
    readonly identityId: "entropy-reducer";
    readonly version: 1;
    readonly name: "Entropy Reducer";
    readonly dispositions: readonly ["verify-first", "measure-rather-than-assume", "candid-and-fair", "propose-rather-than-mutate", "shape-first-on-operator-analogies"];
    readonly invariants: readonly ["the tracked repository and control plane remain read-only during review", "every finding carries an independent reproduction", "the clean-room floor cannot be weakened", "settled decisions are not relitigated", "authority never substitutes for correctness", "refuted findings leave the promoted set", "side routines stay within declared budgets"];
    readonly updateLaws: readonly ["identity changes require a new version and comparison evidence", "a substitute reviewer model is a different attested actor"];
    readonly lineage: readonly ["second founding identity", "Shine active linked to Standardize", "generated from the WO-023 entropy-reducer definition"];
};
export declare const entropyReducerRole: {
    readonly roleId: "planning-reviewer";
    readonly version: 2;
    readonly name: "Planning reviewer";
    readonly obligations: readonly ["perform a whole-repository census", "assess the mechanism ladder", "emit non-authoritative product suggestions"];
    readonly permissions: readonly ["repo.read*", "probe.run:scratch*", "intake.capture", "report.emit"];
    readonly objectives: readonly ["reduce entropy without exporting cost to quality, authority, or operator attention"];
    readonly policyDeltas: readonly [{
        readonly key: "proposalOrdering";
        readonly value: "constraint-first";
    }];
};
/** Every admitted route compiles serial lenses by rule. The two pinned CLI
 * routes are observed to pass no delegate tool (Claude admits only Bash, Read,
 * Glob and Grep; Codex disables multi_agent); the background worker's tool
 * surface is session-attested and unobserved, and the fake route is a fixture.
 * A delegating route requires a separate capability decision; unknown routes
 * never inherit authority. */
export declare const ENTROPY_REDUCER_ROUTES: readonly ["claude-cli-print", "codex-cli-exec", "background", "fake"];
export type EntropyReducerRoute = (typeof ENTROPY_REDUCER_ROUTES)[number];
export declare function entropyReducerLoadout(episodeEndsAt: number, route?: EntropyReducerRoute): LoadoutGraph;
export interface ReviewerCompileOptions {
    readonly route?: EntropyReducerRoute;
    readonly repo: string;
    readonly baseCommit: string;
    readonly episodeId: string;
    readonly dispatchedAt: number;
    readonly episodeEndsAt: number;
    readonly lensBriefs?: readonly LensBrief[];
}
export interface ReviewerRequirement {
    readonly harness: "claude-code";
    readonly model: "claude-opus-5-5";
    readonly displayModel: "Claude Opus 5.5";
    readonly effort: "xhigh";
    readonly substitutionPolicy: "different-reviewer-and-must-be-attested";
}
export declare const entropyReducerReviewerRequirement: {
    readonly harness: "claude-code";
    readonly model: "claude-opus-5-5";
    readonly displayModel: "Claude Opus 5.5";
    readonly effort: "xhigh";
    readonly substitutionPolicy: "different-reviewer-and-must-be-attested";
};
export interface ReviewerExecutionBoundary {
    readonly mode: "operator-mediated-manual";
    readonly deferredProgramKind: null;
    readonly commandIds: "symbolic-manual-plan";
    readonly resultBinding: "host-validator";
    readonly resourceEnforcement: "authorize-each-operation-and-thread-envelope";
}
export declare const entropyReducerExecutionBoundary: {
    readonly mode: "operator-mediated-manual";
    readonly deferredProgramKind: null;
    readonly commandIds: "symbolic-manual-plan";
    readonly resultBinding: "host-validator";
    readonly resourceEnforcement: "authorize-each-operation-and-thread-envelope";
};
export interface CompiledReviewerWorkOrder {
    readonly compileInputs: ReviewerCompileOptions;
    readonly compiledProgram: CompiledProgram;
    readonly semanticHash: string;
    readonly workOrder: CompiledProgram["workOrder"];
    readonly authorityEnvelope: CompiledProgram["authorityEnvelope"];
    readonly program: Program.T;
    readonly cadence: Cadence.T;
    readonly masks: readonly EntropyReducerMask[];
    readonly reviewerRequirement: ReviewerRequirement;
    readonly executionBoundary: ReviewerExecutionBoundary;
    readonly lensBriefs: readonly LensBrief[];
    readonly lensBriefSchema: typeof lensBriefSchema;
    readonly residue: string;
}
export declare function validateLensBrief(value: unknown): LensBrief;
export declare function validateLensBriefs(values: readonly unknown[], maximum?: number): readonly LensBrief[];
export declare function compileReviewerWorkOrder(options: ReviewerCompileOptions): CompiledReviewerWorkOrder;
export declare class OutputValidationError extends Error {
    readonly name = "OutputValidationError";
}
export declare const countWords: (value: string) => number;
export interface ReviewerOutputExpectation {
    readonly workOrderId: string;
    readonly episodeId: string;
}
export declare function validateReviewerOutput(value: unknown, expected: ReviewerOutputExpectation): ReviewerOutput;
export interface PreparedReviewerEmission {
    readonly output: ReviewerOutput;
    readonly intent: ActIntent;
}
export declare function prepareReportEmit(value: unknown, expected: ReviewerOutputExpectation): PreparedReviewerEmission;
export interface RefutationSelection {
    readonly measuredDenominator: number;
    readonly measuredStatus: "selected" | "not-applicable";
    readonly inspectionDenominator: number;
    readonly inspectionStatus: "all" | "sampled" | "not-applicable";
    readonly inspectionSampleSize: number;
    readonly selectionRule: string;
    readonly measuredSubjects: readonly Readonly<{
        findingId: string;
        command: string;
    }>[];
    readonly inspectionSubjects: readonly Readonly<{
        findingId: string;
        steps: NonEmptyStrings;
    }>[];
    readonly selectedFindingIds: readonly string[];
}
export declare function selectFindingsForRefutation(findings: readonly VerificationFinding[]): RefutationSelection;
export interface RefutationAttempt {
    readonly findingId: string;
    readonly result: "survived" | "refuted" | "blocked";
    readonly reason: string;
    readonly evidenceRefs: readonly string[];
}
export interface RefutationRow extends RefutationAttempt {
    readonly evidenceLabel: FindingEvidenceLabel;
    readonly severity: FindingSeverity;
    readonly surface: string;
    readonly reproduction: FindingReproduction;
}
export interface RefutationReport {
    readonly schemaVersion: 1;
    readonly selection: RefutationSelection;
    readonly attempts: readonly RefutationRow[];
    readonly promotedFindingIds: readonly string[];
    readonly refutedFindingIds: readonly string[];
    readonly blockedFindingIds: readonly string[];
    readonly unselectedFindingIds: readonly string[];
}
export declare function buildRefutationReport(findings: readonly VerificationFinding[], attempts: readonly unknown[]): RefutationReport;
export declare function renderEntropyReducerResidue(source: LoadoutGraph, briefs?: readonly LensBrief[]): string;
export declare const referenceEntropyReducerResidue: () => string;
export {};
