# WO-014 catalog fan-out

Twelve catalog workers ran: eight classifiers, two sampling checkers, one synthesizer and one critic. Reruns reused the original worker. Implementation reviews are counted separately. The operator raised this work order's session cap to 40 on 2026-10-25. The executor is the sole worktree writer; worker artifacts land in separate session scratch directories. Workers use `codex-spawn-agent`, selected model `gpt-6.1-sol`, effort `max`; effective effort is not independently observed.

## Classifier brief

Read only your assigned JSONL map files and this contract. Do not open quarantine files, other intake, repository source, or external sources. Do not spawn agents. Do not edit any repository file. Write only within your assigned scratch batch directory. The executor owns the repository.

Classify every row once, retaining the one-based physical JSONL line and supplied id slug. Inspect each row's meaning; do not blindly map row types or keywords to transforms. Raw definitions and hooks are interpretation inputs only; do not copy them into artifacts or final messages. Each output row is a Tool below. Only ids, short concept titles and generic terms may be retained. Rewrite long titles to at most 80 characters. Never include definition, related, dotlnHooks, verified, section, chapter or other raw fields. No private names, paths, URLs or source quotations. Never print raw intake in final output.

A typed transform must honestly describe an observable change in a twenty-unit toy. Prefer a specific numeric ParamSpec and observable/metric when justified. Do not turn a broad architectural principle into channel.policy or order.issue by metaphor alone. Uncertain executable candidates are untyped with a short specific missing-contract reason (<=120 chars). Background, sceneElement and metric kinds have status background and no faces. Every other kind has all five faces, with a nonempty scene, observable and toyMetric. Untyped tools still specify honest candidate faces and a reason, never a claim that they execute. Analog is optional: omit unless a real listed platform role has an obvious relation, and rewrite its clause generically (<=120 chars); do not copy hooks. The closed enum must not grow. Do not force three typed tools for a work; report a shortfall honestly. Generic metrics are short lower-case kebab-case ids.

Transform semantics: steer.blend combines named steering weights; steer.priority chooses prioritized steering; formation.twoLevel assigns units to slots under a moving formation anchor; formation.fixed assigns fixed slots; objective.set sets a spatial/task objective; squad.form and squad.dissolve create/remove squad membership; order.issue sends a commander order; channel.policy changes delivery, routing, timeout or queue behavior for unit messages; ground.influence and ground.frag change influence/danger fields; path.cost changes path edge/region costs; level.zoom changes the visible level of description; level.ring exposes a real loop across levels. These kinds do not implement arbitrary pattern semantics; use untyped when parameters cannot describe the concept faithfully.

Output: tools-<batch>.json with exactly {schema:'tool-v0',batch,maps:[{file,rows,sha256}],tools:[Tool...]}. map.file is the basename only. Map SHA-256 is the digest of original bytes. Every source line must appear once. classifiedBy is classifier-<batch>. Preserve the source row's type as rowType. Sort tools by id. Write statement.json containing label, batch, rowCount, statement (one line naming only map basenames, explicitly saying no quarantine file was read), counts by status, any specific caveats, and your first up to three honestly typed ids. No raw map fields in this statement. Do not write source paths in checkpoints or statements.


The exact readonly type contract is `libs/shared/models/src/lib/toolbox.ts` in the target. Each worker receives that contract, only its assigned map filenames and read-only locations, its fixed id slugs and its own scratch output location. Absolute locations are supplied in session messages, never in this filed record.

## Source identities

