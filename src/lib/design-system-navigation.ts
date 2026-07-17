/**
 * The product information architecture: Overview, Components, Patterns,
 * Applications, Architecture, Playground — a goal-first taxonomy organized
 * around what a visitor is trying to do, not around how the system was
 * built. Every href below points at a real route.
 *
 * The tier concepts (Foundation/Operational/Workflow/Platform/Business
 * Feature) still exist as real documentation — see the "architecture"
 * section below — they're just not the spine of primary navigation.
 */

export type NavSectionId = "overview" | "components" | "patterns" | "applications" | "architecture" | "playground";

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
  | "legacy-experiments";

/**
 * DS-8.4's canonical page taxonomy. Describes what a page IS — never where
 * it sat during implementation. Nine approved classifications; a page gets
 * exactly one, or none at all (pure section hubs and the homepage don't
 * benefit from one). BADGE_TONE/BADGE_LABEL below are this taxonomy's one
 * and only visual treatment — every consumer renders through them, never
 * a local copy, so a classification can't drift to a second color or label.
 */
export type NavBadge =
  | "foundation"
  | "component"
  | "pattern"
  | "application"
  | "architecture"
  | "reference"
  | "playground"
  | "historical-reference";

export const BADGE_TONE: Record<NavBadge, "neutral" | "accent" | "success" | "warning"> = {
  foundation: "neutral",
  component: "accent",
  pattern: "warning",
  application: "accent",
  architecture: "warning",
  reference: "neutral",
  playground: "accent",
  "historical-reference": "neutral",
};

export const BADGE_LABEL: Record<NavBadge, string> = {
  foundation: "Foundation",
  component: "Component",
  pattern: "Pattern",
  application: "Application",
  architecture: "Architecture",
  reference: "Reference",
  playground: "Playground",
  "historical-reference": "Historical Reference",
};

/**
 * The five DS-6.1 page archetypes, unchanged by this package — DS-7.1
 * reorganizes WHERE pages live, not what shape they are.
 */
export type NavPageType = "landing" | "reference" | "pattern" | "architecture";

export interface NavEntry {
  id: string;
  title: string;
  href: string;
  section: NavSectionId;
  group: NavGroupId;
  /** 0-indexed position within its group — 0 is always that group's own overview/landing entry. */
  order: number;
  description: string;
  /** What this page IS. Omit entirely for pure section hubs/landings that don't benefit from one. */
  badge?: NavBadge;
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
  { id: "architecture", title: "Architecture", href: "/docs", description: "The composition rules and layering model — workspace shell, tier stack, platform architecture, application composition — with no live examples, just relationships.", audience: "Architects and decision-makers studying how the system fits together." },
  { id: "playground", title: "Playground", href: "/playground", description: "Interactive exploration tools — token/color/typography explorers, the motion and illustration engines, the composition device-preview tool — kept separate from reference documentation.", audience: "Anyone exploring or prototyping, not looking for API reference." },
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

  { id: "applications-overview", section: "applications", title: "Applications Overview", href: "/applications", description: "The eight domain platforms." },
  { id: "platforms", section: "applications", title: "Platforms", href: "/application-components/production-platform", description: "Production, Product, Publishing, Commerce, Intelligence, Operations, Admin, and Integrations." },

  { id: "architecture-overview", section: "architecture", title: "Architecture Overview", href: "/docs", description: "The composition rules and layering model." },
  { id: "workspace-shell", section: "architecture", title: "Workspace Shell", href: "/docs/workspace", description: "The six-region workspace blueprint every application screen composes." },
  { id: "tier-model", section: "architecture", title: "Tier Model", href: "/application-components/architecture", description: "How Foundation, Operational, Workflow, and Platform compose into the tier stack." },
  { id: "platform-architecture", section: "architecture", title: "Platform Architecture", href: "/application-components/platform-architecture", description: "The blueprint every domain platform is built against." },
  { id: "application-composition", section: "architecture", title: "Application Composition", href: "/docs/application-composition", description: "How Business Features compose the tier stack into the real application." },

