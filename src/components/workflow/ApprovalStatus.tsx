import { StatusIndicator, type SystemStatus } from "@/components/feedback";

export type ApprovalStateValue =
  | "pending"
  | "in-review"
  | "approved"
  | "rejected"
  | "changes-requested"
  | "cancelled"
  | "expired"
  | "completed";

const STATUS_MAP: Record<ApprovalStateValue, { status: SystemStatus; label: string }> = {
  pending: { status: "idle", label: "Pending" },
  "in-review": { status: "active", label: "In Review" },
  approved: { status: "success", label: "Approved" },
  rejected: { status: "error", label: "Rejected" },
  "changes-requested": { status: "warning", label: "Changes Requested" },
  cancelled: { status: "idle", label: "Cancelled" },
  expired: { status: "warning", label: "Expired" },
  completed: { status: "success", label: "Completed" },
};

interface ApprovalStatusProps {
  value: ApprovalStateValue;
  className?: string;
}

/**
 * The approval-lifecycle status dot + label — a thin preset over Foundation
 * Feedback's own StatusIndicator, the same STATUS_MAP-over-StatusIndicator
 * pattern WorkflowStatus/HealthIndicator/QueueStatus already established.
 * A genuinely distinct 8-value vocabulary from both WorkflowStateValue (no
 * Rejected/Changes Requested/Expired) and WorkflowStepperStateValue (a
 * single-cursor wizard model with the same gaps) — checked directly against
 * both before declaring this one, the same precedent that already justifies
 * WorkflowStepperStateValue and WorkflowTimelineEventStatus as their own
 * independent types.
 */
export function ApprovalStatus({ value, className }: ApprovalStatusProps) {
  const { status, label } = STATUS_MAP[value];
  return <StatusIndicator status={status} label={label} className={className} />;
}
