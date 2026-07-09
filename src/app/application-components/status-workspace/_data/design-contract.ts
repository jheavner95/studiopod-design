export interface DesignContractItem {
  label: string;
  note: string;
}

/** The official checklist every future Operational Status implementation must satisfy — each item traces back to a specific region or principle documented above, not restated from scratch. */
export const DESIGN_CONTRACT: DesignContractItem[] = [
  { label: "Status remains visible", note: "Matches the Workspace Status region's own visibility rule." },
  { label: "Background work is discoverable", note: "Matches Background Jobs' own progress rule — nothing runs invisibly." },
  { label: "Health is passive", note: "Matches Operational Health's own read-only-indicators rule." },
  { label: "Notifications prioritized", note: "Matches the Notifications region's own severity rule." },
  { label: "Timeline chronological", note: "Matches Activity Timeline's own chronological-order rule." },
  { label: "Diagnostics separated", note: "Diagnostics stays a distinct, permission-gated region — never folded into Notifications or Operational Health." },
  { label: "Responsive", note: "Matches one of the five presentation modes, appropriate to its breakpoint." },
  { label: "Accessible", note: "Matches every item in the Accessibility section." },
];
