export interface LayoutFutureExtension {
  title: string;
  description: string;
}

/** Concepts the layout rules make room for but don't define yet — reserved, not promised. */
export const LAYOUT_FUTURE_EXTENSIONS: LayoutFutureExtension[] = [
  {
    title: "Resizable panels",
    description: "User-draggable boundaries between Library, Primary Workspace, and Inspector, instead of the fixed proportions in Canonical Region Layout.",
  },
  {
    title: "Dockable inspectors",
    description: "An Inspector that can detach from its rail and float, or dock to a different edge of the Primary Workspace.",
  },
  {
    title: "Multiple inspectors",
    description: "More than the two Dual Inspector supports today — inspecting three or more objects in relation to each other.",
  },
  {
    title: "Split workspace",
    description:
      "Two independent Primary Workspaces side by side, each with its own Library and Inspector — not to be confused with Dual Inspector, which shares one Primary Workspace.",
  },
  {
    title: "Floating tools",
    description: "Toolbar controls that can detach into a floating palette, for Canvas-mode workflows that need tools available anywhere on screen.",
  },
  {
    title: "Canvas overlays",
    description: "Contextual controls that appear directly on the canvas near a selection, instead of routing every action through the Inspector.",
  },
  {
    title: "AI workspace assistant",
    description: "The layout counterpart to the Workspace Framework's own AI Copilot extension — a docking location within the layout has not been defined.",
  },
  {
    title: "Multi-monitor support",
    description: "A workspace that remembers which regions live on which monitor, for Production and Operations setups running more than one screen.",
  },
];
