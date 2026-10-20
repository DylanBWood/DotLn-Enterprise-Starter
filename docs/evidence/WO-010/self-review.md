# WO-010 self-review

Two fresh, read-only Codex workers received only the order and candidate
diff. No descendants were launched; explicit session count is 2 against
cap 20. Both launches selected `gpt-6.1-sol`, effort `max`, with
`fork_turns: none`; this records launch selection, not effective readback.
Neither worker had effective runtime readback; the parent's launch
arguments supply the selection recorded here.

## Criteria adversary

Found 1; fixed 0; recorded 1.

P2: the fork's detail endpoint omits `bypass_actors`; the order's title and
objective request endpoint proof, while the evidence uses an operator
screenshot for this field. The worker recommended an owner-authenticated
readback or explicit operator acceptance of the evidence substitution.
No other correctness or scope findings were reported.

Disposition: [WO-010-D005](decisions.md#wo-010-d005) records the evidence-method
deviation and the operator's response choosing UI confirmation. The
screenshot supplied in response to the empty-list confirmation request and
the later owner-web explanation establish that source. Criterion 4's
branch endpoint comparison passes. The handoff discloses that the bypass
list was observed in the supplied UI screenshot, not in the API response;
no bypass policy is waived and no API observation is invented.

## Design and maintainability improver

Found 0; fixed 0; recorded 0.

The worker found the comparator small and appropriate to both JSON shapes,
with unique rule types, expected-parameter comparison and metadata/bypass
verification kept in separate evidence. No actionable design, simplicity
or maintainability issue was reported.

Both workers reviewed only the supplied packet and ran no tests, gates,
external reads or writes. The complete test run follows their reviews.
