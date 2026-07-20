# DS-6.9C3A — Inspector Family Test Coverage

**Verdict: CERTIFIED**

The Inspector and Property families go from **0 tests to 145**, across 7 new
files. All 6 Design System gates pass. No API change was required — **no defect
was found in any of the 21 components.**

---

## 1. Coverage matrix

| Component | Tests | Covered |
|---|---|---|
| `InspectorPanel` | **19** | header/tabs/children/footer slots · DOM order · `loading` · `loadingLabel` · `emptyState` · `maxHeight` scoping · `className` · loading-over-empty precedence · alias identity · a11y |
| `InspectorHeader` | **13** | `name`/`type`/`status`/`icon` · ReactNode name · sticky · **close button: presence, absence, click, Enter, Space, `type=button`** · `className` · a11y |
| `InspectorSection` | **13** | title/children · collapsible default · `defaultOpen` · click + keyboard toggle · **controlled `open`/`onOpenChange`** · non-collapsible fallback · alias identity · aria contract · a11y |
| `InspectorTabs` | **15** | tab-per-def · `count` · `disabled` · `ariaLabel` default and override · `aria-selected` · **`aria-controls` → resolvable panel** · panel switching · disabled non-activation · arrow-key navigation · alias identity · a11y |
| `InspectorProperty` | 4 | read mode · edit mode (no double label) · `className` both modes · omitted value |
| `InspectorGroup` | 3 | title/children · **identity: is Metadata's `PropertyGroup`** · `PropertyGroup` alias |
| `InspectorActions` | 3 | children · `className` · keyboard order |
| `InspectorFooter` | 3 | children · sticky-bottom · `className` |
| `InspectorStatus` | 4 | rows · empty list · `className` · a11y |
| `InspectorHistory` | 10 | order preserved · actor/timestamp · default `collapsedCount` · custom count · no expander when it fits · expansion reveals rest · icon `aria-hidden` · empty · `className` · a11y both states |
| `InspectorValidation` | 6 | items · multiple severities · `emptyMessage` · renders nothing when empty · `className` · a11y |
| composition | 2 | `InspectorActions` inside `InspectorFooter`, still clickable |
| `PropertyRow` | 6 | read · editor overrides value · **reset needs BOTH `modified` and `onReset`** · `onReset` fires · `className` |
| `PropertyReset` | 5 | default label · custom label + `title` · click + keyboard · `type=button` · `className` |
| `PropertyToggle` | 4 | checked · `onChange` boolean · `helperText` · `disabled` blocks |
| `PropertySelect` | 5 | value · options · **reports raw value, not the event** · `error` · `disabled` |
| `PropertyNumber` | 5 | value · **reports a number, not a string** · `min`/`max`/`step` · NaN → empty · `error` + `disabled` |
| `PropertyColor` | 7 | swatch + hex share a value · swatch change · hex change · **`aria-describedby` ↔ error** · no `aria-describedby` when valid · `disabled` both · a11y |
| `PropertyEditor` | 7 | all 5 field types dispatch · `onChange` routing · `error` |
| `PropertySection`/`PropertyGroup`/`PropertyPanel` | (in the above) | **identity assertions — aliases, not copies** |
| `WorkspaceInspector` | **12** new (+2 existing) | `<aside>` landmark · `label` · default `20rem` · string width · collapsed drops inline width · **`hideBelowLg` both directions** · **`scroll` both directions** · `className` · hosts a real panel · a11y |

## 2. Test inventory

| File | Tests |
|---|---|
| `InspectorPanel.test.tsx` | 19 |
| `InspectorHeader.test.tsx` | 13 |
| `InspectorSection.test.tsx` | 13 |
| `InspectorTabs.test.tsx` | 15 |
| `InspectorContent.test.tsx` | 35 |
| `PropertyFamily.test.tsx` | 38 |
| `WorkspaceInspectorProps.test.tsx` | 12 |
| **Total** | **145** |

Every exported prop across the 21 components has at least one behavioural
assertion. **No snapshot tests** — the only whole-DOM comparison is the alias
test asserting `PropertyPanel` and `InspectorPanel` render byte-identical
output, which is an identity proof, not a snapshot.

## 3. Untested branches

None remaining in the Inspector/Property families. Three deliberate exclusions:

- **`Expandable` internals** (`ui`) — exercised through `InspectorSection` and
  `InspectorHistory`, but its own contract belongs to `ui`.
- **`ValidationSummary`, `StatusIndicator`, `MetadataField`, form fields** —
  delegated-to primitives with their own coverage. Tests assert the delegation
  happens, not the delegate's internals.
- **Visual/contrast** — jsdom has no layout engine; the repo verifies contrast
  in the Playwright visual layer, and `runA11yCheck` disables `color-contrast`
  for exactly that reason.

## 4. Accessibility verification

axe runs clean on every component that renders interactive or semantic content:
`InspectorPanel` (default, loading, empty), `InspectorHeader` (with and without
the close button), `InspectorSection` (both modes), `InspectorTabs`,
`InspectorStatus`, `InspectorHistory` (collapsed and expanded),
`InspectorValidation`, `PropertyColor` (valid and errored), and
`WorkspaceInspector` hosting a real panel.

