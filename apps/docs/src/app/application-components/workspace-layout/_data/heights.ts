export interface HeightRule {
  label: string;
  /** 4 = tallest, 1 = shortest. Rendered as a relative bar, never a pixel value. */
  rank: 1 | 2 | 3 | 4;
  description: string;
}

/** Six named heights across four relative tiers — intent, not implementation values. */
export const HEIGHT_RULES: HeightRule[] = [
  {
    label: "Workspace Header",
    rank: 4,
    description: "The tallest of the six — it carries Identity, Status, and Actions simultaneously.",
  },
  {
    label: "Toolbar",
    rank: 3,
    description: "Shorter than the Header — single-purpose, one row of controls.",
  },
  {
    label: "Inspector Header",
    rank: 2,
    description: "The same height as Card Header and Panel Header, deliberately — every \"header of a smaller thing\" reads at one consistent scale, regardless of which region it lives inside.",
  },
  {
    label: "Card Header",
    rank: 2,
    description: "Matches Inspector Header and Panel Header — consistency across nested headers, not per-region variation.",
  },
  {
    label: "Panel Header",
    rank: 2,
    description: "Matches Inspector Header and Card Header — the same rule, applied to any panel anywhere in the anatomy.",
  },
  {
    label: "Status Bar",
    rank: 1,
    description: "The shortest fixed region — ambient awareness, not a primary work surface.",
  },
];
