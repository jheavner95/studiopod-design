export interface InspectorVariant {
  id: string;
  title: string;
  purpose: string;
  differences: string[];
  sharedAnatomy: string;
}

export const INSPECTOR_VARIANTS: InspectorVariant[] = [
  {
    id: "asset",
    title: "Asset Inspector",
    purpose: "Inspecting one file or artwork asset.",
    differences: [
      "Properties emphasizes file metadata (dimensions, format, color profile)",
      "Relationships shows every object referencing this asset",
    ],
    sharedAnatomy: "All eight regions present — the closest to the anatomy's default form.",
  },
  {
    id: "project",
    title: "Project Inspector",
    purpose: "Inspecting a whole Artwork Project, not a single asset within it.",
    differences: [
      "Relationships is the largest region — a Project's whole point is the objects it contains",
      "Activity aggregates every child object's history, not just the Project's own",
    ],
    sharedAnatomy: "Health reflects the worst status among all child objects, not an independent signal.",
  },
  {
    id: "publishing",
    title: "Publishing Inspector",
    purpose: "Inspecting a job moving through the publishing pipeline.",
    differences: [
      "Health is the most prominent region — publishing status is usually the first thing worth knowing",
      "Inspector Actions centers on Publish, Retry, and Cancel",
    ],
    sharedAnatomy: "Validation gates Inspector Actions — a job with unresolved Errors can't Publish from here.",
  },
  {
    id: "commerce",
    title: "Commerce Inspector",
    purpose: "Inspecting a product, listing, or order.",
    differences: [
      "Relationships spans platforms — Publishing Targets and Generation Profiles both live elsewhere",
      "Properties includes pricing and channel-specific configuration",
    ],
    sharedAnatomy: "Identity still leads — a SKU and channel are as much \"what is this\" as a name.",
  },
  {
    id: "provider",
    title: "Provider Inspector",
    purpose: "Inspecting an integration or AI, publishing, or commerce provider itself.",
    differences: [
      "Health is nearly the entire Inspector — a provider's operational status is most of what there is to inspect",
      "Relationships lists every object currently depending on this provider",
    ],
    sharedAnatomy: "Inspector Actions are administrative (reconnect, rotate credentials) rather than object-production verbs like Publish or Generate.",
  },
  {
    id: "settings",
    title: "Settings Inspector",
    purpose: "Inspecting (and editing) a configuration object rather than a business object.",
    differences: [
      "Properties dominates — Settings objects exist almost entirely to be edited",
      "Validation, Health, and Activity are minimal or absent — a setting doesn't have operational health",
    ],
    sharedAnatomy: "Identity and Properties still lead, in the same order as every other variant.",
  },
  {
    id: "analytics",
    title: "Analytics Inspector",
    purpose: "Inspecting one metric or report, drilled down from an Analytics Primary Workspace.",
    differences: [
      "Properties is replaced by a data/comparison view rather than editable fields",
      "Inspector Actions is nearly empty — Export is close to the only one",
    ],
    sharedAnatomy: "Identity still names what's being looked at, even though nothing here is edited.",
  },
];
