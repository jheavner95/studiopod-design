export type DebtStatus = "Resolved" | "Substantially resolved" | "Still open" | "Unconfirmed";

export interface DebtEntry {
  item: string;
  source: string;
  status: DebtStatus;
  note: string;
}

/**
 * The permanent, terminal technical debt register — Enterprise Architecture
 * Audit's own 18-item register, carried forward and reconciled one more
 * time, plus 3 new items this page found while independently re-verifying
 * Workspace (DS-1.9) and Foundation (DS-2.1.6) directly. This is the last
 * time this register moves: DS-6.5 is the terminal package, so items still
 * "Still open" or "Unconfirmed" below are not being handed to a future
 * audit — they are a standing, permanently disclosed limitation of the
 * codebase as of this certification, to be tracked by ordinary engineering
 * work outside the Design System certification series from here on.
 */
export const DEBT_REGISTER: DebtEntry[] = [
  {
    item: "Add aria-current=\"step\" to WorkflowStepperStep's current-step rendering",
    source: "Workflow Certification",
    status: "Resolved",
    note: "Confirmed present at Enterprise Architecture Audit; unchanged since.",
  },
  {
    item: "Resolve (or explicitly rename) the FilterBar/FilterChip and PropertyEditor/PropertyGroup/PropertySection naming collisions",
    source: "Operational Certification",
    status: "Resolved",
    note: "Both pairs carry explicit JSDoc disclosing the scope difference — a disclosed, intentional naming choice, confirmed at Enterprise Architecture Audit and unchanged since.",
  },
  {
    item: "No aria-live wiring for feature-level state changes in the Production Workspace pilot",
    source: "Application Composition Certification",
    status: "Resolved",
    note: "useProductionWorkspace wires useAnnounce() at 8 call sites, confirmed at Enterprise Architecture Audit and unchanged since.",
  },
  {
    item: "Resolve or formally document the TableRow keyboard-activation gap",
    source: "Accessibility Certification",
    status: "Resolved",
    note: "Newly resolved since Enterprise Architecture Audit's own pass — see Accessibility Summary. TableRow.tsx now has real tabIndex/onKeyDown/Enter-Space handling.",
  },
  {
    item: "Wire aria-label or labelledBy on Popover's two out-of-scope consumers (FilterPopover, DataGridColumnPicker)",
    source: "Accessibility Certification",
    status: "Resolved",
    note: "Newly resolved since Enterprise Architecture Audit's own pass — see Accessibility Summary. Both components now pass aria-label to Popover.",
  },
  {
    item: "Add a first-party aria-live announcement pattern to Data Grid, Bulk Actions, and Queue & Job",
    source: "Operational Certification",
    status: "Substantially resolved",
    note: "useAnnounce exists and is wired into QueueStatus, HealthIndicator, BulkStatus, and DataGridSelection. QueueRow, JobProgress, and BulkProgress have no direct call — covered indirectly through the components they compose, not fully. Unchanged since Enterprise Architecture Audit; not independently re-checked this pass.",
  },
  {
    item: "Wire useAnnounce() into Queue/Job status components and Dashboard Widgets",
    source: "Accessibility Certification",
    status: "Substantially resolved",
    note: "Same underlying gap as the item above. MetricCard/KPIWidget/TrendWidget/ChartWidget/StatusWidget still have no direct useAnnounce call. Unchanged since Enterprise Architecture Audit; not independently re-checked this pass.",
  },
  {
    item: "Ship at least one real Business Feature screen adopting a Platform library in production",
    source: "Platform Certification",
    status: "Substantially resolved",
    note: "A real, non-production Business Feature exists (Production Workspace). \"Production\" remains the unmet word in this blocker's own text. Unchanged since Enterprise Architecture Audit.",
  },
  {
    item: "Field description text was never wired to aria-describedby — 10 of 10 field types, not the 9-of-10 previously reported",
    source: "Foundation Audit (claim originally wrong; reopened by DS-6.5)",
    status: "Still open",
    note: "Newly reopened this pass — see Accessibility Summary. Foundation Audit's own claim that DatePickerField was the one exception was never true, and Enterprise Architecture Audit repeated the \"now resolved tier-wide\" claim without independently re-checking it. The gap is real and applies to all 10 field types.",
  },
  {
    item: "The workspace blueprint's \"six tiers\" claim doesn't match its own five-populated-tier data",
    source: "Workspace Certification (found by DS-6.5)",
    status: "Still open",
    note: "Newly found this pass — see Architecture Summary. Tier 5 does not exist in BLUEPRINT_NODES; the diagram renders five bands, not six. Predates this audit; never previously caught.",
  },
  {
    item: "\"Every workspace architecture page documents accessibility as a first-class section\" overclaims for two DS-1 pages",
    source: "Workspace Certification (found by DS-6.5)",
    status: "Still open",
    note: "Newly found this pass — see Architecture Summary and Accessibility Summary. Workspace Framework has one passing bullet; Workspace Layout has none.",
  },
  {
    item: "Add a first-party aria-live pattern to Workflow Visualization's WorkflowSelection and State Machine's status-change surfaces",
    source: "Workflow Certification",
    status: "Still open",
    note: "WorkflowSelection has no useAnnounce call. StateNode gained a different, real fix instead (sr-only status text, aria-current). Unchanged since Enterprise Architecture Audit; not independently re-checked this pass.",
  },
  {
    item: "Resolve or explicitly rename the WorkflowStep (type) / PipelineStage (component) naming collisions",
    source: "Workflow Certification",
    status: "Still open",
    note: "Unchanged since first disclosed. Not independently re-checked this pass.",
  },
  {
    item: "Remediate touch-target sizing for four icon-only affordances under the WCAG 2.5.8 24×24 CSS px minimum",
    source: "Accessibility Certification",
    status: "Still open",
    note: "PropertyReset, SavedFilter's delete button, SearchHistory's remove button, and FilterChip's remove button remain unremediated. Unchanged since Enterprise Architecture Audit; not independently re-checked this pass.",
  },
  {
    item: "CellAlign declared twice inside Foundation Table",
    source: "Foundation Audit",
    status: "Still open",
    note: "Still independently declared as an unexported local type in TableCell.tsx and TableHead.tsx. Unchanged since Enterprise Architecture Audit.",
  },
  {
    item: "Table's own duplication-tracking data has no findingCommand field",
    source: "Foundation Audit",
    status: "Still open",
    note: "Unchanged since Enterprise Architecture Audit; not independently re-checked this pass.",
  },
  {
    item: "Enterprise Certified requires real production adoption",
    source: "Application Composition / Platform / Accessibility Certification (independently) / Enterprise Architecture Audit",
    status: "Still open",
    note: "Structural, not a defect. The same fact, disclosed independently by four prior certification pages, still holds — see Final Verdict. This is the one item this terminal page does not attempt to close, because closing it requires shipping a production feature, not auditing more carefully.",
  },
  {
    item: "Decide and document whether WorkflowNode's selected/filtered boolean-prop pattern should be retrofitted onto StateNode/DependencyNode",
    source: "Workflow Certification",
    status: "Unconfirmed",
    note: "A documentation/design decision, not a code defect. Not independently re-checked this pass — outside this page's own verification budget, same as at Enterprise Architecture Audit.",
  },
  {
    item: "Close Inspector Panel's undemonstrated Drawer/focus-composition gap with a real gallery demo",
    source: "Operational Certification",
    status: "Unconfirmed",
    note: "Not independently re-checked this pass.",
  },
  {
    item: "Fix Dashboard Widgets' DashboardSection so a refresh doesn't unmount focused content",
    source: "Operational Certification",
    status: "Unconfirmed",
    note: "Not independently re-checked this pass. This page's own verification budget concentrated on Workspace, Foundation, and Operational's quantitative claims, Accessibility's two open items, and the documentation registry itself — not every named behavior in every prior register.",
  },
  {
    item: "The Workspace Feature Template omits \"Dialogs\" as a named part",
    source: "Application Composition Certification",
    status: "Unconfirmed",
    note: "A small documentation-completeness item. Not independently re-checked this pass.",
  },
];

export function tallyDebtStatus() {
  const counts: Record<DebtStatus, number> = { Resolved: 0, "Substantially resolved": 0, "Still open": 0, Unconfirmed: 0 };
  for (const entry of DEBT_REGISTER) counts[entry.status] += 1;
  return counts;
}

export const DEBT_METHODOLOGY_NOTE =
  "21 items — Enterprise Architecture Audit's own 18-item register, minus two items this page independently confirmed now Resolved (TableRow keyboard activation, Popover aria-label), plus three new items this page found while directly re-verifying Workspace and Foundation certifications for the first time since their original authorship. This is the terminal register: DS-6.5 does not hand off open items to a next package, because there isn't one. 5 are Resolved, 3 Substantially resolved, 9 Still open, 4 Unconfirmed — a real, disclosed, and now permanent record of where the Design System's own quality bar stands.";
