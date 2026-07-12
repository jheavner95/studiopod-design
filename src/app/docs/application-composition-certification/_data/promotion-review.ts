export interface PromotionEntry {
  title: string;
  system: string;
  detail: string;
}

export const RESOLVED: PromotionEntry[] = [
  {
    title: "Composition Matrix DescriptionList collision",
    system: "Business Feature Templates",
    detail: "A 2-column CardGrid wrapping DescriptionList squeezed the value column to 0px width, collapsing text to one character per line. Found during the templates' own desktop browser QA and fixed by switching to a single-column list, matching the safe pattern the composition architecture's own equivalent section already used.",
  },
  {
    title: "Dashboard view metrics overflow",
    system: "Production Workspace Feature pilot",
    detail: "ProductionFeatureMetrics used columns={4} on Platform's own ProductionMetrics, overflowing a metric value (\"33%\" clipped to 29px of a 130px-wide string) because it renders inside the Workspace's narrower main-content column, not the full page width. Found during the pilot's own desktop browser QA and fixed to columns={2}.",
  },
];

export const DEFERRED: PromotionEntry[] = [
  {
    title: "The Workspace Feature Template omits \"Dialogs\" as a named part",
    system: "Business Feature Templates",
    detail: "See Template Review for the full finding. The pilot built dialogs correctly per the framework's own generic template regardless — this is a documentation completeness gap in the templates' own per-category list, worth a small fix whenever that page is next touched, not a blocker to this certification.",
  },
  {
    title: "No aria-live wiring for feature-level state changes",
    system: "Production Workspace Feature pilot",
    detail: "See Accessibility Review. Foundation's own Toast component already implements the pattern; the pilot does not compose it. Establishing the announcement pattern once, for reuse across every Business Feature, is the recommended approach rather than retrofitting this one pilot alone.",
  },
  {
    title: "Enterprise Certified requires real production adoption",
    system: "Application Composition (whole tier)",
    detail: "The pilot is explicitly non-production by its own defined scope (mock data, local state, no real repositories or APIs). This tier reaches Enterprise Certified once a real production Business Feature ships. See Certification Decision.",
  },
];

export const REJECTED: PromotionEntry[] = [
  {
    title: "\"ProductionFeatureMetrics duplicates ProductionMetrics\"",
    system: "Production Workspace Feature pilot",
    detail: "Considered and rejected. A thin feature-owned wrapper choosing a column count for its own layout context is exactly the expected composition pattern (Business Feature → Platform), not unwanted duplication — the wrapper contains zero rendering logic of its own beyond that one prop choice.",
  },
  {
    title: "\"Two orthogonal state axes (pipeline stage vs. validation flow) add unnecessary complexity\"",
    system: "Production Workspace Feature pilot",
    detail: "Considered and rejected. An artwork's position in the production pipeline and its own internal QA status are genuinely independent in real production software — modeling them as one combined state would have been the actual simplification-that-loses-information, not the other way around.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Real defects found while cross-checking the four packages, plus two findings considered and rejected as non-issues — disclosed rather than left implicit.";
