# DH-2 — Foundation Integration & Repository Separation

- **Work package:** DH-2
- **Date:** 2026-08-07
- **Verdict:** **CERTIFIED WITH OBSERVATIONS.** Wave 1 is complete and verified.
  Three observations are recorded in § 10; three defects the separation exposed
  are named in § 7 and left intentionally open.
- **Final certification pass:** 2026-08-07 — seven checks, § 9.

---

## 1. Implementation summary

DH-2 separated the published library from the documentation product.

Before, they were one source tree. `packages/design-system/tsconfig.json` set
`baseUrl: "../.."` and resolved `@/*` into the documentation site's `src/`, so
the published package compiled the documentation site, and two esbuild resolver
plugins existed to cut documentation chrome back out of the bundle afterwards.

After, they are two workspace members with a real boundary:

```
packages/design/    @studiopod/design   the published library — 637 source files
apps/docs/          @studiopod/docs     the documentation product — 703 files
tooling/                                18 files: checks, generators, the runner
docs/                                   repository documentation
```

The documentation application imports `@studiopod/design` **636 times across
five entry points** and reaches into library source zero times. The package
resolves nothing outside `packages/design`.

**1,411 files were relocated.** Git detected 1,326 of them as renames; the
remaining 85 it recorded as delete-plus-add because their entire content is one
import line that the rewrite changed. Beyond the relocations: 40 genuinely new
files (38 of them DH-1 and DH-2 documentation), 2 genuinely deleted, 15 modified
in place.

Both esbuild plugins are deleted. Nothing replaced them at the build layer;
what replaced them is the structure, plus one check that fails on the general
case rather than on an enumerated list.

**The public API surface is unchanged.** The API baseline check passes with
616 / 5 / 44 / 249 exports across `.`, `/tokens`, `/marketing`,
`/illustrations` — byte-identical to before the migration. No consumer sees any
difference from DH-2 except the additions in § 5.

### Scope discipline

DH-2 addressed gaps **1, 2, 4, 7, 14** and nothing else. Specifically **not**
done, and deliberately: framework neutrality (gap 3/17), stability tiers (gap
5), banned directory names (gap 6), the library's tier layout (gap 8), entry
scope corrections (gap 9), documentation IA (gaps 10–12), the root-entry audit
(gap 13). Two gaps were closed as unavoidable side effects of the split and are
noted as such in § 4.

---

## 2. Architectural changes

| Change                                                                 | Governing decision |
| ---------------------------------------------------------------------- | ------------------ |
| The library owns its source tree; `baseUrl` is the package             | [ADR 0003](../decisions/0003-library-owns-its-source.md) |
| The documentation site is a workspace member that consumes the package | [ADR 0003](../decisions/0003-library-owns-its-source.md) |
| Both esbuild resolver plugins deleted; replaced by structure + a check | [ADR 0003](../decisions/0003-library-owns-its-source.md) |
| A declared, non-public `internal` entry point                          | [ADR 0011](../decisions/0011-internal-entry-point.md) — **new, amends ADR 0005** |
| `apps/` and `tooling/` as the top-level layout                         | [ADR 0012](../decisions/0012-workspace-layout.md) — **new, amends DH-1's repository-structure.md** |

### The boundary, concretely

Four things now hold that did not:

1. **`packages/design/tsconfig.json` has `baseUrl: "."`.** The package cannot
   resolve the documentation site, so it cannot ship it. This one line is the
   boundary; everything else is a check that it stays.
2. **`apps/docs/tsconfig.json` has no path mapping into `packages/design`.**
   The documentation site resolves `@studiopod/design` through the workspace
   link to `dist/`, exactly as Cloud and Web will.
3. **`tooling/boundary-check.mjs`** asserts all of it mechanically.
4. **`apps/docs/src/app/globals.css` imports `@studiopod/design/styles.css` and
   declares the `@source` line** every consumer must write — so a break in the
   documented consumer setup is a build failure here first.

