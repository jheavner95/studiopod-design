# ORG-2 — package namespace migration

Design is published as **`@jheavner95/design`**. It used to be
`@studiopod/design`, which is still published and still installable. Its
Foundation dependency is now **`@jheavner95/foundation`**, which used to be
`@studiopod/foundation`.

This document explains why, what changed, and the order the rest of the
ecosystem still has to follow. It mirrors the equivalent document in
`studiopod-foundation`; read that one for the full mechanism. This one covers
what is specific to Design.

## Why `@studiopod/design` became legacy

**There is no `studiopod` GitHub organization.** `github.com/studiopod`
returns 404, and this account belongs to no organizations at all
(`gh api /user/orgs` → `[]`). Every active repository is owned by the personal
account `jheavner95`, and `@studiopod/design` was published by `jheavner95` —
`npm view @studiopod/design _npmUser` says so.

GitHub Packages links a package to a repository only when the npm scope
matches the owner login. `@studiopod` does not match `jheavner95`, so every
version published under that scope — 0.13.0 through 0.19.0 — is **unlinked**.
Registry metadata shows it directly: `npm view @studiopod/design repository`
returns `{"type":"git"}` with the `url` stripped, though the tarball's own
`package.json` still carries it.

An unlinked package gives a repository-scoped `GITHUB_TOKEN` no installation
to resolve against, which is why this repository has carried a personal access
token (`DS_NPM_TOKEN`) for both publishing and for every install — GitHub
Packages requires a credential for reads too, and an unlinked package accepts
none but a user-owned one.

Matching the scope to the owner removes that. The repository is **not**
renamed; it stays `jheavner95/studiopod-design`.

## Foundation dependency

Design's dependency on Foundation is a **build-time input only** — see
[`decisions/0008-foundation-is-a-build-time-input.md`](decisions/0008-foundation-is-a-build-time-input.md).
It is a `devDependency` at the repository root, read once by
`tooling/generators/generate-tokens-from-foundation.mjs` to emit this
repository's own token stylesheets and `src/lib/tokens.ts`. It is **not** a
runtime dependency of the published package — `@jheavner95/design`'s own
`package.json#dependencies` never lists Foundation, and nothing in the
published tarball requires it to resolve.

That dependency now points at `@jheavner95/foundation@0.4.0`, Foundation's
current identity (established in ORG-2A, in `studiopod-foundation`). The
generated token files were regenerated; the values they emit are byte-for-byte
unchanged — only the `GENERATED FROM` comment header updated, and that comment
never reaches a consumer. esbuild strips CSS comments when bundling
`src/styles.css` into `dist/styles.css`, and TypeScript doc comments do not
affect emitted `.js`.

## Version

`@jheavner95/design@0.19.0` is the same package as
`@studiopod/design@0.19.0`. The version was **not** bumped, for the same
reason Foundation's wasn't: a new package identity starts its own version
line, so the number was free, and holding it means a consumer switching names
keeps its specifier and gets identical bytes.

**Verified, not assumed.** Of the 1,088 files in the published tarball, 1,077
are byte-identical between the two identities. The remaining 11 — `API.md`,
`README.md`, `VERSIONING.md`, `package.json`, and 7 `.d.ts` files — differ
*only* in the identity string inside a doc comment, a markdown example, or
`package.json#name`. Every shipped `.js` file and every shipped `.css` file —
the entire runtime surface, 538 modules — is byte-identical.

## Coexistence

| Package | Status |
| --- | --- |
| `@jheavner95/foundation` | Current (ORG-2A). |
| `@jheavner95/design` | **Current (ORG-2B).** All future releases. |
| `@studiopod/foundation` | LEGACY — temporarily retained for migration. |
| `@studiopod/design` | **LEGACY — TEMPORARILY RETAINED FOR MIGRATION.** |

`@studiopod/design` 0.13.0–0.19.0 remain published and installable.
**Do not unpublish, deprecate or delete them until every consumer has
migrated.** Cloud and other consumers still resolve that name today.

`.npmrc` routes both `@jheavner95` and `@studiopod` for the duration.

## Migration order

1. **Foundation** — done (ORG-2A).
2. **Design** — this package (ORG-2B): its own identity, and its Foundation
   dependency.
3. **Consumers** — Cloud, PowerEditor, Web move to `@jheavner95/design` (and,
   where relevant, `@jheavner95/foundation`), and drop the PATs they only ever
   needed because of the scope mismatch.
4. **Legacy cleanup** — only once nothing resolves the old names: retire
   `@studiopod/*`, remove the legacy scope routes, delete the obsolete
   repository secrets.

Nothing in step 4 may begin while any consumer still depends on the old names.

## Authentication

Publishing `@jheavner95/design` from `jheavner95/studiopod-design` can use the
workflow's own `GITHUB_TOKEN` with `packages: write` — the same pattern
Foundation proved in ORG-2A, since the package is now linked to this
repository.

**Reading `@jheavner95/foundation` from this repository is a different
question**, because that package is linked to a *different* repository
(`jheavner95/studiopod-foundation`). Whether a plain `GITHUB_TOKEN` with
`packages: read` reaches a package linked elsewhere — even under the same
account — depends on GitHub's package-level Actions access model, and that is
not something to assume. See the release workflow's own comments and
`docs/engineering/publishing.md` for what was actually measured here, and
whether a package-level "Manage Actions access" grant was required.

## What each repository can drop, and when

Only after it has migrated:

| Repository | Secret | Becomes |
| --- | --- | --- |
| studiopod-foundation | `FOUNDATION_NPM_TOKEN` | obsolete (ORG-2A) |
| studiopod-design | `DS_NPM_TOKEN` | obsolete once publishing and reads both prove `GITHUB_TOKEN`-sufficient |
| studiopod-cloud | `DS_NPM_TOKEN_READ` / `_WRITE` | obsolete after step 3 |
| PowerEditor | `FOUNDATION_NPM_TOKEN_READ` | obsolete after step 3 |

Deleting a repository secret is a GitHub-side action, performed only after the
workflow that used it has been proven green without it.
