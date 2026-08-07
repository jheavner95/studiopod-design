export interface ScrollConcept {
  term: string;
  definition: string;
}

/** The five scrolling concepts every region's behavior is drawn from. */
export const SCROLL_CONCEPTS: ScrollConcept[] = [
  {
    term: "Fixed",
    definition: "Never scrolls, never moves — its position is absolute for the life of the screen.",
  },
  {
    term: "Sticky",
    definition: "Scrolls until it reaches the top of its container, then stays there — present, but not permanently pinned like Fixed.",
  },
  {
    term: "Scrollable",
    definition: "The umbrella category — anything with more content than it has room for gets a scrollbar somewhere.",
  },
  {
    term: "Independent scroll",
    definition:
      "Scrollable, and specifically not tied to any sibling region's scroll position — the default for Library, Primary Workspace, and Inspector.",
  },
  {
    term: "Synchronized scroll",
    definition:
      "Two regions scrolling together, deliberately — rare, and only where the content genuinely represents the same position in two places (e.g. a side-by-side diff in Comparison View).",
  },
];

export type ScrollBehavior = "Sticky" | "Independent scroll" | "Fixed";

export interface ScrollRegion {
  id: string;
  name: string;
  behavior: ScrollBehavior;
  why: string;
}

/** The six regions the interactive scrolling diagram walks through, in workspace order. */
export const SCROLL_REGIONS: ScrollRegion[] = [
  {
    id: "workspace-header",
    name: "Workspace Header",
    behavior: "Sticky",
    why: "Context must stay visible no matter how far down the Library or Primary Workspace scrolls — losing sight of which platform you're in is disorienting.",
  },
  {
    id: "toolbar",
    name: "Toolbar",
    behavior: "Sticky",
    why: "Filters and actions need to stay reachable while scrolling a long list — re-scrolling to the top just to change a filter defeats the point of the toolbar.",
  },
  {
    id: "library",
    name: "Library",
    behavior: "Independent scroll",
    why: "A long object list scrolls on its own, without dragging the Primary Workspace or Inspector along with it — the three regions represent three different scroll positions in three different data sets.",
  },
  {
    id: "primary-workspace",
    name: "Primary Workspace",
    behavior: "Independent scroll",
    why: "The main working surface scrolls independently too — reading a long document in the Primary Workspace shouldn't move the Library's scroll position underneath it.",
  },
  {
    id: "inspector",
    name: "Inspector",
    behavior: "Independent scroll",
    why: "A long property list scrolls in place — switching selection resets Inspector scroll to the top, since it's now describing a different object entirely.",
  },
  {
    id: "status-bar",
    name: "Status Bar",
    behavior: "Fixed",
    why: "Ambient awareness only works if it's always in the same place — a Status Bar that scrolls away stops being ambient.",
  },
];
