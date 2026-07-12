export interface BrowserFutureExtension {
  title: string;
  description: string;
}

export const BROWSER_FUTURE_EXTENSIONS: BrowserFutureExtension[] = [
  { title: "Virtual scrolling", description: "Windowed rendering for a library with thousands of assets. Not included — pagination already handles every current library size well." },
  { title: "Folder hierarchy", description: "Nested collections within a library — a genuinely different data shape from this family's flat rows array, closer to Navigation's own TreeNavigation than anything Asset Browser does today." },
  { title: "Drag & Drop", description: "Reordering assets, or dragging them into a folder/collection. Not currently supported." },
  { title: "Multi-select", description: "Already partially covered by AssetSelection's Set<string>-based selection — this extension specifically means shift-click range selection and ctrl/cmd-click toggling, neither of which AssetCard/AssetList wire up yet." },
  { title: "Favorites", description: "Starring specific assets to surface them first. Not currently supported — most useful once a library is large enough that scanning becomes a bottleneck." },
  { title: "Collections", description: "User-defined groupings of assets that aren't strictly folders — a saved filter, effectively, layered on top of AssetFilters rather than replacing it." },
  { title: "Smart folders", description: "A collection defined by a filter rule rather than an explicit asset list. Not currently supported — Collections, which this would build on, isn't supported yet either." },
  { title: "Preview panel", description: "A larger, dedicated preview (video playback, PDF viewer) distinct from the inspector slot's metadata-focused detail. Not currently supported — the Inspector/Property Panel's thumbnail is the only preview available today." },
];
