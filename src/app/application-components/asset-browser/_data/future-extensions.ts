export interface BrowserFutureExtension {
  title: string;
  description: string;
}

export const BROWSER_FUTURE_EXTENSIONS: BrowserFutureExtension[] = [
  { title: "Virtual scrolling", description: "Windowed rendering for a library with thousands of assets — deferred for the same reason Data Grid's own Virtualization extension is deferred: pagination already handles every gallery variant's row count well." },
  { title: "Folder hierarchy", description: "Nested collections within a library — a genuinely different data shape from this family's flat rows array, closer to Navigation's own TreeNavigation than anything Asset Browser does today." },
  { title: "Drag & Drop", description: "Reordering assets, or dragging them into a folder/collection — no current gallery variant has evidenced a need for it." },
  { title: "Multi-select", description: "Already partially covered by AssetSelection's Set<string>-based selection — this extension specifically means shift-click range selection and ctrl/cmd-click toggling, neither of which AssetCard/AssetList wire up yet." },
  { title: "Favorites", description: "Starring specific assets to surface them first — depends on a real screen with a large enough library that scanning becomes the bottleneck, the same reasoning Property Panel recorded for its own Favorites extension." },
  { title: "Collections", description: "User-defined groupings of assets that aren't strictly folders — a saved filter, effectively, layered on top of AssetFilters rather than replacing it." },
  { title: "Smart folders", description: "A collection defined by a filter rule rather than an explicit asset list — depends on Collections existing first." },
  { title: "Preview panel", description: "A larger, dedicated preview (video playback, PDF viewer) distinct from the inspector slot's metadata-focused detail — deferred until a real screen needs more than what an Inspector/Property Panel's thumbnail already shows." },
];
