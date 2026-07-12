export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface ToolbarRegion {
  id: string;
  name: string;
  purpose: string;
  examples: string[];
  guidance: RegionGuidance[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
}

/**
 * The eight regions the Workspace Toolbar is built from, left to right in
 * anatomy order. The Toolbar provides interaction; the Workspace Header
 * (a separate page) provides context — see that page for the boundary
 * this one keeps referring back to.
 */
export const TOOLBAR_REGIONS: ToolbarRegion[] = [
  {
    id: "search",
    name: "Search",
    purpose: "Finding a specific object without browsing for it.",
    examples: ["Global Search", "Library Search", "Command Search", "Saved Searches"],
    guidance: [
      {
        label: "When it appears",
        text: "Whenever the Library or Primary Workspace has enough objects that browsing alone stops being practical — it's the first control in the toolbar for exactly that reason.",
      },
      {
        label: "Placeholder guidance",
        text: "Names what's being searched, not a generic \"Search…\" — \"Search products\" tells a user the scope before they type a single character.",
      },
      {
        label: "Search scope",
        text: "Defaults to the current Library. Command Search and Global Search are deliberately separate, wider-scoped tools, not settings on the same input.",
      },
    ],
    reuseNotes: "Search Input already exists as a Core Component — this region is that component, placed.",
    reuseLinks: [{ label: "Core Components", href: "/core-components" }],
  },
  {
    id: "filters",
    name: "Filters",
    purpose: "Narrowing the Library down to a relevant subset.",
    examples: ["Status", "Category", "Provider", "Health", "Tags", "Date", "Owner"],
    guidance: [
      {
        label: "Progressive disclosure",
        text: "Two or three quick filters are always visible; everything else lives behind an Advanced Filters control, not stacked inline.",
      },
      {
        label: "Quick filters",
        text: "The one or two filters that matter for almost every visit to this workspace — Status is the closest thing to a universal quick filter across StudioPOD.",
      },
      {
        label: "Advanced filters",
        text: "Everything else, opened deliberately — Provider, Tags, Date, and Owner rarely need to be visible by default.",
      },
      {
        label: "Filter chips",
        text: "Every active filter gets a removable chip, so the current filtered state is always legible without opening the filter panel again.",
      },
      {
        label: "Reset behavior",
        text: "One control clears every active filter at once — never a per-filter-only reset that leaves the rest silently applied.",
      },
    ],
    reuseNotes: "Built from Filter Bar (Core Components, Exists) plus the statuses Health and Validation filters commonly key off of.",
    reuseLinks: [
      { label: "Core Components", href: "/core-components" },
      { label: "Validation & QA family", href: "/application-components/architecture#validation-qa" },
    ],
  },
  {
    id: "view-controls",
    name: "View Controls",
    purpose: "Switching how the Library region renders its objects.",
    examples: ["Grid", "Table", "List", "Gallery", "Timeline", "Canvas", "Split View"],
    guidance: [
      {
        label: "When each is appropriate",
        text: "Grid and Gallery for visual objects, Table and List for dense structured data, Timeline for anything chronological, Canvas and Split View only where the Primary Workspace itself is spatial.",
      },
      {
        label: "Persistence",
        text: "The chosen view survives a session and a reload — re-picking Table every visit is friction, not a preference being respected.",
      },
      {
        label: "Default behavior",
        text: "Every Library ships with one sensible default view; View Controls exist to override it, not to force a choice on first visit.",
      },
    ],
    reuseNotes: "Maps directly to Library Grid and Library Table in the Asset Management family — the toolbar control that switches between them.",
    reuseLinks: [{ label: "Asset Management family", href: "/application-components/architecture#asset-management" }],
  },
  {
    id: "sorting",
    name: "Sorting",
    purpose: "Ordering the Library's current object list.",
    examples: ["Name", "Date", "Modified", "Status", "Priority", "Health", "Ascending", "Descending"],
    guidance: [
      {
        label: "Multi-sort guidance",
        text: "A single sort key covers most workspaces; multi-sort (e.g. Status then Priority) is an escalation, not the default control's job.",
      },
      {
        label: "Default sort",
        text: "Most-recently-modified first, unless a workspace has a stronger domain-specific default — a Queue sorts by priority before it sorts by name.",
      },
      {
        label: "User persistence",
        text: "Like View Controls, the chosen sort survives a reload — sorting is a standing preference, not a one-off action.",
      },
    ],
    reuseNotes: "No dedicated inventory item yet — closest is the Result Summary Bar, which pairs a count with a sort control.",
    reuseLinks: [{ label: "Application Components inventory", href: "/application-components/inventory" }],
  },
  {
    id: "bulk-actions",
    name: "Bulk Actions",
    purpose: "Acting on more than one selected object at once.",
    examples: ["Delete", "Archive", "Publish", "Export", "Sync", "Approve", "Assign"],
    guidance: [
      {
        label: "Appears only after selection",
        text: "Invisible with zero objects selected — Bulk Actions is not a permanent fixture of the toolbar, it's a state that selection triggers.",
      },
      {
        label: "Selection count",
        text: "Always visible alongside the actions themselves — \"12 selected\" is what makes a bulk action safe to trust.",
      },
      {
        label: "Confirmation",
        text: "Anything irreversible confirms before running, scaled to the size of the selection — deleting 1 object and deleting 200 shouldn't feel the same.",
      },
      {
        label: "Danger actions",
        text: "Visually separated from the rest — Delete and Archive don't sit directly next to Publish and Export.",
      },
    ],
    reuseNotes: "Directly the Application Components inventory's Batch Action Bar item — Needed.",
    reuseLinks: [{ label: "Application Components inventory", href: "/application-components/inventory" }],
  },
  {
    id: "workspace-actions",
    name: "Workspace Actions",
    purpose: "Operating on the workspace itself, not on any single selected object.",
    examples: ["Refresh", "Import", "Export", "Validate", "Sync", "Settings", "History"],
    guidance: [
      {
        label: "Workspace-wide operations",
        text: "Apply regardless of what's selected, or whether anything is selected at all — Refresh and Sync don't care about the Library's current selection.",
      },
      {
        label: "Difference from bulk actions",
        text: "Bulk Actions act on a selection and disappear without one; Workspace Actions are always available, because the workspace itself always exists.",
      },
    ],
    reuseNotes: "Overlaps with Platform Operations' Sync Status and Diagnostics Panel — the toolbar control that triggers what those regions display.",
    reuseLinks: [{ label: "Platform Operations family", href: "/application-components/architecture#platform-operations" }],
  },
  {
    id: "primary-action",
    name: "Primary Action",
    purpose: "The one obvious next step for this workspace, always in the same place.",
    examples: ["Create Product", "Create Style", "Publish", "Generate", "Upload", "Run QA"],
    guidance: [
      {
        label: "Rule",
        text: "Exactly one emphasized primary action — the same rule the Workspace Header's own Actions region follows, because the Toolbar and Header never both claim a primary action at once.",
      },
    ],
    reuseNotes: "The same Primary Action a Library Header already carries — the Toolbar's copy exists for workspaces without a Header-level primary action to spare.",
    reuseLinks: [{ label: "Workspace Header", href: "/application-components/workspace-header#actions" }],
  },
  {
    id: "overflow",
    name: "Overflow",
    purpose: "Everything real but rare enough not to earn permanent toolbar space.",
    examples: ["Rare actions", "Developer tools", "Diagnostics", "Advanced options", "Future tools"],
    guidance: [
      {
        label: "Capacity",
        text: "The pressure valve for every other region — when Filters, Sort, or Workspace Actions run out of visible room, Overflow is where they go, not a second toolbar row.",
      },
    ],
    reuseNotes: "The same Overflow Menu the Workspace Header's Actions region already defines — one shared concept, two places it can appear.",
    reuseLinks: [{ label: "Workspace Header", href: "/application-components/workspace-header#actions" }],
  },
];
