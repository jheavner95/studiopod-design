# DH-5.5 — Typography Foundation

**Certification: CERTIFIED**

Geist and Geist Mono are now the implemented typography foundation of the
StudioPOD ecosystem, verified in two running browsers rather than inferred from
token files. Foundation owns the typefaces, Design loads them, and no
application declares a font family.

|                                      | Before                            | After               |
| ------------------------------------ | --------------------------------- | ------------------- |
| Cloud's rendered typeface            | **Times** (browser default serif) | Geist               |
| Font faces loaded in Cloud           | 0                                 | 2                   |
| Distinct font stacks in Cloud        | 1 (invalid)                       | Geist + Geist Mono  |
| Packages shipping a font file        | 0                                 | Foundation → Design |
| `@font-face` rules in the ecosystem  | 0 (outside the docs site)         | 2, in `styles.css`  |
| Applications declaring `font-family` | 2 (Cloud, docs)                   | 0                   |

---

## 1. Root cause

**Generated and consumed, but never loaded — and the reference that was
supposed to degrade gracefully instead invalidated the entire font stack.**

The chain was broken in three places at once, which is why it had survived five
work packages.

### 1a. Nothing loaded a font

No package in the ecosystem shipped a webfont or a single `@font-face` rule.
Foundation's `src/assets/` held one placeholder SVG; Design's `dist/` held none.
The only Geist in any repository was in `apps/docs/.next/` — build output.

### 1b. The variable had no provider

Foundation's stacks read `var(--font-geist-sans), …`, and
`metadata.externallyProvidedVariables` declared the variable as someone else's
job. Exactly one thing ever did that job: the original Next.js application, via
`next/font`. DH-3 removed Next.js from the package, and the only implementation
of the contract left with it.

The documentation site kept its own. `apps/docs/src/app/layout.tsx` imported
`Geist, Geist_Mono` from `next/font/google` and set both variables on `<html>`,
so the docs site rendered perfectly while every real consumer did not.

### 1c. The fallback stack did not exist

This is the finding that explains the severity, and it contradicted the
repository's own documentation. Foundation stated:

> A consumer that does not provide them still gets a working stack — the CSS
> falls through to the system fonts after the undefined reference.

CSS does not behave that way. A `var()` whose variable is undefined and which
carries **no fallback** makes the entire declaration _invalid at computed-value
time_; the remaining comma-separated stack is discarded with it, and
`font-family` reverts to its initial value — the browser's default **serif**.

Proven in the browser against Cloud, in isolation:

| Test                                         | `--x` resolves to          | Computed `font-family`     |
| -------------------------------------------- | -------------------------- | -------------------------- |
| `var(--undefined), ui-sans-serif, system-ui` | _(invalid/empty)_          | **Times**                  |
| `var(--undefined, ui-sans-serif), system-ui` | `ui-sans-serif, system-ui` | `ui-sans-serif, system-ui` |
| variable defined                             | `Geist, ui-sans-serif`     | `Geist, ui-sans-serif`     |

Cloud's measured state before any change:

```
--font-geist-sans   (UNDEFINED)
--font-sans         (UNDEFINED — invalid at computed-value time)
html · body · h2 · input · button   font-family: Times
document.fonts                      0 faces
:root custom properties defined     101   ← colour tokens all worked
font-related properties defined     0
```

The 101/0 split is the precise signature: Design's stylesheet was loading
correctly and every colour token resolved. Only the font declarations were
being thrown away, silently, by the CSS engine.

---

## 2. Ownership, before and after

```
Before
Foundation  → names Geist; ships no file; emits var(--font-geist-sans) with no fallback
Design      → bridges the token verbatim; ships no @font-face; sets no base family
Docs        → next/font/google + its own body { font-family } ......... Geist ✓ (privileged)
Cloud       → body { font-family: var(--font-sans) } → invalid ......... browser default serif ✗
```

```
After
Foundation  → owns Geist + Geist Mono as files (src/assets/fonts) and as the
              canonical stack, now valid: var(--font-geist-sans, "Geist"), …
     ↓        token bridge — values AND font files, byte-compared by token:bridge-check
Design      → copies the files to dist/fonts, declares @font-face in styles.css,
              applies the family in @layer base
     ↓        one import: @studiopod/design/styles.css
Docs        → no next/font, no body font-family ....................... Geist ✓
Cloud       → no font declaration at all ............................... Geist ✓
```

Named mechanisms: `token:bridge-check` (byte comparison), `@font-face` +
`@layer base` in `dist/styles.css`, esbuild `loader: {".woff2": "copy"}` with
`assetNames: "fonts/[name]"`.

---

## 3. Files and architecture changed

