# WS-001 — dotln-angular: the operator's reference Angular workspace, carrying the DotLn console

**Outcome:** DotLn-Angular (`DylanBWood/DotLn-Angular`, public) is an Nx
integrated monorepo on the current Angular that a colleague can clone and
recognize as the way the operator builds Angular: slim apps, feature libraries,
signals everywhere, zoneless, functional first, events-driven state,
legitimate client-side security, every user-facing string through i18n, tests
at every layer, and documentation written once for people and once for AI
sessions. It carries the DotLn console app (`apps/dotln`) first; the WoW
tooling app and an example API join later as members of this workstream.
Its product purpose, in the operator's words of 2026-10-18 (capture SHA-256
`222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`): a UI
over DotLn's features, for playing with them and changing them more
intuitively, so that the Angular app improves the platform, the platform the
starter, the starter this fork, and the fork the Angular app in turn.
**Acceptance contract:** each member order passes the repository's declared
gate in its target worktree (`node scripts/target-gate.mjs WO-NNN --review`),
its change reaches the operator as a pull request they read before it merges,
and its write-backs keep `docs/dev-reference` and `docs/ai-reference` in the
target current. The workstream is delivered when WO-004 to WO-008 are merged
and `apps/dotln` runs locally with login, permissions, i18n and the component
taxonomy demonstrated by one feature. The operator judges delivery by merging
the last member's pull request.
**Delivery state:** proposed

## Member orders

