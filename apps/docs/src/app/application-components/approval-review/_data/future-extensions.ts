export interface ApprovalFutureExtension {
  title: string;
  description: string;
}

export const APPROVAL_FUTURE_EXTENSIONS: ApprovalFutureExtension[] = [
  { title: "Multi-reviewer approval", description: "Requiring more than one reviewer's sign-off on the same stage — a genuinely different capability from this package's own single-decision-per-stage model." },
  { title: "Parallel approvals", description: "Two or more stages awaiting decisions at the same time rather than sequentially — ApprovalStageGroup-equivalent grouping is not supported." },
  { title: "Digital signatures", description: "A cryptographically verifiable sign-off rather than a plain ApprovalDecision record — a genuinely different trust/compliance concern above this package's own UI components." },
  { title: "Approval delegation", description: "Reassigning a pending review to a different reviewer is not supported; this package's own ApprovalRequest has no \"assignee\" concept beyond the original requester today." },
  { title: "Due dates", description: "A deadline attached to a pending review, with Expired computed automatically rather than set directly by the caller as this package's own ApprovalStateValue currently requires." },
  { title: "AI review assistance", description: "Suggesting a decision or drafting review comments rather than a human reading everything themselves is not supported." },
];
