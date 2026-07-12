"use client";

import { ProductionWorkspace, ProductionSidebar } from "@/components/platform/production";
import { useProductionWorkspace } from "../_hooks/useProductionWorkspace";
import { ProductionFeatureHeader } from "./ProductionFeatureHeader";
import { ProductionFeatureCanvas } from "./ProductionFeatureCanvas";
import { ProductionFeatureInspector } from "./ProductionFeatureInspector";
import { ProductionFeatureValidation } from "./ProductionFeatureValidation";
import { ProductionFeatureDialogs } from "./ProductionFeatureDialogs";

/**
 * The feature's own Workspace shell — the single component page.tsx
 * mounts. Calls useProductionWorkspace once as the feature's own Services
 * layer, then distributes state and commands to every composed child as
 * plain props. Composes Platform's own ProductionWorkspace (a re-export of
 * Workflow's Workflow) as the outer shell and ProductionSidebar for the
 * object-detail rail — nothing here is a new reusable component, only
 * feature-specific arrangement of certified ones.
 */
export function ProductionFeatureWorkspace() {
  const workspace = useProductionWorkspace();

  return (
    <>
      <ProductionWorkspace
        header={
          <ProductionFeatureHeader
            today={workspace.today}
            view={workspace.view}
            onViewChange={workspace.setView}
            canUndo={workspace.canUndo}
            canRedo={workspace.canRedo}
            onUndo={workspace.undo}
            onRedo={workspace.redo}
          />
        }
        sidebar={
          <ProductionSidebar>
            <div className="flex flex-col gap-6">
              <ProductionFeatureInspector artwork={workspace.selectedArtwork} onOpenDialog={workspace.openDialog} />
              <ProductionFeatureValidation artwork={workspace.selectedArtwork} onToggleIssue={workspace.toggleIssue} />
            </div>
          </ProductionSidebar>
        }
      >
        <ProductionFeatureCanvas
          view={workspace.view}
          artworksByStage={workspace.artworksByStage}
          queueJobs={workspace.queueJobs}
          selectedId={workspace.selectedId}
          metrics={workspace.metrics}
          onSelect={workspace.selectArtwork}
          onQueueRowClick={() => undefined}
        />
      </ProductionWorkspace>
      <ProductionFeatureDialogs
        dialog={workspace.dialog}
        artwork={workspace.artworks.find((artwork) => artwork.id === workspace.dialog?.artworkId) ?? null}
        onClose={workspace.closeDialog}
        onConfirm={workspace.confirmDialog}
      />
    </>
  );
}
