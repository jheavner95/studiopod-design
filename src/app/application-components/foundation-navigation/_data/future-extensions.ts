export interface NavigationFutureExtension {
  title: string;
  description: string;
}

export const NAVIGATION_FUTURE_EXTENSIONS: NavigationFutureExtension[] = [
  {
    title: "Resizable navigation",
    description: "Drag-to-resize SideNavigation's width, persisted per user — not included because it needs pointer-tracking state this primitive layer doesn't own.",
  },
  {
    title: "Dockable panels",
    description: "Letting NavigationRail or a tree panel detach, float, and redock — a much larger interaction model than anything a Foundation Navigation Adoption Pilot has evidenced a need for yet.",
  },
  {
    title: "Favorites",
    description: "User-starred destinations pinned to the top of SideNavigation or surfaced first in CommandNavigation's results.",
  },
  {
    title: "Pinned items",
    description: "Explicitly pinning specific TreeNavigation nodes or SideNavigation items above their natural sort order.",
  },
  {
    title: "Recent items",
    description: "A \"recently visited\" group automatically populated from real navigation history, surfaced in CommandNavigation or as a NavigationGroup.",
  },
  {
    title: "Workspace history",
    description: "Back/forward navigation within a workspace's own state (not the browser's), independent of the router — the highest-complexity extension on this list.",
  },
];
