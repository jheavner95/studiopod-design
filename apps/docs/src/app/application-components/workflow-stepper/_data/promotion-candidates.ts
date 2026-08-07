export interface StepperPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains
 * (Production, Publishing, Commerce, Planning, Onboarding, Settings), plus
 * a direct re-read of Foundation Navigation's own Stepper.tsx and the
 * brand-new Workflow Framework files from DS-3.1, independently confirming
 * both the DS-3.1 and DS-2.3 audits' own prior conclusions rather than
 * trusting them at face value.
 */
export const STEPPER_PROMOTION_CANDIDATES: StepperPromotionCandidate[] = [];

export const STEPPER_CLEAN_FINDINGS: string[] = [
  "Production: ValidationDiagram.tsx and QualityGateDiagram.tsx both allow free-form node selection via an onSelect callback — any stage can be clicked, with no \"must complete step 1 before step 2\" gating, no Back/Next control, and no internal current-step cursor. Read-only diagrams with a selection callback, not a guided wizard.",
  "Publishing, Commerce: PublishingDiagram.tsx and CommerceDiagram.tsx are both category-scoped capability-registry diagrams (compileRegistryToDiagram + IllustrationCanvas) — relationship diagrams, not setup flows. No \"wizard\"/\"setup flow\"/\"multi-step\" file exists anywhere under src/capabilities or src/app/capabilities.",
  "Planning: no src/planning/ directory or component exists anywhere in the repo (re-confirmed on a direct re-check) — \"Planning\" only appears as an architecture-diagram node label or prose reference.",
  "Onboarding: no directory, page, or component named \"onboarding\" exists. Every hit is an incidental fake-data label (a queued job or asset row named \"Onboarding script\" in an unrelated gallery demo) or a documentation use-case list mentioning \"Auth and onboarding flows\" as an example of Compact width mode — no onboarding wizard exists anywhere, even as a documented concept beyond one FAQ answer sentence.",
  "Settings: every \"settings\" hit across ~19 files is a doc-comment example (\"a settings section\"), gallery demo copy (a disabled Settings tab, a breadcrumb label), or prose/data description — no file implements a multi-step settings wizard.",
  "Foundation Navigation's own Stepper.tsx is a pure read-only <ol>, no Back/Next, no internal state, explicitly documented as \"not an interactive control.\" Its own catalog entry (foundation-components/_data/catalog.ts) already names this package's own reuse targets verbatim: reuseTargets: [\"Approval Panel multi-stage review\", \"Publishing Operations pipeline stages\"] — a gap this package now genuinely fills rather than duplicates, since WorkflowStepperStep/Connector were built fresh specifically because Stepper's 4-state single-cursor model can't represent this package's own Waiting/Skipped states.",
  "Foundation Form System (src/components/form/): its 22 exports (Form, FormSection, FormField, PropertyEditor, ValidationSummary, ...) are a single-page field/validation system — grepped for step|wizard|currentIndex|activeStep|stage across every file, zero matches. Not a stepper, nothing to migrate.",
];
