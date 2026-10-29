# WO-019 execution evidence

The catalog carries the recorded definitions, places, relations, hooks and
verification notes for all 3,463 concepts. The reading surface supports the six
works, their contents, search, linked concepts and ten persisted recent readings.
One separately authored Arrive study demonstrates the deeper concept direction;
the remaining concepts have their joined source content, not authored studies.

Execution paused on 2026-10-26 after preparing round 22 ([pause record](pause.md),
kept as history). It resumed under Claude Code on 2026-10-28: main was
integrated twice (D022, D023), round 22 was decided (D024), and the operator
ended the design comparisons (D025). The closeout review's repairs are D026, the
operator's tooling direction is D027 (follow-up `FUP-bd2535b42e13d360`), three
follow-ups are D028–D030, and D031 records why this target order does not run
the launchpad's complete suite (follow-up `FUP-2403ce12b1fca8b2`); D032 replaces
the repository profile's run-on paragraph with what a reader uses. See
[comparisons](design/comparisons.md), [decisions](decisions.md),
[scope receipt](ideation.md), [planning handoff](planning-handoff.md),
[self-review](self-review.md), the [executor walkthrough](walkthrough.md) and
[host qualification](host-qualification.md). The independent verifier's
walkthrough remains a separate duty.

## Catalog data

Eight v1 checkpoints preserve all 3,463 map rows: 129 typed, 1,907 untyped and
1,427 background concepts. The eleven source digests and the typing warrants are
recorded in D002 and D004; quarantine files were not inputs. The 2026-10-28
re-join read the same eleven digests and corrected two derived rules (D026):
verification kinds are now 2,202 sourced, 1,260 model-knowledge and 1 partial
(eip:258), and a relation never links a concept to itself. The summary records
the join day, 2026-10-28.

Relations resolve only when one exact title of another concept exists in the
same work. Unresolved, ambiguous or self-referring relations keep their text with
a null id. `npm run catalog:report` on 2026-10-28 prints:

| Work | Resolved relations | Total relations | Resolved |
| --- | ---: | ---: | ---: |
| AI for Games | 980 | 1,335 | 73.4% |
| Enterprise Integration Patterns | 1,073 | 1,088 | 98.6% |
| Gödel, Escher, Bach | 482 | 965 | 49.9% |
| Patterns of Enterprise Application Architecture | 705 | 772 | 91.3% |
| RxJS | 821 | 1,382 | 59.4% |
| Team Topologies | 919 | 1,183 | 77.7% |

AI for Games exposes 16 scene tools, including all ten concepts named in the
order's scene floor. The objective remains a scene action because the source
inspection did not warrant a new objective tool. The existing Team Topologies
shortfall of one remains recorded. The loader retains v0 compatibility for one
release through a private reader and shows missing old content explicitly.

## Rendering and loading

The selected design puts contents beside the reading and explanations behind
disclosures, with several open at once. Movement and Velocity switch over one
time position, with controls below the visual and a separate legend; the worked
calculation follows the timeline. The reactive explanation switches between Data
flow and Event timeline with shared rules and pseudocode. Implementations are
explained separately (round 20), both late-braking runs share one chart (round
21), and the ordinary pseudocode is shown complete with each step's lines in a
closed disclosure (round 22). Serif reading type, tighter definition lines,
collapsed source notes, section previews, one regular-weight parameter per line
and related concepts at the article's end are preserved. Decided alternatives
were removed from runtime code and stories; their
[implementation history](design/rejected-implementations.md) and screenshots
remain.

Closed explanations construct nothing before expansion, construct once on first
expansion and are retained on collapse; the optimized build downloads one
explanation chunk on first expansion and nothing on reopening. No animation runs
at rest.

The production bundle check in the final Preflight (2026-10-28T22:13–22:17Z)
measured **393,633 initial bytes (393.63 kB)**, beside WO-014's 376.91 kB, with
no lazy catalog, Tools or menu code in the initial graph and the menu arriving
with Tools. The initial graph's 17,564 bytes from `@angular/aria` and 12,221 from
`@angular/cdk` are tabs, list navigation, expansion and deferred-content support
and the CDK's accessibility, breakpoint, platform and direction utilities; no menu
or overlay module is among them.

## Performance observations

The optimized-build sampler completed all 30 journeys at 2026-10-28T22:01:40Z
(five samples each of three journeys under a desktop profile and a constrained
one with 4× CPU slowdown, 150 ms latency and 1.6 Mb/s download). See the
[portable measurements](performance.json). All functional assertions passed.
The sample and the walkthrough below were taken before the follow-up refactors
of 22:02–22:13Z, which change no rendered output; the browser and visual suites
of the final Preflight and the review gate ran on the final tree.

| Profile and journey | Median LCP candidate, ms | Median observed CLS | Maximum observed interaction event, ms |
| --- | ---: | ---: | ---: |
| Desktop, board then catalog | 88 | 0.947 | 48 |
| Desktop, direct catalog | 88 | 0.351 | 64 |
| Desktop, warm catalog | not sampled | 0 | 32 |
| Constrained, board then catalog | 2,128 | 0.618 | 96 |
| Constrained, direct catalog | 5,012 | 0.471 | 88 |
| Constrained, warm catalog | not sampled | 0 | 72 |

These are local diagnostics, not field Core Web Vitals: the event maximum is not
INP, and action completion includes automation overhead. Every row's median CLS
except one matches the 2026-10-26 sample; LCP candidates and event maxima moved by
small amounts. Desktop board-then-catalog CLS rose from a 0.158
median (maximum 0.642) to 0.947 (minimum 0.642). Its attribution is the shell's
cold-load shift about 78 ms into the board load, before the catalog is reached:
`main` moves down 36 px, the navigation bar grows and the footer collapses; the
value depends on whether the footer has collapsed when the shift is measured.
This is the shell and board issue the order carries from WO-014-D020; the direct
catalog journey's own shift is unchanged.

## Executable checks

The final Preflight on the final target tree passed all 13 commands at
2026-10-28T22:13:50Z–22:17:27Z: format, workspace lint/test/build, lint
fixtures, components, hygiene, fixtures, catalog check, 41 tooling tests,
translations, the bundle check, foundations, browser type check and 85 browser
tests. The [command record](preflight.json) keeps every run, including the
closeout's failures and their repairs: two lint failures from rounds 21 and 22
the earlier tools-only lint had not reached, then the template check's demand
that the moved axis labels sit inside `translate="no"`, and during the review
repairs a format failure from the unformatted re-joined data and a type error
from a shelf change that also failed the build, bundle and browser runs. The
visual suite passed 42 of 42 at 21:25:06Z and
again at 21:47:51Z; its tolerance absorbed the parameter-line shift, so the three
catalog baselines were regenerated after the fix (21:50:01Z) and inspected. The
registered review gate's visual row is the record for them.

The executor walkthrough completed all eleven steps at 360, 768 and 1440 pixels
at 2026-10-28T21:58:40Z against the served optimized build. Round 22's selected
design passed six rendered checks ([selected checks](design/round-22/selected-checks.json)).

Three fresh independent workers reviewed the order and diff; their findings,
repairs and dispositions are in the [self-review](self-review.md). The target
gates and the launchpad document gate are recorded in the handoff.