| Order  | Repository    | Base                                       | Role in the outcome                                                                  |
| ------ | ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| WO-003 | self          | this launchpad's `main` at activation      | registers `dotln-angular`, its class, authority profile, gate, grant and vocabulary |
| WO-004 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` | scaffolds the Nx and Angular workspace, tooling, CI and the two documentation roots  |
| WO-011 | self          | this launchpad's `main` after update #8    | declares the class's disposable output and the tag guard the v0.85.0 close needs; no target release until the kit can name one |
| WO-005 | dotln-angular | `651d76ff68e9b3a38fe770226deb634bca28b54c` | foundation libraries: core, utils, i18n, the test-kit convention; base set 2026-10-18 |
| WO-006 | dotln-angular | provisional; set when WO-005 merges        | the component taxonomy, PrimeNG behind wrappers, the shell layout, the home feature  |
| WO-007 | dotln-angular | provisional; set when WO-006 merges        | events, signal stores, call state, data access, MSW, navigation and flags            |
| WO-008 | dotln-angular | provisional; set when WO-007 merges        | authentication and permissions, legitimate from the Angular side                     |

Proposed later members, not yet filed (the planning document records each
with its reopening condition): typed translation keys and their lint; the WoW
app and its non-TypeScript libraries; the example API and a real identity
provider behind the auth port; the DotLn console feature that renders the
actor-board view model and grows into the operator's agent-orchestration UI,
status and check-ins on running sessions through the UI alone (operator
direction of 2026-10-18, capture SHA-256
`b9e38a5ded14d08a7d235886bf014bb5fc1919e4cf2bff0a7efe34dd573bf3ca`); a
production environment with file replacements and a `.env` primer, if WO-005
leaves any of it out.

## Dependency and compatibility plan

The members form one serial chain: each target order's base is the merge
commit of the member before it. The kit creates a target worktree at the
commit the order's `**Repository:**` line names, so a filed successor carries
the repository's only commit as a provisional base, its first step refuses to
activate while `origin/main` differs from that line, and the planning pass
that follows the predecessor's merge sets the line to the merge commit and
refutes the changed order (default pass scope). A kit route that resolves the
base at activation is a recorded candidate for upstream. WO-003 must be
merged into this launchpad before WO-004 activates, because activation and
publication read the registration from `main`. WO-011, a self order,
precedes WO-005 by a typed hard edge: starter v0.85.0's release close
deletes the class's declared disposable output and refuses an undeclared
ignored base file, so the declaration lands first (planning pass of
2026-10-19, D2). No two members run side by
side: every member edits `nx.json`, `tsconfig.base.json`, the ESLint
configuration and the generator log, so their surfaces overlap. A member that
needs something a later member delivers (WO-006's facade needs WO-007's
stores) ships the smallest honest stand-in (a facade reading static signals)
and names the replacement in its known issues.

## House rules

Member orders cite these by number. A rule changes through a planning pass or
an order's recorded decision, never silently.

1. **Stack.** The latest stable Angular (22.x at filing; each order records the
   exact version it installed), standalone components only, strict TypeScript,
   zoneless change detection, signals for state (`signal`, `computed`,
   `linkedSignal`, `input()`, `output()`, `model()`, `viewChild()`), RxJS where a
   stream is the honest model (HTTP, events over time) and converted at the
   boundary with `toSignal` and `toObservable`. Angular best practices and
   browser rendering speed win over any analogy or house preference.
2. **Workspace.** Nx integrated monorepo. `apps/` stay slim: bootstrap,
   providers, routes and environments. `libs/` carry everything else. Every
   project is created by an Nx generator and the exact command is appended to
   `docs/dev-reference/workspace/generator-log.md` with the Nx version. Before
   running generators from a second worktree, stop the daemon
   (`npx nx daemon --stop`); `npx nx reset` clears a confused cache.
3. **Libraries and import paths.** Shared libraries live under `libs/shared/`
   and import as `@dotln-angular/<name>` (`core`, `utils`, `i18n`, `ui`,
   `events`, `models`, `state`, `data-access`, `auth`). Features live under
   `libs/features/` as `<feature>` and `<feature>-data-access` (and
   `<feature>-models` when a feature's types are shared), importing as
   `@dotln-angular/<feature>` and `@dotln-angular/<feature>-data-access`.
   App-scoped libraries live under `libs/<app>/` and import as
   `@dotln-angular/<app>/<name>`. Test kits import as
   `@dotln-angular/<lib>/testing`. Nx tags: `scope:shared`, `scope:<app>` and
   `type:app|feature|ui|data-access|state|events|core|util|i18n|auth|models`;
   the dependency constraints in rule 15 are enforced by
   `@nx/enforce-module-boundaries`. The operator will refine tag names after
   seeing them; the constraints stand.
4. **Barrels.** An importable library's `index.ts` is one line,
   `export * from './public_api';`, and `public_api.ts` lists every export
   explicitly. A feature library exports only its routes from `index.ts`;
   inside a feature, files import each other by relative path, never through
   the alias, so no cycle forms.
5. **Testing.** Vitest for unit tests through Angular's and Nx's standard
   wiring; if that wiring fails on the installed versions, the AnalogJS Vitest
   plugin is the recorded fallback (the operator met that failure in June 2026
   on Angular 22.0 under Nx). Playwright for end-to-end tests, one project per
   app, with axe checks on key pages. MSW serves HTTP in development and in
   tests. Nearly every injectable ships a test kit (`provide<Name>TestKit()`)
   in its library's `testing` entry point, so a spec provides a service and its
   dependencies in one call.
6. **Style.** Sass (`.scss`), design tokens as CSS custom properties, PrimeNG
   (MIT) used only behind wrappers (rule 14), styles inline while a component
   is small and extracted first when it grows.
7. **Functional first.** Ramda and Ramda Adjunct through
   `import { R, RA } from '@dotln-angular/utils'`: re-exported namespaces whose
   types compose cleanly in this workspace, verified by specs ported from the
   libraries' public test suites for each function the workspace uses. Pure
   functions in `utils`; declarative templates; no class-side mutation where a
   signal or a pure function serves.
8. **State and events.** NgRx SignalStore with the Events plugin. Every event
   group is declared in `@dotln-angular/events`, organized by source tier (rule
   16). Stores are provided by `provide<Name>()` functions at the route or app
   level. Call state follows the trinity `action`, `actionSuccess`,
   `actionFailure` with a `withCallState` feature (the toolkit's or the house
   one, WO-007 decides from the observed versions).
9. **i18n.** Transloco. Every user-facing string goes through it; templates
   use `'scope.key' | t`. Typed keys generated from a schema, with a lint that
   fails when translation files drift, are a later member.
10. **Dependency injection.** Providers for everything; nothing appears by
    magic. Each library exposes `provide<Name>()` and composes the providers it
    needs. Injection tokens are `PascalCaseToken` with a description string
    `dotln-angular.<scope>.<lib>.<name>` (for example
    `dotln-angular.shared.core.environment-config`). `providedIn: 'root'` is
    reserved for app-tier singletons listed in `core`; the operator has not
    yet ruled on it, so WO-005 applies this default and records the choice.
11. **Routing.** Features are lazy. `BasePaths` and `<Feature>Paths` enums live
    in `core`; canonical route builders produce commands and query parameters
    from those enums so no feature spells a URL. `AppBasePathToken` reads
    `<base href>` at boot and is injected wherever a sub-path aware URL is
    built.
12. **Component conventions.** Decorator members in this order: `selector`,
    `changeDetection`, `template` or `templateUrl`, `styles` or `styleUrl`,
    `providers` (omitted when empty), `imports`. Inline template and styles
    while they are small. Selector prefixes come from a per-library allow list
    (`shared`, `app`, `dotln`, `dotln-angular`, `<feature>`); the operator
    settles the scheme after seeing implementations. ECMAScript `#private`
    over TypeScript `private`; `readonly` wherever a member is not reassigned.
