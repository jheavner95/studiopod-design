export interface StepperFutureExtension {
  title: string;
  description: string;
}

export const STEPPER_FUTURE_EXTENSIONS: StepperFutureExtension[] = [
  { title: "Branching workflows", description: "WorkflowStepperConnector already carries a pending/active/complete line status, but nothing yet models two possible next steps from one point — a genuinely different component from a linear connector." },
  { title: "Conditional steps", description: "Showing or hiding a step based on an earlier answer (e.g. skip the \"business details\" step for an individual account) is not supported; WorkflowStepperStep's own Skipped state covers the display, not the branching logic that would decide it." },
  { title: "Dynamic insertion", description: "Inserting a new step into an in-progress wizard (e.g. an extra verification step triggered by a fraud check) — a genuinely different capability from this package's own fixed, caller-supplied step list." },
  { title: "Reusable templates", description: "Saving a stage/step arrangement as a named, reusable wizard definition — a data-layer concern above this package's own stateless, prop-driven components." },
  { title: "Workflow persistence", description: "A built-in save/resume mechanism rather than the caller owning currentStep/step-data storage itself, as this package's own Save & Resume implementation guidance currently requires." },
  { title: "AI-guided workflows", description: "Suggesting or auto-advancing steps based on context rather than a screen hand-composing WorkflowStepper/WorkflowStepperStep itself is not supported." },
];
