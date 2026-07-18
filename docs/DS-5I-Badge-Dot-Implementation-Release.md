# DS-5I — Badge Dot Implementation & Release

**Verdict:** ✅ **CERTIFIED.**

The DS-5H-certified Badge dot architecture is implemented, verified, and **published as `@studiopod/design-system@0.2.2`**. Registry resolution confirms `0.2.2` (`latest`). DS-6.3 may resume.

---

## Files changed

| File | Change |
|---|---|
| `src/lib/tone.ts` | **+`STATUS_TONE_DOT_CLASSES`** — a `Record<StatusTone, string>` (5 keys) of the solid dot fill matching each tone's pill *text* colour. |
| `src/components/ui/Badge.tsx` | **+`dot?: boolean`** prop; renders a decorative `aria-hidden` leading `<span>` that inherits the badge tone. |
| `src/lib/tone.test.ts` | +`STATUS_TONE_DOT_CLASSES` integrity tests (keys, byte-exact values, shape). |
| `src/components/ui/Badge.test.tsx` | +11 dot tests. |
| `src/app/core-components/_sections/ComponentGallerySection.tsx` | +a dot example row (5 tones). |
| `packages/design-system/CHANGELOG.md` | +`## 0.2.2` entry; reconciled stale `## Unreleased` → `## 0.2.1` (verified byte-identical to the `v0.2.1` tag — that block *is* what 0.2.1 shipped). |
| `docs/DS-5H-Badge-Semantic-Architecture.md` | committed (the review this implements). |

`packages/design-system/package.json` was **not** hand-edited — the release workflow bumped it (`0.2.1 → 0.2.2`) in CI.

## API change

Additive only. `Badge` gains `dot?: boolean` (default `false`) — every existing `<Badge>` renders identically. **No new export**, so `package:api-check` passed with the baseline unchanged. `StatusTone` is untouched (still `neutral | accent | success | warning | error`). No `solid`, no convenience exports (per DS-5H).

**The dot:** static · decorative (`aria-hidden="true"`) · tone-inherited (no second prop) · `size-1.5 shrink-0 rounded-full` · a plain server-safe `<span>` rendered *before* the label inside the pill. No `"use client"`, no `PulseStatus`, no `framer-motion`. `PulseStatus` remains the standalone/animated live dot; `StatusIndicator` remains the dot+label row (DS-5B Classification 2 preserved).

## Tone-source change

`STATUS_TONE_DOT_CLASSES = { neutral: "bg-neutral", accent: "bg-accent-400", success: "bg-success", warning: "bg-warning", error: "bg-error" }` — each a complete, statically-written class string (Tailwind scanner-visible; the dynamic-string hazard of engineering note 15 avoided). Internal (Badge imports it, like `STATUS_TONE_PILL_CLASSES`); not exported.

## Tests added/updated

- **`Badge.test.tsx` (+11):** no dot by default · renders dot as pill's first child, label intact · `aria-hidden` · neutral default class · each of 5 tones' dot colour · size preserved with dot · className preserved with dot · non-interactive (pill & dot are plain `<span>`, no role/tabindex/href) · no axe violations with a dot.
- **`tone.test.ts` (+3):** five canonical keys (== pill's key set) · byte-exact values · every value a single solid `bg-*` (no soft tint, no text colour).
- **No existing test weakened.**

## Verification results

| Gate | Result |
|---|---|
| `verify:fast` (tsc app + tsc tests + ESLint + Vitest) | ✅ **568/568** tests, 83 files |
| `package:verify` (build · api-check · css-check · use-client-check · exports-check) | ✅ all pass; **API baseline unchanged**; 9 export targets resolve |
| Compiled CSS (showcase `next build`) | ✅ all 5 dot utilities present — incl. `bg-accent-400` (the only previously-unproven class) |
| Badge server-safety | ✅ source has no `"use client"`, imports only react/cva/cn/tone — no framer/PulseStatus |
| Visual (live computed styles, light **and** dark) | ✅ dot colour **==** pill text colour for all 5 tones; dot `6px` uniform; pill padding identical with/without dot (no layout shift); `animationName: "none"` (no animation); solid dot on 12%-alpha soft pill (contrast) |

> The Browser pane returned black screenshots (a headless compositing limitation); the DOM/JS layer was fully functional, so verification used live `getComputedStyle` inspection — stronger evidence than a pixel capture for colour/size/animation claims.

## Release

- **Commit:** `508465b DS-5I: add Badge \`dot\`…` (pushed to `main`).
- **Release commit (CI):** `de15d34 release(design-system): v0.2.2`.
- **Tag:** `design-system-v0.2.2`.
- **Workflow run:** [29625811370](https://github.com/jheavner95/studiopod-design/actions/runs/29625811370) — **completed / success**. `dry_run` job correctly skipped. Publish auth = PAT (`DS_NPM_TOKEN`), cross-owner architecture unchanged.
- **GitHub Release:** `design-system-v0.2.2` created.

## Publish result

Publish-job log (authoritative, not the UI):
```
Bumped to v0.2.2
[new tag] design-system-v0.2.2 -> design-system-v0.2.2
@studiopod/design-system@0.2.2 prepublishOnly → verify (build/typecheck/api/css/use-client/exports)  ✓
npm notice 📦  @studiopod/design-system@0.2.2
npm notice Publishing to https://npm.pkg.github.com/ with tag latest and default access
+ @studiopod/design-system@0.2.2
```
The `prepublishOnly` gate re-ran the full package verify at 0.2.2 — the quality gate cannot be bypassed by publishing.

## Registry-resolution result

```
$ npm view @studiopod/design-system version   --registry=https://npm.pkg.github.com
0.2.2
$ npm view @studiopod/design-system dist-tags --registry=https://npm.pkg.github.com
{ latest: '0.2.2' }
```

## Deferred items

None blocking. Noted, non-blocking:
- **CHANGELOG heading hygiene** — the release workflow does not rename the top heading on release (it extracts notes by version match). DS-5I reconciled the one stale `Unreleased`→`0.2.1` block; future releases still need the heading advanced manually (a workflow enhancement candidate, out of DS-5I scope).
- **Node 20 deprecation warning** on the Actions runners (GitHub forcing Node 24) — cosmetic annotation, run succeeded; bump `setup-node`/`checkout` action majors when convenient.

## Readiness for DS-6.3

**Ready.** The three resume conditions are met: Badge dot implemented & verified · `0.2.2` published · registry resolves `0.2.2`. DS-6.3 can now bump the app consumer to `@studiopod/design-system@0.2.2` and migrate the app Badge as a rename/remap (`variant`→`tone`, `info`/`blue`→`accent`, `cyan` remap, `draft`/`archived`→lifecycle-resolved tone, `dot`→`dot`), per DS-5H's migration matrix.

## Certification

**VERDICT: CERTIFIED.**

Badge gained exactly one additive, DS-5H-certified capability — a static, decorative, tone-inheriting, server-safe `dot` — with `StatusTone` and the export surface unchanged. It is covered by new tests (568/568 green), proven scanner-visible in compiled CSS, and confirmed by live computed styles on light and dark surfaces to be tone-correct, static, and layout-neutral. It shipped through the certified release pipeline as `@studiopod/design-system@0.2.2`, and the registry independently resolves `0.2.2` as `latest`.

**Stopping after DS-5I. The application was not modified. DS-6.3 migration not begun.**
