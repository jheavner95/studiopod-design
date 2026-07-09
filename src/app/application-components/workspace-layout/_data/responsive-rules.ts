export interface ResponsiveRule {
  dimension: string;
  desktop: string;
  tablet: string;
  mobile: string;
  /** Structural compatibility with ResponsiveRulesTableRow's index signature. */
  [key: string]: string;
}

/** Seven dimensions of responsive behavior, each stated as a rule per breakpoint — conceptual, not tied to a literal pixel breakpoint. */
export const RESPONSIVE_RULES: ResponsiveRule[] = [
  {
    dimension: "Library collapse",
    desktop: "Never — always visible as its own rail.",
    tablet: "Collapses behind a toggle once an Inspector is open.",
    mobile: "Always collapsed — reachable via the Toolbar's view toggle.",
  },
  {
    dimension: "Inspector collapse",
    desktop: "Only when nothing is selected.",
    tablet: "Replaces the Library when open — the two never share width.",
    mobile: "Opens as a full-screen sheet over the Primary Workspace.",
  },
  {
    dimension: "Toolbar wrapping",
    desktop: "Single row, every control visible.",
    tablet: "Secondary controls move into an overflow menu before wrapping to a second row.",
    mobile: "Search stays; everything else collapses into a single overflow menu.",
  },
  {
    dimension: "Navigation behavior",
    desktop: "Persistent sidebar, always expanded.",
    tablet: "Collapses to icon-only, expandable on demand.",
    mobile: "Hidden behind a menu button — never persistent.",
  },
  {
    dimension: "Status movement",
    desktop: "Lives in the Workspace Header, up to three badges.",
    tablet: "Collapses to one summary badge in the Header.",
    mobile: "Moves out of the Header entirely, into the Status / Activity Bar.",
  },
  {
    dimension: "Preferred breakpoints (conceptually)",
    desktop: "Enough width for Library, Primary Workspace, and Inspector simultaneously.",
    tablet: "Enough width for two of the three regions at once.",
    mobile: "Enough width for exactly one region at a time.",
  },
  {
    dimension: "Progressive disclosure",
    desktop: "Everything visible — nothing deliberately hidden.",
    tablet: "Secondary detail (Description, extra Status badges) hides first.",
    mobile: "Only Identity and the Primary Action survive by default — everything else is a deliberate tap away.",
  },
];
