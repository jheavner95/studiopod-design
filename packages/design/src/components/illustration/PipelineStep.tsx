import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedNode } from "./AnimatedNode";
import type { SystemStatus } from "./StatusIndicator";

interface PipelineStepProps {
  index?: number;
  icon?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  status?: SystemStatus;
  className?: string;
}

/** One step in a horizontal/vertical pipeline — a node plus its label, meant to be repeated with AnimatedConnector between instances. */
export function PipelineStep({ index, icon, label, description, status = "idle", className }: PipelineStepProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <AnimatedNode
        status={status}
        icon={icon ?? (index !== undefined ? <span className="text-body-sm font-medium">{index}</span> : null)}
      />
      <div className="flex flex-col gap-1">
        <span className="text-body-sm font-medium text-ink-primary">{label}</span>
        {description ? <span className="text-caption text-ink-tertiary">{description}</span> : null}
      </div>
    </div>
  );
}
