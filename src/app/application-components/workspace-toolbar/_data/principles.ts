export interface ToolbarPrinciple {
  title: string;
  explanation: string;
}

export const TOOLBAR_PRINCIPLES: ToolbarPrinciple[] = [
  {
    title: "Interaction belongs here",
    explanation: "If it changes what's on screen — filtering, sorting, selecting, acting — it's a Toolbar concern, not a Header one.",
  },
  {
    title: "Headers remain uncluttered",
    explanation:
      "Every control the Toolbar takes on is one the Header doesn't have to carry — see Workspace Header's own \"toolbar actions belong in Workspace Toolbar\" rule.",
  },
  {
    title: "Frequently used actions stay visible",
    explanation: "Search and the Primary Action never move into Overflow, at any breakpoint — see Responsive Behavior above.",
  },
  {
    title: "Bulk actions appear only when needed",
    explanation: "A Bulk Actions region with nothing selected is dead space — it doesn't render until selection makes it relevant.",
  },
  {
    title: "Primary action remains obvious",
    explanation: "One emphasized control, in the same position, on every toolbar variant — consistency here matters more than any single workspace's preference.",
  },
  {
    title: "Filters should be progressive",
    explanation: "Two or three quick filters, everything else behind Advanced — see the Filters region's own progressive disclosure rule.",
  },
  {
    title: "Avoid toolbar overload",
    explanation: "Eight regions is the ceiling, not a target — most workspaces use five or six, and Overflow exists so the rest don't have to fight for space.",
  },
  {
    title: "Commands should be predictable",
    explanation: "The same action lives in the same region on every workspace — Export is always a Workspace Action, never a Bulk Action on one platform and a Primary Action on another.",
  },
];
