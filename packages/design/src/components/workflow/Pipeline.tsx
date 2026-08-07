/**
 * Re-export, not a rebuild. A pipeline needs the exact same panel shell as
 * every other Workflow Framework surface — header/scrollable-body/footer/
 * loading/empty-state chrome — so this reuses Workflow directly, the same
 * choice ApprovalFlow, WorkflowTimeline, and WorkflowStepper already made.
 */
export { Workflow as Pipeline } from "./Workflow";
