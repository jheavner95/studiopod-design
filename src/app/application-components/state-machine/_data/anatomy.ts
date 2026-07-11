export interface StateAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const STATE_ANATOMY: StateAnatomyRegion[] = [
  { name: "Machine", description: "The panel shell everything else renders inside.", component: "StateMachine (Workflow Framework's own Workflow, re-exported)" },
  { name: "States", description: "One state in the machine — a status marker plus a label. StateLegend spells out what every marker means.", component: "StateNode, StateLegend" },
  { name: "Transitions", description: "The line between two states, showing whether that path has been crossed.", component: "StateTransition (Workflow Framework's own WorkflowTransition underneath)" },
  { name: "Conditions", description: "A guard condition attached to a transition — the thing that must be true for it to fire.", component: "StateCondition" },
  { name: "Actions", description: "What fires automatically on enter/exit/transition, and what a person can trigger right now.", component: "StateAction, StateActions" },
  { name: "Events", description: "The catalog of named events this machine responds to, and the states they move between.", component: "StateEvents" },
  { name: "History", description: "The chronological record of what actually happened on a real run.", component: "StateHistory (composes Workflow Timeline directly)" },
  { name: "Metrics", description: "Measured numbers a machine produces, and an at-a-glance overview.", component: "StateMetrics, StateSummary" },
  { name: "Inspector", description: "The detail view for a single state.", component: "StateInspector (composes Operational Inspector Panel directly)" },
];
