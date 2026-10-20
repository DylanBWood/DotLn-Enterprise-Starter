# WO-005 executor self-review

The executor gave two fresh read-only workers the order and snapshots of the
target and launchpad diffs. Both ran with the skill's Codex worker pin:
`gpt-6.1-sol`, effort `max`. Neither edited files, ran checks, dispatched a
role or received the executor's conversation. Two workers were used; no
descendants were requested.

## Criteria adversary

Found 2; fixed 2; recorded without repair 0.

1. The bare-name ESLint selector admitted aliased and namespace token
   constructors that `check:tokens` rejected. The new `dotln/token-names`
   rule shares the standalone check's import-aware inspector. Real ESLint
   fixtures cover both bad descriptions and valid controls.
2. The filter facade omitted collection-first placeholder calls for
   dictionaries and Maps. Those overloads and compiler/runtime assertions
   now exist, along with dispatch and double-placeholder coverage.

The initial review found the libraries, environment, translation integration,
kits and notices present. Final executable acceptance evidence remained the
executor's duty.

## Design and maintainability reviewer

Found 2; fixed 2; recorded without repair 0. Both were medium severity.

1. The nonempty-string predicate unsafely narrowed unknown placeholders,
   whose runtime result is a truthy function. Primitive inputs retain the
   branded predicate; unknown inputs return a boolean/function union with
   no narrowing. Compiler and runtime regressions cover the unknown
   placeholder and the intended primitive composition.
2. The kit check resolved variable names through a file-wide map. A valid
   kit in one test could validate a fabricated object in another test.
   TypeScript symbols now resolve const bindings within lexical scope.
   The regression checks both source orders of identically named bindings.

The reviewer found the independent i18n/core adapter coherent and requested
no optional style changes. The initial review was static and did not audit
lockfile integrity independently.

## Executor's additional finding

Found 1; fixed 1; recorded without repair 0.

An optional placeholder parameter admitted an explicitly supplied
`undefined` collection, which the upstream runtime does not treat as a
missing argument. Separate unary and required-placeholder signatures remove
that admission. A real compiler fixture checks the rejected call and its
accepted curried control without a suppression directive.

## Executable checks

`NX_DAEMON=false npx nx run-many -t lint test --projects=utils,tools
--skip-nx-cache --output-style=static` exited 0 after these changes on
2026-10-20: 24 utility tests, 17 tooling tests, six foundation compiler
configurations, structural checks, translation extraction and real lint
fixtures. Full preflight and gate evidence is recorded in the handoff.

Aggregate: found 5; fixed 5; recorded without repair 0.

## Focused rereviews

Both original workers reviewed the corrected target diff. The criteria worker
closed both original findings and the additional explicit-undefined issue,
with 0 remaining or new findings. The design worker closed both original
findings, with 0 remaining or new findings. Both rereviews were static only;
the executable results above and the final gates are the executor's evidence.
