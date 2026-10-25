# The sub-app menu and the scene and machinery routes

## Summary

`apps/dotln` becomes one app with sub-apps behind a menu. The shell's primary navigation is now a grouped menu, Scene, Machinery and Tools, in place of the single board link. The actor board stays at `/board`, listed under Machinery, and the root still redirects to it.

- `libs/dotln/shell`: `dotln-sub-app-menu` (the one labelled navigation landmark) and `dotln-sub-app-menu-group` (a heading and a list) are content-projection templates with no injection and no router import. A group with no projected item shows a translated empty line, so Tools reads "No tools yet." until its first utility arrives. The layout's navigation slot becomes a neutral region, so the menu supplies the only `nav`; a consumer that projects a bare link into that slot now supplies its own `nav`, as the layout's spec and story do.
- `apps/dotln`: the app projects the three groups and keeps `routerLink`, `routerLinkActive` and `ariaCurrentWhenActive`. Two lazy routes load `@dotln-angular/scene` and `@dotln-angular/machinery`.
- `libs/features/scene` and `libs/features/machinery`: generated feature libraries tagged `scope:dotln,type:feature`. Each exports only its routes and ships one arriving page over the house empty state (the sub-app's name, what arrives and which change lands it, and a link back to the board) and a `testing` entry point with its provider kit.
- `libs/shared/core`: `BasePaths.Scene` and `BasePaths.Machinery`, with a route spec.
- i18n: `shell.menu.*`, `scene.arriving.*` and `machinery.arriving.*`.
- Documents: `docs/dev-reference/architecture/sub-apps.md` (the menu, its groups and the six steps that add a sub-app), `docs/ai-reference/sub-app-rules.md` (the rules for sessions: a sub-app is a feature library that exports routes only, writes no control record and never reaches the platform; graduation is a GitHub issue), conventions rule 22, pointers from both reference roots and the generator log's dated entry with the four planned invocations, the two refusals and the fallbacks that succeeded.
- Browser coverage: a new sub-app spec covers the menu headings, the empty Tools line, the keyboard path over every menu link, the active-link state, deep links and history, axe at the board's threshold and no horizontal overflow at 360, 768 and 1440. Four Storybook entries and six screenshot baselines are new; twelve board baselines are refreshed for the taller menu.
- No dependency changes. Two commits: the verified change, which is the draft's commit adopted by the final review without a change, and the records commit that files the order, its decisions and the verification and review reports under `docs/dotln/`.

## Verification

The first independent verification ran, at application sources byte-identical to this tree, without the Nx cache: `npx nx run-many -t test -p dotln-shell core scene machinery` (14 unit tests); `npx nx run-many -t lint build -p dotln dotln-shell core scene machinery dotln-e2e tools` (the production build emits separate lazy chunks for the board, the scene and the machinery); `npx nx e2e dotln-e2e` (57 browser tests against the served production build and the Storybook catalog); `npx nx e2e-visual dotln-e2e` (39 screenshot comparisons, no baseline changed); and `npm run format:check`, `i18n:check`, `lint:components`, `typecheck:foundations`, `lint:hygiene` and `check:kits`. A separate browser probe ran axe with the best-practice rules at every impact on `/board`, `/scene` and `/machinery` and found no violation, and found no horizontal overflow at 320 px.

The one change since that verification is documentary: the generator log's sub-app entry was gathered under its own dated heading at the end of the log, every line preserved. The re-verification at this exact tree reran the four unit suites and the 57-test browser suite without the cache, checked the log's line multiset against the earlier draft, and found no new defect. A third verification confirmed the tree unchanged. The declared review gate (install, lint, test, format, build, e2e and visual) passed at this tree with no tracked-byte mutation. The draft's CI run (the `checks` job and the macOS `visual` job) and its title workflow completed with success at this head.

## Review

The final review read the whole change against the base, the merge commit of the events-and-state change (#5). It reran every criterion's literal check at this commit, and reran the four unit suites (14 tests) and the browser suite (57 tests, 13 of them for the sub-apps) without the cache. It accepted the draft's commit as the reviewed commit without changing a file, and stands on those runs, on the declared review gate recorded at this tree, and on the draft's CI. Two earlier reviews of this same tree were held by defects in the launchpad's publication tooling: the change table was described from the repository's empty first commit, and the pre-review commit lint ranged over commits already merged here. Both were fixed upstream, and neither touched this code. No automated reviewer ran on the draft, its threads were empty, and the operator sent no note with the review dispatch.

## Known follow-ups

None of these blocks the change; each is boarded for the first change that touches its surface.

- An unknown path, such as `/tools` before it has a route, leaves the main region empty and shows the generic application-error notice. `main` behaves the same. The change that adds the Tools route and the catalog also brings a not-found page.
- The navigation store still builds the board route for every navigation payload; the new routes are reached through router links only. Map route ids to paths when a navigation event targets a second route.
- The toast wrapper has no Storybook story, and the board's failure state has no axe check.
- A group given no empty message and no item renders an empty list entry; every group in the app passes a translated message, and the architecture document says to.

## Notes

Tools has no route until the first utility arrives with its own page. The arriving pages carry no store or facade because they have no data to orchestrate. The screenshot baselines are macOS only. The launchpad records no release for this change; this repository's own release follows the order's close under its declared policy, with these reviewed notes rendered on it. The branch merges with a merge commit whose message is the pull-request title.
