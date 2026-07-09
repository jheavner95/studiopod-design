export interface InspectorResponsiveMode {
  id: string;
  name: string;
  appropriateAt: string[];
  explanation: string;
}

/** Five presentation modes the Inspector can take, each appropriate at a different breakpoint. */
export const INSPECTOR_RESPONSIVE_MODES: InspectorResponsiveMode[] = [
  {
    id: "docked",
    name: "Docked",
    appropriateAt: ["Desktop"],
    explanation: "Permanently visible alongside Library and Primary Workspace — the default at desktop width, where there's room for all three regions from Workspace Layout's Canonical Region Layout.",
  },
  {
    id: "collapsible",
    name: "Collapsible",
    appropriateAt: ["Desktop", "Tablet"],
    explanation: "Toggleable open or closed without leaving the page — used whenever Inspector visibility should be the user's choice rather than the width's.",
  },
  {
    id: "drawer",
    name: "Drawer",
    appropriateAt: ["Tablet"],
    explanation: "Slides in from the edge, temporarily covering part of the Primary Working Surface — the tablet default, per Workspace Layout's own Inspector-collapse rule.",
  },
  {
    id: "overlay",
    name: "Overlay",
    appropriateAt: ["Tablet", "Mobile"],
    explanation: "A modal-like layer above everything else, dismissed explicitly — used when the Inspector needs full attention without losing the underlying page's scroll position.",
  },
  {
    id: "full-screen",
    name: "Full-screen",
    appropriateAt: ["Mobile"],
    explanation: "The Inspector becomes the entire screen — the mobile default, matching Workspace Layout's own mobile Inspector behavior exactly.",
  },
];
