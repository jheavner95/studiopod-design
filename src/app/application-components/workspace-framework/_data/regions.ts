export interface RegionLink {
  label: string;
  href: string;
}

export interface WorkspaceRegion {
  id: string;
  name: string;
  purpose: string;
  responsibilities: string[];
  required: string[];
  optional: string[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
  /** Placement in the anatomy grid — "full" spans the whole width, "narrow"/"wide" split the middle row 1:2:1. */
  column: "full" | "narrow" | "wide";
}

/**
 * The seven regions every StudioPOD platform workspace is built from.
 * Content here is original (not restated inventory copy) — where a region
 * maps cleanly onto DS-0.3's families or dependency map, reuseNotes links
 * to it instead of duplicating its description.
 */
export const WORKSPACE_REGIONS: WorkspaceRegion[] = [
  {
    id: "global-navigation",
    name: "Global Navigation",
    purpose: "Application-wide navigation — moving between StudioPOD's platforms, not within one.",
    responsibilities: [
      "Switching between platform workspaces (Publishing, Commerce, Production, and the rest)",
      "Surfacing account-level actions: user menu, notifications",
      "Staying persistent and identical across every platform",
    ],
    required: ["Global Nav", "Workspace Switcher"],
    optional: ["User Menu", "Notifications"],
    reuseNotes:
      "The design system's own top nav is a close relative — a persistent bar linking these docs — but the app's Global Navigation switches platforms, not documentation sections.",
    reuseLinks: [{ label: "Navigation family", href: "/application-components/architecture#navigation" }],
    column: "full",
  },
  {
    id: "workspace-header",
    name: "Workspace Header",
    purpose: "Context for the current platform — what you're looking at and its overall state.",
    responsibilities: [
      "Naming the current platform and workspace",
      "Surfacing platform-level health/status at a glance",
      "Housing the platform's single primary action (e.g. \"New Job\", \"Publish\")",
    ],
    required: ["Title", "Primary Actions"],
    optional: ["Subtitle", "Health", "Status"],
    reuseNotes: "Maps to the Workspace family's Workspace Header item — currently Needed, with no direct existing analog.",
    reuseLinks: [{ label: "Workspace family", href: "/application-components/architecture#workspace" }],
    column: "full",
  },
  {
    id: "workspace-toolbar",
    name: "Workspace Toolbar",
    purpose: "Filtering and acting on whatever the Library region is currently showing.",
    responsibilities: [
      "Searching and filtering the visible object list",
      "Switching between the Library's list/grid/table views",
      "Triggering bulk actions on selected objects",
      "Creating new objects",
    ],
    required: ["Search", "Filters"],
    optional: ["View Toggle", "Bulk Actions", "Sort", "Create"],
    reuseNotes:
      "Never duplicates an action already in the Workspace Header — see Workspace Design Principles below. Built from the Workspace family's Action Toolbar plus Core Components' Filter Bar and Search Input.",
    reuseLinks: [
      { label: "Workspace family", href: "/application-components/architecture#workspace" },
      { label: "Core Components", href: "/core-components" },
    ],
    column: "full",
  },
  {
    id: "library",
    name: "Library Region",
    purpose: "Browse the business objects the current platform manages.",
    responsibilities: [
      "Rendering the current object list in whichever view the Toolbar selected",
      "Handling selection, which drives what the Inspector shows",
      "Showing an honest empty state when there's nothing to browse",
    ],
    required: ["Grid", "Empty State"],
    optional: ["Table", "Tree", "Cards"],
    reuseNotes:
      "Directly the Asset Management family — Library Grid, Library Table, and Filter Bar already exist in some form. Empty State is genuinely new; Error State's inventory entry is the closest analog.",
    reuseLinks: [{ label: "Asset Management family", href: "/application-components/architecture#asset-management" }],
    column: "narrow",
  },
  {
    id: "primary-workspace",
    name: "Primary Workspace",
    purpose: "The main working surface — what a platform is actually for, once something's selected in the Library.",
    responsibilities: [
      "Rendering whichever mode the current platform's task calls for",
      "Owning the platform's most complex, most bespoke interaction",
      "Staying in sync with whatever's selected in the Library and shown in the Inspector",
    ],
    required: ["One mode, chosen per platform"],
    optional: ["Canvas", "Dashboard", "Timeline", "Queue", "Analytics", "Wizard"],
    reuseNotes:
      "The one region with no shared inventory item by design — it's meant to be platform-specific. See Platform Examples below for how six platforms each pick a mode.",
    reuseLinks: [{ label: "Platform Templates", href: "/application-components/templates" }],
    column: "wide",
  },
  {
    id: "inspector",
    name: "Inspector",
    purpose: "Inspect and edit whatever's currently selected, wherever that selection came from.",
    responsibilities: [
      "Rendering identity and editable properties for the selected object",
      "Surfacing validation and health for that object",
      "Showing its recent activity and relationships to other objects",
    ],
    required: ["Identity", "Properties"],
    optional: ["Validation", "Health", "Activity", "Relationships"],
    reuseNotes:
      "Matches the Inspector fan-out on the Architecture page's dependency map exactly. Built from the Asset Management family's Inspector Panel plus Validation & QA.",
    reuseLinks: [
      { label: "Dependency map", href: "/application-components/architecture#dependency-map" },
      { label: "Validation & QA family", href: "/application-components/architecture#validation-qa" },
    ],
    column: "narrow",
  },
  {
    id: "status-activity",
    name: "Status / Activity Bar",
    purpose: "Ambient operational awareness — what's happening across the platform right now, without going to look for it.",
    responsibilities: [
      "Surfacing running/queued job counts",
      "Flagging sync or connection issues",
      "Housing StudioPOD's global progress and notification affordances",
    ],
    required: ["At least one live signal"],
    optional: ["Jobs", "Sync", "Notifications", "Progress", "Recent Activity"],
    reuseNotes:
      "Overlaps with the Workflow family's Job Status Card and Queue Table, and Platform Operations' Sync Status — this bar is where their ambient, always-visible summaries live.",
    reuseLinks: [
      { label: "Workflow family", href: "/application-components/architecture#workflow" },
      { label: "Platform Operations family", href: "/application-components/architecture#platform-operations" },
    ],
    column: "full",
  },
];
