export interface ToolbarMistake {
  title: string;
  explanation: string;
}

export const TOOLBAR_MISTAKES: ToolbarMistake[] = [
  {
    title: "Multiple primary buttons",
    explanation: "The same failure as a Header with two primary actions — the toolbar now has to compete with itself for the user's next click.",
  },
  {
    title: "Always-visible bulk actions",
    explanation: "Bulk Action buttons with nothing selected invite a misclick that acts on zero objects, or worse, on an unintended default selection.",
  },
  {
    title: "Duplicate header actions",
    explanation:
      "An action already living in the Workspace Header's Primary Actions doesn't need a second button in the Toolbar — see Toolbar Principles' \"headers remain uncluttered.\"",
  },
  {
    title: "Too many filters",
    explanation: "Every quick filter shown inline is one more thing to scan past before finding the one that matters — see the Filters region's progressive disclosure rule.",
  },
  {
    title: "Tiny click targets",
    explanation: "A toolbar packed with eight icon-only controls at Dense density stops being usable on a trackpad, let alone a touchscreen.",
  },
  {
    title: "Toolbar wrapping unpredictably",
    explanation:
      "A toolbar that wraps to a second row at an arbitrary width is worse than one that collapses controls into Overflow at a defined threshold — see Responsive Behavior.",
  },
  {
    title: "Mixing workspace actions with item actions",
    explanation: "Refresh and \"delete the selected items\" are answering two different questions — grouping them together blurs acting on the workspace with acting on a selection.",
  },
];
