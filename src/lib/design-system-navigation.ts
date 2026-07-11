/**
 * DS-IA.1 — the single navigation registry every /docs/* page and every
 * docs shell component (DocsShell, DocsSidebar, DocsBreadcrumbs, etc.)
 * derives from. Nothing in src/components/docs/ should hand-write a route
 * list; every route list is a query against NAV_REGISTRY.
 *
 * This is an IA OVERLAY, not a migration: every href below points at a
 * route that already exists today (see AGENTS.md's own "do not move
 * existing routes yet" constraint). No file under src/app/application-
 * components/ moved or was renamed as part of this package.
 */

export type NavSectionId =
  | "foundations"
  | "core-components"
  | "marketing-components"
  | "application-components"
  | "workflow-patterns"
  | "documentation";

/**
 * Eight groups: the six canonical Application Components groups this
 * package's own work order names (4.1–4.6), plus two groups this registry
 * adds to avoid orphaning real, existing routes that don't fit any of the
 * six — "app-meta" (the DS-0.3 cross-cutting inventory/coverage/maturity/
 * architecture/templates pages) and "diagram-libraries" (the three pre-
 * DS-4 MS-2.x playgrounds — /platforms, /production, /capabilities — that
 * predate and are explicitly distinct from their same-named DS-4.x
 * counterparts; see the Naming Review in this package's own report).
 * Every other section has exactly one group matching its own section id.
 */
export type NavGroupId =
  | "foundations"
  | "core-components"
  | "marketing-components"
  | "workflow-patterns"
  | "documentation"
  | "app-meta"
  | "workspace-architecture"
  | "foundation-systems"
  | "operational-systems"
  | "workflow-systems"
  | "platform-systems"
  | "certification"
  | "diagram-libraries"
  | "business-features";

export type NavStatus = "certified" | "established" | "placeholder" | "legacy";

export interface NavEntry {
  id: string;
  title: string;
  href: string;
  section: NavSectionId;
  group: NavGroupId;
  /** 0-indexed position within its group — 0 is always that group's own overview/landing entry. */
  order: number;
  description: string;
  status: NavStatus;
  /** id of the entry immediately before this one in reading order, if any. */
  previous?: string;
  /** id of the entry immediately after this one in reading order, if any. */
  next?: string;
  /** ids of entries this page is conceptually related to, outside the linear previous/next chain. */
  related?: string[];
  /** Alternate hrefs, prior names, or same-name-different-route collisions worth surfacing in search/wayfinding. */
  aliases?: string[];
}

export interface NavSection {
  id: NavSectionId;
  title: string;
  href: string;
  description: string;
}

export interface NavGroup {
  id: NavGroupId;
  section: NavSectionId;
  title: string;
  href: string;
  description: string;
}

/** The six canonical top-level sections. Note "Tokens" — a top-level item in the pre-DS-IA GlobalNav (DESIGN_SYSTEM_SECTIONS, 7 entries) — is deliberately absent here per this package's own canonical hierarchy (6 entries); it's folded into Foundations below. See this package's own Naming Review for the full disclosure. */
export const NAV_SECTIONS: NavSection[] = [
  { id: "foundations", title: "Foundations", href: "/foundations", description: "The structural, token, and motion bedrock every other package builds on." },
  { id: "core-components", title: "Core Components", href: "/core-components", description: "The shared UI kit every product surface is built from." },
  { id: "marketing-components", title: "Marketing Components", href: "/marketing-components", description: "Reusable marketing page-section compositions." },
  { id: "application-components", title: "Application Components", href: "/application-components", description: "The Workspace, Foundation, Operational, Workflow, and Platform component libraries the StudioPOD application itself is built from, plus their certification record." },
  { id: "workflow-patterns", title: "Workflow Patterns", href: "/workflow-patterns", description: "Reusable patterns for visualizing StudioPOD's processes end to end." },
  { id: "documentation", title: "Documentation", href: "/documentation", description: "Where the system's principles, package structure, and contribution workflow are written down." },
];

