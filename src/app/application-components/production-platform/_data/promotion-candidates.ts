export interface ProductionPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dedicated audit read src/production/, src/capabilities/,
 * src/compositions/, and every certified Workflow/Operational component
 * this package composes from, across the six subdomains this package's own
 * work order names — Composition, Generation, Validation, Pipeline, Queue,
 * QA — plus the Production platform as a whole. No speculative findings:
 * every entry below traces to a specific file this audit actually read.
 */
export const PRODUCTION_PROMOTION_CANDIDATES: ProductionPromotionCandidate[] = [];

export const PRODUCTION_CLEAN_FINDINGS: string[] = [
  "Production platform (whole-platform level): re-confirms the Platform Architecture page's own adoption-target finding — src/production/ is the pre-existing Production & Validation Library (MS-2.5), self-documented as a schema that exists \"to be compiled into Diagram values for IllustrationCanvas.\" Zero real pipeline execution, job queue, or persistence logic exists anywhere in it; src/app/production/ is a gallery/demo page consuming static examples, not a real production-management screen.",
  "Composition: does not exist anywhere in the repo. src/compositions/ (HeroComposition, CTAComposition, and the rest) is confirmed to be exclusively marketing page-section components with no relationship to artwork/print assembly — a naming false-positive, not a duplicate to migrate.",
  "Generation: does not exist as real logic. src/capabilities/examples/aiCapabilityLayer.tsx defines a \"generation\" capability with provider/input labels (OpenAI, Stability AI, Midjourney) as static example data rendered through a diagram component — no fetch, SDK call, or prompt-handling code exists anywhere. This platform's own \"AI Generation\" gallery demo is confirmed genuinely greenfield.",
  "Validation: diagram-layer only, confirmed by direct read of src/production/utils/{gates,status,results}.ts (pure synchronous reducers over caller-supplied data, no execution or I/O) and ValidationDiagram.tsx/ValidationLegend.tsx/ValidationTimeline.tsx (read-only display markup). ProductionValidationPanel correctly composes Pipeline Components' own PipelineGate instead, which already covers real gate-decision rendering.",
  "Pipeline: diagram-layer only in src/production/ (ProductionPipelineDiagram.tsx's own doc comment states \"no pipeline-specific rendering code exists anywhere in this component\") — the real reuse target is Pipeline Components' own Pipeline/PipelineStage (already certified), which ProductionPipeline/ProductionStagePanel both re-export directly rather than duplicating.",
  "Queue: src/production/ has no queue-specific code beyond a single stat-tile label (\"Queue: 6\" in a health dashboard example) — the real, correct reuse target is Operational's own Queue (already certified), which ProductionQueue re-exports directly.",
  "QA: diagram-layer only in src/production/ (QualityGateDiagram.tsx, QualitySummary.tsx — same pure-data-reducer pattern as Validation). The real reuse target is Pipeline Components' own PipelineGate composing Approval & Review's own ApprovalDecision/ApprovalStatus (already certified), which ProductionValidationPanel re-exports directly.",
  "Naming (found during the platform certification review, not originally disclosed here): the component ProductionPipeline (src/components/platform/production/ProductionPipeline.tsx, a re-export of Pipeline Components' own Pipeline) shares its exact identifier with a pre-existing TypeScript interface, ProductionPipeline, in src/production/types/production.ts — the diagram-compilation data shape used throughout src/production/examples/ and ProductionPipelineDiagram.tsx. The two never collide at compile time (different modules, never imported together), and the type is data-only (no rendering code), but this is a real, previously-undisclosed same-name collision — the same class of finding Pipeline Components' own audit already disclosed for PipelineStep vs. the Illustration Library's PipelineStep. Recorded here for parity with that precedent.",
];
