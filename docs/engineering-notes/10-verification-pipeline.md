# Verification Pipeline Consolidation (DS-1D)

The audit, architecture decisions, and certification record behind [docs/VERIFICATION.md](../VERIFICATION.md) — read that document for the contributor-facing how-to; this one is the reasoning and the point-in-time evidence for whoever next has to decide whether to change it.

## 1. Verification audit (before DS-1D)

Every verification-shaped command that existed, inventoried directly from `package.json` (root and `packages/design-system`) and `.github/workflows/release.yml` before this phase touched them:

| Command | Scope | Ran in CI? |
|---|---|---|
| `tsc --noEmit` (no npm script) | App source | No — not run anywhere, not even locally via a named command |
| `test:typecheck` | Test tree | Yes (`test` job) |
| `lint` | Whole repo | **No — never ran in CI at all** |
| `test` (Vitest) | App source | Yes (`test` job) |
| `test:coverage` | App source | No (local-only) |
| `test:e2e` (Playwright) | Playground pages | No (macOS-baseline limitation, documented in DS-1C) |
| `build` (Next.js) | App | No — the app itself was never built in CI, only the package |
| `package:build` | Package | Indirectly, via the package's own `verify` |
| `package:typecheck` | Package | Indirectly, via the package's own `verify` |
| `package:api-check` | Package | Indirectly, via the package's own `verify` |
| `package:css-check` | Package | Indirectly, via the package's own `verify` |
| `package:use-client-check` | Package | Indirectly, via the package's own `verify` |
| (no root alias existed) `exports-check` | Package | **Twice** — once inside the package's own `verify`, once again as a standalone `verify` job step |
| `packages/design-system`'s own `verify` | Package | Yes (`verify` job), and again inside `dry-run` |
| `npm pack --dry-run` / real pack + tarball content grep | Package | Yes (`verify` and `dry-run` jobs), as inline bash, not a script |

### Findings

**Duplicates.** `exports-check` ran twice in the `verify` job — once as the last step of the package's own `verify` script, once again as an explicit standalone step immediately after. Pure redundancy; no behavioral difference between the two runs, just wasted CI time and a second place that could (in theory) silently diverge from the first.

**Overlap.** `packages/design-system`'s `verify` script and the `verify` job's YAML together already encoded a reasonable "package correctness" gate — but nothing at the *repository* level composed the equivalent for the app itself. The old `test` job's `test:typecheck` + `test` was the closest thing, but it silently omitted lint and the app's own `tsc --noEmit`.

