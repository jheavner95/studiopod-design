"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDialogContext } from "./dialog-context";

/**
 * DS-5K — the canonical Dialog composition family. Every part is a descendant of
 * `Dialog`/`Drawer` (it reads `DialogContext`); accessibility and close logic live
 * once, on the surface, not duplicated per part. Consumers compose, they don't
 * configure:
 *
 *   <Dialog open={open} onOpenChange={setOpen}>
 *     <DialogHeader>
 *       <DialogTitle>Rename</DialogTitle>
 *       <DialogDescription>Changes the slug.</DialogDescription>
 *       <DialogClose />
 *     </DialogHeader>
 *     <DialogBody>…</DialogBody>
 *     <DialogFooter>…buttons…</DialogFooter>
 *   </Dialog>
 *
 * `DialogTitle`/`DialogDescription` register themselves so the surface sets
 * `aria-labelledby`/`aria-describedby` automatically — no id plumbing.
 */

interface PartProps {
  children?: ReactNode;
  className?: string;
}

/** Layout container for the title/description (and, if used, a DialogClose). */
export function DialogHeader({ children, className }: PartProps) {
  return <header className={cn("flex flex-col gap-1 pr-6", className)}>{children}</header>;
}

/** The dialog's accessible name. Auto-registers as `aria-labelledby` on the surface. */
export function DialogTitle({ children, className }: PartProps) {
  const { titleId, registerTitle } = useDialogContext("DialogTitle");
  useEffect(() => {
    registerTitle(true);
    return () => registerTitle(false);
  }, [registerTitle]);
  return (
    <h2 id={titleId} className={cn("text-lg font-semibold text-ink-primary", className)}>
      {children}
    </h2>
  );
}

/** Supporting text. Auto-registers as `aria-describedby` on the surface. */
export function DialogDescription({ children, className }: PartProps) {
  const { descriptionId, registerDescription } = useDialogContext("DialogDescription");
  useEffect(() => {
    registerDescription(true);
    return () => registerDescription(false);
  }, [registerDescription]);
  return (
    <p id={descriptionId} className={cn("text-body-sm text-ink-secondary", className)}>
      {children}
    </p>
  );
}

/** The scrollable content region — owns the scroll boundary so header/footer stay fixed. */
export function DialogBody({ children, className }: PartProps) {
  return <div className={cn("-mx-6 min-h-0 flex-1 overflow-y-auto px-6", className)}>{children}</div>;
}

/** Canonical action row — right-aligned button cluster. */
export function DialogFooter({ children, className }: PartProps) {
  return <footer className={cn("flex items-center justify-end gap-2", className)}>{children}</footer>;
}

interface DialogCloseProps {
  className?: string;
  /** Accessible name for the control. Defaults to "Close". */
  "aria-label"?: string;
}

/** Canonical close button — invokes the surface's close via context. */
export function DialogClose({ className, "aria-label": ariaLabel = "Close" }: DialogCloseProps) {
  const { close } = useDialogContext("DialogClose");
  return (
    <button
      type="button"
      onClick={close}
      aria-label={ariaLabel}
      className={cn(
        "focus-ring absolute right-4 top-4 flex size-8 items-center justify-center rounded-md text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-neutral-soft hover:text-ink-primary",
        className,
      )}
    >
      <X className="size-4" aria-hidden />
    </button>
  );
}
