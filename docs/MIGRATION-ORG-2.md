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

**`@jheavner95/design@0.19.1` is an identity-only republish of
`@studiopod/design@0.19.0`.** No source, API, or emitted-file change — the
version differs by one patch number for a reason that has nothing to do with
the code.

The reasoning behind holding a version across an identity rename is the same
one Foundation used and this package's own ORG-2A precedent: a new package
identity starts its own version line, so a consumer switching names should be
able to keep its specifier and get identical bytes. That worked cleanly for
Foundation, whose first-ever release under either scheme was this migration.
It does not work unmodified for Design, which already has 19 versions of
history and a tag namespace it shares with them.

**This repository's release tags name a release *series*, not a package
identity** — `design-system-v<version>`, unrelated to what the package is
currently called (see `tooling/release/lib/resolve-target.mjs`, `TAG_PREFIX`,
deliberately unchanged by this migration). `design-system-v0.19.0` already
exists: it is the real, historical tag for the original
`@studiopod/design@0.19.0` release, created by commit `b49376e` before this
migration began. Publishing the new identity under `0.19.0` would require
creating that same tag a second time — the release workflow's own tag
existence safeguard caught exactly this and refused, correctly, when it was
tried.

`0.19.1` is the smallest change that resolves the conflict: it keeps
`design-system-v0.19.0` untouched as the legacy release's own historical
artifact, and gives the republish a tag of its own,
`design-system-v0.19.1`, without inventing a new tag scheme or skipping tag
creation for this release. HQ decision, recorded here rather than made
silently — see the completion report for ORG-2B's version-conflict
resolution.

**Verified, not assumed, at the new version.** Of the 1,088 files in the
published tarball, 1,077 are byte-identical between
`@studiopod/design@0.19.0` and `@jheavner95/design@0.19.1`. The remaining
files — `API.md`, `README.md`, `VERSIONING.md`, `package.json`, and the
`.d.ts` files — differ *only* in the identity string and the version number,
inside a doc comment, a markdown example, or `package.json` metadata. Every
shipped `.js` file and every shipped `.css` file — the entire runtime
surface, 538 modules — is byte-identical.

## Coexistence

