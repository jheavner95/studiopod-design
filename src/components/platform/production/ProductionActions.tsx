/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowActions
 * (itself a re-export of Operational Inspector Panel's own InspectorActions
 * — a right-aligned row of Button elements) already covers a production
 * job's own object-level actions (Approve, Retry, Cancel) — checked
 * directly and found fully generic, no Production-specific field needed.
 */
export { WorkflowActions as ProductionActions } from "@/components/workflow";
