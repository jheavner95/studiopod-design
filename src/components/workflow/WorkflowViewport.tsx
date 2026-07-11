import type { ReactNode } from "react";
import { ScrollArea, type ScrollDirection } from "@/components/layout";
import { cn } from "@/lib/utils";

interface WorkflowViewportProps {
  /** WorkflowNode/WorkflowEdge/WorkflowGroup content. */
  children: ReactNode;
  /** Defaults to "both" — a flow diagram, unlike Inspector Panel's own vertical-only body, typically needs horizontal scroll too. */
  direction?: ScrollDirection;
  maxHeight?: string;
  className?: string;
}

/**
 * The scrollable sub-region inside a WorkflowCanvas that actually holds
 * node/edge content — composes Foundation Layout's own ScrollArea directly,
 * the same primitive Operational Inspector Panel already uses for its own
 * (vertical-only) body. This is a second, nested ScrollArea rather than a
 * reuse of InspectorPanel's own: that one scrolls the whole panel's
 * content (properties, sections, history); this one scrolls only the
 * canvas's own node/edge region, independent of any WorkflowToolbar above
 * it or WorkflowInspector beside it.
 */
export function WorkflowViewport({ children, direction = "both", maxHeight, className }: WorkflowViewportProps) {
  return (
    <ScrollArea direction={direction} maxHeight={maxHeight} className={cn("relative", className)}>
      {children}
    </ScrollArea>
  );
}
