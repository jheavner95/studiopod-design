import { useEffect, useRef } from "react";
import { ProductionInspector } from "@/components/platform/production";
import { WorkflowFooter, type StateInspectorProperty } from "@/components/workflow";
import { InlineMessage } from "@/components/feedback";
import { PRODUCTION_STAGES, VALIDATION_FLOW_LABEL, VALIDATION_FLOW_TO_STATE_VALUE, type ProductionArtwork } from "../_data/mock-production";
import type { ProductionDialogType } from "../_hooks/useProductionWorkspace";
import { ProductionFeatureActions } from "./ProductionFeatureActions";

interface ProductionFeatureInspectorProps {
  artwork: ProductionArtwork | null;
  onOpenDialog: (type: ProductionDialogType, artworkId: string) => void;
}

/**
 * Feature-level object detail — composes Platform's own ProductionInspector
 * (a re-export of Workflow's StateInspector) for the selected artwork's
 * properties, with this feature's own Actions composed into its footer
 * slot. The Business Feature owns which properties are shown and how
 * `validationStatus` maps into Workflow's own StateValue vocabulary.
 */
export function ProductionFeatureInspector({ artwork, onOpenDialog }: ProductionFeatureInspectorProps) {
  // Deleting the selected artwork (confirmDialog's "delete" case in
  // useProductionWorkspace) nulls selectedId in the same commit that removes
  // the artwork, which unmounts this component's own Delete/Publish/etc.
  // trigger buttons before Dialog's shared useFocusTrap cleanup runs its
  // `previouslyFocused?.focus()` restoration (src/hooks/useFocusTrap.ts) —
  // focus()'ing an already-detached node is a no-op, so focus silently
  // drops to <body>. Moving focus to this empty-state message ourselves,
  // only on the had-a-selection -> lost-it transition (not on first mount,
  // where nothing was ever focused), keeps a keyboard/screen-reader user's
  // place after a delete instead of losing it.
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const hadArtworkRef = useRef(false);

  useEffect(() => {
    if (artwork) {
      hadArtworkRef.current = true;
      return;
    }
    if (hadArtworkRef.current) {
      hadArtworkRef.current = false;
      emptyStateRef.current?.focus();
    }
  }, [artwork]);

  if (!artwork) {
    return (
      <div ref={emptyStateRef} tabIndex={-1} className="focus-ring rounded-md">
        <InlineMessage tone="info">Select an artwork from the pipeline to inspect it.</InlineMessage>
      </div>
    );
  }

  const stage = PRODUCTION_STAGES.find((s) => s.id === artwork.stage);
  const properties: StateInspectorProperty[] = [
    { id: "sku", label: "SKU", value: artwork.sku },
    { id: "stage", label: "Pipeline stage", value: stage?.label ?? artwork.stage },
    { id: "validation", label: "Validation status", value: VALIDATION_FLOW_LABEL[artwork.validationStatus] },
    { id: "priority", label: "Priority", value: artwork.priority },
    { id: "assignee", label: "Assignee", value: artwork.assignee },
    ...(artwork.batchRun ? [{ id: "batch-run", label: "Batch run", value: artwork.batchRun }] : []),
    { id: "updated", label: "Updated", value: artwork.updatedAt },
    { id: "open-issues", label: "Open issues", value: String(artwork.issues.filter((i) => !i.resolved).length) },
  ];

  return (
    <ProductionInspector
      name={artwork.name}
      type="Artwork"
      status={VALIDATION_FLOW_TO_STATE_VALUE[artwork.validationStatus]}
      properties={properties}
      footer={
        <WorkflowFooter>
          <ProductionFeatureActions artworkId={artwork.id} onOpenDialog={onOpenDialog} />
        </WorkflowFooter>
      }
    />
  );
}
