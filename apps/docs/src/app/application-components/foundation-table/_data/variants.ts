export interface TableVariant {
  id: string;
  name: string;
  purpose: string;
  advantages: string[];
  typicalPlatforms: string[];
}

export const TABLE_VARIANTS: TableVariant[] = [
  {
    id: "simple",
    name: "Simple Table",
    purpose: "Plain rows and columns with no selection, actions, or status — the default for reference data.",
    advantages: ["Lowest implementation cost", "No selection state to manage", "Reads cleanly at any density"],
    typicalPlatforms: ["Admin", "Intelligence"],
  },
  {
    id: "selectable",
    name: "Selectable Table",
    purpose: "Adds row and select-all checkboxes plus a bulk-action toolbar for acting on many records at once.",
    advantages: ["One selection model shared across every table that needs it", "Bulk actions never duplicated per platform"],
    typicalPlatforms: ["Assets", "Production", "Operations"],
  },
  {
    id: "compact",
    name: "Compact Table",
    purpose: "Tighter row padding (density=\"compact\") for lists where scanning many rows matters more than breathing room.",
    advantages: ["More rows visible without scrolling", "Same components, one prop change"],
    typicalPlatforms: ["Integrations", "Admin"],
  },
  {
    id: "dense",
    name: "Dense Table",
    purpose: "The tightest density (density=\"dense\") for high-volume operational lists — queues, logs.",
    advantages: ["Maximum row density for triage-heavy work", "Still uses the same TableCell/TableHead components, no bespoke markup"],
    typicalPlatforms: ["Production", "Operations"],
  },
  {
    id: "sticky-header",
    name: "Sticky Header Table",
    purpose: "The header stays visible while a long row set scrolls beneath it — TableHeader's default behavior.",
    advantages: ["Column labels never scroll out of view", "No extra configuration — it's the default, not an opt-in"],
    typicalPlatforms: ["Production", "Assets", "Operations"],
  },
  {
    id: "scrollable",
    name: "Scrollable Table",
    purpose: "Wide tables that scroll horizontally within their own bounds via Table's built-in ScrollArea, rather than widening the page.",
    advantages: ["The page itself never overflows, only the table region does", "Reuses ScrollArea directly instead of a bespoke overflow-x-auto"],
    typicalPlatforms: ["Admin", "Intelligence"],
  },
  {
    id: "inspector",
    name: "Inspector Table",
    purpose: "A narrow, often single-column table embedded inside an Inspector panel — properties, relationships.",
    advantages: ["Same TableCell/TableRow primitives at Inspector width", "Consistent with the Inspector Workspace's own anatomy"],
    typicalPlatforms: ["Assets", "Production"],
  },
  {
    id: "queue",
    name: "Queue Table",
    purpose: "The component inventory's own Queue Table item — jobs with status, progress, and row-level cancel/retry actions.",
    advantages: ["Combines TableStatusCell, a Progress cell, and TableActionCell in one row shape", "The clearest real target this system was built for"],
    typicalPlatforms: ["Production", "Integrations", "Operations"],
  },
  {
    id: "metrics",
    name: "Metrics Table",
    purpose: "Dense numeric comparison across rows — the tabular counterpart to a Metrics Card dashboard.",
    advantages: ["Right-aligned Number cells by default", "Sortable columns make comparison practical at any row count"],
    typicalPlatforms: ["Intelligence", "Operations"],
  },
];
