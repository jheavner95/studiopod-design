export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface RegionExample {
  platform: string;
  text: string;
}

export interface HeaderRegion {
  id: string;
  name: string;
  purpose: string;
  responsibilities: string[];
  required: string[];
  optional: string[];
  guidance: RegionGuidance[];
  examples?: RegionExample[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
  /** Placement in the two-row anatomy layout — identity/status/actions share the top row (2:1:1), context is its own full-width row. */
  column: "identity" | "status" | "actions" | "context";
}

/**
 * The four regions the Workspace Header is built from. Order matters here:
 * identity/status/actions must stay consecutive (they fill row one's four
 * grid columns exactly, 2+1+1) with context last, so CSS grid auto-placement
 * doesn't wrap context into the middle of row one.
 */
export const HEADER_REGIONS: HeaderRegion[] = [
  {
    id: "platform-identity",
    name: "Platform Identity",
    purpose: "Establishing what platform you're in and what it's for, at a glance.",
    responsibilities: [
      "Naming the current platform",
      "Pairing that name with a recognizable icon",
      "Giving one sentence of context for what the platform does",
    ],
    required: ["Platform Icon", "Platform Name"],
    optional: ["Platform Description"],
    guidance: [
      {
        label: "Typical usage",
        text: "The icon and name are permanent for a platform — they don't change based on what's selected. The description can shorten or hide once a user is a returning, not first-time, visitor to that platform.",
      },
    ],
    examples: [
      { platform: "Publishing", text: "“Publishing” — “Manage content across every channel.”" },
      { platform: "Commerce", text: "“Commerce” — “Catalog, pricing, and channel sync.”" },
      { platform: "Production", text: "“Production” — “Track jobs from queue to delivery.”" },
      { platform: "Assets", text: "“Assets” — “The library every other platform draws from.”" },
      { platform: "Operations", text: "“Operations” — “Cross-platform health, at a glance.”" },
    ],
    reuseNotes:
      "Maps to the Workspace Header region in the Workspace Framework's anatomy — this is that region's own top line, expanded.",
    reuseLinks: [{ label: "Workspace Framework", href: "/application-components/workspace-framework#workspace-header" }],
    column: "identity",
  },
  {
    id: "status",
    name: "Status",
    purpose: "Surfacing platform-level health and state without making anyone go looking for it.",
    responsibilities: [
      "Showing whether the platform is healthy, degraded, or in an error state",
      "Flagging validation issues that need attention",
      "Indicating sync/connection state to whatever the platform depends on",
    ],
    required: ["At least one status signal, when relevant"],
    optional: ["Health", "Validation", "Sync", "Provider Status", "Last Updated", "Background Jobs", "AI Ready"],
    guidance: [
      {
        label: "When to show",
        text: "Only when the signal can change independently of everything else in the header — a permanently-healthy status isn't worth a badge.",
      },
      {
        label: "Priority",
        text: "Health and Validation outrank everything else — if space is tight, Sync, Provider Status, Last Updated, Background Jobs, and AI Ready are what collapses first.",
      },
      {
        label: "Maximum recommended badges",
        text: "Three, visible at once. A fourth signal moves into the Overflow Menu or the Status/Activity Bar instead of crowding the header.",
      },
      {
        label: "Collapse behavior",
        text: "Badges collapse to icon-only, then to a single summary badge (e.g. “2 issues”), before ever wrapping to a second line.",
      },
    ],
    reuseNotes:
      "Built from the Validation & QA family's Score Badge and Warning Banner, plus Platform Operations' Sync Status and the illustration engine's HealthIndicator — all still Partial or Needed.",
    reuseLinks: [
      { label: "Validation & QA family", href: "/application-components/architecture#validation-qa" },
      { label: "Platform Operations family", href: "/application-components/architecture#platform-operations" },
    ],
    column: "status",
  },
  {
    id: "actions",
    name: "Actions",
    purpose: "Giving the current platform exactly one obvious next step, plus room for the rest.",
    responsibilities: [
      "Surfacing the platform's single primary action",
      "Housing secondary and utility actions without competing with the primary one",
      "Moving anything destructive out of the direct line of a misclick",
    ],
    required: ["Primary Action"],
    optional: ["Secondary Actions", "Utility Actions", "Overflow Menu"],
    guidance: [
      {
        label: "Only one primary action",
        text: "A header with two visually-primary buttons has zero primary actions — the user has to stop and decide which one the platform actually wants them to click.",
      },
      {
        label: "Toolbar actions belong in Workspace Toolbar, not Header",
        text: "Search, filter, sort, and bulk-select act on the Library region below — they belong to the Toolbar, which owns that region, not the Header.",
      },
      {
        label: "Danger actions belong in overflow",
        text: "Delete, archive, and anything irreversible live behind the Overflow Menu — never as a directly visible button next to Primary Action.",
      },
    ],
    reuseNotes:
      "Directly the Workspace Header region's own Primary Actions child in the Workspace Framework, broken out into its full hierarchy here.",
    reuseLinks: [
      { label: "Workspace Framework", href: "/application-components/workspace-framework#workspace-header" },
      { label: "Workspace family", href: "/application-components/architecture#workspace" },
    ],
    column: "actions",
  },
  {
    id: "context",
    name: "Context",
    purpose: "Answering “where am I, exactly” when a platform's hierarchy runs deeper than just its name.",
    responsibilities: [
      "Showing the breadcrumb trail when a user is more than one level deep",
      "Naming the organization and workspace when a user could belong to more than one",
      "Flagging non-production environments unmistakably",
    ],
    required: ["Breadcrumbs"],
    optional: ["Organization", "Workspace", "Environment", "Current selection"],
    guidance: [
      {
        label: "When context appears",
        text: "Only past the platform's root — the top level of a platform (e.g. “Production”) never needs a breadcrumb back to itself.",
      },
      {
        label: "When it should be omitted",
        text: "If a user only ever belongs to one organization and one workspace, Organization and Workspace stay hidden — showing them anyway is noise, not context.",
      },
      {
        label: "Hierarchy rules",
        text: "Organization → Workspace → Platform → current location, left to right, most general to most specific. Environment sits apart from the trail, never inside it.",
      },
    ],
    reuseNotes:
      "The most novel region here — nothing in the current inventory or Workspace Framework anatomy names “breadcrumbs” as its own component yet, though it already sits in the Navigation family.",
    reuseLinks: [{ label: "Navigation family", href: "/application-components/architecture#navigation" }],
    column: "context",
  },
];
