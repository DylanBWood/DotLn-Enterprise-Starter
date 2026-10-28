# WO-008 — Authentication and permissions for DotLn-Angular, legitimate from the Angular side: `auth` with an OpenID Connect authorization-code-with-PKCE client behind a port, in-memory token handling with single-flight refresh, expiry and invalid-token paths, the auth and permission stores, route and feature permission checks from a declared adjacency list, the mocked identity provider through MSW, and the failure-case matrix in unit and e2e tests

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Target release classification:** minor
**Target release notes:** reviewed
**Cost:** adds `libs/shared/auth` with its kit, the mocked identity provider
handlers (whose development signing key pair is generated when the mock
starts and is never committed), the `authHttpEvents` and
`sessionEvents` groups, guards, the permission directive, the `/login`,
`/denied` and `/account` routes, about 60 source files; adds one OpenID
Connect client library to `dependencies` and `jose` (development signing in
the mock) to `devDependencies`.
Removes nothing. Wall-clock: about 8 to 12 hours of executor work plus the
fixed cycle; unknown until run. Context bytes: WS-001 house rule 17, the
events and state documents, the client library's documentation, this order,
about 160 KB. Commands added in the target: none. Tokens: unknown until run.
Steps: 15. Re-mints: none. Refutations paid: eleven receipts (001 to 011) name this order, and the 2026-10-28 pass's receipt judges this text.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5 and §8),
on the operator's direction of 2026-10-17 (ignored intake capture, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`),
paraphrased: permissions enforced by deterministic conventions (a state
machine or adjacency lists) over routes and features, security first; a
mocked token and identity provider with a legitimate Angular side; every
failure case covered (errors, timeouts, expired and invalid tokens, how tokens
are stored); and authentication around the third week of a ten-pull-request
foundation. Planner-synthesized. Opaque identifier, not a priority. Clean-room screen:
public standards (RFC 6749, RFC 7636, OpenID Connect Core) and public
packages. Amended by the 2026-10-18 main-rules planning pass
([planning document](../planning/main-rules-and-platform-items-2026-10-18.md)
§6 D5, D7 and §8.1): the `--draft` route, the final-review obligation and
the repairs of receipt 001's known issues.
**Depends on:** WO-007 merged (hard: the event tiers, interceptors, stores and
MSW this order extends; the base above is provisional and is set to the merge
commit of the member before this one in the sequence, WO-016, by the planning
pass that follows it). Amended by the 2026-10-21
UI planning pass ([planning document](../planning/ui-planning-2026-10-21.md)
§6 D1 and D4): the release header, the node-spelled draft publish and the
board's path enum. Amended by the 2026-10-23 standard pass
([planning document](../planning/standard-pass-v0-93-0-2026-10-23.md) §6
D4): the publication rules of starter v0.91.0, the reviewed release notes
and the plan-gate carry-in; the base stays provisional until WO-007 merges.
Amended by the 2026-10-24 standard pass
([planning document](../planning/mining-run-orders-2026-10-24.md) §6 D4 and
§9): the plan-gate carry-in closed by starter v0.94.0 (update #23), the
record-path advisory of that starter, and the order's place in the sequence
after the first four sub-app orders (WO-013 to WO-016), so its base is set to
WO-016's merge commit by the planning pass that follows that merge; the
dependency on WO-007 stands. Amended by the 2026-10-24 second pass
([planning document](../planning/standard-pass-v0-96-1-2026-10-24.md) §6 D4): the base above is provisional: since starter v0.96.1 (core WO-230) the target publish describes the change from the merge base of the subject and the target's `main` and names the activation base beside it, so activation on this base publishes right; the planning pass that runs after WO-016 merges may set it to that merge commit, and none is required to (the 2026-10-24 second pass, D4); the record-path advisory
closed at v0.96.1; and receipt 008's known issues (the storage assertion over
issued tokens, the signing key never committed, the provider swap not
exercised). Amended by the 2026-10-25 pass ([planning document](../planning/standard-pass-v0-99-0-2026-10-25.md)
§6 D4): receipt 009's known issues (the storage grep's scope, the public
sub-app routes and the gated `/account` page, a production build without a
provider, `jose` as a development dependency, the refutations paid) and the multi-project check form of WO-013-D005. Amended by the 2026-10-26 pass ([planning document](../planning/acceptance-by-use-2026-10-26.md) §6 D9): rule 24's acceptance-by-use criterion (criterion 8) and the walkthrough, and receipt 010's items: the at-rest probe covers IndexedDB, Cache Storage and cookies as well as web storage (its item (b)), and the matrix gains a page reload during a session (c). Amended by the 2026-10-28 pass ([planning document](../planning/standard-pass-v0-100-0-2026-10-28.md) §6 D6 and D14): receipt 011's items (the walkthrough and the e2e run on the served `mocked` configuration build while criterion 5's production grep stands, its item (a); criterion 5 greps the mock's one marker string and the key identifier rather than endpoint paths, (b)), the `/account` page as prose rather than a key-value list (WS-001 rule 24 and G6), and a one-line design brief under rule 25.
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-007",
    "relation": "hard",
    "reason": "the events, interceptors, stores and MSW wiring this order extends; the base line is provisional and publishes right under starter v0.96.1's merge-base publish"
  }
]
<!-- dotln-dependencies:end -->

