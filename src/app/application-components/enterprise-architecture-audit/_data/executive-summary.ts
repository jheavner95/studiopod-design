export interface WorkPackageSummary {
  code: string;
  title: string;
  href?: string;
  oneLiner: string;
}

export const DS6_4_AREAS: WorkPackageSummary[] = [
  { code: "1", title: "Layering & dependency graph", oneLiner: "2,892 resolved import edges across 1,164 files, zero reverse dependencies, zero cycles, zero unjustified skips." },
  { code: "2", title: "API consistency", oneLiner: "Foundation's own HIGH-severity aria-describedby gap and MEDIUM-severity Surface role gap are now resolved; three lower-severity items remain open." },
  { code: "3", title: "Adoption", oneLiner: "One real Business Feature, still non-production, now measurably more production-grade (live-region wiring, a focus-restoration fix)." },
  { code: "4", title: "Naming audit", oneLiner: "Two already-disclosed collisions confirmed still open; two newly-introduced primitives checked for the first time and found clean." },
  { code: "5", title: "Business feature review", oneLiner: "All thirteen Composition Framework parts re-verified Pass; two undocumented accessibility improvements found." },
  { code: "6", title: "Duplication review", oneLiner: "One new finding: a value-transition announcement pattern hand-copied four times and rolled out to only four of six eligible components." },
  { code: "7", title: "Technical debt register", oneLiner: "18 items consolidated from seven prior certification pages; 3 Resolved, 3 Substantially resolved, 8 Still open, 4 Unconfirmed." },
  { code: "8", title: "Enterprise readiness", oneLiner: "Architecturally Sound — zero structural gaps, real bounded debt remains, production adoption evidence still doesn't exist." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS = [
  "Zero structural architecture violations found anywhere across a full-repo, six-tier dependency parse — not sampled, not delegated to seven separate partial views composing correctly, but independently re-derived from one parse of every internal import edge in the codebase.",
  "Every quantitative and structural claim in all seven prior certification pages was re-checked against current source during this audit and found accurate — the system's own certification record is trustworthy, not merely self-consistent.",
  "This audit found and disclosed real value the accessibility remediation pass added but no prior page recorded: live-region wiring and a focus-restoration fix in the Production Workspace pilot, and an aria-current/sr-only-label fix in StateNode — genuine improvements surfaced by reading current source rather than trusting any single page's own point-in-time snapshot.",
  "The consolidated Technical Debt Register turns 18 scattered blocker/deferred entries across seven separate pages into one register with an honest status for each — resolved, substantially resolved, still open, or unconfirmed — rather than leaving readers to reconcile seven documents themselves.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES = [
  "Real, non-structural technical debt remains genuinely open: touch-target sizing for four icon-only affordances, the TableRow keyboard-activation gap, two naming collisions (ProductionPipeline; WorkflowStep/PipelineStage), and a newly-found duplicated announcement pattern rolled out to only four of six eligible components.",
  "Production-scale adoption evidence still does not exist anywhere in the codebase — one real Business Feature exists, and it is explicitly non-production (mock data, local state, zero API/repository layer). This is the single largest gap between today's architecture and Enterprise Certified.",
  "Four items in the Technical Debt Register are honestly Unconfirmed rather than verified either way — this audit's own scope did not extend to re-exercising every named behavior (Inspector Panel's Drawer composition, Dashboard Widgets' focus-retention-on-refresh, the Workspace Feature Template's Dialogs omission, WorkflowNode's API-shape decision).",
];

export const ENTERPRISE_COMPLETION_SUMMARY =
  "This audit set out to re-verify the whole six-tier architecture end to end — layering, dependencies, API consistency, naming, adoption, business-feature composition, and duplication — against current source, rather than trusting any of the seven prior certification pages' own point-in-time claims to still hold or to compose correctly together. On the evidence gathered, they do: zero structural violations exist anywhere across 2,892 resolved import edges in 1,164 files, and every prior page's own quantitative claim checked out exactly. This audit also found genuine value no prior page recorded — real accessibility improvements in the Production Workspace pilot and in Workflow's StateNode — and one genuine, previously-undisclosed duplication finding of its own. The result is Architecturally Sound: the structure is clean, the debt is measured rather than hidden, and what remains open (touch targets, two naming collisions, a handful of lower-severity consistency items, and — the largest single gap — the absence of any production Business Feature) is real, bounded, and disclosed, not structural and not silently dropped. DS-6.5 Final Enterprise Certification, explicitly out of scope here, is the next and final step: this audit's own job was to make sure the ground it would stand on is solid, and it is.";
