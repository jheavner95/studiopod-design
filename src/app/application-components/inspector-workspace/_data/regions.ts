export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface InspectorRegion {
  id: string;
  name: string;
  purpose: string;
  examples: string[];
  guidance: RegionGuidance[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
}

/**
 * The eight regions the Inspector is built from, top to bottom. The
 * Inspector is never the primary workspace — it responds to the current
 * selection and should feel identical across every StudioPOD platform.
 */
export const INSPECTOR_REGIONS: InspectorRegion[] = [
  {
    id: "inspector-header",
    name: "Inspector Header",
    purpose: "Confirming what's selected, before inspecting anything about it.",
    examples: ["Object icon", "Object name", "Type", "Quick status", "Favorite", "Collapse"],
    guidance: [
      {
        label: "Behavior",
        text: "Updates the instant selection changes — the Inspector Header is the fastest-changing region in the entire anatomy, since a new selection means an entirely new object underneath it.",
      },
      {
        label: "Sticky behavior",
        text: "Stays visible while Properties, Relationships, and the rest of the Inspector scroll beneath it — the same sticky rule the Workspace Header itself follows, applied one level down.",
      },
    ],
    reuseNotes: "The Inspector's own version of Platform Identity — same job, narrower scope (one selected object, not a whole platform).",
    reuseLinks: [{ label: "Workspace Header", href: "/application-components/workspace-header#platform-identity" }],
  },
  {
    id: "identity",
    name: "Identity",
    purpose: "Recognize the selected object immediately.",
    examples: ["ID", "Name", "Owner", "Created", "Modified", "Provider", "Tags"],
    guidance: [
      {
        label: "Read-only",
        text: "Every field here describes the object, none of them edit it — Identity answers \"what is this,\" Properties answers \"how do I change it.\"",
      },
    ],
    reuseNotes: "Directly the Inspector fan-out from Workspace Framework's own dependency map — Identity was always the first of its five children.",
    reuseLinks: [{ label: "Dependency map", href: "/application-components/architecture#dependency-map" }],
  },
  {
    id: "properties",
    name: "Properties",
    purpose: "The object's own editable surface — everything about it that can actually change.",
    examples: ["Editable fields", "Configuration", "Metadata", "Settings"],
    guidance: [
      {
        label: "Inline editing",
        text: "Fields edit in place — no separate \"edit mode\" toggle for the whole panel, since most visits only touch one or two fields.",
      },
      {
        label: "Grouping",
        text: "Related fields cluster together (all Configuration, all Metadata) rather than one long undifferentiated list.",
      },
      {
        label: "Validation",
        text: "A field's own validation state shows right next to it as it's edited — waiting for the Validation region below to catch a problem is too late.",
      },
      {
        label: "Progressive disclosure",
        text: "Common fields first, advanced Configuration behind an expand — the same rule Workspace Toolbar's Filters region already follows.",
      },
    ],
    reuseNotes: "Directly the Property Editor item from the Application Components inventory — still Needed.",
    reuseLinks: [{ label: "Application Components inventory", href: "/application-components/inventory" }],
  },
  {
    id: "relationships",
    name: "Relationships",
    purpose: "Everything the selected object is connected to, one click away.",
    examples: ["Parent", "Children", "Dependencies", "Connected Assets", "Publishing Targets", "Commerce Products", "Generation Profiles"],
    guidance: [
      {
        label: "Navigation",
        text: "Every relationship is a real link — clicking one selects that object instead, keeping the whole Inspector in the same anatomy rather than opening something new.",
      },
      {
        label: "Linked objects",
        text: "Shows enough identity (name, type, status) to recognize the linked object without following it — the same recognition-over-recall principle the Asset Workspace already establishes.",
      },
      {
        label: "Cross-platform relationships",
        text: "A relationship can point to an object on an entirely different platform — a Product's Publishing Targets live on the Publishing platform, not Commerce — and the Inspector doesn't hide that.",
      },
    ],
    reuseNotes: "Matches the Inspector fan-out's own Relationships child from the Workspace Framework's dependency map.",
    reuseLinks: [{ label: "Dependency map", href: "/application-components/architecture#dependency-map" }],
  },
  {
    id: "validation",
    name: "Validation",
    purpose: "Whether the selected object is actually correct, not just complete.",
    examples: ["Errors", "Warnings", "Recommendations", "Quality Score", "Required fields"],
    guidance: [
      {
        label: "Severity",
        text: "Errors, Warnings, and Recommendations are visually distinct tiers, never one undifferentiated list of issues.",
      },
      {
        label: "Grouping",
        text: "Related findings group together rather than repeating the same root cause as five separate line items.",
      },
      {
        label: "Fix guidance",
        text: "Every finding says what would resolve it, not just that something's wrong — see the Application Components inventory's own QA Finding Card item.",
      },
    ],
    reuseNotes: "Built from the Validation & QA family — Validation Panel, QA Finding Card, and Score Badge all live here.",
    reuseLinks: [{ label: "Validation & QA family", href: "/application-components/architecture#validation-qa" }],
  },
  {
    id: "health",
    name: "Health",
    purpose: "Read-only operational awareness — is anything about this object's surrounding systems degraded.",
    examples: ["Operational Health", "Sync Status", "Publishing Status", "Generation Status", "Provider Status"],
    guidance: [
      {
        label: "Read-only operational awareness",
        text: "Health never has its own actions — a degraded Sync Status links to the Provider Inspector where sync can actually be retried, it doesn't add a Retry button to every object that happens to depend on that provider.",
      },
    ],
    reuseNotes: "Directly Platform Operations' Sync Status and the illustration engine's HealthIndicator, scoped to one object instead of a whole platform.",
    reuseLinks: [{ label: "Platform Operations family", href: "/application-components/architecture#platform-operations" }],
  },
  {
    id: "activity",
    name: "Activity",
    purpose: "What's happened to this object over time.",
    examples: ["Version History", "Audit Log", "Recent Actions", "Comments", "Timeline"],
    guidance: [
      {
        label: "Chronological presentation",
        text: "Always newest-first — Activity is the one region in the entire Inspector where order isn't a preference, it's the point.",
      },
      {
        label: "Filtering",
        text: "By type (Comments vs. system Audit Log entries) — never a reason to change the chronological order itself.",
      },
      {
        label: "Expansion",
        text: "Collapsed to recent entries by default, with a clear path to the full history — most visits only need to know what happened most recently.",
      },
    ],
    reuseNotes: "Reuses TimelineComposition, the same primitive Workflow Patterns and Validation & QA's own Activity Timeline item already build on.",
    reuseLinks: [{ label: "Workflow Patterns", href: "/workflow-patterns" }],
  },
  {
    id: "inspector-actions",
    name: "Inspector Actions",
    purpose: "What can be done to this specific object, and only this object.",
    examples: ["Duplicate", "Archive", "Delete", "Publish", "Run QA", "Generate", "Export", "Open Related"],
    guidance: [
      {
        label: "Object-level actions only",
        text: "Every action here operates on the one selected object — nothing workspace-wide, nothing bulk.",
      },
      {
        label: "Never duplicate Workspace Toolbar actions",
        text: "Publish appears in the Toolbar's Primary Action when nothing's selected, and in Inspector Actions once something is — the two never show it at the same time for the same object.",
      },
    ],
    reuseNotes: "The object-scoped sibling of Workspace Toolbar's Bulk Actions — same verbs, applied to one object instead of a selection.",
    reuseLinks: [{ label: "Workspace Toolbar", href: "/application-components/workspace-toolbar#bulk-actions" }],
  },
];
