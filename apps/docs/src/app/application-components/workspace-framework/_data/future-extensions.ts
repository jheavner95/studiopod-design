export interface FutureExtension {
  title: string;
  description: string;
}

/** Concepts the anatomy makes room for but doesn't define yet — reserved, not promised. */
export const FUTURE_EXTENSIONS: FutureExtension[] = [
  {
    title: "Canvas Mode",
    description:
      "A dedicated freeform-canvas variant of the Primary Workspace, for platforms that need spatial editing beyond the six current modes.",
  },
  {
    title: "Dual Inspector",
    description: "Two Inspector panels open at once, for comparing two selected objects side by side.",
  },
  {
    title: "Bottom Console",
    description:
      "A collapsible console region beneath the Primary Workspace, for logs, terminal-style output, or a chat-style copilot.",
  },
  {
    title: "AI Copilot",
    description: "A persistent assistant surface — likely living in the Bottom Console or as a fourth workspace column.",
  },
  {
    title: "Collaboration",
    description: "Presence indicators and live cursors across Library, Primary Workspace, and Inspector for multi-user editing.",
  },
  {
    title: "Workflow Assistant",
    description: "A guided, step-by-step variant of the Toolbar's Create action, for complex multi-step object creation.",
  },
];
