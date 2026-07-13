# Duplication & Reuse Discipline

Source: `platform-certification`, `workflow-certification`, `operational-certification`, and `foundation-audit` (all deleted, RM-5).

## Resolved duplication

- **Pagination math** was duplicated across `DataGridPagination` and `AssetPagination` (each inlined an identical "X–Y of Z" calculation). Extracted into a shared `ResultSummary` component; both call sites retrofitted.
- **Table-shaped implementations**: 3 near-identical copies of what became `ResponsiveRulesTable` (126 combined lines) were consolidated into one shared component — Foundation Table's first production adoption. `ScorecardTable`, `CertificationMatrix`, and `CoverageMatrix` were since migrated to genuine native-`<table>` compositions, needing zero new Table API surface after the first migration.
- **Description-list blocks**: all real dl/dt/dd instances (9 of them) now use the shared `DescriptionList` component.
- **`ControlDock` pattern**: 5 near-duplicate files (74–81 lines each, 377 combined lines) manually wiring `ToggleSwitch` controls are now expressed directly via `SwitchField` — though the 5 originals live in playground/showcase code and were not themselves deleted as part of this consolidation (see "still open" below).

## Real reuse chains confirmed by direct source read (not assumed)

- Every top-level shell in the Workflow tier — `Pipeline`, `StateMachine`, `DependencyGraph`, `RelationshipView`, `WorkflowCanvas` — is a literal re-export of Workflow Framework's `Workflow` component, not five near-identical `InspectorPanel` compositions.
- `WorkflowActions`/`WorkflowSummary`/`WorkflowFooter` are re-exported at least six times combined across `ApprovalActions`, `PipelineActions`, `StateActions`, `DependencyActions` (all re-export `WorkflowActions`, itself a re-export of Operational's `InspectorActions`) and `ReviewSummary`/`PipelineSummary`/`StateSummary`/`DependencySummary` (all re-export `WorkflowSummary`).
- `WorkflowEdge`/`WorkflowGroup` are literal re-exports of Dependency & Relationship Views' `DependencyEdge`/`DependencyGroup`.
- `WorkflowSelection` composes Operational's `BulkActionBar` directly and re-exports Data Grid's own selection helpers (`toggleSelection`, `selectAll`, `isAllSelected`, `isPartiallySelected`, `useDataGridSelection`) under workflow-specific names, rather than inventing a bespoke selection model — the same pattern Asset Browser's selection module already established one tier below.
- Across the Platform tier, the same lower-tier component is reused by name across multiple domain platforms rather than reimplemented: `StateHistory` (Publishing, Admin), `ProviderHealthPanel` (Publishing, Operations, Integrations), `RelationshipView` (Product, Integrations), `PipelineStage` (Commerce, Operations, Admin).
- `SegmentedControl` was **extended, not forked**: `AssetViewToggle` needed an icon-only accessible name the shared primitive didn't support. Rather than build a second implementation, the Foundation primitive gained an optional per-option `aria-label` field. **Reusable lesson: extending a shared primitive's API beats forking it, even under schedule pressure.**

## Real, actionable duplication still outstanding (confirmed against source, not estimated)

- **Announce-on-change pattern hand-copied 4 times**: `QueueStatus`, `HealthIndicator`, `BulkStatus` (Operational) and `WorkflowStatus` (Workflow) each independently declare the same ~6-line `useRef` + `useEffect` pattern to announce a value transition, instead of one shared hook (a reasonable name: `usePreviousValueAnnounce`). Rollout is also incomplete: `PipelineStatus` and `ApprovalStatus` share `WorkflowStatus`'s exact architecture but have zero announce wiring.
- **Layout**: 242 raw `flex flex-col gap-N` occurrences remain across 54 files outside the Foundation Layer itself (up from 161 at an earlier count — confirmed real growth, not measurement drift). `flex flex-wrap gap-4` ("CrossLinks" pattern): 14 files. ~11 genuine bordered-card wrappers duplicate Surface/Panel's exact shape.
- **Tables**: 2 hand-rolled table-shaped implementations remain (`InventoryTable`, `MaturityTable`), both blocked on a real capability gap — see [Foundation Layer Architecture](./06-foundation-layer-architecture.md) for the row-collapse story.
- **Metadata**: 3 `_data/regions.ts` files hand-build an identity block (icon + name + type + status) with no shared component; 4 near-duplicate "platform example cards" (19–40 lines each) reimplement the same title-plus-fields shape; 7 files define the same ad hoc label/href relationship-list shape that `RelationshipList` already generalizes.
- **Forms**: a legacy 331-line `FormControlsSection.tsx` predates the Form system entirely, in playground/showcase code.
- **Expandable object-detail panel duplicated three times outside the Operational library**: `src/platforms/components/PlatformDetailsPanel.tsx`, `src/capabilities/components/CapabilityDetails.tsx`, and `src/workflows/components/WorkflowStepDetails.tsx` each hand-roll a shell that `InspectorSection` + `InspectorGroup` + `InspectorProperty` already solves. None of the three is owned by the Operational tier, so this duplication is real and remains live outside the library's own reach.

## Findings investigated and correctly rejected (not duplicates, despite surface similarity)

- Production Platform's illustration-canvas pipeline model vs. the illustration engine's `DiagramPipeline`/`PipelineStage` types — a genuinely different coordinate-positioned SVG rendering layer, not a duplicate of Production's DOM flex/Grid composition.
- The Capability Library (`src/capabilities/`) — investigated in full; genuinely diagram-layer-only (real filter/sort over static fixtures, zero network calls, zero SDK instantiation), not something to migrate away from.
- Production's `HealthDashboardDiagram`/`ProductionHealthCard` — read directly (a 19-line responsive grid mapping metrics to `StatCard` tiles, no score computation/issue list/recommendation layer) and judged too narrow to migrate; the more general abstraction was built alongside it instead of replacing it.
- An artwork's pipeline stage and its own QA/validation status (in the Production Workspace pilot) were kept as two genuinely independent state axes rather than collapsed into one combined value — collapsing them would have been an actual loss of real-world information, not a simplification.

## Methodology worth reusing

When auditing for near-duplicate implementations across tiers, don't just search by name — read the actual code and check whether the two things model the same domain concept at the *same rendering layer*. Two systems can legitimately coexist at different layers (a DOM-composed panel vs. a coordinate-positioned SVG diagram) without either being redundant. Several apparent "duplicates" in this codebase were correctly left alone specifically because this distinction was checked before merging anything.
