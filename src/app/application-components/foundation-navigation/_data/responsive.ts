export interface BreakpointNote {
  breakpoint: string;
  note: string;
}

export const BREAKPOINT_NOTES: BreakpointNote[] = [
  {
    breakpoint: "Desktop",
    note: "SideNavigation and NavigationRail sit permanently visible alongside content; TopNavigation's item row has room to lay out fully; Breadcrumbs rarely needs its overflow menu.",
  },
  {
    breakpoint: "Tablet",
    note: "The same components remain usable, but SideNavigation is the first candidate for a Collapsed default — this system leaves that choice to the calling page, it doesn't switch automatically.",
  },
  {
    breakpoint: "Mobile",
    note: "TopNavigation's item row scrolls horizontally rather than wrapping (matching GlobalNav's own proven behavior) instead of collapsing into a drawer — a real drawer-based mobile nav is a composition of TopNavigation plus the Overlay System's Drawer, not a mode built into TopNavigation itself.",
  },
];

export interface ResponsiveTopic {
  label: string;
  note: string;
}

export const RESPONSIVE_TOPICS: ResponsiveTopic[] = [
  {
    label: "Collapsing is a controlled prop, not automatic",
    note: "SideNavigation and NavigationRail accept a collapsed boolean the caller sets — this system doesn't watch viewport width and flip it internally, since the right collapse breakpoint is a product decision each workspace should make deliberately.",
  },
  {
    label: "Overflow is handled per component, not globally",
    note: "Breadcrumbs collapses hidden middle crumbs behind a Menu; TopNavigation lets its item row scroll horizontally; Tabs' TabsList scrolls horizontally too rather than wrapping onto a second line.",
  },
  {
    label: "Nested navigation only exists in TreeNavigation and NavigationItem's level prop",
    note: "Every other component in this family is flat by design — SideNavigation's NavigationGroup adds a heading, not a nesting level. Real hierarchical nesting (folders within folders) is TreeNavigation's job specifically.",
  },
];
