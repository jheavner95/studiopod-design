export const STRENGTHS: string[] = [
  "68 real, working files across four Foundation Layer packages (16 Layout, 13 Table, 16 Metadata, 23 Forms) — not stubs, not placeholders.",
  "Zero editing/presentation-boundary violations: \"Metadata never edits\" and \"Forms never present read-only information\" both hold with zero exceptions under direct grep across all 39 components in those two families.",
  "Strong internal composition discipline — Table, Metadata, and Forms each build cleanly on Layout and ui, and never depend on each other.",
  "Unusually honest self-documentation: three of the four families ship real, grep-reproducible promotion-candidates data naming their own duplication by file and line count, not just in prose.",
  "Real adoption has started: DS-2.1.7.1 migrated all 9 hand-rolled dl/dt/dd Accessibility blocks onto DescriptionList; DS-2.1.7.2 collapsed all 3 near-identical ResponsiveRulesTable copies onto one shared component built from 6 Table primitives. Both verified with zero visual regression at desktop/tablet/mobile — two families now have real, non-playground usage.",
  "Both successful pilots found and fixed real gaps in the foundation itself rather than working around them locally: DescriptionList gained an optional labelWidth prop, and TableHead gained an optional sticky prop for a pinned left column — the kind of thing that only surfaces under real migration pressure, not from writing a component in isolation.",
  "Real discipline under a failed attempt: DS-2.1.7.3 tried to migrate MaturityTable, measured a genuine mobile regression, and reverted rather than shipping it or hand-rolling a local fix — the same standard applied to a migration that didn't work as to the two that did.",
  "That discipline held a second time under a task premise that turned out to be wrong: DS-2.1.7.4 was framed as migrating \"a genuine tabular presentation,\" but direct code review found InventoryTable was architecturally identical to the already-reverted MaturityTable. The audit corrected the premise rather than accepting it, attempted the migration anyway to get real evidence, confirmed the same regression (worse, in fact), and reverted again.",
  "DS-2.1.7.5 added an explicit gate the earlier pilots didn't have — a Phase 0 architecture check before any code was touched — and it worked: ScorecardTable was correctly classified as a genuine native <table> (unlike the two reverted attempts) and migrated cleanly, needing zero new Table API surface because the sticky-left-column prop added in DS-2.1.7.2 was already sufficient. First real evidence that a Table API extension generalizes across migrations rather than being a one-off fix.",
  "DS-2.1.7.6 repeated the same Phase-0-gated pattern on CertificationMatrix, its most cell-type-diverse candidate yet (boolean badges, percentage text, phase badges) — correctly classified as the same genuine-table architecture and migrated cleanly, again needing zero new Table API surface. Second migration in a row with no API changes required — the foundation is now demonstrably sufficient for this whole class of matrix-shaped table, not just the one component that originally motivated the sticky-column extension.",
  "DS-2.1.7.7 closed out the Table Adoption Pilot with CoverageMatrix, the simplest of the three real-table migrations (every cell a status Badge) — third migration in a row needing zero new Foundation Table API surface. Every genuine native-<table> candidate this audit ever identified has now been migrated: three migrations, three successes, zero API changes required after the first. The two remaining table-shaped candidates (MaturityTable, InventoryTable) were correctly left alone — they are architecturally different, not simply unattempted.",
];

export const WEAKNESSES: string[] = [
  "Adoption remains narrow: 2 of 4 families (Metadata, Table) now have real adoption. Metadata through one pilot — DescriptionList (9 pages). Table through four shipped pilots — ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix, 7 Table primitives across 6 pages. Forms is still at zero real adoption, and none of the 9 Workspace Architecture pages imports Panel, Surface, Metadata's other 15 components, or Table's other 6 components.",
  "Forms carries one self-disclosed, concrete accessibility defect: field descriptions aren't wired to aria-describedby on 9 of 10 field types.",
  "Real API inconsistencies: rest-prop spreading is applied inconsistently within Forms itself, tone vocabulary differs between Table/Metadata (5 values) and Forms (2 values), and Table independently declares the same CellAlign type in two separate files.",
  "Three families' duplication-finding grep commands are self-referentially inflated by their own documentation files, and Table's promotion-candidates data still lacks the findingCommand field its three siblings all have — untouched by DS-2.1.7.2, which only removed the 3 now-resolved entries rather than fixing this pre-existing gap on the other 5.",
  "The Foundation Component Catalog's granularity doesn't reflect what's actually shipped — Metadata's 16 and Forms' 22 real components collapse into one or two catalog rows each.",
  "Table has a confirmed capability gap, not a hypothetical one: it has no way to collapse a wide table into stacked cards below a breakpoint. Two independent migrations hit it — MaturityTable (DS-2.1.7.3, 640px against 333px) and InventoryTable (DS-2.1.7.4, 774px against 333px, worse) — both reverted rather than shipped. Both of the 2 remaining table candidates (MaturityTable, InventoryTable) are confirmed blocked on this gap; every genuine-table candidate without it (CoverageMatrix, ScorecardTable, CertificationMatrix) has now migrated cleanly (DS-2.1.7.5–7). This is now the sole remaining blocker to further Table adoption — there is no other unattempted candidate left to migrate.",
];

