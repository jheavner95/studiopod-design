import { TimelineComposition, type TimelineItem, type TimelineOrientation } from "@/compositions";
import { cn } from "@/lib/utils";
import { toSystemStatus, resolveStageStatus } from "../utils";
import type { ProductionPipeline } from "../types";

export interface ValidationTimelineProps {
  pipeline: ProductionPipeline;
  orientation?: TimelineOrientation;
  showHeader?: boolean;
  className?: string;
}

/** Renders a pipeline's stages through the existing TimelineComposition, a validation run read top to bottom instead of left to right. */
export function ValidationTimeline({
  pipeline,
  orientation = "vertical",
  showHeader = true,
  className,
}: ValidationTimelineProps) {
  const items: TimelineItem[] = pipeline.stages.map((stage) => ({
    id: stage.id,
    date: stage.blocking ? "Blocking" : "",
    title: stage.title,
    description: stage.description,
    status: toSystemStatus(resolveStageStatus(stage)),
    icon: stage.icon,
  }));

  return (
    <TimelineComposition
      title={showHeader ? pipeline.title : undefined}
      description={showHeader ? pipeline.description : undefined}
      items={items}
      orientation={orientation}
      className={cn("py-0", className)}
    />
  );
}
