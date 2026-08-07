/**
 * Re-export, not a rebuild. An approval flow needs the exact same panel
 * shell as every other Workflow Framework surface — header/scrollable-
 * body/footer/loading/empty-state chrome — so this reuses Workflow
 * directly, the same choice Workflow Stepper's WorkflowStepper and Workflow
 * Timeline's WorkflowTimeline already made.
 */
export { Workflow as ApprovalFlow } from "./Workflow";
