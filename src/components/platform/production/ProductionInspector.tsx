/**
 * Re-export, not a rebuild. State Machine's own StateInspector (composing
 * Operational Inspector Panel's own InspectorPanel/InspectorHeader/
 * InspectorSection/InspectorProperty directly, keyed to StateValue) already
 * covers "a single artifact's own lifecycle detail" exactly — checked
 * directly against DS-4.1's own Production template, which assigns State
 * Machine to precisely this job. The dependency-graph half of the Inspector
 * Workspace ("...and dependency graph") is supplied through StateInspector's
 * own children slot at the call site (e.g. a compact DependencyGroup/
 * DependencyNode composition) — no second Inspector variant is needed for
 * that, the same "children slot for extra context" pattern every Inspector
 * in this tier already uses.
 */
export { StateInspector as ProductionInspector } from "@/components/workflow";
