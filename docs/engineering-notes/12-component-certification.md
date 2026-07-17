# Component Certification Framework (DS-1F)

The audit, architecture decisions, and pilot review log behind [docs/CERTIFICATION.md](../CERTIFICATION.md) — read that document for the contributor-facing how-to; this one is the evidence and reasoning for whoever next has to decide whether to change it.

## 1. Audit — what quality signals already existed

| Signal | Existed before DS-1F | Where |
|---|---|---|
| TypeScript (strict) | Yes | `tsconfig.json`, `npm run typecheck` |
| ESLint | Yes | `eslint.config.mjs`, `npm run lint` |
| Vitest (unit/component/a11y) | Yes (DS-1C) | `test/`, co-located `*.test.tsx` |
| Playwright (visual regression) | Yes (DS-1C) | `e2e/visual/*.visual.spec.ts`, local-only |
| axe-core | Yes (DS-1C) | `test/a11y.ts` |
| Verification pipeline | Yes (DS-1D) | `scripts/verify.mjs`, `verify`/`verify:fast`/`verify:full` |
| Export/API-baseline validation | Yes | `packages/design-system/scripts/check-api.mjs`, `check-exports.mjs` |
| Build validation | Yes | `next build`, `packages/design-system`'s tsup build |
| Documentation registry + page contracts | Yes (DS-1E) | `src/lib/design-system-navigation.ts`, `src/lib/docs-contracts.ts` |
| Accessibility findings history | Yes | `docs/engineering-notes/02-accessibility-findings.md` — real, specific, some still-open items (see §4) |
| Motion standards | Yes | `src/motion/tokens.ts`, `useMotionPreference`, reduced-motion conventions |
| Token system | Yes | `src/styles/theme.css` (Tailwind v4 `@theme`), `src/lib/tokens.ts` |
| Responsive verification | Partial | established manual breakpoint-sampling convention across prior Visual Polish passes; Playwright's desktop/mobile projects (DS-1C) — no automated tablet coverage |
| Editorial standards | Yes | DS-7.6's voice/consistency pass, `docs/engineering-notes/03-naming-collisions-and-consistency.md` |
| **A structured, ongoing, per-component certification mechanism** | **No** | this is the actual gap DS-1F closes |

**The critical prior-art find**: this is not the first attempt at "certification" in this codebase. `docs/engineering-notes/01-certification-history-and-technical-debt.md` documents an earlier, extensive pattern — dedicated certification pages per package (`DS-2.1.8` Foundation Table, `DS-2.5.10` Operational, `DS-3.9` Workflow, `DS-4.10` Platform, `DS-5.5` Business Feature, plus `final-certification` and `enterprise-architecture-audit`) — all deleted in RM-5. `docs/engineering-notes/README.md`'s own "what was deliberately not preserved" section names exactly why: *"certification ceremony: pass/fail scorecards restating conclusions captured here, certification-level ladders, stale roadmaps, 'systems reviewed' tallies."* DS-1F's entire design is shaped by not repeating that: no dedicated certification pages, no hand-typed scorecards, data-driven instead of document-driven, so a certification claim can't go stale independent of the code it describes.

**What already existed and would have been duplicated**: `src/app/application-components/_data/maturity.ts` already defines a five-level maturity vocabulary (`Concept | Prototype | Production Ready | Certified | Locked`) with precise definitions for `Certified` ("Production Ready, plus verified: accessibility pass, responsive at all three breakpoints, used in at least one real (non-playground) screen") and `Locked`. That file's own `MATURITY_FROM_STATUS` derives every component's maturity purely from whether it "exists" in an inventory list — meaning `Certified`/`Locked` have zero real entries today; there was no mechanism to actually *earn* promotion past "Production Ready." `CertificationLevel` in `src/lib/certification.ts` reuses this exact vocabulary (five identical string literals) rather than inventing a sixth competing status system.

