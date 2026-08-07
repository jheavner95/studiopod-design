/**
 * Re-export, not a rebuild. Operational Inspector Panel's own
 * InspectorActions (a right-aligned row of Button elements, built on
 * Foundation Layout's Inline) already covers this exactly — a workflow's
 * own actions (Approve, Reject, Cancel, ...) are still just object-level
 * actions on the one active workflow, not a second row pattern.
 */
export { InspectorActions as WorkflowActions } from "@/components/operational";
