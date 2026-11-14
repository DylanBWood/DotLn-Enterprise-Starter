/** A model: the provider that launches it, its exact id, the effort it runs
 * at where a launch names none, what it is called and, for a provider whose
 * in-session launch takes a family, that family. A model's name can be
 * launched as it is. */
export declare const KIT_MODELS: Readonly<{
    opus: Readonly<{
        provider: "claude";
        id: "claude-opus-5-5";
        effort: "xhigh";
        family: "opus";
        description: "Claude Opus 5.5";
    }>;
    fable: Readonly<{
        provider: "claude";
        id: "claude-fable-5-2";
        effort: "xhigh";
        family: "fable";
        description: "Claude Fable 5.2";
    }>;
    sol: Readonly<{
        provider: "codex";
        id: "gpt-6.1-sol";
        effort: "max";
        description: "GPT-6.1 Sol";
    }>;
    astra: Readonly<{
        provider: "codex";
        id: "gpt-6-astra";
        effort: "max";
        description: "GPT-6 Astra";
    }>;
    sonnet: Readonly<{
        provider: "claude";
        id: "claude-sonnet-5";
        effort: "xhigh";
        family: "sonnet";
        description: "Claude Sonnet 5";
    }>;
    luna: Readonly<{
        provider: "codex";
        id: "gpt-6-luna";
        effort: "xhigh";
        description: "GPT-6 Luna";
    }>;
}>;
/** A worker: a name bound, for each provider it can run on, to a model or to
 * a model at an effort of its own. `default` is what a launch runs when it
 * names nothing, `verifier` what a driven independent verification runs,
 * and `judge` what the resident's always-on judge runs. */
export declare const KIT_WORKERS: Readonly<{
    default: Readonly<{
        description: "The worker a launch runs when it names none.";
        claude: "opus";
        codex: "sol";
    }>;
    advanced: Readonly<{
        description: "Each provider's stronger model, for work the operator asks it for.";
        claude: "fable";
        codex: "astra";
    }>;
    judge: Readonly<{
        description: "The resident's always-on judge.";
        claude: "sonnet";
        codex: "luna";
    }>;
    verifier: Readonly<{
        description: "A driven independent verification.";
        claude: Readonly<{
            model: "opus";
            effort: "xhigh";
        }>;
        codex: Readonly<{
            model: "sol";
            effort: "xhigh";
        }>;
    }>;
}>;
