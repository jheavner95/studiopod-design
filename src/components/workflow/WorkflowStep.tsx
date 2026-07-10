import type { ReactNode } from "react";
import { Check, X, AlertTriangle, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { WorkflowStateValue } from "./WorkflowStatus";

interface WorkflowStepProps {
  label: ReactNode;
  description?: ReactNode;
  status: WorkflowStateValue;
  onClick?: () => void;
  className?: string;
}

const MARKER_ICON: Partial<Record<WorkflowStateValue, typeof Check>> = {
  completed: Check,
  failed: X,
  blocked: AlertTriangle,
  cancelled: Ban,
};

const MARKER_TONE: Record<WorkflowStateValue, string> = {
  "not-started": "border border-border-strong text-ink-tertiary",
  ready: "border border-border-strong text-ink-tertiary",
  running: "bg-accent-500 text-white",
  waiting: "border border-border-strong text-ink-tertiary",
  blocked: "bg-warning text-white",
  completed: "bg-success text-white",
  failed: "bg-error text-white",
  cancelled: "border border-border-subtle text-ink-tertiary",
};

const LABEL_TONE: Record<WorkflowStateValue, string> = {
  "not-started": "text-ink-tertiary",
  ready: "text-ink-tertiary",
  running: "text-ink-primary",
  waiting: "text-ink-tertiary",
  blocked: "text-ink-primary",
  completed: "text-ink-primary",
  failed: "text-ink-primary",
  cancelled: "text-ink-tertiary line-through",
};

/**
 * One step within a WorkflowStage — a status marker keyed to this
 * framework's own 8-state WorkflowStateValue, the same circle-marker idiom
 * Foundation Navigation's own Stepper already establishes, but with an
 * independent status per item rather than Stepper's single shared
 * current-index/error-index model (which can't represent, e.g., one step
 * Waiting while a sibling is Blocked at the same time). WorkflowTransition,
 * not this component, renders the connector between steps, so a caller can
 * vary the transition treatment without WorkflowStep needing to know about
 * it.
 */
export function WorkflowStep({ label, description, status, onClick, className }: WorkflowStepProps) {
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
