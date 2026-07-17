# DS-5G Release Recovery — Revised (Public Repo + Org-Scoped Package)

**Verdict:** ⚠️ **CERTIFIED WITH OWNER ACTION.** The workflow is repaired for the project's real cross-owner architecture, `0.2.0` is correctly abandoned, and the next release (`0.2.1`, containing DS-5G) is verified-ready. Two owner steps remain: refresh the `DS_NPM_TOKEN` PAT and trigger the workflow. **Nothing was published.**

**Correction I own:** my prior recovery report recommended transferring the repo back to the `studiopod` org. That was wrong. The public `jheavner95/studiopod-design` repo is **deliberate** (Vercel free-plan deploys), the package stays `@studiopod`, and repo-owner ≠ package-owner is the intended architecture. That report and the 0.2.0-recovery workflow it introduced are removed.

---

## 1. Root Cause

- **Immediate:** `release.yml`'s publish step ran `npm publish` with `NODE_AUTH_TOKEN: ${{ secrets.DS_NPM_TOKEN }}`; GitHub Packages returned `E401 "User cannot be authenticated with the token provided"` → the PAT is invalid/expired.
- **Not** a structural/ownership defect. The cross-owner setup (repo `jheavner95`, package `@studiopod`) is intentional and *works* with a PAT — it published `0.1.1`. The only failure was the PAT itself.

---

## 2. Authentication Architecture (Phase 1 — proven)

**A PAT is required; `GITHUB_TOKEN` cannot work here — proven, not assumed:**

| | |
|---|---|
| Repo owner | `jheavner95` (User) — verified `gh api /repos/jheavner95/studiopod-design` → `owner_type: User`; public (for Vercel free plan) |
| Package namespace | `@studiopod` (org, id 305999243) |
| `GITHUB_TOKEN` scope | the **repository's owner** (`jheavner95`). Its `packages: write` grants write to `jheavner95`-owned packages only. |
| Publishing `@studiopod/*` | requires write to the **`studiopod` org** namespace → outside a `jheavner95`-repo `GITHUB_TOKEN`'s authority → **denied**. |
| Proof a PAT works | `0.1.1` is in the registry; the workflow's only publish credential was `DS_NPM_TOKEN` (a PAT). A user PAT carries the *user's* identity, and a user who is a `studiopod`-org member with `write:packages` crosses the owner boundary that `GITHUB_TOKEN` cannot. |

So the architecture deliberately separates git-repo owner from package owner, and **only a cross-owner-capable credential (a PAT) can publish.** This is why the workflow uses `DS_NPM_TOKEN`, not `GITHUB_TOKEN`.

---

## 3. Required PAT (Phase 2)

| Field | Value |
|---|---|
| Type | **Classic PAT** (classic is the reliable path for GitHub Packages npm publish; fine-grained PAT org-package support is inconsistent) |
| Owner | a GitHub user who is a **member of the `studiopod` org** with package-publish rights (i.e. `jheavner95`, as for `0.1.1`) |
| Scope | **`write:packages`** (implies `read:packages`) — nothing else. No `repo`, no `delete:packages`, no admin. |
| Secret name | **`DS_NPM_TOKEN`** — repository secret on `jheavner95/studiopod-design` (Settings → Secrets and variables → Actions → Secrets) |
| Token handling | never pasted into chat or committed; the owner sets it directly in the GitHub secret UI |

**Wiring (already in the repaired workflow):**
- `actions/setup-node` with `registry-url: https://npm.pkg.github.com` + `scope: "@studiopod"` — this generates the auth `.npmrc` at build time; **no committed `.npmrc` is needed in the DS repo** for publishing.
- The publish step, and **only** the publish step, sets `NODE_AUTH_TOKEN: ${{ secrets.DS_NPM_TOKEN }}`. The gate and dry-run steps do not receive it.
- `package.json#publishConfig.registry` pins the target so publish can never default to npmjs.

---

## 4. Workflow Changes (Phases 3–4)

| Change | Why |
|---|---|
| Publish step `NODE_AUTH_TOKEN` → `secrets.DS_NPM_TOKEN` | reverts my prior (wrong-for-this-architecture) `GITHUB_TOKEN` switch |
| Header + gate + dry-run comments/echoes corrected | they claimed GITHUB_TOKEN / "scope must equal repo owner"; both wrong for the intended cross-owner design |
| **Removed** `.github/workflows/release-recovery.yml` | it existed only to recover `0.2.0`, which is now abandoned; it also used GITHUB_TOKEN |
| **Removed** `docs/DS-5G-Release-Recovery.md` | superseded — it recommended the org transfer this WP forbids |

