export interface SelectionBehavior {
  title: string;
  explanation: string;
}

export const SELECTION_BEHAVIORS: SelectionBehavior[] = [
  {
    title: "Single Selection",
    explanation: "Clicking one object deselects whatever was selected before it — the default, and the only mode some Asset Workspaces need.",
  },
  {
    title: "Multi-selection",
    explanation: "Cmd/Ctrl-click adds or removes one object from the current selection without disturbing the rest.",
  },
  {
    title: "Shift Range",
    explanation: "Shift-click selects every object between the last-selected one and the new click — order matters, direction doesn't.",
  },
  {
    title: "Keyboard Selection",
    explanation: "Arrow keys move focus, Space toggles selection on the focused object — never a mouse-only capability.",
  },
  {
    title: "Select All",
    explanation: "Selects every object on the current page by default; selecting every object across every page is a separate, explicit action.",
  },
  {
    title: "Persistent Selection",
    explanation: "Selection survives a filter change or a sort — narrowing the view doesn't silently discard what was already selected.",
  },
  {
    title: "Selection across pages",
    explanation: "The Results Summary's Selection Count includes objects selected on pages the user has since scrolled past.",
  },
  {
    title: "Bulk Selection",
    explanation: "Once anything is selected, the Workspace Toolbar's Bulk Actions region appears — Selection Model and Bulk Actions are two halves of the same feature.",
  },
];
