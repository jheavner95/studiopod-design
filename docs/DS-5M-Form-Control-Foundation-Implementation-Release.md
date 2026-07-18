# DS-5M — Form Control Foundation Implementation & Release

**Verdict:** ✅ **CERTIFIED.**

The DS-5L-certified operational-controls architecture is implemented, verified, and **published as `@studiopod/design-system@0.4.0`**. Registry resolution confirms `0.4.0` (`latest`). The DS-6.5 gap is resolved; DS-6.5 may resume.

---

## Files changed (16)

**New (4):** `src/lib/control-size.ts` (the shared scale) · `src/components/ui/Combobox.tsx` · `src/components/ui/IconButton.tsx` · `src/components/ui/control-tiers.test.tsx` (34 tests).
**Modified (12):** `TextInput`, `Textarea`, `Select`, `Checkbox`, `ToggleSwitch`, `SearchInput` (bare tier + size) · `form/ComboboxField` (now composes `Combobox`) · `ui/index.ts` (6 exports) · `CHANGELOG.md` · `api-baseline/index.json` · showcase `ControlTierDemo.tsx` + `foundation-forms/page.tsx`.

## Components modified

| Control | Bare tier | `size` | Other |
|---|---|---|---|
| `TextInput` | ✅ | ✅ | icon slot now size-aware |
| `Textarea` | ✅ | ✅ (padding/text only — see exception) | — |
| `Select` | ✅ (drops `w-full`) | ✅ | **+`leadingIcon`** |
| `Checkbox` | ✅ (box only) | ✅ (box + glyph) | — |
| `ToggleSwitch` | ✅ | ✅ (track + thumb travel) | **+`aria-label`/`aria-labelledby`** |
| `SearchInput` | ✅ | ✅ | **+`aria-label`/`aria-labelledby`** |
| `Combobox` | **new** (extracted) | ✅ | **+`leadingIcon`** |
| `ComboboxField` | — | — | now composes `Combobox` (no duplicated typeahead) |
| `IconButton` | **new** | ✅ (sm/md) | built **on** `Button` |

**The invariant:** no `label` and no `helperText` → the control renders alone (no stacked `flex flex-col` wrapper, no forced `w-full`, intrinsic width). Either one present → the stacked field renders exactly as before.

## New APIs (6 additive exports)

`Combobox`, `ComboboxProps`, `ControlSize`, `IconButton`, `IconButtonProps`, `IconButtonSize`. Plus new props: `size` (×7), `leadingIcon` (Select, Combobox), `aria-label`/`aria-labelledby` (ToggleSwitch, SearchInput). **Nothing removed or renamed; `md` remains every default.** api-baseline regenerated.

**Size scale:** `sm` = **`h-8`, the exact height `Button`'s own `sm` renders**, so controls and buttons align in one row without hand-tuning. `md` preserves the previous padding-driven sizing byte for byte.

**Documented exception:** `Textarea`'s `sm` sizes padding and text only — a textarea takes its height from `rows`, so pinning a height would be wrong.

## Accessibility changes

