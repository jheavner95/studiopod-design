export interface DependencyAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const DEPENDENCY_ANATOMY: DependencyAnatomyRegion[] = [
  { name: "Graph", description: "The panel shell everything else renders inside.", component: "DependencyGraph (Workflow Framework's own Workflow, re-exported)" },
  { name: "Nodes", description: "One entity in the graph — a status marker plus a label.", component: "DependencyNode" },
  { name: "Edges", description: "The connection between two nodes, with a direction arrowhead.", component: "DependencyEdge (Workflow Framework's own WorkflowTransition underneath)" },
  { name: "Groups", description: "A cluster of nodes that share a common boundary — e.g. every node in the same platform.", component: "DependencyGroup" },
  { name: "Relationships", description: "The same node/edge shape, framed as peer connections rather than strict dependencies.", component: "RelationshipView, RelationshipNode, RelationshipEdge" },
  { name: "Inspector", description: "The detail view for a single node — what it depends on, and what depends on it.", component: "DependencyInspector (composes Operational Inspector Panel directly)" },
  { name: "Filters", description: "Narrowing the graph to one node status at a time.", component: "DependencyFilters" },
  { name: "Legend", description: "What each marker means, spelled out so meaning never depends on color alone.", component: "DependencyLegend" },
  { name: "Summary", description: "An at-a-glance metric row — nodes, edges, blocked count.", component: "DependencySummary (Workflow Framework's own WorkflowSummary, re-exported)" },
  { name: "Actions", description: "What can be done right now — Refresh, Focus, Export.", component: "DependencyActions (Workflow Framework's own WorkflowActions, re-exported)" },
];
