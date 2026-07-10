export interface StepperAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const STEPPER_ANATOMY: StepperAnatomyRegion[] = [
  { name: "Header", description: "What wizard this is, and its live status/progress at a glance.", component: "WorkflowStepperHeader (Workflow Framework's own WorkflowHeader, re-exported)" },
  { name: "Stages", description: "A titled group of steps — the unit a multi-part wizard is built from.", component: "WorkflowStepperStage (Workflow Framework's own WorkflowStage, re-exported)" },
  { name: "Steps", description: "One step in the guided sequence — a numbered or iconized marker plus a label.", component: "WorkflowStepperStep" },
  { name: "Connectors", description: "The line between two steps, showing whether that segment has been crossed yet.", component: "WorkflowStepperConnector (Workflow Framework's own WorkflowTransition underneath)" },
  { name: "Progress", description: "\"Step N of M\" — the wizard's own overall completion.", component: "WorkflowStepperProgress (Workflow Framework's own WorkflowProgress underneath)" },
  { name: "Summary", description: "An at-a-glance metric row — steps completed, time elapsed, blockers.", component: "WorkflowStepperSummary (Workflow Framework's own WorkflowSummary, re-exported)" },
  { name: "Navigation", description: "Back and Next controls for moving through the wizard.", component: "WorkflowStepperNavigation" },
  { name: "Actions", description: "What can be done right now — Save draft, Skip, Cancel.", component: "WorkflowStepperActions (Workflow Framework's own WorkflowActions, re-exported)" },
  { name: "Footer", description: "A sticky bar pinning Navigation/Actions to the bottom of the wizard regardless of scroll.", component: "WorkflowStepperFooter (Workflow Framework's own WorkflowFooter, re-exported)" },
];
