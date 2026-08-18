# Verification

One coherent verification system, not a scattered set of overlapping scripts. This document is the canonical guide to what runs, when, why, and what to do when it fails. For the audit that motivated this consolidation and the reasoning behind each decision, see [docs/engineering-notes/10-verification-pipeline.md](./engineering-notes/10-verification-pipeline.md). For the test suite specifically (Vitest/Testing Library/Playwright), see [docs/TESTING.md](./TESTING.md) — this document is about how everything, tests included, is orchestrated together. For documentation/navigation-registry integrity specifically (a normal part of `npm test`, needing no pipeline changes of its own), see [docs/DOCUMENTATION.md](./DOCUMENTATION.md).

## 1. Philosophy: three layers, no ambiguity

Every verification activity belongs to exactly one layer. A layer is defined by *when* it should run, not by *what tool* implements it.

| Layer | When | Speed | What |
|---|---|---|---|
| **1 — Fast** | Constantly, while writing code | Seconds | TypeScript (app + test tree), ESLint, unit/component tests (Vitest — includes accessibility assertions, see `docs/TESTING.md`) |
| **2 — Repository** | Before merge | Under a minute | Everything in Layer 1, plus: the package's own API-baseline/CSS/use-client/exports/identity checks, and the documentation build |
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
| `npm run package:verify` | 2 | The unambiguous bridge to `packages/design`'s own `verify` script (see §6) — the one name to reach for from the repo root instead of `cd packages/design && npm run verify`. |