### Two ADRs DH-2 had to write

Both are amendments to DH-1, both because implementation proved an assumption
too strong, and both are argued in full in their own files rather than decided
in passing.

**[ADR 0011](../decisions/0011-internal-entry-point.md)** — ADR 0005 § 3 said
"if it is reachable from an entry point, it is public." That left no legal move
for thirty-seven symbols the documentation site needs: the motion engine and the
illustration dev overlay, which RM-5.5 deliberately un-exported, and which
twenty-one library modules depend on so they cannot move to the docs app either.
The alternatives were widening the public API permanently for one consumer,
keeping a source alias (the defect being removed), or duplicating a motion
engine. A declared internal entry point was the least bad, and the rule is now
"reachable from a *public* entry point."

**[ADR 0012](../decisions/0012-workspace-layout.md)** — DH-1 specified
`documentation/` and argued against `apps/docs`. The argument was sound but
`documentation/` and `docs/` differ by three characters, and every path in every
script, workflow, tsconfig and test then has to discriminate between two
directories that are both, in plain English, documentation. The distinction DH-1
cared about is kept; the names changed.

---

## 3. Files moved

The boundary was derived mechanically rather than by judgement: a script
computed the transitive module closure of the four public entry points, which
gave an exact 531-file library set and left everything else on the documentation
side. Counts below are git's, recovered from the staged tree.

| From                                                          | To                                    | Files |
| -------------------------------------------------------------- | -------------------------------------- | ----- |
| `src/app/`                                                     | `apps/docs/src/app/`                  | 537   |
| `src/components/{12 families}/`                                | `packages/design/src/components/`     | 466   |
| `src/components/platform/`                                     | `apps/docs/src/components/platform/`  | 104   |
| `src/{motion,illustrations,compositions,hooks,providers,styles}/` | `packages/design/src/`             | 84    |
| `src/{workflows,platforms,production,capabilities}/{components,types,utils}/` | `packages/design/src/`  | 74    |
| `e2e/`                                                         | `apps/docs/e2e/`                      | 32    |
| `src/*/examples/`                                              | `apps/docs/src/*/examples/`           | 31    |
| `packages/design-system/`                                      | `packages/design/`                    | 23    |
| `scripts/`                                                     | `tooling/`                            | 13    |
| `src/components/docs/`                                         | `apps/docs/src/components/docs/`      | 12    |
| root configs (`next`, `postcss`, `playwright`, `public/`, `vercel`) | `apps/docs/`                     | 10    |
| `src/lib/{canonical,certification*,design-system-navigation,docs-contracts,showcase-registry}.ts` | `apps/docs/src/lib/` | 8 |
| `src/lib/{utils,tone,spacing,control-size,tokens}.ts` + tests   | `packages/design/src/lib/`            | 7     |
| `test/`                                                        | `packages/design/test/`               | 4     |
| `src/lib/token-verification.ts`, `release-*.test.ts`           | `tooling/`                            | 4     |
| `src/components/layout/{GlobalNav,Footer}.tsx`                 | `apps/docs/src/components/layout/`    | 2     |
|                                                                | **total**                             | **1,411** |

Two of those rows are worth reading twice. `src/components/platform/` — 104
files — was **not exported from any entry point** and never had been; they are
documentation-site demo compositions of Cloud's domain that lived inside the
library's resolution path. And `src/lib/` split roughly in half: the styling and
token helpers were library code, the rest was documentation-site tooling and
repository tooling that had been sitting where the package could reach it.

---

## 4. Files deleted

