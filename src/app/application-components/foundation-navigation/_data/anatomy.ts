export interface NavigationAnatomyRegion {
  name: string;
  description: string;
  components: string;
}

/** The six navigation anatomy categories this system covers — every component in src/components/navigation/ belongs to exactly one. */
export const NAVIGATION_ANATOMY: NavigationAnatomyRegion[] = [
  {
    name: "Global",
    description: "The persistent, app-wide top bar — always visible, moves between top-level destinations.",
    components: "TopNavigation (generalizes this design system's own GlobalNav)",
  },
  {
    name: "Workspace",
    description: "The primary sidebar for moving between an app's top-level sections, expandable or collapsed to icons.",
    components: "SideNavigation, composed from NavigationSection/NavigationGroup/NavigationItem, with NavigationDivider for a plain separator between groups when no group heading is needed",
  },
  {
    name: "Section",
    description: "An in-page rail that highlights whichever section is currently in view, or a plain compact icon rail.",
    components: "NavigationRail (generalizes the scroll-spy pattern in src/app/design-system/_components/PlaygroundNav.tsx)",
  },
  {
    name: "Context",
    description: "Surfacing the current object and its related destinations — not a path, an object.",
    components: "ContextNavigation",
  },
  {
    name: "Inline",
    description: "Switching between views, pages, or steps without leaving the current context.",
    components: "Tabs, SegmentedControl, Breadcrumbs, Pagination, Stepper, TreeNavigation",
  },
  {
    name: "Command",
    description: "A searchable, keyboard-first way to jump to any action or destination without the mouse.",
    components: "CommandNavigation (a trigger for the Overlay System's CommandPalette — the search/keyboard/ARIA logic lives there, not duplicated here)",
  },
];