13. **Lint and TypeScript.** ESLint flat config with angular-eslint, Prettier,
    `.editorconfig`. `no-unused-vars` warns, with an underscore prefix as the
    opt-out. TypeScript hacks and disabled lint or compiler settings are for
    extreme cases only and each carries a comment naming the case.
14. **Vendors behind wrappers.** A third-party UI library is imported only
    inside `wrappers/` directories (and the theme setup in `ui`); lint refuses
    it elsewhere. A wrapper standardizes the vendor API to the house API and
    is swappable.
15. **Dependency constraints.** `app` may depend on any `type`. `feature` may
    depend on everything except `app` and another `feature`. `data-access` on
    `events`, `models`, `core`, `util`. `state` on `events`, `models`, `core`,
    `util`. `ui` on `util`, `i18n`, `models`. `auth` on `data-access`,
    `events`, `models`, `core`, `util`. `events` on `models`, `util`. `core`
    and `i18n` on `util` and `models`. `util` on `util`. `models` on nothing.
    `scope:shared` is importable by every scope; `scope:<app>` only by that
    app and its own libraries.
16. **Action hygiene.** Tiers: `ui` (one group per screen, unique events),
    `data-access` (commands, reusable, trinity), `navigation` (commands,
    reusable), `app` (cross-cutting: flags, shell, errors). Mapping flows one
    way: `ui → data-access`, `ui → navigation`, `ui → app`,
    `data-access → navigation`, `data-access → app`, `app → navigation`.
    Nothing maps to an event of its own tier. Every feature hooks the one event
    stream and therefore sees every event; by convention a feature reacts to
    its own `ui` events, the `data-access` events it owns and `app` events. An
    exception is written as `// hygiene-exception: <reason>` and CI counts and
    prints the exceptions; it does not refuse them.
17. **Security first.** Authentication and authorization are implemented the
    way a real organization would accept: token handling, expiry, refresh,
    invalid tokens, timeouts and permission checks all have code and tests.
    The identity provider is mocked (MSW) until an API exists; nothing else is
    pretend.
18. **Accessibility.** WCAG 2.2 AA to a reasonable extent: keyboard paths,
    focus visibility, labels, contrast through the theme, axe checks in e2e.
19. **Documentation.** `docs/dev-reference/` for people, `docs/ai-reference/`
    for sessions (short, rule-shaped, with the commands to run). DotLn's own
    records for target orders land under `docs/dotln/` so they stay apart from
    the reference material.
20. **Commits and pull requests.** Conventional commits in the present
    imperative. Pull-request titles are conventional; a repository workflow
    prepends the gitmoji for the type after the pull request opens, because the
    kit's outward lint requires the bare conventional subject. Merge commits
    carry the pull-request title (repository setting, operator-owned). The
    draft at verified is the kit's `--draft` form of `worktree publish`, run
    by the session that records the verification pass and reused by the final
    publish, so one branch and one pull request carry each member (planning
    pass of 2026-10-18, D5); WO-010 makes a pull request, a merge commit and a
    passing `checks` run the rules of `main`.
21. **Broken windows.** A defect found during an order is fixed in that order
    or boarded in the same pull request: a skipped failing test plus a
    `// BOARDED: <follow-up>` comment, or a visible "not implemented" surface.
    CI prints the board count.

## Design: the Tipping Point taxonomy

Gladwell's three kinds of people who tip an epidemic name the three kinds of
component in a DotLn-Angular feature. The analogy stays because it answers the
one question a reader has when opening a component: **what is this allowed to
know?**

| Role      | Asks                   | Knows                        | May inject                                | Lives in                                                        |
| --------- | ---------------------- | ---------------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Salesman  | Does it look right?    | its own inputs               | platform tokens only (`ElementRef`, `DOCUMENT`) | `libs/shared/ui`, `libs/<app>/ui`                               |
| Connector | Does it fit together?  | other components             | nothing from the application              | `libs/shared/ui/composites`, `<feature>/composites`, `<feature>/layouts` |
| Maven     | What does it mean?     | the view model and the state | facades, stores, router, tokens           | `<feature>/mappers`, `<feature>/containers`                     |

**Knowledge flows down as inputs; intent flows up as outputs; only Mavens talk
to the outside world through injection.** Seven kinds, ordered by distance from
knowledge:

Salesmen, presentational, many and cheap:

