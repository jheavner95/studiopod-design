/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowSummary (a
 * titled StatGroup row) already covers this exactly — a wizard's own
 * summary stats (steps completed, blockers) are just StatGroupItem[] data,
 * with no stepper-specific layout to add.
 */
export { WorkflowSummary as WorkflowStepperSummary } from "./WorkflowSummary";