### Foundation — `0.3.0 → 0.4.0`

| File                                  | Change                                                                    | Why here                                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/assets/fonts/*.woff2`, `OFL.txt` | **added** — two variable fonts, ~137 KB                                   | `src/assets/README.md` reserved this slot for webfonts since DS-7.1, and `pendingMigration` listed `"fonts"`. The architecture already answered where they go. |
| `src/tokens/typography/index.ts`      | inner `var()` fallback added; the incorrect fall-through comment replaced | Foundation owns token values. Design may not correct one locally.                                                                                              |
| `src/metadata/index.ts`               | `pendingMigration` drops `"fonts"`; override-hook semantics documented    | Metadata must not claim fonts are still fixtures.                                                                                                              |
| `docs/ds-7.2-compatibility-map.json`  | two entries → `intentional-change` with notes                             | A correction must not masquerade as a rename.                                                                                                                  |
| `test/compatibility.test.ts`          | the "preserve verbatim" assertion **rewritten**                           | It was pinning the defect. It now asserts the hook _and_ its fallback.                                                                                         |

### Design — `0.16.0 → 0.17.0`

| File                                       | Change                                                     | Why here                                                                             |
| ------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `src/styles/fonts.css`                     | **added** — `@font-face` ×2, `@layer base` typography      | Design is the only package consumers install, so only Design can make a font arrive. |
| `src/assets/fonts/*`                       | **added** — generated copies                               | Same bridge as token values; drift fails the build.                                  |
| `src/styles.css`                           | imports `fonts.css`                                        | The single entry point stays single.                                                 |
| `tsup.config.ts`                           | `loader: {".woff2": "copy"}`, `assetNames: "fonts/[name]"` | Emit the files beside the stylesheet, unhashed and un-inlined.                       |
| `tooling/generators/…-from-foundation.mjs` | copies + byte-checks the fonts                             | Makes Foundation canonical in fact, not just in prose.                               |
| `apps/docs/…/layout.tsx`, `globals.css`    | `next/font` and `body { font-family }` **removed**         | A documentation site with privileged typography is a false witness.                  |
| `docs/decisions/0017-…md`                  | **added**                                                  | The ownership split is expensive to reverse.                                         |
| `docs/consuming/README.md`                 | new § "Typography — there is no step for it"               | The contract must be discoverable without tribal knowledge.                          |

### Cloud — consumer only

| File                                                    | Change                                                                                                                      | Why here                                                                                                                                                                                                                 |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `platforms/foundation`, `product/studio` `package.json` | `0.16.0 → 0.17.0`                                                                                                           | Ordinary registry upgrade.                                                                                                                                                                                               |
| `product/studio/src/shell.css`                          | **removed** `:root { font-family: var(--font-sans) }`; **replaced** the hardcoded `code` mono stack with `var(--font-mono)` | This is _removing_ typography ownership from Cloud, not adding it. The hardcoded `ui-monospace, SFMono-Regular, Menlo` was unlayered and beat the design system's own rule, opting every code surface out of Geist Mono. |

Cloud now declares **no** font family. Its only remaining `font-family`
declarations are `var(--font-mono)` and `inherit`.

---

## 4. The typography contract

|                |                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Primary        | `Geist` — `var(--font-geist-sans, "Geist"), ui-sans-serif, system-ui, sans-serif`                                          |
| Monospace      | `Geist Mono` — `var(--font-geist-mono, "Geist Mono"), ui-monospace, "SFMono-Regular", monospace`                           |
| Weights        | One variable font per family, axis `100 900`. No static cuts, no italics.                                                  |
| Format         | `woff2`, `format("woff2-variations")`, `font-display: swap`                                                                |
| Size           | 68 KB + 69 KB = **137 KB**, emitted to `dist/fonts/`                                                                       |
| Licence        | SIL OFL 1.1; `OFL.txt` travels with the files                                                                              |
| Applied to     | `html` (family + font smoothing); `button/input/optgroup/select/textarea` inherit; `code/kbd/samp/pre` use the mono family |
| Layer          | `@layer base` — beats Tailwind preflight by source order, still overridable by consumers                                   |
| Consumer setup | `@import "@studiopod/design/styles.css"` — **nothing else**                                                                |
| Override hook  | `--font-geist-sans` / `--font-geist-mono`, optional; a consumer that sets them wins                                        |

Base font-size and line-height are deliberately **not** set by the base layer.
Foundation's `body-md` is `1rem`/`1.6` and is already delivered by
`.text-body-md`; restating it globally would be Design inventing a document
default Foundation has not declared.

---

## 5. Framework independence

Not regressed — improved. DH-3's guarantee held and the one remaining `next/font`
usage in the repository is gone.

| Check                        | Result                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `package:framework-check`    | ✔ pass — no `next/*` in source, emitted output, or manifest                  |
| `next/font` in the ecosystem | **0 occurrences** (was 1, in `apps/docs`)                                    |
| Design runtime dependencies  | unchanged — `cva`, `clsx`, `tailwind-merge`, `lucide-react`, `framer-motion` |
| Peer dependencies            | unchanged — `react`, `react-dom`                                             |
| Foundation dependency        | still **build-time only**; consumers install Design alone                    |
| Loading mechanism            | plain CSS `@font-face` with a relative `url()`                               |

The solution works in Vite (Cloud, verified), Next.js (docs, verified), and any
bundler that can follow a relative `url()` out of a stylesheet. No framework API
is involved, and no runtime remote dependency was introduced.

---

## 6. Verification

### Gates

| Repository                  | Result                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Foundation `npm run verify` | ✔ **exit 0** — 83/83 tests, determinism, provenance, exports, deps, content                                                               |
| Design `npm run verify`     | ✔ **exit 0** — all 14 steps; 1013/1013 tests; API contract unchanged; CSS contract; framework independence; client boundaries; docs build |
| Cloud `npm run verify`      | ✔ **exit 0** — 298/298 unit tests, **21/21 browser tests**, boundaries, dependencies, ADRs, docs                                          |

`check-api` reported **no surface change** — the typography foundation added no
export.

### Published artefact

```
@studiopod/foundation@0.4.0   published
@studiopod/design@0.17.0      published
  package/dist/fonts/Geist-Variable.woff2       68 KB  magic=wOF2
  package/dist/fonts/GeistMono-Variable.woff2   69 KB  magic=wOF2
  src: url("./fonts/Geist-Variable.woff2") format("woff2-variations")
  src: url("./fonts/GeistMono-Variable.woff2") format("woff2-variations")
```

Both font files in the published tarball are **byte-identical** to Foundation's
canonical copies. Cloud resolves `0.17.0` from
`https://npm.pkg.github.com/download/@studiopod/design/0.17.0/…` — registry, no
`file:`, `link:`, or workspace bypass.

### Browser — computed `font-family`

**Docs** (Next.js, `localhost:3200`), with `--font-geist-sans` **undefined**,
proving the package contract rather than `next/font`:

| Element                                  | Computed                                                |
| ---------------------------------------- | ------------------------------------------------------- |
| `html` · `body` · heading · nav · button | `Geist, ui-sans-serif, system-ui, sans-serif`           |
| eyebrows (`font-mono`)                   | `"Geist Mono", ui-monospace, SFMono-Regular, monospace` |
| `document.fonts`                         | `Geist loaded`, `Geist Mono loaded`                     |

**Cloud** (Vite, `localhost:5173`):

| Element                              | Before                          | After                       |
| ------------------------------------ | ------------------------------- | --------------------------- |
| `html` · `body`                      | Times                           | `Geist, …`                  |
| heading · button · **input** · label | Times                           | `Geist, …`                  |
| `code` (18 elements)                 | `ui-monospace, …` (Cloud's own) | `"Geist Mono", …`           |
| Elements resolving to a serif        | **all**                         | **0**                       |
| Distinct stacks across the page      | 1 (invalid)                     | `Geist` + `Geist Mono` only |

### Font resources actually loaded

```
Docs  GET /_next/static/media/Geist-Variable.…woff2       200 OK
      GET /_next/static/media/GeistMono-Variable.…woff2   200 OK
Cloud GET /@fs/…/@studiopod/design/dist/fonts/Geist-Variable.woff2      200 OK
      GET /@fs/…/@studiopod/design/dist/fonts/GeistMono-Variable.woff2  200 OK
```

No silent fallback. No console error attributable to typography in either
application. (Cloud's console shows Vite HMR websocket failures — an artefact of
the preview proxy, unrelated.)

---

## 7. Visual findings

Typography changed every surface, as intended. Checked programmatically across
`/`, `/admin`, `/admin/users`, `/admin/flags`, `/admin/permissions`, plus the
command palette and sign-in, for clipping, vertical truncation and page-level
horizontal overflow.

**At desktop width: zero regressions.** No clipped text, no truncation, no
horizontal scroll, tables aligned, buttons and inputs unchanged in height, the
command palette and dialogs correctly dimensioned.

**One pre-existing defect, confirmed not caused by this work.** The admin
permission registry table overflows the viewport at 375 px. Measured in three
font states at the same width:

| Font state                         | Page `scrollWidth` (viewport 375) |
| ---------------------------------- | --------------------------------- |
| Browser default serif (pre-DH-5.5) | 712                               |
| System sans                        | 769                               |
| Geist (post-DH-5.5)                | 804                               |

The table was already more than twice the viewport before any typography
change. Geist widens it a further ~13%, and the real defect is that a
three-column table of long identifiers has no responsive treatment and no
`overflow-x` container. **Not fixed here** — recorded for DH-6.

---

## 8. Unexpected discoveries

1. **The ecosystem's documented fallback behaviour was wrong**, and had been
   since DS-7.2. Foundation asserted graceful degradation to system fonts; the
   real behaviour was total collapse to serif. Every downstream document
   repeated the claim. This is the finding that turned "Cloud looks slightly
   off" into "Cloud renders in Times".

2. **A test was pinning the defect in place.** Foundation's
   `preserves the externally-injected font references verbatim` asserted the
   bare `var(--font-geist-sans)` — so the correct value would have _failed_ CI.
   A test that asserts a bug faithfully is indistinguishable from one that
   asserts a contract, until someone asks what the contract is for.

3. **The documentation site was structurally incapable of catching this.** It
   loaded fonts through a Next.js API the library is forbidden to use, so the
   one application whose job is to demonstrate the design system was the one
   application guaranteed not to reproduce a consumer's experience.

4. **Cloud had quietly taken ownership of a font decision.** `shell.css`
   hardcoded a monospace stack in an unlayered rule, which both opted out of
   Geist Mono and outranked the design system. Nothing flagged it, because
   nothing checks for an application naming a typeface.

5. **Tailwind's `@theme` was not the culprit, and it was worth ruling out.**
   101 custom properties reached `:root` correctly; only the two font
   declarations were dropped. The CSS engine, not the build, was discarding
   them.

---

## 9. Remaining work

### Typography — still open

- **Nothing prevents an application declaring `font-family` again.** Cloud's
  hardcoded mono stack was found by reading, not by a check. A rule in Cloud's
  `check:boundaries` that rejects a `font-family` naming a literal typeface
  would close it. Small, and not done here.
- **No font-weight tokens exist.** Foundation deliberately never migrated them;
  components use Tailwind's `font-medium` / `font-semibold` directly. The
  variable fonts now support the full 100–900 axis, so a weight scale is
  _possible_ for the first time — a Foundation decision, not a defect.
- **Italics are not shipped.** Nothing needs them today.
- **Base font-size and line-height remain undeclared** at document level, by
  the reasoning in § 4.

### For DH-6 (component quality)

- The admin permission table's responsive behaviour (§ 7).
- Whether Geist's metrics warrant revisiting any component's fixed heights or
  letter-spacing — nothing failed, but nothing was designed against real metrics
  before now either.

### Unrelated infrastructure

- **Node runtime alignment** — untouched, as instructed. Design's release
  workflow uses Node 20, Cloud's CI uses 22, Cloud's `.nvmrc` says 24, and
  GitHub now warns that `actions/checkout@v4` and `actions/setup-node@v4` are
  being forced onto Node 24.

---

## 10. Certification recommendation

**CERTIFIED.**

The ecosystem has an implemented typography foundation rather than an intended
one, and the claim rests on browser evidence at both ends of the chain:

- Foundation is canonical for the typefaces — as values _and_ as files — and
  drift from it fails `token:bridge-check`.
- Design consumes Foundation rather than duplicating it; no font value is
  authored in Design.
- Geist renders as the interface font and Geist Mono as the monospace font in
  **both** a Vite SPA and a Next.js application, with the font resources
  confirmed loading and zero serif elements remaining.
- The consumer contract is one import, documented, with no hidden setup.
- Framework independence is stronger than before: the last `next/font` in the
  ecosystem is gone and `package:framework-check` passes.
- All three repositories' full gate chains pass, including Cloud's 21 browser
  tests.

The one visual defect found is pre-existing, was measured in three font states
to prove it, and is recorded rather than absorbed.

**Observation, not a condition:** the DH-5.5 defect survived five work packages
because a token's _presence_ was repeatedly mistaken for its _effect_. The
lesson generalises beyond typography — a value that is generated, bridged, and
tested can still reach the browser and be discarded there. Only the browser
knows.

## References

- [ADR 0017 — Foundation owns the typeface, Design loads it](../decisions/0017-typography-is-loaded-by-design.md)
- `@studiopod/foundation` CHANGELOG `0.4.0` · `@studiopod/design` CHANGELOG `0.17.0`
- [docs/consuming/README.md § Typography](../consuming/README.md)
- Cloud ADR 0034 — Cloud consumes `@studiopod/design`
- [DH-5](DH-5.md) · [DH-3](DH-3.md)