| Deleted                                              | Why                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------- |
| `packages/design-system/src/_internal/layout-safe.ts` | Build-time shim replacing the layout barrel. Obsolete — `GlobalNav`/`Footer` moved out, so the real barrel is safe. |
| `packages/design-system/src/_internal/workflows-safe.ts` | Build-time shim replacing the workflows barrel. Obsolete — the examples moved out. |
| The two esbuild resolver plugins in `tsup.config.ts` | Nothing left to redirect.                                             |
| The hand-written exclusion comment block in `index.ts` | Documented a bypass that no longer exists.                            |
| Root `tsconfig.test.json`                            | Replaced by per-workspace test configs.                               |

Only the first two rows are files deleted outright — the plugins and the comment
block were removals *within* files, and the root `tsconfig.test.json` was
replaced by two per-workspace configs that between them cover strictly more (§ 9,
check 5).

Both shims were deleted **after** the structure made them unnecessary, not
before, and the package was rebuilt and re-verified at that point. Deleting them
first would have shipped documentation code.

Two gaps closed as side effects rather than as goals: **gap 7** (documentation
tooling inside the library source tree) was unavoidable — the split had to put
each file somewhere — and part of **gap 6** (banned directory names) went with
it, because most of what was in `src/lib/` turned out not to be library code at
all. The `lib/` and `hooks/` directories that remain in the package are still
open.

---

## 5. Build changes

**Package** (`packages/design`)

- `tsconfig.json`: `baseUrl` `"../.."` → `"."`; tests excluded from the build config
- `tsup.config.ts`: both `esbuildPlugins` removed; `internal` added to `entry` and `dts.entry`
- `package.json`: `repository.directory` and `homepage` repointed; `./internal` added to `exports`; `bridge-check` repointed at `tooling/generators/`
- `scripts/inject-use-client.mjs` and `scripts/check-use-client.mjs`: `internal.js` added to the client-entry list — it exports context providers and framer-motion primitives, so it needs the directive
- `src/styles.css`: `@import "../../../src/styles/*"` → `@import "./styles/*"`

**Documentation application** (`apps/docs`) — new workspace member

- `package.json` declaring `@studiopod/design` as a dependency
- `tsconfig.json` with `@/*` → `./src/*` and **no mapping into the package**
- `globals.css` now imports the package stylesheet and declares the `@source` line
- Next, PostCSS and Playwright configs moved here

**Workspace root**

- `workspaces: ["packages/*", "apps/*"]`; runtime dependencies moved to the workspaces; dev dependencies stay at the root
- `vitest.config.ts`: one project → three named projects (`design`, `docs`, `tooling`), because `@` means a different directory in each
- `tooling/verify.mjs`: package build moved to position two and boundary check to position three, because everything downstream needs `dist/`; the package's five contract checks and the documentation build are now named steps rather than one opaque `package:verify`
- `eslint.config.mjs`: `settings.next.rootDir` set to `apps/docs`; ignore globs unanchored
- `.gitignore`: `/.next/`, `/dist`, `/coverage` were root-anchored and stopped matching once the app moved — unanchored. **This was a real bug**: a `git add -A` before the fix would have committed 2,210 build artefacts.
- `.github/workflows/release.yml`: `packages/design-system` → `packages/design`, `scripts/release/` → `tooling/release/`

**New:** `tooling/boundary-check.mjs`, `packages/design/src/internal.ts`,
`apps/docs/src/lib/cn.ts`.

---

## 6. Verification evidence

`npm run verify:full` — **14 of 14 steps pass**, 40.7s on a clean checkout.

```
✔ Foundation token bridge      111ms
✔ Package build                3.8s
✔ Boundary                     149ms
✔ TypeScript — library & documentation 3.0s
✔ TypeScript — tests           2.6s
✔ ESLint                       9.4s     0 errors, 5 pre-existing warnings
✔ Unit & component tests       12.2s    1013 passed / 1013, 100 files
✔ Package API contract         210ms
✔ Package CSS contract         195ms
✔ Package "use client" directives 200ms
✔ Package entry points         205ms
✔ Package identity             570ms
✔ Documentation build          7.8s     76 routes
✔ Package pack                 275ms
```

Against the six required outcomes:

