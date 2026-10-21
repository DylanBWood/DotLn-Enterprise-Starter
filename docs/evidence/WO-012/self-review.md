# WO-012 executor self-review

Two fresh read-only workers received only the order and candidate diff as
substantive task inputs. Both were launched as Codex `gpt-6.1-sol`, effort
`max`, with no inherited conversation and no descendants. These are launch
selections; neither worker received an effective-session readback. The root
retained the sole writer reservation. Two workers were used against cap 20.

## Criteria adversary

Initial report: **1 finding**, priority 2. The profile's classification
precheck counted only values beginning with `patch`, `minor` or `major`, so
one valid header plus a malformed second declaration could still count one.
The worker requested an all-header count followed by value validation.

Resolution: the profile now requires both the all-header count and the
recognized-value count to be one, with a token boundary on the value. The
bounded [classification probe](classification-probe.json) covers a valid
header, two valid headers, a valid-plus-malformed duplicate and an invalid
suffix. The same worker reread the revised profile diff and reported:
finding 1 resolved, **0 new findings**. It also confirmed the revised
branch-policy paragraph agrees with the release-close grant.

## Design, simplicity and maintainability improver

Initial report: **0 findings**. The worker found the configuration, grant
and profile coherent and within scope, preserving the registration and grant
identities and disposable roots. On a separate reread of the root's
branch-policy consistency hunk, it reported **0 new findings**, confirming
the tag route and four effects agree while the main-push, merge and settings
boundaries remain.

## Root output review and disposition

1. **Fixed:** the earlier branch-policy paragraph still prohibited all tags
   and listed only the original three publication effects. It now directs
   tags and Releases through the declared release-close route and lists the
   fourth effect. [WO-012-D007](decisions.md#wo-012-d007).
2. **Recorded for core:** diagnosis of the adversary's example showed the
   actual kit parser also accepts one valid classification plus a malformed
   duplicate. The profile precheck rejects it, but changing the kit is a
   non-goal. [WO-012-D008](decisions.md#wo-012-d008) and deferred
   `FUP-2232a29f1061494f` retain the reproduction, fix, paths and checks. The
   adjacent-work queue is disposed to that public follow-up.

self-review: found 3; fixed 2; recorded 1

Worker counts: criteria adversary found 1, fixed 1, recorded 0; design
improver found 0, fixed 0, recorded 0. Root counts: found 2, fixed 1,
recorded 1. Both workers reviewed snapshots, ran no tests and performed no
writes or lifecycle actions. Their reports do not replace the complete gate
or independent verification. Later evidence attachments are read by the root
and judged by the document gate.
