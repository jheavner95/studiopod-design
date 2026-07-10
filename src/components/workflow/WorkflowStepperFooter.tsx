/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowFooter (itself
 * a re-export of Operational Inspector Panel's InspectorFooter) already
 * covers this exactly — a sticky bar pinning WorkflowStepperNavigation/
 * WorkflowStepperActions to the bottom of the wizard regardless of scroll.
 */
export { WorkflowFooter as WorkflowStepperFooter } from "./WorkflowFooter";