| Required                                    | Evidence                                                                                   |
| ------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ✓ Documentation builds                      | 76 static routes, 0 errors. 18 sampled routes return HTTP 200.                             |
| ✓ Package builds                            | 6 chunks + 5 entries + stylesheet, no plugins, no warnings                                 |
| ✓ Package contains no documentation code    | Tarball is 25 entries: `dist/` + 4 markdown + `package.json`. `grep -iE "docs\|app/\|examples\|GlobalNav\|Footer\|platform/"` → no matches. `boundary-check` scans the bundle for 7 documentation identifiers, comments stripped, and finds none. |
| ✓ Documentation consumes the public package | 636 imports across 5 entry points; **zero** `@/` specifiers in `apps/docs` resolve outside `apps/docs`; zero relative paths reach into `packages/`; `boundary-check` fails on either. |
| ✓ Removed plugins no longer required        | Package builds and the full chain passes with `tsup.config.ts` carrying no `esbuildPlugins` |
| ✓ Existing examples still work              | 1013/1013 tests pass. Verified in a browser: home, `/core-components`, `/motion`, `/application-components/property-panel` all render with correct styling, zero console errors. |

**Public API preserved:** `package:api-check` reports 616 / 5 / 44 / 249 exports
matching baseline across the four public entries. DH-2 changed the public
surface by zero symbols.

**Browser verification** (constitution Article VI § 5): the site renders
correctly against the built package — meaning the `@source` line resolves and
Tailwind generates the library's classes. The failure mode here is silent: a
broken `@source` renders every component unstyled with no error, so this was
checked visually rather than by status code. The motion page's control dock —
served from `/internal` — renders and its token vocabulary is the engine's
(`instant/fast/normal/slow/hero`, `standard/enter/exit/flow`), confirming the
collision fix in § 7.

---

## 7. Unexpected discoveries

The split turned the documentation site into a genuine consumer, and on its
first build against `dist/` it immediately found three defects that had been
invisible for as long as the shared tree existed. This is the benefit DH-1
predicted, arriving faster than expected.

### A. `cn` cannot be called from a server component — **open**

`dist/index.js` begins with `"use client"`. It has to: the root entry re-exports
hooks, context providers and framer-motion primitives. But that makes **every**
root export a client reference, including pure functions. A server component
calling the published `cn()` fails at prerender:

> Attempted to call cn() from the server but cn is on the client.

This is not a documentation-site quirk. **Any consumer with a server component
hits it**, and Cloud and Web are both Next.js App Router applications. It was
undiscoverable before because the site imported `cn` from source, where there is
no directive.

DH-2 did not fix it — the fix is to stop marking the whole root entry as client,
which is a build restructuring outside this package's scope. The documentation
application has its own `cn` (`apps/docs/src/lib/cn.ts`), with the reasoning at
its head. Recorded as an open gap.

### B. Two different objects named `motionDuration` and `motionEase` — **fixed**

`packages/design/src/lib/tokens.ts` (the Foundation projection, on `/tokens`)
and `packages/design/src/motion/tokens.ts` (the motion engine, on `/internal`)
both export `motionDuration` and `motionEase` with **different shapes**. The
projection is Foundation's duration scale; the engine's carries
`enter`/`exit`/`flow` easings that do not exist in the other.

Caught by TypeScript when the motion documentation page was routed to the wrong
one. Two other pages import these names and were correctly routed. Fixed, with
a comment at the import naming the hazard.

This is a live trap for consumers too: a name collision across two published
entry points, where taking the wrong import compiles in some uses and not
others.

### C. Components documented under names the package does not export — **fixed**

Three components were documented under their **source** names rather than their
published names, because the site imported from family barrels rather than entry
points:

| Documented as    | Actually published as        |
| ---------------- | ----------------------------- |
| `PropertyEditor` | `InspectorPropertyEditor`     |
| `FilterBar`      | `OperationalFilterBar`        |
| `PropertySection`/`PropertyGroup` | not published from the operational family at all — the root entry's are metadata's |

