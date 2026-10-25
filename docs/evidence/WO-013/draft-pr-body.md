## Summary

`apps/dotln` becomes one app with sub-apps behind a menu. The shell's primary navigation is now a grouped menu: Scene, Machinery and Tools. The actor board stays at `/board`, listed under Machinery, and the root still redirects to it.

- `libs/dotln/shell`: `dotln-sub-app-menu` (the one labelled navigation landmark) and `dotln-sub-app-menu-group` (a heading and a list) are content-projection templates with no injection and no router import. A group with no projected item shows a translated empty line; Tools shows "No tools yet." The layout's navigation slot becomes a neutral region, so the menu supplies the only `nav`.
- `apps/dotln`: the app projects the three groups and keeps `routerLink`, `routerLinkActive` and `ariaCurrentWhenActive`. Two lazy routes load `@dotln-angular/scene` and `@dotln-angular/machinery`.
- `libs/features/scene` and `libs/features/machinery`: generated feature libraries tagged `scope:dotln,type:feature`. Each exports only its routes and ships one arriving page over the house empty state (the sub-app's name, what arrives and a link back to the board) and a `testing` entry point.
- `libs/shared/core`: `BasePaths.Scene` and `BasePaths.Machinery`, with a route spec.
- i18n: `shell.menu.*`, `scene.arriving.*` and `machinery.arriving.*`.
- Documents: `docs/dev-reference/architecture/sub-apps.md` (the menu, its groups and how a sub-app is added), `docs/ai-reference/sub-app-rules.md` (the rules for sessions), conventions rule 22 and the generator log.
- Browser coverage: a new sub-app spec covers the menu headings, the empty Tools line, the keyboard path over every menu link, the active-link state, deep links and history, axe at the board's threshold and no horizontal overflow at 360, 768 and 1440. Four Storybook entries and six screenshot baselines are new; twelve board baselines are refreshed for the taller menu.

## Verification

Independent verification of the implementation, before the generator-log rearrangement, ran these commands without the Nx cache:

- `npx nx run-many -t test -p dotln-shell core scene machinery`: 14 unit tests.
- `npx nx run-many -t lint build -p dotln dotln-shell core scene machinery dotln-e2e tools`: the production build emits separate lazy chunks for the board, the scene and the machinery.
- `npx nx e2e dotln-e2e`: 57 browser tests against the served production build and the Storybook catalog.
- `npx nx e2e-visual dotln-e2e`: 39 screenshot comparisons, with no baseline changed.
- `npm run format:check`, `i18n:check`, `lint:components`, `typecheck:foundations`, `lint:hygiene` and `check:kits`.

A separate browser probe ran axe with the best-practice rules at every impact on `/board`, `/scene` and `/machinery` and found no violation. It found no horizontal overflow at 320 px either.

The later documentation repair grouped the generator commands and their results under one dated heading. Application source and screenshot baselines are unchanged. The registered review gate passed all seven commands afterward, using its normal Nx cache policy.

## Known follow-ups

None of these blocks the change.

- An unknown path, such as `/tools` before it has a route, leaves the main region empty and shows the generic application-error notice. `main` behaves the same.
- The toast wrapper still has no Storybook story, and the board's failure state still has no axe check.

## Notes

Tools has no route until the first utility arrives with its own page. The screenshot baselines are macOS only.