1. **Fragment.** Plain HTML, CSS and Angular's template syntax; one element's
   worth of UI (a badge, a label, an icon button). Their value scales
   logarithmically: the first ten matter, the next ninety are overhead, so
   compose instead of multiplying.
2. **Template.** A Salesman that uses Angular features: content projection,
   `model()`, host bindings, directives, animations. Give it any content and it
   renders it.
3. **Wrapper.** The only component that imports a vendor UI library. It maps
   the vendor's API to the house API, applies house defaults and is swappable;
   small tweaks only. Consultants, not family.

Connectors, composition:

4. **Composite.** Composes Salesmen into one presentational unit with its own
   inputs and outputs (a card, a form section, a list row). Knows components,
   not data sources.
5. **Layout.** Composes Composites into a region or a page through content
   projection and slots; knows what sits beside what and still nothing about
   state. (The germ called this a "feature wrapper"; "wrapper" is reserved for
   vendor adapters.)

Mavens, knowledge:

6. **Mapper.** Knows the view model's shapes and chooses the presentation for
   each (a discriminated union to `@switch` or `NgComponentOutlet`). Knows
   types, not stores.
7. **Container.** The end of the proof (∎). Injects the facade, reads one `vm`
   signal, hands slices down, maps outputs to intents. One container per route
   or region; a container that needs a second screen of inputs is two
   containers.

Beside them, services: the **Facade** (`<Feature>Facade`) composes stores and
streams into one `vm: Signal<ViewModel>` and exposes intent methods that
dispatch events; it is the Container's only dependency. **Stores** live in
`-data-access` and `state`; **event groups** in `events`.

Rules that make the taxonomy legitimate, each enforced by a lint or a test,
not by memory:

- **R1 Knowledge down, intent up.** Salesmen and Connectors have inputs and
  outputs only. Lint refuses `inject(` under `fragments/`, `templates/`,
  `composites/` and `layouts/`; `wrappers/` may inject platform tokens.
- **R2 Two hops.** An output is forwarded at most twice before a Container
  handles it; a third hop means the container splits. Review checklist, no
  lint.
- **R3 Vendors behind wrappers.** House rule 14, enforced by
  `no-restricted-imports` per path glob.
- **R4 Mavens stay thin.** A Container's class holds injection, the `vm` and
  intent mapping; logic lives in the facade, the stores and pure functions.
- **R5 Role by location.** The directory names the role, so a file in the
  wrong directory is a lint failure, not a review comment.
- **R6 The Law of the Few.** Tests concentrate where knowledge is: facades,
  stores, mappers and wrappers, the twenty percent that carry the risk.
  Salesmen get DOM tests only where they have behavior.
- **R7 Broken windows.** House rule 21.

Two contradictions in the germ, resolved: "wrapper" meant three things and now
means the vendor adapter only, with Layout the composition role and Mapper the
knowledge role; and "no outputs, a mediator service" is replaced by outputs plus
the event stream, because presentational components stay pure and testable
without injection, the Container dispatches once, and the Events plugin's
stream is the mediator: visible to everyone, owned by no component. Keeping
the analogy is deliberate: it is sticky (people remember the book), teachable
in one table, and checkable (roles map to directories, directories map to
lint globs).

## Delivery states

| Member | State    | Evidence                              |
| ------ | -------- | ------------------------------------- |
| WO-003 | proposed | filed by the 2026-10-18 planning pass |
| WO-004 | proposed | filed by the 2026-10-18 planning pass |
| WO-011 | proposed | filed by the 2026-10-19 planning pass |
| WO-005 | proposed | filed by the 2026-10-18 planning pass |
| WO-006 | proposed | filed by the 2026-10-18 planning pass |
| WO-007 | proposed | filed by the 2026-10-18 planning pass |
| WO-008 | proposed | filed by the 2026-10-18 planning pass |

<!-- dotln-workstream:start -->
{ "id": "WS-001", "members": [{ "workOrderId": "WO-003", "repositoryId": "self" }, { "workOrderId": "WO-004", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-011", "repositoryId": "self" }, { "workOrderId": "WO-005", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-006", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-007", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-008", "repositoryId": "dotln-angular" }], "edges": [{ "from": "WO-003", "to": "WO-004", "relation": "hard" }, { "from": "WO-004", "to": "WO-005", "relation": "hard" }, { "from": "WO-011", "to": "WO-005", "relation": "hard" }, { "from": "WO-005", "to": "WO-006", "relation": "hard" }, { "from": "WO-006", "to": "WO-007", "relation": "hard" }, { "from": "WO-007", "to": "WO-008", "relation": "hard" }] }
<!-- dotln-workstream:end -->
