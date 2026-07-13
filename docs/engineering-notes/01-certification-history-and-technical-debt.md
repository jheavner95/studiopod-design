# Certification History & Technical Debt

Source: `final-certification` and `enterprise-architecture-audit` (both deleted, RM-5).

## The one load-bearing conclusion

**Zero production Business Features exist anywhere in this codebase.** Exactly one Business-Feature-tier composition was ever built — the Production Workspace pilot (also deleted, RM-5; see [Production Workspace Retrospective](./08-production-workspace-retrospective.md)) — and it was explicitly non-production: mock data, local state, no API or repository layer (confirmed by a repo-wide grep for `fetch`/`axios`/XHR calls in its source, which found none). This is the reason the design system's own internal certification exercise never reached its top "Enterprise Certified" tier: that tier requires real production adoption evidence, which structurally cannot exist yet.

## Dependency graph (verified by direct import-statement parsing, not estimated)

- **2,892 resolved import edges across 1,164 files**, zero reverse dependencies, zero cycles, zero unauthorized Business-Features leakage into any lower tier.
- Tier rank order: **Foundation(0) < Operational(1) < Workflow(2) < Platform(3) < Business Features(4) < Application(5)**.
- Zero `page.tsx` files import `@/components/platform` directly — every live Platform demo renders through an Application-tier gallery component. The one Business Feature pilot was the sole `page.tsx` composing Platform components directly, which is the tier boundary working as intended.
- One legitimate, disclosed layer skip: `ProductionCanvas.tsx` (the one genuinely new file among all 96 Platform-tier components) has a type-only import of `ScrollDirection` directly from Foundation, skipping Operational, because no Operational-owned equivalent type exists.
- Utility substrate (previously undocumented): `src/lib/` has zero internal dependencies (only external `clsx`/`tailwind-merge`) — the true floor of the dependency graph. `src/hooks/` depends only on itself and `src/providers/MotionProvider.tsx`. `src/motion/` depends only on hooks + lib.
- **Reusable practice**: when certifying a layered architecture, don't trust the architecture diagram or each package's own self-report — grep the actual import statements directly, and cross-verify independently per package. This methodology caught real violations elsewhere that documentation alone would have missed (see [Naming Collisions & API Consistency](./03-naming-collisions-and-consistency.md)).

## Terminal technical debt register (21 items, deduplicated across both source files)

**Resolved:**
1. `WorkflowStepperStep` now sets `aria-current="step"` on the current step (see [Accessibility Findings](./02-accessibility-findings.md) for the full regression story).
2. `FilterBar`/`FilterChip` and `PropertyEditor`/`PropertyGroup`/`PropertySection` cross-tier name collisions — both pairs now carry explicit disclosure comments; treated as intentional, disclosed naming rather than a defect.
3. `useProductionWorkspace` wired `useAnnounce()` at 8 call sites (closed the "no aria-live for feature-level state changes" gap for that one feature).
4. `TableRow` keyboard-activation gap — fixed (`tabIndex={0}` + `onKeyDown` firing on Enter/Space when `onClick` is passed).
5. `Popover` `aria-label` on its two real consumers (`FilterPopover`, `DataGridColumnPicker`) — fixed.

**Substantially resolved:**
6. `useAnnounce` is wired into `QueueStatus`, `HealthIndicator`, `BulkStatus`, `DataGridSelection` — but `QueueRow`, `JobProgress`, `BulkProgress` still have no direct call.
7. `MetricCard`/`KPIWidget`/`TrendWidget`/`ChartWidget`/`StatusWidget` still have no direct `useAnnounce` call.

**Still open** (all against currently-live source — worth checking if still true before acting on any of these):
8. `aria-describedby` gap across all 10 `*Field.tsx` wrappers in `src/components/form/` — only `DatePickerField` wires description text to `aria-describedby`; an earlier claim of "9 of 10 fixed" was never true.
9. No `aria-live` pattern on `WorkflowSelection` or State Machine's status-change surfaces (`StateNode` got a different fix instead — see accessibility notes).
10. `WorkflowStep` (type, `src/workflows/types/workflow.ts` and `src/compositions/WorkflowComposition.tsx`) vs. `PipelineStage` (component/interface) naming collisions — unresolved (see [Naming Collisions](./03-naming-collisions-and-consistency.md)).
11. Touch-target sizing under WCAG 2.5.8's 24×24 CSS px minimum on four icon-only affordances: `PropertyReset`, `SavedFilter`'s delete button, `SearchHistory`'s remove button, `FilterChip`'s remove button.
12. `CellAlign` type declared twice, independently, as an unexported local type in both `src/components/table/TableCell.tsx` and `TableHead.tsx` — identical definitions, no shared source.
13. Table's own duplication-tracking data has no `findingCommand` field, unlike Layout/Metadata/Forms which all define one on every entry.

**Unconfirmed** (flagged, never resolved either way):
14. Whether `WorkflowNode`'s selected/filtered boolean-prop pattern should be retrofitted onto `StateNode`/`DependencyNode` for consistency, or remain a deliberate scoped exception.
15. Inspector Panel's Drawer/focus-composition story at narrow widths was never demonstrated end-to-end in any gallery.
16. Dashboard Widgets' `DashboardSection` unmounts focused content on refresh, dropping focus (a real, confirmed bug — see accessibility notes).

## One data-integrity bug worth fixing if this content is ever revived

The 9-platform list in `workspace-certification`'s coverage data included "Product," which had no template or coverage tracking anywhere else in the system (producing a silent `null` figure), and didn't match the actual 8-platform list used elsewhere (which has "Admin" but not "Product"). If any future platform-coverage tracking is rebuilt, reconcile the platform list from a single source rather than three independently-typed lists.
