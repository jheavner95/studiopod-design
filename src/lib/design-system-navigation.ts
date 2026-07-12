/**
 * DS-7.1 — the product information architecture. This registry replaces
 * the DS-IA.1 tier-first taxonomy (Workspace/Foundation/Operational/
 * Workflow/Platform "Systems" as primary navigation) with a goal-first
 * one: Overview, Components, Patterns, Applications, Architecture,
 * Playground, Quality. Every href below points at a route that already
 * existed before this package — DS-7.1 is a navigation-model rewrite,
 * not a file migration. No src/app/ route was moved or renamed; pages
 * that used to double as top-level section landings (application-components,
 * docs, docs/certification, workflow-patterns) were reframed in place to
 * serve their new section instead, exactly like every entry below was
 * reframed rather than rebuilt.
 *
 * The old tier concepts (Foundation/Operational/Workflow/Platform/
 * Business Feature) still exist as real documentation — see the
 * "architecture" section below — they're just no longer the spine of
 * primary navigation.
 */

export type NavSectionId = "overview" | "components" | "patterns" | "applications" | "architecture" | "playground" | "quality";

/**
 * DS-7.1's own family-based grouping. "Components" is organized by what a
 * builder reaches for (Layout, Navigation, Data Display, Forms, Overlays,
 * Feedback, Search & Filter, Inspector & Properties, Workflow & Process),
 * not by which historical DS package built it. Workspace shell docs moved
 * to "architecture" (composition rules, not a pick-up-and-use widget).
 * Platform-tier libraries moved to "applications" (domain compositions,
 * not generic components) per this package's own Part 5.
 */
export type NavGroupId =
  | "overview"
  | "components-overview"
  | "patterns-overview"
  | "applications-overview"
  | "architecture-overview"
  | "playground-overview"
  | "quality-overview"
  | "foundations-tokens"
  | "layout"
  | "navigation"
  | "data-display"
  | "forms"
  | "overlays"
  | "feedback"
  | "search-filter"
  | "inspector"
  | "workflow-process"
  | "core-ui"
  | "marketing"
  | "platform-templates"
  | "process-diagrams"
  | "platforms"
  | "business-features"
  | "workspace-shell"
  | "tier-model"
  | "platform-architecture"
  | "application-composition"
  | "visual-tools"
  | "interactive-demos"
  | "legacy-experiments"
  | "certifications"
  | "tracking";

export type NavStatus = "certified" | "established" | "placeholder" | "legacy";

/**
 * The five DS-6.1 page archetypes, unchanged by this package — DS-7.1
 * reorganizes WHERE pages live, not what shape they are.
 */
export type NavPageType = "landing" | "reference" | "pattern" | "architecture" | "certification";

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
  pageType: NavPageType;
  /** id of the entry immediately before this one in reading order, if any. */
  previous?: string;
  /** id of the entry immediately after this one in reading order, if any. */
  next?: string;
  /** ids of entries this page is conceptually related to, outside the linear previous/next chain. */
  related?: string[];
  /** Alternate hrefs, prior names, prior section/group framing, or same-name-route collisions worth surfacing in search/wayfinding. */
  aliases?: string[];
}

export interface NavSection {
  id: NavSectionId;
  title: string;
  href: string;
  description: string;
  /** One-line answer to "who is this section for" — DS-7.1 Part 3's own required field. */
  audience: string;
}

export interface NavGroup {
  id: NavGroupId;
  section: NavSectionId;
  title: string;
  href: string;
  description: string;
}

/** The seven top-level sections DS-7.1 Part 3 asked for, replacing the six tier-first sections DS-IA.1 shipped. */
export const NAV_SECTIONS: NavSection[] = [
  { id: "overview", title: "Overview", href: "/", description: "What the StudioPOD Design System is, who it's for, and where to start.", audience: "Anyone arriving for the first time." },
  { id: "components", title: "Components", href: "/application-components", description: "The reusable component library — Foundation and Operational tier widgets, organized by family instead of by build history.", audience: "Engineers building or extending a screen." },
  { id: "patterns", title: "Patterns", href: "/workflow-patterns", description: "Reusable compositions and templates for recurring problems — process visualization, feature layouts, platform screens.", audience: "Engineers and designers assembling a new feature." },
  { id: "applications", title: "Applications", href: "/applications", description: "The eight domain-specific platform libraries and the one real Business Feature pilot, presented as application compositions.", audience: "Anyone evaluating how a real StudioPOD surface is built." },
  { id: "architecture", title: "Architecture", href: "/docs", description: "The composition rules and layering model — workspace shell, tier stack, platform architecture, application composition — with no live examples, just relationships.", audience: "Architects and anyone auditing how the system fits together." },
  { id: "playground", title: "Playground", href: "/playground", description: "Interactive exploration tools — token/color/typography explorers, the motion and illustration engines, the composition device-preview tool — kept separate from reference documentation.", audience: "Anyone exploring or prototyping, not looking for API reference." },
  { id: "quality", title: "Quality", href: "/docs/certification", description: "Every certification, audit, and coverage/maturity tracking view — the system's own evidence trail.", audience: "Anyone assessing whether the system is production-ready." },
];

