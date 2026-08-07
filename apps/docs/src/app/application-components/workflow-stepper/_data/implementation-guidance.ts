export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Stage progression",
    text: "This package holds no opinion on whether stages must complete in order — a caller building an Approval Wizard might allow revisiting an earlier stage after Next, while a Linear Wizard might lock completed stages. WorkflowStepperStage carries no gating logic of its own, matching Workflow Framework's own \"framework only\" stance.",
  },
  {
    label: "Step ownership",
    text: "WorkflowStepperStep's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, just with this package's own 8-value vocabulary instead.",
  },
  {
    label: "Validation",
    text: "Whether Next is enabled for the current step is entirely the caller's concern — WorkflowStepperNavigation's nextDisabled prop is the only hook this package provides; it does not run or own any validation logic itself.",
  },
  {
    label: "Navigation rules",
    text: "WorkflowStepperNavigation's Back is only ever disabled on the first step — whether a caller additionally disables it while a step is submitting, or guards Next behind validation, is implementation-guidance for the consuming screen, not something this component enforces.",
  },
  {
    label: "Save & Resume",
    text: "Nothing in this package persists wizard state across a page reload — a caller wanting Resume Later support (see this package's own Resume Later gallery demo) stores currentStep/step data itself and re-hydrates the wizard's controlled props on mount.",
  },
  {
    label: "Completion",
    text: "WorkflowStepperNavigation's Next button relabels itself \"Finish\" automatically once currentStep reaches totalSteps — the caller supplies what actually happens on that final click (submit, redirect, show a completed-state summary) via the same onNext callback used for every other step.",
  },
];