**Why not import the type directly**: `src/lib/` is documented (§ "dependency graph," `01-certification-history-and-technical-debt.md`) as the floor of this codebase's dependency graph — zero internal dependencies. `maturity.ts` lives under `src/app/application-components/_data/`, a page-scoped location one tier above `src/lib`. Importing it would invert that direction. Duplicating five string literals is cheaper and safer than creating a new reverse dependency; if the two ever need a single source of truth, the honest fix is moving `maturity.ts` into `src/lib`, not the reverse. Recorded as a future recommendation, not done this phase (would touch `src/app/application-components/_data/` and its consuming page — out of DS-1F's "do not migrate application code" scope).

## 2. Certification standard — architecture

`src/lib/certification.ts` (data) + `src/lib/certification-checks.ts` (logic) — the same two-file split DS-1E used for `design-system-navigation.ts` (data) vs. `docs-contracts.ts` (derived logic). `CERTIFICATION_CHECKLIST` is the canonical 11-category, 39-item standard from the brief, encoded as data with every item declaring an `owner: "automated" | "manual" | "advisory"` — this classification is baked into the checklist itself, not decided separately in a later "which checks belong in CI" exercise (Part 5), because a check's owner is a property of the check, not a deployment decision made after the fact.

`CERTIFICATION_REGISTRY` holds per-component records (`componentName`, `sourcePath`, `level`, `completedChecks: string[]`, `notes`, `lastReviewed`) — one entry today (Button, the pilot). Query helpers (`getCertificationRecord`, `getChecklistCoverage`, `getChecksByOwner`, `getChecklistItem`) mirror `design-system-navigation.ts`'s own helper pattern (`getEntry`, `getRelated`, etc.) for consistency.

## 3. Automated vs. manual responsibilities

Of 39 checks: **21 automated, 13 manual, 5 advisory** (`npm run certification:report` prints the live count). The automated checks split into two kinds:

1. **Already-existing tools, referenced, not reimplemented** — `tsc --noEmit` (API type-safety), `npm run build`/`package:build` (performance/build-verified), the package's own `api-check`/`exports-check` (release checks), Vitest's `userEvent`/`toHaveFocus`/axe integration (accessibility — all DS-1C infrastructure).
2. **New, real utilities this phase adds** — `src/lib/certification-checks.ts`'s four functions (`checkTokenBypasses`, `checkTestCoverage`, `checkExportStatus`, `checkVisualBaseline`), each backed by a real filesystem check, each exercised against Button in `src/lib/certification.test.ts` and proven to produce correct output (see §5).

Manual checks are concentrated exactly where you'd expect: editorial/content quality (Identity, most of Documentation), design judgment (API defaults/composability, color independence, layout jank), and the one class of check nothing in this repo can automate — real screen-reader verification (axe-core catches structural ARIA issues; it cannot confirm a screen reader actually announces something sensibly).

## 4. Verification integration

