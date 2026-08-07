import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IdentityBlock } from "@/components/metadata";
import type { ApprovalStateValue } from "./ApprovalStatus";
import type { StatusTone } from "@/lib/tone";

const REQUEST_TONE: Record<ApprovalStateValue, StatusTone> = {
  pending: "neutral",
  "in-review": "accent",
  approved: "success",
  rejected: "error",
  "changes-requested": "warning",
  cancelled: "neutral",
  expired: "warning",
  completed: "success",
};

const REQUEST_LABEL: Record<ApprovalStateValue, string> = {
  pending: "Pending",
  "in-review": "In Review",
  approved: "Approved",
  rejected: "Rejected",
  "changes-requested": "Changes Requested",
  cancelled: "Cancelled",
  expired: "Expired",
  completed: "Completed",
};

interface ApprovalRequestProps {
  icon?: ReactNode;
  /** What's being approved — "Spring lookbook launch," "Discount request." */
  title: ReactNode;
  requester: ReactNode;
  requestedAt: ReactNode;
  status: ApprovalStateValue;
  /** Additional MetadataRow/MetadataField detail rows. */
  children?: ReactNode;
  className?: string;
}

/**
 * Who's asking for what, and its current state at a glance — composes
 * Foundation Metadata's own IdentityBlock directly, the same composition
 * WorkflowHeader and InspectorHeader both already use, rather than a
 * second name/type/status header implementation.
 */
export function ApprovalRequest({ icon, title, requester, requestedAt, status, children, className }: ApprovalRequestProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <IdentityBlock
        icon={icon}
        name={title}
        type={
          <>
            Requested by {requester} · {requestedAt}
          </>
        }
        status={{ label: REQUEST_LABEL[status], tone: REQUEST_TONE[status] }}
      />
      {children}
    </div>
  );
}
