"use client";

import { useId, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/overlay";
import { Button, Body } from "@/components/ui";

interface BulkActionConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** e.g. "Delete 12 assets?" */
  title: ReactNode;
  /** e.g. "This can't be undone. Assets will be removed from every platform they're published to." */
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
}

/** The "are you sure" gate before a destructive bulk action — Foundation Overlay's own Dialog (sm size, the confirmation preset its own docs already name) rather than a bespoke modal. */
export function BulkActionConfirmation({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false,
}: BulkActionConfirmationProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" labelledBy={titleId} describedBy={descriptionId}>
      <div className="flex gap-3">
        {destructive ? <AlertTriangle className="mt-0.5 size-5 shrink-0 text-error" aria-hidden /> : null}
        <div className="flex flex-col gap-2">
          <h2 id={titleId} className="text-body-lg font-medium text-ink-primary">
            {title}
          </h2>
          <div id={descriptionId}>
            <Body size="sm" muted>
              {description}
            </Body>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button
          size="sm"
          variant="primary"
          className={destructive ? "bg-error hover:bg-error/90 active:bg-error" : undefined}
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
