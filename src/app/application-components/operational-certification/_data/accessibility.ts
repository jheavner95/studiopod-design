export interface AccessibilityTopic {
  label: string;
  text: string;
}

export const ACCESSIBILITY_STRENGTHS: AccessibilityTopic[] = [
  {
    label: "Keyboard navigation",
    text: "Verified real across every system audited — native <button>/<input>/<select> elements throughout, Foundation Navigation's SegmentedControl and Tabs both implement full ARIA APG roving-tabindex (arrow/Home/End), and no system substitutes a div-with-onClick for an interactive control.",
  },
  {
    label: "ARIA",
    text: "Verified in source, not just docs prose, across all nine systems: real aria-sort/aria-selected/scope=\"col\" (Data Grid, Queue & Job), role=\"tablist\"/\"tab\"/\"tabpanel\" (Inspector Panel), role=\"listbox\"/\"option\" (Filter & Search), role=\"dialog\" aria-modal (Bulk Actions), role=\"progressbar\"/aria-valuenow (Status & Health, Dashboard Widgets), role=\"img\"/aria-label (Dashboard Widgets' ChartWidget).",
  },
  {
    label: "Color independence",
    text: "Verified in every system that renders a status or trend: HealthIndicator/QueueStatus always pair a dot with a text label, HealthIssueList pairs severity with both an icon and text, and Dashboard Widgets' trend chip pairs a direction icon with the value's own sign — never color alone.",
  },
  {
    label: "Reduced motion",
    text: "Verified where animation exists: Expandable (used by Inspector Panel, Status & Health) and Dialog/Popover (used by Bulk Actions, Filter & Search) both gate their animated transitions behind useMotionPreference()/useMotionEnabled(), falling back to instant show/hide.",
  },
  {
    label: "Focus management",
    text: "Verified for the one real floating-overlay case audited: Foundation Overlay's Dialog uses a genuine useFocusTrap hook (confirmed in Dialog.tsx, not just asserted), inherited unchanged by Bulk Actions' BulkActionConfirmation and, transitively, Queue & Job's JobRetry.",
  },
];

export const ACCESSIBILITY_GAPS: AccessibilityTopic[] = [
  {
    label: "No first-party announcement pattern",
    text: "The single gap every one of the nine independent audits found on its own: no system in the library implements a built-in aria-live region. Selection-count changes (Asset Browser, Bulk Actions), result-count changes (Filter & Search), and status changes (Status & Health, Queue & Job) are all left as an opt-in the consuming screen must add itself. This is a defensible, documented design choice everywhere it appears, but it means zero screens have actually exercised it yet — it is unverified in practice, not just undocumented.",
  },
  {
    label: "Undemonstrated focus composition",
    text: "Inspector Panel's own responsive story depends on the Overlay System's Drawer at narrow widths, but no gallery demo actually nests an Inspector Panel inside a Drawer — so the claim that focus is correctly handed off is architecturally sound but not independently verified end-to-end.",
  },
  {
    label: "Focus lost on refresh",
    text: "Dashboard Widgets' DashboardSection fully unmounts its children while loading=true, so any focus that was inside a widget is dropped when a caller triggers a refresh — a real, unresolved gap, not merely theoretical (confirmed by reading DashboardSection.tsx directly).",
  },
  {
    label: "Documentation accuracy",
    text: "Status & Health's own gallery copy claimed the Provider Health demo's table was sortable when no sort wiring exists anywhere in ProviderHealthPanel.tsx or its demo — found during this certification review and corrected in the same pass (see Files modified in the final report).",
  },
];
