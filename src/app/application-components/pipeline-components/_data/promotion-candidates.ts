export interface PipelinePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified six named domains — Production,
 * Publishing, Commerce, Planning, Automation, Intelligence — plus a
 * repo-wide grep for every exported Pipeline-named component/type,
 * independently reading each hit's actual implementation rather than
 * assuming from its name. Unlike every prior Workflow Component Library
 * package this session, this audit found real pre-existing pipeline
 * models — "pipeline" is a genuinely overloaded term in this codebase.
 * Both candidates below are architecturally different layers (illustration-
 * canvas diagram rendering) from this package's own DOM-composition
 * component library, so neither is literal duplicate code — but both model
 * the same real-world concept (stages, gates, status) this package now
 * canonicalizes at the component-library tier, so a future screen choosing
 * between them needs this distinction spelled out explicitly.
 */
export const PIPELINE_PROMOTION_CANDIDATES: PipelinePromotionCandidate[] = [
  {
    id: "production-pipeline-model",
    pattern: "Production's own stage/gate pipeline data model and diagram components",
    files: [
      "src/production/types/production.ts (ProductionPipeline, ValidationStage, QualityGate)",
      "src/production/utils/gates.ts (resolveGateStatus, getGateSummary)",
      "src/production/utils/status.ts (resolveStageStatus, toNodeStatus, toSystemStatus)",
      "src/production/utils/compile.tsx (compilePipelineToDiagram, compileGatesToDiagram)",
      "src/production/components/QualityGateDiagram.tsx",
      "src/production/components/ValidationDiagram.tsx",
      "src/production/components/ProductionPipelineDiagram.tsx",
    ],
    description: "A working, non-trivial stage-and-gate business-process model: ValidationStage carries its own status and a blocking flag; QualityGate has real pass/fail/warning-derived status resolution; ProductionPipelineDiagram/QualityGateDiagram/ValidationDiagram render this data as an auto-chained node-and-connection diagram through the illustration-canvas engine (IllustrationCanvas), not through DOM-composed components.",
    migrationNote: "Not a literal duplicate — this is the illustration-canvas diagram layer (compiles data to a node/connection graph), an entirely different rendering model from this package's own StatGroup/Alert/Table-composed DOM components. Production's own screens should keep using ProductionPipelineDiagram for its diagram visualization; this new Pipeline family is the right choice when a screen needs a real, interactive DOM-based stage list with clickable steps, inline gates, and composable actions rather than a rendered diagram. The two can coexist — a future Production screen might show ProductionPipelineDiagram for an at-a-glance graph and this package's own Pipeline for the interactive detail view of the selected stage.",
  },
  {
    id: "illustration-diagram-pipeline",
    pattern: "The illustration engine's own generic ordered/parallel/branching/looping pipeline primitive",
    files: [
      "src/illustrations/types/diagram.ts (PipelineStage, DiagramPipeline)",
      "src/illustrations/primitives/IllustrationPipeline.tsx",
      "src/app/illustrations/_sections/PipelineGallerySection.tsx",
    ],
    description: "A second, independent generic pipeline model at the illustration-engine layer — DiagramPipeline supports ordered stages, parallel stages (multiple nodeIds per stage), branching (next: string[]), and looping, deriving per-node status from an overall progress value. Its own gallery section explicitly labels the demo data \"a deliberately abstract pipeline ... not StudioPOD's real workflow. That comes later\" — i.e. this illustration primitive was always meant to be paired with a real, concrete pipeline concept once one existed.",
    migrationNote: "Not a literal duplicate — a diagram-rendering primitive (node/connection graph via IllustrationCanvas) rather than this package's own composable DOM components, and its own docs already anticipated this package (or one like it) arriving later. No migration needed in either direction: IllustrationPipeline remains the right tool for an abstract, animated diagram visualization (marketing pages, architecture explainers); this new Pipeline family is the right tool for a real, interactive stage list a screen's user actually works with.",
  },
];

export const PIPELINE_CLEAN_FINDINGS: string[] = [
  "PipelineStep naming collision — checked and documented, not missed: src/components/illustration/PipelineStep.tsx already exists (a single repeatable AnimatedNode-based visual primitive, \"meant to be repeated with AnimatedConnector between instances,\" used by marketing compositions like WorkflowComposition's own animated pipeline). This package's own PipelineStep.tsx documents the collision explicitly in its own doc comment, the same import-path-distinct precedent WorkflowProgress.tsx and WorkflowTimeline.tsx already established for their own pre-existing namesakes — genuinely different layer, genuinely different purpose, not duplicated logic.",
  "Production: ArtifactLifecycleDiagram.tsx converts artifacts to a Workflow value and renders through the Workflow Diagram Library's own WorkflowDiagram — a linear lifecycle view with no stage/gate/branch semantics of its own, a different pattern from the two real candidates above.",
  "Publishing: no standalone src/publishing/ directory exists — publishing lives inside src/capabilities/ as PublishingDiagram.tsx, a capability/provider relationship diagram (StudioPOD → Publishing capability → WordPress/Shopify providers) with no stages/gates/branches exercised for publishing specifically. Clean.",
  "Commerce: CommerceDiagram.tsx is the same capability/provider relationship-diagram pattern as Publishing (StudioPOD → Commerce capability → Printify/Gelato/Printful providers) — no stage-based CapabilityFlow instance exists for commerce either. Clean.",
  "Planning: no src/planning/ directory or component exists anywhere in the repo — reconfirmed via a full exported-declaration grep for *Planning*, zero hits beyond unrelated prose. Clean.",
  "Automation: no src/automation/ directory or component exists anywhere in the repo — reconfirmed the same way. Clean.",
  "Intelligence: the only \"intelligence\"-named file is a static PlatformArchitecture example (four layered nodes, Observe→Analyze→Recommend→Automate) with zero stage/gate/branch/pipeline vocabulary used anywhere in the file — a platform-architecture relationship diagram, not a pipeline. Clean.",
];
