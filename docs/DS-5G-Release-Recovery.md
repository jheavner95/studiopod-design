# DS-5G Release Recovery — Publish Existing v0.2.0

**Verdict:** ⚠️ **CERTIFIED WITH OWNER ACTION.** The workflow is repaired and a safe recovery path is ready, but publishing `0.2.0` is blocked on an owner action — and it is **not** merely "add a secret." A verified structural issue (repo/scope ownership mismatch) must be resolved first.

---

## 1. Current-State Verification (authenticated)

| Fact | Evidence |
|---|---|
| `package.json` at the release commit reports `0.2.0` | `git show design-system-v0.2.0:packages/design-system/package.json` → `0.2.0` |
| Release commit exists | `d949e1c release(design-system): v0.2.0` on `origin/main` |
| Tag exists → correct commit | `design-system-v0.2.0` → `d949e1c` |
| **`0.2.0` absent from GitHub Packages** | `npm view @studiopod/design-system@0.2.0` → **404**; only `0.1.1` present |
| No partial/duplicate package record | registry lists `["0.1.1"]` only |
| No GitHub Release created | `gh release view design-system-v0.2.0` → *release not found* |
| Vercel deployed from the release commit | (per the WP; the deploy succeeded — Vercel installs the DS from the registry, so it used the last-good `0.1.1`, not `0.2.0`) |

So the workflow got all the way through version/commit/tag/push and **failed only at `npm publish`.** Clean recovery target: publish the existing `d949e1c` as `0.2.0`, no bump, no new tag.

### ⚠️ Content caveat the WP did not anticipate

**`0.2.0` (commit `d949e1c`) does NOT contain the DS-5G `destructive` Button variant.** That change was uncommitted when the release ran; `d949e1c`'s `Button.tsx` has zero `destructive`. So `0.2.0` = Workspace/SplitView/DS-5A–F, **without** destructive. Recovering `0.2.0` as-is is correct (it's DS-5F's release), but the Phase-6 check "tarball contains the destructive variant" **will not hold for 0.2.0** — destructive ships in the next release (`0.2.1`). It is now committed to `main` (unreleased) so it is not lost.

---

## 2. Root Cause

**Two layers, both verified — not guessed.**

**(a) Immediate: the publish PAT is invalid.** `release.yml`'s publish step ran `npm publish` with `NODE_AUTH_TOKEN: ${{ secrets.DS_NPM_TOKEN }}`. The failure was `E401 "User cannot be authenticated with the token provided"` — i.e. GitHub Packages rejected that PAT. It is revoked/expired (consistent with the earlier leak-incident token churn). The gate passed, so the secret was *set* but *invalid*.

**(b) Structural: repo owner ≠ package scope.** This is the finding that determines the fix:

| | value |
|---|---|
| package scope | `@studiopod` (the `studiopod` org — which exists, id 305999243, but has **0 repos**) |
| repo actual owner | **`jheavner95`** (a User) — `gh api /repos/jheavner95/studiopod-design` → `owner_type: User`; `studiopod/studiopod-design` redirects here |

The repo was transferred to the `studiopod` org in DS-0.6 but has since **drifted back to `jheavner95`.** GitHub Packages ties a package's scope to an owner: `@studiopod` packages belong to the `studiopod` org. **`GITHUB_TOKEN` from `jheavner95/studiopod-design` is scoped to `jheavner95` and cannot publish `@studiopod` packages.** `0.1.1` published previously only because a PAT with cross-org (`studiopod`) `write:packages` was used.

---

## 3. Authentication Decision

**Canonical target: `GITHUB_TOKEN`** — the WP's preference and DS-0.6's architecture (no fragile PAT to expire/leak). The workflow is repaired to use it.

**But `GITHUB_TOKEN` is only *sufficient* once scope and repo owner align.** Given the verified mismatch (§2b), the correct fix is to **restore the repo to the `studiopod` org** (undoing the drift), after which `GITHUB_TOKEN` publishes `@studiopod` cleanly. This is the DS-0.6 decision reasserted, not a new one.

**PAT fallback (documented, not recommended):** if the owner chooses to keep the repo under `jheavner95`, `GITHUB_TOKEN` cannot work and a PAT is required — a classic PAT with `write:packages` belonging to a `jheavner95` account that is a member of the `studiopod` org, stored as `DS_NPM_TOKEN`. This is the fragile path that just failed and previously leaked; I do not recommend it, and choosing it means reverting the workflow's `GITHUB_TOKEN` change. **I did not introduce a PAT — the token value is never handled here.**

---

## 4. Files Changed

| File | Change |
|---|---|
| `.github/workflows/release.yml` | publish auth → `GITHUB_TOKEN`; removed `DS_NPM_TOKEN` from gate + dry-run enforce (DS_REGISTRY still enforced); header comment updated |
| `.github/workflows/release-recovery.yml` | **new** — publish an existing tag without bump/commit/tag |
| `src/components/ui/Button.tsx`, `Button.test.tsx`, `ComponentGallerySection.tsx`, `CHANGELOG.md`, `docs/DS-5G-Button-Semantic-Variants.md` | the DS-5G `destructive` variant — separate commit, unreleased, for `0.2.1` (not part of the recovery) |

