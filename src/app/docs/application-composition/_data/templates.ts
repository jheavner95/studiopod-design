export interface ApplicationTemplate {
  id: string;
  name: string;
  purpose: string;
  platformComposition: string;
  workflowComposition: string;
  operationalComposition: string;
  foundationComposition: string;
  extensionBoundary: string;
}

/**
 * The eight standard composition templates this package's own work order
 * names. Every field is a forward-looking composition plan citing real,
 * already-certified components by name — not a description of existing
 * feature code, since no Business Feature has been built yet (see Adoption
 * Targets). A real feature is expected to be a blend of more than one
 * template rather than a pure instance of exactly one.
 */
export const APPLICATION_TEMPLATES: ApplicationTemplate[] = [
  {
    id: "workspace-feature",
    name: "Workspace Feature",
    purpose: "A full working environment for one domain — the broadest template, composing an entire Platform Workspace (DS-1's own Asset/Primary/Inspector regions) rather than a single view within it.",
    platformComposition: "A domain's full Workspace component (e.g. CommerceWorkspace, ProductionWorkspace) as the outer shell.",
    workflowComposition: "Whatever process the domain's own primary object moves through — State Machine or Pipeline Components, composed inside the Platform Workspace's Primary region.",
    operationalComposition: "Data Grid or Asset Browser for the Library region; Inspector Panel for the Inspector region, unless the Platform tier already wraps both.",
    foundationComposition: "Layout primitives (Stack, Grid, Panel) for any custom arrangement the Platform Workspace doesn't already provide.",
    extensionBoundary: "The feature owns which objects populate the workspace and what happens on selection; it does not own the workspace chrome itself.",
  },
  {
    id: "dashboard-feature",
    name: "Dashboard Feature",
    purpose: "An at-a-glance overview of one domain's health and activity — the entry point a user lands on before drilling into a Workspace or Library Feature.",
    platformComposition: "A domain's own Metrics/Summary components (e.g. CommerceMetrics, ProductionMetrics) as the primary content.",
    workflowComposition: "Not typically composed directly — a Dashboard summarizes state rather than modeling process.",
    operationalComposition: "Dashboard Widget System's own MetricCard, KPIWidget, TrendWidget, ChartWidget, and StatusWidget, arranged in a DashboardGrid.",
    foundationComposition: "Card and CardGrid for widget layout; Badge for at-a-glance status.",
    extensionBoundary: "The feature owns which metrics are shown and their thresholds; it does not own the widget rendering itself.",
  },
  {
    id: "library-feature",
    name: "Library Feature",
    purpose: "Browsing, searching, and selecting from a collection of one domain's objects — the most common entry point into a domain's own object set.",
    platformComposition: "A domain's own Catalog/Providers/Library component (e.g. ProductCatalog, IntegrationsProviders) as the primary list.",
    workflowComposition: "Not typically composed directly at the list level; a selected item may open into a Workspace or Editor Feature that does.",
    operationalComposition: "Data Grid or Asset Browser as the underlying list/grid, Filter & Search for query and refinement, Bulk Actions for multi-select operations.",
    foundationComposition: "SearchInput and layout primitives if the Platform tier's own list component needs a custom toolbar.",
    extensionBoundary: "The feature owns query state and selection behavior; it does not own row rendering or filter-chip UI.",
  },
  {
    id: "editor-feature",
    name: "Editor Feature",
    purpose: "Creating or modifying one object in detail — the template for any \"open one thing and change it\" screen.",
    platformComposition: "A domain's own Inspector component (e.g. CommerceInspector, ProductInspector) as the primary editing surface.",
    workflowComposition: "State Machine or Approval & Review if the object being edited has a lifecycle the edit must respect (e.g. can't edit a locked order).",
    operationalComposition: "Property Panel for structured field editing; Inspector Panel as the shell if a Platform-tier equivalent doesn't already wrap it.",
    foundationComposition: "The full Form System (23 components) for any field type a Property Panel row doesn't already cover.",
    extensionBoundary: "The feature owns validation rules and save/cancel behavior; it does not own individual field rendering.",
  },
  {
    id: "review-feature",
    name: "Review Feature",
    purpose: "Evaluating and deciding on something someone else produced — approvals, quality checks, moderation queues.",
    platformComposition: "A domain's own Inspector or Validation component for the item under review, plus the domain's own Actions component for the decision.",
    workflowComposition: "Approval & Review's own ApprovalStage/ApprovalDecision or ReviewPanel/ReviewChecklist directly — this is the template Approval & Review was built for.",
    operationalComposition: "Queue & Jobs if reviews are processed from a queue; Status & Health if the review outcome affects a health/quality score.",
    foundationComposition: "Feedback components (Alert, InlineMessage) for validation results surfaced during review.",
    extensionBoundary: "The feature owns the domain-specific review criteria; it does not own the approval-flow mechanics themselves.",
  },
  {
    id: "management-feature",
    name: "Management Feature",
    purpose: "Administering a set of entities in bulk — users, permissions, configuration records — rather than working one at a time.",
    platformComposition: "Admin Platform's own AdminUsers, AdminPermissions, or AdminConfiguration components, or the equivalent management surface for a non-Admin domain.",
    workflowComposition: "Approval & Review if changes require sign-off (e.g. a permission grant awaiting approval).",
    operationalComposition: "Data Grid for the entity list, Bulk Actions for multi-entity operations, Status & Health for entity-level health indicators.",
    foundationComposition: "Table system directly for any custom entity list a Platform-tier Data Grid composition doesn't cover.",
    extensionBoundary: "The feature owns which entities are manageable and by whom; it does not own the grid/bulk-action mechanics.",
  },
  {
    id: "settings-feature",
    name: "Settings Feature",
    purpose: "Configuring behavior for one domain, one user, or the whole application — narrower and more form-heavy than a Management Feature.",
    platformComposition: "Admin Platform's own AdminConfiguration where the setting is domain-wide; otherwise composed directly from Foundation with no Platform-tier component involved (see Adoption Targets).",
    workflowComposition: "Not typically composed — settings are usually stateless configuration, not a multi-step process.",
    operationalComposition: "Property Panel for structured setting rows, mirroring the Editor Feature template at a smaller scale.",
    foundationComposition: "The Form System directly — Settings Features are expected to be the most Foundation-heavy template, since most settings are a handful of form fields with no larger Platform-tier shell around them.",
    extensionBoundary: "The feature owns which settings exist and their validation; it does not own the underlying form field rendering.",
  },
  {
    id: "monitoring-feature",
    name: "Monitoring Feature",
    purpose: "Watching ongoing activity in real or near-real time — job queues, sync status, system health — rather than working on a fixed set of records.",
    platformComposition: "A domain's own Diagnostics/Health component (e.g. IntelligenceDiagnostics, IntegrationsDiagnostics) as the primary content.",
    workflowComposition: "Workflow Visualization if the monitored activity benefits from a live diagram (e.g. an in-flight pipeline).",
    operationalComposition: "Status & Health's own HealthPanel/HealthIssueList/SyncStatusPanel, and Queue & Jobs for in-flight work.",
    foundationComposition: "ProgressBar/ProgressRing and status Badge for lightweight, high-frequency indicators.",
    extensionBoundary: "The feature owns polling/refresh behavior and alert thresholds; it does not own the health-indicator rendering.",
  },
];
