export const STRENGTHS: string[] = [
  "68 real, working files across four Foundation Layer packages (16 Layout, 13 Table, 16 Metadata, 23 Forms) — not stubs, not placeholders.",
  "Zero editing/presentation-boundary violations: \"Metadata never edits\" and \"Forms never present read-only information\" both hold with zero exceptions under direct grep across all 39 components in those two families.",
  "Strong internal composition discipline — Table, Metadata, and Forms each build cleanly on Layout and ui, and never depend on each other.",
  "Unusually honest self-documentation: three of the four families ship real, grep-reproducible promotion-candidates data naming their own duplication by file and line count, not just in prose.",
  "Real adoption has started: DS-2.1.7.1 migrated all 9 hand-rolled dl/dt/dd Accessibility blocks onto DescriptionList, imported through @/components/metadata — the Foundation Layer's first production usage outside its own documentation pages, verified with zero visual regression at desktop/tablet/mobile.",
];

export const WEAKNESSES: string[] = [
  "Adoption remains narrow: DS-2.1.7.1 closed the gap for exactly one Metadata component (DescriptionList, now used by 9 pages). Table and Forms are still at zero real adoption, and none of the 9 Workspace Architecture pages imports Panel, Surface, or the other 15 Metadata components.",
  "Forms carries one self-disclosed, concrete accessibility defect: field descriptions aren't wired to aria-describedby on 9 of 10 field types.",
  "Real API inconsistencies: rest-prop spreading is applied inconsistently within Forms itself, tone vocabulary differs between Table/Metadata (5 values) and Forms (2 values), and Table independently declares the same CellAlign type in two separate files.",
  "Three families' duplication-finding grep commands are self-referentially inflated by their own documentation files, and Table's promotion-candidates data lacks the findingCommand field its three siblings all have.",
  "The Foundation Component Catalog's granularity doesn't reflect what's actually shipped — Metadata's 16 and Forms' 22 real components collapse into one or two catalog rows each.",
];

export const TECHNICAL_DEBT: string[] = [
  "25 files of duplicated markup remaining across workspace pages and shared infrastructure components (19 Panel/Surface wrappers, 6 hand-rolled tables) — down from 32 after DS-2.1.7.1 resolved the 7 workspace-page dl/dt/dd blocks.",
  "242 raw flex flex-col gap-N occurrences across 54 files outside the Foundation Layer — the single largest duplication surface found, though also the most diffuse and lowest-risk per instance.",
  "708 combined lines across 6 files (5 ControlDock copies + FormControlsSection) in playground and design-system code, entirely separate from the application-components duplication above.",
  "A platform-list mismatch between workspace-certification's platform-certification.ts (9 platforms) and coverage.ts (8 platforms) that silently produces a null coverage figure for \"Product.\"",
];

export const MIGRATION_PRIORITIES: string[] = [
  "1. ResponsiveRulesTable → Table (Low effort, 3 files) — not started",
  "2–3. Description Lists and their Accessibility blocks → DescriptionList (Low effort, 9 files) — COMPLETED in DS-2.1.7.1",
  "4. Identity blocks → IdentityBlock (Medium effort, 3 files + integration work) — not started",
  "5. ControlDock → SwitchField (Low effort, 5 files) — not started",
  "6. FormControlsSection → Field gallery equivalents (Medium effort, 1 file) — not started",
  "7. Card wrappers → Panel/Surface (High effort, 19 files — sequenced last on purpose) — not started",
];

export const RECOMMENDED_NEXT_PHASE =
  "The Metadata pilot (DS-2.1.7.1) proved the pattern: migrate one real duplication candidate end to end, re-verify the audit's own findings before touching code, and confirm zero visual regression at all three breakpoints. The same pilot approach should now run for Table (step 1, ResponsiveRulesTable — the lowest-risk table candidate) and Forms (step 5, ControlDock) before starting Overlays, Navigation, Feedback, or Operational Components. Each closes one family's zero-adoption gap and de-risks its eventual larger migration (step 7, Card Wrappers, in Layout's case) the same way this pilot just did for Metadata.";

export interface ScoreDimension {
  id: string;
  label: string;
  weight: number;
  score: number;
  rationale: string;
}

export const READINESS_SCORE_DIMENSIONS: ScoreDimension[] = [
  {
    id: "build-out",
    label: "Component build-out",
    weight: 40,
    score: 90,
    rationale: "68 real files across 4 families, essentially everything the catalog says is needed for these families is built. Docked slightly for the catalog's own granularity mismatch.",
  },
  {
    id: "compliance",
    label: "Compliance & correctness",
    weight: 25,
    score: 90,
    rationale: "Both hard behavioral rules verified compliant with zero exceptions. Docked for the one disclosed Forms accessibility gap and the CellAlign duplication.",
  },
  {
    id: "consistency",
    label: "API consistency",
    weight: 15,
    score: 70,
    rationale: "Several real, documented inconsistencies (rest-spread, tone vocabulary, missing findingCommand) — none breaking, all normalizable, none yet fixed.",
  },
  {
    id: "adoption",
    label: "Real-world adoption",
    weight: 20,
    score: 12,
    rationale: "Still low, but no longer zero: DescriptionList (1 of the ~52 components across the four families) is now adopted by 9 real pages, verified with zero visual regression. Table and Forms remain fully unadopted, and Layout's Panel/Surface still have zero consumers.",
  },
];

export function computeReadinessScore(): number {
  const weighted = READINESS_SCORE_DIMENSIONS.reduce((sum, d) => sum + (d.weight * d.score) / 100, 0);
  return Math.round(weighted);
}

export const CERTIFICATION_RECOMMENDATION =
  "Foundation Production Ready, Adoption In Progress. All four built families and the catalog that tracks them are rated Production Ready — real, safe to build with, internally consistent enough to trust. Metadata is the first to show real evidence of adoption (DescriptionList, migrated onto 9 real pages in DS-2.1.7.1), but that's 1 of ~52 components across the four families — not remotely enough to justify Certified for Metadata or any other family yet. Recommendation: run the same adoption-pilot pattern for Table and Forms, fix the Forms accessibility gap, and clear the API-consistency findings in Section 2 before pursuing Certified status for any family — then begin Overlays, Navigation, and Feedback with the same discipline this layer was built with.";
