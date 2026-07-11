/**
 * Re-export, not a rebuild. Dependency & Relationship Views' own
 * DependencyEdge (WorkflowTransition line status plus a direction
 * arrowhead) already covers a node-to-node connection with direction —
 * exactly what a workflow visualization's own edges need, checked directly
 * against DependencyEdge's full prop surface (status/direction/
 * orientation/label) and found to have no gap. Reused unchanged rather
 * than a second, near-identical direction-arrow composition.
 */
export { DependencyEdge as WorkflowEdge, type DependencyDirection as WorkflowEdgeDirection } from "./DependencyEdge";
