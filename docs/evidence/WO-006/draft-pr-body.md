## Summary

This change makes the component taxonomy real. Each component's directory now states what it may know, lint refuses the violations the taxonomy names, the shell renders through a layout library, and a lazy `/board` route renders the DotLn actor board (`uifa-board-v1`) from a recorded, scrubbed fixture.

- `libs/shared/ui` (`@dotln-angular/ui`): fragments (icon, badge, visually-hidden), templates (button with three loading variants, card, skeleton, empty state, unavailable), wrappers over Angular Aria and the CDK (tabs, menu, native dialog with a focus trap), composites (page header, key/value list), plain-skin design tokens and `provideDotlnUi()`.
- `libs/shared/models`: the `uifa-board-v1` types, transcribed from the pinned schema.
- `libs/dotln/shell`: an app layout with header, navigation, main and footer slots, a skip link and landmarks.
- `libs/features/board`: the board's container, facade, layout, composites and cell and link mappers behind a lazy route. The root redirects to `/board`, and the placeholder home page and `BasePaths.Home` are removed.
- Role-by-location lint overrides, plus the four lint follow-ups from the foundation order: effective `prefer-readonly`, three autofixed import groups, the inline-template newline rule and the shared-type duplicate check. They come with the component-order check and negative fixtures, each with a passing control.
- The pinned `uifa-board-v1` schema (platform commit `a54f8d6520ed54d05e5209455c67541562716404`, SHA-256 `7d20e785c718b4b601f45a9c351461955666ea16d49f17ae6d8fde0676629cd3`) and `npm run check:fixtures`, which uses Ajv 2020 and a path scrub.
- Accessibility and visual coverage: axe at WCAG 2.2 AA on every panel, keyboard and local-link tests, a local Storybook catalog, 33 reviewed screenshot baselines, and a macOS CI job for the visual suite.
- Documents: the component taxonomy, the component rules (R1 to R7, H1 to H5, G1 to G6), the console data path and the Storybook guide.

## Verification

At the tree this draft carries, the independent verification ran these commands without the Nx cache:

- `npx nx run-many -t lint test build`: 18 tasks and 65 unit tests.
- `npx nx e2e dotln-e2e`: 36 browser tests, which rebuild the Storybook catalog and the production app.
- `npx nx e2e-visual dotln-e2e`: 33 screenshot comparisons.
- `npm run lint:fixtures`, `npm run lint:components`, `npm run check:fixtures`, `npm run i18n:check` and `npx nx format:check`.

An axe sweep over all 23 catalog stories, including the open menu and the open dialog, found no violations.

## Known follow-ups

None of these blocks the change; each is recorded for a later repair.

- The skip link and the board's local anchors are bare fragment links resolved against `<base href="/">`. Activating the skip link reloads the application and resets the selected panel.
- Angular Aria and the CDK (about 65 KB minified, mostly the CDK overlay) load in the initial bundle. The lazy board chunk is mostly the recorded fixture.
- The role lint does not refuse an aliased or namespaced `inject`, or a dynamic `import()` of a behavior library.
- `nx.json` sets `"parallel": 1` for every run, including CI.

## Notes

The board reads a recorded fixture until HTTP loading with MSW arrives in the next order. Selector prefixes (`dotln-`, `board-`) are provisional. The screenshot baselines are macOS only.
