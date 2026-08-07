export interface ApprovalAnatomyRegion {
  name: string;
  description: string;
  component: string;
}

export const APPROVAL_ANATOMY: ApprovalAnatomyRegion[] = [
  { name: "Request", description: "Who's asking for what, and its current state at a glance.", component: "ApprovalRequest" },
  { name: "Stages", description: "A titled group of approval steps — the unit a multi-stage approval is built from.", component: "ApprovalStage (Workflow Framework's own WorkflowStage, re-exported)" },
  { name: "Steps", description: "One step within a stage — a status marker plus a label.", component: "ApprovalStep" },
  { name: "Review", description: "The reviewer's own workspace — comments, a checklist, and everything needed to decide.", component: "ReviewPanel (Operational Inspector Panel, re-exported)" },
  { name: "Decision", description: "The recorded outcome — approved, rejected, or changes requested, with a reason.", component: "ApprovalDecision" },
  { name: "Actions", description: "Approve, Reject, Request Changes — whatever can be done right now.", component: "ApprovalActions (Workflow Framework's own WorkflowActions, re-exported)" },
  { name: "Summary", description: "An at-a-glance metric row — reviewers, pending count, turnaround.", component: "ReviewSummary (Workflow Framework's own WorkflowSummary, re-exported)" },
  { name: "History", description: "The chronological record of every decision made on this request.", component: "ReviewHistory (composes Workflow Timeline directly)" },
];
