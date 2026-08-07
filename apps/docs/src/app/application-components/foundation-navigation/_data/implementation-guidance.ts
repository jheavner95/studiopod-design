export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Tabs vs. SegmentedControl",
    text: "Use Tabs when switching changes which content panel is visible (a real tabpanel exists). Use SegmentedControl when the choice is a setting or filter value with no separate panel — density, view mode, playback speed. Picking the wrong one gets the ARIA role wrong: a settings toggle rendered as Tabs misleads screen-reader users into expecting a content switch that isn't real navigation.",
  },
  {
    label: "Breadcrumbs vs. ContextNavigation",
    text: "Breadcrumbs shows a path (A > B > C) when the hierarchy itself is the useful information. ContextNavigation shows an object plus its related destinations when the object's identity matters more than how you got there. Don't use Breadcrumbs to fake a \"related links\" list — that's what ContextNavigation is for.",
  },
  {
    label: "SideNavigation vs. NavigationRail",
    text: "SideNavigation is the primary, full-height sidebar for an app's top-level sections. NavigationRail is for a secondary, in-page rail — jumping between sections of one long page, or a compact icon-only rail alongside a SideNavigation. Don't use NavigationRail as a substitute for SideNavigation just because it's narrower; use SideNavigation's own collapsed state for that.",
  },
  {
    label: "TreeNavigation",
    text: "Only reach for this when the data is genuinely hierarchical with an unknown, variable depth (folders, categories within categories). A fixed, shallow two-level structure is better served by SideNavigation's NavigationGroup — simpler DOM, simpler keyboard model, no ARIA tree pattern to get right.",
  },
  {
    label: "Pagination variants",
    text: "Numbered when users need to jump to an arbitrary page (a Library grid). Prev/next only (\"compact\") when position matters more than jumping (a wizard-like flow). Load more when the underlying data is a stream, not a fixed set with a known page count.",
  },
  {
    label: "Stepper",
    text: "For a fixed, known sequence the user moves through in order — an approval flow, a publishing pipeline. Don't use it for arbitrary navigation between unrelated pages; that's what Tabs, SideNavigation, or Breadcrumbs are for. Stepper is read-only progress, not an interactive control.",
  },
  {
    label: "CommandNavigation",
    text: "Add this once an app has enough destinations/actions that typing to find one is genuinely faster than clicking through a hierarchy — a design system with 5 pages doesn't need it. Don't build a second, competing search input; there is one CommandPalette per app.",
  },
  {
    label: "When not to build a new navigation pattern",
    text: "Before hand-rolling another \"row of buttons, one active\" control, check whether Tabs, SegmentedControl, or NavigationItem already covers it — the Migration Notes further down this page document nine real files that didn't check first.",
  },
];
