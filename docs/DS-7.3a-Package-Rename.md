# DS-7.3a — Package rename: `@studiopod/design-system` → `@studiopod/design`

> **HISTORICAL RECORD — do not act on this document.** It is preserved as the
> dated record of the work package named in its title. It describes the
> `@studiopod` package namespace as a GitHub *organization*; that was never
> true, and no such organization is part of this infrastructure. Every active
> repository and both published packages are owned by the personal account
> `jheavner95`. For the current model see
> [`engineering/publishing.md`](engineering/publishing.md).

A mechanical package-identity migration. **Nothing inside the package changed.**

> **Status:** implemented, not published, not tagged, not released.
> Consumers are untouched and continue to work — see § 9.

---

## 1. Rename rationale

The repository has been `studiopod-design` for some time while the package it
publishes was still `@studiopod/design-system`. That mismatch is a small,
permanent tax: every reference has to specify which of the two names is meant,
and the longer name implies the package is *the design system as a whole* when
it is in fact one of several artifacts the repository produces (the
documentation site and playgrounds being the others).

DS-7 makes the mismatch worse rather than better. Once `@studiopod/foundation`
exists beneath it, the graph reads:

```text
@studiopod/foundation
        ▲
        │
@studiopod/design
        ▲
        │
studiopod-app
```

`@studiopod/foundation` + `@studiopod/design` is a coherent pair of names.
`@studiopod/foundation` + `@studiopod/design-system` invites the reading that
one is a subset of the other.

Doing the rename **now**, as its own work package, is deliberate: it is the last
moment it is nearly free. It touches one manifest field, and the consumer
cutover it forces (DS-7.4) is the same cutover the Foundation token migration
will require anyway. Renaming *after* consumers adopt Foundation would mean two
separate consumer-wide migrations instead of one.

## 2. Old and new package identities

| | Before | After |
| --- | --- | --- |
| Repository | `studiopod-design` | `studiopod-design` *(unchanged)* |
| Package name | `@studiopod/design-system` | **`@studiopod/design`** |
| Version | `0.12.0` | **`0.13.0`** |
| Registry | `https://npm.pkg.github.com` | unchanged |
| Scope | `@studiopod` | unchanged |
| Package directory | `packages/design-system/` | unchanged — see below |
| Tarball | `studiopod-design-system-0.12.0.tgz` | `studiopod-design-0.13.0.tgz` |
| Tag prefix | `design-system-v` | unchanged — see § 14 |

**The `packages/design-system/` directory was not renamed.** It contains
`design-system` in its path but that creates no architectural or tooling
problem: nothing resolves the package by directory name, and the path appears in
~40 script/workflow/doc references that would all churn for a cosmetic gain. If
the directory is ever renamed, it should be its own change with its own diff.

### Occurrence inventory

The audit found **151 occurrences across 34 tracked files**. Of these, exactly
**one was functional**: `packages/design-system/package.json#name`. Every
occurrence in `src/` and `scripts/` was a documentation comment — there is no
import, `require`, or `@import` of the package's own name anywhere in the
repository, and the built `dist/` never contained the name at all.

| Classification | Count | Action |
| --- | --- | --- |
| package-identity | 1 | Renamed |
| internal-self-reference | 10 | Renamed (doc comments in `src/`, `scripts/`) |
| publishing | 6 | Renamed (`release.yml` name, header, artifact, tag message, release title; root `package:inspect` glob) |
| documentation (living) | 34 | Renamed (`README`×2, `API.md`, `VERSIONING.md`, `TOKENS.md`, `TONE.md`, `DISTRIBUTION.md` instructions, `CHANGELOG` header) |
| historical | 45 | **Preserved** — see below |
| consumer-reference | 0 | None inside this repo |
| generated | 0 | `dist/` never referenced the name |

**Preserved as historical**, because rewriting them would make the repository's
own record inaccurate:

- Dated work-package records: `docs/DS-5*`, `docs/DS-6*`, `docs/DS-7.2-*`
- `docs/engineering-notes/13`, `14` — analyses written against the old name
- `CHANGELOG.md` entries for 0.12.0 and earlier — those versions *were*
  published as `@studiopod/design-system`
- `docs/DISTRIBUTION.md` § Rollback and the DS-0/DS-0.7 consumer-cutover
  narrative — rollback to ≤0.12.0 genuinely uses the old name, and the sections
  describing what consumers have installed today are still accurate

