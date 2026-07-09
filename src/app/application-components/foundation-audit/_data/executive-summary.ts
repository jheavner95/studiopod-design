export const STRENGTHS: string[] = [
  "68 real, working files across four Foundation Layer packages (16 Layout, 13 Table, 16 Metadata, 23 Forms) — not stubs, not placeholders.",
  "Zero editing/presentation-boundary violations: \"Metadata never edits\" and \"Forms never present read-only information\" both hold with zero exceptions under direct grep across all 39 components in those two families.",
  "Strong internal composition discipline — Table, Metadata, and Forms each build cleanly on Layout and ui, and never depend on each other.",
  "Unusually honest self-documentation: three of the four families ship real, grep-reproducible promotion-candidates data naming their own duplication by file and line count, not just in prose.",
  "Real adoption has started: DS-2.1.7.1 migrated all 9 hand-rolled dl/dt/dd Accessibility blocks onto DescriptionList; DS-2.1.7.2 collapsed all 3 near-identical ResponsiveRulesTable copies onto one shared component built from 6 Table primitives. Both verified with zero visual regression at desktop/tablet/mobile — two families now have real, non-playground usage.",
  "Both successful pilots found and fixed real gaps in the foundation itself rather than working around them locally: DescriptionList gained an optional labelWidth prop, and TableHead gained an optional sticky prop for a pinned left column — the kind of thing that only surfaces under real migration pressure, not from writing a component in isolation.",
  "Real discipline under a failed attempt: DS-2.1.7.3 tried to migrate MaturityTable, measured a genuine mobile regression, and reverted rather than shipping it or hand-rolling a local fix — the same standard applied to a migration that didn't work as to the two that did.",
  "That discipline held a second time under a task premise that turned out to be wrong: DS-2.1.7.4 was framed as migrating \"a genuine tabular presentation,\" but direct code review found InventoryTable was architecturally identical to the already-reverted MaturityTable. The audit corrected the premise rather than accepting it, attempted the migration anyway to get real evidence, confirmed the same regression (worse, in fact), and reverted again.",
];

export const WEAKNESSES: string[] = [
  "Adoption remains narrow: 2 of 4 families (Metadata, Table) now have real adoption, each through exactly one pilot — DescriptionList (9 pages) and ResponsiveRulesTable's 6 Table primitives (3 pages). Forms is still at zero real adoption, and none of the 9 Workspace Architecture pages imports Panel, Surface, Metadata's other 15 components, or Table's other 7 components.",
  "Forms carries one self-disclosed, concrete accessibility defect: field descriptions aren't wired to aria-describedby on 9 of 10 field types.",
  "Real API inconsistencies: rest-prop spreading is applied inconsistently within Forms itself, tone vocabulary differs between Table/Metadata (5 values) and Forms (2 values), and Table independently declares the same CellAlign type in two separate files.",
  "Three families' duplication-finding grep commands are self-referentially inflated by their own documentation files, and Table's promotion-candidates data still lacks the findingCommand field its three siblings all have — untouched by DS-2.1.7.2, which only removed the 3 now-resolved entries rather than fixing this pre-existing gap on the other 5.",
  "The Foundation Component Catalog's granularity doesn't reflect what's actually shipped — Metadata's 16 and Forms' 22 real components collapse into one or two catalog rows each.",
  "Table has a confirmed capability gap, not a hypothetical one: it has no way to collapse a wide table into stacked cards below a breakpoint. Two independent migrations hit it — MaturityTable (DS-2.1.7.3, 640px against 333px) and InventoryTable (DS-2.1.7.4, 774px against 333px, worse) — both reverted rather than shipped. Of the 5 remaining table candidates, 2 are now confirmed blocked on this gap; only 3 (CoverageMatrix, ScorecardTable, CertificationMatrix) are confirmed genuine tables without it.",
];

export const TECHNICAL_DEBT: string[] = [
  "22 files of duplicated markup remaining across workspace pages and shared infrastructure components (19 Panel/Surface wrappers, 3 hand-rolled tables) — down from 32 after DS-2.1.7.1 resolved 7 dl/dt/dd blocks and DS-2.1.7.2 resolved 3 ResponsiveRulesTable copies.",
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
  "Four pilots run, two shipped and two honestly reverted, all following the same shape: migrate one real duplication candidate end to end, re-verify the audit's own findings (and the task's own premises) before touching code, prefer fixing a real gap in the foundation component over a local workaround, and confirm zero visual regression at all three breakpoints. DS-2.1.7.1 proved it for Metadata (DescriptionList); DS-2.1.7.2 proved it again for Table (ResponsiveRulesTable), independently finding and fixing another real API gap (sticky-left-column support). DS-2.1.7.3 and DS-2.1.7.4 both attempted div/grid-based tables (MaturityTable, InventoryTable) and both confirmed the same limit: Table has no responsive row-collapse capability. Two independent failures for the identical reason means this is no longer a single data point — it's the clearest evidenced candidate for Table's next real capability, and should be scoped deliberately rather than attempted as a third local fix. Forms is the one built family with zero real adoption — step 5 (ControlDock → SwitchField) should run next, before starting Overlays, Navigation, Feedback, or Operational Components. Layout's Panel and Surface remain the largest unadopted surface, deliberately saved for step 7 (Card Wrappers) once every other pattern has already proven itself.";

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
    score: 22,
    rationale: "Still modest, but growing on real evidence: 2 of 4 families now have verified, zero-regression production usage — DescriptionList (Metadata, 9 pages) and 6 Table primitives via ResponsiveRulesTable (Table, 3 pages). Forms remains fully unadopted, and neither pilot has touched a majority of its own family's component surface (Metadata: 1 of 16; Table: 6 of 13).",
  },
];

export function computeReadinessScore(): number {
  const weighted = READINESS_SCORE_DIMENSIONS.reduce((sum, d) => sum + (d.weight * d.score) / 100, 0);
  return Math.round(weighted);
}

export const CERTIFICATION_RECOMMENDATION =
  "Foundation Production Ready, Adoption In Progress. All four built families and the catalog that tracks them are rated Production Ready — real, safe to build with, internally consistent enough to trust. Two now show real evidence of adoption: Metadata (DescriptionList, 9 pages, DS-2.1.7.1) and Table (ResponsiveRulesTable's 6 primitives, 3 pages, DS-2.1.7.2) — each pilot also found and fixed a genuine gap in the foundation component rather than working around it locally. Two further pilots (DS-2.1.7.3 MaturityTable, DS-2.1.7.4 InventoryTable) were attempted and correctly reverted after both measurably regressed mobile behavior for the identical reason — real, twice-confirmed evidence that Table isn't a universal replacement for every hand-rolled table yet, recorded as a Future Extension rather than forced through twice. Neither successful adoption is broad enough to justify Certified: each touches a minority of its family's component surface, and no family has a recorded per-component accessibility checklist. Recommendation: run the same pilot pattern for Forms (ControlDock → SwitchField is the lowest-risk candidate), fix the Forms accessibility gap, clear the API-consistency findings in Section 2, and scope a real responsive-row-collapse capability for Table (now evidenced twice, not speculative) before pursuing Certified status for any family — then begin Overlays, Navigation, and Feedback with the same discipline this layer was built with.";
