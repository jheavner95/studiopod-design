# DS-6.9B4B-R — Release 0.8.3

**Verdict: CERTIFIED WITH DEFERRED ITEMS**

The hover-aware `TableRow` contract is published and verified — but as **0.8.3**,
not 0.8.2. **0.8.2 is a hollow release that must be skipped**, and that is my
error, described in full below.

---

## What went wrong

I dispatched the release workflow **without pushing my commits**. The workflow
checks out `origin/main`, which at that moment was still `d5ee3b8` — 0.8.1 code.
So the run succeeded, tagged, and published **0.8.2 containing none of the
`TableRow` change**: a version bump over 0.8.1 content.

The clean-directory install caught it. Every declaration probe missed, and the
published `TableRowProps` was the old five-prop interface with the old
`declare function TableRow({ children, className, selected, interactive, onClick })`.

**Why the local checks did not catch it:** every pre-publish gate — `npm run
verify`, the tarball inspection, the `dist/index.d.ts` grep — ran against my
**local** working tree, which did contain the change. Local build and published
artifact diverged precisely because the workflow builds from the remote. This
is exactly the failure mode the package's "do not rely solely on the local build
output" instruction exists to catch, and it is why that step is worth its cost.

**Why it did not happen in DS-6.9B4A-R:** those commits were already pushed
before the release was dispatched, so the workflow happened to see them. The
process was never sound; it worked by luck.

**Preflight gap in my own execution:** I checked `git status --porcelain` (clean
tree) but not `git status -sb` (ahead/behind). A clean tree says nothing about
whether commits have reached the remote the workflow builds from.

## Remediation

1. Rebased my two commits onto the 0.8.2 release commit and **pushed** —
   `dc0102a..e7b3389`.
2. Re-ran `npm run verify` on the rebased tree — all 6 gates pass.
3. Dispatched a fresh patch release → **0.8.3**.
4. Verified 0.8.3 from a clean registry install.

**0.8.2 was not unpublished.** GitHub Packages does not support it for this
setup, and attempting removal is destructive with no upside — 0.8.3 supersedes
it as `latest`.

## Versions

| | |
|---|---|
| Previous published | 0.8.1 |
| **0.8.2** | **hollow — 0.8.1 content, version bump only. Do not use.** |
| **New published** | **0.8.3** |
| `dist-tags.latest` | **0.8.3** |

## Publish record — 0.8.3

| | |
|---|---|
| Workflow run | [29700848400](https://github.com/jheavner95/studiopod-design/actions/runs/29700848400) — success |
| Inputs | `release_type=patch`, `dry_run=false` |
| Registry | `https://npm.pkg.github.com` |
| Integrity | `sha512-Z5U2Lj3z30Rh8craQqmj0R4aW3ogwm50ZnbiWsrRbrSTXnt37lugoyyJlNu+PJJFECIy6KV4OlxLy3GEx3hxfQ==` |
| Shasum | `ac6dd20579cafb400bb6ea5414dbd79827ae479d` |
| Source commits | `e689d07` (contract) · `e7b3389` (report) |
| Tag | `design-system-v0.8.3` |

(For the record, the hollow release: run 29700662215, integrity
`sha512-+IMocEn9k4nDsFb1syb9nx1epcKepFnj7hhVMSZm2OXqsEXglsh8RYMboUqFf5ejn+jrUlc+o3xHkQ1j2/JJPA==`.)

## Pre-publish gates — rebased tree

`npm run verify`, all 6 passing: TypeScript (app + tests), ESLint, 709 unit
tests, Next build, package verify (`api-check` 609 exports unchanged,
`css-check`, `use-client-check`, `exports-check`).

Tarball inspection: 20 files, 885 KB unpacked — `dist` (15), `package.json`,
`README.md`, `API.md`, `VERSIONING.md`, `CHANGELOG.md`. Repo `docs/` is not in
the `files` field and never enters the artifact, which is why the 0.8.1 release
report sitting in the same commit range was not a contamination concern.

## Post-publish verification — from the registry

Installed 0.8.3 into a clean temp directory with a fresh `.npmrc`:

| Check | Result |
|---|---|
| Version | **0.8.3** |
| `id?: string` | ✅ in `TableRowProps` |
| `onMouseEnter?: MouseEventHandler<HTMLTableRowElement>` | ✅ |
| `onMouseLeave?: MouseEventHandler<HTMLTableRowElement>` | ✅ |
| Shipped signature | `TableRow({ children, className, id, selected, interactive, onClick, onMouseEnter, onMouseLeave })` |
| Runtime forwarding | ✅ all three destructured and passed to the `tr` |
| JSDoc | ✅ shipped in the `.d.ts` |
| `"use client"` | ✅ |
| `styles.css` | ✅ 7,898 bytes |
| Exports map | `.`, `./tokens`, `./marketing`, `./illustrations`, `./styles.css` |

## Process change I would apply going forward

Add to release preflight, before dispatch:

```
git status -sb        # must show no "ahead" count
git log origin/main..HEAD   # must be empty
```

A clean working tree is not the same as a pushed branch, and the workflow builds
from the remote. Worth writing into the release runbook rather than leaving as
a lesson.

## Final audit

| Requirement | Result |
|---|---|
| Patch release published | ✅ **0.8.3** (0.8.2 hollow, superseded) |
| Artifact independently verified | ✅ clean-dir registry install |
| Runtime forwarding verified | ✅ |
| Declarations verified | ✅ all three props |
| All gates pass | ✅ 6/6 on the rebased tree |
| Commit and tag complete | ✅ `e689d07`/`e7b3389`, `design-system-v0.8.3` |
| Working tree clean | ✅ |

**CERTIFIED WITH DEFERRED ITEMS** — deferred item is the orphaned **0.8.2**,
which remains published, contains no `TableRow` change, and should be treated as
skipped. Consumers must move to **^0.8.3**.

`studiopod-app` not updated; `SvgImportPanel` not resumed.