A reader copying the import from those pages got code that does not compile.
Fixed by aliasing to the published names, with a comment on each. The
documentation for `PropertyPanel` had already described the aliasing in prose —
the code just did not match the prose.

### D. `test/fixtures.ts` has had no importers since DS-1C — **relocated**

Library test infrastructure that re-exported the documentation site's example
vocabulary. Zero importers, and the split made it uncompilable where it stood.
Moved to `apps/docs/test/` where its dependency lives, rather than deleted —
deleting is a judgement outside DH-2's scope. Probably should be deleted.

### E. `.gitignore` was root-anchored — **fixed**

`/.next/`, `/dist`, `/coverage` stopped matching once the app moved to
`apps/docs`. A `git add -A` staged 2,210 build artefacts before this was caught.
Patterns unanchored.

---

## 8. Remaining conformance gaps

Fourteen of DH-1's nineteen remain, plus three new ones from § 7. Numbering
follows [DH-1](DH-1.md) § 7 for continuity.

**Closed by DH-2:** 1, 2, 4, 7, 14 (Wave 1 as scoped), plus most of 6 as a side
effect.

| #   | Gap                                                                        | Severity |
| --- | -------------------------------------------------------------------------- | -------- |
| 3   | `next` is a required peer dependency                                       | High     |
| 17  | No framework-import check exists                                           | High     |
| 5   | No export carries a declared stability tier                                | High     |
| 13  | Root entry built largely by `export *` rather than by decision             | Medium   |
| 8   | Library source is not organised into tiers; no tier boundary check         | Medium   |
| 6   | `lib/` and `hooks/` remain in the package, plus four `*/utils/`            | Medium   |
| 9   | `Empty`, `Workflow`, `Platform`, `Timeline` ship from `/marketing`         | Medium   |
| 10  | Documentation IA: `docs/` + `documentation/` route groups, 46-route `application-components` | Medium |
| 11  | Route groups named for Cloud's domain concepts                             | Medium   |
| 12  | No Accessibility or Migration section in the documentation product         | Medium   |
| 16  | No bundle-composition check                                                | Medium   |
| 18  | No Preview-graduation check                                                | Low      |
| 19  | No Foundation-staleness check                                              | Low      |
| 15  | `src/_internal/` readable as a privacy mechanism — **deleted**, but the naming hazard now attaches to the `internal` entry point | Low |
| **N1** | **`cn` and every other pure root export is unusable from a server component** | **High** |
| **N2** | **`motionDuration`/`motionEase` collide across `/tokens` and `/internal`**  | Medium   |
| **N3** | **Nothing prevents Cloud or Web importing `/internal`** ([ADR 0011](../decisions/0011-internal-entry-point.md) § Enforcement) | Medium |

**N1 is the one to take first.** It is High severity, it affects real consumers
rather than this repository, and it is the kind of defect that turns into "the
design system does not work in our app" if it is met before it is fixed. It
also interacts with gap 3: both are reasons Cloud cannot comfortably adopt the
package today.

### Suggested sequencing for DH-3

**3 + 17 + N1** as one arc — all three are about what the package makes
consumers carry, and N1's fix (splitting client and non-client exports) touches
the same build configuration as removing the `next` peer. Then **5 + 13 + 8 +
6** as the API and structure audit. Then **10–12** for the documentation
product. **N2, 9, 16, 18, 19, N3** are cleanup, and N3 is small enough to do at
any time.

---

## 9. Final certification pass

Run 2026-08-07 against the staged tree, after DH-2 was accepted in principle.
Seven checks; all pass. Corrections made as a result are listed at the end.

### 1. No generated artifacts in the staged tree

