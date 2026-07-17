# Verification

One coherent verification system, not a scattered set of overlapping scripts. This document is the canonical guide to what runs, when, why, and what to do when it fails. For the audit that motivated this consolidation and the reasoning behind each decision, see [docs/engineering-notes/10-verification-pipeline.md](./engineering-notes/10-verification-pipeline.md). For the test suite specifically (Vitest/Testing Library/Playwright), see [docs/TESTING.md](./TESTING.md) — this document is about how everything, tests included, is orchestrated together.

## 1. Philosophy: three layers, no ambiguity

Every verification activity belongs to exactly one layer. A layer is defined by *when* it should run, not by *what tool* implements it.

| Layer | When | Speed | What |
|---|---|---|---|
| **1 — Fast** | Constantly, while writing code | Seconds | TypeScript (app + test tree), ESLint, unit/component tests (Vitest — includes accessibility assertions, see `docs/TESTING.md`) |
| **2 — Repository** | Before merge | Under a minute | Everything in Layer 1, plus: Next.js build, and the package's own build/typecheck/API-baseline/CSS/use-client/exports checks |
| **3 — Release** | Before publish | A few minutes | Everything in Layer 2, plus: package pack integrity. (Visual regression belongs here in principle — see §7 "Not yet automated.") |

Layers are strictly additive: Layer 2 is Layer 1 plus more, Layer 3 is Layer 2 plus more. Nothing appears in a later layer that isn't also implied by having passed the earlier ones.

## 2. Commands

| Command | Layer | Purpose |
|---|---|---|
| `npm run verify:fast` | 1 | The command you run constantly. No build. |
| `npm run verify` | 1 + 2 | The "before merge" gate. What CI's `fast` + `verify` jobs collectively enforce. |
| `npm run verify:full` | 1 + 2 + 3 (minus visual regression) | The most complete check that can run today without a real browser or OS-matched screenshot baselines. |
| `npm run release:verify` | same as `verify:full` | The name the release pipeline reaches for. A deliberate one-line alias (see §6) — kept separate from `verify:full` so CI's release jobs have one name to call that won't need to change if what counts as "full" ever does. |
| `npm test` | 1 | Vitest only, standalone — for when you specifically want the test suite and nothing else. |
| `npm run test:watch` | 1 | Vitest in watch mode — the command you leave running while writing a component. |
| `npm run test:e2e` | 3 (not yet in CI) | Playwright visual regression, standalone. See §7. |
| `npm run build` | 2 | The Next.js app build, standalone. |
| `npm run package:verify` | 2 | The unambiguous bridge to `packages/design-system`'s own `verify` script (see §6) — the one name to reach for from the repo root instead of `cd packages/design-system && npm run verify`. |

