export interface RegionLink {
  label: string;
  href: string;
}

export interface RegionGuidance {
  label: string;
  text: string;
}

export interface AssetWorkspaceRegion {
  id: string;
  name: string;
  purpose: string;
  examples: string[];
  guidance: RegionGuidance[];
  reuseNotes: string;
  reuseLinks: RegionLink[];
}

/**
 * The four regions the Asset Workspace is built from, top to bottom.
 * Applies to every browsable business object — Artwork Projects,
 * Products, Styles, Ratios, Export Presets, Publishing Jobs, Orders,
 * Assets, Integrations, AI Models, Providers, and future object types.
 */
export const ASSET_WORKSPACE_REGIONS: AssetWorkspaceRegion[] = [
  {
    id: "discovery-controls",
    name: "Discovery Controls",
    purpose: "Everything a user touches before deciding what to look at — search, filter, and view choice, bundled into one region.",
    examples: ["Search", "Filter Chips", "Advanced Filters", "Saved Filters", "View Controls", "Sort"],
    guidance: [
      {
        label: "Progressive disclosure",
        text: "Search and two or three Filter Chips are always visible; Advanced Filters and Saved Filters live one level deeper, opened deliberately.",
      },
      {
        label: "Search scope",
        text: "Defaults to whatever object type this Asset Workspace browses — Products, Styles, Assets — never a cross-object global search bundled into the same input.",
      },
      {
        label: "Persistence",
        text: "The active filters, chosen view, and sort order all survive a reload — Discovery Controls represent a standing state, not a one-off query.",
      },
    ],
    reuseNotes: "Functionally the Workspace Toolbar's Search, Filters, View Controls, and Sorting regions, specialized for browsing one object type.",
    reuseLinks: [{ label: "Workspace Toolbar", href: "/application-components/workspace-toolbar" }],
  },
  {
    id: "results-summary",
    name: "Results Summary",
    purpose: "Confirming what the Discovery Controls actually produced, before scanning the results themselves.",
    examples: ["Total Count", "Active Filters", "Selection Count", "Sort", "View"],
    guidance: [
      {
        label: "Behavior",
        text: "Updates immediately when a filter changes or a selection is made — Results Summary is a live readout, never a stale count from the last search.",
      },
      {
        label: "Selection feedback",
        text: "Selection Count only appears once something is selected, the same rule Bulk Actions follows in the Workspace Toolbar.",
      },
    ],
    reuseNotes: "Composed from the Filter & Search family's Result Summary component.",
    reuseLinks: [{ label: "Filter & Search", href: "/application-components/filter-search" }],
  },
  {
    id: "asset-presentation",
    name: "Asset Presentation",
    purpose: "The actual browsing surface — every object currently matching Discovery Controls, rendered in the chosen view.",
    examples: ["Grid", "Table", "List", "Gallery", "Tree", "Timeline"],
    guidance: [
      {
        label: "Grid",
        text: "Best for visual objects where recognition matters more than dense scanning. Advantage: fast visual recognition. Tradeoff: fewer metadata fields per object than Table.",
      },
      {
        label: "Table",
        text: "Best for structured objects with several comparable properties. Advantage: dense, sortable, scannable across many fields at once. Tradeoff: thumbnails shrink to nearly nothing.",
      },
      {
        label: "List",
        text: "A middle ground — one row per object, a small thumbnail, one or two metadata lines. Advantage: more detail than Grid without Table's density. Tradeoff: fewer objects visible per screen than either.",
      },
      {
        label: "Gallery",
        text: "Grid's larger-format sibling — bigger thumbnails, fewer per row. Advantage: best for closely inspecting visual objects before opening one. Tradeoff: the least dense view, worst for large result sets.",
      },
      {
        label: "Tree",
        text: "For objects with a real parent-child hierarchy (a Style's Ratios, a Product's Variants). Advantage: the hierarchy itself is the navigation. Tradeoff: meaningless for flat, unrelated object lists.",
      },
      {
        label: "Timeline",
        text: "For objects with a meaningful chronological order (Publishing Jobs, Orders). Advantage: sequence and recency are immediately legible. Tradeoff: says nothing about an object's other properties.",
      },
    ],
    reuseNotes: "Directly the Library Region's own View Controls output — Library Grid and Library Table already exist in some form; List, Gallery, Tree, and Timeline are new.",
    reuseLinks: [{ label: "Asset Management family", href: "/application-components/architecture#asset-management" }],
  },
  {
    id: "navigation",
    name: "Navigation",
    purpose: "Getting from the current page of results to the next, without losing selection or scroll context.",
    examples: ["Pagination", "Infinite Scroll", "Load More", "Virtualization"],
    guidance: [
      {
        label: "Pagination",
        text: "Recommended when a precise result count and jump-to-page matters more than momentum — Table views, and anywhere users compare specific pages.",
      },
      {
        label: "Infinite Scroll",
        text: "Recommended for visual, exploratory browsing (Grid, Gallery) where momentum matters more than knowing exactly how many results remain.",
      },
      {
        label: "Load More",
        text: "A deliberate middle ground — same momentum as Infinite Scroll, but the user decides when to fetch more, which keeps scroll position predictable.",
      },
      {
        label: "Virtualization",
        text: "Not a navigation pattern on its own — the performance technique underneath any of the three above once a result set is large enough that rendering every row at once would stall the browser.",
      },
    ],
    reuseNotes: "The closest existing pattern is Queue Table's own row-rendering concerns, generalized here to every Asset Presentation view.",
    reuseLinks: [],
  },
];