Following the `.gitignore` incident (§ 7 E). 1,553 staged paths; **zero** match
build-output patterns. `git check-ignore` confirms `apps/docs/.next`,
`packages/design/dist`, `node_modules` and `apps/docs/next-env.d.ts` are all
ignored. Zero untracked files remain.

Checked in the other direction too, because unanchoring a pattern can swallow
real files: **no source file under `packages/design/src`, `apps/docs/src`,
`tooling/` or `docs/` is ignored**, and no directory named `build`, `dist`,
`out` or `coverage` exists inside any source tree.

### 2. Evidence matches the repository

Every figure in this report re-measured. Confirmed: 637 library / 703
documentation / 18 tooling files · 636 package imports across 5 entry points ·
API baseline 616 / 5 / 44 / 249 · 1013 of 1013 tests in 100 files · 0 ESLint
errors, 5 pre-existing warnings · 76 static routes · 6 chunks + 5 entry modules
+ 1 stylesheet · `verify:full` 14 of 14.

**Three figures were wrong and are corrected**: the § 3 move table (counted from
the working tree, which includes files DH-2 created and Playwright snapshot
PNGs — now counted from git's own rename records, totalling 1,411 relocations),
the tarball entry count (24 → 25), and CLAUDE.md's `next` import count (seven
files → six files, seven imports).

### 3. ADR 0011 and ADR 0012 are consistent with DH-1

Both carry correct metadata, both name the DH-1 assumption they amend in a
blockquote at the head, both are in the log, and both are referenced from the
document they amend.

**One inconsistency found and fixed.** ADR 0005 did not point forward to ADR
0011. A reader landing on ADR 0005 § Internal would have read a rule that DH-2
narrowed, with no signal that it had been. ADR 0005 now carries an
`Amended by:` metadata line and an inline note at the amended clause. The ADR
process requires the link forward for superseded records
([decisions/README.md](../decisions/README.md) § 3); the same reasoning applies
to an amendment, and the omission was a real defect in the record.

### 4. Verdict recorded

§ 10.

### 5. No verification gate was weakened

Gate-for-gate against `HEAD`:

| Pre-DH-2                                    | Now                                          |
| -------------------------------------------- | --------------------------------------------- |
| Foundation token bridge                     | unchanged, still first                       |
| TypeScript — app                            | **widened** — library *and* documentation    |
| TypeScript — tests                          | unchanged in coverage (see below)            |
| ESLint                                      | unchanged; no rule disabled or downgraded    |
| Unit & component tests                      | unchanged, 1013 passing                      |
| Next.js build                               | Documentation build                          |
| `package:verify` (8 bundled sub-gates)      | **unbundled** into 6 named steps, all present |
| Package pack                                | unchanged                                    |
| —                                           | **+ Package build** (new, promoted to step 2) |
| —                                           | **+ Boundary** (new)                          |

Two gates added, none removed, none loosened. The package's own `verify` script
— which `prepublishOnly` runs, so it is the actual publish gate — is
**byte-identical** to `HEAD`. `strict: true` is unchanged; the only compiler
option that moved is `baseUrl`, tightened from `"../.."` to `"."`.

The one change that could have hidden something was adding `exclude` for test
files to the package's build tsconfig. Verified it did not: **100 of 100 test
files are typechecked** — 95 by `packages/design/tsconfig.test.json`, 2 by
`apps/docs/tsconfig.test.json`, 3 by the root config — the same 100 that existed
at `HEAD`.

ESLint's ignore globs were broadened from `.next/**` to `**/.next/**` and from
`next-env.d.ts` to `**/next-env.d.ts`. Both cover generated Next.js output and
had to follow the application to `apps/docs/`; no hand-written file falls into
either.

### 6. New gates are active — and falsifiable

A check that cannot fail is decoration. Each boundary assertion was tested by
injecting the corresponding fault and confirming a precise failure:

