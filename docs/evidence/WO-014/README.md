# WO-014 executor evidence

The target candidate adds the toolbox catalog, its schema and validation pipeline,
lazy loader, test kit and Tools browser over the merged WO-013 base `8318487`.
The launchpad's recorded activation base remains unchanged. The executor has
made no commit, push, pull request or core integration.

The current [repair evidence](repair.md) supersedes the initial execution's
criterion 7 interpretation. It records the menu/provider split, curated typed
utilities, useful composition, performance measurements and durable guidance.
The repaired production initial bundle is **376.91 kB** with unchanged budgets.
VER-001 remains the immutable record of why the earlier candidate failed.
[Current target gates](repair-target-gates.json), [complete launchpad review](repair-launchpad-gate.json)
and the [repair handoff](handoff.md) record the passing repaired candidate.
[Repair preflight](repair-preflight.json) records 76 passing uncached browser
cases and [all 30 production samples](performance-samples.json). The latter
pass their behavior assertions but expose cold-load layout shifts; D020 retains
that measured defect as a planning follow-up. [Final chunk verification](repair-catalog-chunks.json)
confirms all eight catalog chunks are unchanged.

One additional read-only worker, reused for performance research and menu-source
analysis, ran during repair without descendants. It is separate from the twelve
catalog workers and two original implementation reviewers below.

The catalog contains **3,463 rows: 121 typed, 1,914 untyped and 1,428 background**.
There are **1,283 practical applications** (48 typed, 702 untyped, 533 background).
These are candidate correspondences, not evidence that every mapping works.
The closed transform vocabulary has fourteen members; scene execution belongs
to later work. Team Topologies has two typed examples and explicitly records a
shortfall of one under the [approved amendment](proposed-criterion-3.md).

## Catalog workers and scope

Exactly twelve distinct catalog workers ran, with no descendants: eight
classifiers, two checkers, one synthesizer and one critic. Reruns reused their
original workers. All were `codex-spawn-agent`, selected `gpt-6.1-sol`, effort
`max`, without inherited conversation. Root was the sole repository writer.
Worker effort beyond those launch arguments is not independently observed.
Per-worker tokens, elapsed time and USD are unknown: the safe harness usage API
has no linked child counters. Each worker's batch size and reruns record scope,
not an invented cost estimate.

| Worker | Batch / rows | Read statement |
| --- | --- | --- |
| classifier-aifg-a | aifg-a / 389 | Read all 389 rows of ai-for-games-3e-part-a.jsonl; no quarantine file was read. |
| classifier-aifg-b | aifg-b / 379 | Read only ai-for-games-3e-part-b.jsonl and the classification brief; no quarantine file was read. |
| classifier-eip | eip / 288 | Read enterprise-integration-patterns.jsonl in full; no quarantine file was read. |
| classifier-poeaa | poeaa / 455 | Read poeaa.jsonl for source classification, inspected all 455 rows, and no quarantine file was read. |
| classifier-rxjs-core | rxjs-core / 481 | Read every row of rxjs-core.jsonl and revisited its metaphor applications; no quarantine file was read. |
| classifier-rxjs-patterns | rxjs-patterns / 261 | Read rxjs-patterns.jsonl only; no quarantine file was read. |
| classifier-geb | geb / 573 | Read every row of geb-map-part-1.jsonl and geb-map-part-2.jsonl; no quarantine file was read. |
| classifier-tt | tt / 637 | Read map-part-1.jsonl, map-part-2.jsonl and map-part-3.jsonl; no quarantine file was read. |
| checker-a | all eight batches / 40 typed per round | Reviewed the assigned seeded sample and classifier contract; no quarantine file was read. |
| checker-b | all eight batches / 40 typed per round | Reviewed the assigned seeded sample and classifier contract; no quarantine file was read. |
| synthesizer | all eight checkpoints / 3463 | Recomputed the summary from the checkpoints, including the final corrected rows; no quarantine file was read. |
| critic | three 40-row groups plus one designated concern | Reviewed the summary and samples, then five corrected rows; no quarantine file was read. |

The table condenses the review workers' statements; their exact statements and
findings remain in the linked JSON reports. [Classifier statements](classifier-statements.json)
retain full rerun records. [Fan-out](fan-out.md) records the original and amended
briefs, eleven source basenames and SHA-256 digests. The map total and digests
match the source inventory; raw paths and map definitions were not committed.
No quarantine file was read by the executor or workers.

| Batch | Rows | Typed | Untyped | Background |
| --- | ---: | ---: | ---: | ---: |
| aifg-a | 389 | 7 | 208 | 174 |
| aifg-b | 379 | 19 | 269 | 91 |
| eip | 288 | 31 | 160 | 97 |
| poeaa | 455 | 3 | 302 | 150 |
| rxjs-core | 481 | 41 | 173 | 267 |
| rxjs-patterns | 261 | 9 | 189 | 63 |
| geb | 573 | 9 | 233 | 331 |
| tt | 637 | 2 | 380 | 255 |

