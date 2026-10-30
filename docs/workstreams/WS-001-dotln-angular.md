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
target current. The workstream is delivered when WO-004 to WO-008 and WO-013 to WO-019 are merged and `apps/dotln` runs locally with the sub-app menu, the catalog as something to read, the soldier scene over it, the machinery view over the recorded orders, the twin's first lane, the toy shelf, login, permissions and i18n, with the component taxonomy demonstrated in every sub-app and every page accepted by use (rule 24). The operator judges delivery by using the app and merging the last member's pull request.
**Delivery state:** active (WO-003 to WO-007, WO-011 to WO-014 and WO-019 merged and closed, the target at `DotLn Angular v0.5.0`; WO-015 active in its worktree; WO-016, WO-008, WO-017 and WO-018 filed; §Delivery states carries each member's record)

## Member orders

| Order  | Repository    | Base                                       | Role in the outcome                                                                  |
| ------ | ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| WO-003 | self          | this launchpad's `main` at activation      | registers `dotln-angular`, its class, authority profile, gate, grant and vocabulary |
| WO-004 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` | scaffolds the Nx and Angular workspace, tooling, CI and the two documentation roots  |
| WO-011 | self          | this launchpad's `main` at activation      | declares the class's disposable output and the tag guard the release close needs |
| WO-005 | dotln-angular | `651d76ff68e9b3a38fe770226deb634bca28b54c` | foundation libraries: core, utils, i18n, the test-kit convention |
| WO-012 | self          | this launchpad's `main` at activation      | declares the target release policy and the name `DotLn Angular`, the judge-only base checkout, the operator's commit identity and the operator grant naming `release.close` |
| WO-006 | dotln-angular | `5102783f5cf575a6b487e75ed9bb0c064d6dbd9c` | the component taxonomy, the house `ui` library with Angular Aria and the CDK behind wrappers, the shell layout, the `board` feature rendering the actor board from a recorded fixture |
| WO-007 | dotln-angular | `90fa6e8d879cb499107ff79d1051c200d17c1cbc` | events, signal stores, call state, data access, the board over HTTP from the app's own API in the `uifa-board-v1` shape answered by MSW, persisted UI state, navigation and flags |
| WO-013 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` (provisional; published from the merge base) | the sub-app menu in the shell, the `scene` and `machinery` routes with arriving pages, the sub-app grouping convention |
| WO-014 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` (provisional; the worktree fast-forwarded to WO-013's merge, WO-014-D001) | the toolbox catalog as the app's own data: the `Tool` schema, the run's 3,463 map rows typed by a checkpointed fan-out, the catalog browser under Tools |
| WO-019 | dotln-angular | `1c3a4ff24e38d179d0fd1ad910bc6719c2740045` (WO-014's merge) | the catalog as something to read: the run's definitions, relations and hooks as each tool's data, the allow-list and the scrub gone, the reading surface, one authored Arrive study (WO-019-D005), the scene's tools typed |
| WO-015 | dotln-angular | `bc9133e932a00d33c15bc5289d683b8078f51ee4` (provisional; the executor fast-forwards the target worktree to `main`) | the soldier scene: the pure scene engine, twenty units on a 2D canvas behind a renderer seam, a rail of the tools the engine runs with their definitions, RTS selection, flock, arrive, formation, the first look, the root route |
| WO-016 | dotln-angular | provisional; the pass after WO-015 merges may set it | the machinery view over scrubbed six-field copies of WO-221 and WO-226, the records and replay libraries, the operator's ideas and the local idea sink |
| WO-008 | dotln-angular | provisional; the pass after WO-016 merges may set it | authentication and permissions, legitimate from the Angular side |
| WO-017 | dotln-angular | provisional; the pass after WO-008 merges may set it | the digital twin's first lane: patience over WO-221 on virtual time, judged by results, variants kept as code |
| WO-018 | dotln-angular | provisional; the pass after WO-017 merges may set it | The Art of War mapped into the catalog from its public text with its maxims, the run's nineteen toys and six new ones as full records, the toy shelf |

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

The members form one serial chain in the sequence's order, today WO-015,
WO-016, WO-008, WO-017, WO-018 (the planning pass of 2026-10-24, D11; the
2026-10-26 pass, D10; a closed member leaves the sequence): each
target order's base is the merge commit of the member before it. The kit
creates a target worktree at the commit the order's `**Repository:**` line
names, so a filed successor carries the repository's only commit as a
provisional base. Since starter v0.96.1 (core WO-230) the target publish
describes the change from the merge base of the subject and the target's
`main` and names the activation base beside it, so an order may activate on
its provisional base and publish right (WO-013-D001, D008 and D015 record the
refusals that preceded this route; the planning pass of 2026-10-25, D3), and
the planning pass that follows the predecessor's merge may set the line to
the merge commit without being required to (the second planning pass of
2026-10-24, D7). A base advance event was declined by core by design; the
merge-base publish is the route. An executor whose worktree was created on
a provisional base fast-forwards the target worktree to the target's `main`
before building on the predecessor's merge (WO-014-D001), and integrates
this launchpad's `main` into the order's worktree after a starter update
merges, re-emitting its harness (WO-019-D022, D023). WO-003 must be merged into this
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
checks the header only at the close (minor for the feature members). No two
members run side by side: every member edits `nx.json`,
`tsconfig.base.json`, the ESLint configuration and the generator log, so
their surfaces overlap. A member that needs something a later member delivers
ships the smallest honest stand-in and names the replacement in its known
issues. The typed edges: WO-013 on WO-007 (the stores and the error surface); WO-014 on WO-013 (the Tools menu group); WO-019 on WO-014 (the catalog it rebuilds); WO-015 on WO-019 (the definitions and the typed scene tools); WO-016 on WO-013 (the machinery route); WO-008 on WO-007 (the interceptors and stores it extends); WO-017 on WO-016 and WO-008; WO-018 on WO-014, WO-019 and WO-017. WO-008 runs after the first four sub-app orders because
the operator's sandbox is served soonest by the menu, the catalog, the scene
and the machinery view, none of which gates a route, and the twin's lane,
the first content about the operator, lands after permissions exist; the
operator moves it by a word (planning pass of 2026-10-24, D11). Every
`dotln-angular` member carries the `Target release notes: reviewed` header
the close reads.

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
    than one file under `libs/shared`, run by the `workspace-tools` project's lint target (WO-014 renamed the `tools` project to make room for the Tools feature), lands with the first order that edits the lint rules (WO-005-D022; planning pass of
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
23. **The sandbox, its data, and the clean room's scope.** Every new idea
    lands in the app first as a toy the operator plays with; promotion is a
    GitHub issue on the platform's repository, never a control record. The
    app's data comes from public mining into its own store, served to the UI
    through its own API; until that store exists, committed data files and
    scrubbed six-field copies of the platform's public WO-221 and WO-226
    records are the stopgap. The books, films, games and ideas the operator
    references, the run's maps of them and the designs cut from them are the
    app's subject matter and lie outside the clean room: an order carries
    their definitions, relations, hooks, toy designs and the maxims of a
    public-domain text as data, and no allow-list, scrub, overlap check or
    own-words rule is applied to them. Whether a verbatim passage of a work
    still in copyright is committed is an ordinary publishing question the
    order that wants one decides in its decisions file, not a clean-room
    one. The clean room keeps governing what it always governed: employer
    material, credentials, private identifiers and the operator's own raw
    message text, which is paraphrased and cited by digest; the reducer's
    scrub over the platform's control records stays for that reason, and the
    run's quarantine files stay closed because they were quarantined for
    that material. An order cut from the operator's research run names the
    design file it builds from by path and SHA-256, because the run is
    ignored intake that may change. (The operator's direction of
    2026-10-26, capture SHA-256
    `9ec78ddbc267936d59fc7fe88b4a8b9c8d42d4692979db31be5129c817fd72a6`;
    planning pass of 2026-10-26, D2 and D3.)
24. **Acceptance by use.** Every member order's Objective describes the
    operator's session on the page: what they see on arrival, what they do,
    what changes as they do it, and what they learn or decide. At least one
    acceptance criterion is judged by using the served page as that
    Objective describes: the verifier performs the session in the served
    production build, files a `## Walkthrough` section with the dated steps
    and screenshots at 360, 768 and 1440 under the order's evidence
    directory, and records the criterion met only when every step completed
    and the report states in the verifier's own words what was read or
    watched. The refuter's goal review asks of every judged order whether
    the operator would use the page for the stated purpose and whether it is
    the previous page with different fields. The final reviewer performs the
    session before recording pass. Grep, exit-code and count checks support
    criteria and never substitute for the use criterion. A page that renders
    records as label-value lists with nothing to read, do or learn fails the
    use criterion whatever its other checks say. Every planning pass states,
    in one table, what the operator will see on screen after each sequenced
    order lands. The operator's direction of 2026-10-26 (capture SHA-256
    `9ec78ddb…`; planning pass of 2026-10-26, D4); the kit's role text is
    core's, so this rule binds the roles through the order text, this
    workstream and the operator record.
