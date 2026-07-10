import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/layout";
import { Body } from "@/components/ui";

export type FeedbackTone = "info" | "success" | "warning" | "error";

/** Shared across this family — Banner, InlineMessage, Notification, Toast, and EmptyState's tone preset all import from here rather than redefining their own tone/icon map. */
export const FEEDBACK_TONE_ICON: Record<FeedbackTone, typeof Info> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

export const FEEDBACK_TONE_TEXT: Record<FeedbackTone, string> = {
  info: "text-accent-400",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export const FEEDBACK_TONE_BG: Record<FeedbackTone, string> = {
  info: "bg-accent-soft/40",
  success: "bg-success-soft",
  warning: "bg-warning-soft",
  error: "bg-error-soft",
};

/** error is blocking enough to warrant an assertive role="alert" announcement; the rest are role="status" (polite). */
export function feedbackRole(tone: FeedbackTone): "alert" | "status" {
  return tone === "error" ? "alert" : "status";
}

interface AlertProps {
  tone?: FeedbackTone;
  title?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/**
 * A boxed, section-level message — the Foundation Component Catalog's "alert" entry
 * (derived from the DS-0.2 Warning Banner inventory item). Stays inline in the layout
 * until dismissed; never traps focus or blocks the page the way Dialog/Drawer do.
 */
export function Alert({ tone = "info", title, children, action, onDismiss, className }: AlertProps) {
  const Icon = FEEDBACK_TONE_ICON[tone];
  return (
    <div role={feedbackRole(tone)} className={className}>
      <Surface border elevation="none" padding="md" className={FEEDBACK_TONE_BG[tone]}>
        <div className="flex items-start gap-3">
          <Icon className={cn("mt-0.5 size-4 shrink-0", FEEDBACK_TONE_TEXT[tone])} aria-hidden />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : null}
            <Body size="sm" className="text-ink-secondary">
              {children}
            </Body>
            {action ? <div className="pt-1">{action}</div> : null}
          </div>
          {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className="focus-ring shrink-0 rounded-md p-1 text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </Surface>
    </div>
  );
}