| Fault injected                                                        | Result                                            |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| Package `baseUrl` reverted to `"../.."` (the pre-DH-2 value)          | ✖ 2 violations — "package tsconfig scope"          |
| Documentation file importing `../../../../packages/design/src/...`    | ✖ 1 violation — "documentation reaches into library source" |
| Documentation file importing `@studiopod/design/dist/index.js`        | ✖ 1 violation — "documentation deep-imports the package" |
| Library file importing `../../../../apps/docs/src/...`                | ✖ 1 violation — "library escapes package"          |

All faults reverted; the working tree is byte-identical afterwards. The fourth
assertion — documentation identifiers in the bundle — proved itself during
implementation, when it correctly flagged four matches that turned out to be
JSDoc prose and was tightened to strip comments before matching.

Both new gates run in `verify:fast`, therefore in `verify` and `verify:full`,
therefore in CI, which runs the same runner.

### 7. Implementation is within DH-2 scope

In scope, all closed and verified:

| Gap | Evidence                                                              |
| --- | ---------------------------------------------------------------------- |
| 1   | `baseUrl` is `"."`                                                    |
| 2   | zero `esbuildPlugins` in `tsup.config.ts`                             |
| 4   | zero alias or relative escapes from `apps/docs`                       |
| 7   | zero documentation-site modules under `packages/design`               |
| 14  | directory `packages/design` matches package `@studiopod/design`       |

Out of scope, and confirmed **untouched**: `next` is still a peer dependency and
six library files still import `next/*` (gap 3); no export carries a stability
tier (gap 5); `lib/` and `hooks/` are still in the package (gap 6); and
`dist/index.js` still begins with `"use client"` — **N1 is unfixed, as
instructed**.

---

## 10. Verdict

# CERTIFIED WITH OBSERVATIONS

DH-2 delivers its stated scope completely and verifiably. The five Wave 1 gaps
are closed; the boundary is structural rather than conventional; the two build
plugins are gone and a falsifiable check stands where they did; the public API
is provably unchanged; and 1013 tests, 76 routes, a browser pass and 14 of 14
verification gates confirm nothing regressed. No gate was weakened and no
out-of-scope work was performed.

### Observations

**1. ADR 0011 introduces a deliberate non-public entry point that should be
reconsidered during DH-3 once component architecture is understood.**

`@studiopod/design/internal` was the least-bad answer to a constraint DH-1 had
not anticipated, chosen against four alternatives. It is a door in the package
wall — labelled, but real, and nothing yet prevents an application importing it
(gap N3). The tier reorganisation in DH-3 will change what "internal" means
structurally, and several of the thirty-seven symbols may turn out to belong in
`behavior/` or `motion/` as legitimate public exports. Revisit it then, on
better information, rather than treating it as settled.

**2. N1 (`"use client"` / `cn`) is a genuine package defect discovered by DH-2.
It remains intentionally unresolved because it is outside the scope of
repository separation and belongs to a later implementation package.**

The root entry's `"use client"` directive makes every root export a client
reference, including pure functions. Any consumer with a server component hits
it, and both Cloud and Web are App Router applications. The documentation
application works around it with its own `cn`, labelled as a workaround in three
places. The fix — splitting client from non-client exports — is build
restructuring, and doing it here would have meant changing what the package
emits during a work package whose entire premise was that the public surface
does not change.

**3. Tree-shaking remains an explicitly unverified architectural assumption.
DH-2 makes verification possible but does not claim it.**

The argument for one package with subpath entries instead of three
([ADR 0004](../decisions/0004-one-published-package.md)) rests on consumers not
paying for code they do not import. DH-2 removed the structural obstacle — the
package now compiles only its own source, so its bundle composition is a
property of the library rather than of a shared tree — but **nothing measures
it**. The bundle-composition check does not exist (gap 16) and the tier rule it
depends on does not exist (gap 8). `packages.md` § 3 has been amended to say so
rather than to assert isolation it cannot demonstrate.

### Conditions

None. The observations are for DH-3's attention, not blockers on this package.
