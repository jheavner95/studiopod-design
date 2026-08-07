export interface ToolbarVariant {
  id: string;
  title: string;
  purpose: string;
  commonControls: string[];
  uniqueBehaviors: string;
}

/** Seven ways the same eight regions adapt to what a workspace's Primary Workspace mode actually needs. */
export const TOOLBAR_VARIANTS: ToolbarVariant[] = [
  {
    id: "library",
    title: "Library Toolbar",
    purpose: "The default — Search, Filters, View Controls, Sort, and a single Create action.",
    commonControls: ["Search", "Filters", "View Controls", "Sort"],
    uniqueBehaviors: "Bulk Actions appear and disappear entirely based on Library selection state.",
  },
  {
    id: "dashboard",
    title: "Dashboard Toolbar",
    purpose: "Trades Filters and Sort for a date-range picker and a Refresh action — a dashboard is read, not filtered object by object.",
    commonControls: ["Scope picker", "Refresh", "Export"],
    uniqueBehaviors: "No Primary Action in the usual sense — Export is the closest thing, and it's a Workspace Action, not a Create.",
  },
  {
    id: "editor",
    title: "Editor Toolbar",
    purpose: "Search and Filters drop out entirely — editing one object doesn't need to browse for another.",
    commonControls: ["Save state", "Undo / redo", "Publish"],
    uniqueBehaviors: "The only toolbar variant where Primary Action can change mid-session (Save → Publish) as the object's own state changes.",
  },
  {
    id: "queue",
    title: "Queue Toolbar",
    purpose: "Adds Workspace Actions specific to queue health — Pause, Retry — alongside the standard set.",
    commonControls: ["Filters", "Sort", "Bulk Actions"],
    uniqueBehaviors: "Bulk Actions lean toward queue-specific verbs (Retry, Cancel) rather than the generic Delete / Archive / Publish set.",
  },
  {
    id: "settings",
    title: "Settings Toolbar",
    purpose: "Drops almost everything — settings screens are read-then-write, not browse-and-act.",
    commonControls: ["Save changes"],
    uniqueBehaviors: "No Search, no Filters, no View Controls, no Bulk Actions — the sparsest toolbar variant by design.",
  },
  {
    id: "analytics",
    title: "Analytics Toolbar",
    purpose: "Filters become time-range and comparison controls; Sort and View Controls apply to chart order, not object order.",
    commonControls: ["Date range", "Comparison toggle", "Export"],
    uniqueBehaviors: "Search is usually absent — an Analytics workspace is queried through Filters, not searched by name.",
  },
  {
    id: "canvas",
    title: "Canvas Toolbar",
    purpose: "Search, Filters, and Sort all drop out — replaced by tool-selection controls for the canvas itself.",
    commonControls: ["Tool selector", "Zoom", "Undo / redo"],
    uniqueBehaviors: "The only variant whose controls act on the Primary Workspace directly rather than on the Library's object list.",
  },
];
