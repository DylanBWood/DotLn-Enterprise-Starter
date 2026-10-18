# WO-008 — Authentication and permissions for DotLn-Angular, legitimate from the Angular side: `auth` with an OpenID Connect authorization-code-with-PKCE client behind a port, in-memory token handling with single-flight refresh, expiry and invalid-token paths, the auth and permission stores, route and feature permission checks from a declared adjacency list, the mocked identity provider through MSW, and the failure-case matrix in unit and e2e tests

**Model:** any capable model; state the model and effort actually run
(07-execution-guide.md §Model-specific notes).
**Effort:** executor xhigh+; verifier xhigh; reviewer xhigh.
**Track:** delivery
**Release classification:** none; a target order records no launchpad release.
**Repository:** dotln-angular @ bc9133e932a00d33c15bc5289d683b8078f51ee4
**Cost:** adds `libs/shared/auth` with its kit, the mocked identity provider
handlers and signing key for development, the `authHttpEvents` and
`sessionEvents` groups, guards, the permission directive, the `/login` and
`/denied` routes, about 60 source files; adds one OpenID Connect client
library and `jose` (development signing in the mock) to the workspace.
Removes nothing. Wall-clock: about 8 to 12 hours of executor work plus the
fixed cycle; unknown until run. Context bytes: WS-001 house rule 17, the
events and state documents, the client library's documentation, this order,
about 160 KB. Commands added in the target: none. Tokens: unknown until run.
Steps: 15. Re-mints: none.
**Nomination provenance:** the 2026-10-18 angular-workstream planning pass
([planning document](../planning/angular-workstream-2026-10-18.md) §5 and §8),
on the operator's direction of 2026-10-17 (ignored intake capture, SHA-256
`4f14c6c09512576abfd701335f4dd8a347694ff23785724422cb8d943b5d67aa`):
permissions baked in with deterministic conventions (state machine or
adjacency lists) on routes and features; security first; mock the auth token
and the identity provider but keep the Angular side legitimate; all cases:
error handling, timeouts, token expiration, invalid tokens, token storage best
practices and more; auth around week three of a ten-pull-request foundation.
Planner-synthesized. Opaque identifier, not a priority. Clean-room screen:
public standards (RFC 6749, RFC 7636, OpenID Connect Core) and public
packages.
**Depends on:** WO-007 merged (hard: the event tiers, interceptors, stores and
MSW this order extends; the base above is provisional and is set to WO-007's
merge commit by the planning pass that follows it).
**Workstream:** WS-001

