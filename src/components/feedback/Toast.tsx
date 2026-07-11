"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion, useMotionEnabled } from "@/hooks";
import { transition } from "@/motion/utils";
import { Portal } from "@/components/overlay";
import { Notification, type NotificationProps } from "./Notification";
import type { FeedbackTone } from "./Alert";

export interface ToastOptions {
  tone?: FeedbackTone;
  title?: ReactNode;
  message: ReactNode;
  /** ms before auto-dismiss; 0 disables auto-dismiss entirely. */
  duration?: number;
  action?: NotificationProps["action"];
}

interface ToastEntry {
  id: number;
  tone: FeedbackTone;
  title?: ReactNode;
  message: ReactNode;
  duration: number;
  action?: NotificationProps["action"];
}

interface ToastContextValue {
  show: (toast: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

let nextToastId = 0;

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * The transient feedback mechanism — call useToast().show(...) from anywhere inside
 * ToastProvider to push a self-dismissing Notification into a fixed, stacked viewport.
 * Renders through the Overlay System's Portal at --z-toast (above modals/overlays,
 * below Tooltip), newest toast on top.
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((toast: ToastOptions) => {
    const id = nextToastId++;
    setToasts((prev) => [
      { id, tone: toast.tone ?? "info", title: toast.title, message: toast.message, duration: toast.duration ?? 5000, action: toast.action },
      ...prev,
    ]);
  }, []);

  // The newest toast (prepended in `show`) decides the region's urgency — an error
  // toast arriving while a polite one is still visible should still interrupt.
  const politeness = toasts[0]?.tone === "error" ? "assertive" : "polite";

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Portal>
        <div
          aria-live={politeness}
          aria-atomic="false"
          role="region"
          aria-label="Notifications"
          className="fixed bottom-4 right-4 flex w-full max-w-sm flex-col gap-2"
          style={{ zIndex: "var(--z-toast)" }}
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} dismiss={dismiss} motionEnabled={motionEnabled} speed={speed} />
            ))}
          </AnimatePresence>
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: ToastEntry;
  dismiss: (id: number) => void;
  motionEnabled: boolean;
  speed: number;
}

function ToastItem({ toast, dismiss, motionEnabled, speed }: ToastItemProps) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (toast.duration <= 0 || paused) return;
    const timer = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, toast.id, dismiss, paused]);

  return (
    <motion.div
      initial={motionEnabled ? { opacity: 0, y: 16, scale: 0.95 } : undefined}
      animate={motionEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
      exit={motionEnabled ? { opacity: 0, scale: 0.95 } : undefined}
      transition={motionEnabled ? transition({ duration: "fast", ease: "standard", speed }) : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Notification tone={toast.tone} title={toast.title} message={toast.message} action={toast.action} onDismiss={() => dismiss(toast.id)} />
    </motion.div>
  );
}
