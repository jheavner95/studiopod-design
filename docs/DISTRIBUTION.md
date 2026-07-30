# @studiopod/design — Distribution

> **Renamed in DS-7.3a.** This package was published as `@studiopod/design-system`
> through **0.12.0**. From **0.13.0** it is `@studiopod/design`. The repository,
> exports, component APIs, and CSS are unchanged — only the package name moved.
>
> Consequences for the procedures below:
>
> - **Installing or upgrading** → use `@studiopod/design`.
> - **Rolling back to 0.12.0 or earlier** → those versions exist only under the
>   old name, so the rollback commands in § Rollback deliberately still say
>   `@studiopod/design-system`. That is correct, not stale.
> - **Consumers have not migrated yet.** `studiopod-app` and `studiopod-web`
>   still depend on `@studiopod/design-system@^0.12.0` / `@^0.1.1`. Their cutover
>   is DS-7.4; the sections describing their current wiring are left as they are
>   because they describe what is installed today.

**Status: PUBLISHING IS LIVE.** The two owner decisions this document originally left open — which registry, and the credential — were made in DS-0.6: the registry is **GitHub Packages**, the publish interlock (`private: true`) is removed, `publishConfig.registry` is pinned, and `DS_REGISTRY`/`DS_NPM_TOKEN` are configured. The package has been versioned and released through the real automated pipeline (`design-system-v0.1.1`, tagged and pushed by `.github/workflows/release.yml`'s `publish` job). §7's checklist below reflects what's actually been done and what's still open — item 3 (backfilling a `## 0.1.1` `CHANGELOG.md` entry) and items 8–10 (whether `studiopod-app`/`studiopod-web` have actually cut over — outside this repo, not verifiable from here) are the two loose ends worth checking before treating distribution as fully closed out. Consumer cutover (§8) was still deliberately unapplied as of this document's last full pass — confirm current state before assuming it's done.

Read §7 first if you just want the checklist.

---

## 1. Current state (the honest version)

| | As of DS-0.6 | Target |
|---|---|---|
| `studiopod-app` | `file:vendor/studiopod-design-system-0.1.0.tgz` — a **171 KB binary committed to the app repo** (DS-0), unless cut over since — verify in that repo, not here | `@studiopod/design@^X.Y.Z` from the registry |
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
npm install @studiopod/design@^0.13.0
```

### 3.3 Wire it up

Already done in `studiopod-app` (DS-0) and `studiopod-web`; shown for any new consumer:

```css
/* app/globals.css — order matters; later @theme wins */
@import 'tailwindcss';
@import '@studiopod/design/styles.css';   /* canonical tokens */
@source '../node_modules/@studiopod/design/dist';  /* REQUIRED */
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
2. Actions → **Release @studiopod/design** → *Run workflow*.
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
npm install @studiopod/design@^0.13.0
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

  > **SUPERSEDED — DS-7.3a-R1 (see below). The dated text above is preserved as
  > the DS-4 record; do not act on it.** Two of its claims are now known to be
  > wrong, from evidence rather than argument:
  >
  > 1. *"GitHub Packages requires the npm scope to equal the repo owner."* It
  >    does not. `@studiopod/design-system` has been published from
  >    `jheavner95/studiopod-design` at least seventeen times — `0.1.1` through
  >    `0.12.0` are all readable in the registry today. A cross-owner publish
  >    works when the credential is a PAT owned by an authorized `studiopod`
  >    member; `GITHUB_TOKEN` is what cannot cross that boundary.
  > 2. *"a publish attempt … should be expected to fail."* Publishing a NEW
  >    VERSION of an existing package demonstrably succeeds. What remains genuinely
  >    unproven is a **first publish of a NEW package name** into the org
  >    namespace — `@studiopod/design` has never existed — which requires
  >    package-creation rights that no read-only probe can confirm. That is a
  >    narrower and different risk than this item describes.
  >
  > Current status: see §10.

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
npm install @studiopod/design@^0.13.0
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
npm install @studiopod/design@^0.13.0
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
| one canonical package | ✅ `@studiopod/design`, one repo, one exports map |

The first two were blocked on "no registry exists" at DS-0.5 certification time — that blocker is gone (§7). What remains open is confirming the two consumer repos have actually cut over now that there's a registry to cut over to; that confirmation can only happen in those repos, not this one.

## 10. Release modes (DS-7.3a-R1)

The release workflow has two explicitly named modes. They are disjoint: there is
no combination of a pre-set version and an automatic bump, because that
ambiguity is what blocked the `0.13.0` release in DS-7.3a-R.

Both are driven from **Actions → Release @studiopod/design → Run workflow**, and
`dry_run` defaults to **true**. A real release requires deliberately turning it
off.

### 10.1 `committed` mode — publish the version already in the manifest

Reads `name` and `version` straight from the committed
`packages/design-system/package.json`, mutates nothing, and publishes exactly
that. It is the correct mode whenever the version was set and certified in an
earlier work package.

For the pending release it resolves:

```text
name    = @studiopod/design
version = 0.13.0
tag     = design-system-v0.13.0
```

**Why `0.13.0` must not be bumped automatically.** `0.13.0` is the version that
DS-7.3a certified: its 15 built files were hash-compared against
`@studiopod/design-system@0.12.0` and proven byte-identical, and its tarball was
diffed entry by entry. Bumping would publish `0.13.1` — a coordinate nobody
verified, whose changelog entry does not exist, and which contradicts every
document describing this rename. The previous workflow could *only* bump, which
is precisely why it could not perform this release.

Committed mode additionally **fails on a dirty tree**, so stale generated output
or an accidental manifest edit stops the release rather than shipping.

### 10.2 `bump` mode — compute the next version

Retains the original behaviour for ordinary releases: pick `patch`, `minor` or
`major`, and the workflow applies it, publishes, then commits the version bump
alongside the tag. Use this for every normal release where the version has not
been pre-set.

### 10.3 Dry run

The default. Runs the entire path — clean install, lint, typecheck, tests, API,
CSS, use-client, export and package-identity checks, build, full verify, pack,
packed-manifest inspection, registry existence check, tag existence check — and
publishes, tags and releases **nothing**. It reports the exact intended package,
version, registry, tag and mode. The job holds `permissions: contents: read`, so
it is incapable of tagging or publishing regardless of what its steps say.

**What the tarball actually contains (DS-7.5D.1).** The dry run applies no
version bump — it has no bump command at all, which is what makes "changes
nothing" a structural property rather than a promise. So in `bump` mode the
tarball carries the **committed** version while the registry and tag checks run
against the **resolved target**. `scripts/release/check-dry-run-artifact.mjs`
reconciles them: the artifact against what was actually packed, the target
against the mode's arithmetic. Do not treat a bump-mode dry-run artifact as a
tarball of the target version — a real release differs from it only in the
manifest's `version` field.

Before this fix the job compared the packed version directly against the bumped
target, which could never hold in `bump` mode; every bump-mode dry run failed,
so no future release candidate could be validated.

**A `committed`-mode dry run fails once that version is published.** That is the
registry guard working as designed, not a regression — `0.13.0` is published, so
committed mode reports `already-published`. To rehearse the next release, use
`bump` mode.

### 10.4 Transactional ordering

```text
1. validate (credential preflight, target resolution, clean-tree check)
2. build    (full verify: api, css, use-client, exports, identity)
3. pack
4. confirm the target version is unused      <- last reversible moment
5. PUBLISH                                    <- irreversible
6. install from the registry in a clean external consumer
7. verify exports, types, CSS, and dist hashes against the local tarball
8. create and push the git tag
9. create the GitHub release
```

**The tag is created last, and only after the published artifact has been
installed and verified from outside this repository.** A publish failure or a
remote-verification failure therefore leaves no tag and no release.

This is a correction, not a restatement: the previous workflow committed, tagged
and *pushed* before `npm publish` ran, so a failed publish left an orphan tag and
a version-bump commit on `main` that had to be cleaned up by hand.

**Publication itself cannot be rolled back.** A published `name@version` is
permanent on GitHub Packages and npm alike — `unpublish` does not free the
coordinate for reuse. Steps 1–4 exist because they are the only reversible part.

### 10.5 Credential requirements

Publishing uses `secrets.DS_NPM_TOKEN`, wired into the four steps that touch the
registry and nowhere else. It must be:

| Requirement | Why |
| --- | --- |
| A **classic** PAT | The workflow's publish path expects classic-PAT semantics; a fine-grained token's package permissions cannot be read from the API response header, so preflight can only report it as indeterminate |
| Scope `write:packages` | Publishing. `read:packages` alone is not enough — this is exactly the state the local developer PAT was found in |
| Scope `read:packages` | The registry existence check and the post-publish verification both read |
| Owned by an authorized `studiopod` member | GitHub Packages ties publish rights to the scope's owning account |
| SSO-authorized for `studiopod`, if SSO is enforced | Preflight detects this via the `x-github-sso` response header |
| Permitted to **create a new package** in the org | `@studiopod/design` has never existed, so this is a first publish |

`preflight-credential.mjs` distinguishes missing / invalid / read-only /
write-capable / SSO-restricted / indeterminate credentials before anything
irreversible runs, and never prints the token.

**The honest limit:** GitHub exposes no endpoint that answers "may this token
create a new package under this organization?". `write:packages` is necessary
but not sufficient, and package-creation permission is proven only by the
publish attempt itself. Preflight says so in its own output rather than implying
a clearance it cannot give.

### 10.6 Post-publish verification

`verify-published.mjs` runs in a temp directory outside the workspace, installs
the published version from the registry as a real consumer, and checks the
installed manifest name and version, every export subpath (via
`import.meta.resolve`, which resolves without executing, so the React/Next peers
are never needed), the presence of type declarations, the CSS entry and its
`@theme` block, that `@studiopod/design-system` was not pulled in transitively,
that no unexpected runtime dependency appeared, and that every `dist/` file is
byte-identical to the locally packed tarball.

Only after this passes is the tag created.
