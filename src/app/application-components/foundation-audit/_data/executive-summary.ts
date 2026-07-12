export const STRENGTHS: string[] = [
  "68 real, working files across four Foundation Layer packages (16 Layout, 13 Table, 16 Metadata, 23 Forms) — not stubs, not placeholders.",
  "Zero editing/presentation-boundary violations: \"Metadata never edits\" and \"Forms never present read-only information\" both hold with zero exceptions under direct grep across all 39 components in those two families.",
  "Strong internal composition discipline — Table, Metadata, and Forms each build cleanly on Layout and ui, and never depend on each other.",
  "Unusually honest self-documentation: three of the four families ship real, grep-reproducible duplication-tracking data naming their own duplication by file and line count, not just in prose.",
  "Real adoption has started: one migration moved all 9 hand-rolled dl/dt/dd Accessibility blocks onto DescriptionList; another collapsed all 3 near-identical ResponsiveRulesTable copies onto one shared component built from 6 Table primitives. Both verified with zero visual regression at desktop/tablet/mobile — two families now have real, non-playground usage.",
  "Both successful pilots found and fixed real gaps in the foundation itself rather than working around them locally: DescriptionList gained an optional labelWidth prop, and TableHead gained an optional sticky prop for a pinned left column — the kind of thing that only surfaces under real migration pressure, not from writing a component in isolation.",
  "Real discipline under a failed attempt: one migration tried to move MaturityTable onto Table, measured a genuine mobile regression, and reverted rather than shipping it or hand-rolling a local fix — the same standard applied to a migration that didn't work as to the two that did.",
  "That discipline held a second time under a task premise that turned out to be wrong: the next migration was framed as moving \"a genuine tabular presentation,\" but direct code review found InventoryTable was architecturally identical to the already-reverted MaturityTable. The audit corrected the premise rather than accepting it, attempted the migration anyway to get real evidence, confirmed the same regression (worse, in fact), and reverted again.",
  "The ScorecardTable migration added an explicit gate the earlier pilots didn't have — a Phase 0 architecture check before any code was touched — and it worked: ScorecardTable was correctly classified as a genuine native <table> (unlike the two reverted attempts) and migrated cleanly, needing zero new Table API surface because the sticky-left-column prop added during the ResponsiveRulesTable migration was already sufficient. First real evidence that a Table API extension generalizes across migrations rather than being a one-off fix.",
  "The CertificationMatrix migration repeated the same Phase-0-gated pattern on its most cell-type-diverse candidate yet (boolean badges, percentage text, phase badges) — correctly classified as the same genuine-table architecture and migrated cleanly, again needing zero new Table API surface. Second migration in a row with no API changes required — the foundation is now demonstrably sufficient for this whole class of matrix-shaped table, not just the one component that originally motivated the sticky-column extension.",
  "The CoverageMatrix migration closed out the Table Adoption Pilot with the simplest of the three real-table migrations (every cell a status Badge) — third migration in a row needing zero new Foundation Table API surface. Every genuine native-<table> candidate this audit ever identified has now been migrated: three migrations, three successes, zero API changes required after the first. The two remaining table-shaped candidates (MaturityTable, InventoryTable) were correctly left alone — they are architecturally different, not simply unattempted.",
  "A final review ran Table's first formal per-component accessibility pass and closed out the certification review: Production Ready baseline, a verified accessibility pass, and real, non-playground screen usage (5 pages) — all three of the audit's own documented Certified criteria, satisfied for the first time by any family. Table is now rated Certified.",
];

export const WEAKNESSES: string[] = [
  "Adoption remains narrow outside Table: Metadata has real adoption through exactly one pilot — DescriptionList (9 pages) — and hasn't yet run its own accessibility pass. Forms is still at zero real adoption. None of the 9 Workspace Architecture pages imports Panel, Surface, Metadata's other 15 components, or Table's other 6 components (TableSelectionCell, TableActionCell, TableEmptyState, TableLoadingState, TableToolbar, TableFooter) — Table's Certified rating reflects real usage and a verified accessibility pass, not full component-surface coverage.",
  "Forms carries one self-disclosed, concrete accessibility defect: field descriptions aren't wired to aria-describedby on 9 of 10 field types.",
  "Real API inconsistencies: rest-prop spreading is applied inconsistently within Forms itself, tone vocabulary differs between Table/Metadata (5 values) and Forms (2 values), and Table independently declares the same CellAlign type in two separate files.",
  "Three families' duplication-finding grep commands are self-referentially inflated by their own documentation files, and Table's own duplication-tracking data still lacks the findingCommand field its three siblings all have — untouched by the ResponsiveRulesTable migration, which only removed the 3 now-resolved entries rather than fixing this pre-existing gap on the other 5.",
  "The Foundation Component Catalog's granularity doesn't reflect what's actually shipped — Metadata's 16 and Forms' 22 real components collapse into one or two catalog rows each.",
  "Table has a confirmed capability gap, not a hypothetical one: it has no way to collapse a wide table into stacked cards below a breakpoint. Two independent migration attempts hit it — MaturityTable (640px against a 333px viewport) and InventoryTable (774px against a 333px viewport, worse) — both reverted rather than shipped. Both of the 2 remaining table candidates (MaturityTable, InventoryTable) are confirmed blocked on this gap; every genuine-table candidate without it (CoverageMatrix, ScorecardTable, CertificationMatrix) has now migrated cleanly. This is now the sole remaining blocker to further Table adoption — there is no other unattempted candidate left to migrate.",
];