  { id: "playground-overview", section: "playground", title: "Playground Overview", href: "/playground", description: "Interactive exploration tools, kept separate from reference docs." },
  { id: "visual-tools", section: "playground", title: "Visual Tools", href: "/motion", description: "Preview and test the animation and illustration engines; token, color, typography, and layout exploration now lives in Foundations & Tokens." },
  { id: "interactive-demos", section: "playground", title: "Interactive Demos", href: "/compositions", description: "Device-preview composition playground." },
  { id: "legacy-experiments", section: "playground", title: "Archived Experiments", href: "/platforms", description: "Illustration-canvas playgrounds kept reachable for historical reference." },
];

export const NAV_REGISTRY: NavEntry[] = [
  // ---------------------------------------------------------------------
  // Overview
  // ---------------------------------------------------------------------
  { id: "home", title: "StudioPOD Design System", href: "/", section: "overview", group: "overview", order: 0, description: "Get a quick overview of the StudioPOD Design System, understand who it's built for, and find out where to start exploring.", pageType: "landing", next: "documentation" },
  { id: "documentation", title: "About & Principles", href: "/documentation", section: "overview", group: "overview", order: 1, description: "Learn the design system's guiding principles and how to contribute new components or improvements.", pageType: "landing", previous: "home" },

  // ---------------------------------------------------------------------
  // Components — Overview & Foundations
  // ---------------------------------------------------------------------
  { id: "application-components", title: "Components", href: "/application-components", section: "components", group: "components-overview", order: 0, description: "Browse the full library of reusable interface components, organized by family so you can quickly find the piece you need.", pageType: "landing", next: "foundations", aliases: ["Formerly the DS-0.3/Application Components tier landing"] },
  { id: "foundation-components", title: "Foundation Catalog", href: "/application-components/foundation-components", section: "components", group: "components-overview", order: 1, description: "Look up any foundational component's purpose, required states, and accessibility support, or browse the full catalog at a glance.", badge: "reference", pageType: "reference", related: ["foundation-layout", "foundation-table", "foundation-metadata"] },
  { id: "foundations", title: "Foundations", href: "/foundations", section: "components", group: "foundations-tokens", order: 0, description: "Learn about the structural and motion building blocks that every other component family is built on.", badge: "foundation", pageType: "landing", previous: "application-components", next: "tokens" },
  { id: "tokens", title: "Tokens", href: "/tokens", section: "components", group: "foundations-tokens", order: 1, description: "Look up the color, typography, spacing, radius, and shadow values that keep every component visually consistent.", badge: "foundation", pageType: "reference", previous: "foundations" },

  // ---------------------------------------------------------------------
  // Components — Layout
  // ---------------------------------------------------------------------
  { id: "foundation-layout", title: "Layout", href: "/application-components/foundation-layout", section: "components", group: "layout", order: 0, description: "Use these layout primitives to arrange and space content consistently across a page or screen.", badge: "foundation", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Navigation
  // ---------------------------------------------------------------------
  { id: "foundation-navigation", title: "Navigation", href: "/application-components/foundation-navigation", section: "components", group: "navigation", order: 0, description: "Use these components to help people move around the product, whether that's switching between tabs, tracking progress through a multi-step process, or browsing a menu.", badge: "component", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Data Display
  // ---------------------------------------------------------------------
  { id: "foundation-table", title: "Table", href: "/application-components/foundation-table", section: "components", group: "data-display", order: 0, description: "Use this table system to display, sort, and select rows of same-shaped records — a queue of jobs, a library of assets, anything with consistent columns — with columns that can stay pinned while you scroll.", badge: "component", pageType: "reference", next: "foundation-metadata" },
  { id: "foundation-metadata", title: "Metadata", href: "/application-components/foundation-metadata", section: "components", group: "data-display", order: 1, description: "Use these components to display identity information, status indicators, and other structured values consistently throughout the product.", badge: "component", pageType: "reference", previous: "foundation-table", next: "data-grid" },
  { id: "data-grid", title: "Data Grid", href: "/application-components/data-grid", section: "components", group: "data-display", order: 2, description: "Use the data grid to display large sets of records that people need to search, filter, sort, select, and act on in bulk — the default choice for any queue, list, or inventory view.", badge: "component", pageType: "reference", previous: "foundation-metadata", next: "asset-browser" },
  { id: "asset-browser", title: "Asset Browser", href: "/application-components/asset-browser", section: "components", group: "data-display", order: 3, description: "Use the asset browser to let people search, filter, and select files or media in a grid or list view.", badge: "component", pageType: "reference", previous: "data-grid", next: "queue-jobs" },
  { id: "queue-jobs", title: "Queue & Jobs", href: "/application-components/queue-jobs", section: "components", group: "data-display", order: 4, description: "Use these components to show background jobs and queues in progress, including their status, timeline, and how errors get retried.", badge: "component", pageType: "reference", previous: "asset-browser", next: "dashboard-widgets" },
  { id: "dashboard-widgets", title: "Dashboard Widgets", href: "/application-components/dashboard-widgets", section: "components", group: "data-display", order: 5, description: "Use these widgets to build dashboards that surface key metrics, trends, and charts at a glance.", badge: "component", pageType: "reference", previous: "queue-jobs" },

  // ---------------------------------------------------------------------
  // Components — Forms
  // ---------------------------------------------------------------------
  { id: "foundation-forms", title: "Forms", href: "/application-components/foundation-forms", section: "components", group: "forms", order: 0, description: "Use these form fields and layout primitives to collect and validate structured input from people, from a single search box to a multi-section settings page.", badge: "component", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Overlays
  // ---------------------------------------------------------------------
  { id: "foundation-overlays", title: "Overlays", href: "/application-components/foundation-overlays", section: "components", group: "overlays", order: 0, description: "Use these components when you need to show extra content on top of the page, such as tooltips, popovers, menus, dialogs, or drawers.", badge: "component", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Feedback
  // ---------------------------------------------------------------------
  { id: "foundation-feedback", title: "Feedback", href: "/application-components/foundation-feedback", section: "components", group: "feedback", order: 0, description: "Use these components to let people know what happened after an action, whether that's a success alert, a toast notification, an empty state, or a progress indicator.", badge: "component", pageType: "reference", next: "status-health" },
  { id: "status-health", title: "Status & Health", href: "/application-components/status-health", section: "components", group: "feedback", order: 1, description: "Use these components to show the health and status of systems, providers, and sync processes at a glance.", badge: "component", pageType: "reference", previous: "foundation-feedback", next: "bulk-actions" },
  { id: "bulk-actions", title: "Bulk Actions", href: "/application-components/bulk-actions", section: "components", group: "feedback", order: 2, description: "Use these components to let people select multiple items and act on them together, with confirmation, progress, and undo built in.", badge: "component", pageType: "reference", previous: "status-health" },

  // ---------------------------------------------------------------------
  // Components — Search & Filter
  // ---------------------------------------------------------------------
  { id: "filter-search", title: "Filter & Search", href: "/application-components/filter-search", section: "components", group: "search-filter", order: 0, description: "Use these components to help people search and filter through data, and to show a summary of the results they get back.", badge: "component", pageType: "reference" },

  // ---------------------------------------------------------------------
  // Components — Inspector & Properties
  // ---------------------------------------------------------------------
  { id: "inspector-panel", title: "Inspector Panel", href: "/application-components/inspector-panel", section: "components", group: "inspector", order: 0, description: "Use the inspector panel to show full detail and editable properties for a single selected item, alongside the list or canvas it was selected from.", badge: "component", pageType: "reference", next: "property-panel" },
  { id: "property-panel", title: "Property Panel", href: "/application-components/property-panel", section: "components", group: "inspector", order: 1, description: "Use the property panel to let people edit structured settings through rows of toggles, dropdowns, number fields, and color pickers.", badge: "component", pageType: "reference", previous: "inspector-panel" },

  // ---------------------------------------------------------------------
  // Components — Workflow & Process
  // ---------------------------------------------------------------------
  { id: "workflow-framework", title: "Workflow Framework", href: "/application-components/workflow-framework", section: "components", group: "workflow-process", order: 0, description: "Use the Workflow Framework to structure multi-stage processes with consistent navigation, status, progress, and actions.", badge: "pattern", pageType: "reference", next: "workflow-stepper" },
  { id: "workflow-stepper", title: "Workflow Stepper", href: "/application-components/workflow-stepper", section: "components", group: "workflow-process", order: 1, description: "Use the Workflow Stepper to guide people through a multi-step process while showing them their progress along the way.", badge: "pattern", pageType: "reference", previous: "workflow-framework", next: "workflow-timeline" },
  { id: "workflow-timeline", title: "Workflow Timeline", href: "/application-components/workflow-timeline", section: "components", group: "workflow-process", order: 2, description: "Use the Workflow Timeline to show a chronological history or audit trail of what's happened in a process.", badge: "pattern", pageType: "reference", previous: "workflow-stepper", next: "approval-review" },
  { id: "approval-review", title: "Approval & Review", href: "/application-components/approval-review", section: "components", group: "workflow-process", order: 3, description: "Use these components to build approval workflows, from requesting a decision through staged review to a final outcome.", badge: "pattern", pageType: "reference", previous: "workflow-timeline", next: "pipeline-components" },
  { id: "pipeline-components", title: "Pipeline Components", href: "/application-components/pipeline-components", section: "components", group: "workflow-process", order: 4, description: "Use these components to represent a business pipeline as a series of stages people can track and move through, including approval gates.", badge: "pattern", pageType: "reference", previous: "approval-review", next: "state-machine" },
  { id: "state-machine", title: "State Machine", href: "/application-components/state-machine", section: "components", group: "workflow-process", order: 5, description: "Use these components to represent a process as a set of states and transitions, so people can see exactly where something stands.", badge: "pattern", pageType: "reference", previous: "pipeline-components", next: "dependency-relationships" },
  { id: "dependency-relationships", title: "Dependency & Relationships", href: "/application-components/dependency-relationships", section: "components", group: "workflow-process", order: 6, description: "Use these components to visualize how items depend on or relate to each other, and to inspect the impact of a change.", badge: "pattern", pageType: "reference", previous: "state-machine", next: "workflow-visualization" },
  { id: "workflow-visualization", title: "Workflow Visualization", href: "/application-components/workflow-visualization", section: "components", group: "workflow-process", order: 7, description: "Use these components to build interactive visualizations of live workflows on real application screens.", badge: "pattern", pageType: "reference", previous: "dependency-relationships" },

  // ---------------------------------------------------------------------
  // Components — Core UI Kit / Marketing Sections
  // ---------------------------------------------------------------------
  { id: "core-components", title: "Core Components", href: "/core-components", section: "components", group: "core-ui", order: 0, description: "Browse the shared UI kit that every part of the product, marketing pages and application screens alike, is built from.", badge: "component", pageType: "landing" },
  { id: "marketing-components", title: "Marketing Components", href: "/marketing-components", section: "components", group: "marketing", order: 0, description: "Browse ready-made marketing page sections you can combine to build landing pages quickly.", badge: "pattern", pageType: "landing", related: ["compositions"] },

  // ---------------------------------------------------------------------
  // Patterns
  // ---------------------------------------------------------------------
  { id: "workflow-patterns", title: "Patterns", href: "/workflow-patterns", section: "patterns", group: "patterns-overview", order: 0, description: "Browse reusable page compositions and templates you can use to solve recurring product design problems instead of building screens from scratch.", pageType: "landing", next: "templates" },
  { id: "templates", title: "Platform Templates", href: "/application-components/templates", section: "patterns", group: "platform-templates", order: 0, description: "Assemble new screens quickly using ready-made platform-screen templates built entirely from existing components.", badge: "pattern", pageType: "pattern", previous: "workflow-patterns", next: "business-feature-templates" },
  { id: "business-feature-templates", title: "Business Feature Templates", href: "/docs/business-feature-templates", section: "patterns", group: "platform-templates", order: 1, description: "Browse ready-made feature blueprints with standard layouts, showing which components to combine to build common business features.", badge: "pattern", pageType: "pattern", previous: "templates", related: ["platform-architecture-doc"] },
  { id: "workflows-library", title: "Workflow Diagram Library", href: "/workflows", section: "patterns", group: "process-diagrams", order: 0, description: "Browse a library of diagrams that visually explain how StudioPOD's key business processes work.", badge: "pattern", pageType: "pattern", aliases: ["Distinct from Components' own Workflow & Process family — see the Naming Review"] },

  // ---------------------------------------------------------------------
  // Applications
  // ---------------------------------------------------------------------
  { id: "applications", title: "Applications", href: "/applications", section: "applications", group: "applications-overview", order: 0, description: "Browse real, working examples of StudioPOD's domain platforms to see how components come together into full application screens and features.", pageType: "landing", next: "production-platform" },
  { id: "production-platform", title: "Production", href: "/application-components/production-platform", section: "applications", group: "platforms", order: 0, description: "Explore the Production platform, which brings together the tools for managing production workflows, assets, and output in one place.", badge: "application", pageType: "reference", previous: "applications", next: "product-platform", aliases: ["Distinct from the pre-DS-4 Production & Validation Library Playground at /production — see the Naming Review"] },
  { id: "product-platform", title: "Product", href: "/application-components/product-platform", section: "applications", group: "platforms", order: 1, description: "Explore the Product platform, which brings together the tools for managing product catalogs, details, and related data in one place.", badge: "application", pageType: "reference", previous: "production-platform", next: "publishing-platform" },
  { id: "publishing-platform", title: "Publishing", href: "/application-components/publishing-platform", section: "applications", group: "platforms", order: 2, description: "Use the Publishing platform to manage where content gets published, track the publishing queue, and monitor provider health and history.", badge: "application", pageType: "reference", previous: "product-platform", next: "commerce-platform" },
  { id: "commerce-platform", title: "Commerce", href: "/application-components/commerce-platform", section: "applications", group: "platforms", order: 3, description: "Use the Commerce platform to manage product catalogs, orders, inventory, fulfillment, and pricing in one connected view.", badge: "application", pageType: "reference", previous: "publishing-platform", next: "intelligence-platform" },
  { id: "intelligence-platform", title: "Intelligence", href: "/application-components/intelligence-platform", section: "applications", group: "platforms", order: 4, description: "Use the Intelligence platform to surface recommendations, opportunities, and diagnostic insights that help you understand how things are performing.", badge: "application", pageType: "reference", previous: "commerce-platform", next: "operations-platform" },
  { id: "operations-platform", title: "Operations", href: "/application-components/operations-platform", section: "applications", group: "platforms", order: 5, description: "Use the Operations platform to monitor system health, schedule and automate tasks, and stay on top of alerts.", badge: "application", pageType: "reference", previous: "intelligence-platform", next: "admin-platform" },
  { id: "admin-platform", title: "Administration", href: "/application-components/admin-platform", section: "applications", group: "platforms", order: 6, description: "Use the Administration platform to manage users, permissions, configuration, and audit records.", badge: "application", pageType: "reference", previous: "operations-platform", next: "integrations-platform" },
  { id: "integrations-platform", title: "Integrations", href: "/application-components/integrations-platform", section: "applications", group: "platforms", order: 7, description: "Use the Integrations platform to connect external providers, manage data mappings, and monitor sync status.", badge: "application", pageType: "reference", previous: "admin-platform" },

  // ---------------------------------------------------------------------
  // Architecture
  // ---------------------------------------------------------------------
  { id: "docs-root", title: "Architecture", href: "/docs", section: "architecture", group: "architecture-overview", order: 0, description: "Understand how the design system's tiers and rules fit together, without diving into live component examples.", badge: "architecture", pageType: "landing", next: "docs-workspace", aliases: ["Formerly the tier-first Documentation Home listing Workspace/Foundation/Operational/Workflow/Platform as its own primary nav"] },
  { id: "docs-workspace", title: "Workspace Shell", href: "/docs/workspace", section: "architecture", group: "workspace-shell", order: 0, description: "Learn the standard workspace layout that every application screen is built from, including its header, toolbar, content areas, and status bar.", badge: "architecture", pageType: "landing", previous: "docs-root", next: "workspace-framework" },
  { id: "workspace-framework", title: "Workspace Framework", href: "/application-components/workspace-framework", section: "architecture", group: "workspace-shell", order: 1, description: "See the overall structure that every workspace screen is assembled from, and how its regions work together.", badge: "architecture", pageType: "reference", previous: "docs-workspace", next: "workspace-header" },
  { id: "workspace-header", title: "Workspace Header", href: "/application-components/workspace-header", section: "architecture", group: "workspace-shell", order: 2, description: "Learn how the workspace header shows who and where you are, and surfaces the actions available on the current screen.", badge: "architecture", pageType: "reference", previous: "workspace-framework", next: "workspace-layout" },
  { id: "workspace-layout", title: "Workspace Layout", href: "/application-components/workspace-layout", section: "architecture", group: "workspace-shell", order: 3, description: "Understand the rules that control how workspace regions resize, respond to different screen sizes, and collapse when space is tight.", badge: "architecture", pageType: "reference", previous: "workspace-header", next: "workspace-toolbar" },
  { id: "workspace-toolbar", title: "Workspace Toolbar", href: "/application-components/workspace-toolbar", section: "architecture", group: "workspace-shell", order: 4, description: "See how the workspace toolbar organizes primary and secondary actions, including overflow and grouping behavior.", badge: "architecture", pageType: "reference", previous: "workspace-layout", next: "asset-workspace" },
  { id: "asset-workspace", title: "Asset Workspace", href: "/application-components/asset-workspace", section: "architecture", group: "workspace-shell", order: 5, description: "Learn how the asset-browsing workspace helps users search, filter, and select files or media.", badge: "architecture", pageType: "reference", previous: "workspace-toolbar", next: "primary-workspace" },
  { id: "primary-workspace", title: "Primary Workspace", href: "/application-components/primary-workspace", section: "architecture", group: "workspace-shell", order: 6, description: "Understand how the primary content region displays the main working area of a screen.", badge: "architecture", pageType: "reference", previous: "asset-workspace", next: "inspector-workspace" },
  { id: "inspector-workspace", title: "Inspector Workspace", href: "/application-components/inspector-workspace", section: "architecture", group: "workspace-shell", order: 7, description: "Learn how the inspector workspace shows detailed properties and information about whatever is currently selected.", badge: "architecture", pageType: "reference", previous: "primary-workspace", next: "status-workspace" },
  { id: "status-workspace", title: "Status Workspace", href: "/application-components/status-workspace", section: "architecture", group: "workspace-shell", order: 8, description: "See how the status workspace surfaces operational health, alerts, and system status at a glance.", badge: "architecture", pageType: "reference", previous: "inspector-workspace" },

  { id: "docs-foundation", title: "Foundation Tier", href: "/docs/foundation", section: "architecture", group: "tier-model", order: 0, description: "Explore the basic UI building blocks, like buttons, inputs, and layout primitives, that every other part of the design system is built from.", badge: "architecture", pageType: "landing", next: "docs-operational" },
  { id: "docs-operational", title: "Operational Tier", href: "/docs/operational", section: "architecture", group: "tier-model", order: 2, description: "Browse ready-to-use panels and screens, built from Foundation components, that you can drop into an application.", badge: "architecture", pageType: "landing", previous: "docs-foundation", next: "docs-workflow" },
  { id: "docs-workflow", title: "Workflow Tier", href: "/docs/workflow", section: "architecture", group: "tier-model", order: 4, description: "Explore the systems for building multi-step processes and visualizations that work across any business domain.", badge: "architecture", pageType: "landing", previous: "docs-operational", next: "docs-platform" },
  { id: "docs-platform", title: "Platform Tier", href: "/docs/platform", section: "architecture", group: "tier-model", order: 6, description: "Browse the component libraries that adapt the design system to specific business domains, like commerce or publishing.", badge: "architecture", pageType: "landing", previous: "docs-workflow", next: "architecture-doc" },
  { id: "architecture-doc", title: "Tier Composition", href: "/application-components/architecture", section: "architecture", group: "tier-model", order: 8, description: "Understand how the Workspace, Foundation, Operational, Workflow, and Platform tiers stack together to form a complete application.", badge: "architecture", pageType: "architecture", previous: "docs-platform" },

  { id: "platform-architecture-doc", title: "Platform Architecture", href: "/application-components/platform-architecture", section: "architecture", group: "platform-architecture", order: 0, description: "Learn the blueprint every domain platform follows, including how layers are composed, who owns what, and how the maturity ladder works.", badge: "architecture", pageType: "architecture" },

  { id: "application-composition-doc", title: "Application Composition", href: "/docs/application-composition", section: "architecture", group: "application-composition", order: 0, description: "Understand how Business Features combine the Foundation, Operational, Workflow, and Platform layers to build the real StudioPOD application.", badge: "architecture", pageType: "architecture", next: "business-features-doc", related: ["platform-architecture-doc"] },
  { id: "business-features-doc", title: "Business Feature Framework", href: "/docs/business-features", section: "architecture", group: "application-composition", order: 1, description: "Learn the standard structure and rules every Business Feature follows, so new features stay consistent and reusable.", badge: "architecture", pageType: "architecture", previous: "application-composition-doc", related: ["platform-architecture-doc"] },

  // ---------------------------------------------------------------------
  // Playground
  // ---------------------------------------------------------------------
  { id: "playground", title: "Playground", href: "/playground", section: "playground", group: "playground-overview", order: 0, description: "Start here for hands-on, interactive tools you can experiment with, as opposed to written reference documentation.", badge: "playground", pageType: "landing", next: "motion" },
  { id: "motion", title: "Motion Engine", href: "/motion", section: "playground", group: "visual-tools", order: 0, description: "Preview and test the animation tokens and reusable motion primitives available for building consistent, purposeful transitions.", badge: "playground", pageType: "reference", previous: "playground", next: "illustrations" },
  { id: "illustrations", title: "Illustration Engine", href: "/illustrations", section: "playground", group: "visual-tools", order: 1, description: "See how diagrams and illustrations are generated from data, and use the engine to build your own workflow and architecture visuals.", badge: "playground", pageType: "reference", previous: "motion" },
  { id: "compositions", title: "Composition Playground", href: "/compositions", section: "playground", group: "interactive-demos", order: 0, description: "Preview a library of ready-made marketing page sections across different device sizes, so you can see how they look before using them in a real page.", badge: "playground", pageType: "pattern", related: ["marketing-components"] },
  { id: "platforms-library", title: "Platform Architecture Library (Archived)", href: "/platforms", section: "playground", group: "legacy-experiments", order: 0, description: "A historical reference version of the platform architecture diagrams — see the Applications section for the current version.", badge: "historical-reference", pageType: "pattern", related: ["platform-architecture-doc"], aliases: ["Distinct from /application-components/platform-architecture ('Platform Architecture') — disambiguated with an (Archived) suffix per DS-7.2's Naming Review"] },
  { id: "production-library", title: "Production & Validation Library (Archived)", href: "/production", section: "playground", group: "legacy-experiments", order: 1, description: "A historical reference version of the production and validation diagrams — see the Applications section for the current version.", badge: "historical-reference", pageType: "pattern", related: ["production-platform"], aliases: ["Distinct from /application-components/production-platform ('Production') — disambiguated with an (Archived) suffix per DS-7.2's Naming Review"] },
  { id: "capabilities-library", title: "Capability Library (Archived)", href: "/capabilities", section: "playground", group: "legacy-experiments", order: 2, description: "A historical reference version of the capability and provider diagrams — see the Applications section for the current version.", badge: "historical-reference", pageType: "pattern", related: ["integrations-platform"] },
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

/**
 * `entry.related`, resolved and shaped for `DocsRelatedGrid` — the pairing
 * DS-1E's audit found missing: every consuming page hand-built its own
 * `[getEntry(id)!, ...]` array instead of reading `entry.related` through
 * `getRelated`, so the two mechanisms drifted (see
 * docs/engineering-notes/11-documentation-infrastructure.md §1 for the
 * concrete case this was caught on). Prefer this over hand-rolling the same
 * map in a new page — see docs/DOCUMENTATION.md "How to add a page."
 */
export function getRelatedLinks(entry: NavEntry): { id: string; href: string; title: string; description: string }[] {
  return getRelated(entry).map((related) => ({
    id: related.id,
    href: related.href,
    title: related.title,
    description: related.description,
  }));
}
