import { Dialog } from "@/components/overlay";
import { Button, Body } from "@/components/ui";
import { Alert } from "@/components/feedback";
import { SwitchField } from "@/components/form";
import { useState } from "react";
import {
  PRODUCTION_STAGES,
  VALIDATION_FLOW_LABEL,
  VALIDATION_FLOW_ORDER,
  type ProductionArtwork,
} from "../_data/mock-production";
import type { ProductionDialogState } from "../_hooks/useProductionWorkspace";

interface ProductionFeatureDialogsProps {
  dialog: ProductionDialogState | null;
  artwork: ProductionArtwork | null;
  onClose: () => void;
  onConfirm: () => void;
}

function nextStageLabel(artwork: ProductionArtwork): string {
  const index = PRODUCTION_STAGES.findIndex((s) => s.id === artwork.stage);
  const next = PRODUCTION_STAGES[Math.min(index + 1, PRODUCTION_STAGES.length - 1)];
  return next.label;
}

function nextValidationLabel(artwork: ProductionArtwork): string {
  const index = VALIDATION_FLOW_ORDER.indexOf(artwork.validationStatus);
  const next = VALIDATION_FLOW_ORDER[Math.min(index + 1, VALIDATION_FLOW_ORDER.length - 1)];
  return VALIDATION_FLOW_LABEL[next];
}

/**
 * All five dialogs this package's own work order names — Validation,
 * Delete, Publish, Export, Confirmation — composed from a single
 * Foundation Dialog instance switching on the feature's own dialog state.
 * The Business Feature owns which dialog is open and what confirming it
 * does; Dialog itself is presentation-only.
 */
export function ProductionFeatureDialogs({ dialog, artwork, onClose, onConfirm }: ProductionFeatureDialogsProps) {
  const [includePrintReadyPdf, setIncludePrintReadyPdf] = useState(true);

  if (!dialog || !artwork) return null;

  const openIssues = artwork.issues.filter((issue) => !issue.resolved);

  if (dialog.type === "validation") {
    return (
      <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)} size="md" labelledBy="validation-dialog-title" describedBy="validation-dialog-desc">
        <span id="validation-dialog-title" className="text-body-md font-medium text-ink-primary">
          Advance validation — {artwork.name}
        </span>
        <div id="validation-dialog-desc">
          <Body size="sm" muted>
            Move this artwork from {VALIDATION_FLOW_LABEL[artwork.validationStatus]} to {nextValidationLabel(artwork)}.
          </Body>
        </div>
        {openIssues.length > 0 ? (
          <Alert tone="warning" title={`${openIssues.length} open issue${openIssues.length === 1 ? "" : "s"}`}>
            Advancing validation does not resolve open issues automatically — resolve them in the Validation panel first if this gate should block.
          </Alert>
        ) : null}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            Advance to {nextValidationLabel(artwork)}
          </Button>
        </div>
      </Dialog>
    );
  }

  if (dialog.type === "delete") {
    return (
      <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)} size="sm" labelledBy="delete-dialog-title" describedBy="delete-dialog-desc">
        <span id="delete-dialog-title" className="text-body-md font-medium text-ink-primary">
          Delete {artwork.name}?
        </span>
        <div id="delete-dialog-desc">
          <Body size="sm" muted>
            This removes the artwork from the pilot&rsquo;s own mock repository. This can&rsquo;t be undone from this dialog, though the feature&rsquo;s own Undo command still reverses it.
          </Body>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </Dialog>
    );
  }

  if (dialog.type === "publish") {
    const notValidated = artwork.validationStatus !== "validated" && artwork.validationStatus !== "complete";
    return (
      <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)} size="md" labelledBy="publish-dialog-title" describedBy="publish-dialog-desc">
        <span id="publish-dialog-title" className="text-body-md font-medium text-ink-primary">
          Publish {artwork.name}?
        </span>
        <div id="publish-dialog-desc">
          {notValidated ? (
            <Alert tone="warning" title="Not yet validated">
              This artwork is still {VALIDATION_FLOW_LABEL[artwork.validationStatus]}. Publishing marks it Complete regardless — this pilot doesn&rsquo;t enforce the gate, it only shows the warning.
            </Alert>
          ) : (
            <Body size="sm" muted>
              Marks the artwork Complete and flags it as published in the mock repository.
            </Body>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            Publish
          </Button>
        </div>
      </Dialog>
    );
  }

  if (dialog.type === "export") {
    return (
      <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)} size="md" labelledBy="export-dialog-title">
        <span id="export-dialog-title" className="text-body-md font-medium text-ink-primary">
          Export {artwork.name}
        </span>
        <SwitchField
          label="Include print-ready PDF"
          checked={includePrintReadyPdf}
          onChange={setIncludePrintReadyPdf}
          helperText="Local UI state only — no file is actually generated in this pilot."
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            Export
          </Button>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={(open) => (!open ? onClose() : undefined)} size="sm" labelledBy="confirm-dialog-title" describedBy="confirm-dialog-desc">
      <span id="confirm-dialog-title" className="text-body-md font-medium text-ink-primary">
        Advance stage?
      </span>
      <div id="confirm-dialog-desc">
        <Body size="sm" muted>
          Move {artwork.name} from {PRODUCTION_STAGES.find((s) => s.id === artwork.stage)?.label} to {nextStageLabel(artwork)}.
        </Body>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={onConfirm}>
          Advance
        </Button>
      </div>
    </Dialog>
  );
}
