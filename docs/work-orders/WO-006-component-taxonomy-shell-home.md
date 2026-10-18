# WO-006 — The component taxonomy made real in DotLn-Angular: `ui` with fragments, templates, wrappers over the operator-confirmed vendor and shared composites, the lint rules that enforce the roles by location, the `dotln` shell layout, and the `home` feature with its composites, layout, mapper, container and facade behind a lazy route, with accessibility checks in e2e

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Cost:** adds `libs/shared/ui`, `libs/dotln/shell`, `libs/features/home`,
the role-by-location lint overrides, the vendor dependency, `@axe-core/playwright`,
about 60 source files and the taxonomy documents. Removes the WO-004
placeholder page. Wall-clock: about 6 to 8 hours of executor work plus the
fixed cycle; unknown until run. Context bytes: WS-001 §Design, the foundation
documents, the vendor's component API for the four wrapped components, this
order, about 120 KB. Commands added in the target: none (`lint:fixtures`
gains cases). Tokens: unknown until run. Steps: 14. Re-mints: none.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5, §6 and
§8), on the operator's direction of 2026-10-17 (ignored intake capture,
SHA-256 `4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`) and
their Film Study notes (ignored intake `2026-10-17-film-study.pdf`, SHA-256
`43adc54da4ed1735e1fb2309f887b9ed04801992c2af7a19c6e7f6a758ef1d08`):
containers with composed presentational components, view models from facades,
the Salesman, Connector and Maven analogy synthesized by the pass into the
Tipping Point taxonomy (WS-001 §Design), PrimeNG if free, loading buttons,
component member order, selector prefixes to be settled after seeing
implementations, WCAG to a reasonable extent, web speed and Angular best
practices over analogy. Planner-synthesized. Opaque identifier, not a
priority. Clean-room screen: the operator's own notes and public packages.
**Depends on:** WO-005 merged (hard: `core`, `i18n`, `utils` and the test-kit
convention; the base above is provisional and is set to WO-005's merge commit
by the planning pass that follows it).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-005",
    "relation": "hard",
    "reason": "the foundation libraries every component here imports; the base line is set to its merge commit before activation"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(§Design: the Tipping Point taxonomy, R1 to R7; house rules 1, 6, 12, 14, 15,
18); `docs/repositories/dotln-angular.md`; `docs/operator/README.md`; the
target's `docs/ai-reference/*` as WO-005 left them; the vendor's documentation
for button, card, dialog and menu at the installed version; the angular-eslint
rule list at the installed version.

**Objective:** a developer opening any component in DotLn-Angular can tell
from its directory what it is allowed to know, lint refuses the violations the
taxonomy's rules name, the `dotln` shell renders through a layout library with
content projection, and the `home` feature demonstrates every kind once:
fragments and templates in `ui`, wrappers over the vendor, a composite, a
layout, a mapper over a discriminated view-model union, a container reading
one `vm` signal from `HomeFacade`, behind a lazy route built from `BasePaths`.

**Observed gap (dated 2026-10-18; restated by the pass that sets the base):**
the workspace has no components beyond the placeholder page and no UI vendor.
PrimeNG 22.1.2 is licensed under the PrimeUI License (a license key is
required; the free Community License is limited to small entities and
non-commercial open source), and `@primeuix/themes` 3.x and `primeicons` 8.x
carry the same terms; PrimeNG 21.1.10 is the last MIT release and peers
Angular 21 (observed 2026-10-17, planning document §4). The operator's
condition for PrimeNG was "if it is free", which 22.x no longer meets as MIT;
the vendor decision is therefore the operator's before this order activates
(planning document §6).

**Design:**

- Vendor: the operator names the vendor before activation; the default the
  pass proposes is `@angular/material` with `@angular/cdk` (MIT, maintained
  with Angular, accessible by default), theming through its design tokens
  over Sass. If the operator accepts the PrimeUI Community License instead,
  the wrappers target PrimeNG 22 and the license key is read from the primed
  environment, never committed. Nothing in the criteria depends on the vendor
  identity: they test that vendor imports exist only in `wrappers/`.
