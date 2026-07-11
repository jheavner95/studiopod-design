/**
 * Re-export, not a rebuild. Workflow Framework's own Workflow (header/
 * sidebar/scrollable-body/footer/loading/empty-state chrome over
 * Operational Inspector Panel) already covers the Production platform's
 * own workspace shell exactly — checked directly against its full prop
 * surface (header/sidebar/children/footer/loading/loadingLabel/emptyState)
 * and found already fully domain-agnostic, no Production-specific field
 * needed. The same "top-level surface = Workflow re-export" pattern used
 * at least six times one tier down (Pipeline, StateMachine,
 * DependencyGraph, RelationshipView, WorkflowCanvas), now applied one tier
 * up for the first time.
 */
export { Workflow as ProductionWorkspace } from "@/components/workflow";
