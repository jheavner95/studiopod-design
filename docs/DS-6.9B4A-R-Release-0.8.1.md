# DS-6.9B4A-R — Release 0.8.1

**Verdict: CERTIFIED**

`@studiopod/design-system@0.8.1` is published to GitHub Packages and
independently verified from the registry. The release contains only the
certified DS-6.9B4A change.

---

## Versions

| | |
|---|---|
| Previous published | **0.8.0** |
| New published | **0.8.1** (patch) |
| `dist-tags.latest` | **0.8.1** |

## Preflight

| Check | Result |
|---|---|
| DS-6.9B4A commit present | ✅ `16cb78f` + report `8c68442` |
| Working tree clean | ✅ |
| Registry | `https://npm.pkg.github.com` |
| Scope / auth | `@studiopod`, publish PAT `DS_NPM_TOKEN` (workflow secret) |
| `gh` auth | ✅ `jheavner95` |

**Release contents audit — only DS-6.9B4A.** Diff from the 0.8.0 release commit
(`ab23bb4`) to `8c68442`:

```
docs/DS-6.9B4A-Modifier-Aware-Table-Selection.md    | 142 ++++++
docs/engineering-notes/22-modifier-aware-…​.md       |  58 +++
src/components/table/TableSelectionCell.test.tsx    |  55 +-
src/components/table/TableSelectionCell.tsx         |  19 +-
4 files changed, 269 insertions(+), 5 deletions(-)
```

Two documents and one component with its test. **No unrelated unreleased
changes** — nothing to stop for.

Version-bearing files were **not** hand-edited: the established workflow owns
`npm version`, the commit and the tag, so bumping manually would have collided
with it.

## Pre-publish gates

`npm run verify` — all 6 steps passed (37.7s):

| Gate | Result |
|---|---|
| TypeScript — app | ✅ 908ms |
| TypeScript — tests | ✅ 1.3s |
| ESLint | ✅ 8.2s |
| Unit & component tests | ✅ **703 passing** |
| Next.js build | ✅ 9.9s |
| Package verify (build + api-check + css-check + use-client + exports) | ✅ 6.9s |

`api-check`: 609 index exports match baseline. `css-check`: 8 canonical markers
present and ordered. `use-client`: all 3 entries. `exports-check`: 9 targets.

## Publish

| | |
|---|---|
| Workflow | **Release @studiopod/design-system** (`workflow_dispatch`) |
| Inputs | `release_type=patch`, `dry_run=false` |
| Run | [29697133195](https://github.com/jheavner95/studiopod-design/actions/runs/29697133195) |
| Steps | Gate → checkout → setup-node → install → git identity → **Create version** → **Commit + tag** → **Publish** → release notes — all ✅ |
| Registry | `https://npm.pkg.github.com` |
| Package | `@studiopod/design-system@0.8.1` |
| Integrity | `sha512-iK/CrFmk5KFPhR0LWb7qyojTh2we75+cJvGRScst8DwEEIRwlEapCg8H2eHi2MbSbF3/nG1ovpJ5OZQPVFocxA==` |
| Shasum | `f447ef968693a989d9cb16efe82b4606d6c05a4b` |

## Post-publish verification — from the registry, not the local build

Installed `@studiopod/design-system@0.8.1` into a clean temporary directory
with a fresh `.npmrc` (scope mapping + read token) and inspected the downloaded
artifact:

| Check | Result |
|---|---|
| Installed version | **0.8.1** |
| Widened declaration | `onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void` at `dist/index.d.ts:2542`, inside `TableSelectionCellProps` |
| Public JSDoc | present in the shipped `.d.ts` |
| Widened runtime | `onChange(event.target.checked, event)` in `dist/index.js` |
| `"use client"` | ✅ `dist/index.js` begins with it |
| Styles entry | ✅ `dist/styles.css`, 7,898 bytes |
| Exports map | `.`, `./tokens`, `./marketing`, `./illustrations`, `./styles.css` |

**Scope check on the widening.** Two other `onChange: (checked: boolean) => void`
declarations remain in the artifact, at lines 587 and 3323. I confirmed which
interfaces own them rather than assuming: `ToggleSwitchProps` and
`PropertyToggleProps` — unrelated components, correctly untouched. Only
`TableSelectionCell` was widened.

Two non-defects worth recording so they are not mistaken for problems later:

1. The first install attempt 404'd because the temp `.npmrc` carried the auth
   line but no `@studiopod:registry` scope mapping (`npm view` had worked only
   because `--registry` was passed explicitly). Adding the scope line resolved
   it — a harness gap, not a package one.
2. `require("@studiopod/design-system/package.json")` throws
   `ERR_PACKAGE_PATH_NOT_EXPORTED`. That is correct packaging hygiene —
   `package.json` is deliberately not in `exports`. Version was read from the
   file directly instead.

## Git

| | |
|---|---|
| Release commit | `79d618e` — `release(design-system): v0.8.1` |
| Tag | `design-system-v0.8.1` (points at HEAD) |
| Files changed by the release | `packages/design-system/package.json` (version only) |
| Push | via the workflow; local `main` fast-forwarded to match |
| Working tree | **clean** |

## Final audit

| Requirement | Result |
|---|---|
| Patch version published | ✅ 0.8.1 |
| All DS gates pass | ✅ 6/6 |
| Published artifact independently verified | ✅ clean-dir install from registry |
| Widened declarations present | ✅ |
| Widened runtime present | ✅ |
| No unrelated changes included | ✅ 4 files, all DS-6.9B4A |
| Commit and tag complete | ✅ `79d618e`, `design-system-v0.8.1` |
| Working tree clean | ✅ |

**CERTIFIED.**

`studiopod-app` was **not** touched — its dependency is still `^0.8.0`, which
resolves to 0.8.1 on the next install but has not been bumped or reinstalled in
this package. `SvgImportPanel` migration was not resumed.

Stopping after DS-6.9B4A-R.
