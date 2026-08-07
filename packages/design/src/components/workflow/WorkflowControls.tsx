import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Inline } from "@/components/layout";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface WorkflowControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFitToView?: () => void;
  className?: string;
}

/**
 * Zoom-in / zoom-out / fit-to-view buttons for a workflow canvas — built
 * fresh on Foundation UI's own Button + Inline, the same "built fresh
 * rather than reusing an ill-fitting existing control" precedent Workflow
 * Stepper's own WorkflowStepperNavigation already established (there, the
 * mismatch was ARIA semantics; here, it's that no existing control
 * expresses camera/view-state actions at all).
 *
 * These render as real buttons but are inert placeholders when no handler
 * is supplied (the default): this package's own Future Extensions
 * explicitly defers real Pan & zoom, since WorkflowCanvas/WorkflowViewport
 * intentionally hold no coordinate system yet to zoom or pan within. A
 * caller wiring real pan/zoom state in the future passes onZoomIn/
 * onZoomOut/onFitToView; until then this component documents the intended
 * affordance without faking behavior that doesn't exist.
 */
export function WorkflowControls({ onZoomIn, onZoomOut, onFitToView, className }: WorkflowControlsProps) {
  return (
    <Inline gap="xs" className={cn(className)}>
      <Button variant="ghost" size="sm" onClick={onZoomOut} disabled={!onZoomOut} leadingIcon={<ZoomOut className="size-3.5" />}>
        Zoom out
      </Button>
      <Button variant="ghost" size="sm" onClick={onZoomIn} disabled={!onZoomIn} leadingIcon={<ZoomIn className="size-3.5" />}>
        Zoom in
      </Button>
      <Button variant="ghost" size="sm" onClick={onFitToView} disabled={!onFitToView} leadingIcon={<Maximize className="size-3.5" />}>
        Fit to view
      </Button>
    </Inline>
  );
}