export const NAV_GROUPS: NavGroup[] = [
  { id: "foundations", section: "foundations", title: "Foundations", href: "/foundations", description: "Tokens, layout primitives, the motion engine, and the illustration engine." },
  { id: "core-components", section: "core-components", title: "Core Components", href: "/core-components", description: "Buttons, cards, badges, and form controls." },
  { id: "marketing-components", section: "marketing-components", title: "Marketing Components", href: "/marketing-components", description: "Marketing section compositions and the composition playground." },
  { id: "workflow-patterns", section: "workflow-patterns", title: "Workflow Patterns", href: "/workflow-patterns", description: "The Workflow Diagram Library and end-to-end process visualization patterns." },
  { id: "documentation", section: "documentation", title: "Documentation", href: "/documentation", description: "Project docs and the new documentation IA overlay." },
  { id: "app-meta", section: "application-components", title: "Overview & Meta", href: "/application-components", description: "The cross-cutting inventory, architecture, coverage, maturity, and template views spanning every tier." },
  { id: "workspace-architecture", section: "application-components", title: "Workspace Architecture", href: "/docs/workspace", description: "DS-1 — the six-region workspace shell blueprint every application screen composes." },
  { id: "foundation-systems", section: "application-components", title: "Foundation Systems", href: "/docs/foundation", description: "DS-2.1–2.4 — the generic UI primitives every higher tier composes from." },
  { id: "operational-systems", section: "application-components", title: "Operational Systems", href: "/docs/operational", description: "DS-2.5 — nine composed, ready-to-use panels and screens built on Foundation." },
  { id: "workflow-systems", section: "application-components", title: "Workflow Systems", href: "/docs/workflow", description: "DS-3 — eight domain-agnostic multi-step process and visualization systems." },
  { id: "platform-systems", section: "application-components", title: "Platform Systems", href: "/docs/platform", description: "DS-4 — eight domain-specific component libraries, plus the architecture that governs them." },
  { id: "certification", section: "application-components", title: "Certification", href: "/docs/certification", description: "The five capstone certification and audit reviews, one per tier." },
  { id: "diagram-libraries", section: "application-components", title: "Diagram Libraries", href: "/application-components", description: "Pre-DS-4 illustration-canvas playgrounds — distinct from, and predating, their same-named Platform-tier counterparts." },
  { id: "business-features", section: "application-components", title: "Business Features", href: "/application-components/business-features/production-workspace", description: "DS-5.4+ — real Business Feature pilots composing only certified Platform/Workflow/Operational/Foundation components, validating the DS-5.x composition model end to end." },
];

/**
 * Every routable destination in the Design System, one entry per page.
 * Grouped in the blocks below purely for editability — NAV_REGISTRY itself
 * is a single flat array; every consumer queries it, never a hand-copied
 * subset.
 */
