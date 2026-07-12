export interface ArchitectureFinding {
  title: string;
  location: string;
  detail: string;
  severity: "defect" | "note" | "confirmed-clean";
}

export const ARCHITECTURE_HEADLINE =
  "Structurally sound end to end: 2,892 resolved import edges across 1,164 files, zero reverse dependencies, zero cycles, zero unjustified layer skips, and zero Business-Features leakage into any lower tier. Workspace Architecture's internal claims are covered directly against current source as part of this record.";

/**
 * The two genuine, source-verified defects found in Workspace Architecture.
 * Both predate this audit.
 */
export const ARCHITECTURE_FINDINGS: ArchitectureFinding[] = [
  {
    title: "The \"six-tier\" blueprint only populates five tiers",
    location:
      "src/app/application-components/workspace-certification/_data/blueprint.ts (BLUEPRINT_NODES); repeated in page.tsx, BlueprintDiagram.tsx, roadmap.ts, and principles.ts",
    detail:
      "BLUEPRINT_NODES only defines tier values 1, 2, 3, 4 (three peer nodes), and 6 — tier 5 does not exist anywhere in the data, and the rendered diagram itself shows only five visual bands (Global Nav, Header, Toolbar, the Asset/Primary/Inspector peer row, Status), not six. The \"six tiers, top to bottom\" framing is repeated verbatim or near-verbatim in four separate files. Not a rendering bug — the gap is in the source data, and every downstream description of it inherited the same unexplained count.",
    severity: "defect",
  },
  {
    title: "\"Every workspace architecture page documents accessibility as a first-class section\" is false for two of them",
    location:
      "src/app/application-components/workspace-certification/_data/principles.ts (\"Accessibility is foundational\" principle) vs. workspace-framework/_data/principles.ts and workspace-layout/",
    detail:
      "Workspace Framework has exactly one passing principle bullet mentioning accessibility (\"Accessibility first\") — not a first-class section. Workspace Layout has zero accessibility content of any kind: no section, no data file, no mention of keyboard, focus, live-regions, or reduced-motion anywhere on the page. Two of the eight workspace tiers overstate what they actually document.",
    severity: "defect",
  },
];

export const ARCHITECTURE_CONFIRMATIONS: string[] = [
  "All other Workspace Architecture quantitative claims are accurate against current source: 9 scorecard categories summing to exactly 110 points, 10 checklist items, 8 architecture principles, 8 workspace tier pages with hrefs that all resolve, 6 evolution steps, 9 certification platforms (all 7 with templates present), 5 certification levels, and the \"seven-region shell\" claim matching Workspace Framework's own WORKSPACE_REGIONS exactly (7 entries).",
  "Zero structural violations exist anywhere in the codebase.",
  "Foundation, Operational, Workflow, and Platform tiers' layering claims remain accurate and unchanged.",
];
