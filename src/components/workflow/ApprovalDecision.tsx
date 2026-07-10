import type { ReactNode } from "react";
import { Alert, type FeedbackTone } from "@/components/feedback";
import { Caption } from "@/components/ui";
import type { ApprovalStateValue } from "./ApprovalStatus";

const DECISION_TONE: Record<ApprovalStateValue, FeedbackTone> = {
  pending: "info",
  "in-review": "info",
  approved: "success",
  rejected: "error",
  "changes-requested": "warning",
  cancelled: "info",
  expired: "warning",
  completed: "success",
};

const DECISION_TITLE: Record<ApprovalStateValue, string> = {
  pending: "Pending",
  "in-review": "In review",
  approved: "Approved",
  rejected: "Rejected",
  "changes-requested": "Changes requested",
  cancelled: "Cancelled",
  expired: "Expired",
  completed: "Completed",
};

interface ApprovalDecisionProps {
  status: ApprovalStateValue;
  reason?: ReactNode;
  actor?: ReactNode;
  timestamp?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * The recorded outcome of a decision — a thin preset over Foundation
 * Feedback's own Alert (boxed, section-level, dismissible-if-needed),
 * rather than EmptyState's SuccessState/ErrorState presets, since those are
 * full-region placeholder cards (icon + centered heading) built for empty
 * screens, not a compact inline decision record sitting inside an
 * ApprovalFlow's own body.
 */
export function ApprovalDecision({ status, reason, actor, timestamp, action, className }: ApprovalDecisionProps) {
  return (
    <Alert tone={DECISION_TONE[status]} title={DECISION_TITLE[status]} action={action} className={className}>
      {reason}
      {actor || timestamp ? (
        <Caption as="span" className="mt-1 block text-ink-tertiary">
          {actor ? <>{actor}</> : null}
          {actor && timestamp ? " · " : null}
          {timestamp ? <>{timestamp}</> : null}
        </Caption>
      ) : null}
    </Alert>
  );
}
