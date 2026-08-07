export interface SpacingRule {
  label: string;
  text: string;
}

/** Six spacing relationships, described relative to each other and to the design system's existing scale — never a pixel value. */
export const SPACING_RULES: SpacingRule[] = [
  {
    label: "Workspace padding",
    text: "The outermost breathing room between the workspace shell's edge and its content — larger than any spacing inside a region, since it establishes the boundary of the whole surface.",
  },
  {
    label: "Section spacing",
    text: "The gap between major regions — Header to Toolbar, Toolbar to the Library/Primary Workspace/Inspector row — smaller than Workspace padding, larger than anything inside one region.",
  },
  {
    label: "Card spacing",
    text: "The gap between sibling cards in a grid — small enough that cards read as a related set, large enough that no two ever visually merge.",
  },
  {
    label: "Panel spacing",
    text: "Inside the Inspector or any side panel — tighter than Card spacing, since a panel is already a bounded, focused space.",
  },
  {
    label: "Vertical rhythm",
    text: "Every region's internal spacing is a multiple of the same base unit — a Toolbar's padding and a Card's padding come from the same scale, just different steps of it.",
  },
  {
    label: "Component spacing",
    text: "The smallest tier — gaps between a label and its value, an icon and its text — tight enough to read as one unit, not two.",
  },
];

export const SPACING_SCALE_NOTE =
  "None of this needs a new scale. It maps directly onto the design system's existing gap and section-spacing tokens — the work is applying them consistently, not inventing pixel values for a workspace-specific system.";