**Cites (read these sections):** `docs/workstreams/WS-001-dotln-angular.md`
(house rules 8, 10, 11, 16, 17, 21); `docs/repositories/dotln-angular.md`;
`docs/operator/README.md`; the target's `docs/ai-reference/state-rules.md`
and `component-rules.md`; the chosen client library's documentation at the
installed version; the OAuth 2.0 for Browser-Based Apps best-current-practice
draft (IETF) for the storage and refresh rules this order applies.

**Objective:** a visitor to `apps/dotln` signs in through an OpenID Connect
authorization-code flow with PKCE against a mocked provider, holds tokens only
in memory, is refreshed once when a request meets an expired token and
signed out when refresh fails or a token is invalid, sees only the routes and
features the declared permission model grants, and every failure case in the
matrix below has a passing test; swapping the mocked provider for a real one
changes configuration and nothing in the Angular code.

**Observed gap (dated 2026-10-18; restated by the pass that sets the base):**
the app has no identity, no tokens, no guards and no permission model;
`EnvironmentConfig.auth` is typed `unknown` (WO-005). No identity provider
exists for this project; the operator wants none set up yet and the operator's
later choice (a hosted provider) must drop in through configuration. By the
time this order activates, WO-013 to WO-016 have added the sub-app menu, the
catalog, the scene and the machinery view, none of which gates a route;
`routePermissions` covers every `BasePaths` member then present, the sub-app
members (`Board`, `Scene`, `Machinery`, `Tools`) stay public with an empty
permission list so their e2e specs need no session, the first gated surface
is this order's own `/account` page, and WO-017's `/twin` is the first
gated sub-app.

**Design:**

- Port and adapter: `AuthClient` (an abstract class in `auth`) with
  `signIn(returnTo)`, `handleCallback()`, `refresh()`, `signOut()`,
  `getAccessToken()`; one adapter over an established OpenID Connect client
  library (chosen at step 2 from the installed Angular's peer ranges, MIT or
  Apache-2.0, with PKCE and silent refresh; the decision records the choice
  and the alternatives), provided by `provideDotlnAuth(config)` reading
  `EnvironmentConfig.auth` (`issuer`, `clientId`, `scopes`, `redirectPath`,
  `postLogoutPath`), now typed `AuthConfig | null`; `null` means no provider
  is configured, the state of a production build until the operator supplies
  one.
