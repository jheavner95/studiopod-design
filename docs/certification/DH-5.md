# DH-5 — Design API Surface

- **Work package:** DH-5
- **Date:** 2026-08-07
- **Verdict:** **CERTIFIED WITH OBSERVATIONS.** The API is now declared,
  tiered and enforced. Three observations in § 7.
- **Released:** `@studiopod/design@0.16.0`, published 2026-08-07T17:37:51Z to
  `https://npm.pkg.github.com` and consumed by Cloud from the registry.
- **Package under test:** shasum `3b29d4d1…`, integrity
  `sha512-nw/w1wJt6qFYWoE7…` — **identical to the locally validated artefact.**

---

## 1. Implementation summary

DH-4 gave Design its first consumer and, with it, the first evidence about the
API boundary. DH-5 acted on it.

| | Before | After |
| --- | --- | --- |
| Components exporting their props type (root) | 54 / 372 (15%) | **310 / 372 (83%)** |
| …on `/marketing` | 11 / 11 | 11 / 11 (100%) |
| …on `/illustrations` | 45 / 56 | 45 / 56 (80%) |
| Root exports arriving via `export *` | 268 (43%) | **0** |
| Exports declaring a stability tier | 0 of 1,175 | **1,175 (100%)** |
| Root entry total | 620 | 876 (+256, all props types) |
| API check enforces | surface | **surface + stability** |

Everything is additive. **No export was removed or renamed**, and Cloud — the
only consumer — typechecks with zero errors, builds unchanged, and passes all 21
browser tests against the new surface.

---

## 2. API redesign

### Public entries — unchanged set

| Entry | Exports | Construction |
| --- | --- | --- |
| `.` | 876 | Explicit. Every name written down. |
| `./tokens` | 5 | `export *`, **deliberately** — see below |
| `./marketing` | 44 | Explicit |
| `./illustrations` | 250 | `export *` from 17 domain subpaths — see § 6 D |

### Internal entry

`./internal` (77 exports) is unchanged and remains outside the contract: no
manifest, no tier, no promise, no application may import it
([ADR 0011](../decisions/0011-internal-entry-point.md)). Cloud enforces that
from the consumer side.

### Stability model

Every export declares a tier in `api-baseline/<entry>.json` — a map of name to
tier that **ships in the package**, so a consumer can read what each name
promises without leaving `node_modules`.

| Tier | Promise | Earned by |
| --- | --- | --- |
| `stable` | Full deprecation procedure; breaking it is a breaking change | pinned by tests · documented · exports props type |
| `preview` | May change in any release, including a patch | the default; every new export starts here |
| `deprecated` | Works, scheduled for removal with a migration path | declared when removal is planned |

| Entry | stable | preview |
| --- | --- | --- |
| `.` | 211 | 665 |
| `./tokens` | 5 | 0 |
| `./marketing` | 0 | 44 |
| `./illustrations` | 2 | 248 |

**`/marketing` and `/illustrations` are entirely Preview because they have zero
test files** — 0 across eleven brand compositions, 0 across four diagram
engines. Nothing pins their behaviour. That is not a harsh grade; it is the
first time the package has said out loud which half of it is held in place.

**Every `/tokens` export is Stable without a test**, because `token:bridge-check`
fails the build if one character drifts from Foundation — a stronger guarantee
than a unit test, and the one documented exception to the criteria.

### Export strategy

Public entries name their exports. `export *` published whatever a directory
happened to contain; the API grew because the file system did.

The one exception is `./tokens`, and it is principled: that module is generated
from Foundation and never hand-edited, so naming its exports would create a
second, manual, silently-drifting source of truth for a surface whose whole
point is being derived. **A broad export is justified when the module it
aggregates is itself generated and checked.**
[ADR 0016](../decisions/0016-intentional-exports.md).

---

## 3. Props export audit

| | Before | After |
| --- | --- | --- |
| Root components exporting `XProps` | **54 / 372 (15%)** | **310 / 372 (83%)** |
| `/marketing` | 11 / 11 | 11 / 11 |
| `/illustrations` | 45 / 56 | 45 / 56 |

The fix was almost entirely mechanical, which is itself the finding: **253
components already declared `interface XProps` and simply never exported it.**
One keyword away, in every case. A further 34 were re-export aliases whose props
type needed aliasing alongside the component.

### Remaining 62, as intentional exceptions

| Reason | Count | Examples |
| --- | --- | --- |
| Props are inline-annotated, with no named type to export | 13 | `Display`, `Metadata`, `DialogHeader`, `StatusIndicator` |
| Alias of an alias — the props type exists two hops up under a third name | 48 | `InspectorGroup`, `PropertyLabel`, `InspectorPropertyEditor` |
| Genuinely propless | 1 | `RequiredIndicator` |