export const NAV_GROUPS: NavGroup[] = [
  { id: "overview", section: "overview", title: "Overview", href: "/", description: "The homepage and the system's own principles." },

  { id: "components-overview", section: "components", title: "Components Overview", href: "/application-components", description: "The full component library, organized by family." },
  { id: "foundations-tokens", section: "components", title: "Foundations & Tokens", href: "/foundations", description: "Design tokens and the bedrock every other family builds on." },
  { id: "layout", section: "components", title: "Layout", href: "/application-components/foundation-layout", description: "Stack, Inline, Grid, Cluster, Surface, Panel, ScrollArea, Separator, DescriptionList." },
  { id: "navigation", section: "components", title: "Navigation", href: "/application-components/foundation-navigation", description: "Tabs, Breadcrumbs, Pagination, Stepper, side/top nav, and tree/command navigation." },
  { id: "data-display", section: "components", title: "Data Display", href: "/application-components/foundation-table", description: "Table, Metadata, Data Grid, Dashboard Widgets, Queue & Jobs, and Asset Browser." },
  { id: "forms", section: "components", title: "Forms", href: "/application-components/foundation-forms", description: "23 form field and control components." },
  { id: "overlays", section: "components", title: "Overlays", href: "/application-components/foundation-overlays", description: "Tooltip, Popover, Menu, Dialog, Drawer, CommandPalette." },
  { id: "feedback", section: "components", title: "Feedback", href: "/application-components/foundation-feedback", description: "Alerts, toasts, status and health surfaces, bulk-action feedback." },
  { id: "search-filter", section: "components", title: "Search & Filter", href: "/application-components/filter-search", description: "SearchField, FilterBar, FilterChip, SavedFilter, result summaries." },
  { id: "inspector", section: "components", title: "Inspector & Properties", href: "/application-components/inspector-panel", description: "The detail/inspector shell and structured property editing." },
  { id: "workflow-process", section: "components", title: "Workflow & Process", href: "/application-components/workflow-framework", description: "Multi-step process, timeline, approval, pipeline, state-machine, and dependency-graph systems." },
  { id: "core-ui", section: "components", title: "Core UI Kit", href: "/core-components", description: "The shared UI kit every product surface — marketing or application — is built from." },
  { id: "marketing", section: "components", title: "Marketing Sections", href: "/marketing-components", description: "Reusable marketing page-section compositions." },

  { id: "patterns-overview", section: "patterns", title: "Patterns Overview", href: "/workflow-patterns", description: "Reusable compositions for recurring problems." },
  { id: "platform-templates", section: "patterns", title: "Platform Templates", href: "/application-components/templates", description: "Reusable platform-screen and Business Feature templates." },
  { id: "process-diagrams", section: "patterns", title: "Process Diagrams", href: "/workflows", description: "Reusable workflow diagrams generated from structured data." },

  { id: "applications-overview", section: "applications", title: "Applications Overview", href: "/applications", description: "The eight domain platforms and the real Business Feature pilot." },
  { id: "platforms", section: "applications", title: "Platforms", href: "/application-components/production-platform", description: "Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations." },
  { id: "business-features", section: "applications", title: "Business Features", href: "/application-components/business-features/production-workspace", description: "Real feature pilots composing only certified components with local state and mock data." },

  { id: "architecture-overview", section: "architecture", title: "Architecture Overview", href: "/docs", description: "The composition rules and layering model." },
  { id: "workspace-shell", section: "architecture", title: "Workspace Shell", href: "/docs/workspace", description: "The six-region workspace blueprint every application screen composes." },
  { id: "tier-model", section: "architecture", title: "Tier Model", href: "/application-components/architecture", description: "How Foundation, Operational, Workflow, and Platform compose into the tier stack." },
  { id: "platform-architecture", section: "architecture", title: "Platform Architecture", href: "/application-components/platform-architecture", description: "The blueprint every domain platform is built against." },
  { id: "application-composition", section: "architecture", title: "Application Composition", href: "/docs/application-composition", description: "How Business Features compose the certified tier stack into the real application." },

  { id: "playground-overview", section: "playground", title: "Playground Overview", href: "/playground", description: "Interactive exploration tools, kept separate from reference docs." },
  { id: "visual-tools", section: "playground", title: "Visual Tools", href: "/design-system", description: "Token, color, typography, and layout exploration; the motion and illustration engines." },
  { id: "interactive-demos", section: "playground", title: "Interactive Demos", href: "/compositions", description: "Device-preview composition playground." },
  { id: "legacy-experiments", section: "playground", title: "Archived Experiments", href: "/platforms", description: "Pre-DS-4 illustration-canvas playgrounds, kept reachable but superseded by their Platform-tier counterparts." },

  { id: "quality-overview", section: "quality", title: "Quality Overview", href: "/docs/certification", description: "Every certification and audit, plus coverage/maturity tracking." },
  { id: "certifications", section: "quality", title: "Certifications", href: "/application-components/workspace-certification", description: "The nine capstone certification and audit reviews." },
  { id: "tracking", section: "quality", title: "Tracking", href: "/application-components/inventory", description: "Component inventory, coverage matrix, and maturity model." },
];

