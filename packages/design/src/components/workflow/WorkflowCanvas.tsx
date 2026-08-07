/**
 * Re-export, not a rebuild. Workflow Framework's own Workflow (header/
 * scrollable-body/footer/loading/empty-state chrome over Operational
 * Inspector Panel) already covers the flow-diagram content shell, the same
 * "top-level surface = Workflow re-export" pattern DependencyGraph,
 * RelationshipView, Pipeline, and StateMachine already established for
 * their own tiers.
 *
 * This is deliberately NOT the same thing as the Illustration Library's own
 * IllustrationCanvas (src/illustrations/primitives/IllustrationCanvas.tsx),
 * checked directly: IllustrationCanvas computes a coordinate layout
 * (`computeLayout`, `useElementSize`) and renders absolutely-positioned
 * nodes/groups with real SVG connectors, for static diagrams and
 * marketing/documentation visuals. WorkflowCanvas is the DOM-flow
 * (flex/Grid) content shell for the StudioPOD application's own operational
 * workflow screens — no coordinate system, no pan/zoom (see this package's
 * own Future Extensions). WorkflowViewport, composed inside this canvas's
 * children, provides the scrollable sub-region for node/edge content.
 */
export { Workflow as WorkflowCanvas } from "./Workflow";
