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
  { id: "visual-tools", section: "playground", title: "Visual Tools", href: "/motion", description: "Preview and test the animation and illustration engines; token, color, typography, and layout exploration now lives in Foundations & Tokens." },
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
  { id: "home", title: "StudioPOD Design System", href: "/", section: "overview", group: "overview", order: 0, description: "Get a quick overview of the StudioPOD Design System, understand who it's built for, and find out where to start exploring.", status: "established", pageType: "landing", next: "documentation" },
  { id: "documentation", title: "About & Principles", href: "/documentation", section: "overview", group: "overview", order: 1, description: "Learn the design system's guiding principles and how to contribute new components or improvements.", status: "placeholder", pageType: "landing", previous: "home" },

  // ---------------------------------------------------------------------
  // Components — Overview & Foundations
  // ---------------------------------------------------------------------
  { id: "application-components", title: "Components", href: "/application-components", section: "components", group: "components-overview", order: 0, description: "Browse the full library of reusable interface components, organized by family so you can quickly find the piece you need.", status: "established", pageType: "landing", next: "foundations", aliases: ["Formerly the DS-0.3/Application Components tier landing"] },
  { id: "foundation-components", title: "Foundation Catalog", href: "/application-components/foundation-components", section: "components", group: "components-overview", order: 1, description: "Look up any foundational component's purpose, status, required states, and accessibility support, plus see overall coverage and what's still being built.", status: "established", pageType: "reference", related: ["foundation-layout", "foundation-table", "foundation-audit"], aliases: ["Orphaned by the DS-7.1 registry rewrite until Part 9's legacy audit added it back — see the Naming Review"] },
  { id: "foundations", title: "Foundations", href: "/foundations", section: "components", group: "foundations-tokens", order: 0, description: "Learn about the structural and motion building blocks that every other component family is built on.", status: "established", pageType: "landing", previous: "application-components", next: "tokens" },
  { id: "tokens", title: "Tokens", href: "/tokens", section: "components", group: "foundations-tokens", order: 1, description: "Look up the color, typography, spacing, radius, and shadow values that keep every component visually consistent.", status: "established", pageType: "reference", previous: "foundations" },

  // ---------------------------------------------------------------------
  // Components — Layout
  // ---------------------------------------------------------------------
  { id: "foundation-layout", title: "Layout", href: "/application-components/foundation-layout", section: "components", group: "layout", order: 0, description: "Use these layout primitives to arrange and space content consistently across a page or screen.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Navigation
  // ---------------------------------------------------------------------
  { id: "foundation-navigation", title: "Navigation", href: "/application-components/foundation-navigation", section: "components", group: "navigation", order: 0, description: "Use these components to help people move around the product, whether that's switching between tabs, tracking progress through a multi-step process, or browsing a menu.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Data Display
  // ---------------------------------------------------------------------
  { id: "foundation-table", title: "Table", href: "/application-components/foundation-table", section: "components", group: "data-display", order: 0, description: "Use this table system to display, sort, and interact with large sets of tabular data, including columns that stay pinned while scrolling.", status: "established", pageType: "reference", next: "foundation-metadata" },
  { id: "foundation-metadata", title: "Metadata", href: "/application-components/foundation-metadata", section: "components", group: "data-display", order: 1, description: "Use these components to display identity information, status indicators, and other structured values consistently throughout the product.", status: "established", pageType: "reference", previous: "foundation-table", next: "data-grid" },
  { id: "data-grid", title: "Data Grid", href: "/application-components/data-grid", section: "components", group: "data-display", order: 2, description: "Use the data grid to show large datasets that people can sort, filter, and select rows from.", status: "established", pageType: "reference", previous: "foundation-metadata", next: "asset-browser" },
  { id: "asset-browser", title: "Asset Browser", href: "/application-components/asset-browser", section: "components", group: "data-display", order: 3, description: "Use the asset browser to let people search, filter, and select files or media in a grid or list view.", status: "established", pageType: "reference", previous: "data-grid", next: "queue-jobs" },
  { id: "queue-jobs", title: "Queue & Jobs", href: "/application-components/queue-jobs", section: "components", group: "data-display", order: 4, description: "Use these components to show background jobs and queues in progress, including their status, timeline, and how errors get retried.", status: "established", pageType: "reference", previous: "asset-browser", next: "dashboard-widgets" },
  { id: "dashboard-widgets", title: "Dashboard Widgets", href: "/application-components/dashboard-widgets", section: "components", group: "data-display", order: 5, description: "Use these widgets to build dashboards that surface key metrics, trends, and charts at a glance.", status: "established", pageType: "reference", previous: "queue-jobs" },

  // ---------------------------------------------------------------------
  // Components — Forms
  // ---------------------------------------------------------------------
  { id: "foundation-forms", title: "Forms", href: "/application-components/foundation-forms", section: "components", group: "forms", order: 0, description: "Browse the form fields and input controls you can use to collect and validate information from people.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Overlays
  // ---------------------------------------------------------------------
  { id: "foundation-overlays", title: "Overlays", href: "/application-components/foundation-overlays", section: "components", group: "overlays", order: 0, description: "Use these components when you need to show extra content on top of the page, such as tooltips, popovers, menus, dialogs, or drawers.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Feedback
  // ---------------------------------------------------------------------
  { id: "foundation-feedback", title: "Feedback", href: "/application-components/foundation-feedback", section: "components", group: "feedback", order: 0, description: "Use these components to let people know what happened after an action, whether that's a success alert, a toast notification, an empty state, or a progress indicator.", status: "established", pageType: "reference", next: "status-health" },
  { id: "status-health", title: "Status & Health", href: "/application-components/status-health", section: "components", group: "feedback", order: 1, description: "Use these components to show the health and status of systems, providers, and sync processes at a glance.", status: "established", pageType: "reference", previous: "foundation-feedback", next: "bulk-actions" },
  { id: "bulk-actions", title: "Bulk Actions", href: "/application-components/bulk-actions", section: "components", group: "feedback", order: 2, description: "Use these components to let people select multiple items and act on them together, with confirmation, progress, and undo built in.", status: "established", pageType: "reference", previous: "status-health" },

  // ---------------------------------------------------------------------
  // Components — Search & Filter
  // ---------------------------------------------------------------------
  { id: "filter-search", title: "Filter & Search", href: "/application-components/filter-search", section: "components", group: "search-filter", order: 0, description: "Use these components to help people search and filter through data, and to show a summary of the results they get back.", status: "established", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Inspector & Properties
  // ---------------------------------------------------------------------
  { id: "inspector-panel", title: "Inspector Panel", href: "/application-components/inspector-panel", section: "components", group: "inspector", order: 0, description: "Use the inspector panel to show detailed information and editable properties for whatever item someone has selected.", status: "established", pageType: "reference", next: "property-panel" },
  { id: "property-panel", title: "Property Panel", href: "/application-components/property-panel", section: "components", group: "inspector", order: 1, description: "Use the property panel to let people edit structured settings through rows of toggles, dropdowns, number fields, and color pickers.", status: "established", pageType: "reference", previous: "inspector-panel" },

  // ---------------------------------------------------------------------
  // Components — Workflow & Process
  // ---------------------------------------------------------------------
  { id: "workflow-framework", title: "Workflow Framework", href: "/application-components/workflow-framework", section: "components", group: "workflow-process", order: 0, description: "Use the Workflow Framework to structure multi-stage processes with consistent navigation, status, progress, and actions.", status: "established", pageType: "reference", next: "workflow-stepper" },
  { id: "workflow-stepper", title: "Workflow Stepper", href: "/application-components/workflow-stepper", section: "components", group: "workflow-process", order: 1, description: "Use the Workflow Stepper to guide people through a multi-step process while showing them their progress along the way.", status: "established", pageType: "reference", previous: "workflow-framework", next: "workflow-timeline" },
  { id: "workflow-timeline", title: "Workflow Timeline", href: "/application-components/workflow-timeline", section: "components", group: "workflow-process", order: 2, description: "Use the Workflow Timeline to show a chronological history or audit trail of what's happened in a process.", status: "established", pageType: "reference", previous: "workflow-stepper", next: "approval-review" },
  { id: "approval-review", title: "Approval & Review", href: "/application-components/approval-review", section: "components", group: "workflow-process", order: 3, description: "Use these components to build approval workflows, from requesting a decision through staged review to a final outcome.", status: "established", pageType: "reference", previous: "workflow-timeline", next: "pipeline-components" },
  { id: "pipeline-components", title: "Pipeline Components", href: "/application-components/pipeline-components", section: "components", group: "workflow-process", order: 4, description: "Use these components to represent a business pipeline as a series of stages people can track and move through, including approval gates.", status: "established", pageType: "reference", previous: "approval-review", next: "state-machine" },
  { id: "state-machine", title: "State Machine", href: "/application-components/state-machine", section: "components", group: "workflow-process", order: 5, description: "Use these components to represent a process as a set of states and transitions, so people can see exactly where something stands.", status: "established", pageType: "reference", previous: "pipeline-components", next: "dependency-relationships" },
  { id: "dependency-relationships", title: "Dependency & Relationships", href: "/application-components/dependency-relationships", section: "components", group: "workflow-process", order: 6, description: "Use these components to visualize how items depend on or relate to each other, and to inspect the impact of a change.", status: "established", pageType: "reference", previous: "state-machine", next: "workflow-visualization" },
  { id: "workflow-visualization", title: "Workflow Visualization", href: "/application-components/workflow-visualization", section: "components", group: "workflow-process", order: 7, description: "Use these components to build interactive visualizations of live workflows on real application screens.", status: "established", pageType: "reference", previous: "dependency-relationships" },

  // ---------------------------------------------------------------------
  // Components — Core UI Kit / Marketing Sections
  // ---------------------------------------------------------------------
  { id: "core-components", title: "Core Components", href: "/core-components", section: "components", group: "core-ui", order: 0, description: "Browse the shared UI kit that every part of the product, marketing pages and application screens alike, is built from.", status: "established", pageType: "landing" },
  { id: "marketing-components", title: "Marketing Components", href: "/marketing-components", section: "components", group: "marketing", order: 0, description: "Browse ready-made marketing page sections you can combine to build landing pages quickly.", status: "established", pageType: "landing", related: ["compositions"] },

  // ---------------------------------------------------------------------
  // Patterns
  // ---------------------------------------------------------------------
  { id: "workflow-patterns", title: "Patterns", href: "/workflow-patterns", section: "patterns", group: "patterns-overview", order: 0, description: "Browse reusable page compositions and templates you can use to solve recurring product design problems instead of building screens from scratch.", status: "established", pageType: "landing", next: "templates" },
  { id: "templates", title: "Platform Templates", href: "/application-components/templates", section: "patterns", group: "platform-templates", order: 0, description: "Assemble new screens quickly using ready-made platform-screen templates built entirely from already-approved components.", status: "established", pageType: "pattern", previous: "workflow-patterns", next: "business-feature-templates" },
  { id: "business-feature-templates", title: "Business Feature Templates", href: "/docs/business-feature-templates", section: "patterns", group: "platform-templates", order: 1, description: "Browse ready-made feature blueprints with standard layouts, showing which components to combine to build common business features.", status: "established", pageType: "pattern", previous: "templates", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "workflows-library", title: "Workflow Diagram Library", href: "/workflows", section: "patterns", group: "process-diagrams", order: 0, description: "Browse a library of diagrams that visually explain how StudioPOD's key business processes work.", status: "established", pageType: "pattern", aliases: ["Distinct from Components' own Workflow & Process family — see the Naming Review"] },

  // ---------------------------------------------------------------------
  // Applications
  // ---------------------------------------------------------------------
  { id: "applications", title: "Applications", href: "/applications", section: "applications", group: "applications-overview", order: 0, description: "Browse real, working examples of StudioPOD's domain platforms to see how certified components come together into full application screens and features.", status: "established", pageType: "landing", next: "production-platform" },
  { id: "production-platform", title: "Production", href: "/application-components/production-platform", section: "applications", group: "platforms", order: 0, description: "Explore the Production platform, which brings together the tools for managing production workflows, assets, and output in one place.", status: "established", pageType: "reference", previous: "applications", next: "product-platform", aliases: ["Distinct from the pre-DS-4 Production & Validation Library Playground at /production — see the Naming Review"] },
  { id: "product-platform", title: "Product", href: "/application-components/product-platform", section: "applications", group: "platforms", order: 1, description: "Explore the Product platform, which brings together the tools for managing product catalogs, details, and related data in one place.", status: "established", pageType: "reference", previous: "production-platform", next: "publishing-platform" },
  { id: "publishing-platform", title: "Publishing", href: "/application-components/publishing-platform", section: "applications", group: "platforms", order: 2, description: "Use the Publishing platform to manage where content gets published, track the publishing queue, and monitor provider health and history.", status: "established", pageType: "reference", previous: "product-platform", next: "commerce-platform" },
  { id: "commerce-platform", title: "Commerce", href: "/application-components/commerce-platform", section: "applications", group: "platforms", order: 3, description: "Use the Commerce platform to manage product catalogs, orders, inventory, fulfillment, and pricing in one connected view.", status: "established", pageType: "reference", previous: "publishing-platform", next: "intelligence-platform" },
  { id: "intelligence-platform", title: "Intelligence", href: "/application-components/intelligence-platform", section: "applications", group: "platforms", order: 4, description: "Use the Intelligence platform to surface recommendations, opportunities, and diagnostic insights that help you understand how things are performing.", status: "established", pageType: "reference", previous: "commerce-platform", next: "operations-platform" },
  { id: "operations-platform", title: "Operations", href: "/application-components/operations-platform", section: "applications", group: "platforms", order: 5, description: "Use the Operations platform to monitor system health, schedule and automate tasks, and stay on top of alerts.", status: "established", pageType: "reference", previous: "intelligence-platform", next: "admin-platform" },
  { id: "admin-platform", title: "Administration", href: "/application-components/admin-platform", section: "applications", group: "platforms", order: 6, description: "Use the Administration platform to manage users, permissions, configuration, and audit records.", status: "established", pageType: "reference", previous: "operations-platform", next: "integrations-platform" },
  { id: "integrations-platform", title: "Integrations", href: "/application-components/integrations-platform", section: "applications", group: "platforms", order: 7, description: "Use the Integrations platform to connect external providers, manage data mappings, and monitor sync status.", status: "established", pageType: "reference", previous: "admin-platform", next: "production-workspace-feature" },
  { id: "production-workspace-feature", title: "Production Workspace", href: "/application-components/business-features/production-workspace", section: "applications", group: "business-features", order: 0, description: "See a real example feature, a Production Workspace, built entirely from the design system's certified components to show how the pieces work together in practice.", status: "established", pageType: "reference", previous: "integrations-platform", related: ["templates", "business-feature-templates", "application-composition-doc"] },

  // ---------------------------------------------------------------------
  // Architecture
  // ---------------------------------------------------------------------
  { id: "docs-root", title: "Architecture", href: "/docs", section: "architecture", group: "architecture-overview", order: 0, description: "Understand how the design system's tiers and rules fit together, without diving into live component examples.", status: "established", pageType: "landing", next: "docs-workspace", aliases: ["Formerly the tier-first Documentation Home listing Workspace/Foundation/Operational/Workflow/Platform as its own primary nav"] },
  { id: "docs-workspace", title: "Workspace Shell", href: "/docs/workspace", section: "architecture", group: "workspace-shell", order: 0, description: "Learn the standard workspace layout that every application screen is built from, including its header, toolbar, content areas, and status bar.", status: "established", pageType: "landing", previous: "docs-root", next: "workspace-framework" },
  { id: "workspace-framework", title: "Workspace Framework", href: "/application-components/workspace-framework", section: "architecture", group: "workspace-shell", order: 1, description: "See the overall structure that every workspace screen is assembled from, and how its regions work together.", status: "established", pageType: "reference", previous: "docs-workspace", next: "workspace-header" },
  { id: "workspace-header", title: "Workspace Header", href: "/application-components/workspace-header", section: "architecture", group: "workspace-shell", order: 2, description: "Learn how the workspace header shows who and where you are, and surfaces the actions available on the current screen.", status: "established", pageType: "reference", previous: "workspace-framework", next: "workspace-layout" },
  { id: "workspace-layout", title: "Workspace Layout", href: "/application-components/workspace-layout", section: "architecture", group: "workspace-shell", order: 3, description: "Understand the rules that control how workspace regions resize, respond to different screen sizes, and collapse when space is tight.", status: "established", pageType: "reference", previous: "workspace-header", next: "workspace-toolbar" },
  { id: "workspace-toolbar", title: "Workspace Toolbar", href: "/application-components/workspace-toolbar", section: "architecture", group: "workspace-shell", order: 4, description: "See how the workspace toolbar organizes primary and secondary actions, including overflow and grouping behavior.", status: "established", pageType: "reference", previous: "workspace-layout", next: "asset-workspace" },
  { id: "asset-workspace", title: "Asset Workspace", href: "/application-components/asset-workspace", section: "architecture", group: "workspace-shell", order: 5, description: "Learn how the asset-browsing workspace helps users search, filter, and select files or media.", status: "established", pageType: "reference", previous: "workspace-toolbar", next: "primary-workspace" },
  { id: "primary-workspace", title: "Primary Workspace", href: "/application-components/primary-workspace", section: "architecture", group: "workspace-shell", order: 6, description: "Understand how the primary content region displays the main working area of a screen.", status: "established", pageType: "reference", previous: "asset-workspace", next: "inspector-workspace" },
  { id: "inspector-workspace", title: "Inspector Workspace", href: "/application-components/inspector-workspace", section: "architecture", group: "workspace-shell", order: 7, description: "Learn how the inspector workspace shows detailed properties and information about whatever is currently selected.", status: "established", pageType: "reference", previous: "primary-workspace", next: "status-workspace" },
  { id: "status-workspace", title: "Status Workspace", href: "/application-components/status-workspace", section: "architecture", group: "workspace-shell", order: 8, description: "See how the status workspace surfaces operational health, alerts, and system status at a glance.", status: "established", pageType: "reference", previous: "inspector-workspace", next: "workspace-certification" },
  { id: "workspace-certification", title: "Workspace Certification", href: "/application-components/workspace-certification", section: "architecture", group: "workspace-shell", order: 9, description: "Review the completed quality certification for the workspace layout system, confirming it meets accessibility and reliability standards.", status: "certified", pageType: "certification", previous: "status-workspace", related: ["foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },

  { id: "docs-foundation", title: "Foundation Tier", href: "/docs/foundation", section: "architecture", group: "tier-model", order: 0, description: "Explore the basic UI building blocks, like buttons, inputs, and layout primitives, that every other part of the design system is built from.", status: "established", pageType: "landing", next: "foundation-audit" },
  { id: "foundation-audit", title: "Foundation Audit", href: "/application-components/foundation-audit", section: "architecture", group: "tier-model", order: 1, description: "Review the quality audit confirming the Foundation layer's components meet the system's design and accessibility standards.", status: "certified", pageType: "certification", previous: "docs-foundation", next: "docs-operational", related: ["workspace-certification", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-operational", title: "Operational Tier", href: "/docs/operational", section: "architecture", group: "tier-model", order: 2, description: "Browse ready-to-use panels and screens, built from Foundation components, that you can drop into an application.", status: "established", pageType: "landing", previous: "foundation-audit", next: "operational-certification" },
  { id: "operational-certification", title: "Operational Certification", href: "/application-components/operational-certification", section: "architecture", group: "tier-model", order: 3, description: "Review the certification confirming the Operational-tier panels and screens are ready for production use.", status: "certified", pageType: "certification", previous: "docs-operational", next: "docs-workflow", related: ["workspace-certification", "foundation-audit", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-workflow", title: "Workflow Tier", href: "/docs/workflow", section: "architecture", group: "tier-model", order: 4, description: "Explore the systems for building multi-step processes and visualizations that work across any business domain.", status: "established", pageType: "landing", previous: "operational-certification", next: "workflow-certification" },
  { id: "workflow-certification", title: "Workflow Certification", href: "/application-components/workflow-certification", section: "architecture", group: "tier-model", order: 5, description: "Review the certification confirming the Workflow-tier systems are ready for production use.", status: "certified", pageType: "certification", previous: "docs-workflow", next: "docs-platform", related: ["workspace-certification", "foundation-audit", "operational-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "docs-platform", title: "Platform Tier", href: "/docs/platform", section: "architecture", group: "tier-model", order: 6, description: "Browse the component libraries that adapt the design system to specific business domains, like commerce or publishing.", status: "established", pageType: "landing", previous: "workflow-certification", next: "platform-certification" },
  { id: "platform-certification", title: "Platform Certification", href: "/application-components/platform-certification", section: "architecture", group: "tier-model", order: 7, description: "Review the certification confirming the Platform-tier libraries meet the system's quality bar.", status: "certified", pageType: "certification", previous: "docs-platform", next: "architecture-doc", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "architecture-doc", title: "Tier Composition", href: "/application-components/architecture", section: "architecture", group: "tier-model", order: 8, description: "Understand how the Workspace, Foundation, Operational, Workflow, and Platform tiers stack together to form a complete application.", status: "established", pageType: "architecture", previous: "platform-certification" },

  { id: "platform-architecture-doc", title: "Platform Architecture", href: "/application-components/platform-architecture", section: "architecture", group: "platform-architecture", order: 0, description: "Learn the blueprint every domain platform follows, including how layers are composed, who owns what, and how certification works.", status: "established", pageType: "architecture", aliases: ["Distinct from the pre-DS-4 Platform Architecture Library Playground at /platforms — see the Naming Review"] },

  { id: "application-composition-doc", title: "Application Composition", href: "/docs/application-composition", section: "architecture", group: "application-composition", order: 0, description: "Understand how Business Features combine the Foundation, Operational, Workflow, and Platform layers to build the real StudioPOD application.", status: "established", pageType: "architecture", next: "business-features-doc", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "business-features-doc", title: "Business Feature Framework", href: "/docs/business-features", section: "architecture", group: "application-composition", order: 1, description: "Learn the standard structure and rules every Business Feature follows, so new features stay consistent and reusable.", status: "established", pageType: "architecture", previous: "application-composition-doc", next: "application-composition-certification", related: ["platform-architecture-doc", "platform-certification"] },
  { id: "application-composition-certification", title: "Application Composition Certification", href: "/docs/application-composition-certification", section: "architecture", group: "application-composition", order: 2, description: "Review the certification confirming the Application Composition architecture, framework, and templates meet the system's quality standards.", status: "certified", pageType: "certification", previous: "business-features-doc", related: ["application-composition-doc", "business-features-doc", "business-feature-templates", "production-workspace-feature", "workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "accessibility-certification", "enterprise-architecture-audit", "final-certification"] },

  // ---------------------------------------------------------------------
  // Playground
  // ---------------------------------------------------------------------
  { id: "playground", title: "Playground", href: "/playground", section: "playground", group: "playground-overview", order: 0, description: "Start here for hands-on, interactive tools you can experiment with, as opposed to written reference documentation.", status: "established", pageType: "landing", next: "motion" },
  { id: "motion", title: "Motion Engine", href: "/motion", section: "playground", group: "visual-tools", order: 0, description: "Preview and test the animation tokens and reusable motion primitives available for building consistent, purposeful transitions.", status: "established", pageType: "reference", previous: "playground", next: "illustrations" },
  { id: "illustrations", title: "Illustration Engine", href: "/illustrations", section: "playground", group: "visual-tools", order: 1, description: "See how diagrams and illustrations are generated from data, and use the engine to build your own workflow and architecture visuals.", status: "established", pageType: "reference", previous: "motion" },
  { id: "compositions", title: "Composition Playground", href: "/compositions", section: "playground", group: "interactive-demos", order: 0, description: "Preview a library of ready-made marketing page sections across different device sizes, so you can see how they look before using them in a real page.", status: "established", pageType: "pattern", related: ["marketing-components"] },
  { id: "platforms-library", title: "Platform Architecture Library (Archived)", href: "/platforms", section: "playground", group: "legacy-experiments", order: 0, description: "An earlier version of the platform architecture diagrams, kept here for reference — see the Applications section for the current version.", status: "legacy", pageType: "pattern", related: ["platform-architecture-doc"], aliases: ["Distinct from /application-components/platform-architecture ('Platform Architecture') — disambiguated with an (Archived) suffix per DS-7.2's Naming Review"] },
  { id: "production-library", title: "Production & Validation Library (Archived)", href: "/production", section: "playground", group: "legacy-experiments", order: 1, description: "An earlier version of the production and validation diagrams, kept here for reference — see the Applications section for the current version.", status: "legacy", pageType: "pattern", related: ["production-platform"], aliases: ["Distinct from /application-components/production-platform ('Production') — disambiguated with an (Archived) suffix per DS-7.2's Naming Review"] },
  { id: "capabilities-library", title: "Capability Library", href: "/capabilities", section: "playground", group: "legacy-experiments", order: 2, description: "An earlier set of capability and provider diagrams, kept here for reference.", status: "legacy", pageType: "pattern", related: ["integrations-platform"] },

  // ---------------------------------------------------------------------
  // Quality
  // ---------------------------------------------------------------------
  { id: "docs-certification", title: "Quality", href: "/docs/certification", section: "quality", group: "quality-overview", order: 0, description: "Browse every certification, audit, and coverage or maturity report to see the evidence behind the system's quality and production-readiness claims.", status: "established", pageType: "landing", next: "final-certification" },
  { id: "final-certification", title: "Final Enterprise Certification", href: "/application-components/final-certification", section: "quality", group: "certifications", order: 0, description: "Read the final release certification, which combines every other certification into one overall scorecard along with a technical debt register and certification history.", status: "certified", pageType: "certification", next: "enterprise-architecture-audit", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "enterprise-architecture-audit"] },
  { id: "enterprise-architecture-audit", title: "Enterprise Architecture & Adoption Audit", href: "/application-components/enterprise-architecture-audit", section: "quality", group: "certifications", order: 1, description: "Review the final architecture and adoption audit, covering dependency structure, naming consistency, feature adoption, duplication, and technical debt, before final certification.", status: "certified", pageType: "certification", previous: "final-certification", next: "accessibility-certification", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "accessibility-certification", "final-certification"] },
  { id: "accessibility-certification", title: "Accessibility & Interaction Quality", href: "/application-components/accessibility-certification", section: "quality", group: "certifications", order: 2, description: "Review the accessibility and interaction-quality audit covering keyboard support, focus management, screen-reader labeling, and touch targets across the system.", status: "certified", pageType: "certification", previous: "enterprise-architecture-audit", related: ["workspace-certification", "foundation-audit", "operational-certification", "workflow-certification", "platform-certification", "application-composition-certification", "enterprise-architecture-audit", "final-certification"] },
  { id: "inventory", title: "Component Inventory", href: "/application-components/inventory", section: "quality", group: "tracking", order: 0, description: "Browse a full inventory table listing every real Application Components entry in the system.", status: "established", pageType: "reference", next: "coverage" },
  { id: "coverage", title: "Coverage Matrix", href: "/application-components/coverage", section: "quality", group: "tracking", order: 1, description: "See which platforms and patterns each component family actually covers, in a single coverage matrix.", status: "established", pageType: "architecture", previous: "inventory", next: "maturity" },
  { id: "maturity", title: "Maturity Model", href: "/application-components/maturity", section: "quality", group: "tracking", order: 2, description: "Understand the Concept → Prototype → Production Ready → Certified → Locked maturity ladder used to score how ready each component is.", status: "established", pageType: "architecture", previous: "coverage" },
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
