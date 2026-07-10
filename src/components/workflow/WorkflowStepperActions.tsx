/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowActions
 * (itself a re-export of Operational Inspector Panel's InspectorActions)
 * already covers this exactly — a wizard's own actions (Save draft, Skip)
 * are still just a right-aligned row of Button elements.
 */
export { WorkflowActions as WorkflowStepperActions } from "./WorkflowActions";