Extracting a named type from an inline annotation changes a component's
signature, and resolving two-hop alias chains means deciding which of three
names is canonical. Both are component work, which the brief assigns elsewhere.
**Recorded rather than forced.**

---

## 4. Verification

`npm run verify` — **14 of 14 pass**.

```
✔ Foundation token bridge      ✔ Package API contract    876/5/44/250, tiers enforced
✔ Package build                ✔ Package CSS contract
✔ Boundary                     ✔ Package framework independence
✔ TypeScript — library & docs  ✔ Package client boundaries
✔ TypeScript — tests           ✔ Package entry points
✔ ESLint  (0 errors)           ✔ Package identity
✔ Unit & component tests       ✔ Documentation build     76 routes
   1013 passed / 1013
```

| Required | Evidence |
| --- | --- |
| ✓ Existing consumers continue working | Cloud: **0 typecheck errors**, no source change. Every one of its ten components now also has a props type; six are Stable. |
| ✓ Cloud builds unchanged | `npm run build:studio` succeeds; **21/21 browser tests pass** against the DH-5 build |
| ✓ Public API verification passes | 876 / 5 / 44 / 250 match the manifest. Proven falsifiable: an injected `export const dh5SmokeExport` failed the build with a message naming the decision. |
| ✓ Stability verification passes | Every export declares a tier; the vocabulary is closed; `--write` cannot hand out `stable` |
| ✓ Internal exports remain inaccessible | `./internal` unchanged, outside the manifest, no tier, no promise. Cloud's `check:boundaries` rejects importing it. |
| ✓ Documentation builds | 76 static routes, 0 errors |
| ✓ Browser verification succeeds | Cloud driven in a browser against the DH-5 build: sign-in, founder session, admin console, navigation — no application errors |

**Compatibility was verified against the real consumer, from the registry.**
After publication Cloud's `node_modules`, lockfile and npm cache were deleted
entirely, `@studiopod/design@0.16.0` was declared and installed fresh, and the
whole chain re-run: `npm ci`, 7 checks, 298 unit tests, 21 browser tests, build,
and a browser pass. The lockfile's integrity hash matches the published one.
See § 6.5.

---

## 5. Unexpected discoveries

### A. The props defect was 253 missing keywords

Not a design problem. 253 components declared their props interface and did not
export it — a default that was never a decision, repeated for years. The 15%
coverage that DH-4 reported as an API design failure was mostly an accident of
`interface` versus `export interface`.

Worth stating because it changes what the finding means: the library was not
designed to hide its props types. Nobody had ever looked.

### B. `export *` was masking a name collision

`ComboboxOption` was exported by both `@/components/ui` and `@/components/form`.
Under star-export semantics an explicit export shadows a star, so `form`'s won
and `ui`'s silently vanished. The surface was stable, the manifest was happy,
and **a collision in the public API had been resolving itself by a language rule
nobody chose.**

It only surfaced when the stars became explicit and TypeScript reported a
duplicate identifier. DH-5 preserved the existing resolution exactly.

### C. ADR 0005's Stable criteria could not survive first contact

"At least one real consumer" would have admitted **ten of 1,175 exports** to
Stable, marking `Card`, `Stack` and `Panel` as Preview alongside untested
diagram helpers. The criterion was written when Design had zero consumers and
was right in spirit; tying it to consumer count is what fails.

Amended to "pinned by tests" in [ADR 0015](../decisions/0015-stability-tiers.md),
with the reasoning that tests are what make an API expensive to change by
accident, and scale with the library rather than with adoption.

### D. `/marketing` and `/illustrations` have no tests at all

Zero test files across eleven brand compositions and four diagram engines — 294
exports whose behaviour nothing pins. The tier assignment made it visible
because it had to; no one had asked the question in that form before.

This is not a DH-5 regression and DH-5 did not fix it. It is now stated in the
package's own shipped manifest.

### E. Changing the manifest format broke a consumer inside this repository

The documentation site reads `api-baseline/*.json` for its certification panels
and expected a flat array. The format change to a name → tier map broke two
tests immediately.

A small, useful reminder that the manifest is itself a consumed artefact. Its
reader now accepts both shapes, so a docs site pinned to an older package does
not break on the format change.

---

## 6. Remaining conformance gaps

**Closed by DH-5:** gap 5 (stability tiers), gap 13 (accidental exports),
consumer findings D2 and D4-adjacent naming visibility.

