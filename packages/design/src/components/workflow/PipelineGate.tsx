import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ApprovalStatus } from "./ApprovalStatus";
import { ApprovalDecision } from "./ApprovalDecision";
import type { ApprovalStateValue } from "./ApprovalStatus";

interface PipelineGateProps {
  title: ReactNode;
  status: ApprovalStateValue;
  reason?: ReactNode;
  actor?: ReactNode;
  timestamp?: ReactNode;
  action?: ReactNode;
  /** A compact inline badge instead of the full decision record — for a gate referenced inside a stage header rather than standing on its own. */
  compact?: boolean;
  className?: string;
}

/**
 * A checkpoint a pipeline stage must clear before proceeding — composes
 * Approval & Review's own ApprovalDecision and ApprovalStatus directly
 * rather than rebuilding decision-record rendering, since "does this stage
 * need approval to proceed" is exactly what ApprovalDecision already
 * covers. Reuses ApprovalStateValue as its own status vocabulary rather
 * than declaring a parallel gate-status type, the same reuse-over-rebuild
 * choice ReviewHistory already made for its own domain.
 */
export function PipelineGate({ title, status, reason, actor, timestamp, action, compact = false, className }: PipelineGateProps) {
  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-body-sm font-medium text-ink-primary">{title}</span>
        <ApprovalStatus value={status} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-body-sm font-medium text-ink-primary">{title}</span>
      <ApprovalDecision status={status} reason={reason} actor={actor} timestamp={timestamp} action={action} />
    </div>
  );
}
