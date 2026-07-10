/**
 * Re-export, not a rebuild. A timeline needs the exact same panel shell as
 * every other Workflow Framework surface — header/scrollable-body/footer/
 * loading/empty-state chrome — so this reuses Workflow directly, the same
 * choice Workflow Stepper's own WorkflowStepper already made. Note: a
 * DIFFERENT WorkflowTimeline already exists at src/workflows/components/
 * WorkflowTimeline.tsx — the pre-existing Workflow Diagram Library's own
 * animated milestone-rail component (built on TimelineComposition, an
 * illustration-canvas layer this package doesn't compose from). That is an
 * import-path-distinct, unrelated family, the same naming overlap
 * WorkflowProgress.tsx already documents and accepts — checked directly,
 * not missed.
 */
export { Workflow as WorkflowTimeline } from "./Workflow";