25. **The look is briefed and judged, never defaulted.** Every member order
    that lands a page carries a design brief under the workstream's design
    direction (§Design direction) and names its first pair of candidate
    layouts or chromes. The comparison is the operator's eye doctor test:
    the executor builds and renders the pair at 1440 and 360 during
    execution, presents it as A then B with the round named in the question
    and both captions, varies one independent feature per pair, and uses
    the operator's preference to make the next pair; the rounds continue
    until the operator says the process is done, a preferred candidate alone
    is never acceptance, and a ranking may assist the comparisons and never
    supplies the stop. Content, usability and usefulness come before
    cosmetic polish. The decisions file records each round's pair and pick;
    the rejected implementation leaves the code when its round is decided,
    with its screenshots and an implementation record under the order's
    evidence directory as the history, and a decided choice is not
    relitigated for that order. The two candidates an order names are its
    first pair, not a limit of two designs or one round. The plain skin
    stays the token layer the brief is expressed in (G4); a scene may scope
    a second token set to its region. The look is part of what an order
    delivers (planning pass of 2026-10-26, D5). A comparison session runs
    under the kit's dispatch bound (starter v0.102.0), which counts elapsed
    wall clock from the executor's dispatch, attended or idle, and resolves
    from this fork's own phase medians (8 h 0 min for every phase at the
    2026-10-30 pass): when the operator says in ordinary language that the
    session runs as long as it needs, the executor captures the words in
    ignored intake and records `npm run resume -- accept-overrun` with
    `--ceiling unlimited` for both metrics ahead of the stop, as the kit's
    README describes (the 2026-10-30 pass, D4). (The operator's correction
    of 2026-10-26 in WO-019, capture SHA-256 `5742f0a7…`, entry 1;
    WO-019-D003, D008, D009, D012 and D014; the 2026-10-28 pass, D4.)