export const NAV_REGISTRY: NavEntry[] = [
  // ---------------------------------------------------------------------
  // Foundations
  // ---------------------------------------------------------------------
  { id: "foundations", title: "Foundations", href: "/foundations", section: "foundations", group: "foundations", order: 0, description: "The structural and motion bedrock every other package builds on.", status: "established", next: "tokens" },
  { id: "tokens", title: "Tokens", href: "/tokens", section: "foundations", group: "foundations", order: 1, description: "Raw and semantic design tokens: color ramps, typography, spacing, radius, and shadow scales.", status: "established", previous: "foundations", next: "motion", aliases: ["Top-level 'Tokens' section in the pre-DS-IA 7-section GlobalNav"] },
  { id: "motion", title: "Motion Engine", href: "/motion", section: "foundations", group: "foundations", order: 2, description: "Semantic motion tokens, hooks, and 14 reusable animation primitives.", status: "established", previous: "tokens", next: "illustrations" },
  { id: "illustrations", title: "Illustration Engine", href: "/illustrations", section: "foundations", group: "foundations", order: 3, description: "The data-driven diagram engine every workflow and architecture visual renders through.", status: "established", previous: "motion", next: "design-system" },
  { id: "design-system", title: "Design System Overview", href: "/design-system", section: "foundations", group: "foundations", order: 4, description: "The consolidated token, typography, layout, motion, and component showcase page.", status: "established", previous: "illustrations", related: ["core-components"], aliases: ["Cross-referenced via #fragment anchors from the old Tokens and Core Components sections too"] },

  // ---------------------------------------------------------------------
  // Core Components
  // ---------------------------------------------------------------------
  { id: "core-components", title: "Core Components", href: "/core-components", section: "core-components", group: "core-components", order: 0, description: "The shared UI kit every product surface — marketing or application — is built from.", status: "established" },

  // ---------------------------------------------------------------------
  // Marketing Components
  // ---------------------------------------------------------------------
  { id: "marketing-components", title: "Marketing Components", href: "/marketing-components", section: "marketing-components", group: "marketing-components", order: 0, description: "Reusable marketing page-section compositions built entirely from Foundation and Core Components.", status: "established", next: "compositions" },
  { id: "compositions", title: "Composition Playground", href: "/compositions", section: "marketing-components", group: "marketing-components", order: 1, description: "11 reusable marketing section compositions: hero, feature grid, CTA, FAQ, testimonial, and more.", status: "established", previous: "marketing-components" },

  // ---------------------------------------------------------------------
  // Application Components — Overview & Meta (DS-0.3)
  // ---------------------------------------------------------------------
  { id: "application-components", title: "Application Components", href: "/application-components", section: "application-components", group: "app-meta", order: 0, description: "The operational libraries the StudioPOD application itself is built from.", status: "established", next: "inventory" },
  { id: "inventory", title: "Component Inventory", href: "/application-components/inventory", section: "application-components", group: "app-meta", order: 1, description: "Every real Application Components entry, in one inventory table.", status: "established", previous: "application-components", next: "architecture" },
  { id: "architecture", title: "Architecture", href: "/application-components/architecture", section: "application-components", group: "app-meta", order: 2, description: "How the Workspace, Foundation, Operational, Workflow, and Platform tiers compose.", status: "established", previous: "inventory", next: "coverage" },
  { id: "coverage", title: "Coverage Matrix", href: "/application-components/coverage", section: "application-components", group: "app-meta", order: 3, description: "Which platforms and patterns each component family actually covers.", status: "established", previous: "architecture", next: "maturity" },
  { id: "maturity", title: "Maturity Model", href: "/application-components/maturity", section: "application-components", group: "app-meta", order: 4, description: "The Concept → Prototype → Production Ready → Certified → Locked ladder every component is scored against.", status: "established", previous: "coverage", next: "templates" },
  { id: "templates", title: "Platform Templates", href: "/application-components/templates", section: "application-components", group: "app-meta", order: 5, description: "Reusable platform-screen templates assembled from certified components.", status: "established", previous: "maturity" },

  // ---------------------------------------------------------------------
  // Application Components — 4.1 Workspace Architecture (DS-1.x)
  // ---------------------------------------------------------------------
  { id: "docs-workspace", title: "Workspace Architecture", href: "/docs/workspace", section: "application-components", group: "workspace-architecture", order: 0, description: "DS-1 — the six-tier workspace blueprint every application screen composes: shell, header, layout, toolbar, asset/primary/inspector regions, and status.", status: "established", next: "workspace-framework" },
  { id: "workspace-framework", title: "Workspace Framework", href: "/application-components/workspace-framework", section: "application-components", group: "workspace-architecture", order: 1, description: "The overall shell anatomy — six regions every workspace screen is composed from.", status: "established", previous: "docs-workspace", next: "workspace-header" },
  { id: "workspace-header", title: "Workspace Header", href: "/application-components/workspace-header", section: "application-components", group: "workspace-architecture", order: 2, description: "The header framework: identity, context, and actions regions.", status: "established", previous: "workspace-framework", next: "workspace-layout" },
  { id: "workspace-layout", title: "Workspace Layout", href: "/application-components/workspace-layout", section: "application-components", group: "workspace-architecture", order: 3, description: "The ten layout rules governing region sizing, breakpoints, and collapse behavior.", status: "established", previous: "workspace-header", next: "workspace-toolbar" },
  { id: "workspace-toolbar", title: "Workspace Toolbar", href: "/application-components/workspace-toolbar", section: "application-components", group: "workspace-architecture", order: 4, description: "The toolbar framework — primary/secondary actions, overflow, and grouping rules.", status: "established", previous: "workspace-layout", next: "asset-workspace" },
  { id: "asset-workspace", title: "Asset Workspace", href: "/application-components/asset-workspace", section: "application-components", group: "workspace-architecture", order: 5, description: "The asset-browsing workspace framework.", status: "established", previous: "workspace-toolbar", next: "primary-workspace" },
  { id: "primary-workspace", title: "Primary Workspace", href: "/application-components/primary-workspace", section: "application-components", group: "workspace-architecture", order: 6, description: "The primary content region framework.", status: "established", previous: "asset-workspace", next: "inspector-workspace" },
  { id: "inspector-workspace", title: "Inspector Workspace", href: "/application-components/inspector-workspace", section: "application-components", group: "workspace-architecture", order: 7, description: "The inspector/detail-panel workspace framework — eight regions.", status: "established", previous: "primary-workspace", next: "status-workspace" },
  { id: "status-workspace", title: "Status Workspace", href: "/application-components/status-workspace", section: "application-components", group: "workspace-architecture", order: 8, description: "The operational status workspace framework — seven regions.", status: "established", previous: "inspector-workspace", next: "workspace-certification" },
  { id: "workspace-certification", title: "Workspace Certification", href: "/application-components/workspace-certification", section: "application-components", group: "workspace-architecture", order: 9, description: "The DS-1 capstone certifying the whole six-tier workspace blueprint.", status: "certified", previous: "status-workspace", next: "docs-foundation", related: ["foundation-audit", "operational-certification", "workflow-certification", "platform-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — 4.2 Foundation Systems (DS-2.1–2.4)
  // ---------------------------------------------------------------------
  { id: "docs-foundation", title: "Foundation Systems", href: "/docs/foundation", section: "application-components", group: "foundation-systems", order: 0, description: "DS-2.1–2.4 — the generic UI primitives with zero business or workflow awareness that every higher tier composes from.", status: "established", previous: "workspace-certification", next: "foundation-components" },
  { id: "foundation-components", title: "Component Catalog", href: "/application-components/foundation-components", section: "application-components", group: "foundation-systems", order: 1, description: "Every Foundation-tier component in one catalog, with status and priority.", status: "established", previous: "docs-foundation", next: "foundation-layout" },
  { id: "foundation-layout", title: "Layout", href: "/application-components/foundation-layout", section: "application-components", group: "foundation-systems", order: 2, description: "Nine layout primitives: Stack, Inline, Grid, Cluster, Surface, Panel, ScrollArea, Separator, DescriptionList.", status: "established", previous: "foundation-components", next: "foundation-table" },
  { id: "foundation-table", title: "Table", href: "/application-components/foundation-table", section: "application-components", group: "foundation-systems", order: 3, description: "The 13-component native table system, including the sticky-column ResponsiveRulesTable extension.", status: "established", previous: "foundation-layout", next: "foundation-metadata" },
  { id: "foundation-metadata", title: "Metadata", href: "/application-components/foundation-metadata", section: "application-components", group: "foundation-systems", order: 4, description: "16 components for identity, status, and structured-value display.", status: "established", previous: "foundation-table", next: "foundation-forms" },
  { id: "foundation-forms", title: "Forms", href: "/application-components/foundation-forms", section: "application-components", group: "foundation-systems", order: 5, description: "23 form field and control components.", status: "established", previous: "foundation-metadata", next: "foundation-overlays" },
  { id: "foundation-overlays", title: "Overlays", href: "/application-components/foundation-overlays", section: "application-components", group: "foundation-systems", order: 6, description: "Tooltip, Popover, Menu, Dialog, Drawer, and CommandPalette.", status: "established", previous: "foundation-forms", next: "foundation-navigation" },
  { id: "foundation-navigation", title: "Navigation", href: "/application-components/foundation-navigation", section: "application-components", group: "foundation-systems", order: 7, description: "Tabs, Breadcrumbs, Pagination, Stepper, SideNavigation, TopNavigation, NavigationRail, TreeNavigation, CommandNavigation, ContextNavigation — the family this package's own docs shell is built from.", status: "established", previous: "foundation-overlays", next: "foundation-feedback" },
  { id: "foundation-feedback", title: "Feedback", href: "/application-components/foundation-feedback", section: "application-components", group: "foundation-systems", order: 8, description: "Alert, Toast, EmptyState, ProgressBar, and status-message components.", status: "established", previous: "foundation-navigation", next: "foundation-audit" },
  { id: "foundation-audit", title: "Foundation Audit", href: "/application-components/foundation-audit", section: "application-components", group: "foundation-systems", order: 9, description: "The DS-2.1.6 capstone auditing the whole Foundation layer.", status: "certified", previous: "foundation-feedback", next: "docs-operational", related: ["workspace-certification", "operational-certification", "workflow-certification", "platform-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — 4.3 Operational Systems (DS-2.5.x)
  // ---------------------------------------------------------------------
  { id: "docs-operational", title: "Operational Systems", href: "/docs/operational", section: "application-components", group: "operational-systems", order: 0, description: "DS-2.5 — nine composed, ready-to-use panels and screens built entirely on Foundation.", status: "established", previous: "foundation-audit", next: "data-grid" },
  { id: "data-grid", title: "Data Grid", href: "/application-components/data-grid", section: "application-components", group: "operational-systems", order: 1, description: "The canonical sortable, selectable, filterable data table.", status: "established", previous: "docs-operational", next: "inspector-panel" },
  { id: "inspector-panel", title: "Inspector Panel", href: "/application-components/inspector-panel", section: "application-components", group: "operational-systems", order: 2, description: "The detail/inspector shell every Platform-tier Inspector re-exports.", status: "established", previous: "data-grid", next: "property-panel" },
  { id: "property-panel", title: "Property Panel", href: "/application-components/property-panel", section: "application-components", group: "operational-systems", order: 3, description: "Structured field editing — toggle, select, number, color rows.", status: "established", previous: "inspector-panel", next: "asset-browser" },
  { id: "asset-browser", title: "Asset Browser", href: "/application-components/asset-browser", section: "application-components", group: "operational-systems", order: 4, description: "Grid/list asset browsing with search, filters, and selection.", status: "established", previous: "property-panel", next: "filter-search" },
  { id: "filter-search", title: "Filter & Search", href: "/application-components/filter-search", section: "application-components", group: "operational-systems", order: 5, description: "SearchField, FilterBar, FilterChip, SavedFilter, and result summaries.", status: "established", previous: "asset-browser", next: "bulk-actions" },
  { id: "bulk-actions", title: "Bulk Actions", href: "/application-components/bulk-actions", section: "application-components", group: "operational-systems", order: 6, description: "Multi-select action bars, confirmation, progress, and undo.", status: "established", previous: "filter-search", next: "status-health" },
  { id: "status-health", title: "Status & Health", href: "/application-components/status-health", section: "application-components", group: "operational-systems", order: 7, description: "HealthPanel, HealthIssueList, ProviderHealthPanel, SyncStatusPanel, and OperationalAlertPanel.", status: "established", previous: "bulk-actions", next: "queue-jobs" },
  { id: "queue-jobs", title: "Queue & Jobs", href: "/application-components/queue-jobs", section: "application-components", group: "operational-systems", order: 8, description: "Queue, JobCard, JobProgress, JobTimeline, and retry/error handling.", status: "established", previous: "status-health", next: "dashboard-widgets" },
  { id: "dashboard-widgets", title: "Dashboard Widgets", href: "/application-components/dashboard-widgets", section: "application-components", group: "operational-systems", order: 9, description: "MetricCard, KPIWidget, TrendWidget, ChartWidget, and five more dashboard tiles.", status: "established", previous: "queue-jobs", next: "operational-certification" },
  { id: "operational-certification", title: "Operational Certification", href: "/application-components/operational-certification", section: "application-components", group: "operational-systems", order: 10, description: "The DS-2.5.10 capstone certifying all nine Operational systems Production Ready.", status: "certified", previous: "dashboard-widgets", next: "docs-workflow", related: ["workspace-certification", "foundation-audit", "workflow-certification", "platform-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — 4.4 Workflow Systems (DS-3.x)
  // ---------------------------------------------------------------------
  { id: "docs-workflow", title: "Workflow Systems", href: "/docs/workflow", section: "application-components", group: "workflow-systems", order: 0, description: "DS-3 — eight domain-agnostic systems for multi-step processes and cross-cutting visualization, built on Foundation and Operational.", status: "established", previous: "operational-certification", next: "workflow-framework", aliases: ["Distinct from the top-level 'Workflow Patterns' section and the pre-DS-3 Workflow Diagram Library at /workflows — see this package's own Naming Review"] },
  { id: "workflow-framework", title: "Workflow Framework", href: "/application-components/workflow-framework", section: "application-components", group: "workflow-systems", order: 1, description: "The shared header/sidebar/stage/step/transition/progress/summary/actions/footer shell every other Workflow system composes from.", status: "established", previous: "docs-workflow", next: "workflow-stepper" },
  { id: "workflow-stepper", title: "Workflow Stepper", href: "/application-components/workflow-stepper", section: "application-components", group: "workflow-systems", order: 2, description: "A multi-step wizard/progress system built on the Workflow Framework shell.", status: "established", previous: "workflow-framework", next: "workflow-timeline" },
  { id: "workflow-timeline", title: "Workflow Timeline", href: "/application-components/workflow-timeline", section: "application-components", group: "workflow-systems", order: 3, description: "A history/audit-trail timeline, later composed by Approval & Review, Pipeline, and State Machine's own *History components.", status: "established", previous: "workflow-stepper", next: "approval-review" },
  { id: "approval-review", title: "Approval & Review", href: "/application-components/approval-review", section: "application-components", group: "workflow-systems", order: 4, description: "The standard approval workflow — Request/Stage/Step/Decision plus a Review workspace.", status: "established", previous: "workflow-timeline", next: "pipeline-components" },
  { id: "pipeline-components", title: "Pipeline Components", href: "/application-components/pipeline-components", section: "application-components", group: "workflow-systems", order: 5, description: "The standard business-pipeline representation, composing Approval & Review's own ApprovalDecision for its Gate component.", status: "established", previous: "approval-review", next: "state-machine" },
  { id: "state-machine", title: "State Machine", href: "/application-components/state-machine", section: "application-components", group: "workflow-systems", order: 6, description: "The standard state-driven-process representation, independently Certified with zero exceptions.", status: "established", previous: "pipeline-components", next: "dependency-relationships" },
  { id: "dependency-relationships", title: "Dependency & Relationships", href: "/application-components/dependency-relationships", section: "application-components", group: "workflow-systems", order: 7, description: "Dependency graphs, relationship views, and impact inspection.", status: "established", previous: "state-machine", next: "workflow-visualization" },
  { id: "workflow-visualization", title: "Workflow Visualization", href: "/application-components/workflow-visualization", section: "application-components", group: "workflow-systems", order: 8, description: "The operational, interactive visualization layer for real application screens — explicitly not the Illustration Library.", status: "established", previous: "dependency-relationships", next: "workflow-certification" },
  { id: "workflow-certification", title: "Workflow Certification", href: "/application-components/workflow-certification", section: "application-components", group: "workflow-systems", order: 9, description: "The DS-3.9 capstone certifying all eight Workflow systems (92 components) Production Ready.", status: "certified", previous: "workflow-visualization", next: "docs-platform", related: ["workspace-certification", "foundation-audit", "operational-certification", "platform-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — 4.5 Platform Systems (DS-4.x)
  // ---------------------------------------------------------------------
  { id: "docs-platform", title: "Platform Systems", href: "/docs/platform", section: "application-components", group: "platform-systems", order: 0, description: "DS-4 — eight domain-specific component libraries scoping business vocabulary onto Foundation, Operational, and Workflow.", status: "established", previous: "workflow-certification", next: "platform-architecture" },
  { id: "platform-architecture", title: "Platform Architecture", href: "/application-components/platform-architecture", section: "application-components", group: "platform-systems", order: 1, description: "The DS-4.1 blueprint every domain platform built against — layer composition, ownership model, and certification ladder.", status: "established", previous: "docs-platform", next: "production-platform", aliases: ["Distinct from the pre-DS-4 Platform Architecture Library Playground at /platforms — see this package's own Naming Review"] },
  { id: "production-platform", title: "Production Platform", href: "/application-components/production-platform", section: "application-components", group: "platform-systems", order: 2, description: "The first domain platform built — 11 pure re-exports plus one thin wrapper (ProductionCanvas).", status: "established", previous: "platform-architecture", next: "product-platform", aliases: ["Distinct from the pre-DS-4 Production & Validation Library Playground at /production — see this package's own Naming Review"] },
  { id: "product-platform", title: "Product Platform", href: "/application-components/product-platform", section: "application-components", group: "platform-systems", order: 3, description: "The first platform to reach 12-of-12 pure re-exports with zero new wrapper code.", status: "established", previous: "production-platform", next: "publishing-platform" },
  { id: "publishing-platform", title: "Publishing Platform", href: "/application-components/publishing-platform", section: "application-components", group: "platform-systems", order: 4, description: "Publishing targets, queue, provider health, and chronological history.", status: "established", previous: "product-platform", next: "commerce-platform" },
  { id: "commerce-platform", title: "Commerce Platform", href: "/application-components/commerce-platform", section: "application-components", group: "platform-systems", order: 5, description: "Catalog, orders, inventory, fulfillment, and pricing.", status: "established", previous: "publishing-platform", next: "intelligence-platform" },
  { id: "intelligence-platform", title: "Intelligence Platform", href: "/application-components/intelligence-platform", section: "application-components", group: "platform-systems", order: 6, description: "Recommendations, opportunities, health, diagnostics, and insights — the widest Operational reuse of any platform.", status: "established", previous: "commerce-platform", next: "operations-platform" },
  { id: "operations-platform", title: "Operations Platform", href: "/application-components/operations-platform", section: "application-components", group: "platform-systems", order: 7, description: "Monitoring, scheduling, automation, health, and alerts.", status: "established", previous: "intelligence-platform", next: "admin-platform" },
  { id: "admin-platform", title: "Admin Platform", href: "/application-components/admin-platform", section: "application-components", group: "platform-systems", order: 8, description: "Users, permissions, configuration, audit, and enrollment.", status: "established", previous: "operations-platform", next: "integrations-platform" },
  { id: "integrations-platform", title: "Integrations Platform", href: "/application-components/integrations-platform", section: "application-components", group: "platform-systems", order: 9, description: "The ninth and final platform — provider registry, connections, mappings, and sync monitoring.", status: "established", previous: "admin-platform", next: "platform-certification" },
  { id: "platform-certification", title: "Platform Certification", href: "/application-components/platform-certification", section: "application-components", group: "platform-systems", order: 10, description: "The DS-4.10 capstone certifying all eight Platform libraries (96 components) Certified.", status: "certified", previous: "integrations-platform", next: "docs-certification", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — 4.6 Certification (cross-cutting rollup)
  // ---------------------------------------------------------------------
  { id: "docs-certification", title: "Certification", href: "/docs/certification", section: "application-components", group: "certification", order: 0, description: "The five capstone certification and audit reviews, one per tier — Workspace, Foundation, Operational, Workflow, and Platform.", status: "established", previous: "platform-certification", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification"] },

  // ---------------------------------------------------------------------
  // Application Components — Diagram Libraries (pre-DS-4, not canonical)
  // ---------------------------------------------------------------------
  { id: "platforms-library", title: "Platform Architecture Library (legacy)", href: "/platforms", section: "application-components", group: "diagram-libraries", order: 0, description: "The pre-DS-4 illustration-canvas Platform Architecture playground — diagram data, not real components.", status: "legacy", related: ["platform-architecture"], aliases: ["Same-name collision with /application-components/platform-architecture — see this package's own Naming Review"] },
  { id: "production-library", title: "Production & Validation Library (legacy)", href: "/production", section: "application-components", group: "diagram-libraries", order: 1, description: "The pre-DS-4 illustration-canvas production/validation playground — diagram data, not real components.", status: "legacy", related: ["production-platform"], aliases: ["Same-name collision with /application-components/production-platform — see this package's own Naming Review"] },
  { id: "capabilities-library", title: "Capability Library (legacy)", href: "/capabilities", section: "application-components", group: "diagram-libraries", order: 2, description: "The pre-DS-4 illustration-canvas capability/provider playground — diagram data, not real components.", status: "legacy", related: ["integrations-platform"] },

  // ---------------------------------------------------------------------
  // Application Components — Business Features (DS-5.4+, real feature pilots)
  // ---------------------------------------------------------------------
  { id: "production-workspace-feature", title: "Production Workspace Feature", href: "/application-components/business-features/production-workspace", section: "application-components", group: "business-features", order: 0, description: "The DS-5.4 pilot — the first real Business Feature, composing only certified Platform/Workflow/Operational/Foundation components with local state and mock data.", status: "established", related: ["production-platform", "business-feature-templates", "application-composition"] },

  // ---------------------------------------------------------------------
  // Workflow Patterns
  // ---------------------------------------------------------------------
  { id: "workflow-patterns", title: "Workflow Patterns", href: "/workflow-patterns", section: "workflow-patterns", group: "workflow-patterns", order: 0, description: "Reusable patterns for visualizing StudioPOD's processes end to end, built on the illustration engine.", status: "established", next: "workflows-library" },
  { id: "workflows-library", title: "Workflow Diagram Library", href: "/workflows", section: "workflow-patterns", group: "workflow-patterns", order: 1, description: "Reusable workflow diagrams that explain StudioPOD's processes from structured data.", status: "established", previous: "workflow-patterns", aliases: ["Distinct from the DS-3.x 'Workflow Systems' Application Components group — see this package's own Naming Review"] },

  // ---------------------------------------------------------------------
  // Documentation
  // ---------------------------------------------------------------------
  { id: "documentation", title: "Documentation", href: "/documentation", section: "documentation", group: "documentation", order: 0, description: "Where the system's principles, package structure, and contribution workflow are written down.", status: "placeholder", next: "docs-root" },
  { id: "docs-root", title: "Documentation Home", href: "/docs", section: "documentation", group: "documentation", order: 1, description: "The new documentation IA overlay — Workspace, Foundation, Operational, Workflow, Platform, and Certification, all in one place.", status: "established", previous: "documentation", next: "application-composition" },
  { id: "application-composition", title: "Application Composition Architecture", href: "/docs/application-composition", section: "documentation", group: "documentation", order: 2, description: "The DS-5.1 architecture defining how Business Features compose the certified Foundation → Operational → Workflow → Platform layers into the real StudioPOD application.", status: "established", previous: "docs-root", next: "business-features", related: ["platform-architecture", "platform-certification"] },
  { id: "business-features", title: "Business Feature Composition Framework", href: "/docs/business-features", section: "documentation", group: "documentation", order: 3, description: "The DS-5.2 framework defining the canonical internal structure, standard template, reusable categories, and composition rules every Business Feature follows.", status: "established", previous: "application-composition", next: "business-feature-templates", related: ["platform-architecture", "platform-certification"] },
  { id: "business-feature-templates", title: "Business Feature Templates", href: "/docs/business-feature-templates", section: "documentation", group: "documentation", order: 4, description: "The DS-5.3 catalog of reusable feature blueprints — standard layouts and a composition matrix for eight of DS-5.2's nine Feature Categories.", status: "established", previous: "business-features", related: ["platform-architecture", "platform-certification"] },
];

// ---------------------------------------------------------------------
// Query helpers — every docs component reads through these, never
// NAV_REGISTRY directly, so the registry can grow without touching
// consumer logic.
// ---------------------------------------------------------------------

export function getEntry(id: string): NavEntry | undefined {
  return NAV_REGISTRY.find((entry) => entry.id === id);
}

export function getEntryByHref(href: string): NavEntry | undefined {
  return NAV_REGISTRY.find((entry) => entry.href === href);
}

export function getSection(id: NavSectionId): NavSection | undefined {
  return NAV_SECTIONS.find((section) => section.id === id);
}

export function getGroup(id: NavGroupId): NavGroup | undefined {
  return NAV_GROUPS.find((group) => group.id === id);
}

export function getGroupsForSection(section: NavSectionId): NavGroup[] {
  return NAV_GROUPS.filter((group) => group.section === section);
}

export function getGroupEntries(group: NavGroupId): NavEntry[] {
  return NAV_REGISTRY.filter((entry) => entry.group === group).sort((a, b) => a.order - b.order);
}

export function getSectionEntries(section: NavSectionId): NavEntry[] {
  return NAV_REGISTRY.filter((entry) => entry.section === section).sort((a, b) => a.order - b.order);
}

export function getPrevious(entry: NavEntry): NavEntry | undefined {
  return entry.previous ? getEntry(entry.previous) : undefined;
}

export function getNext(entry: NavEntry): NavEntry | undefined {
  return entry.next ? getEntry(entry.next) : undefined;
}

export function getRelated(entry: NavEntry): NavEntry[] {
  return (entry.related ?? []).map((id) => getEntry(id)).filter((e): e is NavEntry => !!e);
}

/** The Design System > Section > Group > Current page trail every DocsBreadcrumbs call renders. */
export function getBreadcrumbTrail(entry: NavEntry): { label: string; href?: string }[] {
  const section = getSection(entry.section);
  const group = getGroup(entry.group);
  const trail: { label: string; href?: string }[] = [{ label: "StudioPOD Design System", href: "/" }];
  if (section) trail.push({ label: section.title, href: section.href });
  if (group && group.title !== section?.title) trail.push({ label: group.title, href: group.href });
  trail.push({ label: entry.title });
  return trail;
}

/** The 6 canonical Application Components groups this package's own work order names (4.1–4.6), in order — excludes the two registry-only groups (app-meta, diagram-libraries) added to avoid orphaning pre-existing routes. */
export const CANONICAL_APPLICATION_GROUPS: NavGroupId[] = [
  "workspace-architecture",
  "foundation-systems",
  "operational-systems",
  "workflow-systems",
  "platform-systems",
  "certification",
];
