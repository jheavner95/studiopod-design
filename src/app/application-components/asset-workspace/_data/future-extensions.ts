export interface AssetWorkspaceFutureExtension {
  title: string;
  description: string;
}

/** Concepts the Asset Workspace anatomy makes room for but doesn't define yet — reserved, not promised. */
export const ASSET_WORKSPACE_FUTURE_EXTENSIONS: AssetWorkspaceFutureExtension[] = [
  {
    title: "Smart Collections",
    description: "Saved, dynamic filters that update automatically as new objects match them, rather than a static list.",
  },
  {
    title: "AI Organization",
    description: "Automatic tagging, grouping, or categorization suggestions, reviewed rather than applied silently.",
  },
  {
    title: "Visual Search",
    description: "Search by uploading or selecting a reference image instead of typing — closest match first.",
  },
  {
    title: "Semantic Search",
    description: "Search by meaning or intent rather than exact keyword match — the natural-language search idea the Workspace Toolbar's own future extensions already gesture at.",
  },
  {
    title: "Related Assets",
    description: "Surfacing objects connected to the current selection — same Style, same Provider, same Job — without a manual filter.",
  },
  {
    title: "Favorites",
    description: "A personal, cross-session shortlist, independent of any shared Saved Filter.",
  },
  {
    title: "Pinned Collections",
    description: "A team-shared, curated set of objects kept at the top of the Asset Presentation area regardless of sort.",
  },
  {
    title: "Workspace Layout Presets",
    description: "A saved combination of View, Sort, and Filters, restorable in one click — this workspace's own version of Workspace Layout's saved-layout idea.",
  },
  {
    title: "AI Recommendations",
    description: "Suggested next objects to look at, based on what's currently selected or recently opened.",
  },
];
