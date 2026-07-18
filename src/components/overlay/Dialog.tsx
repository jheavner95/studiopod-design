"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion, useMotionEnabled, useFocusTrap, useEscapeKey, useBodyLock } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "./Portal";
import { DialogContext } from "./dialog-context";

export type DialogSize = "sm" | "md" | "full";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  /** sm for a Confirmation dialog, md (default) for a Form, full for Full content. */
  size?: DialogSize;
  /** Override the auto-wired accessible name (DS-5K: prefer <DialogTitle>, which registers itself). */
  labelledBy?: string;
  /** Override the auto-wired description (DS-5K: prefer <DialogDescription>, which registers itself). */
  describedBy?: string;
  /** Backdrop click AND Escape close the dialog — on by default. Set false for a blocking dialog. */
  dismissible?: boolean;
  /** "dialog" (default) or "alertdialog" for interrupting confirmations (see ConfirmDialog). */
  role?: "dialog" | "alertdialog";
  className?: string;
}

const sizeMap: Record<DialogSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  full: "h-[calc(100%-2rem)] max-h-[840px] w-[calc(100%-2rem)] max-w-4xl",
};

/**
 * A focused, modal surface that blocks the rest of the page until dismissed — focus
 * trapped inside while open, Escape closes (when dismissible), focus returns to whatever
 * triggered it on close. Compose structure with the Dialog* parts (DialogHeader/Title/
 * Description/Body/Footer/Close); a bare `<Dialog>{children}</Dialog>` still works.
 *
 * DS-5K: provides DialogContext so DialogTitle/DialogDescription auto-wire
 * aria-labelledby/aria-describedby (the `labelledBy`/`describedBy` props remain as
 * explicit overrides), and DialogClose can close without a prop.
 */
export function Dialog({
  open,
  onOpenChange,
  children,
  size = "md",
  labelledBy,
  describedBy,
  dismissible = true,
  role = "dialog",
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  const generatedTitleId = useId();
  const generatedDescriptionId = useId();
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  function close() {
    onOpenChange(false);
  }

  // Escape closes only when dismissible — a non-dismissible dialog (e.g. blocking
  // progress, or a confirm mid-submit) is inescapable by keyboard as well as backdrop.
  useEscapeKey(close, open && dismissible);
  // useBodyLock must run before useFocusTrap so its cleanup (removing #app-root's
  // inert attribute) fires before focus-trap's cleanup tries to restore focus.
  useBodyLock(open);
  useFocusTrap(panelRef, open);

  const ariaLabelledBy = labelledBy ?? (hasTitle ? generatedTitleId : undefined);
  const ariaDescribedBy = describedBy ?? (hasDescription ? generatedDescriptionId : undefined);

  return (
    <Portal>
      <DialogContext.Provider
        value={{
          titleId: generatedTitleId,
          descriptionId: generatedDescriptionId,
          registerTitle: setHasTitle,
          registerDescription: setHasDescription,
          close,
          dismissible,
        }}
      >
        <AnimatePresence>
          {open ? (
            <div className="fixed inset-0" style={{ zIndex: "var(--z-modal)" }}>
              <motion.div
                className="absolute inset-0 bg-black/60"
                initial={motionEnabled ? { opacity: 0 } : undefined}
                animate={motionEnabled ? { opacity: 1 } : undefined}
                exit={motionEnabled ? { opacity: 0 } : undefined}
                transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
                onClick={dismissible ? close : undefined}
                aria-hidden
              />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <motion.div
                  ref={panelRef}
                  role={role}
                  aria-modal="true"
                  aria-labelledby={ariaLabelledBy}
                  aria-describedby={ariaDescribedBy}
                  tabIndex={-1}
                  initial={motionEnabled ? { opacity: 0, scale: 0.95, y: 8 } : undefined}
                  animate={motionEnabled ? { opacity: 1, scale: 1, y: 0 } : undefined}
                  exit={motionEnabled ? { opacity: 0, scale: 0.95, y: 8 } : undefined}
                  transition={motionEnabled ? transition({ duration: "normal", ease: "enter", speed }) : undefined}
                  className={cn(
                    "relative flex max-h-[calc(100%-2rem)] w-full flex-col gap-4 overflow-y-auto rounded-lg border border-border-subtle bg-surface p-6 shadow-[var(--shadow-modal)]",
                    sizeMap[size],
                    className,
                  )}
                >
                  {children}
                </motion.div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
      </DialogContext.Provider>
    </Portal>
  );
}
