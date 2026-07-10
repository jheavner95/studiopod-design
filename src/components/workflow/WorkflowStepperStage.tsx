/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowStage (a
 * titled group with an optional stage-level status badge) already covers
 * this exactly — a stage's aggregate status is a coarser concept than a
 * step's own granular status and fits WorkflowStateValue cleanly, with no
 * vocabulary conflict the way WorkflowStepperStep has.
 */
export { WorkflowStage as WorkflowStepperStage } from "./WorkflowStage";
