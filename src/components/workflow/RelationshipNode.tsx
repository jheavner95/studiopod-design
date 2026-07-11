/** Re-export, not a rebuild. A relationship node is the same status-marker-plus-label shape DependencyNode already provides — a node is a node whether the view frames it as a dependency or a peer relationship. */
export { DependencyNode as RelationshipNode, DependencyNodeMarker as RelationshipNodeMarker, type DependencyStatusValue as RelationshipStatusValue } from "./DependencyNode";
