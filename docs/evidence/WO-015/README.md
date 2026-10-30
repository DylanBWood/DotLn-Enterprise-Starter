# WO-015 execution evidence

The soldier scene is on `/scene`, which is now the app's root: twenty units on a dark field, a rail
of the sixteen tools the engine runs with each tool's definition read from the catalog, selection
the way a real-time strategy game does it, and instruments that show what each idea does to a group.
A tool's parameters act on the units as they change, and any two moments can be compared. The pure
engine in `libs/shared/scene-engine` carries the steering, the formations, a deterministic run and
its replay, for every later scene to reuse.

The operator played an earlier build of it and reached the reaction their bar named (D014), then
ended the feedback loop and the design comparison (D015). Their notes on what to iterate on go to a
later planning pass; this order did not take them.

See [decisions](decisions.md), [the comparison](design/comparisons.md),
[the rejected candidate](design/rejected-implementations.md),
[the self-review](self-review.md), [the executor walkthrough](walkthrough.md),
[host qualification](host-qualification.md) and [the handoff](handoff.md). The independent verifier's
walkthrough is a separate duty.

## What the decisions settled

D003 made this first pass a hand-off to the operator rather than to verification. D004 is the engine
as a general reader of catalog parameters. D005 and D011 are the persistence and import seams, D006
the tool list, D007 the catalog's link to the scene and D008 how the rail loads. D009 is what makes
the page a toy and not a demonstration. D010 and D016 are what the reviews changed in the engine's
behaviour, and D012 and D013 what they changed, or left, in its structure.

## Executable checks

All on the final target tree, with the target at its base commit `38f8afd` and every change
uncommitted.

| Check                                              | Result                                        |
| -------------------------------------------------- | --------------------------------------------- |
| `npx nx format:check`                              | Passed                                        |
| `npx nx run-many -t lint test build`               | 39 of 39 tasks                                |
| Scene engine, feature and store specs | 120, 170 and 30 |
| `npm run lint:fixtures`, `lint:components`, `lint:hygiene` | Passed                                |
| `npm run check:fixtures`, `check:tokens`, `check:kits`, `check:templates`, `check:scripts` | Passed |
| `npm run catalog:check`, `i18n:check`, `test:tooling`, `typecheck:e2e` | Passed                    |
| `npm run check:bundle`                             | 398,223 initial bytes, inside the budgets     |
| `npx nx e2e dotln-e2e`                             | 109 of 109                                    |
| `npx nx e2e-visual dotln-e2e`                      | 44 of 44                                      |
| `node scripts/target-gate.mjs WO-015` | All 4 commands, 53 s |
| `node scripts/target-gate.mjs WO-015 --review` | All 7 commands, 1 min 9 s |

The Preflight ran first, from 17:30Z to 17:34Z, and both gates passed after it, ending at 17:40Z.
The final consistency check then corrected `scene.md`, a document no build reads, so both gates ran
again on that tree, and those are the rows above. Nx replayed cached passes for `test`, `build` and
`e2e`, because their inputs had not changed since the Preflight and the first gates, so those rows
are not fresh runs; `lint` and `visual` ran fresh. The `npm ci` in each gate changed no tracked byte.

The engine also has evidence no spec holds, from throwaway probes on the final code: 300 random
sessions across all sixteen tools at slider extremes hashed the same live and in replay, and 4,500
random setups were checked for false arrivals. D016 gives the figures.

## Sizes

The initial bundle is 398.22 kB raw and 110.58 kB estimated transfer. The scene's lazy code is
102.50 kB raw and 26.97 kB transferred. The build still warns that `study-explanation.scss` is 1 kB
over its 4 kB style budget; that file is WO-019's and this order did not touch it.

## Limits

A crowd under priority steering is the one known behavioural limit (D010, `FUP-e9b95694a5de071e`): it
keeps a faint shimmer, so its run rarely pauses by itself, and a settled crowd sent somewhere near is
slow to start and can read as arrived early. Compare covers the ten seconds after the split, so a
slower group reads unknown in it, as the walkthrough's wedge does.

Comparing at the eight-hour limit on a step blocks the page for about 12.7 s; only a crafted import
or a working day's play reaches it. What was left unfixed from the reviews, and why, is in the
[self-review](self-review.md).

## For the commit

Three visual baselines of the arriving page, `scene-360`, `scene-768` and `scene-1440`, stand as a
staged deletion with untracked replacements of the same name, and five other new baselines are
untracked too. The commit has to add them, or `e2e-visual` loses them.