`DISTRIBUTION.md` gained a banner at the top explaining the version/name split
so a reader hitting a preserved old-name command knows why it is there.

## 3. Versioning decision

**`0.12.0` → `0.13.0`.**

`VERSIONING.md` states the adopted policy directly:

> every consumer-visible breaking change is treated with major-version
> discipline, even before `1.0.0`. […] a breaking change bumps the **minor**
> digit (the only digit SemVer lets move pre-1.0) but is documented, reviewed,
> and changelogged exactly as if it were a major version

A package rename is the most consumer-visible change there is —
`npm install @studiopod/design-system` stops receiving new versions and every
import specifier changes — even though not one line of component code moved. So:
minor bump, breaking-change changelog entry, documented migration. `1.0.0` was
considered and rejected: the policy reserves it for a deliberate stability
commitment, and nothing about this change makes the API more stable than it was
yesterday.

## 4. API parity evidence

`dist/` was built and snapshotted before the rename and again after, and the two
compared mechanically.

| Property | Result |
| --- | --- |
| Export map (5 subpaths) | **identical** |
| `main` / `types` | **identical** |
| `files` allowlist | **identical** |
| `sideEffects` | **identical** |
| `type` | **identical** |
| `dependencies` (5) | **identical** |
| `peerDependencies` (3) | **identical** |
| `devDependencies` | **identical** |
| `publishConfig.registry` | **identical** |
| API baselines — `index` 616, `illustrations` 249, `marketing` 44, `tokens` 5 | **identical** |
| `dist/` file list (15 files) | **identical** |
| `dist/` **SHA-256 content hashes** | **identical — all 15** |

Every emitted file is byte-for-byte the same. Exported JavaScript symbols,
exported TypeScript symbols, public component names, and public prop types are
therefore unchanged by construction, not by inspection. The repository's own
`api-check` (which diffs the four baselines) passes without a baseline rewrite,
which is independent confirmation.

## 5. CSS and visual parity evidence

`dist/styles.css` is in the byte-identical set above, and `css-check` — the
repository's own CSS content-regression gate — passes unchanged.

No token value, stylesheet, component, or variant was touched, so there is no
mechanism by which visual output could differ. **No visual diff was run**, and
none is claimed as evidence; the byte-identity of the stylesheet and of every
component module is the stronger proof, and it is what is being relied on.

## 6. Export parity evidence

Beyond static comparison, the new `identity-check` proves the subpaths are
genuinely reachable **under the new name**: it packs a real tarball, extracts it
to `node_modules/@studiopod/design` in a scratch directory, and resolves each
subpath through Node's own export-map resolution.

```text
✔ resolves: @studiopod/design
✔ resolves: @studiopod/design/tokens
✔ resolves: @studiopod/design/marketing
✔ resolves: @studiopod/design/illustrations
✔ resolves: @studiopod/design/styles.css
✔ "@studiopod/design-system" no longer resolves
```

It uses `import.meta.resolve`, which performs full resolution *without executing
the module*, so the `react`/`next` peers never need to be installed — the same
constraint that keeps `check-exports.mjs` static.

### Tarball parity

The packed tarballs contain the **same 20 entries**. Diffing every file:

- `package.json` — `name`, `version`, and the added `identity-check` script
- `README.md`, `API.md`, `VERSIONING.md`, `CHANGELOG.md` — name references
- **every other file, including all 15 `dist/` files — identical**

That is exactly the approved metadata-difference surface and nothing else.

## 7. Publishing configuration

| Item | Finding |
| --- | --- |
| Scope | `@studiopod` — unchanged, and it must stay: GitHub Packages routes by scope |
| `publishConfig.registry` | `https://npm.pkg.github.com` — unchanged, asserted by `identity-check` |
| Registry pinning | Two independent mechanisms: `publishConfig.registry` and the workflow's `registry-url` + `scope` |
| `.npmrc` | **This repository has none, and none was added — see below** |
| Auth variable | `secrets.DS_NPM_TOKEN`, reaching only the publish step. Unchanged and still correct |
| Registry variable | `vars.DS_REGISTRY`, verified against the expected value; the job **fails** rather than skips if unset |
| Provenance | Not used |
| Workflow permissions | `contents: read` by default, write granted only to the publish job |
| Repository / homepage metadata | Point at `jheavner95/studiopod-design`, `directory: packages/design-system` — all still accurate |

### The `.npmrc` question

