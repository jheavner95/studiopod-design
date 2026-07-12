export interface ReviewArea {
  code: string;
  title: string;
  summary: string;
  verdict: "Clean" | "Real gaps found";
}

/**
 * The eight areas this audit's own work order names, each independently
 * re-investigated against current source rather than trusted from any of
 * the seven prior certification pages' own claims. "Clean" means zero
 * structural or previously-undisclosed defects were found in that area;
 * "Real gaps found" means at least one genuine, source-verified gap is
 * disclosed in this page's own Findings section below — not a euphemism
 * for "failed," since several of those gaps are pre-existing and already
 * tracked elsewhere, re-confirmed rather than newly caused.
 */
export const REVIEW_AREAS: ReviewArea[] = [
  {
    code: "1",
    title: "Layering & dependency graph",
    summary: "2,892 resolved internal import edges across 1,164 files, classified against the six-tier rank order. Zero reverse dependencies, zero cycles, zero unjustified layer skips, zero Business-Features leakage.",
    verdict: "Clean",
  },
  {
    code: "2",
    title: "API consistency",
    summary: "Re-audited Operational/Workflow/Platform against the Foundation baseline. The one HIGH-severity gap Foundation Audit disclosed (aria-describedby) is now resolved tier-wide; one LOW-severity internal duplication (CellAlign) remains open.",
    verdict: "Real gaps found",
  },
  {
    code: "3",
    title: "Adoption",
    summary: "One real Business Feature exists (Production Workspace) and has grown since Application Composition Certification — it now wires live-region announcements and a focus-restoration fix neither prior audit recorded. Still zero production (non-pilot) features.",
    verdict: "Real gaps found",
  },
  {
    code: "4",
    title: "Naming audit",
    summary: "Checked every same-identifier export across all six tiers plus the two new accessibility primitives (LiveRegionProvider, useBodyLock) for collisions. Zero new collisions found; two already-disclosed collisions (ProductionPipeline, WorkflowStep/PipelineStage) confirmed still open.",
    verdict: "Real gaps found",
  },
  {
    code: "5",
    title: "Business feature review",
    summary: "Re-verified all thirteen Composition Framework parts against the Production Workspace pilot's current source — still a clean Pass on every part, now with two additional accessibility fixes neither prior review recorded.",
    verdict: "Clean",
  },
  {
    code: "6",
    title: "Duplication review",
    summary: "One genuine, previously-undisclosed duplication found: the same value-transition announcement pattern (useRef + useEffect) is hand-copied across four STATUS_MAP components rather than extracted once — and rolled out to only four of the six components that share the pattern.",
    verdict: "Real gaps found",
  },
  {
    code: "7",
    title: "Technical debt register",
    summary: "Consolidates every REMAINING_BLOCKERS and DEFERRED entry from all seven prior certification pages into one register, reclassifying seven items this audit found already resolved in current source and confirming the rest still open.",
    verdict: "Real gaps found",
  },
  {
    code: "8",
    title: "Enterprise readiness",
    summary: "Architecture is sound end to end; real, bounded technical debt remains open in accessibility wiring and touch-target sizing, and only one non-production Business Feature exists. See Certification Decision.",
    verdict: "Real gaps found",
  },
];

export const TOTAL_IMPORT_EDGES = 2892;
export const TOTAL_FILES_ANALYZED = 1164;