**Obsolete scripts.** None found. Every existing script does something a current check script, doc, or CI step actually depends on (`packages/design-system/README.md` and the check scripts' own error messages reference every `package:*` command by name — see §3 for why that ruled out a rename-based consolidation).

**Missing coverage.** No root-level `typecheck`. No root-level `exports-check` alias (the other four package checks all had one; this one didn't). ESLint never ran in CI. The app itself (`next build`) never ran in CI — only the package's build did.

**Conflicting ownership.** Two scripts named `verify` (root, newly added by this phase; `packages/design-system`, pre-existing) with genuinely different scope. Resolved by naming, not renaming — see §3.

## 2. Verification layers

Adopted exactly the three-layer structure the brief proposed (Fast / Repository / Release), formalized in `docs/VERIFICATION.md` §1. The one real design decision within that structure: **where does Layer 3 stop, given Playwright isn't CI-safe yet?**

`verify:full` includes package-pack integrity (Layer 3, deterministic, OS-independent) but deliberately excludes `test:e2e` (Layer 3, but OS-dependent per DS-1C's own documented finding). Folding Playwright into `verify:full` would have made the "most complete" tier non-deterministic across machines — green on the Mac that generated the baselines, failing everywhere else for a reason unrelated to any real regression. `test:e2e` stays a named, standalone, opt-in command instead. This is a continuation of a decision DS-1C already made, not a new one — DS-1D's job was to make sure the new tiering didn't accidentally reverse it by folding e2e in for the sake of a tidier-looking `full` tier.

## 3. Command consolidation — the naming decision

The brief's target list literally names both `verify` and `verify:full` as separate scripts to create, and separately still lists `release:verify`. Read at face value, that's three names for what could theoretically be the same command. The distinction adopted:

- `verify` — Layer 1 + 2. The everyday "before merge" gate.
- `verify:full` — Layer 1 + 2 + (the Layer 3 subset that's actually CI-safe today). The "most thorough, still reliable" tier.
- `release:verify` — a one-line alias for `verify:full`, kept as a *separate name* specifically so the release pipeline's own vocabulary (`release:verify`) never has to change even if what counts as "full" changes shape later (e.g. once Linux Playwright baselines exist and `test:e2e` graduates into it). Decoupling "what the release pipeline calls" from "what is currently the most complete tier" was judged worth one extra line in `package.json` given how carefully the release workflow's existing comments already protect against exactly this class of silent-drift risk (see `release.yml`'s own header comment on why `dry-run` and `publish` fail loudly instead of skipping).

**The `verify` naming collision** (root vs. `packages/design-system`) was the largest single judgment call in this phase. Two options existed:

1. Rename `packages/design-system`'s `verify` to something else (e.g. `pkg-verify`), eliminating the collision entirely.
2. Keep both names, and make the ambiguity impossible to act on by mistake through documentation and a bridge script.

Option 1 was rejected after grepping every reference to `npm run package:*`/`npm run verify` across the repo (`docs/DISTRIBUTION.md`, `packages/design-system/README.md`, `VERSIONING.md`, `CHANGELOG.md`, and — critically — the `console.error()` hint text inside `check-css.mjs`, `check-use-client.mjs`, and `check-api.mjs`, which tell a developer to `run "npm run package:build" first` by that literal name). Renaming would have meant touching all of those for a purely cosmetic win, which is the opposite of what "consolidate, simplify, standardize — do not redesign" asks for. Option 2 was adopted: `package:verify` (new, root-level) is the one name anyone outside `packages/design-system` needs; the collision only exists for someone standing inside that directory typing the bare `verify` name directly, which is already how npm scripts work in every multi-package repo and isn't actually ambiguous *to npm* — only to a reader unaware of the working directory. `docs/VERIFICATION.md` §6 and inline comments in `release.yml` at both call sites close that gap.

## 4. Shared verification runner

`scripts/verify.mjs` — see `docs/VERIFICATION.md` §4 for what it does. The one substantive piece of new code this phase adds; everything else is consolidation, renaming-that-wasn't, and documentation. Deliberately does not touch `packages/design-system/scripts/check-*.mjs` — those already have good, specific, well-explained failure output (see e.g. `check-css.mjs`'s distinction between "missing" and "out of order"); wrapping them in a generic runner would have flattened that specificity, not improved it. The runner's job is *orchestrating* named `npm run` steps and reporting on the group, not replacing what any individual step already does well.

## 5. Release gates

Audited `release.yml` end to end (see `docs/VERIFICATION.md` §5 for the resulting table). One genuine, zero-risk fix (the duplicate exports-check, §1). One job rename (`test` → `fast`, to match what it now actually runs — `verify:fast`, not an ad hoc pair of hand-picked commands). One documented-but-not-eliminated duplication: `dry-run`'s package rebuild, which is necessary given GitHub Actions' per-job filesystem isolation and the lack of an artifact-passing step between `verify` and `dry-run`. Removing that duplication was scoped out deliberately — see §7.

## 6. Verification coverage

Full table in `docs/VERIFICATION.md` §7. Per the brief ("do not implement every missing verifier — document future ownership"), nothing new was built here beyond what already existed; the value added is that every gap now has a name, a status, and — where relevant — a reason it wasn't closed this phase, in one place instead of scattered across whichever document happened to mention it first.

## 7. CI optimization

Audited for parallelization, caching, duplicate installs, duplicate builds, duplicate test execution (brief §9):

- **Caching**: already correct everywhere — every job's `actions/setup-node@v4` already sets `cache: npm`. Nothing to add.
- **Parallelization**: `fast` and `verify` already ran with no dependency edge between them (both trigger off the same push/PR event independently) — already optimal, not something this phase needed to fix.
- **Duplicate installs**: each job runs its own `npm ci`. Inherent to GitHub Actions' per-job runner isolation; the `cache: npm` setting already makes each one fast. Not eliminable without self-hosted runners or a more invasive shared-container approach — out of scope.
- **Duplicate builds**: the one real instance is `dry-run` re-running the package's full `verify` (build included) after the `verify` job already proved it passes. **Not eliminated this phase.** `dry-run` needs its own `dist/` on disk (GitHub Actions jobs don't share a filesystem) to pack a real tarball in its later steps — the fix is `actions/upload-artifact` from `verify` + `actions/download-artifact` in `dry-run`, wiring the already-artifact-uploading `verify` job's tarball forward instead of repacking from scratch. Scoped out of this pass specifically because it touches the release pipeline's job graph, and that pipeline's own header comment documents multiple past incidents from exactly this kind of well-intentioned tweak (masked ENOENT failures, a `git checkout` that wiped uncommitted edits) — this consolidation phase's job was to simplify verification, not to take on new risk in the one workflow in this repo that's already been hardened the hard way. Recorded as the clearest concrete recommendation for a future pass (see `docs/VERIFICATION.md` §5's comment in `release.yml` itself).

## 8. Certification

Run after every change in this phase:

| Check | Result |
|---|---|
| `tsc --noEmit` (root, via `npm run typecheck`) | ✅ Clean |
| `eslint .` | ✅ Clean |
| `npm run verify:fast` | ✅ 4/4 steps passed |
| `npm run verify` | ✅ 6/6 steps passed (fast tier + build + package verify) |
| `npm run verify:full` | ✅ 7/7 steps passed (adds package pack) |
| `npm test` | ✅ 18/18 (unchanged from DS-1C — no test behavior touched) |
| `next build` | ✅ Clean |
| `packages/design-system`'s own `npm run verify` | ✅ Unaffected — build/typecheck/api-check/css-check/use-client-check/exports-check all pass, 560/5/44/249 exports match baseline |
| `.github/workflows/release.yml` | ✅ Validated as well-formed YAML; job graph (`fast`, `verify`, `dry-run`, `publish`) confirmed via direct parse, not just visual inspection |

### Files modified

`package.json` (root — added `typecheck`, `package:exports-check`, `package:verify`, `verify:fast`, `verify`, `verify:full`, `release:verify`), `.github/workflows/release.yml` (job rename `test`→`fast`, duplicate exports-check step removed, disambiguating comments added, `needs:` updated), `docs/engineering-notes/README.md` (indexed this note).

### Files added

`scripts/verify.mjs`, `docs/VERIFICATION.md`, `docs/engineering-notes/10-verification-pipeline.md` (this file).

### Scripts simplified

Net script count at root grew (7 new: `typecheck`, `package:exports-check`, `package:verify`, `verify:fast`, `verify`, `verify:full`, `release:verify`) rather than shrank — consolidation here meant *composing* existing fine-grained commands into named tiers, not deleting the fine-grained commands themselves (§3 explains why deletion/renaming was rejected). The simplification is in what a developer or CI job has to know: one command (`npm run verify`) now reproduces what used to require knowing to run two different jobs' worth of hand-assembled steps, and CI's two always-on jobs now call the exact same named scripts a developer runs locally instead of their own bespoke step lists.

### Architecture decisions

Covered in §§2–5 above: additive three-tier layering; naming (not renaming) to resolve the `verify`/`verify` collision; a thin orchestration script rather than a new test-framework layer; `test:e2e` kept out of every `verify*` tier pending Linux baselines; `dry-run`'s package rebuild left as documented, necessary, not-yet-optimized duplication.

### Known limitations

- Visual regression (`test:e2e`) is still not part of any CI-run tier — unchanged from DS-1C, reconfirmed rather than silently reversed.
- `dry-run`'s full package rebuild after `verify` already passed is real, measurable duplicate CI work, deliberately not eliminated this phase (§7).
- The tarball-*contents* check (does `"use client"` / `@theme` survive packing) still lives as inline bash in `release.yml`, not a reusable script — flagged in `docs/VERIFICATION.md` §7, not extracted this phase.
- No coverage threshold is enforced anywhere (`test:coverage` exists but nothing gates on its output) — consistent with `docs/TESTING.md`'s existing "coverage is not a gate" stance from DS-1C, not a new gap introduced here.

### Future recommendations

1. Generate Linux Playwright baselines and fold `test:e2e` into `verify:full`/CI once they exist (carried over from DS-1C, reconfirmed here).
2. Wire `actions/upload-artifact`/`download-artifact` between `verify` and `dry-run` to eliminate the one real duplicate build identified in §7.
3. Extract the tarball-contents bash from `dry-run` into a reusable `packages/design-system/scripts/check-tarball.mjs`, callable standalone the same way every other `check-*.mjs` already is.
4. DS-1E (Documentation Infrastructure) and DS-1F (Component Certification) should call `npm run verify`/`verify:full` as their own quality gate rather than assembling new ad hoc command sequences — this is the concrete way "build directly on this verification foundation" (the brief's own success criterion) gets tested in practice.
