export interface CompositionMatrixEntry {
  templateId: string;
  foundation: string;
  operational: string;
  workflow: string;
  platform: string;
  businessFeature: string;
}

/**
 * The required-layers matrix this package's own work order names in
 * Section 10 — for every one of the eight templates above, what each of
 * the five composition-stack layers (DS-5.2's own Composition Stack)
 * contributes. This is a rollup, not new information: every cell restates
 * something already said in that template's own `layout` entries above,
 * organized by layer instead of by named part so the eight templates can
 * be compared side by side.
 */
export const COMPOSITION_MATRIX: CompositionMatrixEntry[] = [
  {
    templateId: "workspace-feature",
    foundation: "Layout primitives and Navigation for any custom arrangement the Platform Workspace doesn't already provide.",
    operational: "Data Grid or Asset Browser for the Library region; Inspector Panel and Dashboard Widgets where no Platform-tier equivalent wraps them.",
    workflow: "State Machine or Pipeline Components for whatever process the domain's own primary object moves through.",
    platform: "A domain's own full Workspace component as the outer shell — the template's defining composition.",
    businessFeature: "Owns which objects populate the workspace and what happens on selection.",
  },
  {
    templateId: "library-feature",
    foundation: "SearchInput and layout primitives if the Platform tier's own list component needs a custom toolbar.",
    operational: "Filter & Search for query and refinement, Data Grid or Asset Browser as the underlying list, Bulk Actions for multi-select.",
    workflow: "Not typically composed at the list level — a selected item opens into a Workspace or Editor Feature that does.",
    platform: "A domain's own Catalog/Providers/Library component as the primary list.",
    businessFeature: "Owns query state and selection behavior.",
  },
  {
    templateId: "editor-feature",
    foundation: "The full Form System for any field type Property Panel doesn't already cover, plus Dialog/Drawer for modal interactions.",
    operational: "Property Panel for structured field editing; Inspector Panel as the shell where no Platform-tier equivalent wraps it.",
    workflow: "State Machine or Approval & Review if the object being edited has a lifecycle the edit must respect.",
    platform: "A domain's own Inspector component as the primary editing surface.",
    businessFeature: "Owns validation rules and save/cancel behavior.",
  },
  {
    templateId: "dashboard-feature",
    foundation: "Card and CardGrid for widget layout; Badge for at-a-glance status.",
    operational: "Dashboard Widget System's own MetricCard, KPIWidget, TrendWidget, ChartWidget, and StatusWidget, arranged in a DashboardGrid.",
    workflow: "Not typically composed — a Dashboard summarizes state rather than modeling process.",
    platform: "A domain's own Metrics/Summary/Diagnostics component as the primary content.",
    businessFeature: "Owns which metrics are shown and their thresholds.",
  },
  {
    templateId: "management-feature",
    foundation: "Table system directly for any custom entity list a Platform-tier Data Grid composition doesn't cover.",
    operational: "Data Grid for the entity list, Bulk Actions for multi-entity operations, Status & Health for entity-level health indicators.",
    workflow: "Approval & Review if changes require sign-off (e.g. a permission grant awaiting approval).",
    platform: "Admin Platform's own AdminUsers/AdminPermissions/AdminConfiguration, or the equivalent management surface for a non-Admin domain.",
    businessFeature: "Owns which entities are manageable and by whom.",
  },
  {
    templateId: "review-feature",
    foundation: "Feedback components (Alert, InlineMessage) for validation results surfaced during review.",
    operational: "Queue & Jobs if reviews are processed from a queue; Status & Health if the review outcome affects a health/quality score.",
    workflow: "Approval & Review's own ApprovalStage/ApprovalDecision or ReviewPanel/ReviewChecklist directly, plus Workflow Timeline for chronology.",
    platform: "A domain's own Inspector or Validation component for the item under review, plus the domain's own Actions component for the decision.",
    businessFeature: "Owns the domain-specific review criteria.",
  },
  {
    templateId: "monitoring-feature",
    foundation: "ProgressBar/ProgressRing and status Badge for lightweight, high-frequency indicators.",
    operational: "Status & Health's own HealthPanel/HealthIssueList/SyncStatusPanel, and Queue & Jobs for in-flight work.",
    workflow: "Workflow Visualization if the monitored activity benefits from a live diagram (e.g. an in-flight pipeline).",
    platform: "A domain's own Diagnostics/Health component as the primary content.",
    businessFeature: "Owns polling/refresh behavior and alert thresholds.",
  },
  {
    templateId: "configuration-feature",
    foundation: "The Form System directly — the most Foundation-heavy template of the eight, since most settings are a handful of form fields with no larger Platform-tier shell around them.",
    operational: "Property Panel for structured setting rows, mirroring the Editor Feature template at a smaller scale.",
    workflow: "Not typically composed — settings are usually stateless configuration, not a multi-step process.",
    platform: "Admin Platform's own AdminConfiguration where the setting is domain-wide; otherwise none — composed directly from Foundation instead.",
    businessFeature: "Owns which settings exist and their validation rules.",
  },
];
