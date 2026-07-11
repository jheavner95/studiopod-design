export interface LayoutPart {
  name: string;
  composesFrom: string;
}

export interface FeatureTemplate {
  id: string;
  name: string;
  categoryId: string;
  purpose: string;
  layout: LayoutPart[];
}

/**
 * The eight templates this package's own work order names, in the order
 * given (sections 2–9). Each `categoryId` matches a Feature Category id
 * from DS-5.2's own categories.ts — this page doesn't redefine what a
 * Workspace Feature is, only what its standard layout looks like. Every
 * `composesFrom` cites a real, already-certified component by name, the
 * same grounding discipline DS-5.1's own Application Templates and DS-5.2's
 * own Feature Template both used.
 */
export const FEATURE_TEMPLATES: FeatureTemplate[] = [
  {
    id: "workspace-feature",
    name: "Workspace Feature Template",
    categoryId: "workspace-feature",
    purpose: "The broadest template — a full working environment for one domain, composing an entire Platform Workspace rather than a single view within it.",
    layout: [
      { name: "Workspace shell", composesFrom: "A domain's own full Workspace component (e.g. CommerceWorkspace, ProductionWorkspace), composing Workspace Architecture's own six-tier blueprint." },
      { name: "Navigation", composesFrom: "Foundation Navigation's own Tabs, SideNavigation, or NavigationRail, scoped to this feature's own Views." },
      { name: "Primary content", composesFrom: "The feature's own Primary View, composing a domain's own Platform Catalog/Orders/Library component." },
      { name: "Inspector", composesFrom: "A domain's own Platform Inspector re-export, or Operational's own Inspector Panel where no Platform-tier equivalent exists yet." },
      { name: "Commands", composesFrom: "A Platform component's own Actions region, or a Foundation CommandPalette entry for keyboard-driven access." },
      { name: "Metrics", composesFrom: "A domain's own Platform Metrics component, or Operational's own Dashboard Widgets directly." },
      { name: "Actions", composesFrom: "Operational's own Bulk Actions system, or a Platform component's own Actions wrapper around it, for cross-object operations." },
    ],
  },
  {
    id: "library-feature",
    name: "Library Feature Template",
    categoryId: "library-feature",
    purpose: "Browsing, searching, and selecting from a collection of one domain's objects — the most common entry point into a domain's own object set.",
    layout: [
      { name: "Search", composesFrom: "Filter & Search's own SearchField." },
      { name: "Filters", composesFrom: "Filter & Search's own FilterBar, FilterChip, and SavedFilter." },
      { name: "Data Grid / Asset Browser", composesFrom: "Operational's own Data Grid or Asset Browser directly, or a domain's own Platform Catalog/Library component that already wraps one." },
      { name: "Bulk actions", composesFrom: "Operational's own Bulk Actions system." },
      { name: "Inspector", composesFrom: "Opened on row or item selection — a domain's own Platform Inspector re-export, or Operational's own Inspector Panel." },
      { name: "Pagination", composesFrom: "Data Grid's own built-in pagination, or Foundation Navigation's own Pagination component directly for a custom list." },
    ],
  },
  {
    id: "editor-feature",
    name: "Editor Feature Template",
    categoryId: "editor-feature",
    purpose: "Creating or modifying one object in detail — the template for any \"open one thing and change it\" screen.",
    layout: [
      { name: "Canvas / Editor", composesFrom: "The feature's own Primary View — the Illustration Engine's own IllustrationCanvas for a visual/creative surface, or a domain's own Platform Inspector as the primary editing surface for a record-editing feature." },
      { name: "Tool panels", composesFrom: "Operational's own Inspector Panel, or a domain's own Platform Panels region, arranged alongside the Canvas." },
      { name: "Property panel", composesFrom: "Operational's own Property Panel directly, for structured field editing." },
      { name: "Validation", composesFrom: "Foundation's own Form System for field-level validation, plus Foundation Feedback's Alert/InlineMessage for business-rule results." },
      { name: "Actions", composesFrom: "Save/cancel/publish controls, via a domain's own Platform Actions component or a Foundation Button group." },
      { name: "History", composesFrom: "Workflow Timeline directly, or a State Machine's own StateHistory where the edited object has a lifecycle." },
    ],
  },
  {
    id: "dashboard-feature",
    name: "Dashboard Feature Template",
    categoryId: "dashboard-feature",
    purpose: "An at-a-glance overview of one domain's health and activity — the entry point a user lands on before drilling into a Workspace or Library Feature.",
    layout: [
      { name: "KPI widgets", composesFrom: "Dashboard Widget System's own MetricCard, KPIWidget, and TrendWidget." },
      { name: "Charts", composesFrom: "Dashboard Widget System's own ChartWidget." },
      { name: "Health", composesFrom: "Status & Health's own HealthPanel and HealthScore, or a domain's own Platform Health component." },
      { name: "Alerts", composesFrom: "Status & Health's own OperationalAlertPanel, or Dashboard Widget System's own StatusWidget." },
      { name: "Recommendations", composesFrom: "Dashboard Widget System's own RecommendationWidget, or Intelligence Platform's own IntelligenceRecommendations for a domain with real Platform-tier coverage." },
      { name: "Activity", composesFrom: "Dashboard Widget System's own ActivityWidget, or Workflow Timeline directly for a chronological feed." },
    ],
  },
  {
    id: "management-feature",
    name: "Management Feature Template",
    categoryId: "management-feature",
    purpose: "Administering a set of entities in bulk — users, permissions, configuration records — rather than working one at a time.",
    layout: [
      { name: "Data Grid", composesFrom: "Operational's own Data Grid as the entity list, or Admin Platform's own AdminUsers/AdminPermissions for entity-management domains." },
      { name: "Inspector", composesFrom: "A domain's own Platform Inspector re-export, or Operational's own Inspector Panel, opened per selected entity." },
      { name: "Approval", composesFrom: "Approval & Review's own ApprovalStage and ApprovalDecision, composed when a change requires sign-off." },
      { name: "Status", composesFrom: "Status & Health's own StatusPanel and StatusMetric, per entity or in aggregate." },
      { name: "Bulk actions", composesFrom: "Operational's own Bulk Actions system, for multi-entity operations." },
      { name: "Metrics", composesFrom: "Dashboard Widget System's own MetricCard and KPIWidget, for entity-count and health rollups." },
    ],
  },
  {
    id: "review-feature",
    name: "Review Feature Template",
    categoryId: "review-feature",
    purpose: "Evaluating and deciding on something someone else produced — approvals, quality checks, moderation queues.",
    layout: [
      { name: "Workflow", composesFrom: "Workflow Framework's own shell as the outer process container." },
      { name: "Timeline", composesFrom: "Workflow Timeline directly, tracking review progress chronologically." },
      { name: "Approval", composesFrom: "Approval & Review's own ApprovalStage, ApprovalDecision, and ApprovalRequest — the template this system was purpose-built for." },
      { name: "Validation", composesFrom: "Approval & Review's own ReviewChecklist, plus Foundation Feedback for surfaced results." },
      { name: "Comments", composesFrom: "Approval & Review's own ReviewComment." },
      { name: "History", composesFrom: "Approval & Review's own ReviewHistory, or Workflow Timeline directly." },
    ],
  },
  {
    id: "monitoring-feature",
    name: "Monitoring Feature Template",
    categoryId: "monitoring-feature",
    purpose: "Watching ongoing activity in real or near-real time — job queues, sync status, system health — rather than working on a fixed set of records.",
    layout: [
      { name: "Health", composesFrom: "Status & Health's own HealthPanel, SyncStatusPanel, and ProviderHealthPanel." },
      { name: "Queue", composesFrom: "Queue & Jobs' own Queue, JobCard, and JobProgress." },
      { name: "Alerts", composesFrom: "Status & Health's own OperationalAlertPanel." },
      { name: "Dashboard", composesFrom: "Dashboard Widget System's own StatusWidget, QueueWidget, and HealthWidget, arranged as a summary region." },
      { name: "Timeline", composesFrom: "Workflow Timeline directly, for a chronological event feed." },
      { name: "Diagnostics", composesFrom: "A domain's own Platform Diagnostics component (e.g. IntelligenceDiagnostics, IntegrationsDiagnostics), or Status & Health's own HealthIssueList/HealthRecommendation where no Platform-tier equivalent exists yet." },
    ],
  },
  {
    id: "configuration-feature",
    name: "Configuration Feature Template",
    categoryId: "configuration-feature",
    purpose: "Configuring behavior for one domain, one user, or the whole application — narrower and more form-heavy than a Management Feature.",
    layout: [
      { name: "Property panel", composesFrom: "Operational's own Property Panel directly, as the primary editing surface — the smallest, most Foundation-heavy template of the eight." },
      { name: "Validation", composesFrom: "Foundation's own Form System for field-level validation, plus Foundation Feedback for business-rule results." },
      { name: "Preview", composesFrom: "A domain's own Platform component rendering the effect of the setting where one exists — a Configuration Feature is not required to have a live preview." },
      { name: "Actions", composesFrom: "Save/reset/apply controls, via a Foundation Button group or a domain's own Platform Actions component." },
      { name: "History", composesFrom: "Workflow Timeline directly, for an audit trail of configuration changes, where the setting is significant enough to warrant one." },
    ],
  },
];