| # | Gap | Severity |
| --- | --- | --- |
| 8 | Library source is not organised into tiers; no tier boundary check | Medium |
| 6 | `lib/` and `hooks/` remain in the package, plus four `*/utils/` | Medium |
| 9 | `Empty`, `Workflow`, `Platform`, `Timeline` ship from `/marketing` | Medium |
| 10–12 | Documentation IA; no Accessibility or Migration section | Medium |
| 16 | No bundle-composition check — tree-shaking still unverified | Medium |
| N2 | `motionDuration`/`motionEase` collide across `/tokens` and `/internal` | Medium |
| N3 | Nothing in Design prevents an application importing `/internal` | Medium |
| **D4** | **28 tone/status/variant vocabularies; `destructive` vs `error`** | **Medium** |
| **N5** | **No check re-derives the Stable criteria** — a promotion is trusted | Medium |
| **N6** | **No check forbids `export *` on a public entry** — three lines | Low |
| **N7** | **The explicit lists are transcribed, not curated** — whether all 876 root exports deserve to be public is the component audit | Medium |
| 18 | No Preview-graduation check | Low |
| 19 | No Foundation-staleness check | Low |
| D3, D5 | `./package.json` not exported; `Alert` takes no `role` | Low |

**D4 was deliberately not attempted.** Converging 28 tone vocabularies means
renaming public exports — the first genuinely breaking change this package would
ship — and DH-5's mandate was to preserve consumer compatibility. It now has
what it needs to be done well: a tier on every export, so the blast radius of a
rename is measurable rather than guessed.

---

## 6.5 Release assessment

The release was validated, published through the repository's documented
workflow, and consumed by Cloud from the registry with a cold cache.

### Release record