| Requirement | Result |
|---|---|
| Heading hierarchy | No headings are emitted by the family — titles are styled text, so no hierarchy can be skipped. Verified, not assumed. |
| Button labels | `Close inspector`, `Reset to default` (+ custom), `Show N more` — all asserted by accessible name |
| Focusability | Close button, section trigger, reset, tabs and actions all reachable by `Tab` |
| Keyboard interaction | Enter **and** Space on close; Enter on section toggle and reset; arrow keys across tabs |
| `aria-expanded` | Asserted on section triggers, in both states and controlled mode |
| `aria-controls` | Asserted on tabs → **resolves to a real panel element**; see finding F1 for sections |
| Tab semantics | `role="tablist"` named, exactly one `aria-selected`, disabled tab inert |
| Tabpanel linkage | `getElementById(aria-controls)` resolves — the way a screen reader actually follows it |

### Finding F1 — `aria-controls` missing on disclosure sections

`InspectorSection` (and `InspectorHistory`) build on `ui/Expandable`, which
emits `aria-expanded` but **no `aria-controls`, and no id on its content
region**.

`aria-expanded` is the *required* half of the ARIA disclosure pattern;
`aria-controls` is a SHOULD, and axe raises no violation — so this is a
refinement, not a defect, and it does not block certification. Fixing it belongs
to `Expandable`, a **stable `ui` component outside this package's scope**.

I did not weaken the test to hide it. The test asserts the contract as it
actually is — `aria-expanded` present, `aria-controls` absent — so that if
`Expandable` later gains the attribute, the test fails and the improvement is
recorded deliberately rather than drifting in unnoticed.

## 5. Runtime verification

| Gate | Result |
|---|---|
| TypeScript — app | ✅ |
| TypeScript — tests | ✅ |
| ESLint | ✅ |
| Unit & component tests | ✅ **854 passing / 96 files** (was 709 — **+145**) |
| Next.js build | ✅ |
| Package verify (`api-check` 609, css, use-client, exports) | ✅ |

**No production source file was modified.** `git status` shows only the seven
new test files.

### Three test bugs I wrote and fixed — none were code defects

1. **`SystemStatus` values invented.** I used `"operational"`/`"degraded"`; the
   real union is `idle | active | success | warning | error`. `StatusIndicator`
   threw on the undefined config — the test was wrong.
2. **`PropertyReset` keyboard test tabbed away from its own target.** Clicking
   already leaves focus on the button, so the subsequent `tab()` moved off it
   and Enter hit nothing. Fixed by focusing explicitly.
3. **`PropertyColor` swatch driven by a bare `Event("input")`.** That carries no
   new value, so React's `onChange` never fires. `fireEvent.change` sets the
   value and dispatches together.

A fourth was caught not by vitest but by the **test typecheck**:
`ValidationSummaryItem` is `{ field, message, severity, href? }` — I had
invented an `id`. Vitest passed; `tsc -p tsconfig.test.json` failed. That gate
earned its place in this run.

This is the fourth package in this programme where a first-draft test asserted
something the harness could not model. The pattern is consistent enough to be
worth naming: **when a test fails, decide whether the test or the code is
wrong before touching either.** All four times here, it was the test.

## 6. Mutation opportunities

Where the suite would catch a silent regression, and where it would not:

**Caught:** removing the close button, or its `aria-label` · flipping
`InspectorSection`'s `defaultOpen` · dropping `onOpenChange` · reordering
`InspectorPanel`'s loading/empty precedence · `InspectorHistory` re-sorting
entries or changing `collapsedCount` · `PropertyNumber` reporting a string ·
`PropertySelect` reporting the event instead of the value · `PropertyRow`
showing reset with only one of `modified`/`onReset` · **any alias silently
becoming a second implementation** (four identity assertions) ·
`WorkspaceInspector` losing its `<aside>` or its `hideBelowLg` default.

**Not caught (accepted):** pure styling changes (padding, colour, gap) — by
design, since these are behavioural tests and visual regression lives in the
Playwright layer; and `Expandable`'s internal animation timing.

**Highest-value future addition:** a Playwright visual test for sticky
header/footer behaviour under real scroll. jsdom has no layout engine, so
`sticky top-0` / `sticky bottom-0` are asserted as *classes*, not as observed
behaviour. That is the one area where these tests prove intent rather than
effect.

## 7. Final coverage summary

| | Before | After |
|---|---|---|
| Inspector/Property test files | **0** | **7** |
| Inspector/Property tests | **0** | **145** |
| DS suite total | 709 | **854** |
| Components with ≥1 behavioural assertion | 1 of 21 (`WorkspaceInspector`, partial) | **21 of 21** |
| Exported props with ≥1 assertion | — | **all** |
| axe-verified components | 0 | 9 |

### Certification

| Requirement | Result |
|---|---|
| All Inspector components covered | ✅ 11 + container |
| All Property components covered | ✅ 10 |
| `WorkspaceInspector` existing coverage verified **and extended** | ✅ gaps in `label`, `scroll`, `hideBelowLg` closed |
| Every exported prop has a behavioural assertion | ✅ |
| Every conditional path exercised | ✅ |
| Re-export aliases verified | ✅ 4 identity assertions |
| No snapshot-only tests | ✅ |
| Accessibility verified | ✅ 9 axe checks + explicit ARIA assertions |
| All gates pass | ✅ 6/6 |
| No API change required | ✅ **no defect found** |

**CERTIFIED.**

The DS-6.9C2 blocker is cleared: the family is no longer untested. Two items
remain before graduation to Stable, both from C2 and neither in this package's
scope: **R1** (the `emptyState` contract — now pinned by two tests so any change
is deliberate) and **R2** (documentation for `onCollapse` and `hideBelowLg`).
Finding **F1** is new and belongs to `ui/Expandable`.

Stop after DS-6.9C3A. No application changes, no consumer migration.
