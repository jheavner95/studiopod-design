export interface DependencyFutureExtension {
  title: string;
  description: string;
}

export const DEPENDENCY_FUTURE_EXTENSIONS: DependencyFutureExtension[] = [
  { title: "Interactive graph layout", description: "Dragging nodes to rearrange them, with edges following — this package's own DependencyGroup lays nodes out in a static Grid; real force-directed or draggable layout belongs to the illustration-canvas layer's own coordinate-positioned rendering model, not this DOM-flow family." },
  { title: "Auto-layout", description: "Automatically computing node positions from the graph's own edge structure rather than a caller-authored Grid arrangement — the illustration engine's own IllustrationCanvas already does this for canvas-positioned diagrams; this family would need a comparable algorithm adapted to DOM flow." },
  { title: "Impact simulation", description: "Previewing which nodes would become Blocked or Critical if a given node were removed, before actually removing it, is not supported." },
  { title: "Version comparison", description: "Diffing two snapshots of the same dependency graph to show what changed — a genuinely different capability from this package's own single-snapshot rendering." },
  { title: "Dependency replay", description: "Re-running how a graph's own connectivity changed over time, step by step, rather than the static current-state view this package renders today, is not supported." },
  { title: "AI relationship analysis", description: "Flagging an unusual or risky dependency pattern (e.g. a newly-introduced cycle) rather than a human reading DependencyLegend/DependencySummary themselves is not supported." },
];
