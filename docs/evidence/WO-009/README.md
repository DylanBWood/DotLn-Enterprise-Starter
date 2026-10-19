# WO-009 release display name evidence

Dispatch: `resume: next`, 2026-10-19. The instance now declares
`release.displayName` as `Launchpad`; the generated README claim and the
order heading prepare `v0.3.0`. The only configuration addition is the
`release` section. No component source changed or needed a version bump.

The product decision and procedural interpretation are recorded in
[decisions.md](decisions.md). Existing kit tests cover configured names,
release-title composition and the preservation of historical release names;
this configuration-only change adds no test or machinery.

## Executed observations

[commands.txt](commands.txt) records the command outputs, including the
configuration probe, canonical status, release preparation, release-surface
check, published-title observation and suite inventory.

| Criterion | Observation and evidence |
| --- | --- |
| 1 | The configuration probe printed `Launchpad`; canonical status exited 0 and selected active WO-009. |
| 2 | Preparation assigned `v0.3.0`, the next minor above local `v0.2.0`; the README block contains exactly ``This source prepares Launchpad `v0.3.0`.`` and the order heading ends in `(v0.3.0)`. The surface check printed `PASS release-block` and no `FAIL` row. |
| 3 | The candidate changes only `dotln.config.json`, `README.md` and `docs/` paths. The configuration diff adds one line and removes none. The literal `git diff --name-only main...HEAD` is empty because the executor makes no branch commit; the working-tree diff and untracked-file inventory establish the candidate's scope. Final review checks the committed branch form. |
| 4 | `npm test -- --review` passed all seven tasks; [gate-summary.json](gate-summary.json) projects its recorded row. [handoff.md](handoff.md) carries the criterion judgments, and the implementation-ready event binds the final document gate. The current cited execution guide replaces the older preflight-before-full-run wording. |

The complete run recorded exit 0 at 2026-10-19T17:00:21.843Z after
254,874 ms, including 243,203 ms waiting for host capacity before formatting.
All six structural checks and `kit-verify` executed freshly; no suite failed,
was skipped or was reused. The kit check verified 964 carried files.
The summary omits the full host-contention telemetry retained in the
canonical gate receipt. [self-review.md](self-review.md) records the two
independent worker reviews, both with zero findings.

## Published names and limits

The read-only, instance-qualified GitHub query returned `DotLn v0.2.0` and
`DotLn v0.1.0`, both published non-prereleases. These titles remain as
observed on 2026-10-19; this dispatch performs no publication or retitling.
The new title `Launchpad v0.3.0` is established here by the configuration
and existing composition path. Its external observation belongs to release
close after merge, as the order specifies.

Correction on 2026-10-19: the first GitHub query omitted `--repo` and returned
the upstream `DotLn v0.85.0` Release. That result did not describe this
instance and was discarded. The query was repeated with the repository
named by the order, without changing GitHub CLI settings. Local tags were
only `v0.1.0` and `v0.2.0`; no core tag was deleted.

The explicit minor classification governs the stale trailing patch
assumption. The working-tree scope observation and single complete-run
sequence follow [WO-009-D003](decisions.md#wo-009-d003).
