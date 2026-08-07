export interface DependencyChain {
  id: string;
  label: string;
  /** A linear sequence read left to right (top to bottom on mobile). */
  chain: string[];
}

export interface DependencyFanout {
  id: string;
  label: string;
  parent: string;
  children: string[];
}

/** The top-level assembly order: what a Workspace Shell is actually composed of. */
export const DEPENDENCY_CHAINS: DependencyChain[] = [
  {
    id: "workspace-shell",
    label: "Workspace assembly",
    chain: ["Workspace Shell", "Workspace Header", "Navigation", "Toolbar", "Library", "Inspector", "Status / Activity"],
  },
];

/** Three families expanded one level: the parent component and what it's made of. */
export const DEPENDENCY_FANOUTS: DependencyFanout[] = [
  {
    id: "library",
    label: "Library",
    parent: "Library",
    children: ["Grid", "Table", "Asset Card", "Preview", "Filters"],
  },
  {
    id: "inspector",
    label: "Inspector",
    parent: "Inspector",
    children: ["Identity", "Properties", "Validation", "Health", "Activity"],
  },
  {
    id: "workflow",
    label: "Workflow",
    parent: "Workflow",
    children: ["Queue", "Job Status", "Batch Action Bar", "Timeline", "Progress"],
  },
];
