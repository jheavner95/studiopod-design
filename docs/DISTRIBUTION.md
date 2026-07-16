# @studiopod/design-system — Distribution

**Status: PREPARED, NOT LIVE.** The package is publish-ready in every respect except the two decisions only an owner can make: **which registry**, and **the credential**. Nothing here has been published. Both consumers still install from their current sources and were deliberately left untouched (§6).

Read §7 first if you just want the checklist.

---

## 1. Current state (the honest version)

| | Today | Target |
|---|---|---|
| `studiopod-app` | `file:vendor/studiopod-design-system-0.1.0.tgz` — a **171 KB binary committed to the app repo** (DS-0) | `@studiopod/design-system@^X.Y.Z` from a registry |
| `studiopod-web` | `file:../studiopod-design/packages/design-system/studiopod-design-system-0.1.0.tgz` — a **relative path to a tarball outside its own repo** | same |
| Registry | none | **owner decision — §2** |
| Published versions | **none.** `0.1.0` has never been published | `0.1.0` (first release) |

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

**Applies after §7. Do not run these yet.**

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

- **`api-check`** — any change to the 841 public exports (543 index / 5 tokens / 44 marketing / 249 illustrations). Drift fails the build; an intentional API change requires `node scripts/check-api.mjs --write` and a deliberate commit.
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

Everything below needs credentials or external services. **I did none of it, and nothing here has been verified end-to-end.**

- [ ] **1. Choose the registry** (§2). This decides everything downstream.
- [ ] **2. Registry account / org setup**
  - GitHub Packages: nothing — the repo already implies the registry.
  - npm: own the **`@studiopod`** scope on npmjs (create the org). Private also needs a paid plan.
- [ ] **3. Remove the publish interlock**
  - `packages/design-system/package.json`: delete `"private": true`.
  - Add the registry pin so publish can never default to public npm by accident:
    ```json
    "publishConfig": { "registry": "https://npm.pkg.github.com" }
    ```
    (or `https://registry.npmjs.org`; for npm-public also add `"access": "public"`).
  - If publishing publicly, replace `"license": "UNLICENSED"` and add a LICENSE file — there is currently none.
- [ ] **4. Create the token** — *you must do this; I must not handle credentials.*
  - GitHub Packages: CI's built-in `GITHUB_TOKEN` can publish. A **separate PAT with `read:packages`** is still needed for *installs* (Vercel + laptops).
  - npm: an **automation** token with publish rights.
- [ ] **5. Configure the DS repo** (Settings → Secrets and variables → Actions)
  - Variable **`DS_REGISTRY`** = the registry URL.
  - Secret **`DS_NPM_TOKEN`** = the publish token.
  - Until both exist the publish job skips — by design.
- [ ] **6. Rehearse** — run the workflow with **`dry_run` checked**. Confirm `verify` is green and inspect the uploaded tarball artifact.
- [ ] **7. First publish** — run with `dry_run` unchecked. Confirm `0.1.0` (or `0.1.1`) appears in the registry.
- [ ] **8. Vercel configuration** — *skip entirely for npm-public.*
  - Add `NPM_TOKEN` env var to **both** `studiopod-app` and `studiopod-web` (all environments).
  - Note the expiry date somewhere you will actually see it. **PAT expiry breaks every build simultaneously.**
- [ ] **9. Consumer cutover** — only after §7.7 succeeds. Per §8.
- [ ] **10. Deployment verification** — deploy both consumers and confirm the DS resolves from the registry, styles render, and no `@source` breakage.

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
| no vendored binaries | ⏳ `studiopod-app/vendor/*.tgz` is removed at cutover (§8.1). **Still present today.** |
| no relative package links | ⏳ `studiopod-web`'s `file:../…` is removed at cutover (§8.2). **Still present today.** |
| no manual package replacement | ✅ CI is the only release path; `prepublishOnly` re-gates manual publishes |
| deterministic installs | ✅ `npm ci` in CI; lockfile-pinned consumers |
| reproducible builds | ✅ `npm run verify` reproduces `dist/` from source; API + export baselines enforce it |
| one canonical package | ✅ `@studiopod/design-system`, one repo, one exports map |

The first two are **not satisfied yet** and cannot be until a registry exists. That is the honest reason DS-0.5 is *CERTIFIED WITH DEFERRED ITEMS*.
