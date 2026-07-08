export type InventoryStatus = "Exists" | "Partial" | "Needed";
export type InventoryPriority = "High" | "Medium" | "Low";

export interface InventoryItem {
  name: string;
  purpose: string;
  status: InventoryStatus;
  /** Closest existing file/route this can build on, or migrate from — omitted when nothing relevant exists yet. */
  source?: string;
  priority: InventoryPriority;
}

export interface InventoryGroup {
  id: string;
  title: string;
  description: string;
  items: InventoryItem[];
}

/**
 * A planning inventory, not an implementation — every "Exists"/"Partial" entry
 * was verified against the actual codebase, not assumed from a component's name.
 */
export const INVENTORY_GROUPS: InventoryGroup[] = [
  {
    id: "workspace-structure",
    title: "1. Workspace Structure",
    description: "The app shell everything else gets mounted inside — none of this exists yet outside of the marketing-site's PageShell.",
    items: [
      {
        name: "Workspace Shell",
        purpose: "Top-level app layout: sidebar + header + content region, replacing the marketing site's full-bleed PageShell.",
        status: "Partial",
        source: "src/components/layout/PageShell.tsx (generic marketing wrapper only, no sidebar/app-shell layout)",
        priority: "High",
      },
      {
        name: "Workspace Header",
        purpose: "In-app top bar: page title, breadcrumbs, primary actions — distinct from the design system's own GlobalNav.",
        status: "Needed",
        source: "src/components/layout/GlobalNav.tsx (structurally related, wrong purpose — design-system nav, not app chrome)",
        priority: "High",
      },
      {
        name: "Workspace Navigation",
        purpose: "Primary sidebar/side-nav for moving between the app's top-level sections.",
        status: "Needed",
        priority: "High",
      },
      {
        name: "Section Header",
        purpose: "Title + description + action slot atop a page section.",
        status: "Exists",
        source: "src/components/ui/SectionHeader.tsx",
        priority: "Low",
      },
      {
        name: "Breadcrumbs",
        purpose: "Hierarchical location trail for deep workspace navigation.",
        status: "Needed",
        priority: "Medium",
      },
      {
        name: "Action Toolbar",
        purpose: "Dense row of primary/secondary actions and view toggles attached to a section or table.",
        status: "Needed",
        source: "src/components/ui/CTAGroup.tsx (related shape, built for marketing CTAs not operational density)",
        priority: "Medium",
      },
    ],
  },
  {
    id: "library-asset-management",
    title: "2. Library & Asset Management",
    description: "Browsing, previewing, and inspecting the assets that flow through StudioPOD — the app's primary surface.",
    items: [
      {
        name: "Library Grid",
        purpose: "Responsive grid of asset cards for browsing a library.",
        status: "Partial",
        source: "src/components/layout/CardGrid.tsx (generic grid layout, no asset-specific card slotting)",
        priority: "High",
      },
      {
        name: "Library Table",
        purpose: "Dense, sortable tabular view of library assets — no data table exists anywhere in the codebase today.",
        status: "Needed",
        priority: "High",
      },
      {
        name: "Asset Card",
        purpose: "Single asset summary for grid view: thumbnail, name, status, key metadata.",
        status: "Partial",
        source: "src/production/components/ArtifactCard.tsx (closest analog: FlowCard + health indicator + version caption, but production-specific)",
        priority: "High",
      },
      {
        name: "Asset Preview",
        purpose: "Larger single-asset preview with file/image render and key metadata.",
        status: "Needed",
        priority: "Medium",
      },
      {
        name: "Inspector Panel",
        purpose: "Side panel of properties/detail for a selected item.",
        status: "Partial",
        source: "src/platforms/components/PlatformDetailsPanel.tsx (the pattern recurs domain-by-domain — Platform/Capability/Workflow all have their own — no generic reusable Inspector Panel yet)",
        priority: "High",
      },
      {
        name: "Filter Bar",
        purpose: "Search + category chips + reset for filtering a list or gallery.",
        status: "Exists",
        source: "src/components/ui/FilterBar.tsx",
        priority: "Low",
      },
      {
        name: "Result Summary Bar",
        purpose: "\"Showing X of Y\" count plus a sort control, above a filtered list.",
        status: "Needed",
        priority: "Medium",
      },
    ],
  },
  {
    id: "forms-editing",
    title: "3. Forms & Editing",
    description: "The base input vocabulary is already solid — the gaps are structured/typeahead editing, not raw controls.",
    items: [
      {
        name: "Input",
        purpose: "Standard labeled text field with error/success status styling.",
        status: "Exists",
        source: "src/components/ui/TextInput.tsx",
        priority: "Low",
      },
      {
        name: "Textarea",
        purpose: "Multi-line text field, same status styling as Input.",
        status: "Exists",
        source: "src/components/ui/Textarea.tsx",
        priority: "Low",
      },
      {
        name: "Select",
        purpose: "Native dropdown styled to match the form system.",
        status: "Exists",
        source: "src/components/ui/Select.tsx (native <select>, not a combobox)",
        priority: "Low",
      },
      {
        name: "Combobox",
        purpose: "Typeahead/autocomplete input for searching a large option set.",
        status: "Needed",
        source: "src/components/ui/Select.tsx (adjacent, but confirmed native-only, no typeahead behavior)",
        priority: "Medium",
      },
      {
        name: "Switch",
        purpose: "Binary on/off control.",
        status: "Exists",
        source: "src/components/ui/ToggleSwitch.tsx",
        priority: "Low",
      },
      {
        name: "Checkbox",
        purpose: "Accessible checkbox with indeterminate support.",
        status: "Exists",
        source: "src/components/ui/Checkbox.tsx",
        priority: "Low",
      },
      {
        name: "Field Group",
        purpose: "Layout wrapper for grouping related form fields.",
        status: "Exists",
        source: "src/components/ui/FieldGroup.tsx",
        priority: "Low",
      },
      {
        name: "Validation Message",
        purpose: "Standalone inline error/success/hint message, reusable outside a single input's own status prop.",
        status: "Partial",
        source: "src/components/ui/FormField.tsx (message slot) and src/components/ui/TextInput.tsx (built-in FieldStatus) — no standalone component for arbitrary contexts like a Property Editor row",
        priority: "Medium",
      },
      {
        name: "Property Editor",
        purpose: "Structured key/value grid for editing an item's metadata inside an Inspector Panel.",
        status: "Needed",
        source: "src/components/ui/FieldGroup.tsx (closest generic building block)",
        priority: "High",
      },
    ],
  },
  {
    id: "workflow-operations",
    title: "4. Workflow Operations",
    description: "Running and monitoring work in progress — the diagram libraries explain workflows, but nothing operates on them yet.",
    items: [
      {
        name: "Queue Table",
        purpose: "Sortable table of queued/running/completed jobs with per-row actions.",
        status: "Needed",
        source: "src/motion/primitives/QueueFlow.tsx (a decorative animation of items moving along a track, not a data table)",
        priority: "High",
      },
      {
        name: "Job Status Card",
        purpose: "Single job summary: status, health, timing, primary action.",
        status: "Partial",
        source: "src/workflows/components/WorkflowCard.tsx (the summarize-one-item-as-a-card-with-status pattern is well established, just not for a literal \"job\")",
        priority: "High",
      },
      {
        name: "Batch Action Bar",
        purpose: "\"3 selected: [action] [action]\" bar for acting on multiple selected rows at once.",
        status: "Needed",
        priority: "High",
      },
      {
        name: "Progress Indicator",
        purpose: "Animated fill bar for job/task completion.",
        status: "Exists",
        source: "src/motion/primitives/Progress.tsx (already reused by WorkflowProgress and QualitySummary)",
        priority: "Low",
      },
      {
        name: "Activity Timeline",
        purpose: "Chronological audit/activity log of what happened to an item over time.",
        status: "Partial",
        source: "src/compositions/TimelineComposition.tsx (a generic ordered-steps timeline, reused by WorkflowTimeline/ValidationTimeline — not an audit-log/activity-feed shape)",
        priority: "Medium",
      },
      {
        name: "Approval Panel",
        purpose: "Approve/reject action panel for items requiring human review.",
        status: "Needed",
        priority: "Medium",
      },
    ],
  },
  {
    id: "validation-qa",
    title: "5. Validation & QA",
    description: "StudioPOD's production-validation story is the deepest diagram library the codebase has — but it's all visualization, not operational panels.",
    items: [
      {
        name: "Health Summary",
        purpose: "At-a-glance grid of health metrics (jobs, queue, errors, warnings, health score).",
        status: "Exists",
        source: "src/production/components/HealthDashboardDiagram.tsx",
        priority: "Low",
      },
      {
        name: "Validation Panel",
        purpose: "Standalone panel of a validation run's rule checklist with pass/fail and severity.",
        status: "Partial",
        source: "src/production/components/ValidationDiagram.tsx (the rule checklist exists, but embedded inside a diagram component, not a standalone reusable panel)",
        priority: "Medium",
      },
      {
        name: "QA Finding Card",
        purpose: "One reusable card per individual QA finding/issue, for lists outside a diagram.",
        status: "Needed",
        source: "src/production/components/ValidationDiagram.tsx (the rendering pattern — icon + title + message + severity Badge — lives as inline <li> rows, not its own component)",
        priority: "High",
      },
      {
        name: "Warning Banner",
        purpose: "Full-width inline alert banner for page-level warnings/errors.",
        status: "Needed",
        source: "src/components/ui/Badge.tsx (tone=warning/error is the only building block found; no banner component anywhere)",
        priority: "High",
      },
      {
        name: "Recommendation Card",
        purpose: "Suggested next action surfaced from a QA or health result.",
        status: "Needed",
        priority: "Medium",
      },
      {
        name: "Score Badge",
        purpose: "Compact numeric score chip (e.g. a quality or health score) for dense list rows.",
        status: "Partial",
        source: "src/components/ui/Badge.tsx and src/components/ui/StatCard.tsx (generic pill and large metric+label exist; no compact numeric score chip)",
        priority: "Medium",
      },
    ],
  },
  {
    id: "platform-operations",
    title: "6. Platform Operations",
    description: "Operating the providers, capabilities, and integrations StudioPOD runs on — today these are explained in diagrams, not managed in UI.",
    items: [
      {
        name: "Provider Card",
        purpose: "Single provider summary: status, health, priority.",
        status: "Exists",
        source: "src/capabilities/components/ProviderCard.tsx",
        priority: "Low",
      },
      {
        name: "Capability Matrix",
        purpose: "Grid comparing capabilities across providers.",
        status: "Partial",
        source: "src/compositions/ComparisonComposition.tsx (variant=\"matrix\" is the closest analog, but it's a marketing-page composition, not a capabilities-domain component)",
        priority: "Medium",
      },
      {
        name: "Diagnostics Panel",
        purpose: "Health/latency/version diagnostics for a provider or adapter.",
        status: "Partial",
        source: "src/capabilities/components/AdapterDiagram.tsx (visualizes health/latency/version) and CapabilityDetails.tsx (text detail panel) — no literal diagnostics panel",
        priority: "Medium",
      },
      {
        name: "Metrics Card",
        purpose: "Single stat/metric display for a platform operations dashboard.",
        status: "Exists",
        source: "src/components/ui/StatCard.tsx (generic, not specific to platform ops)",
        priority: "Low",
      },
      {
        name: "Sync Status",
        purpose: "\"Last synced at X\" indicator for an integration or data source.",
        status: "Partial",
        source: "src/illustrations/primitives/HealthIndicator.tsx (covers live/healthy/warning states, not a literal last-synced timestamp indicator)",
        priority: "Medium",
      },
      {
        name: "Error State",
        purpose: "Dedicated no-results/error state for a failed load or empty query.",
        status: "Partial",
        source: "src/compositions/EmptyComposition.tsx (a \"section not built yet\" placeholder, not a true error/empty-query state) and SearchInput.tsx's emptyStateHelper (an inline string slot only)",
        priority: "High",
      },
    ],
  },
];