The operator's clarification led to a bounded metaphor pass over every GEB,
RxJS core and Team Topologies row (1,691 rows). The other five batches retain
initial coverage apart from the corrections below. Neither this pass nor the
optional single analog field is an exhaustive mapping across every target area.

Reruns and dispositions:

- RxJS core shortened `rxc:187` and `rxc:226` observables to fit the schema.
- GEB normalized ten typed parameter names; the statement names all ten ids.
- Initial checker A found `rxp:148`; checker B found it and `geb2:201`. Both
  became untyped with specific reasons. A finite buffer does not execute an
  unbounded-buffer anti-pattern; an absent return edge does not establish a loop.
- The three original classifiers performed the bounded metaphor pass. GEB's
  and RxJS practice's earlier targeted corrections remain separately recorded.
- The critic found four issues across five rows. Original classifiers corrected
  `rxc:203`, `geb1:1`, `geb2:25`, `geb2:108` and `rxp:140`. The
  [critic recheck](critic-recheck.json) resolves all four. The synthesizer
  recomputed the final summary and confirmed it unchanged.

## Independent samples

[Sample generator](sample-catalog.mjs) uses deterministic seeds, includes the
first typed examples per checkpoint and fills each sample across all eight
batches. Initial and final samples are retained with the checkpoint hashes they
read. The final [checker A report](checker-a-final-report.json) admits 40 typed
rows and 14 optional analogs; [checker B](checker-b-final-report.json) admits 40
typed rows and 13 analogs. The samples overlap; these are not 80 distinct rows.

The [critic report](critic-report.json) reviews three seeded groups of 40 distinct
rows, one group per status, plus an explicit executor concern. Its four findings
and the [corrected rows](critic-corrections.json) are retained. The final checker
samples preceded this five-row correction; the targeted critic recheck covers
that delta. This is bounded scrutiny, not book verification or independent
semantic validation of all 3,463 rows. [Decisions](decisions.md) dispose findings.

## Catalog report

`npm run catalog:report` exited 0; [exact report](catalog-report.txt):

```text
Catalog: 3463 tools; 3463 mapped rows; 11 maps; 8 checkpoints.
work: aifg=768, eip=288, geb=573, poeaa=455, rxjs=742, tt=637
kind: analysis=489, background=1010, behaviour=646, metric=58, mode=184, relationship=172, rule=488, sceneElement=360, sceneType=56
transformKind: channel.policy=90, formation.fixed=1, formation.twoLevel=2, ground.frag=2, ground.influence=6, level.ring=6, level.zoom=3, path.cost=5, squad.form=1, steer.blend=3, steer.priority=2
status: background=1428, typed=121, untyped=1914
aifg — units-on-terrain; typed shortfall: 0
  aifg-a:144 | Weighted blending | steer.blend
  aifg-a:145 | Flocking | steer.blend
  aifg-a:149 | Priority steering | steer.priority
eip — channels; typed shortfall: 0
  eip:101 | Filter whole messages | channel.policy
  eip:105 | Copy to a recipient set | channel.policy
  eip:120 | Restore message sequence order | channel.policy
geb — levels; typed shortfall: 0
  geb1:13 | Drawing Hands | level.ring
  geb1:51 | Jumping out of the system | level.zoom
  geb2:174 | Self-engulfing television | level.ring
poeaa — channels; typed shortfall: 0
  poeaa:196 | Synchronous versus asynchronous distribution | channel.policy
  poeaa:251 | Batched writes | channel.policy
  poeaa:329 | Observer synchronisation | channel.policy
rxjs — marbles; typed shortfall: 0
  rxc:135 | concat | channel.policy
  rxc:137 | merge | channel.policy
  rxc:139 | race | channel.policy
tt — teams; typed shortfall: 1
  tt1:215 | Seven-to-nine maximum effective team size | squad.form
  tt1:319 | Team API request quotas and throttling | channel.policy
```

## Initial execution checks

[Preflight results](preflight.json) record the required target commands, UTC
start times, durations and exit codes. All passed, including format, combined
lint/test/build, negative lint fixtures, component/event hygiene, board/catalog
fixtures, catalog validation, 29 tooling tests, i18n and the complete browser run.
Commands ran sequentially through the bounded probe wrapper. Nx reused valid
cache entries where reported; browser checks executed against the served app.