- `ToggleSwitch` and `SearchInput` gained explicit `aria-label`/`aria-labelledby` — previously they had **no accessible-name path** when rendered without a visible label, which is exactly how operational controls ship.
- `IconButton` makes `aria-label` **required by the type** — an icon alone has no accessible name, so it is not optional.
- `Combobox` carries the full ARIA combobox pattern (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-autocomplete`, `role="listbox"` popup) and now also `aria-invalid` from `status`.
- Native semantics, keyboard, focus ring, and disabled behaviour are unchanged throughout — nothing was reimplemented.

## Tests

**34 new** (634 total, previously 601 — **all 601 pre-existing tests pass untouched**, which is the backward-compatibility proof). Coverage: shared size-map integrity · bare rendering for all 7 controls (wrapper removal, intrinsic width, `w-full` dropped) · stacked tier preserved (label association, `aria-describedby` wiring, `w-full` retained) · size applied per control · leading icons + padding · accessible names on bare controls · switch semantics/toggle · indeterminate + disabled · IconButton (name, square sm/md, variants, loading→spinner + disabled + `aria-busy`, click, disabled, **`shrink-0` regression**) · axe on bare controls and IconButton.

## Documentation

CHANGELOG `## 0.4.0`. Showcase: a new **Control tier vs field tier** section on `foundation-forms` demonstrating all five required contexts — **toolbar, filter bar, table, inspector, traditional form** — with live `sm` controls beside `IconButton`s. Component docstrings state the two-tier rule and the accessible-name requirement.

## Verification results

| Gate | Result |
|---|---|
| `verify:fast` (tsc app + tsc tests + ESLint + Vitest) | ✅ **634/634** |
| `package:verify` (build · api-check · css · use-client · exports) | ✅ pass; baseline regenerated (+6) |
| Showcase `next build` | ✅ exit 0 |
| **Live — sm density** | ✅ SearchInput frame **32**, Select **137×32** (intrinsic, not full-width), Combobox **32**, ToggleSwitch **36×20**, Checkbox **16×16**, IconButton **32×32** |
| **Live — bare rendering** | ✅ no stacked wrapper; controls sit inline in a flex toolbar row |
| Console | ✅ no errors |

### A defect the live check caught

`IconButton` measured **24×32 — not square**. `.size-8` correctly declared `width: 2rem`, but the button is a **flex item** in a toolbar row and, lacking `shrink-0`, collapsed to its icon's intrinsic width. It was square in isolation and wrong in the only context it ships in — a class-level unit test could not have caught it. Fixed, re-measured at **32×32**, and locked with a regression test.

### Honest scope note on "Light / Dark"

The WP asks to verify light and dark. **The Design System currently ships a single (dark) theme** — `src/styles/theme.css` defines one token set with no `prefers-color-scheme`, `[data-theme]`, or `.light` selector (the only "light" mentions are comments). Setting `data-theme="light"` provably changed nothing. So this item is **not applicable**, not passed: the new controls use the semantic tokens (`bg-surface`, `border-border`, `text-ink-primary`) and will follow whatever the token layer defines if a light theme is ever added. Reported rather than glossed.

## Release

- **Commit:** `aef6b08` (pushed to `main`); **release commit (CI):** `release(design-system): v0.4.0`; **tag:** `design-system-v0.4.0`.
- **Workflow run:** [29635062497](https://github.com/jheavner95/studiopod-design/actions/runs/29635062497) — **completed / success** (`minor`; dry-run job skipped).
- **Publish log:** `Bumped to v0.4.0` → tag → `npm notice Publishing to https://npm.pkg.github.com/` → `+ @studiopod/design-system@0.4.0`.

## Registry verification

```
$ npm view @studiopod/design-system version   --registry=https://npm.pkg.github.com  → 0.4.0
$ npm view @studiopod/design-system dist-tags  --registry=https://npm.pkg.github.com  → { latest: '0.4.0' }
```

## Deferred items

None blocking. Non-blocking, carried forward from DS-5L:
- **No light theme** in the DS (above) — a token-layer question, not a control one.
- `FilterChip`/`FilterChipGroup` (62 app usages) and the **257 raw native form elements** remain separate work packages.
- The app's dead `Toolbar.tsx` (0 usages) should be deleted during DS-6.5.
- Node 20→24 runner deprecation annotation (cosmetic).

## Readiness for DS-6.5

**Ready.** All five resume conditions are met: bare control tier implemented · shared size architecture implemented · `IconButton` implemented · `0.4.0` published · registry resolves `0.4.0`. DS-6.5 can now bump the consumer to `@studiopod/design-system@0.4.0` and migrate both tiers — the 21 form fields to the `*Field` wrappers (already compatible) and the 49 bare/inline controls to `size="sm"` bare controls, plus `IconButton` for the app's 11 icon buttons.

## Certification

**VERDICT: CERTIFIED.**

The Design System gained exactly the architecture DS-5L certified: a genuine bare control tier beneath the existing field tier, a shared size scale whose `sm` lands on `Button`'s own `h-8`, `leadingIcon` where operational rows need it, a bare `Combobox` that `ComboboxField` now composes rather than duplicating, explicit accessible-name paths on the two controls that lacked them, and an `IconButton` built on `Button` so it cannot drift. Backward compatibility is proven by the 601 pre-existing tests passing untouched, with 34 new tests covering the new behaviour. Live measurement confirmed every `sm` control at operational density and caught one real defect — a non-square `IconButton` collapsing as a flex item — which is fixed and regression-locked. It shipped through the certified pipeline as `@studiopod/design-system@0.4.0`, and the registry independently resolves `0.4.0` as `latest`.

**Stopping after DS-5M. No application changes. DS-6.5 migration not begun.**