export const TECHNICAL_DEBT: string[] = [
  "19 files of duplicated markup remaining across workspace pages and shared infrastructure components (19 Panel/Surface wrappers, 0 hand-rolled tables — no raw <table> markup remains anywhere in application-components/) — down from 32 after migrations resolved 7 dl/dt/dd blocks, 3 ResponsiveRulesTable copies, and the ScorecardTable, CertificationMatrix, and CoverageMatrix duplications.",
  "242 raw flex flex-col gap-N occurrences across 54 files outside the Foundation Layer — the single largest duplication surface found, though also the most diffuse and lowest-risk per instance.",
  "708 combined lines across 6 files (5 ControlDock copies + FormControlsSection) in playground and design-system code, entirely separate from the application-components duplication above.",
  "A platform-list mismatch between workspace-certification's platform-certification.ts (9 platforms) and coverage.ts (8 platforms) that silently produces a null coverage figure for \"Product.\"",
];

export const RECOMMENDED_NEXT_PHASE =
  "Foundation Table has a stable API, a completed per-component accessibility pass (two minor, non-blocking gaps recorded: TableLoadingState and TableToolbar both lack a screen-reader announcement for their respective state changes), and real, non-playground screen usage — the first family to clear all three. MaturityTable and InventoryTable remain on their existing div/grid implementation pending a responsive row-collapse capability Table doesn't yet support. Forms has zero real adoption today; Metadata has adopted DescriptionList but not yet run its own accessibility pass or adopted its remaining components. Layout's Panel and Surface remain the largest unadopted surface in the foundation layer.";

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
    score: 92,
    rationale: "Both hard behavioral rules verified compliant with zero exceptions. Table passed its first per-component accessibility pass during its final review (two minor, non-blocking gaps found and recorded: TableLoadingState and TableToolbar both lack a screen-reader state-change announcement). Docked for the one disclosed Forms accessibility gap, the CellAlign duplication, and the fact that Metadata, Forms, and Layout still lack their own accessibility passes.",
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
    score: 30,
    rationale: "Still modest, but growing on real evidence: 2 of 4 families now have verified, zero-regression production usage — DescriptionList (Metadata, 9 pages) and 7 Table primitives via ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix (Table, 5 pages). Two further pilots (MaturityTable, InventoryTable) were attempted and correctly reverted rather than counted as adoption. Forms remains fully unadopted, and neither adopted family has touched a majority of its own component surface (Metadata: 1 of 16; Table: 7 of 13) — Table's Certified rating is earned on real usage plus a verified accessibility pass, not full surface coverage.",
  },
];

export function computeReadinessScore(): number {
  const weighted = READINESS_SCORE_DIMENSIONS.reduce((sum, d) => sum + (d.weight * d.score) / 100, 0);
  return Math.round(weighted);
}

export const CERTIFICATION_RECOMMENDATION =
  "Foundation Table: Certified. Table is the first family to clear all three documented Certified criteria — a Production Ready baseline, a verified per-component accessibility pass, and real, non-playground screen usage (5 pages, via ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix). TableHead's sticky prop has held stable across every migration with no further API changes. Two minor, non-blocking accessibility gaps remain disclosed (TableLoadingState and TableToolbar both lack a screen-reader state-change announcement), and MaturityTable/InventoryTable remain on their existing implementation pending a responsive row-collapse capability, tracked as a Future Extension rather than a blocker to Table's certification. The other three built families, plus the catalog that tracks them, remain Production Ready, Adoption In Progress, or not yet adopted. Recommendation: extend adoption to Forms and Metadata's remaining components, and give Metadata its own accessibility pass, before pursuing Certified status for either.";