| Batch | Work | Id slug | File | Rows | SHA-256 |
| --- | --- | --- | --- | ---: | --- |
| aifg-a | aifg | aifg-a | ai-for-games-3e-part-a.jsonl | 389 | 5252167b924021b26a4ed2d9e9df5beee78b374dbd60089565ff2cde34f7d870 |
| aifg-b | aifg | aifg-b | ai-for-games-3e-part-b.jsonl | 379 | ebc3793e94fd84a008775c061851ebf849b9669477dfdfdefdb3a8a9880434b3 |
| eip | eip | eip | enterprise-integration-patterns.jsonl | 288 | 53bcf751d362b920b638f1673d4312ccc0d5d474b116e684cb6b51cae33e9d2b |
| poeaa | poeaa | poeaa | poeaa.jsonl | 455 | 216fd5eaad7da111367ee23a136fd60283cf67185b950fade0983ea7d48ae468 |
| rxjs-core | rxjs | rxc | rxjs-core.jsonl | 481 | c8e2acd0ad804b15bf86db47d58f7a2d041c391ed7e74ad2df615c9ba69d52fb |
| rxjs-patterns | rxjs | rxp | rxjs-patterns.jsonl | 261 | 7a3cd3b794d277f07dcd94c5625b8e1046d61f1c8ab9bd8685b2a8052dd69d84 |
| geb | geb | geb1 | geb-map-part-1.jsonl | 237 | 41f4e58e581b4df80861e11cc5fc2a9c51c02b8061ce80d511703e9b446a71dc |
| geb | geb | geb2 | geb-map-part-2.jsonl | 336 | d1acbd4f0cd5ee6de7cdeccf1847287d50a4d3778146f74ab8279580373f7f05 |
| tt | tt | tt1 | map-part-1.jsonl | 364 | 53ffa503be3aaebb03b06b265679d8a3bb2b98aeb375fa7e24a80d41b37c8308 |
| tt | tt | tt2 | map-part-2.jsonl | 134 | 39138bd49a1e3e1cf18580285892fa8cb9847b94ee8c8cfe3ec7edb292e2de2a |
| tt | tt | tt3 | map-part-3.jsonl | 139 | 676b9592a6901803ee08cdebd5ad1b7fd2a7c4affc5dd6f87e606b46da4bdd91 |

Total: 3,463 rows across eleven maps. All four design pins match the work order. No map was modified.

## Sampling protocol

Two independent samples of 40 typed rows, stratified across every checkpoint that has typed rows, use deterministic seeds `catalog-checker-a-v0` and `catalog-checker-b-v0`. A missing typed batch is reported, not silently replaced. Checkers judge observable effects and optional role analogs. Failures return by id to the originating classifier, which reruns only those ids. The critic reads the summary and three separately seeded sample groups. The executor records each finding and disposition.


## Operator clarification — metaphor pass (2026-10-25)

The operator explicitly wants metaphors as well as executable mechanisms: applications at levels of the app, code, meta-processes, human/code interaction, and agent interaction. Their Boy Scout example connects bounded cleanup by an executor, repairer, or reviewer with improving a local area for its next user, without a literal game algorithm. The initial brief underemphasized this dimension; this section corrects that emphasis.

The following supplemental brief was sent to the original GEB, RxJS core and
Team Topologies classifiers. It applies to all rows in those three batches
(1,691 rows), not to an exhaustive second pass over the entire catalog.

Revisit EVERY assigned source row for useful cross-level applications. Retain existing ids, titles, source identity, and basic row classification unless a concrete correction is necessary. Add an optional analog when a specific, defensible correspondence to at least one actual listed DotLnRole exists. The clause should name the practical application or interaction in generic language (<=120 characters), not merely say "this is like that" or paraphrase the book. A metaphor need not be a literal implementation of the source domain. Useful analogs may appear on typed, untyped, OR background rows; background does not mean unimportant. Omit weak or vacuous mappings. Do not indiscriminately attach the same generic analogy to every row.

Keep executable claims honest: typed means the stated closed transform and parameters have an observable toy effect. An explicitly bounded metaphor can qualify when the transform itself expresses that toy effect; it need not simulate the full source-domain theory. Mere relabeling does not implement a missing operation. For a useful metaphor without such an operation, retain untyped with a specific missing-operation reason, or background when it is interpretive context. Never force the three-example quota or invent engine capabilities. Do not add schema fields or roles. Preserve the clean-room allow-list and raw-source restrictions.

Record in the worker statement a metaphorPass object with rowsRevisited, analogCount, analogByStatus, changedIds, and a short scope caveat. Record any targeted checker reruns separately. Only checkpoint and statement files in your assigned scratch batch may change. Do not copy raw source definitions, hooks, relations, private names, or quotations into the output.