**Certification gates — all preserved and audited (Phase 3):** `npm ci` (deterministic, fails on lock drift) · `npm run verify` (build · typecheck · api-check · css-check · use-client-check · exports-check) · `npm pack` · `prepublishOnly` re-runs the full verify **inside** `npm publish` (cannot be bypassed) · `npm publish`. The token is wired to exactly one step (`NODE_AUTH_TOKEN` appears once, in publish). No release logic outside the publish step depends on `DS_NPM_TOKEN`.

---

## 5. Version Integrity & Recommendation (Phase 4)

| | |
|---|---|
| Registry latest | `0.1.1` |
| `0.2.0` | **tagged (`design-system-v0.2.0` → `d949e1c`) but NEVER published** — abandoned. Tag left untouched (owner approval required to touch tags). |
| `package.json` on `main` | `0.2.0` |

**Recommended next version: `0.2.1`.** Trigger the release with `release_type: patch` — `npm version patch` bumps `0.2.0 → 0.2.1`, then tags `design-system-v0.2.1` and publishes. `0.2.1` delivers **everything** the abandoned `0.2.0` commit carried (Workspace, SplitView, DS-5A–F) **plus** the DS-5G `destructive` variant — all additive, non-breaking. Because no consumer ever saw `0.2.0`, the registry cleanly steps `0.1.1 → 0.2.1`; the `0.2.0` number is simply spent. (Re-cutting `0.2.0` is not viable — its tag exists and points at destructive-less content, and touching tags is out of scope.)

---

## 6. Publish Readiness (Phase 5)

The artifact `main` HEAD would build **contains DS-5G** — verified in source:

| Item | Status |
|---|---|
| `destructive` Button variant | ✅ `src/components/ui/Button.tsx` (`bg-error text-white`, composed from `--color-error`) |
| Updated typings | ✅ `ButtonProps` variant union includes `"destructive"` (built into `dist/index.d.ts`) |
| Updated showcase | ✅ `<Button variant="destructive">Delete</Button>` in the core-components gallery |
| Updated changelog | ✅ CHANGELOG Unreleased → the `destructive` entry (+ no-`success` rationale) |
| Correct package metadata | ✅ name `@studiopod/design-system`, `publishConfig.registry` = GitHub Packages, scope matches |
| **`verify:full`** | ✅ **7/7 green** (typecheck, tests, ESLint, Next build, package verify, pack) — Button tests 20/20 incl. destructive |

The release is publish-ready. The only missing inputs are the valid PAT and the trigger.

---

## 7. Required Owner Actions

1. **Create/refresh the PAT** — classic PAT, `write:packages` only, owned by a `studiopod`-org member (§3). Do not paste it here.
2. **Set the secret** — repository secret **`DS_NPM_TOKEN`** on `jheavner95/studiopod-design` (Settings → Secrets and variables → Actions).
3. **Trigger the release** — Actions → **Release @studiopod/design-system** → Run workflow → `release_type: patch`, `dry_run: unchecked`. (Optionally run once with `dry_run: checked` first — it exercises everything except publish/tag.)
4. *(Optional cleanup)* the `design-system-v0.2.0` tag can be deleted since `0.2.0` was never published — but only with your approval; I left it untouched.

I cannot perform any of these (credential creation/handling and workflow triggering are owner-only).

---

## 8. Certification

**VERDICT: CERTIFIED WITH OWNER ACTION.**

The revised architecture is now correctly reflected: the public `jheavner95` repository and the `@studiopod` package are a deliberate cross-owner split, and I proved — from the ownership facts, not the log — that `GITHUB_TOKEN` cannot bridge it, so publishing must use a `studiopod`-member PAT scoped to `write:packages`, reaching only the publish step. Every certification gate is preserved and the token is wired to exactly one place. `0.2.0` is treated as a failed, unpublished release and left untouched; the next release is `0.2.1`, which carries the full 0.2 feature line plus the DS-5G `destructive` variant, and it is verified publish-ready by a green `verify:full`.

The correction that mattered was recognizing my own prior recommendation was wrong: transferring the repo back to the org would have broken the very Vercel deployment the public repo exists to enable. The right fix was to make the workflow serve the architecture, not bend the architecture to the workflow.

**Stopping after release readiness. Nothing published. DS-6.2 not resumed.**
