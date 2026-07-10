/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowHeader
 * (icon/name/type + a children slot for status/progress) already covers
 * exactly what a wizard's header needs — nothing stepper-specific to add.
 */
export { WorkflowHeader as WorkflowStepperHeader } from "./WorkflowHeader";