- `libs/shared/ui` (`@dotln-angular/ui`, `type:ui`): `fragments/`
  (`dotln-icon`, `dotln-badge`, `dotln-visually-hidden`), `templates/`
  (`dotln-card` with header, body and actions slots; `dotln-skeleton`;
  `dotln-empty-state` with projected action), `wrappers/` (`dotln-button`
  with `loading` variants `replace`, `trailing` and `overlay` over the
  vendor's button, `dotln-dialog`, `dotln-menu`), `composites/`
  (`dotln-page-header` composing badge, heading and actions). Design tokens
  in `libs/shared/ui/src/styles/_tokens.scss` as CSS custom properties; the
  vendor theme configured in `provideDotlnUi()`.
- Role-by-location lint (R1, R3, R5) in `eslint.config.mjs` overrides by
  glob: under `**/fragments/**`, `**/templates/**`, `**/composites/**` and
  `**/layouts/**`, `no-restricted-syntax` refuses `CallExpression[callee.name="inject"]`
  and constructor parameter injection, and `no-restricted-imports` refuses
  `@dotln-angular/*-data-access`, `@dotln-angular/state`, `@angular/router`
  and the vendor package; under `**/wrappers/**` only the vendor package is
  allowed in addition; outside `**/wrappers/**` and `libs/shared/ui/src/lib/provide-dotln-ui.ts`,
  the vendor package is refused everywhere; under `**/mappers/**`
  `no-restricted-imports` refuses `*-data-access` and `state`. Fixtures under
  `tools/lint-fixtures/taxonomy/` fail each rule once.
- Component conventions (house rule 12): decorator member order checked by a
  small script `tools/scripts/check-component-order.mjs` (reads each
  `@Component({...})` literal, refuses out-of-order keys and an empty
  `providers`), run as `npm run lint:components` and by CI; `host` metadata
  over `@HostBinding`; `changeDetection: ChangeDetectionStrategy.OnPush`
  everywhere; selectors: `dotln-` for `ui` and `shell`, `home-` for the
  feature, with `@angular-eslint/component-selector` per project; `#private`
  and `readonly` per WO-005's rules.
- `libs/dotln/shell` (`@dotln-angular/dotln/shell`, `scope:dotln,type:ui`):
  `layouts/app-layout` with `header`, `nav`, `main` and `footer` slots, a
  skip link, landmark roles, focus-visible styles; `app.ts` projects into it.
- `libs/features/home` (`@dotln-angular/home`, `type:feature`):
  `home.routes.ts` exporting `homeRoutes` with `providers: [provideHomeFeature()]`;
  `containers/home-page/` (the Maven: injects `HomeFacade`, reads `vm`, maps
  outputs to intents); `facades/home.facade.ts` (`vm: Signal<HomeViewModel>`
  computed from signals; intents `refresh()`, `select(id)`; static data until
  WO-007 wires the store, named as a known issue); `mappers/home-tile-mapper/`
  over `HomeTile = { kind: 'metric' } | { kind: 'link' } | { kind: 'notice' }`
  using `@switch`; `composites/home-tile-grid/`; `layouts/home-layout/`;
  `models/home-view-model.ts`. The feature has no `public_api.ts` barrel
  beyond the routes export (house rule 4); files import by relative path.
  `apps/dotln/src/app/app.routes.ts` lazy-loads it at `BasePaths.Home` and
  redirects `''` there.
- Accessibility (house rule 18): `@axe-core/playwright` in `dotln-e2e` runs
  `AxeBuilder` on the home page with the WCAG 2.2 AA tags and fails on
  serious or critical violations; keyboard navigation of the shell is one e2e
  test.
- Documents: `docs/dev-reference/architecture/component-taxonomy.md` (the
  WS-001 §Design text adapted to this repository, with one path per kind) and
  `docs/ai-reference/component-rules.md` (R1 to R7 as imperative lines with
  the directories); `conventions.md` gains house rules 12, 14, 18.

Rejected: PrimeNG 22 without the operator's license decision (axis: the
operator's own condition); a mediator service injected into presentational
components (axis: R1, platform grain); role-based selector prefixes (axis: the
operator settles prefixes after seeing implementations; directory carries the
role).

Live-run surfaces at the base: none beyond WO-004's (the draft and published
pull requests, Actions).