Every `verify*` tier runs through one shared runner, `scripts/verify.mjs` (§4) — not `&&`-chained package.json one-liners. `package:build`, `package:typecheck`, `package:api-check`, `package:css-check`, `package:use-client-check`, `package:exports-check`, `package:pack`, and `package:inspect` remain individually callable (documented in `packages/design-system/README.md`, and referenced by name in that package's own check-script error messages) — for when you want to debug one specific check in isolation rather than running a whole tier.

## 3. What belongs where — and why

The audit behind this document (full detail in the engineering note) found these concrete problems, each fixed as part of this consolidation:

- **No root-level `typecheck` existed.** `test:typecheck` (test tree) and `package:typecheck` (the package) both existed; the app's own `src/` had no equivalent standalone command — you had to know to run bare `npx tsc --noEmit`. Added.
- **`exports-check` had no root-level alias.** Every other package check (`api-check`, `css-check`, `use-client-check`) did. Added `package:exports-check` for consistency.
- **`exports-check` ran twice in CI.** `packages/design-system`'s own `verify` script already ends with `exports-check`; the `verify` job's YAML additionally ran `node ./scripts/check-exports.mjs` again as a separate step immediately after. Removed the redundant step.
- **ESLint never ran in CI at all.** Neither the old `test` job nor the old `verify` job invoked it. `npm run verify:fast` (now what the renamed `fast` job runs) includes it.
- **No unified `verify` existed anywhere.** CI's actual quality gate was two independently-assembled jobs (`test`: test:typecheck + test; `verify`: cd into the package and run its own `verify`) that happened to add up to something reasonable, but no single local command reproduced what CI as a whole checked. `npm run verify` now does.

## 4. The shared runner (`scripts/verify.mjs`)

Every tier (`fast`/`default`/`full`) is a plain array of `{ name, script }` steps in `scripts/verify.mjs`, run in order as child processes. It exists so a multi-step check reports better than bare `package.json` `&&`-chaining can:

- `a && b && c` tells you *that* something failed. It doesn't tell you which step, how long the steps that did pass took, or which later steps never got a chance to run.
- The runner prints a `✔`/`✖` line per step as it finishes (with duration), stops at the first failure, prints the remaining steps as `⋯ skipped`, and ends with a summary table plus one unambiguous sentence naming the failed step.

It does not wrap, replace, or reimplement any test framework — every step is a normal `npm run <script>` the same as if you'd typed it yourself. This is intentionally the only piece of new orchestration code this consolidation introduces (see the engineering note §4 for why nothing more was needed).

## 5. Release gates (`.github/workflows/release.yml`)

| Job | Depends on | Runs |
|---|---|---|
| `fast` | — | `npm run verify:fast` |
| `verify` | — | `packages/design-system`'s own `npm run verify` (Layer 2, package-scoped) |
| `dry-run` | `[verify, fast]` | Re-verifies the package (necessary rebuild — see the job's own comment for why it isn't wasted duplicate work), then computes and inspects a real tarball without publishing |
| `publish` | `[verify, fast]` | Versions, tags, and publishes — gated on both quality jobs having already passed |

`fast` and `verify` run in parallel (no dependency between them) — both were already independent checks with nothing for one to wait on from the other, so no ordering change was needed there. `dry-run` and `publish` only run on `workflow_dispatch`, never on a plain push/PR, so the always-on cost of every push/PR is exactly `fast` + `verify`, running concurrently.

## 6. Two things named `verify`

`npm run verify` means something different depending on whether you're standing in the repo root or in `packages/design-system` — this is deliberate, not an oversight:

- **Root `npm run verify`** (`scripts/verify.mjs default`) — the whole repo's Layer 1 + 2: app typecheck, test-tree typecheck, lint, tests, Next.js build, and (via `package:verify`) the package's own check.
- **`packages/design-system`'s `npm run verify`** — that package's own build + typecheck + API-baseline + CSS + use-client + exports check. Predates this phase; renaming it would have required touching its own `README.md`, `docs/DISTRIBUTION.md`, `VERSIONING.md`, `CHANGELOG.md`, and every check script's own `console.error` hint text (`"run npm run package:X first"`) — real, working, cross-referenced documentation, for a rename with no behavioral benefit.

The resolution is naming, not renaming: **`npm run package:verify`** is the one name that unambiguously means "the package's verify script," callable from the repo root, so nothing outside `packages/design-system` itself ever needs to type the ambiguous bare form. Root's own `verify` calls it internally via that same bridge.

## 7. Verification coverage — what exists, what doesn't yet

| Category | Status |
|---|---|
| TypeScript, ESLint, unit/component tests, accessibility (axe, inside Vitest) | ✅ Layer 1 |
| Build, API baseline, exports, CSS, use-client | ✅ Layer 2 |
| Package pack integrity | ✅ Layer 3 |
| **Visual regression** | ⚠️ Exists (`npm run test:e2e`), not yet in CI — macOS-only baselines, see `docs/TESTING.md`/`e2e/README.md`. Owner: whoever picks up "generate Linux baselines" from the DS-1C/DS-1D known-limitations list. |
| **Tarball *contents* check** (does the packed archive really retain `"use client"` and `@theme`) | ⚠️ Exists only as inline bash in `release.yml`'s `dry-run` job, not a reusable script. Not extracted into `scripts/` this phase — real but narrow; a future consolidation pass's job, not this one's. |
| **Token/theme integrity** (do the CSS custom properties `src/lib/tokens.ts` expects actually exist in `theme.css`) | ❌ Not implemented. No known drift found to justify it yet; document the risk, don't build a verifier for a problem that hasn't occurred. |
| **Documentation link checking** (dead internal links across `docs/*.md` and the docs site's own pages) | ❌ Not implemented. Real gap, low urgency — flagged for a future pass, not built here (this phase's brief: consolidate, don't expand). |
| **Package metadata verification** (license field, repository URL, engines) beyond what `npm publish`'s own preflight already checks | ❌ Not implemented. `npm publish --dry-run` already catches the common failure modes (missing `files`, bad `main`/`exports`); nothing beyond that is known to be missing. |
| **Consumer verification** (does a real downstream app actually install and use the published package correctly) | ❌ Not implemented — no automation installs the built tarball into a consumer app and smoke-tests it. Documented in `docs/DISTRIBUTION.md` as a known gap already; repeated here for completeness. |

Per this phase's own brief, none of the ❌/⚠️ rows are implemented here — this section exists so ownership is written down, not so every gap is closed.

## 8. Local developer workflow

```bash
npm run test:watch    # while actively writing a component
npm run verify:fast   # before committing — seconds, not minutes
npm run verify        # before opening a PR — reproduces CI's always-on gates exactly
npm run verify:full   # before cutting a release locally, or when in doubt
```

`npm run test:e2e` is not part of any `verify*` tier — run it directly, and only when you've changed something with real visual surface area (see `docs/TESTING.md`/`e2e/README.md` for when and how).

## 9. CI behavior

- **Every push and PR to `main`**: `fast` and `verify` run in parallel. Both must pass.
- **`workflow_dispatch` with `dry_run: true`**: additionally runs `dry-run` (needs `fast`+`verify`) — computes and inspects a real tarball, enforces that publish credentials are actually configured, executes and reverts a version bump, but never runs `npm publish`, never commits, never tags.
- **`workflow_dispatch` with `dry_run: false`**: runs `publish` instead — versions, tags, pushes, and publishes for real. Gated on the same `[verify, fast]`.
- Caching: every job's `actions/setup-node@v4` step already sets `cache: npm`, so `npm ci` is fast on a warm cache. No job currently shares build output with another (see §5's `dry-run` comment on why, and the future recommendation in the engineering note).

## 10. Failure recovery

1. Read the failed step's name from `scripts/verify.mjs`'s summary (or the CI job/step name — they're named identically on purpose).
2. Reproduce it locally with the single underlying command (e.g. `npm run lint`, `npm test`, `npm run package:css-check`) rather than the whole tier — faster, and the failure output is unchanged either way.
3. `docs/TESTING.md` §7 covers debugging Vitest/axe/Playwright failures specifically.
4. A failed `package:*` check almost always names the fix in its own error message (see `packages/design-system/scripts/*.mjs` — every one was written to explain what regressed and why, not just that something did).
5. If a CI-only failure won't reproduce locally, suspect an environment difference first (Node version — CI pins 20; OS — CI is Linux, screenshots are the one thing that differs) before assuming a flaky test.