<!-- dotln-dependencies:start -->
[
  {
    "workOrderId": "WO-007",
    "relation": "hard",
    "reason": "the events, interceptors, stores and MSW wiring this order extends; the base line is set to its merge commit before activation"
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
later choice (a hosted provider) must drop in through configuration.

**Design:**

- Port and adapter: `AuthClient` (an abstract class in `auth`) with
  `signIn(returnTo)`, `handleCallback()`, `refresh()`, `signOut()`,
  `getAccessToken()`; one adapter over an established OpenID Connect client
  library (chosen at step 2 from the installed Angular's peer ranges, MIT or
  Apache-2.0, with PKCE and silent refresh; the decision records the choice
  and the alternatives), provided by `provideDotlnAuth(config)` reading
  `EnvironmentConfig.auth` (`issuer`, `clientId`, `scopes`, `redirectPath`,
  `postLogoutPath`), now typed `AuthConfig`.
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
  `HomePaths` nested); `canMatch` guards (`requirePermissions(...)`) read it;
  `*dotlnHasPermission` structural directive (a knowing directive in `auth`)
  hides elements; facades expose `can(permission)` for feature-level checks;
  denied navigation dispatches `navigationEvents.navigate({ route: BasePaths.Denied })`.
- Interceptors (extending WO-007's chain): `authTokenInterceptor` attaches
  the bearer token to requests whose URL is under `apiBaseUrl` only;
  `authRefreshInterceptor` implements the single-flight refresh and replay.
- Mocked provider: MSW handlers under `libs/shared/auth/src/testing/idp/`
  implement discovery (`/.well-known/openid-configuration`), `authorize`
  (redirects to a mock login page served by the app route `/mock-idp/login`
  in development only, which posts back a code), `token` (code exchange with
  PKCE verification, refresh with rotation, configurable lifetimes and
  failures), `jwks`, `userinfo`, `end_session`; tokens signed with a
  development RSA key generated at startup through `jose`; the handlers
  expose knobs (`expiresInSeconds`, `failNextRefresh`, `invalidSignature`,
  `skewSeconds`) through a test-only header so e2e can drive the matrix.
- Routes: `/login` (anonymous shell page with the sign-in button),
  `/auth/callback`, `/denied`, `/mock-idp/login` (development only, excluded
  from production builds by environment); `BasePaths` gains them.
- Failure matrix, each a unit spec and, where the UI changes, an e2e test:
  network timeout on token exchange; `exchangeFailure` with `invalid_grant`;
  expired access token on request (refresh once, replay); refresh failure
  (sign out, `/login` with `returnTo`); invalid signature or wrong `aud`
  (reject, sign out, `errorEvents.security`); clock skew within and beyond
  tolerance; two concurrent `401`s (one refresh); callback without `state`
  match (reject); redirect loop (stop after two); sign-out in another tab;
  permission denied on route (redirect to `/denied`); permission revoked on
  refresh (element hidden on next render).
- Documents: `docs/dev-reference/security/authentication.md` (flow diagrams
  in text, storage rules and why, the matrix, how to swap the provider) and
  `docs/ai-reference/auth-rules.md` (imperative rules: tokens in memory
  only, attach bearer only to API URLs, never log tokens, permission checks
  through the store, mock knobs only in development and tests).

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
2. Choose and install the client library and `jose`; record the decision with
   the alternatives and the license. Check: `npm ls` exits 0.
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
   facade `can()`. Check: `npx nx test core auth home` exits 0.
8. Mocked provider handlers, signing key, knobs, `/mock-idp/login` page
   (development only). Check: `npx nx serve dotln` completes a sign-in in
   the browser (recorded).
9. Routes and pages (`/login`, `/auth/callback`, `/denied`); `BasePaths`
   updated; `app.config.ts` wiring. Check: `npx nx build dotln --configuration=production`
   exits 0 and the production bundle contains no `mock-idp` string
   (`grep -rc "mock-idp" dist/apps/dotln/browser | grep -v ":0"` prints
   nothing).
10. The e2e matrix in `dotln-e2e` using the knobs. Check: `npx nx e2e dotln-e2e`
    exits 0.
11. Documents and `conventions.md` (house rule 17). Check: files exist;
    `npm run i18n:check` exits 0.
12. Gate plain and review. Check: passing rows, no mutation.
13. Launchpad write-back: `docs/repositories/dotln-angular.md` Demonstrated
    architecture gains the guard, interceptor and store paths; WS-001's
    delivery states updated by the final review. Check: `npm run test:docs`.
14. Commit; `implementation-ready`; draft pull request after the verification
    pass (`feat: add authentication and permissions`).
15. Handoff; at final review `target-records` and
    `worktree publish WO-008 --target-worktree --branch feat/authentication-and-permissions --title "feat: add authentication and permissions" --body-file <reviewed body>`.

**Preflight:** in the target worktree `npx nx format:check`,
`npx nx run-many -t lint test build`, `npm run lint:fixtures`,
`npm run lint:components`, `npm run lint:hygiene`, `npm run i18n:check`,
`npx nx e2e dotln-e2e`; in the launchpad order worktree `npm run test:docs`;
then the target gate plain and review once each.

**Acceptance criteria (all required)**

1. `grep -rlE "localStorage|sessionStorage" libs/shared/auth/src apps/dotln/src --include=*.ts | grep -v spec`
   prints nothing, and `grep -rc "console.log" libs/shared/auth/src --include=*.ts | grep -v ":0"`
   prints nothing.
2. `libs/shared/auth/src/lib/session/transitions.ts` declares the transition
   table for the six states and `transitions.spec.ts` asserts every state and
   event pair (the spec iterates the table and the event list, so an
   unhandled pair fails); `npx nx test auth` exits 0.
3. Unit specs exist and pass for each matrix row: timeout on exchange,
   `invalid_grant`, expired-then-refresh-then-replay, refresh failure to
   sign-out, invalid signature, wrong audience, skew within and beyond
   tolerance, two concurrent `401`s producing one refresh request (asserted
   through the MSW handler's call count), `state` mismatch, redirect loop
   stop, cross-tab sign-out.
4. `core` exports `routePermissions` covering every `BasePaths` member
   (a spec asserts the record's keys equal the enum's values), guards use it,
   and `npx nx e2e dotln-e2e` includes: sign in through the mocked provider
   and land on `returnTo`; a denied route redirecting to `/denied`; an
   element hidden by `*dotlnHasPermission` for a user without the permission;
   token expiry during use followed by a transparent refresh; refresh failure
   returning to `/login`.
5. The production build contains no mock provider code
   (`npx nx build dotln --configuration=production` exits 0 and
   `grep -rc "mock-idp" dist/apps/dotln/browser | grep -v ":0"` prints
   nothing), and the bearer token is attached only to requests under
   `apiBaseUrl` (a spec asserts a request to another origin carries no
   `Authorization` header).
6. `docs/dev-reference/security/authentication.md` states the storage rule,
   the refresh rule, the matrix and the provider swap, and
   `docs/ai-reference/auth-rules.md` exists.
7. `node scripts/target-gate.mjs WO-008 --review` records a passing row for
   every declared command with no tracked-byte mutation, and
   `npm run test:docs` passes in the launchpad order worktree; the Preflight
   line ran before the first full gate.

**Evidence gate:** the gate rows, the recorded command outputs and
`docs/evidence/WO-008/README.md`.

**Known issues and carry-ins:** the base line is provisional until the pass
after WO-007 sets it; the client library is chosen at step 2 with a recorded
decision; signature verification is the API's duty and is stated, not
implemented, on the client; a real provider is a later member.

**Non-goals:** a real identity provider or API; a backend-for-frontend;
multi-factor flows; user management screens; social login.

**Operator-review assumptions:** the operator accepts an established OpenID
Connect client library behind the port rather than hand-rolled flows, and
reads the draft pull request before final review.
