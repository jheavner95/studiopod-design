export interface MetadataAnatomyRegion {
  id: string;
  name: string;
  purpose: string;
  component: string;
  notes: string;
}

/** The eight regions of the canonical metadata anatomy, top to bottom. Actions is deliberately link-only — metadata presents, it never edits. */
export const METADATA_ANATOMY_REGIONS: MetadataAnatomyRegion[] = [
  {
    id: "identity",
    name: "Identity",
    purpose: "\"What am I looking at\" — icon, name, type, and an optional quick-status Badge, always first.",
    component: "IdentityBlock",
    notes: "The same shape every workspace's own Identity anatomy region already establishes — see the Inspector Header and Workspace Status regions.",
  },
  {
    id: "properties",
    name: "Properties",
    purpose: "The object's own read-only fields, grouped and gridded for scanning.",
    component: "PropertyGroup + PropertySection",
    notes: "Properties come before Relationships — an object's own facts are established before what it connects to.",
  },
  {
    id: "relationships",
    name: "Relationships",
    purpose: "Other objects this one is connected to, each optionally linking out.",
    component: "RelationshipList",
    notes: "Generalizes the reuseLinks pattern every workspace's regions.ts file already defines ad hoc, seven times over.",
  },
  {
    id: "status",
    name: "Status",
    purpose: "The object's current state — Draft, Published, Failed — as one or more Badges.",
    component: "StatusSummary",
    notes: "Status comes before Health — what something is takes precedence over how the systems around it are doing.",
  },
  {
    id: "health",
    name: "Health",
    purpose: "Passive, read-only awareness of the systems this object depends on.",
    component: "HealthSummary",
    notes: "Never carries its own action button, echoing Operational Health's own read-only-indicators rule.",
  },
  {
    id: "statistics",
    name: "Statistics",
    purpose: "Numeric metrics about the object, grouped rather than scattered through prose.",
    component: "StatGroup",
    notes: "Reuses StatCard directly — Statistics is an arrangement decision, not a new metric-display primitive.",
  },
  {
    id: "tags",
    name: "Tags",
    purpose: "User- or system-assigned labels, distinct from Status.",
    component: "TagCollection",
    notes: "Tags render last, deliberately lowest in visual weight — see Information Hierarchy below.",
  },
  {
    id: "actions",
    name: "Actions (link only)",
    purpose: "A way to go do something about this object — never a button that does it here.",
    component: "A plain Link, not a foundation component",
    notes: "Metadata presents; Forms edit. An \"Edit\" or \"Archive\" action is a link to where editing actually happens, not an inline control.",
  },
];
