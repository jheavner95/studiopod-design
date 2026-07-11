export interface PromotionEntry {
  title: string;
  system: string;
  detail: string;
}

export const RESOLVED: PromotionEntry[] = [
  {
    title: "Composition Matrix DescriptionList collision",
    system: "DS-5.3",
    detail: "A 2-column CardGrid wrapping DescriptionList squeezed the value column to 0px width, collapsing text to one character per line. Found during DS-5.3's own desktop browser QA and fixed by switching to a single-column list, matching the safe pattern DS-5.1's own equivalent section already used.",
  },
  {
    title: "Dashboard view metrics overflow",
    system: "DS-5.4",
    detail: "ProductionFeatureMetrics used columns={4} on Platform's own ProductionMetrics, overflowing a metric value (\"33%\" clipped to 29px of a 130px-wide string) because it renders inside the Workspace's narrower main-content column, not the full page width. Found during DS-5.4's own desktop browser QA and fixed to columns={2}.",
  },
];

export const DEFERRED: PromotionEntry[] = [
  {
    title: "DS-5.3's Workspace Feature Template omits \"Dialogs\" as a named part",
    system: "DS-5.3",
    detail: "See Template Review for the full finding. The pilot built dialogs correctly per DS-5.2's own generic template regardless — this is a documentation completeness gap in DS-5.3's own per-category template list, worth a small fix whenever that page is next touched, not a blocker to this certification.",
  },
  {
    title: "No aria-live wiring for feature-level state changes",
    system: "DS-5.4",
    detail: "See Accessibility Review. Foundation's own Toast component already implements the pattern; the pilot doesn't compose it yet. Deferred to whichever future package builds a second real Business Feature — a natural point to establish the announcement pattern once and reuse it, rather than retrofitting this one pilot alone.",
  },
  {
    title: "Enterprise Certified requires real production adoption",
    system: "DS-5 (whole tier)",
    detail: "The pilot is explicitly non-production by its own work order scope (mock data, local state, no real repositories or APIs). This is a structural fact about where DS-5 sits in the roadmap, not a defect — deferred until a real production Business Feature ships. See Certification Decision.",
  },
];

export const REJECTED: PromotionEntry[] = [
  {
    title: "\"ProductionFeatureMetrics duplicates ProductionMetrics\"",
    system: "DS-5.4",
    detail: "Considered and rejected. A thin feature-owned wrapper choosing a column count for its own layout context is exactly the expected composition pattern (Business Feature → Platform), not unwanted duplication — the wrapper contains zero rendering logic of its own beyond that one prop choice.",
  },
  {
    title: "\"Two orthogonal state axes (pipeline stage vs. validation flow) add unnecessary complexity\"",
    system: "DS-5.4",
    detail: "Considered and rejected. An artwork's position in the production pipeline and its own internal QA status are genuinely independent in real production software — modeling them as one combined state would have been the actual simplification-that-loses-information, not the other way around.",
  },
];

export const PROMOTION_METHODOLOGY_NOTE =
  "Every real defect found across DS-5.1–5.4's own browser QA passes, re-surfaced here rather than left buried in each package's own report — plus two findings actively considered and rejected as non-issues, disclosed rather than omitted.";
