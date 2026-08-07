export interface WorkflowPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains
 * (Production, Publishing, Commerce, Planning, Intelligence, Automation)
 * plus a direct read of the pre-existing Workflow Diagram Library's own
 * eight components in src/workflows/components/. Every domain came back
 * clean — no real stage/step/transition workflow-operating UI exists
 * anywhere, only diagram/timeline visualizations that already delegate to
 * the shared Illustration/Timeline engines.
 */
export const WORKFLOW_PROMOTION_CANDIDATES: WorkflowPromotionCandidate[] = [];

export const WORKFLOW_CLEAN_FINDINGS: string[] = [
  "Production: every component (ProductionPipelineDiagram, ArtifactLifecycleDiagram, ValidationDiagram, QualityGateDiagram, ValidationTimeline) compiles data to the existing IllustrationCanvas/Diagram engine or the existing TimelineComposition — ArtifactLifecycleDiagram's own doc comment states it reuses \"the Workflow Engine rather than a bespoke renderer.\" No bespoke stage/step/transition logic exists anywhere in src/production.",
  "Publishing, Commerce: PublishingDiagram.tsx and CommerceDiagram.tsx are both category-scoped capability-registry diagrams (compileRegistryToDiagram + IllustrationCanvas) — relationship diagrams, not stage/step workflows.",
  "Planning: no src/planning/ directory or component exists anywhere in the repo (confirmed via find -type d). \"Planning\" only appears as an architecture-diagram node label or prose reference (e.g. the platform inventory describing itself as \"a planning inventory, not an implementation\").",
  "Intelligence: confirmed again that no src/intelligence/ directory exists; the only real code is src/platforms/examples/intelligencePlatform.tsx, a PlatformArchitecture data object (observe/analyze/recommend/automate loop) with no steps array or stage/step shape, consumed by the platform-architecture diagram engine.",
  "Automation: no src/automation/ directory or component exists anywhere. Every hit is a future-extension doc entry (\"Automation Console,\" \"Automation Rules,\" \"Automation History\") or a reuseTargets label on an unrelated catalog entry — none implemented.",
  "The pre-existing src/workflows/components/ (WorkflowCard, WorkflowProgress, WorkflowTimeline, WorkflowDiagram, WorkflowLegend, WorkflowMiniMap, WorkflowRail, WorkflowStepDetails) is a diagram-canvas/visualization library, confirmed by direct read of all eight files — each either compiles to IllustrationCanvas/TimelineComposition or thinly wraps a single existing primitive (FlowCard, Progress, ProgressRail, Expand). None provide a controlled \"current stage\" concept, interactive branching/gating, or a real stepper control — only a read-only visual rail (WorkflowRail) and a single aggregate completion bar (WorkflowProgress). This conclusion is independently corroborated by three prior migration-notes reviews already in the repo (Queue & Job's, Foundation Metadata's, and Inspector Panel's own).",
];

/**
 * A real, but non-duplicative, naming overlap this audit specifically
 * flagged rather than silently absorbing: WorkflowStep already exists as a
 * type in two places (src/workflows/types/workflow.ts and
 * src/compositions/WorkflowComposition.tsx, itself a second, unrelated
 * definition), and WorkflowProgress already exists as a component
 * (src/workflows/components/WorkflowProgress.tsx). Both are scoped
 * entirely to the pre-existing diagram-visualization libraries — a data
 * shape for one diagram node, and a single aggregate completion bar for one
 * diagram value — genuinely different from this package's own WorkflowStep
 * (an interactive, independently-statused unit inside a WorkflowStage) and
 * WorkflowProgress (a plain value/label preset with no diagram-library
 * dependency). Documented explicitly in each file's own doc comment, the
 * same "distinct scope, same name" precedent Status & Health's own
 * HealthIndicator already established against its illustration-engine
 * namesake — not migrated or renamed, since nothing is actually duplicated.
 */
export const WORKFLOW_NAMING_NOTE =
  "WorkflowStep and WorkflowProgress share names with pre-existing exports in src/workflows/ (the Workflow Diagram Library) and src/compositions/ (the marketing composition layer). Both are import-path-distinct and scoped to diagram-canvas visualization rather than this framework's own stage/step/transition semantics — see each component's own doc comment for the specific distinction.";