| | |
| --- | --- |
| Version | `0.16.0` |
| Registry | `https://npm.pkg.github.com` |
| Tarball | `…/download/@studiopod/design/0.16.0/3b29d4d18d8f9e9d0203558a02f081d1cb26e8b2` |
| shasum | `3b29d4d18d8f9e9d0203558a02f081d1cb26e8b2` |
| Integrity | `sha512-nw/w1wJt6qFYWoE7GrUNLSjcJ8Ku5v/uiDQR0h5zPizAuNnWAAxvv+uyJSyese4U607BGhGsCK6lEWLA+O40ng==` |
| Published | 2026-08-07T17:37:51Z |
| Workflow run | [31202859461](https://github.com/jheavner95/studiopod-design/actions/runs/31202859461) |
| Peers | `react`, `react-dom` |
| `dist-tag latest` | `0.16.0` |

### 1. Did DH-5 materially improve the consumer experience?

**Yes, measurably.** Of the ten components Cloud uses:

| | Before | After |
| --- | --- | --- |
| Export a props type | 2 (`Button`, `Card`) | **10** |
| Declare a stability tier | 0 | **10** (6 Stable) |

Cloud can now type a wrapper around every component it consumes. Before DH-5 it
could do so for two of ten — which is exactly the defect DH-4 recorded as D2,
and exactly what made ADR 0013's recommended wrapper pattern unusable for most
of the library. The stability manifest ships inside `node_modules`, so the
answer travels with the code.

### 2. Did publishing expose any release process weaknesses?

**No new ones, and one previously-found weakness is confirmed fixed.**

The `0.15.0` release failed on its first attempt because the workflow carried
its own copy of the inverted `"use client"` assertion (DH-4 § 6). `0.16.0`
published **clean on the first attempt**, which is the evidence that the fix was
correct rather than merely quieting.

One standing constraint, unchanged and not a defect: the local npm token carries
`read:packages` only, so publishing must go through CI. That is the documented
process anyway, and it is the right place for a write credential to live.

### 3. Did any verification gate fail unexpectedly?

**No.** `verify:full` passed 15/15 before release; CI's own `Verify (fast)` and
`Verify package` jobs passed before the publish job ran; Cloud's full chain
passed against the registry package.

One gate failed *during implementation*, and it was informative rather than
unexpected: changing the manifest format from an array to a map broke the
documentation site's certification tests, because that site reads
`api-baseline/*.json`. Recorded as § 5 E. The manifest is a consumed artefact,
and its reader now accepts both shapes.

### 4. Did the registry package behave identically to the validated package?

**Byte-identically.** The tarball packed and validated locally has shasum
`3b29d4d18d8f9e9d0203558a02f081d1cb26e8b2`; the registry serves that same
shasum, and Cloud's lockfile records the matching `sha512` integrity hash. There
is no version of this package that was tested but not shipped.

### 5. Did Cloud require any undocumented integration knowledge?

**No.** The upgrade was two lines — the declared version in two manifests — plus
a regenerated lockfile. **Zero source changes.** No new setup step, no new
configuration, no workaround.

The one piece of setup knowledge Cloud needed at all was the `.npmrc` scope
routing, and that was learned and documented in DH-4; nothing new was required
here.

---

## 7. Certification recommendation

# CERTIFIED WITH OBSERVATIONS

The public API is now declared, tiered, enforced and shipped. Every export
exists because it is in a manifest somebody wrote; every export says what it
promises; and 83% of components can be wrapped and typed. The change is additive
and was verified against the real consumer rather than asserted.

### Observations

**1. The lists are intentional in structure, not yet in content.** DH-5
converted 371 aggregated exports into explicit declarations by **generating**
them from the existing surface. That makes every future addition a decision, and
it makes today's surface reviewable — but it does not mean today's surface has
been reviewed. Whether all 876 root exports deserve to be public is the
component audit, which the brief assigns elsewhere. A reader should not take
"explicit" to mean "curated" (gap N7).

**2. Stable is asserted, not re-derived.** The 218 Stable entries were assigned
by a script applying three criteria, and the manifest is now the source of
truth. Nothing checks that a `stable` entry still has tests, documentation and a
props type — so a promotion, or a test deleted from a Stable component, passes
silently. The check is buildable from the same rules the assignment used
(gap N5), and until it exists the tier depends on review.

**3. The tier assignment will read as harsh, and it is accurate.** 665 of 876
root exports are Preview, and two entire entry points are 100% Preview. That is
the honest consequence of "pinned by tests" meeting a library where the brand
compositions and diagram engines have none. The temptation at the next release
will be to re-grade rather than to write tests. It should be resisted: the
number is the finding.

### Confirmed at release

- **API governance is intentional** — every export is in a manifest somebody
  wrote; `export *` no longer grows the surface
- **Stability metadata ships with the package** — 4 manifests, 1,175 tiers,
  readable from `node_modules`
- **Public exports are explicitly owned** — 0 aggregated exports on the root
  entry, one justified exception on `./tokens`
- **Component props are broadly available** — 310 of 372 root components; 10 of
  10 that Cloud uses
- **Cloud remains compatible** — 0 typecheck errors, 0 source changes, 21/21
  browser tests
- **Registry consumption succeeds** — cold-cache `npm install` then `npm ci`,
  registry-resolved, integrity matching the validated artefact

### Conditions

None.

---

## API Governance Established

DH-5 completes the infrastructure phase of StudioPOD Design 2.0. Five things are
now **governed** — decided deliberately, documented, and enforced by a check
that fails the build rather than by anyone remembering:

| | Governed by | Enforced by |
| --- | --- | --- |
| **Repository architecture** | DH-1 · the constitution and ten ADRs | review, `check:docs`, `check:adrs` |
| **Package boundaries** | DH-2 · ADR 0003, the library owns its source | `boundary-check` — four assertions, each proven falsifiable |
| **Framework independence** | DH-3 · ADR 0007, 0013, 0014 | `check-framework-imports`, `check-client-boundaries` |
| **Consumer integration** | DH-4 · Cloud ADR 0034, proven by registry consumption | Cloud's `check:dependencies`, `check:boundaries` |
| **Public API evolution** | DH-5 · ADR 0015, 0016 | `check-api` — surface *and* stability, falsifiable |

Each of those was, at the start of this programme, a convention held in place by
attention. None of them is any more.

The chain that DH-4 proved end-to-end — Foundation → Design → Cloud, through
published packages rather than shared implementation — now has a governed API at
its centre. A consumer can install the package, read what each of 1,175 exports
promises without leaving `node_modules`, wrap any of 310 components with a
typed props interface, and know that nothing joined that surface without someone
deciding it should.

**What this means for what comes next.** The remaining work in this repository is
no longer infrastructural. The open gaps are about the components themselves —
whether all 876 root exports deserve to be public, whether 28 tone vocabularies
should be four, whether the brand compositions and diagram engines should have
tests. Those are questions about the quality of a component platform, not about
the machinery that publishes it.

**Future work should focus on improving the component platform itself rather
than continuing to build repository infrastructure.** The infrastructure is
done. It should be maintained, extended where a gap is named, and otherwise left
alone.

---

## 8. Recommended next package

**DH-6 — Component Audit.** DH-5 built the instrument; this is what it was built
for. Every export is now named in a list and carries a tier, which turns
"should this be public?" from an unanswerable question about 876 anonymous names
into 876 reviewable line items — and turns the vocabulary convergence (D4) from
a guess into a measurable rename with a known blast radius.

The natural companion, and cheap: build the two checks recorded as N5 and N6, so
that Stable means what it says and `export *` cannot return.
