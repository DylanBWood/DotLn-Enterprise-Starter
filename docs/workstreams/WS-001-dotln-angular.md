# WS-001 — dotln-angular: the operator's reference Angular workspace, carrying the operator's sandbox app

**Outcome:** DotLn-Angular (`DylanBWood/DotLn-Angular`, public) is an Nx
integrated monorepo on the current Angular that a colleague can clone and
recognize as the way the operator builds Angular: slim apps, feature libraries,
signals everywhere, zoneless, functional first, events-driven state,
legitimate client-side security, every user-facing string through i18n, tests
at every layer, and documentation written once for people and once for AI
sessions. It carries one app, `apps/dotln`, with sub-apps behind a menu: a
scene for authoring game AI from a toolbox mined from the works the operator
reads, a view of DotLn's machinery, the operator's own digital twin, and side
utilities; the WoW tooling app and an example API join later as members of
this workstream. Its product purpose, in the operator's words of 2026-10-18
(capture SHA-256
`222fbf09d6f57d518b931dd54c59a5bc5d83d55a7552e2ee194b1774a2ee184d`), as the
operator corrected it on 2026-10-24 (capture SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9,
paraphrased in §The app and its sub-apps): the sandbox, playground and
toolbox where every new idea lives first as a toy the operator plays with
before promoting the ones that work, for the five UIFA roles, people and
software actors alike, so that the app improves the platform, the platform
the starter, the starter this fork, and the fork the app in turn.
**Acceptance contract:** each member order passes the repository's declared
gate in its target worktree (`node scripts/target-gate.mjs WO-NNN --review`),
its change reaches the operator as a pull request they read before it merges,
and its write-backs keep `docs/dev-reference` and `docs/ai-reference` in the
target current. The workstream is delivered when WO-004 to WO-008 and WO-013
to WO-018 are merged and `apps/dotln` runs locally with the sub-app menu, the
soldier scene over the catalog, the machinery view over the recorded orders,
the twin's first lane, the toy shelf, login, permissions and i18n, with the
component taxonomy demonstrated in every sub-app. The operator judges
delivery by merging the last member's pull request.
**Delivery state:** active (WO-003 to WO-007, WO-011 and WO-012 merged; WO-013 final-reviewed on 2026-10-25, its pull request DotLn-Angular #6 awaiting the operator's merge)

## Member orders

| Order  | Repository    | Base                                       | Role in the outcome                                                                  |
| ------ | ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| WO-003 | self          | this launchpad's `main` at activation      | registers `dotln-angular`, its class, authority profile, gate, grant and vocabulary |
| WO-004 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` | scaffolds the Nx and Angular workspace, tooling, CI and the two documentation roots  |
| WO-011 | self          | this launchpad's `main` after update #8    | declares the class's disposable output and the tag guard the v0.85.0 close needs; the target release waited on the kit's display name |
| WO-005 | dotln-angular | `651d76ff68e9b3a38fe770226deb634bca28b54c` | foundation libraries: core, utils, i18n, the test-kit convention; base set 2026-10-18 |
| WO-012 | self          | this launchpad's `main` after update #16 | declares the target release policy and the name `DotLn Angular`, the judge-only base checkout and the operator's commit identity that starter v0.87.0 admits (taken inside v0.88.0), and the operator grant naming `release.close`; closed 2026-10-21 as Launchpad v0.3.3 |
| WO-006 | dotln-angular | `5102783f5cf575a6b487e75ed9bb0c064d6dbd9c` | the component taxonomy, the house `ui` library with Angular Aria and the CDK behind wrappers, the shell layout, the `board` feature rendering the actor board from a recorded fixture; base set 2026-10-21; merged as #4 and closed as `DotLn Angular v0.1.0` on 2026-10-21 |
| WO-007 | dotln-angular | `90fa6e8d879cb499107ff79d1051c200d17c1cbc` | events, signal stores, call state, data access, the board over HTTP from the app's own API in the `uifa-board-v1` shape answered by MSW, persisted UI state, navigation and flags; base set 2026-10-23; amended 2026-10-24 |
| WO-013 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4`, activated 2026-10-24 on the provisional base; v0.96.1 publishes and v0.97.1 reviews from the merge base| the sub-app menu in the shell, the `scene` and `machinery` routes with arriving pages, the sub-app grouping convention |
| WO-014 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-013 merges| the toolbox catalog as the app's own data: the `Tool` schema, the run's 3,463 map rows typed by a checkpointed fan-out, the allow-list check, the catalog browser under Tools |
| WO-015 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-014 merges| the soldier scene: the pure scene engine, twenty units on a 2D canvas behind a renderer seam, the tool rail, RTS selection, flock, arrive, formation |
| WO-016 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-015 merges| the machinery view over scrubbed six-field copies of WO-221 and WO-226, the records and replay libraries, the operator's ideas and the local idea sink |
| WO-008 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-016 merges| authentication and permissions, legitimate from the Angular side                     |
| WO-017 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-008 merges| the digital twin's first lane: patience over WO-221 on virtual time, judged by results, variants kept as code |
| WO-018 | dotln-angular | provisional; publishes right under v0.96.1; a pass may set it when WO-017 merges| The Art of War mapped into the catalog from its public text, toys designed as records for the six mined sources without one, the toy shelf |

Proposed later members, not yet filed (§The app and its sub-apps below and
the planning document of 2026-10-24 §10 record each with its reopening
condition): the mining store and the app's own HTTP API, replacing the
committed data and the stopgap copies; the Babylon.js painter behind the
scene's renderer seam; manim in the monorepo; the remaining toys of the
operator's 2026-10-22 run as later members, by their ids; the twin's later
lanes; typed translation keys and their lint; the WoW app and its
non-TypeScript libraries; the example API and a real identity provider behind
the auth port; a production environment with file replacements and a `.env`
primer, if WO-005 leaves any of it out.

## Dependency and compatibility plan

The members form one serial chain in the sequence's order: WO-007, WO-013,
WO-014, WO-015, WO-016, WO-008, WO-017, WO-018 (the planning pass of
2026-10-24, D11; WO-007 closed on 2026-10-24 and left the sequence): each
target order's base is the merge commit of the member before it. The kit
creates a target worktree at the commit the order's `**Repository:**` line
names, so a filed successor carries the repository's only commit as a
provisional base. Since starter v0.96.1 (core WO-230) the target publish
describes the change from the merge base of the subject and the target's
`main` and names the activation base beside it, so an order may activate on
its provisional base and publish right (WO-013 did on 2026-10-24, WO-013-D001;
its first publish, under v0.94.0, was refused for describing the change from
that base, WO-013-D008; its fix integrated v0.96.1 and its verification's
draft publish opened DotLn-Angular #6 from the merge base, and its second
final review was then refused by the kit's review lint, which still ranged
from the activation base until starter v0.97.1 (core WO-231) moved it to the
same merge base, WO-013-D015; the planning pass of 2026-10-25, D3), and the planning pass
that follows the predecessor's merge may set the line to the merge commit
without being required to (the second planning pass of 2026-10-24, D7). A
base advance event was declined by core by design; the merge-base publish is
the route. WO-003 must be merged into this
launchpad before WO-004 activates, because activation and publication read
the registration from `main`. WO-011, a self order, precedes WO-005 by a
typed hard edge: starter v0.85.0's release close deletes the class's declared
disposable output and refuses an undeclared ignored base file, so the
declaration lands first (planning pass of 2026-10-19, D2). WO-012, a self
order, precedes WO-006 the same way: starter v0.87.0 and later read the
target's release policy, display name, base-checkout policy and the operator
grant from this launchpad's `main` at the close, so WO-012 lands them before
WO-006 activates (planning pass of 2026-10-20, D2 and D7). Once WO-012
declares the policy, every `dotln-angular` member needs exactly one
`Target release classification` header before it activates, because the kit
checks the header only at the close; the UI planning pass added it to WO-006,
WO-007 and WO-008 and the 2026-10-24 pass to WO-013 to WO-018 (minor, feature
releases). No two members run side by side: every member edits `nx.json`,
`tsconfig.base.json`, the ESLint configuration and the generator log, so
their surfaces overlap. A member that needs something a later member delivers
ships the smallest honest stand-in and names the replacement in its known
issues. The typed edges: WO-013 on WO-007 (the stores and the error surface);
WO-014 on WO-013 (the Tools menu group); WO-015 on WO-014 (the `Tool` types
and the catalog); WO-016 on WO-013 (the machinery route); WO-008 on WO-007
(the interceptors and stores it extends); WO-017 on WO-016 and WO-008; WO-018
on WO-014 and WO-017. WO-008 runs after the first four sub-app orders because
the operator's sandbox is served soonest by the menu, the catalog, the scene
and the machinery view, none of which gates a route, and the twin's lane,
the first content about the operator, lands after permissions exist; the
operator moves it by a word (planning pass of 2026-10-24, D11). WO-006's base
was set to `5102783f` and WO-007's to `90fa6e8d` by earlier passes; WO-007
and WO-008 carry the `Target release notes: reviewed` header starter v0.91.0
reads at the close, and the six new members carry it from filing.

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
   `events`, `models`, `state`, `data-access`, `auth`, `catalog`, `records`,
   `replay`, `scene-engine`, `twin-model`). Features live under
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
6. **Style.** Sass (`.scss`), design tokens as CSS custom properties with a
   skin layer of token overrides over them (the plain skin first), no vendor
   component library: the house `ui` library owns every component's API,
   markup, styling and tests, and Angular Aria and the CDK supply behavior
   only, behind wrappers (rule 14; the operator's direction of 2026-10-20,
   WO-005-D006, settled by the UI planning pass of 2026-10-21, D2). Styles
   inline while a component is small and extracted first when it grows.
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
    An inline template lays out one projected element per line, never the
    hugging form Prettier wrote before WO-006-D004 turned embedded
    formatting off. A template or style section stays inline while it is at
    most 40 lines; above that it moves to its own file, and one file stays
    the default for a component whose sections fit (the operator's notes of
    2026-10-21 on draft #4, WO-006-D021 (a) and (b); settled by the planning
    pass of 2026-10-23, D9). The house library's granularity and shared-Sass
    pass and the blank-line autofix rule are a recorded candidate (that
    pass's §10, C1).
13. **Lint and TypeScript.** ESLint flat config with angular-eslint, Prettier,
    `.editorconfig`. `no-unused-vars` warns, with an underscore prefix as the
    opt-out. TypeScript hacks and disabled lint or compiler settings are for
    extreme cases only and each carries a comment naming the case. Helper
    type aliases (`Predicate<T>`, `Guard<T>` and the like) are declared
    once per library, in a `types.ts` exported through `public_api.ts`
    where public, and promoted to `utils` when a second library needs one;
    a house check that lists a type alias or interface name declared in more
    than one file under `libs/shared`, run by `tools:lint`, lands with the
    first order that edits the lint rules (WO-005-D022; planning pass of
    2026-10-20).
14. **Behavior and vendor libraries behind wrappers.** `@angular/aria`,
    `@angular/cdk` and any third-party UI library are imported only inside
    `wrappers/` directories (and the provider setup in `ui`); lint refuses
    them elsewhere. A wrapper standardizes the library's API to the house
    API and is swappable. Aria carries keyboard, focus and ARIA semantics
    for the patterns it ships (accordion, combobox, grid, listbox, menu,
    tabs, toolbar, tree at 22.2.3); the CDK carries overlay positioning,
    the focus trap, the live announcer and the unstyled dialog; the house
    library carries everything a user sees. A wrapper may also own a browser
    drawing API such as `<canvas>`, so a renderer sits behind one component
    and a painter can be swapped (the planning pass of 2026-10-24, D7).
15. **Dependency constraints.** `app` may depend on any `type`. `feature` may
    depend on everything except `app` and another `feature`. `data-access` on
    `events`, `models`, `core`, `util`. `state` on `events`, `models`, `core`,
    `util`. `ui` on `util`, `i18n`, `models`. `auth` on `data-access`,
    `events`, `models`, `core`, `util`. `events` on `models`, `util`. `core`
    on `i18n`, `util` and `models`; `i18n` on `util` and `models`, never
    on `core` (WO-005-D001: the application adapter `provideDotlnI18n()`
    lives in `core` and reads core's tokens, while reusable translation
    behavior stays in `i18n`). `util` on `util`. `models` on nothing.
    `scope:shared` is importable by every scope; `scope:<app>` only by that
    app and its own libraries. A pure engine, clock or model is `type:util`
    and carries its own types; a reader of shared record types is
    `type:data-access`.
16. **Action hygiene.** Tiers: `ui` (one group per screen, unique events),
    `data-access` (commands, reusable, trinity), `navigation` (commands,
    reusable), `app` (cross-cutting: flags, shell, errors). Mapping flows one
    way: `ui → data-access`, `ui → navigation`, `ui → app`,
    `data-access → navigation`, `data-access → app`, `app → navigation`.
    Nothing maps to an event of its own tier. An action's own `actionSuccess`
    and `actionFailure` (the trinity of rule 8) are that action's outcomes,
    not mappings, and the hygiene check does not count them (receipt 006;
    UI planning pass of 2026-10-21, D13). Every feature hooks the one event
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
22. **Sub-apps.** One app, `apps/dotln`, with sub-apps behind the shell's menu.
    A sub-app is a feature library under `libs/features/<sub-app>` tagged
    `scope:dotln, type:feature` that exports only its routes; its own data
    access is `libs/features/<sub-app>-data-access`; engines, models, readers
    and clocks every sub-app may read live under `libs/shared/`; `libs/dotln/`
    stays the shell's. The menu is the shell's template and the router links
    are the app's. Splitting a sub-app into its own app or workstream later
    is cheap because the logic is in libraries (the operator's decision of
    2026-10-24; WO-006-D005 settled; planning pass of 2026-10-24, D5).
23. **The sandbox and the clean room for mined data.** Every new idea lands in
    the app first as a toy the operator plays with; promotion is a GitHub
    issue on the platform's repository, never a control record. The app's
    data comes from public mining into its own store, served to the UI through
    its own API; until that store exists, committed data files and scrubbed
    six-field copies of the platform's public WO-221 and WO-226 records are
    the stopgap. For an order cut from the operator's research run, nothing
    from intake enters a committed file beyond ids, short titles and generic
    terms, the quarantine files are never opened, and the order names the
    design file it builds from by path and SHA-256; a mechanical allow-list
    check enforces the first rule for the catalog (the operator's rules of
    2026-10-24; planning pass of 2026-10-24, D6).

## Design: the Tipping Point taxonomy

Gladwell's three kinds of people who tip an epidemic name the three kinds of
component in a DotLn-Angular feature. The analogy stays because it answers the
one question a reader has when opening a component: **what is this allowed to
know?**

| Role      | Asks                   | Knows                        | May inject                                | Lives in                                                        |
| --------- | ---------------------- | ---------------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Salesman  | Does it look right?    | its own inputs               | nothing; a component that needs `ElementRef` or `DOCUMENT` is a wrapper, which may inject platform tokens (receipt 006; UI planning pass of 2026-10-21, D13) | `libs/shared/ui`, `libs/<app>/ui`                               |
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
3. **Wrapper.** The only component that imports a behavior or vendor library
   (Angular Aria, the CDK, or a third-party UI library), or that owns a
   browser drawing API such as `<canvas>` (planning pass of 2026-10-24, D7).
   It maps the library's API to the house API, applies house defaults and is
   swappable; small tweaks only. Consultants, not family.

Connectors, composition:

4. **Composite.** Composes Salesmen into one presentational unit with its own
   inputs and outputs (a card, a form section, a list row). Knows components,
   not data sources.
5. **Layout.** Composes Composites into a region or a page through content
   projection and slots; knows what sits beside what and still nothing about
   state. (The germ gave this role a wrapper name; wrapper is reserved for
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
- **R3 Behavior and vendor libraries behind wrappers.** House rule 14,
  enforced by `no-restricted-imports` per path glob.
- **R4 Mavens stay thin.** A Container's class holds injection, the `vm` and
  intent mapping; logic lives in the facade, the stores and pure functions.
- **R5 Role by location.** The directory names the role, so a file in the
  wrong directory is a lint failure, not a review comment.
- **R6 The Law of the Few.** Tests concentrate where knowledge is: facades,
  stores, mappers and wrappers, the twenty percent that carry the risk.
  Salesmen get DOM tests only where they have behavior.
- **R7 Broken windows.** House rule 21.

Two contradictions in the germ, resolved: wrapper meant three things and now
means the vendor adapter only, with Layout the composition role and Mapper the
knowledge role; and the germ's mediator service without outputs is replaced by
outputs plus
the event stream, because presentational components stay pure and testable
without injection, the Container dispatches once, and the Events plugin's
stream is the mediator: visible to everyone, owned by no component. Keeping
the analogy is deliberate: it is sticky (people remember the book), teachable
in one table, and checkable (roles map to directories, directories map to
lint globs).

## The app and its sub-apps

DotLn is an agentic platform (the operator's words of 2026-09-05 in the
platform's intake, read by the UI planning pass of 2026-10-21). The app the
workstream carries was the console whose first screen is the actor board (the
UI planning pass of 2026-10-21); on 2026-10-24 the operator corrected its
subject (ignored intake capture `docs/intake/notes/planning-2026-10-24.md`,
SHA-256 `63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`,
entry 9; core's record of the same decisions is
`docs/planning/intake-mining-run-routing-2026-10-24.md` §10 on its planning
branch), paraphrased:

- One app with sub-apps behind a menu: a scene for authoring game AI, a view
  of DotLn's machinery, side utilities. One workstream for now; the logic in
  libraries so splitting later is cheap.
- The app is the sandbox: every new idea lives there first as a toy the
  operator plays with, then they promote what works. It serves all five UIFA
  roles, people and software actors alike, not agents alone.
- It informs DotLn through GitHub issues on the platform's repository, never
  by writing a control record.
- It is not wired to DotLn core. Its data comes from public mining into its
  own store, served to the UI through its own API. Scrubbed copies of the
  platform's public WO-221 and WO-226 records are a stopgap.
- The machinery view shows an agent, a change to its gems, supports or other
  mechanisms dropped on it, and what changes in the example use case. Its
  purpose: tune the mechanisms until they run without the operator, then see
  agents working in concert.
- Workers are metaphors; today they are separate agents in their role slots.
  Select-then-apply first, drag later. The ideas the operator drops are
  theirs and are also saved to ignored intake.
- The soldier scene is its own sub-app, 2D first behind a renderer seam,
  Babylon.js later; manim may live in the monorepo later; the repository's
  name is not literal.
- The operator's model lives in the app first: a personality-fidelity digital
  twin with variations and old versions kept, nothing held back from it,
  judged by results only, the RxJS that describes the operator being the RxJS
  that runs.
- Agents collaborate.

The designs the sub-apps build from are the operator's own research run of
2026-10-22 (core's ignored intake, read-only); each order names its design
file by path and SHA-256 and copies nothing beyond ids, short titles and
generic terms (rule 23). The platform's records carry the contracts the board
still renders (DotLn `docs/product/04-interfaces.md` §Plural UI hosts, §Actor
board v0; `packages/console/uifa-board-v1.schema.json` as a kit file since
starter v0.93.0).

**The menu and the sub-apps (WO-013):** Scene (`/scene`), Machinery (the
actor board at `/board`, the agents strip at `/machinery`, the twin at
`/twin`) and Tools (the catalog browser and the toy shelf under `/tools`).
Rule 22 is the grouping.

**The first screen, the actor board (WO-006), and its data path (WO-007).**
The actor board, `uifa-board-v1`: five panels in the document's order
(Actors, Builds, Mechanisms, Work, Blueprint), each naming the UIFA roles it
serves and the question it answers, with sections, rows and evidence-linked
cells. WO-006 renders a recorded, scrubbed board of this launchpad, shipped
as `DotLn Angular v0.1.0` on 2026-10-21 (pull request #4); WO-007 loads one
through HTTP from the app's own API (`GET <apiBaseUrl>/uifa-board-v1`),
answered by MSW, with the versioned shape kept so the mining store's API
serves it later without a rewrite; the platform resident's loopback is not
read (the operator's decision of 2026-10-24; the 2026-10-23 pass's route
shape superseded). The data path is written in the target's
`docs/dev-reference/architecture/console.md`.

**Host rules** (from the platform's contract; each enforced by a spec or a
lint in WO-006; they govern the board):

- **H1 Version first.** The host checks `viewModelVersion` and shows the
  unavailable state, naming the version, when it is not the one it renders.
- **H2 Three cell states.** `known`, `unknown` and `unavailable` are
  rendered distinctly, each with a text equivalent; an unavailable source
  or section stays visible with its explanation, never an empty success.
- **H3 Label shown, key addressed.** `cell.label` is what a person reads;
  `cell.key` is the DOM and test identity.
- **H4 Local links only.** A link resolves to an id in the same board;
  the host never turns a link into a command or a URL.
- **H5 No second state machine.** The host derives no lifecycle legality
  from the table and dispatches nothing; a projection, never an authority.
  The same rule governs every sub-app: a scene, a strip or a lane decides
  nothing about the platform.

**Design rules** (from the platform's glyph grammar and the operator's
intake, read 2026-10-21; they govern every sub-app):

- **G1 Accessibility first.** House rule 18; keyboard paths through the
  behavior library, axe in e2e; a canvas is a projection of a frame the text
  layer also renders, and the text layer is the accessibility surface.
- **G2 Motion means transition.** A stable state is calm, idle actors are
  not animated, `prefers-reduced-motion` is honored (a scene does not
  autoplay under it; it steps on command), and every visual state has a
  text equivalent.
- **G3 Strings in the message system from the start.** House rule 9; the
  board's own titles, labels and values and every catalog or record field
  are data and are not translated.
- **G4 Skins over tokens.** Appearance is a token layer (`[data-skin]`);
  CSS never decides behavior, and no utility-class string lives in domain
  state. The plain skin ships first.
- **G5 Native emoji first for glyphs**, each with a text equivalent.
- **G6 Readable, fluid layout.** Lists of label, value and status over
  dense tables; no fixed page width (the operator reads on an ultrawide
  display); the true value or `unknown`, never an invented number; a figure
  prints its sample size and its source.

**Operating rules** (from the platform's product 04 §Later console hosts,
WO-006-D022 and the operator's decisions of 2026-10-24; each enforced by
WO-007 and the members after it):

- **I1 Persistence.** State the operator makes while playing (the selected
  panel, compositions, dropped ideas, the chosen twin variant) persists in a
  store the app owns, apart from any control record: browser storage through
  one persisted-state feature now (WO-007), the mining store later.
- **I2 Isolation.** Using the app never writes a control record, moves a
  lifecycle phase or disturbs a worktree or a gate; the app writes only
  through browser storage, HTTP to its own API, and the local idea sink
  (WO-016), a Node process on the loopback that appends the operator's ideas
  to the repository's ignored intake. Promotion of an idea is a GitHub issue
  the operator files, never an effect the app performs.
- **I3 Versioned contracts.** The app's own data contracts are versioned
  (`tool-v0`, `control-event-lite-v0`, `toy-v0`) and the board keeps
  `uifa-board-v1` as its response shape, so a newer app reads older data and
  a later API serves the same shapes.

**The method:** toys first. Every idea lands as a toy the operator plays
with; the operator's play is the judgment; what works is promoted as a GitHub
issue on the platform's repository. The pairwise comparison the 2026-10-21
pass adopted stays available for choosing between two screens and is no
longer the gate before a sub-app is built; the UX ideation the 2026-10-23 pass
deferred is replaced by the operator's own research run, whose designs the
orders build from (planning pass of 2026-10-24, D2 and D13).

**The road**, in the sequence's order, then the later members with their
reopening conditions (the planning document of 2026-10-24 §10 carries the
NoOp records):

| Member or candidate | What the operator sees or does | Reopens when |
| --- | --- | --- |
| WO-013 the shell | the menu with Scene, Machinery and Tools; the two sub-app routes arriving | filed |
| WO-014 the catalog | 3,463 map rows typed into tools with five faces; the catalog browser under Tools | filed |
| WO-015 the scene | twenty units, a rail from the catalog, RTS selection, flock, arrive, formation, trials | filed |
| WO-016 the machinery view | one order's agents in their slots over the six-field copies; a mechanism change dropped on an agent; ideas saved | filed |
| WO-017 the twin's first lane | patience over WO-221 on virtual time, judged by results, variants kept as code | filed |
| WO-018 the first public mining | The Art of War in the catalog; toys as records for six sources; the toy shelf | filed |
| the mining store and the app's API | the committed data and the copies replaced by a store the app fills from public sources | after WO-018, when the operator names the next public source, or when the copies limit a toy (C1) |
| the Babylon.js painter | the scene in 3D behind the same renderer seam | the operator asks after WO-015 (C2) |
| manim in the monorepo | animations beside the toys | the operator's word (C3) |
| the graduation route | a toy's card becomes a GitHub issue on the platform's repository from the app | the first promotion (C4) |
| the run's remaining toys | the fleet, the blackboard, the flow instruments, the commander, the heat map, the fidelity board, the blind replay, the ring, the shelf, the did-not-stick table, the phrase shelf, the ladder replay, by their ids in the run | the operator picks one from the toy shelf after playing (C5) |
| the twin's later lanes | the grid over a dozen orders, the operator's own blind replay, the ring | WO-017 merged and the operator names the lane (C6) |

Core declined the console framework decision on 2026-10-21: the framework
is the fork's choice for its shell, and core keeps the contract as the
boundary. WO-006's bundle readings are the fork's own evidence, refined by
WO-006-D014's per-package attribution when a change to the providers or
the initial bundle reopens it.

## The operator's model

The twin's rules, from the operator's decisions of 2026-10-24 (WO-017 carries
the first lane): the model lives in the app first; it is RxJS code, a
`TwinVariant` per file with named parameters, never a configuration an
interpreter reads; every variant ever written stays in the registry and a
check refuses a removed one; nothing in the app's data is held back from a
variant; the twin is judged by the results of the order it would have run
(virtual close time, waiting minutes, early fires, each beside the recorded
baseline) and never by agreement with the operator's recorded beats, since
there are many paths from a hand-back to a close; the recorded lane is drawn
for reference and never moves; a kept flip is exported as a new variant the
operator commits. WO-221 re-derived (planning pass of 2026-10-24, §4): 16
rows, 8 operator rows, seven gaps after a hand-back of 87.8 (after the
implementation hand-back, no verdict), 109.9, 1.7, 1.4, 2.1, 18.2 and 5.9
minutes, 227.0 waiting minutes, a span of 1,110.3 minutes.

## Delivery states

| Member | State    | Evidence                              |
| ------ | -------- | ------------------------------------- |
| WO-003 | merged   | closed 2026-10-18; [evidence](../evidence/WO-003/README.md) |
| WO-004 | merged   | closed 2026-10-18; [evidence](../evidence/WO-004/README.md) |
| WO-011 | merged   | merged as #12 and released as Launchpad v0.3.2 on 2026-10-20; [configuration, tag guard and gate evidence](../evidence/WO-011/README.md) (`docs/evidence/WO-011/`) |
| WO-005 | merged   | merged in DotLn-Angular as #3 and its records as #13 on 2026-10-20; the first draft-at-verified publish and the first target close; [evidence](../evidence/WO-005/README.md) |
| WO-012 | merged   | merged as #18 and released as Launchpad v0.3.3 on 2026-10-21; declares `DotLn Angular` releases, grants `release.close`, retains judged base output and names the operator's public commit identity; [configuration, grant and gate evidence](../evidence/WO-012/README.md) (`docs/evidence/WO-012/`) |
| WO-006 | merged   | merged in DotLn-Angular as #4 on 2026-10-21 and closed the same day as `DotLn Angular v0.1.0`, the target's first release; its records as #20 in this launchpad; [evidence](../evidence/WO-006/README.md) |
| WO-007 | merged   | merged in DotLn-Angular as #5 (`2ab4f28501628cf95dd0102c42440fd7de9f8055`, 2026-10-24T16:23Z) and closed the same day as `DotLn Angular v0.2.0`; VER-001 failed on an `ErrorHandler` regression the verifier reproduced, the repair passed VER-002 and FINAL-001; its decisions, verification and final review live in the target under `docs/dotln/`, its records as #25 in this launchpad; [evidence](../evidence/WO-007/README.md) |
| WO-013 | active   | activated 2026-10-24 at the provisional base; VER-001 pass; FINAL-001 fail on the publish blocker (the kit described the change from the activation base, WO-013-D008); the fix of 2026-10-24 integrated starter v0.96.1 and moved the generator-log entry (D010, D011); VER-002 pass at tree `dc997234…` and its draft publish opened DotLn-Angular #6 (`99a30bef…`, 83 files from the merge base, CI green); FINAL-002 fail with every criterion met and no new defect, on the kit's pre-review commit lint, which ranged 17 commits from the activation base and refused two merged subjects outside the order's one commit (D015); the second repair integrated `main` at `04c45cfa` and starter v0.99.0 on 2026-10-25, reproduced the v0.97.1 one-commit lint and seven passing regression controls, and changed no target byte (D016, D017); VER-003 pass, reproducing the corrected lint and republishing #6 at the same tree; FINAL-003 pass on 2026-10-25 with every criterion met and no new finding, the reviewed commit `99a30bef…` accepted without a change and the unit and browser suites rerun uncached (D018, D019); the final publish marks #6 ready with the records commit, and the records branch follows; the 2026-10-25 pass left its text unchanged (D3); [evidence](../evidence/WO-013/README.md) |
| WO-014 | proposed | filed by the 2026-10-24 planning pass; amended by the 2026-10-24 second pass with receipt 008's known issues and by the 2026-10-25 pass with the not-found route WO-013-D007 boards and the `run-many` check form of WO-013-D005; the base is provisional and publishes right under starter v0.96.1 (a pass may set it when WO-013 merges) |
| WO-015 | proposed | filed by the 2026-10-24 planning pass; amended by the 2026-10-24 second pass with receipt 008's known issues and by the 2026-10-25 pass with receipt 009's; the base is provisional and publishes right under starter v0.96.1 (a pass may set it when WO-014 merges) |
| WO-016 | proposed | filed by the 2026-10-24 planning pass; amended by the 2026-10-24 second pass with receipt 008's known issues and the segment fixtures renamed `order-221.json` and `order-226.json`, and by the 2026-10-25 pass with receipt 009's; the base is provisional and publishes right under starter v0.96.1 (a pass may set it when WO-015 merges) |
| WO-008 | proposed | filed by the 2026-10-18 planning pass; given its release header by the UI planning pass of 2026-10-21 and the v0.91.0 publication rules by the standard pass of 2026-10-23; the carry-in closed and its place after WO-016 set by the 2026-10-24 pass; base provisional until WO-016 merges; amended by the 2026-10-24 second pass with receipt 008's known issues and the v0.96.1 base clause, and by the 2026-10-25 pass with receipt 009's (the public sub-app routes and the gated `/account` page) |
| WO-017 | proposed | filed by the 2026-10-24 planning pass; amended by the 2026-10-24 second pass with receipt 008's known issues and the derived fixture renamed `order-221-derived-v0.json`, and by the 2026-10-25 pass with receipt 009's; the base is provisional and publishes right under starter v0.96.1 (a pass may set it when WO-008 merges) |
| WO-018 | proposed | filed by the 2026-10-24 planning pass; amended by the 2026-10-24 second pass with receipt 008's known issues and by the 2026-10-25 pass with receipt 009's; the base is provisional and publishes right under starter v0.96.1 (a pass may set it when WO-017 merges) |

<!-- dotln-workstream:start -->
{ "id": "WS-001", "members": [{ "workOrderId": "WO-003", "repositoryId": "self" }, { "workOrderId": "WO-004", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-011", "repositoryId": "self" }, { "workOrderId": "WO-005", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-012", "repositoryId": "self" }, { "workOrderId": "WO-006", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-007", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-013", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-014", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-015", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-016", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-008", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-017", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-018", "repositoryId": "dotln-angular" }], "edges": [{ "from": "WO-003", "to": "WO-004", "relation": "hard" }, { "from": "WO-004", "to": "WO-005", "relation": "hard" }, { "from": "WO-011", "to": "WO-005", "relation": "hard" }, { "from": "WO-005", "to": "WO-006", "relation": "hard" }, { "from": "WO-012", "to": "WO-006", "relation": "hard" }, { "from": "WO-006", "to": "WO-007", "relation": "hard" }, { "from": "WO-007", "to": "WO-013", "relation": "hard" }, { "from": "WO-013", "to": "WO-014", "relation": "hard" }, { "from": "WO-014", "to": "WO-015", "relation": "hard" }, { "from": "WO-013", "to": "WO-016", "relation": "hard" }, { "from": "WO-007", "to": "WO-008", "relation": "hard" }, { "from": "WO-016", "to": "WO-017", "relation": "hard" }, { "from": "WO-008", "to": "WO-017", "relation": "hard" }, { "from": "WO-014", "to": "WO-018", "relation": "hard" }, { "from": "WO-017", "to": "WO-018", "relation": "hard" }] }
<!-- dotln-workstream:end -->
