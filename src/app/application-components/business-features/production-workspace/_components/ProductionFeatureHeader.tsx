import { Undo2, Redo2 } from "lucide-react";
import { ProductionHeader } from "@/components/platform/production";
import { Badge, Button } from "@/components/ui";
import type { ProductionView } from "../_hooks/useProductionWorkspace";
import { ProductionFeatureNavigation } from "./ProductionFeatureNavigation";

interface ProductionFeatureHeaderProps {
  today: { inFlight: number; needsAttention: number; publishedCount: number };
  view: ProductionView;
  onViewChange: (view: ProductionView) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

/**
 * Feature identity + feature-global commands (undo/redo) + feature
 * navigation — composes Platform's own ProductionHeader (a re-export of
 * Workflow's WorkflowHeader) for identity, Foundation's own Button/Badge for
 * the global commands, and this feature's own Navigation component for view
 * switching, all as WorkflowHeader's own children slot. The badge row
 * doubles as a "what's happening right now" summary — in flight, needing
 * attention, and live — so arriving here reads as walking onto an active
 * floor, not opening an empty grid.
 */
export function ProductionFeatureHeader({ today, view, onViewChange, canUndo, canRedo, onUndo, onRedo }: ProductionFeatureHeaderProps) {
  return (
    <ProductionHeader
      name="Production Workspace"
      type="Today's production floor"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone="accent" size="sm">
              {today.inFlight} in flight
            </Badge>
            {today.needsAttention > 0 ? (
              <Badge tone="warning" size="sm">
                {today.needsAttention} needs attention
              </Badge>
            ) : null}
            <Badge tone="success" size="sm">
              {today.publishedCount} live today
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onUndo} disabled={!canUndo} leadingIcon={<Undo2 className="size-4" aria-hidden />}>
              Undo
            </Button>
            <Button variant="ghost" size="sm" onClick={onRedo} disabled={!canRedo} leadingIcon={<Redo2 className="size-4" aria-hidden />}>
              Redo
            </Button>
          </div>
        </div>
        <ProductionFeatureNavigation view={view} onViewChange={onViewChange} />
      </div>
    </ProductionHeader>
  );
}