Neither commit changes the package version, moves/recreates the `v0.2.0` tag, or creates a release version.

---

## 5. The Workflow Repair (exact)

- **`release.yml` publish step:** `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` (was `secrets.DS_NPM_TOKEN`). All certified gates preserved — `prepublishOnly` still runs the full verify inside `npm publish`; deterministic `npm ci` unchanged; no gate weakened.
- **Gate + dry-run enforce:** no longer require `DS_NPM_TOKEN` (GITHUB_TOKEN is auto-provisioned); `DS_REGISTRY` still enforced.
- **YAML validated** (`js-yaml` parses both files); the recovery version-guard simulated locally (tag `design-system-v0.2.0` → `0.2.0` → guard passes).

---

## 6. Recovery Method

`release-recovery.yml` (owner-triggered `workflow_dispatch`), inputs default to `tag=design-system-v0.2.0`, `expected_version=0.2.0`. It:
checks out the exact tag → asserts `package.json === 0.2.0` (aborts on mismatch) → `npm ci` → full `npm run verify` → `npm pack` (uploads the artifact) → `npm publish` with `GITHUB_TOKEN`. **No `--force`, no version bump, no commit, no tag.** Retained as a documented operational tool.

---

## 7. Owner Action (required — in order)

1. **Restore the repo to the `studiopod` org.** `github.com/jheavner95/studiopod-design` → Settings → Danger Zone → **Transfer ownership** → new owner `studiopod`. (This is the DS-0.6 state; the repo has drifted back.) Re-point the local remote and Vercel afterward if needed.
2. **Link the package to the repo for Actions** (if not inherited): the `@studiopod/design-system` package → Package settings → **Manage Actions access** → add `studiopod/studiopod-design` with **Write**. Required for `GITHUB_TOKEN` to publish to an existing package first published by a PAT.
3. **Trigger the recovery run:** Actions → **Release recovery (publish an existing tag)** → Run workflow → `tag = design-system-v0.2.0`, `expected_version = 0.2.0`.
4. **Retire the dead secret:** delete the `DS_NPM_TOKEN` repository secret — it is no longer referenced and is a stale credential.

If the owner instead keeps the repo under `jheavner95`: revert the workflow's `GITHUB_TOKEN` change and configure a valid `DS_NPM_TOKEN` PAT (§3 fallback). Not recommended.

I **cannot** perform steps 1–4 (repo transfer, package settings, credential, workflow trigger all require owner privileges and I must not handle credentials).

---

## 8. Post-Publish Verification (to run after the recovery run)

Independently confirm: `@studiopod/design-system@0.2.0` exists in GitHub Packages; metadata version `0.2.0`; package associated with `studiopod/studiopod-design`; **no `0.3.0`**; the `design-system-v0.2.0` tag still → `d949e1c`; no duplicate tag; a clean install of `0.2.0` from the registry succeeds. **Note:** the `0.2.0` tarball will **not** contain the `destructive` variant (§1 caveat) — that is expected; verify destructive in `0.2.1`, not `0.2.0`.

---

## 9. Git / Tag / Version Integrity

- `package.json` version: unchanged at `0.2.0` (the two recovery/feature commits do not touch it).
- Tag `design-system-v0.2.0` → `d949e1c`: unchanged, not moved, not recreated.
- No new release version, no `0.3.0`, no `--force`.
- Two normal source commits on `main` after `d949e1c`: the DS-5G feature (unreleased) and the workflow repair. `main` is now ahead of the `0.2.0` tag with unreleased work — normal.

---

## 10. Certification

**VERDICT: CERTIFIED WITH OWNER ACTION.**

The failure was correctly diagnosed to two verified layers: the immediate `E401` from a revoked publish PAT, and the structural reason `GITHUB_TOKEN` cannot simply replace it — the repo has drifted back to the `jheavner95` user while the package scope is `@studiopod`, so the scope no longer matches the repo owner. That second finding is the one that matters, and it came from authenticated GitHub API checks, not the workflow log: had I stopped at "the PAT is bad," switching to `GITHUB_TOKEN` would have produced a fresh permission failure and looked like a new bug.

The workflow is repaired toward the correct destination — `GITHUB_TOKEN` auth, no hand-managed publish secret — and a safe, version-guarded recovery workflow can publish the existing `0.2.0` tag without a bump, commit, or tag. Both are committed; neither alters the version or the tag. What remains is genuinely the owner's: restore the repo to the `studiopod` org (reasserting DS-0.6), link the package for Actions, and trigger the recovery run. Only then can `0.2.0` publish.

Two honest caveats are recorded rather than smoothed over: `0.2.0` does **not** contain the DS-5G `destructive` variant (it was committed after the release was cut; it ships in `0.2.1`), and the recovery therefore publishes DS-5F's content under the `0.2.0` label — which is correct, just not what the WP's Phase-6 checklist assumed.

**Stopping after release recovery. DS-6.2 not resumed.**
