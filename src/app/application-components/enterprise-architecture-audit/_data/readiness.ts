export type ReadinessVerdict = "Ready" | "Mostly ready" | "Not ready";

export interface ReadinessRow {
  label: string;
  verdict: ReadinessVerdict;
  note: string;
}

export const READINESS_ASSESSMENT: ReadinessRow[] = [
  { label: "Architectural integrity", verdict: "Ready", note: "Zero reverse dependencies, zero cycles, zero unjustified layer skips, and zero Business-Features leakage across all 2,892 resolved import edges in the codebase — independently re-derived from a full parse, not assumed from seven separate tier claims composing correctly." },
  { label: "API consistency", verdict: "Mostly ready", note: "The one HIGH-severity gap (aria-describedby) and one MEDIUM-severity gap (Surface role) disclosed at Foundation Audit are now resolved, re-verified in current source. Three lower-severity items remain genuinely open (CellAlign duplication, the \"Field\" naming ambiguity, Table's missing findingCommand field) — none structural." },
  { label: "Naming integrity", verdict: "Mostly ready", note: "Two already-disclosed collisions (ProductionPipeline, WorkflowStep/PipelineStage) remain open, re-confirmed rather than newly caused. Zero new collisions were introduced by anything built or fixed since the last naming audit, including the two newest primitives (LiveRegionProvider, useBodyLock)." },
  { label: "Duplication control", verdict: "Mostly ready", note: "One genuine, previously-undisclosed duplication found (the value-transition announcement pattern, hand-copied four times and inconsistently rolled out) — real but bounded, six files, not a systemic pattern across the codebase." },
  { label: "Business feature readiness", verdict: "Ready", note: "All thirteen Composition Framework parts still Pass against current source, with two additional accessibility fixes found and none regressed." },
  { label: "Adoption breadth", verdict: "Mostly ready", note: "One real, improving Business Feature exists — better than Platform Certification's own Fail verdict one tier down — but it is still the only one, still non-production, and still adopts only one of eight platforms." },
  { label: "Technical debt currency", verdict: "Mostly ready", note: "18 outstanding items from prior certification pages consolidated into one register; 6 confirmed resolved or substantially resolved this pass, 8 confirmed still genuinely open, 4 honestly reported unconfirmed rather than guessed. The register itself, not any individual item, is the readiness signal here — a debt backlog that has been measured and is shrinking, not one that is unmeasured." },
  { label: "Production-scale adoption evidence", verdict: "Not ready", note: "Zero production Business Features exist anywhere in the codebase — the same structural fact three separate prior certification pages already disclosed, re-confirmed rather than newly discovered. This is the single blocker to DS-6.5 Final Enterprise Certification, not a defect in the architecture itself." },
];