26. **Tools earn their place.** Every tool script in the target states its
    purpose and its status, in a gate, a helper or a module, in
    `docs/dev-reference/workspace/scripts.md`, and `npm run check:scripts`
    refuses a script without one. A tool stays because it is useful, never
    because it exists; a check runs in the gate only when it protects
    something worth checking on every change; CI runs the workspace checks
    once, through `nx run workspace-tools:lint`; and the scripts, their
    tests and the gates around them never take up the work for little gain
    (the operator's direction of 2026-10-28, capture SHA-256
    `66335ad095bbe814cd112c289b21b176429313d99f9a2dd31f1f3d1ce7d87dd2`;
    WO-019-D027).

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
platform's intake). The app the workstream carries is what the operator
decided on 2026-10-24 (ignored intake capture
`docs/intake/notes/planning-2026-10-24.md`, SHA-256
`63b25fa11cbd648d224067c98d712b23e79734f35979cc8c9922566cc85e044c`, entry 9;
core's record of the same decisions is
`docs/planning/intake-mining-run-routing-2026-10-24.md` §10), paraphrased:

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

The designs the sub-apps build from are the operator's own research run of 2026-10-22 (core's ignored intake, read-only), the operator's own work and outside the clean room; each order names its design file by path and SHA-256 because the run may change, and carries the run's definitions, relations, hooks and toy designs as the app's data (rule 23 as corrected on 2026-10-26). The platform's records carry the contracts the board
still renders (DotLn `docs/product/04-interfaces.md` §Plural UI hosts, §Actor
board v0; `packages/console/uifa-board-v1.schema.json` as a kit file since
starter v0.93.0).

**The menu and the sub-apps (WO-013):** Scene (`/scene`), Machinery (the
actor board at `/board`, the agents strip at `/machinery`, the twin at
`/twin`) and Tools (the catalog browser and the toy shelf under `/tools`).
Rule 22 is the grouping. The root route lands on the scene once WO-015 merges (the 2026-10-26 pass, D10); until then it lands on the board.

