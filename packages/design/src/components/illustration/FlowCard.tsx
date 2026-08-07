import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusIndicator, type SystemStatus } from "./StatusIndicator";

interface FlowCardProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  status?: SystemStatus;
  className?: string;
}

/** A system/flow component rendered as a card — for illustrating pipelines as a card row rather than bare nodes. */
export function FlowCard({ icon, title, description, status = "idle", className }: FlowCardProps) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border border-border bg-surface p-5", className)}>
      <div className="flex items-center justify-between">
        {icon ? (
          <div className="flex size-8 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
            {icon}
          </div>
        ) : (
          <span />
        )}
        <StatusIndicator status={status} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-body-sm font-medium text-ink-primary">{title}</span>
        {description ? <span className="text-caption text-ink-tertiary">{description}</span> : null}
      </div>
    </div>
  );
}
