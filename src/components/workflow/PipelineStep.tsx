import type { ReactNode } from "react";
import { Check, X, AlertTriangle, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { WorkflowStateValue } from "./WorkflowStatus";

interface PipelineStepProps {
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
 * One step within a PipelineStage — a status marker keyed to Workflow
 * Framework's own WorkflowStateValue, in WorkflowStep's own visual idiom
 * (independent per-item status, not a shared cursor model). PipelineConnector,
 * not this component, renders the line between steps.
 *
 * Name collision, checked and documented rather than missed: a differently-
 * scoped PipelineStep already exists at src/components/illustration/
 * PipelineStep.tsx — a single repeatable AnimatedNode-based visual primitive
 * ("meant to be repeated with AnimatedConnector between instances") used by
 * marketing-page compositions like WorkflowComposition's own animated
 * pipeline. That component has no stage/branch/gate semantics and lives in
 * the illustration-canvas primitive layer, an entirely different import path
 * and rendering model from this one — the same import-path-distinct,
 * checked-not-missed precedent WorkflowProgress.tsx and WorkflowTimeline.tsx
 * already established for their own pre-existing namesakes.
 */
export function PipelineStep({ label, description, status, onClick, className }: PipelineStepProps) {
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
