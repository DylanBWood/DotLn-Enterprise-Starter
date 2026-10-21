# WO-006

This change makes the component taxonomy real. Each component's directory now states what it may know, lint refuses the violations the taxonomy names, the shell renders through a layout library, and a lazy `/board` route renders the DotLn actor board (`uifa-board-v1`) from a recorded, scrubbed fixture of the launchpad that drives this repository.

## What a reviewer gets

- `libs/shared/ui` (`@dotln-angular/ui`): fragments (icon, badge, visually-hidden), templates (button with three loading variants, card, skeleton, empty state, unavailable), wrappers over Angular Aria and the CDK (tabs, menu, native dialog with a focus trap), composites (page header, key/value list), plain-skin design tokens and `provideDotlnUi()`.
- `libs/shared/models`: the `uifa-board-v1` types, transcribed from the pinned schema.
- `libs/dotln/shell`: an app layout with header, navigation, main and footer slots, landmarks and a skip link that focuses the main landmark in place.
- `libs/features/board`: the board's container, facade, layout, composites and cell and link mappers behind a lazy route. The root redirects to `/board`, and the placeholder home page and `BasePaths.Home` are removed.
- Role-by-location lint overrides, plus the four lint follow-ups from the foundation order: effective `prefer-readonly`, three autofixed import groups, the inline-template newline rule and the shared-type duplicate check. They come with the component-order check and negative fixtures, each with a passing control under a nested project configuration.
- The pinned `uifa-board-v1` schema (platform commit `a54f8d6520ed54d05e5209455c67541562716404`, SHA-256 `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`) and `npm run check:fixtures`, which uses Ajv 2020 and a path scrub.
- Accessibility and visual coverage: axe at WCAG 2.2 AA on every panel, keyboard and local-link tests, a local Storybook catalog, 33 reviewed screenshot baselines, and a macOS CI job for the visual suite.
- Documents: the component taxonomy, the component rules (R1 to R7, H1 to H5, G1 to G6), the console data path and the Storybook guide.
- Two commits: the verified change (the draft's commit) and a fix from the final review that makes the skip link focus the main landmark without a reload, with a unit test and a browser test that starts from a non-initial panel and asserts the selection survives. A records commit with the order, its decisions and both reports under `docs/dotln/` follows.

## Validation

- The declared review gate (install, lint, test, format, build, e2e, visual) passed at the reviewed tree with no tracked-byte mutation, and at the verified draft tree before the final-review commit.
- The independent verification met all nine acceptance criteria on uncached runs: 18 tasks and 65 unit tests, 36 browser tests (which rebuild the Storybook catalog and the production app), 33 screenshot comparisons, each lint fixture failing its rule with its control passing, both fixtures validating against the pinned schema, and an axe sweep over all 23 catalog stories with no violation.
- The final review reran the shell unit tests, the shell and e2e lint, the e2e typecheck, the format check, the component-order check and the uncached browser suite after its fix, after first running the new keyboard test against the old skip link and watching it fail on the reload.
- `npm audit` reports no vulnerabilities (Vite is pinned to 8.3.3 through a scoped override). The draft's CI and title workflow runs completed with success.

## Limits and follow-ups

- Verification recorded four follow-ups, none blocking. The final review repaired the skip link's reload in this branch. Three remain boarded in the order's decisions: the board's local anchors still resolve against `<base href>` for new-tab and copied links; Angular Aria and the CDK (about 65 KB minified, mostly the CDK overlay) load in the initial bundle while the lazy board chunk is mostly the recorded fixture; and the role lint does not refuse an aliased or namespaced `inject` or a dynamic `import()` of a behavior library. `nx.json` keeps `"parallel": 1`, recorded with its measured cost as the setting that fits the launchpad's probe budget.
- The operator's read of the draft raised ten notes, none blocking: five readability and granularity conventions, the app/shared grouping and alias naming for a later app, the console's purpose and the persistence and isolation of operator use, and a standing preference on speed and efficiency, all boarded for the planning route.
- No automated reviewer ran on this pull request; its threads were empty. The board reads a recorded fixture until HTTP loading with MSW arrives in the next order. Selector prefixes (`dotln-`, `board-`) are provisional. The screenshot baselines are macOS only. No release is recorded for this change in this repository; the branch merges with a merge commit whose message is the pull-request title.
