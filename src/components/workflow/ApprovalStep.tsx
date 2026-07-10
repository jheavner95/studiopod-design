import type { ReactNode } from "react";
import { Check, X, AlertTriangle, Ban, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { ApprovalStateValue } from "./ApprovalStatus";

interface ApprovalStepProps {
  label: ReactNode;
  description?: ReactNode;
  status: ApprovalStateValue;
  onClick?: () => void;
  className?: string;
}

const MARKER_ICON: Partial<Record<ApprovalStateValue, typeof Check>> = {
  approved: Check,
  completed: Check,
  rejected: X,
  "changes-requested": AlertTriangle,
  cancelled: Ban,
  expired: Clock,
};

const MARKER_TONE: Record<ApprovalStateValue, string> = {
  pending: "border border-border-strong text-ink-tertiary",
  "in-review": "bg-accent-500 text-white",
  approved: "bg-success text-white",
  rejected: "bg-error text-white",
  "changes-requested": "bg-warning text-white",
  cancelled: "border border-border-subtle text-ink-tertiary",
  expired: "border border-dashed border-border-strong text-ink-tertiary",
  completed: "bg-success text-white",
};

const LABEL_TONE: Record<ApprovalStateValue, string> = {
  pending: "text-ink-tertiary",
  "in-review": "text-ink-primary",
  approved: "text-ink-primary",
  rejected: "text-ink-primary",
  "changes-requested": "text-ink-primary",
  cancelled: "text-ink-tertiary line-through",
  expired: "text-ink-tertiary line-through",
  completed: "text-ink-primary",
};

/**
 * One step within an ApprovalStage — a status marker keyed to this
 * package's own 8-state ApprovalStateValue, in Workflow Framework's own
 * WorkflowStep visual idiom (independent per-item status, not a shared
 * cursor model). WorkflowTransition, not a new component, renders the
 * connector between steps — this package's own CREATE list has no separate
 * connector, since Workflow Framework's existing one already covers a
 * plain pending/active/complete line without needing Approval-specific
 * states of its own.
 */
export function ApprovalStep({ label, description, status, onClick, className }: ApprovalStepProps) {
  const Icon = MARKER_ICON[status];
  const content = (
    <>
      <span className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-caption font-medium", MARKER_TONE[status])}>
        {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-body-sm font-medium", LABEL_TONE[status])}>{label}</span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn("focus-ring flex items-start gap-3 rounded-md py-1.5 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover", className)}
      >
        {content}
      </button>
    );
  }

  return <div className={cn("flex items-start gap-3 rounded-md py-1.5", className)}>{content}</div>;
}
