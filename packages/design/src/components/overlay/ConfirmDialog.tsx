"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "./Dialog";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./DialogParts";

export type ConfirmTone = "default" | "destructive";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `destructive` recolours Confirm and defaults focus to Cancel. No `warning` — a confirm action is default or destructive (DS-5G). */
  tone?: ConfirmTone;
  /** Disables both actions, spins Confirm, and blocks dismissal while a request is in flight. */
  loading?: boolean;
}

/**
 * DS-5K — the canonical confirmation convenience: a small alert dialog with Cancel +
 * Confirm, built entirely on `Dialog` + the Dialog composition parts + the DS `Button`.
 * No application logic — the consumer owns the copy and what `onConfirm` does.
 *
 * a11y: `role="alertdialog"`; Escape cancels (unless loading); Cancel renders first so
 * focus lands on the safe action (correct for the destructive case). While `loading`,
 * both actions are disabled and the dialog is non-dismissible.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="sm" role="alertdialog" dismissible={!loading}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription>{description}</DialogDescription> : null}
      </DialogHeader>
      <DialogFooter>
        <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant={tone === "destructive" ? "destructive" : "primary"} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
