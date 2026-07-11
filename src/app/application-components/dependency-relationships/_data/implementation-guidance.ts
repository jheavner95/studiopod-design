export interface ImplementationGuidanceTopic {
  label: string;
  text: string;
}

export const IMPLEMENTATION_GUIDANCE: ImplementationGuidanceTopic[] = [
  {
    label: "Node ownership",
    text: "DependencyNode's status is passed directly by the caller, not derived internally — the same controlled-component contract Workflow Framework's own WorkflowStep already established, using this package's own DependencyStatusValue instead.",
  },
  {
    label: "Relationship direction",
    text: "DependencyEdge defaults to forward (a dependency is inherently one-way — \"A needs B\"); RelationshipEdge defaults to bidirectional instead, since a relationship this family renders is more often a two-way peer connection. Both accept the same forward/backward/bidirectional vocabulary, so a caller can override either default when the real-world direction differs.",
  },
  {
    label: "Dependency grouping",
    text: "DependencyGroup holds no opinion on what a group represents — a caller might group by platform, by domain, or by deployment boundary. Nothing in this package infers groups from graph structure; the caller clusters nodes and supplies one DependencyGroup per cluster.",
  },
  {
    label: "Impact analysis",
    text: "This package renders what a caller already knows about a node's upstream/downstream relationships — it does not compute impact itself. \"If I change X, what breaks\" is graph-traversal logic the caller owns; DependencyInspector only displays the properties (including a computed impact list, if the caller supplies one) it's given.",
  },
  {
    label: "Filtering",
    text: "DependencyFilters is a controlled component — it holds no filtering logic itself, only emitting the selected DependencyFilterValue via onChange. Applying that filter (hiding non-matching nodes, or marking them Hidden rather than removing them entirely) is the composing screen's own responsibility, the same controlled-component contract Workflow Timeline's own WorkflowTimelineFilters already established.",
  },
  {
    label: "Inspector integration",
    text: "DependencyInspector composes Operational Inspector Panel's own family directly, the identical pattern State Machine's own StateInspector already established — properties are plain label/value pairs the caller supplies, with no special dependency-graph awareness baked into InspectorProperty itself.",
  },
];