DS-7.1 flagged that `studiopod-app` and `studiopod-web` each carry an `.npmrc`
whose comment block explains at length why a
`//npm.pkg.github.com/:_authToken=${NPM_TOKEN}` line is harmful — that it
overrides a developer's `~/.npmrc` and expands to an empty token, failing every
install with `E401` — and which then **includes that exact line anyway**.

Resolved from actual behaviour rather than by copying either side:

**`studiopod-design` has no `.npmrc` at all, and does not need one.** It
publishes but does not consume any `@studiopod` package, and publishing is
already pinned twice over (`publishConfig.registry`, plus the workflow's
`registry-url`/`scope`, with auth supplied as `NODE_AUTH_TOKEN`). This
configuration is what actually published `0.1.1`. Adding an `.npmrc` here would
introduce the E401 trap for zero benefit, so none was added.

The contradiction lives in the two consumer repositories, which DS-7.3a may not
modify. It should be fixed during **DS-7.4**, when those manifests are being
edited anyway: delete the `_authToken` line, keep the scope-routing line, and
let the environment supply the token. Recorded in § 14 for HQ.

### Cross-owner constraint (unchanged, restated)

The repository owner (`jheavner95`, a User) differs from the package scope
(`@studiopod`, an org). `GITHUB_TOKEN`'s `packages:write` is scoped to the
repository owner and **cannot** publish into the org namespace; a classic PAT
belonging to a `@studiopod` member with `write:packages` can, and did for
`0.1.1`. The rename does not change this — a new package name under the same
scope has the same ownership requirement.

`docs/DISTRIBUTION.md` line 188 still carries a DS-4-era claim that publishing
"should be expected to fail" under this arrangement. That claim is contradicted
by `0.1.1` having actually published and by `release.yml`'s own corrected
header. It is left untouched as a dated audit record, but **it should not be
treated as current guidance** — flagged in § 14.

## 8. Deprecation-alias feasibility

Investigated as instructed. **Not implemented, and not recommended.**

