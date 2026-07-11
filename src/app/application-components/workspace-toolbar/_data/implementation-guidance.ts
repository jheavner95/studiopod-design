export interface GuidanceLink {
  label: string;
  href: string;
}

export interface ToolbarImplementationGuidance {
  label: string;
  text: string;
  links?: GuidanceLink[];
  /** Which page section this item belongs under once split out of one flat list. */
  category: "composition" | "accessibility";
}

export const TOOLBAR_IMPLEMENTATION_GUIDANCE: ToolbarImplementationGuidance[] = [
  {
    label: "Maximum visible controls",
    text: "Eight regions at full desktop width; most real workspaces use five or six. Overflow absorbs the rest before an eighth region ever appears.",
    category: "composition",
  },
  {
    label: "Search placement",
    text: "Always first, always leftmost — the one control a user reaches for before deciding anything else about the toolbar.",
    category: "composition",
  },
  {
    label: "Filter ordering",
    text: "Quick filters first, in order of how often they change; Advanced Filters last, since it's opened deliberately rather than scanned.",
    category: "composition",
  },
  {
    label: "Action grouping",
    text: "Bulk Actions, Workspace Actions, and Primary Action are visually separated groups, not one undifferentiated row of buttons.",
    category: "composition",
  },
  {
    label: "Overflow thresholds",
    text: "A region collapses into Overflow before it would force the toolbar to wrap — see Behavior's Control priority rule.",
    category: "composition",
  },
  {
    label: "Accessibility",
    text: "Every control is a real, labeled interactive element — no bare icon without an accessible name, regardless of how familiar the icon looks.",
    category: "accessibility",
  },
  {
    label: "Keyboard navigation",
    text: "Tab order follows region order left to right; a single keyboard shortcut (e.g. \"/\") focuses Search from anywhere in the workspace.",
    category: "accessibility",
  },
  {
    label: "Focus behavior",
    text: "Selecting a Bulk Action doesn't steal focus from the Library — the action executes, and focus stays where the user's attention already is.",
    category: "accessibility",
  },
  {
    label: "ARIA recommendations",
    text: "The Toolbar is its own labeled landmark, distinct from the Header's own landmark, so assistive technology can jump directly to either.",
    links: [{ label: "Workspace Header", href: "/application-components/workspace-header" }],
    category: "accessibility",
  },
];
