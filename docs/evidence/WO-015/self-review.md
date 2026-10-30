# WO-015 executor self-review

Three fresh independent `dotln-worker` agents reviewed this execution, read-only, with
non-overlapping briefs: the criteria adversary (`a6cac516f433ba251`), the design improver
(`aea0d8ec703ff0b55`) and the consistency reviewer (`a33c9a4cd4560c47a`). They reviewed the first
pass before it reached the operator, then, because the fixes were material, the same agents looked
again. Each round's probes were in-memory or in the session scratchpad; no
reviewer wrote to either repository. No agent beyond these three was spawned: 3 of the cap of 20.
Their model is claude-opus-5-5 by the agent definition; their effort has no host readback.

Findings are counted once each. Where two reviewers found one defect it counts as one, so the
columns sum to more than the total.

| Round  | What it reviewed                | Criteria adversary | Design improver | Consistency | Distinct |
| ------ | ------------------------------- | ------------------ | --------------- | ----------- | -------- |
| First  | The first pass                  | 22                 | 45              | 16          | 76       |
| Second | The fix pass                    | 11                 | 14              | 7           | 31       |
| Third  | The regression fixes            | 14                 | 5               | none asked  | 18       |
| Fourth | The replaced arrival rule | 2 | none asked | none asked | 2 |
| Final | The write-backs after the gates | none asked | none asked | 5 | 5 |
| Total | | 49 | 64 | 28 | 132 |

Of the 132, 112 were fixed and 20 recorded.

## What the rounds were worth

The first round found the defects the operator would have met within minutes: a Fixed formation
after a Wedge that locked its leader, a formation that walked itself across the field after losing
a member, a flock that never rested, a same-frame step that replayed differently, and Compare's
memory growing without limit. D010 and D011 record the fixes.

The second round found that those fixes had broken things: a speed shed that froze flocks and
marching wedges, and two arrival rules reading a false 0.0 s. The third found the patched arrival
rule leaking in new ways, which is why D016 replaced it with a simpler one instead of patching it
again. The fourth round found that replacement sound, with one narrow route, which was tightened
and then recorded for what remains of it. The final check, after the gates, found five small
disagreements between the records and the code. One was in a target document, so both gates ran
again.

Regression tests exist for each fixed behaviour. The first round also showed that the original
per-frame spec could not fail and that the default-motion path had no cover: a publication spy, a
motion-on facade session and two motion-on browser cases now hold those.

## Recorded, not fixed

Each has its reason in the decision named.

| Finding                                                                                  | Where           |
| ---------------------------------------------------------------------------------------- | --------------- |
| A crowd under priority steering keeps a faint shimmer                                    | D010 follow-up  |
| A settled crowd under priority steering is slow to start again and can read arrived early | D010 follow-up  |
| A first-pass stored trial with no `from`: none can exist                                 | D011            |
| The read-before-save rule stays in the facade                                            | D011            |
| The view model stays flat                                                                | D013            |
| A painter's styles arrive through closures                                               | D013            |
| A unit's label and role are one string                                                   | D013            |
| Five names stand: the seek priority group, `saves`, `canSave`, `#toField`, `drag`        | D013, 5 findings |
| `interpretedKinds` stays a written list                                                  | D013            |
| `TrialBranch.label` is stored and unread                                                 | D013            |
| `createCanvasRenderer`'s fallback stays silent                                           | D013            |
| The default scene's home under `testing/fixtures`, which the order fixes                 | D013            |
| `TextSceneRenderer`, which the order requires                                            | D013            |
| Arrival stays in `simulation.ts` until a second scene needs another rule                 | D013            |
| Arrive at weight 0.05 with a long time to target never clears the snap to rest           | D013            |
| A wedge of twenty at the widest spacing takes 105 s to pause                             | D013            |

The follow-up is `FUP-e9b95694a5de071e`, deferred to the planning pass that takes the operator's
notes. `FUP-f1c8c645eb537501`, the reading's link to the scene, is settled by D007.