| Package | Status |
| --- | --- |
| `@jheavner95/foundation` | Current (ORG-2A). |
| `@jheavner95/design` | **Current release line: 0.19.1** (ORG-2B). All future releases land here. |
| `@jheavner95/design@0.14.0` | **Historical backfill only (ORG-2C3A).** Not the current version — see [Historical backfills](#historical-backfills-org-2c3a) below. `0.19.1` remains current. |
| `@studiopod/foundation` | LEGACY — temporarily retained for migration. |
| `@studiopod/design` | LEGACY — temporarily retained for migration. |

`@studiopod/design` 0.13.0–0.19.0 remain published and installable.
**Do not unpublish, deprecate or delete them until every consumer has
migrated.** Web still resolves `@studiopod/design@0.14.0` today (ORG-2C3);
other consumers may resolve other versions.

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

## Historical backfills (ORG-2C3A)

**Not every consumer is on the current version, and this migration does not
force them to be.** ORG-2C3 found `studiopod-web` pinned to
`@studiopod/design@0.14.0` — five versions behind `0.19.1` — with no
`@jheavner95/design@0.14.0` to move it to, because ORG-2B only republished the
*current* version under the new identity. Republishing Web's dependency at
`0.19.1` would have been a five-version product upgrade forced by a packaging
detail nobody decided to make, so HQ's resolution was: **backfill the missing
historical version instead of upgrading the consumer.**

`@jheavner95/design@0.14.0` is that backfill. It is **not** a new release and
**not** a rollback of `main`, which stays at `0.19.1` throughout. It is the
same bytes GitHub Packages has served every `@studiopod/design@0.14.0`
installer since that version's original release — the same artifact
Web's own lockfile already resolves — republished under the current package
name, with exactly one field of the tarball changed:
`package.json#name`. Every `.js`, `.css`, `.d.ts`, and prose file inside is
byte-identical to the original publish; the identity-string mentions that
remain in `README.md`, `API.md`, `CHANGELOG.md`, `VERSIONING.md`, and one
`.d.ts` doc comment are deliberately left as they were published — this is a
frozen historical artifact, not a living release, so nothing about it is
"corrected" the way a current-release migration would.

**Why not rebuild `0.14.0` from source instead?** The historical commit
(`design-system-v0.14.0`) resolved `@studiopod/foundation@0.3.0` at build
time. Only `@jheavner95/foundation@0.4.0` was ever republished under the new
scope — `0.3.0` was not — so rebuilding would silently bake in a different
Foundation's token values under a version number that is supposed to be
byte-for-byte historical. Taking the artifact the registry already built
(back when Foundation 0.3.0 still existed under the old scope) sidesteps that
entirely: nothing is rebuilt, so no Foundation version needs to resolve at
all.

**Why no `design-system-v0.14.0` tag and no new GitHub Release.** That tag
already names the *original* `0.14.0` release of this repository. Creating it
again, or creating a second GitHub Release for the same version number, would
misrepresent a republish as a new release that never happened. This is
package-identity migration, not a repository release — the same distinction
ORG-2B drew between a version bump and an identity-only republish, taken one
step further: here, not even a new tag is warranted.

**Why a dedicated mechanism instead of a `release.yml` mode.**
`release.yml`'s entire shape — version resolution, tagging, GitHub Releases —
exists to guarantee properties of a *current release*: that a publish failure
leaves no orphan tag, that the tag names a real release. Bending that
workflow to also skip tagging for "this one is different" would weaken those
guarantees for every real release that goes through it. Historical backfills
get their own workflow instead —
[`backfill-historical.yml`](../.github/workflows/backfill-historical.yml),
driving
[`tooling/release/backfill-historical-version.mjs`](../tooling/release/backfill-historical-version.mjs)
— `workflow_dispatch` only, parameterized by version, so it can backfill
another historical version later without becoming a mode of the release
pipeline.

**Credentials.** Reading `@studiopod/design` needs `DS_NPM_TOKEN` — that
scope was never linked to this repository, so `GITHUB_TOKEN` cannot reach it,
the same measured constraint documented above for Foundation before ORG-2A.
Publishing `@jheavner95/design@0.14.0` uses `GITHUB_TOKEN`, exactly as
`release.yml` does for the current line — that scope is linked here. The two
credentials are kept in separate, single-purpose `.npmrc` files within the
script, so the read step and the write step can never share or cross a
credential. This is the one place in the repository `DS_NPM_TOKEN` remains
load-bearing, and it is scoped to reads of the legacy name only — see the
table above.

**What this does not do.** It does not touch `studiopod-web` — migrating Web
to consume this backfill is ORG-2C3B, a separate package. It does not change
`main`'s package version. It does not alter `@jheavner95/design@0.19.1` or
its tag/release history in any way.

## Authentication — measured, not assumed

**Publishing `@jheavner95/design` from `jheavner95/studiopod-design` uses the
workflow's own `GITHUB_TOKEN`**, with `packages: write` on the `publish` job
only. This works because the package is now linked to this repository — the
same pattern Foundation proved in ORG-2A. No PAT is used for publishing, for
the identity check against the registry ("confirm target unused"), or for
verifying the published artifact from a clean consumer — all four touch
`@jheavner95/design`, this repository's own package.

**Reading `@jheavner95/foundation` from this repository is a genuinely
different question, and the first attempt at it failed.** That package is
linked to a *different* repository (`jheavner95/studiopod-foundation`). With
`GITHUB_TOKEN` and `packages: read` declared, `validate.yml`'s automatic run
against this migration (run `32216274798`) failed at `npm ci`:

```text
npm error code E403
403 Forbidden - GET https://npm.pkg.github.com/download/@jheavner95/foundation/...
Permission permission_denied: read_package
```

That is a different error from the unlinked-package E403 (`The requested
installation does not exist`) that Foundation and Design themselves produced
before their own renames. `read_package` means the package **was found and is
linked somewhere** — just not to a repository this workflow's token was
authorized for at the time. A repository's own `GITHUB_TOKEN` does not
automatically reach a package linked to a *sibling* repository under the same
account, even when the scope matches the owner on both sides — an explicit
grant is required.

**That grant has now been made**, on the Foundation package's own settings:

> Foundation package page → **Package settings → Manage Actions access →
> `studiopod-design` → Read**

With the grant in place, `GITHUB_TOKEN` was retried and this time succeeded —
see the completion report for the run that proved it. Every step in both
workflows, in every job, now uses `GITHUB_TOKEN` and only `GITHUB_TOKEN`. No
PAT — neither the retired `DS_NPM_TOKEN` nor the temporary
`FOUNDATION_NPM_TOKEN_READ` bridge used during the brief period before the
grant existed — remains anywhere in this repository's release or validation
path.

## What each repository can drop, and when

Only after it has migrated:

| Repository | Secret | Becomes |
| --- | --- | --- |
| studiopod-foundation | `FOUNDATION_NPM_TOKEN` | obsolete (ORG-2A) |
| studiopod-design | `DS_NPM_TOKEN` | Obsolete for the current release line — `release.yml` and `validate.yml` use only `GITHUB_TOKEN`. **Reintroduced narrowly by ORG-2C3A** (see below) for the one thing GITHUB_TOKEN genuinely cannot do: read the unlinked `@studiopod/design` scope, to backfill a historical version. Not used to publish anywhere. |
| studiopod-cloud | `DS_NPM_TOKEN_READ` / `_WRITE` | obsolete after step 3 |
| PowerEditor | `FOUNDATION_NPM_TOKEN_READ` | obsolete after step 3 |

Deleting a repository secret is a GitHub-side action, performed only after the
workflow that used it has been proven green without it.
