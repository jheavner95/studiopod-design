export interface NavigationAccessibilityTopic {
  label: string;
  text: string;
}

export const NAVIGATION_ACCESSIBILITY_TOPICS: NavigationAccessibilityTopic[] = [
  {
    label: "Tabs: full ARIA tabs pattern",
    text: "role=\"tablist\"/\"tab\"/\"tabpanel\", roving tabindex (only the selected tab is tab-stoppable), and Left/Right/Home/End move between tabs — activating on arrow-key move (not requiring a separate Enter), matching the ARIA APG's automatic-activation tabs pattern.",
  },
  {
    label: "TreeNavigation: full ARIA tree pattern",
    text: "role=\"tree\"/\"treeitem\"/\"group\", aria-expanded on parent nodes, aria-selected on the current node. Right expands a collapsed node or moves into its first child; Left collapses an expanded node or moves to its parent; Up/Down move between every currently visible item; Enter/Space selects.",
  },
  {
    label: "SegmentedControl: ARIA radiogroup pattern",
    text: "Reused from src/components/ui/SegmentedControl.tsx unchanged — role=\"radiogroup\"/\"radio\", roving tabindex, Left/Right/Up/Down/Home/End.",
  },
  {
    label: "Breadcrumbs / Pagination / SideNavigation / TopNavigation / NavigationRail / ContextNavigation: nav landmarks + aria-current",
    text: "Every one of these renders a real <nav> with an accessible label, and marks the current item with aria-current=\"page\" (or \"step\" for Stepper) rather than relying on color alone.",
  },
  {
    label: "Focus is never trapped outside an overlay",
    text: "Nothing in this family traps Tab focus — that behavior belongs to the Overlay System (Dialog, Drawer, Menu), which this family composes rather than duplicates (Breadcrumbs' overflow and CommandNavigation's trigger both reuse Overlay's Menu/CommandPalette directly).",
  },
  {
    label: "Collapsed navigation never loses its label",
    text: "NavigationItem wraps its content in the Overlay System's Tooltip when collapsed and a label is available, so an icon-only SideNavigation or NavigationRail still exposes its text to hover and keyboard-focus users, not just sighted mouse users who can guess from the icon.",
  },
  {
    label: "Announcements",
    text: "This family relies on native semantics (aria-current, aria-selected, aria-expanded) rather than a separate live-region announcement layer — the same approach already verified across Foundation Table and the Overlay System. No component here introduces its own aria-live region.",
  },
];
