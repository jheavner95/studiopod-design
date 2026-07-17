# @studiopod/design-system — Distribution

**Status: PUBLISHING IS LIVE.** The two owner decisions this document originally left open — which registry, and the credential — were made in DS-0.6: the registry is **GitHub Packages**, the publish interlock (`private: true`) is removed, `publishConfig.registry` is pinned, and `DS_REGISTRY`/`DS_NPM_TOKEN` are configured. The package has been versioned and released through the real automated pipeline (`design-system-v0.1.1`, tagged and pushed by `.github/workflows/release.yml`'s `publish` job). §7's checklist below reflects what's actually been done and what's still open — item 3 (backfilling a `## 0.1.1` `CHANGELOG.md` entry) and items 8–10 (whether `studiopod-app`/`studiopod-web` have actually cut over — outside this repo, not verifiable from here) are the two loose ends worth checking before treating distribution as fully closed out. Consumer cutover (§8) was still deliberately unapplied as of this document's last full pass — confirm current state before assuming it's done.

Read §7 first if you just want the checklist.

---

## 1. Current state (the honest version)

| | As of DS-0.6 | Target |
|---|---|---|
| `studiopod-app` | `file:vendor/studiopod-design-system-0.1.0.tgz` — a **171 KB binary committed to the app repo** (DS-0), unless cut over since — verify in that repo, not here | `@studiopod/design-system@^X.Y.Z` from the registry |
| `studiopod-web` | `file:../studiopod-design/packages/design-system/studiopod-design-system-0.1.0.tgz` — a **relative path to a tarball outside its own repo**, unless cut over since — verify in that repo, not here | same |
| Registry | **GitHub Packages** (`https://npm.pkg.github.com`) — chosen, live | done |
| Published versions | **`0.1.1`**, released through the automated workflow | ongoing |

`studiopod-web`'s current link cannot work on Vercel: the sibling repo does not exist there. `studiopod-app`'s vendored tarball *does* work on Vercel, but only because a human remembers to re-vendor it. Both violate DS-0.5's "no vendored binaries / no relative package links" rules. **That is the whole point of this work package** — and it is not fixed until §7 is done.

Two interlocks currently make publishing **impossible**, both deliberate:

1. **`private: true`** in `packages/design-system/package.json` — npm refuses to publish a private package.
2. **`vars.DS_REGISTRY` + `secrets.DS_NPM_TOKEN` are unset** — the CI publish job skips itself.

The first exists because without a chosen `publishConfig.registry`, `npm publish` **defaults to the public npmjs registry**. Removing `private: true` before choosing a registry risks publishing proprietary, `UNLICENSED` code to the public internet. It stays until §7 step 1.

---

## 2. Choosing a registry

Not yet decided. The tradeoff is real, and it is mostly about **who needs a token to install**.

| | GitHub Packages | npm — scoped, public | npm — scoped, private |
|---|---|---|---|
| Package stays private | ✅ | ❌ **world-readable** | ✅ |
| Publish credential | ✅ CI's built-in `GITHUB_TOKEN` works | ❌ needs an npm automation token | ❌ needs an npm automation token |
| **Install needs auth** | ❌ **always — even for public packages** | ✅ **none** | ❌ always |
| Vercel setup | PAT in env for **both** projects | **nothing** | PAT in env for both projects |
| Local dev setup | every machine needs a PAT | nothing | every machine needs a PAT |
| Cost | free | free | **paid org** |
| Token expiry risk | PAT expiry breaks **all** builds | n/a | breaks all builds |

The decisive, easily-missed fact: **GitHub Packages' npm registry requires authentication for every install, including of public packages.** It is not a misconfiguration; it is how the product works. Choosing it means accepting a PAT in Vercel for both projects, on every developer machine, rotated before expiry — otherwise every build breaks at once.

npm-public is the only option with genuinely zero-config installs, but it publishes an `UNLICENSED` design system to the public internet. That is a disclosure decision, not an engineering one.

Whatever you choose, the pipeline is already registry-agnostic: set `vars.DS_REGISTRY` and `secrets.DS_NPM_TOKEN` and it works unchanged.

---

## 3. Installation guide (consumers)

The registry side of §7 (items 1–7) is done — these steps apply now. Items 8–10 (consumer cutover) are what's still unconfirmed.

### 3.1 `.npmrc` — only if the registry requires auth

Skip entirely for npm-public. For GitHub Packages or npm-private, add to each consumer repo root:

```ini
# .npmrc — committed. Contains NO secret; ${NPM_TOKEN} is read from the env.
@studiopod:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

For npm-private, substitute `https://registry.npmjs.org` and `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`.

> **Never commit a token.** The `${NPM_TOKEN}` form is expanded by npm from the environment at install time. The literal value belongs in Vercel env vars and your shell — never in git.

### 3.2 Install

```bash
npm install @studiopod/design-system@^0.1.0
```

### 3.3 Wire it up

Already done in `studiopod-app` (DS-0) and `studiopod-web`; shown for any new consumer:

```css
/* app/globals.css — order matters; later @theme wins */
@import 'tailwindcss';
@import '@studiopod/design-system/styles.css';   /* canonical tokens */
@source '../node_modules/@studiopod/design-system/dist';  /* REQUIRED */
```

**The `@source` line is not optional.** Tailwind ignores `node_modules`, so without it none of the DS's classes are generated and **every DS component renders unstyled** — with no error.

Peer deps: `react ^18 || ^19`, `react-dom`, `next >= 14`.

---

## 4. Release guide

Versioning policy: **`packages/design-system/VERSIONING.md`** (pre-1.0 rules, PATCH/MINOR/MAJOR, deprecation procedure). This section covers *mechanics* only.

### 4.1 Every push and PR

`.github/workflows/release.yml` → `verify` job runs on all pushes to `main` and all PRs:

```
npm ci            deterministic install (fails if lock is out of sync)
npm run verify    build → typecheck → api-check → exports-check
npm pack --dry-run
```

The tarball is uploaded as a build artifact so you can inspect exactly what would ship without publishing.

### 4.2 Cutting a release

1. Update `packages/design-system/CHANGELOG.md` under a new `## X.Y.Z` heading.
2. Actions → **Release @studiopod/design-system** → *Run workflow*.
3. Choose `release_type` (`patch` / `minor` / `major`) per VERSIONING.md.
4. **Leave `dry_run` checked** for a rehearsal — everything runs, nothing publishes.
5. Uncheck `dry_run` to release.

The workflow then bumps the version, commits, tags `design-system-vX.Y.Z`, publishes, and generates GitHub release notes from the CHANGELOG.

If `DS_REGISTRY` or `DS_NPM_TOKEN` is missing, the publish job **skips with a warning** rather than failing — the release is simply not configured yet.

### 4.3 The gate cannot be bypassed

`prepublishOnly` runs `npm run verify` again inside `npm publish`. Publishing by hand from a laptop still runs build + typecheck + API-baseline + export verification. A broken package cannot be published by skipping CI.

### 4.4 What the gate catches

- **`api-check`** — any change to the public exports (569 index / 5 tokens / 44 marketing / 249 illustrations as of DS-4; this count grows as the design system does — see `packages/design-system/api-baseline/*.json` for the live figures, not this line). Drift fails the build; an intentional API change requires `node scripts/check-api.mjs --write` and a deliberate commit.
- **`exports-check`** — every `exports` target exists, is real ESM, ships inside `files`, keeps `"use client"` on client entries, and keeps the `@theme` block in `styles.css`.

Those last two are not hypothetical: the DS's two most recent commits fixed exactly those regressions (tsup silently stripping `"use client"`, and silently stripping `@theme`). The checker is mutation-tested against both.

---

## 5. Upgrade guide

```bash
npm install @studiopod/design-system@^0.2.0
npm run build          # in the consumer
```

Then re-verify the things the DS can silently change:

1. **Tokens.** The DS's `@theme` overrides Tailwind's own defaults — including the **radius scale**. A DS token change can restyle thousands of call sites with no app diff. Diff `dist/styles.css` between versions before upgrading.
2. **`@source` still resolves.** If the package path changes, classes silently vanish.
3. **`API.md` / CHANGELOG** for removed exports.

Expectations by bump (full policy in VERSIONING.md):

| Bump | Expect |
|---|---|
| **patch** | drop-in. No API change, no token change. |
| **minor** | additive API. **Pre-1.0, may contain documented breaking changes** — read the CHANGELOG. |
| **major** | breaking. Migration notes required. |

**Pin exact versions (`0.1.0`, not `^0.1.0`) while pre-1.0** if you want zero surprises: pre-1.0 minors are allowed to break.

---

## 6. Rollback guide

**Rolling back a consumer** (fast, always safe):

```bash
npm install @studiopod/design-system@0.1.0   # exact previous version
git commit package.json package-lock.json -m "rollback: DS 0.1.0"
```

Vercel redeploys from the lockfile. Because installs are deterministic (`npm ci`), the previous build is reproducible byte-for-byte.

**Rolling back a Vercel deploy without touching the DS:** use Vercel's *Instant Rollback* on the previous deployment. Prefer this when a release is actively breaking production — it is immediate and needs no publish.

**Do NOT unpublish.** npm forbids unpublishing after 72 hours, and unpublishing breaks every lockfile that references the version. **Publish a corrected higher version instead** — forward, never backward. If a version is genuinely dangerous, deprecate it:

```bash
npm deprecate @studiopod/design-system@0.2.0 "Broken tokens; use 0.2.1"
```

`npm deprecate` warns installers without breaking existing builds. It is the correct tool.

**If a bad version was published:** publish the fix as a new patch, roll consumers forward, then deprecate the bad version. Three steps, no unpublish, no broken lockfiles.

---

## 7. Owner-action checklist

Items 1, 3–7 are done, verified by the real artifacts they were supposed to produce (a live `publishConfig`, a real `design-system-v0.1.1` tag). **Item 2 has since regressed** — see its own line below; this was true when this checklist was first written but is not true as of DS-4. Items 8–10 concern the two *consumer* repos (`studiopod-app`, `studiopod-web`), which this repo has no visibility into — confirm their state directly rather than assuming.

- [x] **1. Choose the registry** (§2). **Chosen: GitHub Packages.**
- [ ] **2. Registry account / org setup — REGRESSED.** GitHub Packages requires the npm scope (`@studiopod`) to equal the repo owner (`.github/workflows/release.yml`'s own header comment: "If the repo ever moves back to a personal account, publishing breaks and the scope must change with it"). The repo now lives at `github.com/jheavner95/studiopod-design` — a personal account, not the `studiopod` org — so that requirement is currently **not** satisfied, and a publish attempt under the current `@studiopod/design-system` name/registry combination should be expected to fail. This is not a new problem introduced by DS-4; it was identified and flagged earlier (the repo moved organizations mid-project) but not resolved, since the fix is an owner decision (move the repo back to a `studiopod`-owned org, or change the package scope/registry to match wherever it actually lives) that this phase does not make on its own. Resolve before the next real publish attempt.
- [x] **3. Remove the publish interlock**
  - `packages/design-system/package.json`: `"private": true"` removed (DS-0.6 Phase D).
  - Registry pin is live: `"publishConfig": { "registry": "https://npm.pkg.github.com" }`.
  - `packages/design-system/package.json` still declares `"license": "UNLICENSED"` — the *repository* now has a root `LICENSE` (MIT, see the root README), but whether the *published package's* own license/distribution model should also change is a separate, deliberate decision this document doesn't make for you. Leaving it `UNLICENSED` on GitHub Packages (private-by-registry-default, auth required to install) is a valid choice independent of the source repo being public.
  - `CHANGELOG.md` still has no `## 0.1.1` heading (still reads "0.1.0 — unreleased (not published)" at the top) — worth backfilling so the release notes GitHub generated for `design-system-v0.1.1` (which fall back to "See CHANGELOG.md" when no matching heading exists) have real content to point to.
- [x] **4. Create the token** — done; the publish job has run successfully.
- [x] **5. Configure the DS repo** (Settings → Secrets and variables → Actions) — `DS_REGISTRY`/`DS_NPM_TOKEN` are set; the publish job no longer skips.
- [x] **6. Rehearse** — exercised via `dry_run`.
- [x] **7. First publish** — `0.1.1` has been released through the workflow.
- [ ] **8. Vercel configuration** — *skip entirely for npm-public.* Not verifiable from this repo — confirm directly in `studiopod-app`/`studiopod-web`'s own Vercel projects whether `NPM_TOKEN` is set.
- [ ] **9. Consumer cutover** — per §8. Not verifiable from this repo.
- [ ] **10. Deployment verification** — deploy both consumers and confirm the DS resolves from the registry, styles render, and no `@source` breakage. Not verifiable from this repo.

---

## 8. Consumer cutover (prepared, deliberately NOT applied)

Both consumers were left on their **currently working** package source, as instructed. Do this only after a successful first publish (§7.7) — cutting over first would break both.

### 8.1 `studiopod-app`

```bash
cd studiopod-app
# 1. (auth registries only) add .npmrc per §3.1
# 2. swap the vendored tarball for the registry
npm uninstall @studiopod/design-system
npm install @studiopod/design-system@^0.1.0
# 3. delete the vendored binary — the whole point of DS-0.5
git rm -r vendor/
# 4. verify BEFORE committing
npx next build && npm test
```
Expect `package.json` to change from `"file:vendor/studiopod-design-system-0.1.0.tgz"` to `"^0.1.0"`. Nothing else in the app should change — `globals.css` already imports `@studiopod/design-system/styles.css` and `@source`s the package, and both are path-identical once installed from a registry.

### 8.2 `studiopod-web`

```bash
cd studiopod-web
# 1. (auth registries only) add .npmrc per §3.1
npm uninstall @studiopod/design-system
npm install @studiopod/design-system@^0.1.0
npx next build
```
This one **fixes a currently-broken production install**, not just a tidiness issue: `file:../studiopod-design/...` cannot resolve on Vercel.

### 8.3 Verification per consumer

| Check | How |
|---|---|
| Install | `rm -rf node_modules package-lock.json && npm install` resolves from the registry |
| Deterministic | `npm ci` succeeds from a clean clone |
| Local dev | dev server renders DS components **styled** (if unstyled → `@source` is wrong) |
| Production build | `npx next build` exits 0 |
| Vercel | deploy; confirm build log resolves the package from the registry |
| Upgrade | bump, build, diff `dist/styles.css` for token changes (§5) |
| Rollback | install the exact prior version, rebuild (§6) |

---

## 9. Rules compliance

| Rule | Status |
|---|---|
| no vendored binaries | ⏳ `studiopod-app/vendor/*.tgz` is removed at cutover (§8.1) — a registry now exists to cut over to; whether that cutover has happened is only verifiable in `studiopod-app` itself. |
| no relative package links | ⏳ `studiopod-web`'s `file:../…` is removed at cutover (§8.2) — same caveat: verify in `studiopod-web`, not here. |
| no manual package replacement | ✅ CI is the only release path; `prepublishOnly` re-gates manual publishes |
| deterministic installs | ✅ `npm ci` in CI; lockfile-pinned consumers |
| reproducible builds | ✅ `npm run verify` reproduces `dist/` from source; API + export baselines enforce it |
| one canonical package | ✅ `@studiopod/design-system`, one repo, one exports map |

The first two were blocked on "no registry exists" at DS-0.5 certification time — that blocker is gone (§7). What remains open is confirming the two consumer repos have actually cut over now that there's a registry to cut over to; that confirmation can only happen in those repos, not this one.
