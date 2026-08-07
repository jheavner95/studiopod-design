/**
 * Re-export, not a rebuild. A state machine needs the exact same panel
 * shell as every other Workflow Framework surface — header/scrollable-
 * body/footer/loading/empty-state chrome — so this reuses Workflow
 * directly, the same choice Pipeline, ApprovalFlow, and WorkflowTimeline
 * already made.
 */
export { Workflow as StateMachine } from "./Workflow";
