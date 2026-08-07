export interface StatusResponsiveMode {
  id: string;
  name: string;
  appropriateAt: string[];
  explanation: string;
}

/** Five presentation modes the Operational Status Workspace can take, each appropriate at a different breakpoint. */
export const STATUS_RESPONSIVE_MODES: StatusResponsiveMode[] = [
  {
    id: "bottom-dock",
    name: "Bottom dock",
    appropriateAt: ["Desktop"],
    explanation: "A persistent strip along the bottom of the workspace — visible without claiming width from Library, Primary Workspace, or Inspector.",
  },
  {
    id: "side-panel",
    name: "Side panel",
    appropriateAt: ["Desktop"],
    explanation: "A dedicated column, used when Operational Status needs more room than a bottom dock affords — Production Monitor and Automation Console variants lean this way.",
  },
  {
    id: "drawer",
    name: "Drawer",
    appropriateAt: ["Tablet"],
    explanation: "Slides in from an edge on demand — the tablet default, matching the same pattern the Inspector already uses at this breakpoint.",
  },
  {
    id: "overlay",
    name: "Overlay",
    appropriateAt: ["Tablet", "Mobile"],
    explanation: "A modal-like layer for a specific alert that genuinely needs full attention, dismissed explicitly.",
  },
  {
    id: "hidden-until-needed",
    name: "Hidden until needed",
    appropriateAt: ["Mobile"],
    explanation: "Collapsed entirely behind a badge or icon at mobile width — see Workspace Header's own mobile Status-badge collapse behavior.",
  },
];
