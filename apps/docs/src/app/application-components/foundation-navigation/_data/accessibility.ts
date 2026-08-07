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
    label: "Roving tabindex applies to widgets, not to plain link lists — a deliberate split, not an inconsistency",
    text: "Tabs, TreeNavigation, and the Overlay System's Menu (which Breadcrumbs' overflow composes) all implement roving tabindex because each is an ARIA widget pattern (tablist/tree/menu) that owns its own internal arrow-key navigation. SideNavigation, TopNavigation, NavigationRail, and ContextNavigation deliberately do NOT — each renders a plain nav landmark full of ordinary links, where the WAI-ARIA Authoring Practices call for normal Tab-stop-per-link behavior, not a widget's roving tabindex. DS-5E's family audit confirmed this split is correct as-is; do not \"fix\" the landmark-list group to add roving tabindex.",
  },
  {
    label: "NavigationRail: activeId prop for plain href-based rails",
    text: "DS-5E fix — a plain (non-scrollSpy) NavigationRail previously had no way to mark any item as current at all, since it only tracked activeId internally via its scroll-spy observer. It now accepts an optional activeId prop, matching TopNavigation's own activeHref pattern, so a caller-controlled rail can render aria-current correctly too.",
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