The prohibited-field fixture exited 1 with a sanitized batch and `/tools/0`
location. Searching the catalog data for quoted `definition`, `related`,
`dotlnHooks` or `verified` keys returned no matches. Models/catalog tests iterate
all checkpoints and check status, transforms, reasons, provenance and summary
shortfalls. Tooling tests exercise schema refusal, count/digest corruption,
merge behavior and safe diagnostics.

The browser suite covers the required filters, untyped reason, unknown route,
axe threshold and overflow at 360/768/1440 pixels, plus paging, persisted state,
failed-load retry, focused details/return navigation and long menu options.
The first complete run found a shared menu placement defect; its bounded repair
and passing rerun are recorded in D009 and adjacent item `adjacent-0001`.

The visual update run passed 42 cases and created three catalog baselines. The
executor viewed the catalog at all three widths, the changed menu, board desktop
and mobile, and the actor-row baseline. Existing shell baselines include the new
Catalog navigation link. The normal visual comparison also passes in the final
review gate; all 42 cases compare against the reviewed baselines.

## Production build and lazy catalog chunks

The repaired build reports 376.91 kB initial raw / 102.65 kB estimated transfer,
within unchanged budgets. The first candidate reported 530.37 kB / 135.06 kB;
VER-001 correctly rejected its avoidable overrun despite its exit-zero build.
[Matched comparisons](bundle-comparison.json) and [repair evidence](repair.md)
explain the measured changes. The eight catalog files remain lazy chunks outside
the initial bundle, with unchanged bytes and hashes.
[Chunk sizes and SHA-256](catalog-chunks.json) record generated file bytes.

| Catalog batch | Lazy chunk | Raw bytes | Estimated transfer |
| --- | --- | ---: | ---: |
| tt | `chunk-BVthtYgh.js` | 349921 | 34.47 kB |
| geb | `chunk-D9PW1xf7.js` | 287557 | 26.65 kB |
| rxjs-core | `chunk-DzV0er0_.js` | 252295 | 25.08 kB |
| poeaa | `chunk-cy6MiSF2.js` | 214208 | 10.84 kB |
| aifg-b | `chunk-ExEp_Qyr.js` | 196597 | 16.30 kB |
| aifg-a | `chunk-CAspABmX.js` | 172100 | 14.74 kB |
| eip | `chunk-B533tzjP.js` | 144319 | 15.42 kB |
| rxjs-patterns | `chunk-C0rFL-So.js` | 141944 | 16.15 kB |

## Implementation review, decisions and planning

The independent [design review](design-review.md) found two issues. Both are
fixed: selected details receive focus with a return action, and validators expose
safe row locations. The fresh [criteria adversary](criteria-review.md), given only
the order and diff, found no actionable issue. [Self-review dispositions](self-review.md)
record both briefs and the executed regression evidence.
The twelve catalog workers above do not include the two required implementation
reviewers. The explicit session count is fourteen workers plus root, within the operator's
work-order cap of forty.

The [render comparison](render-comparison.json) measures five synthetic DOM
insertion/layout samples per arm: 50 rows versus all 3,463. It supports paging
without claiming real Angular latency. [Host qualification](host-qualification.md)
records the actual host, model and publication boundary.

The target's concept-mapping guidance and [planning handoff](planning-handoff.md)
preserve the operator's broader purpose: UIFA engineering through understandable
representations, multiple models and variations, then possible graduation to
primary skills, supports and compositions above a common IR. Repository and
artifact ownership remain a named planning question.

## Initial execution gate and usage receipt

[Target gate receipts](target-gates.json) record plain (40.138 s) and review
(63.087 s), once each, at target tree `42956188e31da73abb9ccb068f22310063414b53`.
All four plain and all seven review commands pass with no target-byte or HEAD
mutation and no new untracked base-checkout files. The required preflight,
including the launchpad document check at 00:16:32 UTC, precedes the first
full target gate at 00:19:06 UTC.

The complete [launchpad review](launchpad-gate.json), `npm test -- --review`,
passes seven fresh tasks in 13.683 s at code identity
`dbd80775eda0b78bb08729662389d78c2905051201848699f91eb04b1adbc897`.
The final document gate runs after the [handoff](handoff.md)'s last edit;
implementation-ready consumes its passing current-tree row.

Entry and handoff safe usage observations both report **0 observed subagents**,
with an **unknown uncounted remainder**. Handoff observation:
`node scripts/harness.mjs usage 01a17544-2822-7d43-8f4b-7d8fc2a2d14f`,
2026-10-26T00:21:30.925Z, source `codex-transcript-counter`, scope `dispatch`.
This does not mean no workers ran: Codex lacks the spawn hook. The explicit
session count is **14 workers plus root** (12 catalog, 2 implementation reviewers),
with no worker descendants, within cap 40. Final token counters remain in the
ignored receipt and response. The handoff gives the earlier observed usage and
its limits.
