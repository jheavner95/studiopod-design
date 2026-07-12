import { INVENTORY_GROUPS, type InventoryItem, type InventoryPriority } from "../inventory/_data/inventory";

const ALL_ITEMS = INVENTORY_GROUPS.flatMap((group) => group.items);

export interface ComponentFamily {
  id: string;
  title: string;
  purpose: string;
  responsibilities: string[];
  /** Names looked up against the inventory — the family never restates an item's purpose/status/source itself. */
  itemNames: string[];
  priority: InventoryPriority;
  roadmapNotes: string;
}

/**
 * The nine families the Application Component package is organized into.
 * Six map onto existing inventory items (by name, looked up live — never
 * duplicated); Analytics and Platform Templates are net-new families the
 * 40-item inventory doesn't cover yet, called out honestly as 0% covered.
 */
export const COMPONENT_FAMILIES: ComponentFamily[] = [
  {
    id: "navigation",
    title: "Navigation",
    purpose: "Getting a user from one part of the workspace to another.",
    responsibilities: [
      "Primary sidebar/side-nav between top-level app sections",
      "Hierarchical location trail for deep navigation",
    ],
    itemNames: ["Workspace Navigation", "Breadcrumbs"],
    priority: "High",
    roadmapNotes: "Blocks every other family — every other part of the app depends on it for somewhere to be navigated to.",
  },
  {
    id: "workspace",
    title: "Workspace",
    purpose: "The structural chrome every screen is mounted inside.",
    responsibilities: [
      "Top-level app shell layout (sidebar + header + content region)",
      "In-app top bar with page title and primary actions",
      "Section-level title/description/action headers",
      "Dense action toolbars attached to a section or table",
    ],
    itemNames: ["Workspace Shell", "Workspace Header", "Section Header", "Action Toolbar"],
    priority: "High",
    roadmapNotes: "Section Header exists and is reused as-is; the shell and header carry the rest of the family's scope.",
  },
  {
    id: "asset-management",
    title: "Asset Management",
    purpose: "Browsing, previewing, and inspecting the assets that flow through StudioPOD.",
    responsibilities: [
      "Grid and table views of a library",
      "Single-asset summary and detail preview",
      "Selected-item inspector panel",
      "Filtering and result-count feedback for a filtered list",
    ],
    itemNames: [
      "Library Grid",
      "Library Table",
      "Asset Card",
      "Asset Preview",
      "Inspector Panel",
      "Filter Bar",
      "Result Summary Bar",
    ],
    priority: "High",
    roadmapNotes: "The app's primary surface — most workspace templates depend on this family more than any other.",
  },
  {
    id: "forms-editing",
    title: "Forms & Editing",
    purpose: "Collecting and editing structured data.",
    responsibilities: [
      "The base input vocabulary (text, select, checkbox, switch, etc.)",
      "Grouping and validating related fields",
      "Structured key/value property editing inside an Inspector Panel",
    ],
    itemNames: [
      "Input",
      "Textarea",
      "Select",
      "Combobox",
      "Switch",
      "Checkbox",
      "Field Group",
      "Validation Message",
      "Property Editor",
    ],
    priority: "Medium",
    roadmapNotes: "The most complete family — its depth is in structured/typeahead editing, not just raw controls.",
  },
  {
    id: "workflow",
    title: "Workflow",
    purpose: "Running and monitoring work in progress.",
    responsibilities: [
      "Queued/running/completed job tables",
      "Per-job status summaries",
      "Acting on multiple selected items at once",
      "Progress feedback and chronological activity history",
      "Human review/approval on items that need it",
    ],
    itemNames: [
      "Queue Table",
      "Job Status Card",
      "Batch Action Bar",
      "Progress Indicator",
      "Activity Timeline",
      "Approval Panel",
    ],
    priority: "High",
    roadmapNotes: "The workflow diagram libraries (src/workflows) explain workflows visually; this family operates on them.",
  },
  {
    id: "validation-qa",
    title: "Validation & QA",
    purpose: "Surfacing quality and health signals for review.",
    responsibilities: [
      "At-a-glance health metric summaries",
      "Validation rule checklists and individual findings",
      "Page-level warning/error banners",
      "Suggested next actions and compact score chips",
    ],
    itemNames: ["Health Summary", "Validation Panel", "QA Finding Card", "Warning Banner", "Recommendation Card", "Score Badge"],
    priority: "High",
    roadmapNotes: "Draws on StudioPOD's deepest diagram library (src/production), which handles visualization; this family handles the operational panels.",
  },
  {
    id: "platform-operations",
    title: "Platform Operations",
    purpose: "Operating the providers, capabilities, and integrations StudioPOD runs on.",
    responsibilities: [
      "Provider/vendor status summaries",
      "Capability-to-provider comparison",
      "Health/latency/version diagnostics",
      "Dashboard metrics and sync-status indicators",
      "No-results/error states for failed loads",
    ],
    itemNames: ["Provider Card", "Capability Matrix", "Diagnostics Panel", "Metrics Card", "Sync Status", "Error State"],
    priority: "Medium",
    roadmapNotes: "These are explained in capability/provider diagrams (src/capabilities); this family manages them in UI.",
  },
  {
    id: "analytics",
    title: "Analytics",
    purpose: "Reporting and trend analysis across StudioPOD's platforms.",
    responsibilities: [
      "Cross-platform metric rollups and trend charts",
      "Report building and export",
      "Drill-down from a summary metric into its underlying data",
    ],
    itemNames: [],
    priority: "Medium",
    roadmapNotes: "Not represented in the 40-item inventory — a genuinely greenfield family, distinct from the app's other families.",
  },
  {
    id: "platform-templates",
    title: "Platform Templates",
    purpose: "Assembling the eight families above into complete, platform-specific workspaces.",
    responsibilities: [
      "Composing Workspace + Navigation chrome with the families a given platform needs",
      "Defining the core layout pattern each platform's screens follow",
      "Identifying reuse opportunities across platforms before building anything twice",
    ],
    itemNames: [],
    priority: "Low",
    roadmapNotes: "The composition layer, not a component family itself — see the Platform Templates page for the 7 workspaces.",
  },
];

const STATUS_WEIGHT: Record<InventoryItem["status"], number> = {
  Exists: 1,
  Partial: 0.5,
  Needed: 0,
};

/** Resolves a family's item names against the live inventory — never duplicates purpose/status/source. */
export function resolveFamilyItems(family: ComponentFamily): InventoryItem[] {
  return family.itemNames
    .map((name) => ALL_ITEMS.find((item) => item.name === name))
    .filter((item): item is InventoryItem => item !== undefined);
}

/** Weighted completion: Exists=1, Partial=0.5, Needed=0, averaged across the family's items. 0 for families with no inventory items yet. */
export function familyCompletion(family: ComponentFamily): number {
  const items = resolveFamilyItems(family);
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + STATUS_WEIGHT[item.status], 0);
  return Math.round((total / items.length) * 100);
}