- Token handling (house rule 17; the browser-based-apps best practice):
  access and refresh tokens in memory only (the store's state), never in
  `localStorage` or `sessionStorage`; refresh-token rotation honored; a
  preemptive refresh timer at `exp - skew`; a `401` triggers one single-flight
  refresh shared by concurrent requests, then replay, then `signOut` on a
  second `401`; claims `iss`, `aud`, `exp`, `nbf` validated on every token
  received (signature verification belongs to the API, stated in the
  document); a `BroadcastChannel` propagates sign-out to other tabs; the
  callback route strips the code from the URL after exchange; a redirect-loop
  guard stops after two consecutive callbacks without a token.
- Session state machine in `SessionStore` (`libs/shared/auth`, app tier,
  provided by `provideDotlnAuth`): states `anonymous`, `authenticating`,
  `authenticated`, `refreshing`, `expired`, `signedOut`; transitions as an
  exhaustive typed table (`Record<State, Partial<Record<EventType, State>>>`)
  tested for every cell; `sessionEvents` (app tier) and `authHttpEvents`
  (data-access tier: `exchange`, `exchangeSuccess`, `exchangeFailure`,
  `refresh`, `refreshSuccess`, `refreshFailure`) in `events`.
- Permissions: `PermissionsStore` derives `roles` and `permissions` from the
  ID token and access token claims; `routePermissions` is a declared
  adjacency list in `core` (`Record<BasePaths, Permission[]>`, with
  `BoardPaths` nested; an empty list means public, and at this order
  `Board`, `Scene`, `Machinery` and `Tools` are public while `Account`
  requires `account:read`, which the mock grants to its default user and
  withholds from its `denied` user); `canMatch` guards (`requirePermissions(...)`) read it;
  `*dotlnHasPermission` structural directive (a knowing directive in `auth`)
  hides elements; facades expose `can(permission)` for feature-level checks;
  denied navigation dispatches `navigationEvents.navigate({ route: BasePaths.Denied })`.
- Interceptors (extending WO-007's chain of base URL, timeout and error):
  `authTokenInterceptor` attaches the bearer token to requests whose URL is
  under `apiBaseUrl` only (the app's own API, mocked until the mining store
  exists; WO-007 reads no other host);
  `authRefreshInterceptor` implements the single-flight refresh and replay.
- Mocked provider: MSW handlers under `libs/shared/auth/src/testing/idp/`
  implement discovery (`/.well-known/openid-configuration`), `token` (code
  exchange with PKCE verification, refresh with rotation, configurable
  lifetimes and failures), `jwks`, `userinfo` and `end_session`. The
  `authorize` step is a top-level navigation, which MSW does not intercept,
  so it is served by the app itself in development: the route
  `/mock-idp/authorize` renders the mock login page, validates the PKCE
  challenge it received and redirects back to `/auth/callback` with a code;
  Playwright drives that page directly, and no `page.route` handler is
  needed. Tokens are signed with a development RSA key pair generated at startup
  through `jose` under a fixed key identifier (`kid`) the bundle check in
  criterion 5 names; no key material is committed to the repository, so forge
  secret scanning has nothing to match (the `kid` is a label, not a key); the handlers expose knobs (`expiresInSeconds`,
  `failNextRefresh`, `invalidSignature`, `skewSeconds`) through a test-only
  header so e2e can drive the matrix. The mocked endpoint paths live in one
  constants file under `testing/idp/`, and every module of the mock carries
  the one marker string `dotln-mock-idp`, so criterion 5's production grep
  targets that marker and the key identifier rather than endpoint paths a
  client library legitimately contains.
- Routes: `/login` (anonymous shell page with the sign-in button; with
  `auth` at `null` it shows the unavailable state naming the missing
  configuration instead of the button, and the public sub-apps stay
  reachable), `/auth/callback`, `/denied`, `/account` (what the signed-in
  operator reads about their session: who is signed in, what they may do,
  one sentence per permission, and when the session expires, as prose in
  the catalog's measure and never a label-value grid, because WS-001 rule 24
  fails a page of records rendered that way and G6 never defaults to it; the
  gated surface the matrix drives), `/mock-idp/login` (development only,
  excluded from production builds by environment); `BasePaths` gains them.
- **Design brief** (WS-001 rule 25): the login, denied and account pages use
  the shell's type scale and the catalog's measure; the login page is one
  sentence and one button, the denied page one sentence naming the missing
  permission and a way back, the account page the prose above; nothing
  animated at rest. The comparison runs as the operator's eye doctor test
  (rule 25 as revised on 2026-10-28): the first pair is the account page
  with the permissions first and the session's expiry and sign-out last,
  against the session's expiry and sign-out first; both rendered at 1440 and
  360 during execution, A then B with the round named; the preference makes
  the next pair until the operator says the process is done; the rejected
  implementation leaves the code when its round is decided, its screenshots
  and the decisions file the history; nothing is relitigated for this order.
- Failure matrix, each a unit spec and, where the UI changes, an e2e test:
  network timeout on token exchange; `exchangeFailure` with `invalid_grant`;
  expired access token on request (refresh once, replay); refresh failure
  (sign out, `/login` with `returnTo`); invalid signature or wrong `aud`
  (reject, sign out, `errorEvents.security`); clock skew within and beyond
  tolerance; two concurrent `401`s (one refresh); callback without `state`
  match (reject); redirect loop (stop after two); sign-out in another tab;
  permission denied on route (redirect to `/denied`); permission revoked on refresh (element hidden on next render); a page reload during a session (the session is re-established through the provider's silent path or the operator is returned to `/login` with `returnTo`, and either way no token is at rest).
- Documents: `docs/dev-reference/security/authentication.md` (flow diagrams
  in text, storage rules and why, the matrix, how to swap the provider, and
  the statement that the server enforces authorization while client checks
  shape presentation only) and `docs/ai-reference/auth-rules.md` (imperative
  rules: tokens in memory only, attach bearer only to API URLs, never log
  tokens, permission checks through the store, client checks never the
  security boundary, mock knobs only in development and tests).

Rejected: hand-rolled PKCE and token parsing (axis: an established client
library is the legitimate choice; the port keeps it swappable); tokens in web
storage (axis: the best-current-practice forbids it for this profile);
implicit flow (axis: deprecated); role checks spread across templates (axis:
one adjacency list and one store).

Live-run surfaces at the base: none beyond WO-004's.

**Deliverables:** `libs/shared/auth` with `testing`; the events; the
interceptors; the stores; the guards and directive; the routes; the mocked
provider; the matrix tests; the two documents; `docs/evidence/WO-008/`.

**Execution plan:**

1. Base guard and activation as WO-005 step 1, for WO-008.
2. Choose and install the client library (`dependencies`) and `jose`
   (`devDependencies`); record the decision with the alternatives and the
   license. Check: `npm ls` exits 0 and
   `node -e "const p=require('./package.json');if(p.dependencies.jose)throw new Error('jose')"`
   prints nothing.
3. Generate `auth` (`scope:shared,type:auth`) with logged commands; `events`
   gains `sessionEvents` and `authHttpEvents`; `models` gains `AuthConfig`,
   `Permission`, `Claims`. Check: `npx nx test events` exits 0.
4. `AuthClient` port and adapter; `provideDotlnAuth`. Check: adapter spec
   against the MSW provider exits 0.
5. `SessionStore` with the transition table and its exhaustive spec. Check:
   `npx nx test auth` exits 0 and the spec covers every state × event cell.
6. Interceptors with single-flight refresh; specs for the concurrency case.
   Check: `npx nx test auth` exits 0.
7. `PermissionsStore`, `routePermissions` in `core`, guards, directive,
   facade `can()`. Check: `npx nx run-many -t test -p core auth home` exits
   0 (the multi-project form Nx parses; `npx nx test a b` runs only the first
   project, WO-013-D005).
8. Mocked provider handlers, signing key, knobs, `/mock-idp/login` page
   (development only). Check: `npx nx serve dotln` completes a sign-in in
   the browser (recorded).
9. Routes and pages (`/login`, `/auth/callback`, `/denied`, `/account`);
   `BasePaths` updated; `app.config.ts` wiring. Check: `npx nx build dotln --configuration=production`
   exits 0 and the production bundle contains no `mock-idp` string
   (`grep -rc "mock-idp" dist/apps/dotln/browser | grep -v ":0"` prints
   nothing).
10. The e2e matrix in `dotln-e2e` using the knobs; then the walkthrough: the executor performs the Objective's session in the served `mocked` configuration build (WO-007's configuration for e2e and play; the production build, which criterion 5 keeps free of the mock, has no provider to sign in to), saves one screenshot per step at 360, 768 and 1440 under `docs/evidence/WO-008/walkthrough/` and writes `docs/evidence/WO-008/walkthrough.md` with the dated steps. Check: `npx nx e2e dotln-e2e` exits 0 and the walkthrough files exist.
11. Documents and `conventions.md` (house rule 17). Check: files exist;
    `npm run i18n:check` exits 0.
12. Gate plain and review. Check: passing rows, no mutation.
13. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the guard, interceptor and store paths; WS-001's
    delivery states updated by the final review. Check: `npm run test:docs`.
14. Commit with messages that carry no launchpad identifier (`WO-008`,
    `FUP-…`, `VER-…`), because starter v0.91.0 refuses them in a target's
    branch, commits, title and body; `implementation-ready`; handoff per
    §Discipline. After the session that records `verification-result pass`
    has done so, that session runs, from the launchpad root, as a plain
    command with no pipe, redirect, directory change or variable prefix,
    `node scripts/worktree.mjs publish WO-008 --target-worktree --draft --branch feat/authentication-and-permissions --title "feat: add authentication and permissions" --body-file <reviewed path>`
    (the node spelling is the only form the kit admits for a registered
    target since starter v0.87.0), which commits from the tree without
    moving `HEAD`, pushes the branch and opens the draft pull request. A
    `vocabulary.review` refusal prints the composed body's digest: the
    session reads the flagged lines and re-runs the same command with
    `--confirm-terms sha256:<digest>`; a `refuse:` private term or a
    launchpad identifier is repaired, never confirmed. The session records
    the hook's admission row and the host's decision in
    `docs/evidence/WO-008/host-qualification.md`; if the host's classifier
    denies the admitted call, the operator's `!`-prefixed run of the same
    command is the recorded fallback.
15. At final review: read the draft's threads and workflow runs into
    `docs/evidence/WO-008/preview-pr.json` and route each item, write
    `docs/final-reviews/WO-008/RELEASE-NOTES.md` (the five sections the
    kit renders on the target Release), `target-records`, then the same
    publish command without `--draft`, which
    force-pushes with lease against the recorded draft head and reuses the
    branch and the pull request. No work-in-progress commit, no force-push
    by hand, no manual close.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run i18n:check`,
`npx nx e2e dotln-e2e`; in the launchpad order worktree `npm run test:docs`;
then the target gate plain and review once each.

**Acceptance criteria (all required)**

1. `grep -rlE "localStorage|sessionStorage" libs/shared/auth/src --include='*.ts' | grep -v spec`
   prints nothing, and the same grep over the files under `apps/dotln/src`
   this order adds or changes
   (`git diff --name-only $(git merge-base HEAD origin/main)..HEAD -- apps/dotln/src`)
   prints nothing; `grep -rc "console.log" libs/shared/auth/src --include='*.ts' | grep -v ":0"`
   prints nothing; and an e2e step after the sign-in reads every key of `localStorage` and `sessionStorage`, every object store of every IndexedDB database, every Cache Storage entry and every cookie, and asserts that no value matches the JWT shape (three dot-separated base64url segments) and that no value
   equals or contains any token the mocked provider issued in that session
   (the handlers keep the tokens they issued behind a test-only knob the e2e
   reads), which covers opaque refresh tokens and the client library's own
   stores as well as house code.
2. `libs/shared/auth/src/lib/session/transitions.ts` declares the transition
   table for the six states and `transitions.spec.ts` asserts every state and
   event pair (the spec iterates the table and the event list, so an
   unhandled pair fails); `npx nx test auth` exits 0.
3. Unit specs exist and pass for each matrix row: timeout on exchange,
   `invalid_grant`, expired-then-refresh-then-replay, refresh failure to
   sign-out, invalid signature, wrong audience, skew within and beyond
   tolerance, two concurrent `401`s producing one refresh request (asserted
   through the MSW handler's call count), `state` mismatch, redirect loop stop, cross-tab sign-out, page reload during a session.
4. `core` exports `routePermissions` covering every `BasePaths` member
   (a spec asserts the record's keys equal the enum's values and that
   `Board`, `Scene`, `Machinery` and `Tools` map to an empty list), guards
   use it, the `board`, `scene`, `machinery` and `catalog` e2e specs run
   unchanged without a session, and `npx nx e2e dotln-e2e` includes: sign in
   through the mocked provider and land on `returnTo` at `/account`;
   `/account` as the `denied` user redirecting to `/denied`; an element hidden by `*dotlnHasPermission` for a user without the permission; a reload at `/account` keeping the session or returning to `/login` with `returnTo`; token expiry during use followed by a transparent refresh; refresh failure
   returning to `/login`.
5. The production build contains no mock provider code:
   `npx nx build dotln --configuration=production` exits 0, and for the
   development signing key's identifier (the `kid` constant) and for the
   mock's marker string `dotln-mock-idp` (both listed in the evidence
   README), `grep -rl "<value>" dist/apps/dotln/browser` prints nothing (the
   mock's endpoint paths are not grepped, because a client library
   legitimately contains such paths; every mock module carries the marker
   instead); the bearer token is attached only to requests under
   `apiBaseUrl` (a spec asserts a request to another origin carries no
   `Authorization` header); `jose` is listed under `devDependencies` and not
   under `dependencies` (the step 2 check prints nothing); and with `auth` at
   `null` the four public routes' guards admit an anonymous visitor and the
   login page renders the unavailable state (two specs assert it).
6. `docs/dev-reference/security/authentication.md` states the storage rule,
   the refresh rule, the matrix, the provider swap and that the server
   enforces authorization while client checks shape presentation only
   (`grep -c "server enforces authorization" docs/dev-reference/security/authentication.md`
   is at least 1), and `docs/ai-reference/auth-rules.md` exists.
7. `node scripts/target-gate.mjs WO-008 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight line ran before the first full gate.
8. **Use (WS-001 rule 24).** The verifier performs the Objective's session in the served `mocked` configuration build (criterion 5 keeps the mock out of the production build, so the walkthrough runs on the configuration that carries it): open `/account` anonymously and be sent to `/login`; sign in and land back on `/account` and read, as prose, who is signed in, what they may do and when the session expires (`grep -rlE "<dl|dotln-key-value-list" libs/shared/auth/src apps/dotln/src/app` prints nothing); reload and keep the session or be returned to `/login` with `returnTo`; sign in as the `denied` user and land on `/denied`; drive the expiry knob and watch a request succeed through a transparent refresh; drive the refresh-failure knob and land on `/login`; open a second tab, sign out there and watch the first tab follow. The VER report carries a `## Walkthrough` section with the dated steps and names the screenshots at 360, 768 and 1440 under `docs/evidence/WO-008/walkthrough/` (`ls docs/evidence/WO-008/walkthrough | wc -l` prints at least 12), and states in the verifier's own words what each page said at each step. The criterion is met only when every step completed and that statement is present.

**Evidence gate:** the gate rows, the recorded command outputs, `docs/evidence/WO-008/README.md`, and `docs/evidence/WO-008/walkthrough.md` with its screenshots.

**Known issues and carry-ins:** The base line is provisional and publishes right under starter v0.96.1 (the merge-base publish of core WO-230; WO-013's fix dispatch is its first use in this fork); a pass may set it to the predecessor's merge commit. Starter v0.94.0 (update #23 of 2026-10-24) carries
core's fix for the plan gate's moved-record reader, so criterion 7's
`npm run test:docs` clause is judged as written and no waiver is carried.
Starter v0.96.1's plan gate no longer advises on this order's own launchpad record paths (core's answer of 2026-10-24, item 1); they stay as the kit names them and the publish command's body file must not name them. From receipt 008 (the 2026-10-24 pass's refutation), carried
into this text by the 2026-10-24 second pass: criterion 1's storage assertion
now covers opaque tokens through the mock's record of what it issued; the
development signing key pair is generated at the mock's start and never
committed; and the objective's provider swap is documented (criterion 6) but
not exercised by a second provider configuration, which a later member with a
real provider pays for. From receipt 009 (the second 2026-10-24 pass's
refutation), carried into this text by the 2026-10-25 pass: criterion 1's
app-side grep runs over the files this order changes, so a storage helper
an earlier member placed in the app is not this order's failure; the
sub-app routes stay public and `/account` is the gated surface, so no
earlier e2e spec gains a sign-in and WO-018's toy shelf under Tools stays
public (the design, criterion 4); a production build with no provider keeps
the public sub-apps and shows the unavailable state at `/login`, with `jose`
in `devDependencies` (criterion 5); step 7 uses the `run-many` form. WO-007's
`StorageToken` binds the real `localStorage` inside
`libs/shared/data-access`, so criterion 1's grep over `libs/shared/auth/src`
and `apps/dotln/src` stays clean by construction. From receipt 011 (the
2026-10-26 pass's refutation), carried into this text by the 2026-10-28
pass: the walkthrough and the e2e run on the served `mocked` configuration
build while criterion 5's production grep stands (its item (a)); criterion 5
greps the mock's marker string and the key identifier, not endpoint paths
(b); eleven receipts have named this order before its activation, and its
text changes again only on a new observation, which these two clauses and
the account page's form are (c). The account page reads as prose because
rule 24 fails a page of label-value lists, and the order carries a one-line
brief under rule 25 (the 2026-10-28 pass, D14). The client library is
chosen at step 2 with a recorded decision; signature verification is the API's duty and is stated, not
implemented, on the client; a real provider is a later member. This order
activates only on a launchpad whose starter carries core WO-221's `--draft`
form (WO-005 step 1's route guard); the draft pull request and its workflow
runs are a final-review obligation read from
`docs/evidence/WO-008/preview-pr.json`, never a criterion (main-rules
planning document §6 D5 and D7). The `Target release classification`
header was added by the UI planning pass of 2026-10-21 under WO-012's
declared policy (`DotLn Angular` releases; minor, a feature release); the
pass that sets the base confirms it. `Target release notes: reviewed` was
added by the 2026-10-23 pass under starter v0.91.0.

**Non-goals:** a real identity provider or API; a backend-for-frontend;
multi-factor flows; user management screens; social login.

**Operator-review assumptions:** the operator accepts an established OpenID
Connect client library behind the port rather than hand-rolled flows,
accepts the account page as prose and may open a comparison round on any of
the three pages (rule 25), and reads the one draft pull request before final
review, which the final publish reuses.