**A concept is a place to study an idea (WO-019; the operator's direction of
2026-10-26, capture SHA-256 `5742f0a7…`, entries 3 and 4; WO-019-D005):**
when the operator drills into a concept they want to know everything about
it from several sides: an intuitive explanation and a situation in which it
helps; a visual model of the important relationship, with change over time
inspectable through controlled steps; ordinary pseudocode and an RxJS
interpretation, the executable distinguished from the illustrative;
implementations in public projects and treatments in other references, with
attribution and each introduced on its own terms; limits, failure cases and
nearby concepts. The representations explain the same example where
practical; a definition from the run keeps its provenance and an authored
explanation is marked as authored; missing material stays missing rather
than filled. Not every representation is owed in every order: it is the
vision the work trends toward. WO-019 demonstrates it with one authored
Arrive study beside the joined definition, and the product document
`docs/product/concept-study.md` carries the direction once WO-019's records
merge; the catalog-wide program that extends it is a candidate of the
2026-10-28 pass (its §10 C2), filed when the operator says where it goes.

**The actor board (WO-006), the first screen until the scene lands, and its data path (WO-007).**
The actor board, `uifa-board-v1`: five panels in the document's order
(Actors, Builds, Mechanisms, Work, Blueprint), each naming the UIFA roles it
serves and the question it answers, with sections, rows and evidence-linked
cells. The board renders a recorded, scrubbed board of this launchpad,
loaded through HTTP from the app's own API (`GET <apiBaseUrl>/uifa-board-v1`),
answered by MSW, with the versioned shape kept so the mining store's API
serves it later without a rewrite; the platform resident's loopback is not
read (the operator's decision of 2026-10-24). The data path is written in the target's
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
- **G6 Readable, fluid layout.** No fixed page width (the operator reads on an ultrawide display); the true value or `unknown`, never an invented number; a figure prints its sample size and its source; a record is shown in the form its reading needs, prose where it is read, an instrument where it is watched, a table where rows are compared, and a label-value list is never the default form of a page (the 2026-10-26 pass).

**Design direction** (rule 25, briefed by the 2026-10-26 pass from the
operator's judgment of that day; each order's brief specializes it): the
subject is the page. On a scene the field fills the viewport below the
header and the chrome recedes; on a reading surface the text sits in a
65ch to 70ch measure with a real type scale. One role palette colours the
units of the scene, the slots of the machinery view and the actors of the
board; one work palette colours a tool's provenance in the catalog, the
rail and the toy shelf. Figures that are watched read as instruments: a
large numeral, a small label, a sparkline. Relations, hooks, obligations
and mechanisms read as prose and lists of names, never as a definition-list
grid, and no page is a card grid of records. Motion only when something
moves, nothing animated at rest (G2). The shell and the board adopt the
direction in the order that next touches them (the 2026-10-26 pass, §10
C1). The look of each page is chosen through the operator's eye doctor test
(rule 25): rendered pairs, each preference making the next pair, until the
operator says the process is done; the catalog's reading surface was settled
that way over twenty-two rounds (`docs/evidence/WO-019/design/`).

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

**The method:** toys first, accepted by use. Every idea lands as a toy the operator plays with; the operator's play is the judgment, and every page is accepted by someone using it against the session its order states (rule 24); what works is promoted as a GitHub issue on the platform's repository. Each page's look is chosen by the
operator's eye doctor test (rule 25) during the order that lands it, never as
a gate before a sub-app is built; the designs the orders build from are the
operator's own research run (planning pass of 2026-10-24, D2 and D13).

**The road.** What has landed: the shell's menu with Scene, Machinery and
Tools (WO-013); the actor board over the app's own API (WO-006, WO-007); the
catalog (WO-014) read as six works on a shelf, a chapter and its concepts, a
definition in a reading measure with its relations and hooks, the scene's
tools typed, and one authored Arrive study (WO-019). What lies ahead, in the
sequence's order, then the later members with their reopening conditions
(the planning document of 2026-10-24 §10 carries the NoOp records):

| Member or candidate | What the operator sees or does | State or reopening condition |
| --- | --- | --- |
| WO-015 the scene | the root route: twenty units on a dark field, a rail of the tools the engine runs with their definitions, RTS selection, flock, arrive, formation, the instruments, trials, the first look | active |
| WO-016 the machinery view | one order's agents in their slots over the six-field copies; a mechanism change dropped on an agent; ideas saved | filed |
| WO-008 authentication and permissions | sign-in and permissions through the mocked provider; an account page they can read; nothing playable, required by the operator's standing rule on security | filed |
| WO-017 the twin's first lane | patience over WO-221 on virtual time, judged by results, variants kept as code | filed |
| WO-018 the first public mining | The Art of War in the catalog with its maxims; twenty-five toys read in full on the shelf; the next toy picked | filed |
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
| WO-003 | merged   | [evidence](../evidence/WO-003/README.md) |
| WO-004 | merged   | [evidence](../evidence/WO-004/README.md) |
| WO-011 | merged   | #12, `Launchpad v0.3.2`; [evidence](../evidence/WO-011/README.md) |
| WO-005 | merged   | DotLn-Angular #3, its records #13; [evidence](../evidence/WO-005/README.md) |
| WO-012 | merged   | #18, `Launchpad v0.3.3`; [evidence](../evidence/WO-012/README.md) |
| WO-006 | merged   | DotLn-Angular #4, `DotLn Angular v0.1.0`, its records #20; [evidence](../evidence/WO-006/README.md) |
| WO-007 | merged   | DotLn-Angular #5, `DotLn Angular v0.2.0`, its records #25; its decisions, verification and final review in the target under `docs/dotln/`; [evidence](../evidence/WO-007/README.md) |
| WO-013 | merged   | DotLn-Angular #6, `DotLn Angular v0.3.0`, its records #30; [evidence](../evidence/WO-013/README.md) |
| WO-014 | merged   | DotLn-Angular #7, `DotLn Angular v0.4.0`, its records #31; [evidence](../evidence/WO-014/README.md) |
| WO-019 | merged   | DotLn-Angular #8, `DotLn Angular v0.5.0`, its records #37; [evidence](../evidence/WO-019/README.md) |
| WO-015 | active   | since 2026-10-30 in its worktree on the provisional base; [the order](../work-orders/WO-015-soldier-scene.md) |
| WO-016 | filed    | base provisional until WO-015 merges; [the order](../work-orders/WO-016-machinery-view.md) |
| WO-008 | filed    | base provisional until WO-016 merges; [the order](../work-orders/WO-008-authentication-and-permissions.md) |
| WO-017 | filed    | base provisional until WO-008 merges; [the order](../work-orders/WO-017-digital-twin-patience-lane.md) |
| WO-018 | filed    | base provisional until WO-017 merges; [the order](../work-orders/WO-018-art-of-war-map-and-toys.md) |

<!-- dotln-workstream:start -->
{ "id": "WS-001", "members": [{ "workOrderId": "WO-003", "repositoryId": "self" }, { "workOrderId": "WO-004", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-011", "repositoryId": "self" }, { "workOrderId": "WO-005", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-012", "repositoryId": "self" }, { "workOrderId": "WO-006", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-007", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-013", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-014", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-019", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-015", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-016", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-008", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-017", "repositoryId": "dotln-angular" }, { "workOrderId": "WO-018", "repositoryId": "dotln-angular" }], "edges": [{ "from": "WO-003", "to": "WO-004", "relation": "hard" }, { "from": "WO-004", "to": "WO-005", "relation": "hard" }, { "from": "WO-011", "to": "WO-005", "relation": "hard" }, { "from": "WO-005", "to": "WO-006", "relation": "hard" }, { "from": "WO-012", "to": "WO-006", "relation": "hard" }, { "from": "WO-006", "to": "WO-007", "relation": "hard" }, { "from": "WO-007", "to": "WO-013", "relation": "hard" }, { "from": "WO-013", "to": "WO-014", "relation": "hard" }, { "from": "WO-014", "to": "WO-019", "relation": "hard" }, { "from": "WO-019", "to": "WO-015", "relation": "hard" }, { "from": "WO-013", "to": "WO-016", "relation": "hard" }, { "from": "WO-007", "to": "WO-008", "relation": "hard" }, { "from": "WO-016", "to": "WO-017", "relation": "hard" }, { "from": "WO-008", "to": "WO-017", "relation": "hard" }, { "from": "WO-014", "to": "WO-018", "relation": "hard" }, { "from": "WO-019", "to": "WO-018", "relation": "hard" }, { "from": "WO-017", "to": "WO-018", "relation": "hard" }] }
<!-- dotln-workstream:end -->
