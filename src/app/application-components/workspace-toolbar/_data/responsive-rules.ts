export interface ToolbarResponsiveRule {
  dimension: string;
  desktop: string;
  tablet: string;
  mobile: string;
  /** Structural compatibility with ResponsiveRulesTableRow's index signature. */
  [key: string]: string;
}

/** Five dimensions of responsive toolbar behavior, each stated as a rule per breakpoint — conceptual, not tied to a literal pixel breakpoint. */
export const TOOLBAR_RESPONSIVE_RULES: ToolbarResponsiveRule[] = [
  {
    dimension: "Toolbar wrapping",
    desktop: "Never — every control fits on one row.",
    tablet: "Secondary controls (Sort, Workspace Actions) move to Overflow before the row wraps.",
    mobile: "Search and Primary Action are the only two guaranteed a spot; everything else is Overflow.",
  },
  {
    dimension: "Control priority",
    desktop: "All eight regions visible simultaneously.",
    tablet: "Search, Filters, Primary Action, and Overflow stay; View Controls and Sort fold into Overflow.",
    mobile: "Search and Primary Action only — everything else, including Filters, lives behind Overflow.",
  },
  {
    dimension: "Overflow behavior",
    desktop: "Reserved for genuinely rare actions — see the Overflow region's own examples.",
    tablet: "Also absorbs whatever Control priority just demoted.",
    mobile: "The default home for most of the toolbar, not an edge case.",
  },
  {
    dimension: "Collapsing filters",
    desktop: "Quick filters visible inline, Advanced Filters behind one control.",
    tablet: "Quick filters collapse into the same Advanced Filters control — no inline filters left.",
    mobile: "Filters becomes a single full-screen sheet, opened from Overflow.",
  },
  {
    dimension: "Search behavior",
    desktop: "A persistent, always-visible input.",
    tablet: "Collapses to an icon that expands into an input on tap.",
    mobile: "Same icon-to-input pattern, but the expanded input takes the full toolbar width.",
  },
];
