# Final Verification — PAT Scope Audit (Least-Privilege)

**Verdict:** ⚠️ **CERTIFIED WITH OWNER ACTION** — only PAT creation and the workflow trigger remain. The PAT recommendation is confirmed correct and minimal against **current GitHub documentation**; the secret wiring is verified least-exposure. No code, workflow, version, or publish change was made in this audit.

---

## 1. GitHub Documentation Summary (current, not memory)

Verified against GitHub's live docs (fetched this session):

- **Token type — classic only.** *"GitHub Packages only supports authentication using a personal access token (classic)."* → **fine-grained PATs are not supported** for publishing npm packages to GitHub Packages. (docs.github.com — *Working with the npm registry*)
- **Publish scope — `write:packages`.** *"`write:packages` — access to upload or publish a package in GitHub Packages."* This is the minimum publish scope. (docs.github.com — *Scopes for OAuth apps*)
- **Install scope — `read:packages`.** *"access to download or install packages from GitHub Packages"* — needed only to *consume* packages.
- **`delete:packages`** — *"access to delete packages"* — not needed to publish.
- **`GITHUB_TOKEN` scope — repository-bound.** The docs state `GITHUB_TOKEN` publishes *"packages associated with the workflow repository."* Combined with the ownership facts (§ below), this is why it cannot publish here.

**Sources:**
- [Working with the npm registry — GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Scopes for OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)

### Why `GITHUB_TOKEN` is insufficient in this architecture (confirmed)

| Fact | |
|---|---|
| Workflow repo | `jheavner95/studiopod-design` (a **User**; public, for Vercel's free plan) |
| Package namespace | `@studiopod` (an **Organization**) |
| `GITHUB_TOKEN` can publish | only packages *associated with the workflow's repository* — i.e. within the repo owner's (`jheavner95`) namespace |
| `@studiopod/*` lives in | the `studiopod` **org** namespace — a *different* owner |

`GITHUB_TOKEN` is a repository-scoped credential; it has no authority over another account's (the org's) package namespace, so publishing `@studiopod/*` from a `jheavner95` repo is denied. A **classic PAT carries the issuing user's identity**, and a user who is a `studiopod`-org member with `write:packages` crosses that owner boundary — which is exactly how `0.1.1` was published. The docs' fine-grained-unsupported statement independently forecloses the only other token type. **PAT is required; the conclusion holds after reviewing current docs.**

---

## 2. Recommended PAT Type

**Classic personal access token.** Fine-grained is not an option — GitHub's own docs state GitHub Packages "only supports authentication using a personal access token (classic)." So there is no least-privilege *fine-grained* alternative to weigh; classic is the only supported type.

---

## 3. Minimum Required Scopes

**`write:packages` — and nothing else.**

| Scope | Needed? | Why |
|---|---|---|
| `write:packages` | ✅ **yes** | the only scope that grants publish/upload |
| `read:packages` | ❌ no | needed only to *install* GitHub-Packages deps. The release's `npm ci` installs the package's dependencies (`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`) — **all public npmjs packages; zero `@studiopod` deps** — so the publish workflow never reads from GitHub Packages. |
| `repo` | ❌ no | historically required by older GitHub Packages flows; **not** required by the current npm registry for publishing |
| `delete:packages` | ❌ no | publishing never deletes |

**Least-privilege credential: a classic PAT with `write:packages` only**, owned by a `studiopod`-org member with package-publish rights (`jheavner95`, as used for `0.1.1`). The org membership provides the *access*; `write:packages` provides the *capability*.

*(Note: some GitHub UIs auto-select `read:packages` when you tick `write:packages`. That is acceptable and still minimal — it does not broaden beyond Packages. Do not add `repo` or `delete:packages`.)*

---

## 4. Secret Configuration Verification (Phase 3)

Audited `release.yml` (the only workflow referencing the secret — the 0.2.0 recovery workflow was removed):

| Check | Result |
|---|---|
| Workflow expects `DS_NPM_TOKEN` | ✅ |
| Token **value** injected only into the publish step | ✅ `NODE_AUTH_TOKEN: ${{ secrets.DS_NPM_TOKEN }}` appears **once**, in the `Publish` step (line 367) |
| No other step receives the token | ✅ the gate and dry-run steps take `DS_REGISTRY` only; `NODE_AUTH_TOKEN` appears nowhere else |
| No stale references | ✅ every other `DS_NPM_TOKEN` occurrence is a comment; the recovery workflow that also referenced it is deleted |
| Logs cannot expose the token | ✅ the value is never `echo`/`run`-printed. The one echo that mentions `DS_NPM_TOKEN` prints the literal **name** as documentation (`"publish auth : PAT (DS_NPM_TOKEN)…"`), not `${{ secrets.… }}`. GitHub additionally masks registered secret values in logs as a backstop. |
| No tracked `.npmrc` carrying a token | ✅ none tracked; `actions/setup-node` generates the auth `.npmrc` at build time from `NODE_AUTH_TOKEN` |

Secret handling is correct and minimal-exposure.

---

## 5. Final Owner Checklist

Operational only — no development work remains.

- ☐ **Create the PAT** — GitHub → Settings → Developer settings → **Tokens (classic)** → Generate new token (classic). Scope: **`write:packages`** only. Owner: a `studiopod`-org member (`jheavner95`). Note the expiry.
- ☐ **Configure the secret** — `jheavner95/studiopod-design` → Settings → Secrets and variables → Actions → **New repository secret** → name **`DS_NPM_TOKEN`**, value = the PAT. (Do not paste it anywhere else.)
- ☐ **Verify GitHub Packages access** — confirm the token's owner can publish to `@studiopod` (they published `0.1.1`, so this should already hold; a `dry_run: true` workflow run exercises everything except the publish itself).
- ☐ **Trigger** Actions → **Release @studiopod/design-system** → Run workflow
- ☐ **`release_type = patch`** (bumps `0.2.0 → 0.2.1`)
- ☐ **`dry_run = false`**
- ☐ **Confirm** `@studiopod/design-system@0.2.1` exists in GitHub Packages
- ☐ **Verify** the published tarball's `dist/index.js` contains the `destructive` Button styling (`bg-error text-white`) and `dist/index.d.ts` includes `"destructive"` in the `ButtonProps` variant union
- ☐ **Resume DS-6.2** (Button migration) once `0.2.1` is live

---

## 6. Certification

**VERDICT: CERTIFIED WITH OWNER ACTION.**

The PAT recommendation is correct and minimal against current GitHub documentation, not memory: GitHub Packages supports only classic PATs for npm publishing (so fine-grained is off the table by GitHub's own statement), and the sole scope required to publish is `write:packages` — verified least-privilege here because the release installs no GitHub-Packages dependencies, so even `read:packages` is unnecessary. `GITHUB_TOKEN` remains insufficient for the reason the deliberate architecture creates: a repository-scoped token cannot publish into a different owner's (the org's) package namespace, while a `studiopod`-member classic PAT can, exactly as it did for `0.1.1`.

The secret is wired to exactly one step, never printed, and backed by GitHub's log masking; no stale references survive. Everything technical is done. What remains is purely operational: create a `write:packages` classic PAT, set `DS_NPM_TOKEN`, and trigger a `patch` release to publish `0.2.1`.

**Stopping after this report. Nothing published. DS-6.2 not resumed.**
