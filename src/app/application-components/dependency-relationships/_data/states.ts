export interface DependencyStateNote {
  state: string;
  note: string;
}

export const DEPENDENCY_STATES: DependencyStateNote[] = [
  { state: "Connected", note: "DependencyNode's \"connected\" value shows a filled success-tone marker with a link icon — this node has at least one live edge to another node." },
  { state: "Disconnected", note: "DependencyNode's \"disconnected\" value shows a plain outlined marker with an unlink icon — this node has no edges at all, isolated from the rest of the graph." },
  { state: "Blocked", note: "DependencyNode's \"blocked\" value shows a warning-tone marker with a ban icon — a dependency this node needs hasn't resolved yet." },
  { state: "Healthy", note: "DependencyNode's \"healthy\" value shows a filled success-tone marker with a checkmark — every dependency this node needs is satisfied." },
  { state: "Warning", note: "DependencyNode's \"warning\" value shows a warning-tone marker with an alert-triangle icon — a dependency is satisfied but degraded (e.g. an outdated version)." },
  { state: "Critical", note: "DependencyNode's \"critical\" value shows an error-tone marker with an X — a dependency this node needs is missing or has failed outright." },
  { state: "Circular", note: "DependencyNode's \"circular\" value shows a dashed warning-tone marker with a repeat icon — this node is part of a dependency cycle (A needs B needs A)." },
  { state: "Hidden", note: "DependencyNode's \"hidden\" value shows a struck-through label with an eye-off icon and a neutral marker — filtered out of the current view, still present in the underlying graph. This package's own 8-value DependencyStatusValue is independently declared rather than reusing WorkflowStateValue, StateValue, or Operational's HealthStatusValue — checked directly against all three, and none covers Connected/Disconnected/Circular/Hidden, structural-graph concepts none of the existing lifecycle or health vocabularies model." },
];