**Deliverables:** the three libraries; the lint overrides and fixtures; the
component-order script; the home feature behind its route; the axe e2e;
the two documents; `docs/evidence/WO-006/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-006. Check: status
   shows the base.
2. Vendor confirmation: read the operator's decision from the planning
   document §6 or the activation message; install the vendor and record the
   version and license file path in the generator log and the decision. Check:
   `npm ls <vendor>` exits 0 and the license file is read.
3. Generate `ui`, `dotln/shell` and `home` (and `home`'s tags) with the
   commands logged. Check: `npx nx show projects` lists `ui`, `dotln-shell`,
   `home`.
4. `ui` fragments, templates, wrappers, composites, tokens and
   `provideDotlnUi()`, each with a spec. Check: `npx nx test ui` and
   `npx nx lint ui` exit 0.
5. Lint overrides and `tools/lint-fixtures/taxonomy/*` (one fixture per rule).
   Check: `npm run lint:fixtures` exits 0 (each fixture fails its rule).
6. `tools/scripts/check-component-order.mjs` and `npm run lint:components`;
   fix every component it flags. Check: `npm run lint:components` exits 0 and
   fails on `tools/lint-fixtures/component-order.ts`.
7. `dotln/shell` layout; `apps/dotln/src/app/app.ts` projects into it. Check:
   `npx nx build dotln` exits 0.
8. `home` feature files as the Design states; `app.routes.ts` lazy route;
   remove the placeholder page. Check: `npx nx e2e dotln-e2e` exits 0 with the
   home route rendering the tile grid.
9. Facade and container specs with `provideHomeFacadeTestKit()` from
   `@dotln-angular/home/testing` (feature libraries may carry a `testing`
   entry point even without a barrel). Check: `npx nx test home` exits 0.
10. `@axe-core/playwright` test and keyboard test in `dotln-e2e`. Check:
    `npx nx e2e dotln-e2e` exits 0 and the axe test asserts zero serious or
    critical violations.
11. Documents and `conventions.md`. Check: files exist; `npm run i18n:check`
    exits 0 (all new strings through `| t`).
12. Gate: `node scripts/target-gate.mjs WO-006` and `--review`. Check:
    passing rows, no mutation.
13. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains one path per component kind. Check: `npm run test:docs`.
14. Commit; `implementation-ready`; draft pull request after the verification
    pass (`feat: add the component taxonomy, shell layout and home feature`);
    handoff; at final review `target-records` and
    `worktree publish WO-006 --target-worktree --branch feat/component-taxonomy --title "feat: add the component taxonomy, shell layout and home feature" --body-file <reviewed body>`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run i18n:check`, `npx nx e2e dotln-e2e`; in the
launchpad order worktree `npm run test:docs`; then the target gate plain and
review once each.

**Acceptance criteria (all required)**

1. `grep -rl "<vendor package>" libs apps --include=*.ts` (the vendor package
   name recorded in `docs/evidence/WO-006/decisions.md`) lists only files
   under `**/wrappers/**` and `libs/shared/ui/src/lib/provide-dotln-ui.ts`,
   and `npm run lint:fixtures` exits 0 by observing each taxonomy fixture fail
   its rule (inject in a fragment, a template, a composite and a layout; a
   vendor import outside wrappers; a data-access import in a mapper).
2. `grep -rlE "inject\(|constructor\(" libs/shared/ui/src/lib/{fragments,templates,composites} libs/features/home/src/lib/{composites,layouts}`
   prints nothing, and every component under `libs` and `apps` declares
   `changeDetection: ChangeDetectionStrategy.OnPush`
   (`grep -rL "ChangeDetectionStrategy.OnPush" $(grep -rl "@Component" libs apps --include=*.ts | grep -v spec)`
   prints nothing).
3. `npm run lint:components` exits 0 on the workspace and exits nonzero on
   `tools/lint-fixtures/component-order.ts`.
4. `libs/features/home/src/lib/` has `containers/`, `facades/`, `mappers/`,
   `composites/`, `layouts/` and `models/` each with at least one non-spec
   file; `libs/features/home/src/index.ts` exports only `homeRoutes`; no file
   under `libs/features/home/src/lib` imports from `@dotln-angular/home`
   (`grep -rl "@dotln-angular/home'" libs/features/home/src/lib` prints
   nothing); and `apps/dotln/src/app/app.routes.ts` lazy-loads it
   (`grep -c "loadChildren" apps/dotln/src/app/app.routes.ts` is at least 1).
5. `npx nx e2e dotln-e2e` exits 0 and includes a test that runs
   `AxeBuilder` with the `wcag2a`, `wcag2aa`, `wcag22aa` tags on the home
   route and asserts no serious or critical violations, and a keyboard test
   that reaches the main landmark from the skip link.
6. `docs/dev-reference/architecture/component-taxonomy.md` names the seven
   kinds with one repository path each, and `docs/ai-reference/component-rules.md`
   states R1 to R7 by identifier.
7. `node scripts/target-gate.mjs WO-006 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs and
`docs/evidence/WO-006/README.md`.

**Known issues and carry-ins:** the vendor decision is the operator's and
blocks activation until made (planning document §6); `HomeFacade` reads static
signals until WO-007 provides `HomeStore`; selector prefixes are provisional
until the operator rules; the base line is provisional until the pass after
WO-005 sets it.

**Non-goals:** stores, events, HTTP, MSW (WO-007); authentication (WO-008);
a design-system site or Storybook; dark mode beyond token readiness; a second
feature.

**Operator-review assumptions:** the operator names the UI vendor before
activation (Angular Material proposed; PrimeNG 22 only with the PrimeUI
license accepted) and reads the draft pull request before final review.
