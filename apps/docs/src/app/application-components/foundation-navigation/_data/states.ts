export interface NavigationStateNote {
  state: string;
  note: string;
}

export const NAVIGATION_STATES: NavigationStateNote[] = [
  { state: "Default", note: "The resting appearance of every item — muted text, no background, in every component in this family." },
  { state: "Hover", note: "A subtle surface-hover background on links and buttons — NavigationItem, Tab, Pagination's numbered buttons, TreeNavigation's rows." },
  { state: "Active", note: "The current destination — accent text plus (where the item is a full row, not a plain link) a soft accent background, and aria-current=\"page\"/\"step\" wherever the DOM has a real notion of current." },
  { state: "Focused", note: "Every interactive element uses the same .focus-ring utility as the rest of this design system — a visible 2px accent outline on :focus-visible, never a color-only change." },
  { state: "Disabled", note: "Pointer-events removed and opacity reduced — NavigationItem, Tab, and Pagination's prev/next buttons all support it; a disabled item is never just visually muted while remaining clickable." },
  { state: "Loading", note: "Pagination's load-more variant swaps its label for \"Loading…\" and disables the button — the only component in this family with a real loading state, since the rest are synchronous, client-side switches." },
  { state: "Collapsed", note: "Icon-only mode for SideNavigation and NavigationRail, cascaded to every NavigationItem/NavigationGroup inside via NavigationCollapsedContext — labels move into a Tooltip instead of disappearing entirely." },
  { state: "Expanded", note: "The opposite of Collapsed for SideNavigation/NavigationRail, and TreeNavigation's per-node aria-expanded state for revealing children." },
  { state: "Selected", note: "TreeNavigation's aria-selected on the current node, and Tabs'/SegmentedControl's aria-selected/aria-checked on the active choice — distinct from Active, since a tree node or tab can be selected without being a full-page \"current destination.\"" },
];
