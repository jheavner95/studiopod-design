export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface StatusRegion {
  id: string;
  name: string;
  purpose: string;
  examples: string[];
  guidance: RegionGuidance[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
}

/**
 * The seven regions the Operational Status Workspace is built from, top to
 * bottom. Unlike the Inspector, which describes the current selection,
 * this describes the current workspace — running operations, activity,
 * notifications, and platform health — without interrupting the user's
 * primary task.
 */
export const STATUS_REGIONS: StatusRegion[] = [
  {
    id: "workspace-status",
    name: "Workspace Status",
    purpose: "The single most current fact about this workspace, always visible without asking.",
    examples: ["Current Mode", "Selection Count", "Connection Status", "Provider Status", "Workspace State"],
    guidance: [
      {
        label: "Visibility",
        text: "Always on screen, never behind a click — the one region in this whole anatomy that's never optional.",
      },
      {
        label: "Update frequency",
        text: "Live — Workspace Status reflects the current instant, not the last time the page loaded.",
      },
    ],
    reuseNotes: "The workspace-wide sibling of the Inspector Header — same \"what am I looking at right now\" job, scoped to the whole workspace instead of one selected object.",
    reuseLinks: [{ label: "Inspector Workspace", href: "/application-components/inspector-workspace#inspector-header" }],
  },
  {
    id: "background-jobs",
    name: "Background Jobs",
    purpose: "Work happening on its own, without demanding the user's attention until it's done or something goes wrong.",
    examples: ["Publishing", "Generation", "Import", "Export", "Synchronization", "Validation", "AI Tasks"],
    guidance: [
      {
        label: "Progress",
        text: "A visible fill or count for anything with a knowable duration — see the Application Components inventory's own Progress Indicator item.",
      },
      {
        label: "Cancellation",
        text: "Available for any job still running — a background job the user can't stop is a background job they have to trust blindly.",
      },
      {
        label: "Completion",
        text: "A finished job says so and then gets out of the way — completed jobs don't linger and compete with the ones still running.",
      },
      {
        label: "Retry",
        text: "One click for anything that failed, without re-triggering the entire originating action from scratch.",
      },
    ],
    reuseNotes: "Directly the Workflow family's Queue Table and Job Status Card — Background Jobs is where those components' summaries surface outside the Production platform itself.",
    reuseLinks: [{ label: "Workflow family", href: "/application-components/architecture#workflow" }],
  },
  {
    id: "notifications",
    name: "Notifications",
    purpose: "Something happened that the user didn't cause directly and might need to know about.",
    examples: ["Success", "Information", "Warnings", "Errors", "Recommendations"],
    guidance: [
      {
        label: "Priority",
        text: "Errors and Warnings surface above Information and Success — the same severity tiering the Inspector's own Validation region already establishes.",
      },
      {
        label: "Grouping",
        text: "Several notifications about the same underlying event collapse into one, rather than flooding the region with duplicates.",
      },
      {
        label: "Persistence",
        text: "Errors stay until acknowledged; Success and Information fade on their own — not every notification deserves the same lifespan.",
      },
      {
        label: "Dismissal",
        text: "Always available individually, plus a clear-all for the whole region — a notification list that can only grow is a notification list users learn to ignore.",
      },
    ],
    reuseNotes: "The genuinely new region in this anatomy — no direct inventory item yet, closest is the Application Components inventory's own Warning Banner.",
    reuseLinks: [{ label: "Application Components inventory", href: "/application-components/inventory" }],
  },
  {
    id: "activity-timeline",
    name: "Activity Timeline",
    purpose: "What's happened across the whole workspace recently, not just to one selected object.",
    examples: ["Recent Actions", "History", "Automation Events", "Publishing Events", "QA Events", "Workflow Events"],
    guidance: [
      {
        label: "Chronological order",
        text: "Newest first, same non-negotiable rule as the Inspector's own Activity region.",
      },
      {
        label: "Filtering",
        text: "By event type — Publishing, QA, Automation — without ever changing the underlying chronological order.",
      },
      {
        label: "Expansion",
        text: "Collapsed to a handful of recent events by default, with a path to the full history for anything older.",
      },
      {
        label: "Retention",
        text: "How far back this timeline reaches is a platform-level decision, not a per-user preference — Production and Operations workspaces typically need it longer than a Settings workspace does.",
      },
    ],
    reuseNotes: "The workspace-wide sibling of the Inspector's own Activity region — same TimelineComposition primitive, aggregated across every object instead of scoped to one.",
    reuseLinks: [{ label: "Inspector Workspace", href: "/application-components/inspector-workspace#activity" }],
  },
  {
    id: "operational-health",
    name: "Operational Health",
    purpose: "Whether the systems this workspace depends on are actually working, independent of any single object or job.",
    examples: ["Health Score", "Provider Health", "Queue Health", "Synchronization", "Performance", "Storage"],
    guidance: [
      {
        label: "Passive monitoring",
        text: "Reports continuously without the user having to ask — the same passive philosophy the Inspector's own Health region already establishes.",
      },
      {
        label: "Read-only indicators",
        text: "Never its own action button — a degraded Queue Health links to the Queue itself, it doesn't add a Retry-everything button here.",
      },
      {
        label: "Severity",
        text: "Healthy, Degraded, and Down are visually distinct, not one undifferentiated status dot.",
      },
    ],
    reuseNotes: "Directly Platform Operations' own Health Summary and Sync Status — Operational Health is that family's workspace-level home.",
    reuseLinks: [{ label: "Platform Operations family", href: "/application-components/architecture#platform-operations" }],
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    purpose: "Deeper technical detail for troubleshooting, once ambient awareness alone isn't enough to explain what's wrong.",
    examples: ["API Status", "Logs", "Performance", "Errors", "Warnings", "Connectivity"],
    guidance: [
      {
        label: "Developer visibility",
        text: "Detailed enough for engineering to diagnose an issue without a second tool — raw error text and stack context live here, not in Notifications.",
      },
      {
        label: "Operational troubleshooting",
        text: "Where Operational Health said something's wrong, Diagnostics says what, specifically, and often why.",
      },
      {
        label: "Permissions",
        text: "Not every user sees Diagnostics — it's gated the way the Platform Operations family's own Diagnostics Panel is, unlike every other region in this anatomy.",
      },
    ],
    reuseNotes: "Directly the Platform Operations family's Diagnostics Panel item — still Partial.",
    reuseLinks: [{ label: "Platform Operations family", href: "/application-components/architecture#platform-operations" }],
  },
  {
    id: "console",
    name: "Console",
    purpose: "Raw, real-time output for advanced users — the one region built for depth over glanceability.",
    examples: ["Developer Console", "Automation Console", "Job Output", "Live Logs", "Future AI Console"],
    guidance: [
      {
        label: "Optional region",
        text: "The only region in this anatomy explicitly marked optional in the exploded diagram — most workspaces never show it.",
      },
      {
        label: "Advanced users",
        text: "Meaningful mainly to the people building automations or debugging integrations, not the typical day-to-day user.",
      },
      {
        label: "Future extensibility",
        text: "The natural home for whatever comes next that needs raw, streaming output — see Future Extensions below.",
      },
    ],
    reuseNotes: "Overlaps with Workspace Toolbar's own Automation Console future extension — Console is where that extension would actually render.",
    reuseLinks: [{ label: "Workspace Toolbar", href: "/application-components/workspace-toolbar" }],
  },
];