Every `verify*` tier runs through one shared runner, `tooling/verify.mjs` (§4) — not `&&`-chained package.json one-liners. `package:build`, `package:typecheck`, `package:api-check`, `package:css-check`, `package:use-client-check`, `package:exports-check`, `package:pack`, and `package:inspect` remain individually callable (documented in `packages/design/README.md`, and referenced by name in that package's own check-script error messages) — for when you want to debug one specific check in isolation rather than running a whole tier.

## 3. What belongs where — and why

The audit behind this document (full detail in the engineering note) found these concrete problems, each fixed as part of this consolidation:

- **No root-level `typecheck` existed.** `test:typecheck` (test tree) and `package:typecheck` (the package) both existed; the app's own `src/` had no equivalent standalone command — you had to know to run bare `npx tsc --noEmit`. Added.
- **`exports-check` had no root-level alias.** Every other package check (`api-check`, `css-check`, `use-client-check`) did. Added `package:exports-check` for consistency.
- **`exports-check` ran twice in CI.** `packages/design`'s own `verify` script already ends with `exports-check`; the `verify` job's YAML additionally ran `node ./scripts/check-exports.mjs` again as a separate step immediately after. Removed the redundant step.
- **ESLint never ran in CI at all.** Neither the old `test` job nor the old `verify` job invoked it. `npm run verify:fast` (now what the renamed `fast` job runs) includes it.
- **No unified `verify` existed anywhere.** CI's actual quality gate was two independently-assembled jobs (`test`: test:typecheck + test; `verify`: cd into the package and run its own `verify`) that happened to add up to something reasonable, but no single local command reproduced what CI as a whole checked. `npm run verify` now does.

## 4. The shared runner (`tooling/verify.mjs`)

Every tier (`fast`/`default`/`full`) is a plain array of `{ name, script }` steps in `tooling/verify.mjs`, run in order as child processes. It exists so a multi-step check reports better than bare `package.json` `&&`-chaining can:

- `a && b && c` tells you *that* something failed. It doesn't tell you which step, how long the steps that did pass took, or which later steps never got a chance to run.
- The runner prints a `✔`/`✖` line per step as it finishes (with duration), stops at the first failure, prints the remaining steps as `⋯ skipped`, and ends with a summary table plus one unambiguous sentence naming the failed step.

It does not wrap, replace, or reimplement any test framework — every step is a normal `npm run <script>` the same as if you'd typed it yourself. This is intentionally the only piece of new orchestration code this consolidation introduces (see the engineering note §4 for why nothing more was needed).

## 5. Routine validation vs. release gates (CI-2)

Two separate workflows, split by how they trigger and what they prove:

| Workflow | Trigger | Runners per trigger | Runs |
|---|---|---|---|
| `.github/workflows/validate.yml` | push to `main`, pull request | **1** | `npm run verify:fast`, then `npm run package:verify` — sequentially, on the same runner |
| `.github/workflows/release.yml` | `workflow_dispatch` only | 2 (`fast`+`verify`) for verification, plus `dry-run` or `publish` | see table below |

**`validate.yml`** is the routine, always-on gate for every ordinary commit. One job, one checkout, one `npm ci`, running `verify:fast` (Layer 1) and then the package's own `verify` (Layer 2, package-scoped — build, typecheck, API-baseline, CSS, framework-independence, client-boundary, exports, and identity checks) in sequence. It does not build or upload a release tarball: package-level `verify`'s own last step, `identity-check` (`packages/design/scripts/check-package-identity.mjs`), already performs a real `npm pack` to a scratch directory, extracts it, and resolves every export subpath from the actual packed tarball — strictly stronger proof of packability than a standalone `npm pack --dry-run`, so nothing routine correctness needs is lost by not also packing-and-uploading on every commit. Concurrency group `design-validation-${{ github.ref }}`, `cancel-in-progress: true` — a superseded routine run on the same ref/PR is cancelled rather than left to finish and burn minutes on a commit nobody will look at again.

**`release.yml`** is deliberate-only, gated entirely behind `workflow_dispatch` — never a plain push or PR:

| Job | Depends on | Runs |
|---|---|---|
| `fast` | — | `npm run verify:fast` |
| `verify` | — | `packages/design`'s own `npm run verify` (Layer 2, package-scoped), plus `npm pack --dry-run`, plus a real pack to a temp directory uploaded as an inspectable build artifact |
| `dry-run` | `[verify, fast]` | Re-verifies the package (necessary rebuild — see the job's own comment for why it isn't wasted duplicate work), then computes and inspects a real tarball without publishing |
| `publish` | `[verify, fast]` | Versions, tags, and publishes — gated on both quality jobs having already passed |

`fast` and `verify` run in parallel inside `release.yml` (no dependency between them) — unchanged from before CI-2. What changed is only *when* they run: a deliberate `workflow_dispatch` re-proves both fresh, rather than trusting a possibly-stale prior routine run, which is the correct property for a release gate to have. `release.yml`'s own concurrency group (`ds-release-${{ github.ref }}`, `cancel-in-progress: false`) is unrelated to `validate.yml`'s — a routine run being cancelled on a superseded commit must never be able to interrupt an in-flight publish, and the two workflows now have no shared concurrency group to make that a risk.

## 6. Two things named `verify`

`npm run verify` means something different depending on whether you're standing in the repo root or in `packages/design` — this is deliberate, not an oversight:

- **Root `npm run verify`** (`tooling/verify.mjs default`) — the whole repo's Layer 1 + 2, in dependency order: token bridge, **package build**, **boundary check**, library + documentation typecheck, test-tree typecheck, lint, tests, the package's five contract checks, and the documentation build.

  Two steps are new in DH-2 and their position matters. The package build runs **second** because everything after it needs `dist/` — the documentation application resolves `@studiopod/design` through the workspace link, not a source alias. The boundary check runs **third**, once `dist/` exists, and replaces the two esbuild resolver plugins DH-2 deleted: it asserts the package's tsconfig cannot resolve outside the package, that no library source escapes it, that documentation imports only declared entry points, and that no documentation identifier appears in the bundle.
- **`packages/design`'s `npm run verify`** — that package's own build + typecheck + API-baseline + CSS + use-client + exports check. Predates this phase; renaming it would have required touching its own `README.md`, `docs/DISTRIBUTION.md`, `VERSIONING.md`, `CHANGELOG.md`, and every check script's own `console.error` hint text (`"run npm run package:X first"`) — real, working, cross-referenced documentation, for a rename with no behavioral benefit.

The resolution is naming, not renaming: **`npm run package:verify`** is the one name that unambiguously means "the package's verify script," callable from the repo root, so nothing outside `packages/design` itself ever needs to type the ambiguous bare form. Root's own `verify` calls it internally via that same bridge.

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

- **Every push and PR to `main`**: `validate.yml` runs its one `validate` job on one runner — `verify:fast` then `package:verify`, sequentially. Must pass. `release.yml` does **not** run at all on a plain push or PR (CI-2) — it triggers only via `workflow_dispatch`.
- **`workflow_dispatch` with `dry_run: true`**: runs `release.yml`'s `fast` and `verify` jobs fresh (in parallel, on their own runners), then additionally runs `dry-run` (needs `fast`+`verify`) — computes and inspects a real tarball, enforces that publish credentials are actually configured, and checks that the target version and tag are still free, but never runs `npm publish`, never commits, never tags.

  It does **not** execute a version bump, not even a reverted one: the job runs under `permissions: contents: read` and contains no bump command at all (asserted by `src/lib/release-workflow.test.ts`). So in `bump` mode the tarball it packs carries the **committed** version, while the registry and tag checks run against the **resolved target**. `tooling/release/check-dry-run-artifact.mjs` reconciles the two — the artifact against what was actually packed, the target against the mode's arithmetic. Bumping changes only the manifest's `version` field, so packing the committed version costs no artifact-level coverage; that the bump writes the expected string is checked in the `publish` job, where it matters.

  Practical consequence: a `committed`-mode dry run **correctly fails** once that version is published (`0.13.0` today) — that is the guard working, not a defect. Use `bump` mode to validate a future release candidate.
- **`workflow_dispatch` with `dry_run: false`**: runs `publish` instead — versions, tags, pushes, and publishes for real. Gated on the same `[verify, fast]`.
- Caching: every job's `actions/setup-node@v4` step already sets `cache: npm`, so `npm ci` is fast on a warm cache. No job currently shares build output with another (see §5's `dry-run` comment on why, and the future recommendation in the engineering note).

## 10. Failure recovery

1. Read the failed step's name from `tooling/verify.mjs`'s summary (or the CI job/step name — they're named identically on purpose).
2. Reproduce it locally with the single underlying command (e.g. `npm run lint`, `npm test`, `npm run package:css-check`) rather than the whole tier — faster, and the failure output is unchanged either way.
3. `docs/TESTING.md` §7 covers debugging Vitest/axe/Playwright failures specifically.
4. A failed `package:*` check almost always names the fix in its own error message (see `packages/design/scripts/*.mjs` — every one was written to explain what regressed and why, not just that something did).
5. If a CI-only failure won't reproduce locally, suspect an environment difference first (Node version — CI pins 20; OS — CI is Linux, screenshots are the one thing that differs) before assuming a flaky test.