export const TECHNICAL_DEBT: string[] = [
  "19 files of duplicated markup remaining across workspace pages and shared infrastructure components (19 Panel/Surface wrappers, 0 hand-rolled tables — no raw <table> markup remains anywhere in application-components/) — down from 32 after DS-2.1.7.1 resolved 7 dl/dt/dd blocks, DS-2.1.7.2 resolved 3 ResponsiveRulesTable copies, and DS-2.1.7.5–7 resolved ScorecardTable, CertificationMatrix, and CoverageMatrix.",
  "242 raw flex flex-col gap-N occurrences across 54 files outside the Foundation Layer — the single largest duplication surface found, though also the most diffuse and lowest-risk per instance.",
  "708 combined lines across 6 files (5 ControlDock copies + FormControlsSection) in playground and design-system code, entirely separate from the application-components duplication above.",
  "A platform-list mismatch between workspace-certification's platform-certification.ts (9 platforms) and coverage.ts (8 platforms) that silently produces a null coverage figure for \"Product.\"",
];

export const MIGRATION_PRIORITIES: string[] = [
  "1. ResponsiveRulesTable → Table (Low effort, 3 files) — COMPLETED in DS-2.1.7.2",
  "2–3. Description Lists and their Accessibility blocks → DescriptionList (Low effort, 9 files) — COMPLETED in DS-2.1.7.1",
  "4. Identity blocks → IdentityBlock (Medium effort, 3 files + integration work) — not started",
  "5. ControlDock → SwitchField (Low effort, 5 files) — not started",
  "6. FormControlsSection → Field gallery equivalents (Medium effort, 1 file) — not started",
  "7. Card wrappers → Panel/Surface (High effort, 19 files — sequenced last on purpose) — not started",
];

export const RECOMMENDED_NEXT_PHASE =
  "Seven pilots run, five shipped and two honestly reverted, all following the same shape: verify architecture and the task's own premises before touching code, migrate one real duplication candidate end to end, prefer fixing a real gap in the foundation component over a local workaround, and confirm zero visual regression at all three breakpoints. DS-2.1.7.1 proved it for Metadata (DescriptionList); DS-2.1.7.2 proved it again for Table (ResponsiveRulesTable), independently finding and fixing a real API gap (sticky-left-column support). DS-2.1.7.3 and DS-2.1.7.4 both attempted div/grid-based tables (MaturityTable, InventoryTable) and both confirmed the same limit: Table has no responsive row-collapse capability — two independent failures for the identical reason, the clearest evidenced candidate for Table's next real capability. DS-2.1.7.5, DS-2.1.7.6, and DS-2.1.7.7 each added an explicit Phase 0 architecture gate before migrating (ScorecardTable, then CertificationMatrix, then CoverageMatrix), correctly distinguished each as a genuine native table (unlike the two reverted attempts), and shipped all three using zero new Table API surface after the first — three migrations in a row confirming the DS-2.1.7.2 sticky prop generalizes across this whole class of matrix-shaped table rather than being a one-off fix. This completes the Table Adoption Pilot for genuine native tables: every real <table> this audit identified has now been migrated, and the only remaining table-shaped candidates (MaturityTable, InventoryTable) are correctly parked pending a real row-collapse capability, not simply unattempted. Forms is now the one built family with zero real adoption — step 5 (ControlDock → SwitchField) should run next, before starting Overlays, Navigation, Feedback, or Operational Components. Layout's Panel and Surface remain the largest unadopted surface, deliberately saved for step 7 (Card Wrappers) once every other pattern has already proven itself.";

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
    score: 30,
    rationale: "Still modest, but growing on real evidence: 2 of 4 families now have verified, zero-regression production usage — DescriptionList (Metadata, 9 pages) and 7 Table primitives via ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix (Table, 6 pages). Two further pilots (MaturityTable, InventoryTable) were attempted and correctly reverted rather than counted as adoption. Forms remains fully unadopted, and neither adopted family has touched a majority of its own component surface (Metadata: 1 of 16; Table: 7 of 13).",
  },
];

export function computeReadinessScore(): number {
  const weighted = READINESS_SCORE_DIMENSIONS.reduce((sum, d) => sum + (d.weight * d.score) / 100, 0);
  return Math.round(weighted);
}

export const CERTIFICATION_RECOMMENDATION =
  "Foundation Production Ready, Adoption In Progress. All four built families and the catalog that tracks them are rated Production Ready — real, safe to build with, internally consistent enough to trust. Two now show real evidence of adoption: Metadata (DescriptionList, 9 pages, DS-2.1.7.1) and Table (ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix, 7 primitives, 6 pages, DS-2.1.7.2 and DS-2.1.7.5–7) — each shipped pilot also found or reused a genuine gap-closing extension in the foundation component rather than working around it locally, and DS-2.1.7.7 completes the migration of every genuine native <table> this audit ever found. Two further pilots (DS-2.1.7.3 MaturityTable, DS-2.1.7.4 InventoryTable) were attempted and correctly reverted after both measurably regressed mobile behavior for the identical reason — real, twice-confirmed evidence that Table isn't a universal replacement for every hand-rolled table yet, recorded as a Future Extension rather than forced through twice. DS-2.1.7.5–7 also demonstrated that gating a migration on an explicit architecture check before touching code reliably separates the two outcomes: ScorecardTable, CertificationMatrix, and CoverageMatrix (genuine tables, all three shipped) versus MaturityTable/InventoryTable (div/grid, both reverted). Neither successful adoption is broad enough to justify Certified: each touches a minority of its family's component surface, and no family has a recorded per-component accessibility checklist. Recommendation: run the same pilot pattern for Forms (ControlDock → SwitchField is the lowest-risk candidate), fix the Forms accessibility gap, clear the API-consistency findings in Section 2, and scope a real responsive-row-collapse capability for Table (now evidenced twice, not speculative, and now the only remaining path to further Table adoption) before pursuing Certified status for any family — then begin Overlays, Navigation, and Feedback with the same discipline this layer was built with.";
