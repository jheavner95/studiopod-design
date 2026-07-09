export interface DensityDimension {
  label: string;
  value: string;
}

export interface DensityLevel {
  id: string;
  name: string;
  recommendedUsage: string;
  dimensions: DensityDimension[];
}

/** Three density levels, each expressed across the same five dimensions — design intent, not pixel values. */
export const DENSITY_LEVELS: DensityLevel[] = [
  {
    id: "comfortable",
    name: "Comfortable",
    recommendedUsage: "The default for most workspaces — optimized for scanning, not maximum density.",
    dimensions: [
      { label: "Spacing", value: "Generous — matches the design system's default section rhythm" },
      { label: "Table rows", value: "Tall enough for a secondary line of metadata under the primary value" },
      { label: "Card spacing", value: "Full gap scale — cards read as distinct objects, not a packed grid" },
      { label: "Toolbar spacing", value: "Room for an icon and a label on every action, not icon-only" },
      { label: "Inspector spacing", value: "One property per row, generous label-to-value separation" },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    recommendedUsage: "A tighter default for power users who spend most of a session in one workspace.",
    dimensions: [
      { label: "Spacing", value: "Reduced — one step down from Comfortable's section rhythm" },
      { label: "Table rows", value: "Single line, with metadata reachable on hover instead of always visible" },
      { label: "Card spacing", value: "Tighter gap scale — more cards visible without scrolling" },
      { label: "Toolbar spacing", value: "Icon-first, with labels appearing on hover or at wider widths" },
      { label: "Inspector spacing", value: "Related properties group with less separation between them" },
    ],
  },
  {
    id: "dense",
    name: "Dense",
    recommendedUsage: "Maximum information per screen — Queue and Operations workspaces monitoring many objects at once.",
    dimensions: [
      { label: "Spacing", value: "Minimum — the tightest step on the existing spacing scale, never a new one" },
      { label: "Table rows", value: "Single line, metadata moves entirely into an expand action" },
      { label: "Card spacing", value: "Cards touch or near-touch, separated by a border rather than a gap" },
      { label: "Toolbar spacing", value: "Icon-only for everything except the single Primary Action" },
      { label: "Inspector spacing", value: "Properties read as a compact table, not individually spaced rows" },
    ],
  },
];
