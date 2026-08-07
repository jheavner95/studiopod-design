/**
 * Re-export, not a rebuild. A relationship view needs the exact same panel
 * shell as DependencyGraph — both are Workflow Framework surfaces composing
 * Workflow directly, the same sibling-re-export relationship WorkflowTimeline
 * and WorkflowStepper already have with each other.
 *
 * Distinct from two other things this name could be confused with, checked
 * and documented rather than missed: Foundation Metadata's own
 * RelationshipList (src/components/metadata/RelationshipList.tsx) is a flat
 * list of {label, href?, meta?} rows with no node positions, no edges, no
 * graph — a fundamentally different shape from this family's own node/edge
 * composition, not built on top of it. And src/platforms/components/
 * PlatformRelationshipMap.tsx is a real, working "dependency-only" diagram
 * view, but at the illustration-canvas layer (coordinate-positioned nodes,
 * SVG connectors, PlatformArchitecture domain data) — a different rendering
 * model from this tier's own DOM-composed components, the same real-but-
 * different-layer distinction Pipeline Components' own audit already
 * established for Production's ValidationStage/QualityGate model.
 */
export { Workflow as RelationshipView } from "./Workflow";
