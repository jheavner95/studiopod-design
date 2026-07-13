# Accessibility Findings

Source: `accessibility-certification`, `operational-certification`, `workflow-certification`, and `application-composition-certification` (all deleted, RM-5). Consolidated by theme rather than by original tier, since the same handful of patterns recur across all four.

## 10 resolved defects (accessibility-certification), each independently re-verified in source at the time

1. **False "richest accessibility wiring" claim** about `src/components/table/`. Grep-verified false: 0 `onKeyDown` handlers and 0 explicit `role=` attributes in `components/table/`, versus 6 `onKeyDown` + 13 `role=` in `overlay/` and 2 `onKeyDown` + 16 `role=` in `navigation/`. Table in fact has the *least* custom interaction wiring of any family, by design — its sortable headers need no custom keyboard handling to audit.
2. **Tooltip label never reached screen readers** (`src/components/overlay/Tooltip.tsx`). `role="tooltip"` content had no `id`, trigger had no `aria-describedby` — the label reached sighted hover/focus users only. Fixed with a `useId()` content id plus `cloneElement` on the trigger to merge in `aria-describedby`, preserving any caller-supplied `aria-describedby`.
3. **Collapsed nav items had empty accessible name** (`src/components/navigation/NavigationItem.tsx`). Icon-only collapsed items relied solely on Tooltip, but Tooltip only adds a visual/hover description, not an accessible name. Fixed with `aria-label={accessibleLabel}` directly on the Link/button, independent of the Tooltip wrapper.
4. **Popover had no way to name itself** (`src/components/overlay/Popover.tsx`). Renders `role="dialog" aria-modal="true"` but had no `labelledBy`/`aria-label`, unlike Dialog/Drawer. Fixed with optional `labelledBy`/`aria-label` props matching Dialog's convention.
5. **Table's scroll container wasn't a keyboard stop** (`src/components/layout/ScrollArea.tsx`). `overflow-x-auto`/`overflow-y-auto` had no `tabIndex` — keyboard users had no way to scroll a region with no early focusable descendant. Fixed with `tabIndex={0}` plus the shared focus-ring class.
6. **ValidationSummary re-derived role logic locally** (`src/components/form/ValidationSummary.tsx`) instead of using the shared `feedbackRole(tone)` helper from `@/components/feedback/Alert`. Fixed by importing it.
7. **PropertyColor's hex input had no accessible name** (`src/components/operational/PropertyColor.tsx`). Fixed with a visually-hidden label span + `aria-labelledby`, following `RadioGroup.tsx`'s id-reference pattern.
8. A demo gallery's search-suggestion pattern was mouse-only despite the shared component's own docstring requiring a full keyboard model (ArrowUp/ArrowDown/Enter/Escape). Fixed by wiring the required keyboard handling.
9. A canonical Tooltip usage example itself modeled the icon-button defect (no `aria-label`, no `aria-hidden` on the decorative icon) — fixed to match the corrected pattern.

## Still-open gaps (confirmed real, not fixed as of the last audit — worth re-checking before relying on this)

- **Popover's two real consumers never adopted the fix**: `src/components/operational/FilterPopover.tsx` and `DataGridColumnPicker.tsx` still don't pass `labelledBy`/`aria-label`.
- **`aria-describedby` gap across all 10 `*Field.tsx` wrappers** in `src/components/form/` — only `DatePickerField` links description text via `aria-describedby`. An earlier claim of "9 of 10 fixed" was never accurate.
- **Touch targets under 24×24 CSS px** (WCAG 2.5.8 AA): `PropertyReset` (~22px), `SavedFilter`'s delete button (~20px), `SearchHistory`'s remove button (~22px), `FilterChip`'s remove button (~20px).
- **Real bug: focus lost on refresh.** `DashboardSection` (`src/components/operational/`) fully unmounts its children while `loading=true`. Any focus inside a widget is dropped the moment a caller triggers a refresh.
- **No first-party `aria-live` region wired into most of the operational/workflow libraries.** Only 2 of 92 Workflow-tier components (`WorkflowStatus.tsx`, `WorkflowStepperProgress.tsx`) and a handful of Operational components (`QueueStatus`, `HealthIndicator`, `BulkStatus`, `DataGridSelection`) call `useAnnounce()`. `PipelineStatus`/`ApprovalStatus` share `WorkflowStatus`'s exact status-map architecture but have zero announce wiring — so otherwise-identical status components behave inconsistently for screen-reader users, for no structural reason.
- **Dashboard Widgets** (`MetricCard`/`KPIWidget`/`TrendWidget`/`ChartWidget`/`StatusWidget`) convey value changes only via re-rendered text/visuals, no live-region announcement.

## The `aria-current` regression and fix (Workflow tier)

`WorkflowStepperStep` never set `aria-current="step"` on the current step, despite explicitly modeling its visual idiom on Foundation Navigation's `Stepper`, which does implement `aria-current` and lists it as a required feature in its own catalog entry. Fixed: `WorkflowStepperStep.tsx` now computes `ariaCurrent = status === "current" ? "step" : undefined` and renders it on both its button and div render paths. The same pattern was confirmed present in six sibling components (`ApprovalStep`, `StateNode`, `WorkflowStep`, `PipelineStep`, `WorkflowNode`); `DependencyNode` has no "current" concept by design and instead gives every status an sr-only label. **Generalizable lesson**: when a component explicitly models its visual idiom on another component, verify it also copied that component's ARIA behavior, not just its visual structure — visual parity was checked, ARIA parity wasn't, and the gap went unnoticed until an explicit accessibility pass.

## Reusable primitives and patterns confirmed in source

- `LiveRegionProvider`/`useAnnounce` (`src/components/feedback/LiveRegion.tsx`) is the one first-party `aria-live` announcement primitive in the codebase.
- `useBodyLock` (`src/hooks/useBodyLock.ts`) + an inert `#app-root` wrapper makes background content genuinely inert (not just visually obscured) while a modal is open. **Hook-ordering lesson, generally reusable**: Menu, Dialog, Drawer, and CommandPalette must call `useBodyLock` *before* `useFocusTrap`, because `useBodyLock`'s cleanup (removing `#app-root`'s `inert` attribute) must run *after* `useFocusTrap`'s cleanup releases focus — get the order backwards and focus can be released into an already-inert tree. When composing a body-lock hook with a focus-trap hook, hook call order determines cleanup (unmount) order.
- `Toast` computes `aria-live="assertive"` when the lead toast's tone is "error", `"polite"` otherwise.
- `TreeNavigation` implements single-tab-stop roving tabindex per the ARIA tree pattern.
- Breadcrumbs' overflow trigger composes `Menu` (which owns its own focus trap/roving keyboard handling) rather than reimplementing it.
- **A re-export-heavy architecture gets accessibility compliance largely as a side effect of composition discipline.** The Platform tier (96 components, 95 of which are one-line re-exports of Operational/Workflow components) inherits keyboard nav, color-independence, and ARIA structure "for free" — the one tier-wide gap it has (no first-party `aria-live`) is inherited from Operational, not introduced by Platform. This is a real argument for re-export-over-reimplementation beyond just reducing code size.

## Focus-restoration lesson (from the Production Workspace pilot — see [retrospective](./08-production-workspace-retrospective.md) for full context)

Deleting a selected item in the same commit that clears its selection state can unmount the element focus would otherwise restore to, silently dropping focus to `<body>`. The fix pattern: track whether a selection existed on the previous render, and on the specific "had one, now don't" transition (not on first mount), explicitly move focus to a known-good fallback target (e.g. an empty-state message) rather than trusting a focus-trap's own restoration step to find a now-detached node.
