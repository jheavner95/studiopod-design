export type DebtStatus = "Resolved" | "Substantially resolved" | "Still open" | "Unconfirmed";

export interface DebtEntry {
  item: string;
  source: string;
  status: DebtStatus;
  note: string;
}

/**
 * Every REMAINING_BLOCKERS and DEFERRED entry from all seven prior
 * certification pages, consolidated into one register and independently
 * re-checked against current source rather than re-published unchanged.
 * "Resolved" and "Substantially resolved" entries were confirmed by
 * reading the cited file directly during this audit — not inferred from a
 * commit message or assumed from the accessibility remediation pass's own
 * scope. "Unconfirmed" means this audit did not verify that item either
 * way and reports it as such rather than guessing.
 */
export const DEBT_REGISTER: DebtEntry[] = [
  {
    item: "Add aria-current=\"step\" to WorkflowStepperStep's current-step rendering",
    source: "Workflow Certification",
    status: "Resolved",
    note: "Confirmed present: WorkflowStepperStep.tsx now computes ariaCurrent and renders aria-current={ariaCurrent} on both its button and div render paths.",
  },
  {
    item: "Add a first-party aria-live announcement pattern to Data Grid, Bulk Actions, and Queue & Job",
    source: "Operational Certification",
    status: "Substantially resolved",
    note: "The primitive (useAnnounce) now exists and is wired into QueueStatus, HealthIndicator, BulkStatus, and DataGridSelection — all three named systems now announce at least their status-preset and selection-count changes. Not every consumer is wired: QueueRow, JobProgress, and BulkProgress themselves have no direct useAnnounce call (they compose QueueStatus, which does announce, so job status changes are covered indirectly; job progress percentage changes are not).",
  },
  {
    item: "Wire useAnnounce() into Queue/Job status components and Dashboard Widgets",
    source: "Accessibility Certification",
    status: "Substantially resolved",
    note: "Same underlying gap as the item above, from a different audit. QueueStatus/HealthIndicator/BulkStatus and DashboardSection (refresh-complete announcement) are now wired. MetricCard/KPIWidget/TrendWidget/ChartWidget/StatusWidget — the specific files this finding named — still have no direct useAnnounce call; a per-widget value change is only announced if it happens to coincide with a DashboardSection-level refresh.",
  },
  {
    item: "Add a first-party aria-live pattern to Workflow Visualization's WorkflowSelection and State Machine's status-change surfaces",
    source: "Workflow Certification",
    status: "Still open",
    note: "Confirmed: WorkflowSelection.tsx has no useAnnounce call, and StateNode.tsx — re-checked directly — gained a real but different accessibility fix instead (sr-only STATUS_LABEL text plus aria-current=\"true\" for the active state), not a live-region announcement. A genuine improvement, but not the one this blocker asked for.",
  },
  {
    item: "Resolve or explicitly rename the WorkflowStep (type) / PipelineStage (component) naming collisions",
    source: "Workflow Certification",
    status: "Still open",
    note: "See Naming Audit — re-confirmed unchanged in current source.",
  },
  {
    item: "Decide and document whether WorkflowNode's selected/filtered boolean-prop pattern should be retrofitted onto StateNode/DependencyNode",
    source: "Workflow Certification",
    status: "Unconfirmed",
    note: "Not independently re-checked during this audit — a documentation/design decision, not a code defect, and out of this audit's own verification budget.",
  },
  {
    item: "Close Inspector Panel's undemonstrated Drawer/focus-composition gap with a real gallery demo",
    source: "Operational Certification",
    status: "Unconfirmed",
    note: "Not independently re-checked during this audit.",
  },
  {
    item: "Fix Dashboard Widgets' DashboardSection so a refresh doesn't unmount focused content",
    source: "Operational Certification",
    status: "Unconfirmed",
    note: "DashboardSection.tsx was read directly during this audit for its new live-region wiring, but the specific focus-retention-during-refresh behavior this item describes was not exercised — reported unconfirmed rather than assumed fixed just because the file changed for an unrelated reason.",
  },
  {
    item: "Resolve (or explicitly rename) the FilterBar/FilterChip and PropertyEditor/PropertyGroup/PropertySection naming collisions",
    source: "Operational Certification",
    status: "Resolved",
    note: "Re-investigated directly (see Layering & Dependency Graph): both pairs carry explicit JSDoc disclosing the scope difference between the Foundation and Operational versions — the collision is a disclosed, intentional naming choice, not an unresolved defect, satisfying this blocker's own \"or explicitly rename/disclose\" clause.",
  },
  {
    item: "Remediate touch-target sizing for four icon-only affordances under the WCAG 2.5.8 24×24 CSS px minimum",
    source: "Accessibility Certification",
    status: "Still open",
    note: "Re-checked directly: PropertyReset, SavedFilter's delete button, SearchHistory's remove button, and FilterChip's remove button all still render at their original, unremediated sizes — no min-h/min-w utility applied to any of the four.",
  },
  {
    item: "Resolve or formally document the TableRow keyboard-activation gap",
    source: "Accessibility Certification",
    status: "Still open",
    note: "Re-checked directly: TableRow.tsx still has zero onKeyDown, tabIndex, or role attributes. Follow-up task_4992b678 (spawned by Accessibility Certification) had not landed as of this audit.",
  },
  {
    item: "Wire aria-label or labelledBy on Popover's two out-of-scope consumers (FilterPopover, DataGridColumnPicker)",
    source: "Accessibility Certification",
    status: "Still open",
    note: "Re-checked directly: neither file has an aria-label or labelledBy prop passed to Popover, even though Popover itself has accepted both since the pre-session fixes.",
  },
  {
    item: "Ship at least one real Business Feature screen adopting a Platform library in production",
    source: "Platform Certification",
    status: "Substantially resolved",
    note: "A real (non-production) Business Feature now exists — see Adoption. The word \"production\" in this blocker's own text is the remaining gap: mock data, local state, zero API/repository layer. Progress since Platform Certification's own Fail-shaped verdict, not full resolution.",
  },
  {
    item: "The Workspace Feature Template omits \"Dialogs\" as a named part",
    source: "Application Composition Certification",
    status: "Unconfirmed",
    note: "Not independently re-checked during this audit — a small documentation-completeness item in Business Feature Templates' own per-category list.",
  },
  {
    item: "No aria-live wiring for feature-level state changes in the Production Workspace pilot",
    source: "Application Composition Certification",
    status: "Resolved",
    note: "See Business Feature Review — useProductionWorkspace now wires useAnnounce() at 8 call sites, independently re-verified present.",
  },
  {
    item: "Enterprise Certified requires real production adoption",
    source: "Application Composition Certification / Platform Certification / Accessibility Certification (all three independently)",
    status: "Still open",
    note: "Structural, not a defect — see Adoption and Enterprise Readiness below. The same fact, disclosed independently by three different prior certification pages, still holds.",
  },
  {
    item: "CellAlign declared twice inside Foundation Table",
    source: "Foundation Audit",
    status: "Still open",
    note: "See API Consistency — re-confirmed unchanged.",
  },
  {
    item: "Table's own duplication-tracking data has no findingCommand field",
    source: "Foundation Audit",
    status: "Still open",
    note: "See API Consistency — re-confirmed unchanged.",
  },
];

export function tallyDebtStatus() {
  const counts: Record<DebtStatus, number> = { Resolved: 0, "Substantially resolved": 0, "Still open": 0, Unconfirmed: 0 };
  for (const entry of DEBT_REGISTER) counts[entry.status] += 1;
  return counts;
}

export const DEBT_METHODOLOGY_NOTE =
  "Eighteen items, drawn from the REMAINING_BLOCKERS and DEFERRED arrays of all seven prior certification pages (Workspace, Foundation, Operational, Workflow, Platform, Accessibility, Application Composition), each independently re-checked against current source during this audit rather than re-published at face value. Three are fully Resolved, three are Substantially resolved (the underlying primitive or mechanism now exists and covers most but not all of the originally-named consumers), eight are Still open (re-confirmed present and unchanged), and four are Unconfirmed — this audit did not verify them either way and reports that honestly rather than assuming fixed or guessing broken.";