| # | Question | Finding |
| --- | --- | --- |
| 1 | Does registry ownership permit both names? | **Yes.** Both are `@studiopod`-scoped, and GitHub Packages permits any number of packages per scope. It needs the same `write:packages` PAT — no new permission |
| 2 | Does GitHub Packages support the deprecation workflow? | **Partially, and this is the blocker.** `npm deprecate` requires a **version range on an existing published version**. `@studiopod/design-system` has published versions, so `npm deprecate '@studiopod/design-system@<=0.12.0' "Renamed to @studiopod/design"` would work and is the cheap, high-value half. But GitHub Packages does **not** implement npm's package-level deprecation or `npm dist-tag` semantics as completely as npmjs, and there is no verified evidence in this repository of a deprecation having been performed against it. Treat as *needs a live test*, not as known-good |
| 3 | Could an alias safely re-export JS and types? | **JS and types: yes.** A stub package whose `exports` re-export `@studiopod/design` (declared as a dependency) works, and types flow through a `export * from "@studiopod/design"` declaration |
| 4 | CSS and asset subpath compatibility? | **This is where it breaks down.** `./styles.css` maps to a real file. An alias can re-export a *module*, not a *stylesheet* — `@import "@studiopod/design-system/styles.css"` in a consumer must resolve to an actual CSS file on disk, so the alias would have to physically duplicate `styles.css` or ship a one-line `@import` shim. Worse, both consumers also declare `@source '../node_modules/@studiopod/design-system/dist'` for Tailwind v4 content scanning, pointing at a **directory of built JS**. An alias package has no such directory unless it duplicates `dist/` — which is precisely the duplicated implementation the brief rules out |
| 5 | Peer-dependency or resolution problems? | **Yes, a real one.** With both packages installed, `react`, `react-dom`, `next`, `framer-motion` and the rest are satisfied once — but nothing prevents a consumer from importing `Button` from both names in different files. Those are the **same class from the same module instance** only if npm dedupes to a single physical copy; if the alias declares a version range that resolves differently, React context (used by the design system's providers) silently breaks across the boundary, and the symptom is a component that renders but does not receive context |
| 6 | Recommended deprecation duration | `VERSIONING.md` mandates a **minimum of one full release** for deprecated exports. If an alias were shipped, that floor applies: introduce at `0.13.0`, earliest removal `0.14.0`. In practice a rename alias should live until every consumer is migrated and then be removed promptly |
| 7 | Is a clean cutover safer? | **Yes — and it is the recommendation.** |

### Recommendation: clean cutover, plus a version-range deprecation notice

There are exactly **two** consumers, both in this workspace, both fully
inventoried (§ 9). The alias exists to protect consumers you cannot reach; here
there are none. Against that near-zero benefit, an alias would require
duplicating `styles.css` and `dist/` for Tailwind's `@source` to keep working —
the dual-package maintenance the brief prohibits — and would introduce a real
dual-instance React-context hazard.

Recommended instead, at publish time:

1. Publish `@studiopod/design@0.13.0`.
2. Run `npm deprecate '@studiopod/design-system@<=0.12.0' "Renamed to @studiopod/design — see https://github.com/jheavner95/studiopod-design/blob/main/docs/DS-7.3a-Package-Rename.md"`. This costs nothing, ships no code, and puts the message in front of anyone who installs the old name. **Verify it works on GitHub Packages before relying on it** (question 2).
3. Migrate both consumers in DS-7.4.
4. Never publish another `@studiopod/design-system` version.

If HQ wants an alias regardless, it should be its own work package with its own
verification — specifically a test proving a consumer importing from *both*
names receives the same React context instance.

## 9. Consumer migration inventory

Read-only. **Neither consumer was modified.** This is DS-7.4's input.

### Summary

| Repository | Files | Occurrences | Declared version |
| --- | --- | --- | --- |
| `studiopod-app` | **254** | **310** | `^0.12.0` |
| `studiopod-web` | **6** | **29** | `^0.1.1` ⚠️ |

No other local repository consumes the package. `studio-foundation` has zero
references and zero `@studiopod` dependencies, by design.

⚠️ **`studiopod-web` is eleven minor versions behind** (`^0.1.1` against
`0.12.0`). Its cutover is not a find-and-replace: it is a rename *and* a
multi-version upgrade across releases that include documented breaking changes.
Budget for it separately from the app's.

### `studiopod-app` — 310 occurrences

| Classification | Count | Notes |
| --- | --- | --- |
| runtime import | **239** | Bare `from "@studiopod/design-system"` plus multi-line import blocks. The bulk of the work, but purely mechanical |
| documentation | 48 | `docs/vision/*` — mostly dated migration records; classify individually |
| test or fixture | 9 | Includes `lib/testing/ds-stub.tsx`, which **mocks the package by specifier** — the mock path must change with it or every stubbed test silently loads the real package |
| build configuration | 6 | `scripts/check-ds-imports.mjs` — an import-boundary guard with the package name as a **hardcoded constant** (`const PKG = "@studiopod/design-system"`). Must change or the guard silently stops guarding |
| package dependency | 4 | `package.json` (1) + `package-lock.json` (3, incl. the resolved tarball URL) |
| CSS import | 3 | `app/globals.css`: `@import` **and** `@source '../node_modules/@studiopod/design-system/dist'` — the `@source` path is easy to miss and its failure mode is silent (Tailwind stops scanning the package, utilities vanish from the build) |

### `studiopod-web` — 29 occurrences

| Classification | Count | Notes |
| --- | --- | --- |
| documentation | 19 | `MIGRATION-RM6.md` — historical, preserve |
| package dependency | 4 | `package.json` + `package-lock.json` |
| CSS import | 4 | `src/app/globals.css` — same `@import` + `@source` pair |
| runtime import | 2 | `src/app/page.tsx` |

### The three high-risk items

Every one of these fails **silently** rather than loudly:

1. **`@source` directives** — Tailwind stops scanning; utility classes silently
   disappear from the build. Not a resolution error.
2. **`ds-stub.tsx`** — a test mock keyed to the old specifier stops intercepting;
   tests load the real package and may still pass, for the wrong reasons.
3. **`check-ds-imports.mjs`** — the guard's constant no longer matches anything,
   so it reports clean while enforcing nothing.

A DS-7.4 checklist that only greps `import` statements will miss all three.

## 10. Rollback strategy

Nothing has been published, tagged, or released, so **rollback is entirely a
repository-level operation** and no external state exists to reconcile.

### Full rollback

```bash
git revert <ds-7.3a-commit>    # if committed
git checkout -- .              # if not
```

### Manual rollback, field by field

| What | Revert to |
| --- | --- |
| `packages/design-system/package.json#name` | `@studiopod/design-system` |
| `packages/design-system/package.json#version` | `0.12.0` |
| `packages/design-system/package.json#scripts` | drop `identity-check`, restore the `verify` chain |
| Root `package.json` | `description`, `package:inspect` glob, `package:identity-check` |
| `.github/workflows/release.yml` | workflow name, header, artifact name, tag message, release title, the added echo |
| Docs | `README`×2, `API.md`, `VERSIONING.md`, `CHANGELOG.md` (drop 0.13.0), `DISTRIBUTION.md` (drop banner), `TOKENS.md`, `TONE.md` |
| New files | delete `scripts/check-package-identity.mjs`, `docs/DS-7.3a-Package-Rename.md` |

### Generated files and lockfiles

- **`dist/`** — no revert needed. It is byte-identical either way; rebuild if in
  doubt.
- **`package-lock.json`** — untouched by this change. The package does not
  depend on itself and has no workspace entry, so its own rename produces no
  lockfile edit. *Verified: zero occurrences of either name in the lockfile.*
- **`*.tgz`** — gitignored build artifacts. Stale
  `studiopod-design-system-*.tgz` files may remain on disk; delete them.

### Does publication change anything?

Yes, irreversibly, which is why it has not happened. **npm and GitHub Packages
do not allow a published name+version to be reused after unpublish.** Once
`@studiopod/design@0.13.0` is published, that coordinate is permanently spent; a
rollback would have to move forward to `0.13.1` under the old name rather than
undo. Rollback is free **only** before the first publish.

### Consumers before DS-7.4

Unaffected in every case. They depend on published versions of
`@studiopod/design-system` that continue to exist in the registry and are not
deprecated, unpublished, or modified. A rollback of this repository is invisible
to them.

### If `@studiopod/design` cannot be published

The plausible failure is an auth/ownership problem, not a naming one — the same
cross-owner PAT constraint that already governs the old name (§ 7). Recovery:

1. Do **not** revert the rename. The failure will be `E401`/`E403` from the
   registry, not a rejection of the name.
2. Confirm `secrets.DS_NPM_TOKEN` is a classic PAT with `write:packages` owned
   by a `@studiopod` org member, and that it has not expired — the exact cause
   of the historical `v0.2.0` `E401`.
3. Confirm `vars.DS_REGISTRY` is `https://npm.pkg.github.com`.
4. Re-run the release workflow with `dry_run: true` and read the identity echo.
5. If the scope itself is unavailable, the decision is an ownership one (move
   the repository into the org, or change the scope) and is unchanged by this
   rename — it would block the old name equally.

## 11. Deferred: the Foundation dependency

`@studiopod/foundation` is **not** a dependency of this package, and no token
was removed or redirected. The design system still owns and ships its own tokens
exactly as it did at 0.12.0 — which is what makes the byte-identical `dist/` in
§ 4 possible.

The architecture documentation now states the *target* graph, but the edge
`@studiopod/design → @studiopod/foundation` does not exist yet. Introducing it
changes what `styles.css` contains and is a behavioural change requiring its own
verification (token-by-token parity against `@studiopod/foundation`'s generated
CSS). Bundling it here would have destroyed the one property that makes this
rename reviewable: that nothing inside the package moved.

## 12. Validation results

See the DS-7.3a report. All repository validation passes, plus the new
`identity-check`.

## 13. What was deliberately not done

- The `packages/design-system/` **directory** was not renamed (§ 2)
- The `design-system-v` **tag prefix** was not changed (§ 14)
- **No `.npmrc`** was added (§ 7)
- **No alias package** was created (§ 8)
- **No consumer** was modified (§ 9)
- **Nothing was published, tagged, or released**
- Historical records were **preserved**, not rewritten (§ 2)

## 14. For HQ

1. **Tag prefix.** Kept as `design-system-v` — 17 such tags exist, and the prefix
   names this repository's release series rather than the npm package. Switching
   to `design-v` is a one-line change in `release.yml` if preferred; it would
   split tag history across two prefixes.
2. **Sibling `.npmrc` contradiction.** Unresolvable from here (out of scope), and
   it should be fixed in DS-7.4 while those manifests are open. See § 7.
3. **`DISTRIBUTION.md` line 188** carries a stale DS-4-era claim that publishing
   under this scope "should be expected to fail", contradicted by `0.1.1` having
   published. Preserved as a dated record; consider a superseding note.
4. **`studiopod-web` is on `^0.1.1`**, eleven minors behind. DS-7.4 is a rename
   *plus* a multi-version upgrade for that repository.
5. **Deprecation of the old name on GitHub Packages is unverified.** The
   recommended `npm deprecate` step needs a live test before being relied on.
6. **Publishing is irreversible.** `0.13.0` is prepared but unpublished; rollback
   is free only until it is.