Per the brief's explicit instruction ("Do NOT add artificial gates"): `npm run certification:report` is advisory-only, mirroring DS-1E's `docs:coverage` — always exits `0`, never wired into `verify`/`verify:fast`/`verify:full`. What *is* wired in (because it's a normal co-located Vitest file, exactly like `design-system-navigation.test.ts` in DS-1E) is `src/lib/certification.test.ts` — but what it gates is the framework's own correctness (no dangling checklist references, coverage math is consistent, Button's claimed-complete automated checks are backed by real passing checks), never "how many components are certified." Adding or improving certification coverage can never break a build; the framework silently drifting from what it claims to check would.

One accessibility check remains genuinely unautomatable at any layer currently in this repo: color-contrast. `test/a11y.ts` (DS-1C) explicitly disables axe's `color-contrast` rule in the Vitest/jsdom layer (jsdom has no layout engine); the Playwright layer (which could compute real contrast) has no `@axe-core/playwright` integration yet. `a11y-color-independence` is marked `manual` for this reason, not oversight — recorded as a real known limitation, not silently left off the checklist.

## 5. Pilot — Button — review log

Chosen per the brief's own recommendation. 18 of 39 checks (46%) marked complete; level set to `Certified`.

**Automated checks, run for real, not asserted by hand** (`certification.test.ts`):
- `checkTokenBypasses("src/components/ui/Button.tsx")` → one finding: `arbitrary-spacing`, `size-[18px]`, the `lg`-size spinner icon. Reviewed: legitimate — no spacing/sizing token exists for "spinner proportional to a `size-12` (lg) button," and the value is small, local, and self-contained. Recorded in the registry's `notes`, **not** marked as a completed check (`tokens-no-bypasses` deliberately excluded from `completedChecks`) — the finding stays visible rather than being silently resolved. Zero hardcoded-color findings.
- `checkTestCoverage(...)` → confirms `Button.test.tsx` (DS-1C) has all three expected describe blocks (`rendering`, `interaction`, `accessibility`).
- `checkExportStatus("Button")` → confirmed present in `packages/design-system/api-baseline/index.json`.
- `checkVisualBaseline("Button")` → confirmed `e2e/visual/button-gallery.visual.spec.ts` exists with committed PNG baselines (DS-1C).

**Manual checks, reviewed directly against the component and its docs presence**: purpose/usage documented (Button appears with clear labeled variant/state galleries on `/core-components`); sensible defaults (`variant: "primary"`, `size: "md"` — reasonable); composition-friendly (`className`, `leadingIcon`/`trailingIcon`, full native prop spread via `domProps`); screen-reader behavior (loading state sets `aria-busy`; disabled-link variant sets `aria-disabled` and intercepts the click rather than relying on a native `disabled` attribute a `<Link>` doesn't have); color independence (variants differ in border/background/text weight, not color alone — `ghost` vs. `outline` vs. `secondary` remain distinguishable without color); documentation anatomy/variants/do-don't (all variants and sizes are shown in the gallery; no separate written do/don't guidance exists yet — flagged, not blocking, since the maturity model's own "Certified" bar doesn't require it and the checklist's `docs-do-dont` is honestly a partial pass tracked in notes rather than silently checked off).

**Live integration**: `<CertificationPanel componentName="Button" />` added to `/core-components`'s Component Gallery section, directly below Button's existing variant/size gallery — one new panel, zero other page changes.

## 6. Known limitations

- Only one component certified (by design — this phase builds the mechanism, per the brief).
- Color-contrast has no automated check anywhere in the pipeline yet (§4).
- No automated "tablet" responsive check — only desktop/mobile Playwright projects exist.
- `motion-tokens` (raw duration values outside `src/motion/tokens.ts`) has no dedicated scanner yet — `checkTokenBypasses` covers color/spacing/typography, not motion timing.
- `release-in-docs` ("is this component used in a live docs page") has no generic automated check — verified by hand for Button this pass.
- `CertificationLevel` duplicates `MaturityLevel`'s five string literals rather than sharing a single source (§1) — a deliberate, documented tradeoff, not an oversight.

## 7. Future recommendations

1. Certifying additional components is explicit DS-2+ work — the brief's own instruction, repeated here so it isn't lost.
2. Consider moving `src/app/application-components/_data/maturity.ts` into `src/lib/` so `CertificationLevel` can import it directly instead of duplicating the vocabulary — only once that file needs to change for other reasons, not as a standalone migration.
3. Add `@axe-core/playwright` to close the color-contrast gap at the one layer that can actually evaluate it.
4. Extend `checkTokenBypasses` to cover motion timing (`motion-tokens`), or accept that check staying `advisory`/`manual` indefinitely and say so explicitly rather than leaving it ambiguous.
5. If `certification:report`'s output becomes something the team actually reads and acts on, consider whether it belongs in `docs/VERIFICATION.md`'s command table too (currently only `docs/CERTIFICATION.md` references it) — deferred here since one new cross-reference per real usage pattern beats speculative ones.
