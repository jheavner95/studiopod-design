export interface RoadmapRecommendation {
  id: string;
  title: string;
  detail: string;
  kind: "Fix existing data" | "New package" | "Reprioritize" | "New opportunity";
}

export const ROADMAP_RECOMMENDATIONS: RoadmapRecommendation[] = [
  {
    id: "update-blockers",
    title: "Update FOUNDATION_BLOCKERS — several listed blockers are already resolved",
    detail:
      "The readiness data's Inspector Components blocker list still names \"description-list\" and \"combobox,\" both of which have since moved to Exists in Layout and Forms. The remaining real blockers for Inspector are Tabs, Divider, and Tooltip. A cheap, concrete data fix — not new work.",
    kind: "Fix existing data",
  },
  {
    id: "adoption-pilot",
    title: "Insert a Foundation Layer Adoption Pilot before Overlays / Navigation / Feedback / Operational",
    detail:
      "Migrate one real workspace page — recommend workspace-toolbar or primary-workspace, the two \"mixed\" pages with the smallest hand-rolled surface — fully onto Table, Metadata, Forms, and Layout end to end. This directly produces the real-screen evidence Section 6 is missing for Certified maturity, and de-risks the eventual 32-file Card Wrappers migration by proving the pattern once, on one page, before attempting it at scale.",
    kind: "New package",
  },
  {
    id: "prioritize-toast-alert",
    title: "Prioritize Toast and Alert ahead of the rest of the Overlay System",
    detail:
      "Toast and Alert are both High priority and both sit on the critical path for Feedback System readiness and multiple Operational Component packages. Dialog, Drawer, Popover, Menu, and Command Palette can wait — they block fewer downstream packages today.",
    kind: "Reprioritize",
  },
  {
    id: "bundle-remediation",
    title: "Bundle the audit's data-integrity fixes into whichever package next touches those files",
    detail:
      "The platform-list mismatch in workspace-certification's data, Table's missing findingCommand field, and the three self-referential grep artifacts in Layout/Metadata/Forms are all small and cheap to fix. None warrants a standalone package — fold each into the next package that already has a reason to edit that file.",
    kind: "Fix existing data",
  },
  {
    id: "no-scope-creep",
    title: "No new component scope beyond what's already tracked",
    detail:
      "The catalog's 20 Needed items are already the right backlog. This audit found real duplication and real gaps, but no evidence that the tracked backlog is missing anything material — deliberately not recommending additions here to avoid unnecessary work.",
    kind: "Reprioritize",
  },
  {
    id: "shared-responsive-rules-table",
    title: "Extract one shared ResponsiveRulesTable component",
    detail:
      "A genuinely new opportunity surfaced during this audit, not previously tracked anywhere: the 3 near-identical copies (workspace-toolbar, primary-workspace, workspace-layout) should collapse into one component built on Foundation Table, either living in a shared _components location or promoted into Foundation Table's own docs as a reference pattern. Small, concrete, and already step 1 of the migration plan.",
    kind: "New opportunity",
  },
];
