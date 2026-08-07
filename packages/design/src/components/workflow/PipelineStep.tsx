import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Caption } from "@/components/ui";
import type { WorkflowStateValue } from "./WorkflowStatus";
import { MARKER_ICON, MARKER_TONE, LABEL_TONE, STATUS_LABEL } from "./WorkflowStep";

interface PipelineStepProps {
  label: ReactNode;
  description?: ReactNode;
  status: WorkflowStateValue;
  onClick?: () => void;
  className?: string;
}

/**
 * One step within a PipelineStage — a status marker keyed to Workflow
 * Framework's own WorkflowStateValue, in WorkflowStep's own visual idiom
 * (independent per-item status, not a shared cursor model). PipelineConnector,
 * not this component, renders the line between steps.
 *
 * DS-5B: imports its marker/label/icon maps directly from WorkflowStep
 * rather than keeping its own copy — the two were byte-identical (same
 * WorkflowStateValue, same four Records), found during the tone-mapping
 * consolidation audit.
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
        <span className={cn("text-body-sm font-medium", LABEL_TONE[status])}>
          {label}
          {STATUS_LABEL[status] ? <span className="sr-only"> ({STATUS_LABEL[status]})</span> : null}
        </span>
        {description ? <Caption className="text-ink-tertiary">{description}</Caption> : null}
      </div>
    </>
  );

  // "step" is the ARIA-defined value for the current step in a multi-step process.
  const ariaCurrent = status === "running" ? "step" : undefined;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={ariaCurrent}
        className={cn("focus-ring flex items-start gap-3 rounded-md py-1.5 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-surface-hover", className)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex items-start gap-3 rounded-md py-1.5", className)} aria-current={ariaCurrent}>
      {content}
    </div>
  );
}