export const NAV_REGISTRY: NavEntry[] = [
  // ---------------------------------------------------------------------
  // Overview
  // ---------------------------------------------------------------------
  { id: "home", title: "StudioPOD Design System", href: "/", section: "overview", group: "overview", order: 0, description: "What this is, who it's for, and where to begin.", status: "established", pageType: "landing", next: "documentation" },
  { id: "documentation", title: "About & Principles", href: "/documentation", section: "overview", group: "overview", order: 1, description: "The system's own principles, package structure, and contribution workflow.", status: "placeholder", pageType: "landing", previous: "home" },

  // ---------------------------------------------------------------------
  // Components — Overview & Foundations
  // ---------------------------------------------------------------------
  { id: "application-components", title: "Components", href: "/application-components", section: "components", group: "components-overview", order: 0, description: "The full reusable component library, organized by family.", status: "established", pageType: "landing", next: "foundations", aliases: ["Formerly the DS-0.3/Application Components tier landing"] },
  { id: "foundation-components", title: "Foundation Catalog", href: "/application-components/foundation-components", section: "components", group: "components-overview", order: 1, description: "The full Foundation-tier component catalog — purpose, status, maturity, required states, and accessibility contract for every component, plus a live coverage summary and implementation backlog.", status: "established", pageType: "reference", related: ["foundation-layout", "foundation-table", "foundation-audit"], aliases: ["Orphaned by the DS-7.1 registry rewrite until Part 9's legacy audit added it back — see the Naming Review"] },
  { id: "foundations", title: "Foundations", href: "/foundations", section: "components", group: "foundations-tokens", order: 0, description: "The structural and motion bedrock every other family builds on.", status: "established", pageType: "landing", previous: "application-components", next: "tokens" },
  { id: "tokens", title: "Tokens", href: "/tokens", section: "components", group: "foundations-tokens", order: 1, description: "Raw and semantic design tokens: color ramps, typography, spacing, radius, and shadow scales.", status: "established", pageType: "reference", previous: "foundations", related: ["design-system"] },

  // ---------------------------------------------------------------------
  // Components — Layout
  // ---------------------------------------------------------------------
  { id: "foundation-layout", title: "Layout", href: "/application-components/foundation-layout", section: "components", group: "layout", order: 0, description: "Nine layout primitives: Stack, Inline, Grid, Cluster, Surface, Panel, ScrollArea, Separator, DescriptionList.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Navigation
  // ---------------------------------------------------------------------
  { id: "foundation-navigation", title: "Navigation", href: "/application-components/foundation-navigation", section: "components", group: "navigation", order: 0, description: "Tabs, Breadcrumbs, Pagination, Stepper, SideNavigation, TopNavigation, NavigationRail, TreeNavigation, CommandNavigation, ContextNavigation.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Data Display
  // ---------------------------------------------------------------------
  { id: "foundation-table", title: "Table", href: "/application-components/foundation-table", section: "components", group: "data-display", order: 0, description: "The 13-component native table system, including the sticky-column ResponsiveRulesTable extension.", status: "established", pageType: "reference", next: "foundation-metadata" },
  { id: "foundation-metadata", title: "Metadata", href: "/application-components/foundation-metadata", section: "components", group: "data-display", order: 1, description: "16 components for identity, status, and structured-value display.", status: "established", pageType: "reference", previous: "foundation-table", next: "data-grid" },
  { id: "data-grid", title: "Data Grid", href: "/application-components/data-grid", section: "components", group: "data-display", order: 2, description: "The canonical sortable, selectable, filterable data table.", status: "established", pageType: "reference", previous: "foundation-metadata", next: "asset-browser" },
  { id: "asset-browser", title: "Asset Browser", href: "/application-components/asset-browser", section: "components", group: "data-display", order: 3, description: "Grid/list asset browsing with search, filters, and selection.", status: "established", pageType: "reference", previous: "data-grid", next: "queue-jobs" },
  { id: "queue-jobs", title: "Queue & Jobs", href: "/application-components/queue-jobs", section: "components", group: "data-display", order: 4, description: "Queue, JobCard, JobProgress, JobTimeline, and retry/error handling.", status: "established", pageType: "reference", previous: "asset-browser", next: "dashboard-widgets" },
  { id: "dashboard-widgets", title: "Dashboard Widgets", href: "/application-components/dashboard-widgets", section: "components", group: "data-display", order: 5, description: "MetricCard, KPIWidget, TrendWidget, ChartWidget, and five more dashboard tiles.", status: "established", pageType: "reference", previous: "queue-jobs" },

  // ---------------------------------------------------------------------
  // Components — Forms
  // ---------------------------------------------------------------------
  { id: "foundation-forms", title: "Forms", href: "/application-components/foundation-forms", section: "components", group: "forms", order: 0, description: "23 form field and control components.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Overlays
  // ---------------------------------------------------------------------
  { id: "foundation-overlays", title: "Overlays", href: "/application-components/foundation-overlays", section: "components", group: "overlays", order: 0, description: "Tooltip, Popover, Menu, Dialog, Drawer, and CommandPalette.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Feedback
  // ---------------------------------------------------------------------
  { id: "foundation-feedback", title: "Feedback", href: "/application-components/foundation-feedback", section: "components", group: "feedback", order: 0, description: "Alert, Toast, EmptyState, ProgressBar, and status-message components.", status: "established", pageType: "reference", next: "status-health" },
  { id: "status-health", title: "Status & Health", href: "/application-components/status-health", section: "components", group: "feedback", order: 1, description: "HealthPanel, HealthIssueList, ProviderHealthPanel, SyncStatusPanel, and OperationalAlertPanel.", status: "established", pageType: "reference", previous: "foundation-feedback", next: "bulk-actions" },
  { id: "bulk-actions", title: "Bulk Actions", href: "/application-components/bulk-actions", section: "components", group: "feedback", order: 2, description: "Multi-select action bars, confirmation, progress, and undo.", status: "established", pageType: "reference", previous: "status-health" },

  // ---------------------------------------------------------------------
  // Components — Search & Filter
  // ---------------------------------------------------------------------
  { id: "filter-search", title: "Filter & Search", href: "/application-components/filter-search", section: "components", group: "search-filter", order: 0, description: "SearchField, FilterBar, FilterChip, SavedFilter, and result summaries.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Inspector & Properties
  // ---------------------------------------------------------------------
  { id: "inspector-panel", title: "Inspector Panel", href: "/application-components/inspector-panel", section: "components", group: "inspector", order: 0, description: "The detail/inspector shell every Platform-tier Inspector re-exports.", status: "established", pageType: "reference", next: "property-panel" },
  { id: "property-panel", title: "Property Panel", href: "/application-components/property-panel", section: "components", group: "inspector", order: 1, description: "Structured field editing — toggle, select, number, color rows.", status: "established", pageType: "reference", previous: "inspector-panel" },

  // ---------------------------------------------------------------------
  // Components — Workflow & Process
  // ---------------------------------------------------------------------
  { id: "workflow-framework", title: "Workflow Framework", href: "/application-components/workflow-framework", section: "components", group: "workflow-process", order: 0, description: "The shared header/sidebar/stage/step/transition/progress/summary/actions/footer shell every other Workflow system composes from.", status: "established", pageType: "reference", next: "workflow-stepper" },
  { id: "workflow-stepper", title: "Workflow Stepper", href: "/application-components/workflow-stepper", section: "components", group: "workflow-process", order: 1, description: "A multi-step wizard/progress system built on the Workflow Framework shell.", status: "established", pageType: "reference", previous: "workflow-framework", next: "workflow-timeline" },
  { id: "workflow-timeline", title: "Workflow Timeline", href: "/application-components/workflow-timeline", section: "components", group: "workflow-process", order: 2, description: "A history/audit-trail timeline, later composed by Approval & Review, Pipeline, and State Machine's own *History components.", status: "established", pageType: "reference", previous: "workflow-stepper", next: "approval-review" },
  { id: "approval-review", title: "Approval & Review", href: "/application-components/approval-review", section: "components", group: "workflow-process", order: 3, description: "The standard approval workflow — Request/Stage/Step/Decision plus a Review workspace.", status: "established", pageType: "reference", previous: "workflow-timeline", next: "pipeline-components" },
  { id: "pipeline-components", title: "Pipeline Components", href: "/application-components/pipeline-components", section: "components", group: "workflow-process", order: 4, description: "The standard business-pipeline representation, composing Approval & Review's own ApprovalDecision for its Gate component.", status: "established", pageType: "reference", previous: "approval-review", next: "state-machine" },
  { id: "state-machine", title: "State Machine", href: "/application-components/state-machine", section: "components", group: "workflow-process", order: 5, description: "The standard state-driven-process representation, independently Certified with zero exceptions.", status: "established", pageType: "reference", previous: "pipeline-components", next: "dependency-relationships" },
  { id: "dependency-relationships", title: "Dependency & Relationships", href: "/application-components/dependency-relationships", section: "components", group: "workflow-process", order: 6, description: "Dependency graphs, relationship views, and impact inspection.", status: "established", pageType: "reference", previous: "state-machine", next: "workflow-visualization" },
  { id: "workflow-visualization", title: "Workflow Visualization", href: "/application-components/workflow-visualization", section: "components", group: "workflow-process", order: 7, description: "The operational, interactive visualization layer for real application screens — explicitly not the Illustration Library.", status: "established", pageType: "reference", previous: "dependency-relationships" },

  // ---------------------------------------------------------------------
  // Components — Core UI Kit / Marketing Sections
  // ---------------------------------------------------------------------
  { id: "core-components", title: "Core Components", href: "/core-components", section: "components", group: "core-ui", order: 0, description: "The shared UI kit every product surface — marketing or application — is built from.", status: "established", pageType: "landing" },
  { id: "marketing-components", title: "Marketing Components", href: "/marketing-components", section: "components", group: "marketing", order: 0, description: "Reusable marketing page-section compositions built entirely from Foundation and Core Components.", status: "established", pageType: "landing", related: ["compositions"] },

  // ---------------------------------------------------------------------
  // Patterns
  // ---------------------------------------------------------------------
  { id: "workflow-patterns", title: "Patterns", href: "/workflow-patterns", section: "patterns", group: "patterns-overview", order: 0, description: "Reusable compositions and templates for recurring problems.", status: "established", pageType: "landing", next: "templates" },
  { id: "templates", title: "Platform Templates", href: "/application-components/templates", section: "patterns", group: "platform-templates", order: 0, description: "Reusable platform-screen templates assembled from certified components.", status: "established", pageType: "pattern", previous: "workflow-patterns", next: "business-feature-templates" },
  { id: "business-feature-templates", title: "Business Feature Templates", href: "/docs/business-feature-templates", section: "patterns", group: "platform-templates", order: 1, description: "The catalog of reusable feature blueprints — standard layouts and a composition matrix for eight of the composition framework's nine Feature Categories.", status: "established", pageType: "pattern", previous: "templates", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "workflows-library", title: "Workflow Diagram Library", href: "/workflows", section: "patterns", group: "process-diagrams", order: 0, description: "Reusable workflow diagrams that explain StudioPOD's processes from structured data.", status: "established", pageType: "pattern", aliases: ["Distinct from Components' own Workflow & Process family — see the Naming Review"] },

  // ---------------------------------------------------------------------
  // Applications
  // ---------------------------------------------------------------------
  { id: "applications", title: "Applications", href: "/applications", section: "applications", group: "applications-overview", order: 0, description: "The eight domain platforms and the real Business Feature pilot, presented as application compositions.", status: "established", pageType: "landing", next: "production-platform" },
  { id: "production-platform", title: "Production", href: "/application-components/production-platform", section: "applications", group: "platforms", order: 0, description: "The first domain platform built — 11 pure re-exports plus one thin wrapper (ProductionCanvas).", status: "established", pageType: "reference", previous: "applications", next: "product-platform", aliases: ["Distinct from the pre-DS-4 Production & Validation Library Playground at /production — see the Naming Review"] },
  { id: "product-platform", title: "Product", href: "/application-components/product-platform", section: "applications", group: "platforms", order: 1, description: "The first platform to reach 12-of-12 pure re-exports with zero new wrapper code.", status: "established", pageType: "reference", previous: "production-platform", next: "publishing-platform" },
  { id: "publishing-platform", title: "Publishing", href: "/application-components/publishing-platform", section: "applications", group: "platforms", order: 2, description: "Publishing targets, queue, provider health, and chronological history.", status: "established", pageType: "reference", previous: "product-platform", next: "commerce-platform" },
  { id: "commerce-platform", title: "Commerce", href: "/application-components/commerce-platform", section: "applications", group: "platforms", order: 3, description: "Catalog, orders, inventory, fulfillment, and pricing.", status: "established", pageType: "reference", previous: "publishing-platform", next: "intelligence-platform" },
  { id: "intelligence-platform", title: "Intelligence", href: "/application-components/intelligence-platform", section: "applications", group: "platforms", order: 4, description: "Recommendations, opportunities, health, diagnostics, and insights — the widest reuse of any platform.", status: "established", pageType: "reference", previous: "commerce-platform", next: "operations-platform" },
  { id: "operations-platform", title: "Operations", href: "/application-components/operations-platform", section: "applications", group: "platforms", order: 5, description: "Monitoring, scheduling, automation, health, and alerts.", status: "established", pageType: "reference", previous: "intelligence-platform", next: "admin-platform" },
  { id: "admin-platform", title: "Administration", href: "/application-components/admin-platform", section: "applications", group: "platforms", order: 6, description: "Users, permissions, configuration, audit, and enrollment.", status: "established", pageType: "reference", previous: "operations-platform", next: "integrations-platform" },
  { id: "integrations-platform", title: "Integrations", href: "/application-components/integrations-platform", section: "applications", group: "platforms", order: 7, description: "Provider registry, connections, mappings, and sync monitoring.", status: "established", pageType: "reference", previous: "admin-platform", next: "production-workspace-feature" },
  { id: "production-workspace-feature", title: "Production Workspace", href: "/application-components/business-features/production-workspace", section: "applications", group: "business-features", order: 0, description: "The first real Business Feature pilot, composing only certified components with local state and mock data.", status: "established", pageType: "reference", previous: "integrations-platform", related: ["templates", "business-feature-templates", "application-composition-doc"] },

  // ---------------------------------------------------------------------
  // Architecture
  // ---------------------------------------------------------------------
  { id: "docs-root", title: "Architecture", href: "/docs", section: "architecture", group: "architecture-overview", order: 0, description: "The composition rules and layering model — no live examples, just relationships.", status: "established", pageType: "landing", next: "docs-workspace", aliases: ["Formerly the tier-first Documentation Home listing Workspace/Foundation/Operational/Workflow/Platform as its own primary nav"] },
  { id: "docs-workspace", title: "Workspace Shell", href: "/docs/workspace", section: "architecture", group: "workspace-shell", order: 0, description: "The six-tier workspace blueprint every application screen composes: shell, header, layout, toolbar, asset/primary/inspector regions, and status.", status: "established", pageType: "landing", previous: "docs-root", next: "workspace-framework" },
  { id: "workspace-framework", title: "Workspace Framework", href: "/application-components/workspace-framework", section: "architecture", group: "workspace-shell", order: 1, description: "The overall shell anatomy — six regions every workspace screen is composed from.", status: "established", pageType: "reference", previous: "docs-workspace", next: "workspace-header" },
  { id: "workspace-header", title: "Workspace Header", href: "/application-components/workspace-header", section: "architecture", group: "workspace-shell", order: 2, description: "The header framework: identity, context, and actions regions.", status: "established", pageType: "reference", previous: "workspace-framework", next: "workspace-layout" },
  { id: "workspace-layout", title: "Workspace Layout", href: "/application-components/workspace-layout", section: "architecture", group: "workspace-shell", order: 3, description: "The ten layout rules governing region sizing, breakpoints, and collapse behavior.", status: "established", pageType: "reference", previous: "workspace-header", next: "workspace-toolbar" },
  { id: "workspace-toolbar", title: "Workspace Toolbar", href: "/application-components/workspace-toolbar", section: "architecture", group: "workspace-shell", order: 4, description: "The toolbar framework — primary/secondary actions, overflow, and grouping rules.", status: "established", pageType: "reference", previous: "workspace-layout", next: "asset-workspace" },
  { id: "asset-workspace", title: "Asset Workspace", href: "/application-components/asset-workspace", section: "architecture", group: "workspace-shell", order: 5, description: "The asset-browsing workspace framework.", status: "established", pageType: "reference", previous: "workspace-toolbar", next: "primary-workspace" },
  { id: "primary-workspace", title: "Primary Workspace", href: "/application-components/primary-workspace", section: "architecture", group: "workspace-shell", order: 6, description: "The primary content region framework.", status: "established", pageType: "reference", previous: "asset-workspace", next: "inspector-workspace" },
  { id: "inspector-workspace", title: "Inspector Workspace", href: "/application-components/inspector-workspace", section: "architecture", group: "workspace-shell", order: 7, description: "The inspector/detail-panel workspace framework — eight regions.", status: "established", pageType: "reference", previous: "primary-workspace", next: "status-workspace" },
  { id: "status-workspace", title: "Status Workspace", href: "/application-components/status-workspace", section: "architecture", group: "workspace-shell", order: 8, description: "The operational status workspace framework — seven regions.", status: "established", pageType: "reference", previous: "inspector-workspace", next: "workspace-certification" },
  { id: "workspace-certification", title: "Workspace Certification", href: "/application-components/workspace-certification", section: "architecture", group: "workspace-shell", order: 9, description: "The capstone certifying the whole six-tier workspace blueprint.", status: "certified", pageType: "certification", previous: "status-workspace", related: ["foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },

  { id: "docs-foundation", title: "Foundation Tier", href: "/docs/foundation", section: "architecture", group: "tier-model", order: 0, description: "The generic UI primitives with zero business or workflow awareness that every higher tier composes from.", status: "established", pageType: "landing", next: "foundation-audit" },
  { id: "foundation-audit", title: "Foundation Audit", href: "/application-components/foundation-audit", section: "architecture", group: "tier-model", order: 1, description: "The capstone audit certifying the whole Foundation layer.", status: "certified", pageType: "certification", previous: "docs-foundation", next: "docs-operational", related: ["workspace-certification", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-operational", title: "Operational Tier", href: "/docs/operational", section: "architecture", group: "tier-model", order: 2, description: "Nine composed, ready-to-use panels and screens built entirely on Foundation.", status: "established", pageType: "landing", previous: "foundation-audit", next: "operational-certification" },
  { id: "operational-certification", title: "Operational Certification", href: "/application-components/operational-certification", section: "architecture", group: "tier-model", order: 3, description: "The capstone certifying all nine Operational systems Production Ready.", status: "certified", pageType: "certification", previous: "docs-operational", next: "docs-workflow", related: ["workspace-certification", "foundation-audit", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-workflow", title: "Workflow Tier", href: "/docs/workflow", section: "architecture", group: "tier-model", order: 4, description: "Eight domain-agnostic systems for multi-step processes and cross-cutting visualization, built on Foundation and Operational.", status: "established", pageType: "landing", previous: "operational-certification", next: "workflow-certification" },
  { id: "workflow-certification", title: "Workflow Certification", href: "/application-components/workflow-certification", section: "architecture", group: "tier-model", order: 5, description: "The capstone certifying all eight Workflow systems (92 components) Production Ready.", status: "certified", pageType: "certification", previous: "docs-workflow", next: "docs-platform", related: ["workspace-certification", "foundation-audit", "operational-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-platform", title: "Platform Tier", href: "/docs/platform", section: "architecture", group: "tier-model", order: 6, description: "Eight domain-specific component libraries scoping business vocabulary onto Foundation, Operational, and Workflow.", status: "established", pageType: "landing", previous: "workflow-certification", next: "platform-certification" },
  { id: "platform-certification", title: "Platform Certification", href: "/application-components/platform-certification", section: "architecture", group: "tier-model", order: 7, description: "The capstone certifying all eight Platform libraries (96 components) Certified.", status: "certified", pageType: "certification", previous: "docs-platform", next: "architecture-doc", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "architecture-doc", title: "Tier Composition", href: "/application-components/architecture", section: "architecture", group: "tier-model", order: 8, description: "How the Workspace, Foundation, Operational, Workflow, and Platform tiers compose.", status: "established", pageType: "architecture", previous: "platform-certification" },

  { id: "platform-architecture-doc", title: "Platform Architecture", href: "/application-components/platform-architecture", section: "architecture", group: "platform-architecture", order: 0, description: "The blueprint every domain platform is built against — layer composition, ownership model, and certification ladder.", status: "established", pageType: "architecture", aliases: ["Distinct from the pre-DS-4 Platform Architecture Library Playground at /platforms — see the Naming Review"] },

  { id: "application-composition-doc", title: "Application Composition", href: "/docs/application-composition", section: "architecture", group: "application-composition", order: 0, description: "The architecture defining how Business Features compose the certified Foundation → Operational → Workflow → Platform layers into the real StudioPOD application.", status: "established", pageType: "architecture", next: "business-features-doc", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "business-features-doc", title: "Business Feature Framework", href: "/docs/business-features", section: "architecture", group: "application-composition", order: 1, description: "The framework defining the canonical internal structure, standard template, reusable categories, and composition rules every Business Feature follows.", status: "established", pageType: "architecture", previous: "application-composition-doc", next: "application-composition-certification", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "application-composition-certification", title: "Application Composition Certification", href: "/docs/application-composition-certification", section: "architecture", group: "application-composition", order: 2, description: "The capstone — re-auditing the Application Composition architecture, framework, and templates against their own real source, resolving two real defects, and certifying the whole Application Composition tier.", status: "certified", pageType: "certification", previous: "business-features-doc", related: ["application-composition-doc", "business-features-doc", "business-feature-templates", "production-workspace-feature", "workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },

  // ---------------------------------------------------------------------
  // Playground
  // ---------------------------------------------------------------------
  { id: "playground", title: "Playground", href: "/playground", section: "playground", group: "playground-overview", order: 0, description: "Interactive exploration tools, kept separate from reference documentation.", status: "established", pageType: "landing", next: "design-system" },
  { id: "design-system", title: "Design System Explorer", href: "/design-system", section: "playground", group: "visual-tools", order: 0, description: "The consolidated token, typography, layout, motion, and component showcase page.", status: "established", pageType: "reference", previous: "playground", next: "motion", related: ["core-components", "tokens"] },
  { id: "motion", title: "Motion Engine", href: "/motion", section: "playground", group: "visual-tools", order: 1, description: "Semantic motion tokens, hooks, and 14 reusable animation primitives.", status: "established", pageType: "reference", previous: "design-system", next: "illustrations" },
  { id: "illustrations", title: "Illustration Engine", href: "/illustrations", section: "playground", group: "visual-tools", order: 2, description: "The data-driven diagram engine every workflow and architecture visual renders through.", status: "established", pageType: "reference", previous: "motion" },
  { id: "compositions", title: "Composition Playground", href: "/compositions", section: "playground", group: "interactive-demos", order: 0, description: "11 reusable marketing section compositions: hero, feature grid, CTA, FAQ, testimonial, and more — with a device-preview tool.", status: "established", pageType: "pattern", related: ["marketing-components"] },
  { id: "platforms-library", title: "Platform Architecture Library", href: "/platforms", section: "playground", group: "legacy-experiments", order: 0, description: "An earlier illustration-canvas Platform Architecture playground — diagram data, not real components. Superseded by Applications, kept reachable for reference.", status: "legacy", pageType: "pattern", related: ["platform-architecture-doc"], aliases: ["Same-name collision with /application-components/platform-architecture — see the Naming Review"] },
  { id: "production-library", title: "Production & Validation Library", href: "/production", section: "playground", group: "legacy-experiments", order: 1, description: "An earlier illustration-canvas production/validation playground — diagram data, not real components. Superseded by Applications, kept reachable for reference.", status: "legacy", pageType: "pattern", related: ["production-platform"], aliases: ["Same-name collision with /application-components/production-platform — see the Naming Review"] },
  { id: "capabilities-library", title: "Capability Library", href: "/capabilities", section: "playground", group: "legacy-experiments", order: 2, description: "An earlier illustration-canvas capability/provider playground — diagram data, not real components. Kept reachable for reference.", status: "legacy", pageType: "pattern", related: ["integrations-platform"] },

  // ---------------------------------------------------------------------
  // Quality
  // ---------------------------------------------------------------------
  { id: "docs-certification", title: "Quality", href: "/docs/certification", section: "quality", group: "quality-overview", order: 0, description: "Every certification, audit, and coverage/maturity tracking view — the system's own evidence trail.", status: "established", pageType: "landing", next: "final-certification" },
  { id: "final-certification", title: "Final Enterprise Certification", href: "/application-components/final-certification", section: "quality", group: "certifications", order: 0, description: "DS-6.5 — the terminal capstone. The permanent, canonical release record synthesizing all nine certifications into one final scorecard, technical debt register, and certification history.", status: "certified", pageType: "certification", next: "enterprise-architecture-audit", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit"] },
  { id: "enterprise-architecture-audit", title: "Enterprise Architecture & Adoption Audit", href: "/application-components/enterprise-architecture-audit", section: "quality", group: "certifications", order: 1, description: "The final architectural audit before Final Enterprise Certification — a full-repo dependency-graph re-parse, an API-consistency and naming re-check, a re-verified adoption and Business Feature review, a duplication review, and a technical debt register.", status: "certified", pageType: "certification", previous: "final-certification", next: "accessibility-certification", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "final-certification"] },
  { id: "accessibility-certification", title: "Accessibility & Interaction Quality", href: "/application-components/accessibility-certification", section: "quality", group: "certifications", order: 2, description: "The cross-cutting accessibility and interaction-quality audit spanning Foundation and Operational — every aria, keyboard, focus-management, live-region, and touch-target finding independently re-verified and classified Resolved, Deferred, or Rejected.", status: "certified", pageType: "certification", previous: "enterprise-architecture-audit", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "inventory", title: "Component Inventory", href: "/application-components/inventory", section: "quality", group: "tracking", order: 0, description: "Every real Application Components entry, in one inventory table.", status: "established", pageType: "reference", next: "coverage" },
  { id: "coverage", title: "Coverage Matrix", href: "/application-components/coverage", section: "quality", group: "tracking", order: 1, description: "Which platforms and patterns each component family actually covers.", status: "established", pageType: "architecture", previous: "inventory", next: "maturity" },
  { id: "maturity", title: "Maturity Model", href: "/application-components/maturity", section: "quality", group: "tracking", order: 2, description: "The Concept → Prototype → Production Ready → Certified → Locked ladder every component is scored against.", status: "established", pageType: "architecture", previous: "coverage" },
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
  if (group && group.id !== "overview" && group.title !== section?.title) trail.push({ label: group.title, href: group.href });
  trail.push({ label: entry.title });
  return trail;
}
