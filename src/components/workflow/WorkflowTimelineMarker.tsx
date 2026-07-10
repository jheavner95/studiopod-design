import { Check, X, AlertTriangle, Ban, SkipForward, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type WorkflowTimelineEventStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "blocked"
  | "waiting"
  | "skipped";

interface WorkflowTimelineMarkerProps {
  status: WorkflowTimelineEventStatus;
  className?: string;
}

const MARKER_ICON: Partial<Record<WorkflowTimelineEventStatus, typeof Check>> = {
  completed: Check,
  failed: X,
  blocked: AlertTriangle,
  cancelled: Ban,
  skipped: SkipForward,
  waiting: Clock,
};

const MARKER_TONE: Record<WorkflowTimelineEventStatus, string> = {
  pending: "border border-border-strong text-ink-tertiary",
  running: "bg-accent-500 text-white",
  completed: "bg-success text-white",
  failed: "bg-error text-white",
  cancelled: "border border-border-subtle text-ink-tertiary",
  blocked: "bg-warning text-white",
  waiting: "border border-dashed border-border-strong text-ink-tertiary",
  skipped: "bg-surface-hover text-ink-tertiary",
};

/**
 * The status dot for one WorkflowTimelineEvent — its own 8-value
 * WorkflowTimelineEventStatus (Pending/Running/Completed/Failed/Cancelled/
 * Blocked/Waiting/Skipped), independently declared rather than reusing
 * WorkflowStateValue (no Skipped value, and a Ready/Running split this
 * package doesn't need) or WorkflowStepperStateValue (a single-cursor
 * "current" concept, not a per-event state) — checked directly against both
 * before adding a third, following the same precedent that already
 * justifies WorkflowStateValue and WorkflowStepperStateValue as distinct
 * types. A plain dot for non-terminal states (Pending/Running/Blocked/
 * Skipped/Cancelled have no icon of their own) or an icon for the rest, in
 * WorkflowStepperStep's own marker idiom — exported standalone so
 * WorkflowTimelineLegend can render the same markers outside an event row.
 */
export function WorkflowTimelineMarker({ status, className }: WorkflowTimelineMarkerProps) {
  const Icon = MARKER_ICON[status];
  return (
    <span
      className={cn("flex size-6 shrink-0 items-center justify-center rounded-full text-body-sm font-medium", MARKER_TONE[status], className)}
      aria-hidden
    >
      {Icon ? <Icon className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
    </span>
  );
}
