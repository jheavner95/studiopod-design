import type { ReactNode } from "react";
import { Check, X, AlertTriangle, Ban, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";

export type WorkflowStepperStateValue = "not-started" | "current" | "completed" | "blocked" | "waiting" | "skipped" | "failed" | "cancelled";

interface WorkflowStepperStepProps {
  /** 1-indexed position — shown inside the marker for any status with no icon of its own. */
  index: number;
  label: ReactNode;
  description?: ReactNode;
  status: WorkflowStepperStateValue;
  onClick?: () => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const MARKER_ICON: Partial<Record<WorkflowStepperStateValue, typeof Check>> = {
  completed: Check,
  failed: X,
  blocked: AlertTriangle,
  cancelled: Ban,
  skipped: SkipForward,
};

const MARKER_TONE: Record<WorkflowStepperStateValue, string> = {
  "not-started": "border border-border-strong text-ink-tertiary",
  current: "bg-accent-500 text-white",
  completed: "bg-success text-white",
  blocked: "bg-warning text-white",
  waiting: "border border-dashed border-border-strong text-ink-tertiary",
  skipped: "bg-surface-hover text-ink-tertiary",
  failed: "bg-error text-white",
  cancelled: "border border-border-subtle text-ink-tertiary",
};

const LABEL_TONE: Record<WorkflowStepperStateValue, string> = {
  "not-started": "text-ink-tertiary",
  current: "text-ink-primary",
  completed: "text-ink-primary",
  blocked: "text-ink-primary",
  waiting: "text-ink-tertiary",
  skipped: "text-ink-tertiary line-through",
  failed: "text-ink-primary",
  cancelled: "text-ink-tertiary line-through",
};

/**
 * One step in a guided wizard — a numbered/iconized circular marker plus a
 * label, in Foundation Navigation's own Stepper visual idiom (circular
 * marker, horizontal/vertical orientation), but with this package's own
 * 8-value WorkflowStepperStateValue rather than Stepper's 4-state
 * single-cursor model (which can't represent Waiting or Skipped) or
 * Workflow Framework's own WorkflowStateValue (whose Ready/Running split
 * and lack of a Skipped value don't map losslessly onto a wizard's
 * Current/Skipped vocabulary in either direction — checked directly before
 * building this rather than assumed). WorkflowStepperConnector, not this
 * component, renders the line between steps, the same separation Workflow
 * Framework's own WorkflowStep/WorkflowTransition already establish.
 */
export function WorkflowStepperStep({ index, label, description, status, onClick, orientation = "horizontal", className }: WorkflowStepperStepProps) {
  const Icon = MARKER_ICON[status];
  const marker = (
    <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full text-body-sm font-medium", MARKER_TONE[status])}>
      {Icon ? <Icon className="size-4" aria-hidden /> : index}
    </span>
  );
  const text = (
    <div className={cn("flex flex-col gap-0.5", orientation === "horizontal" ? "items-center text-center" : "min-w-0")}>
      <span className={cn("text-body-sm font-medium", LABEL_TONE[status])}>{label}</span>
      {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
    </div>
  );

  const layoutClass = orientation === "horizontal" ? "flex flex-col items-center gap-2" : "flex items-start gap-3";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(layoutClass, "focus-ring rounded-md p-1 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover", className)}
      >
        {marker}
        {text}
      </button>
    );
  }

  return (
    <div className={cn(layoutClass, className)}>
      {marker}
      {text}
    </div>
  );
}
