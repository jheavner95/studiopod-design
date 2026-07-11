import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/layout";
import { Body, Caption } from "@/components/ui";
import { FEEDBACK_TONE_ICON, FEEDBACK_TONE_TEXT, feedbackRole, type FeedbackTone } from "./Alert";

export interface NotificationProps {
  tone?: FeedbackTone;
  title?: ReactNode;
  message: ReactNode;
  timestamp?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/**
 * The presentational row Toast stacks inside its portal — also reusable standalone
 * for a future Notification Center list (see Future Extensions), since the row
 * itself (icon/title/message/timestamp/dismiss) doesn't depend on Toast's
 * auto-dismiss timing at all.
 */
export function Notification({ tone = "info", title, message, timestamp, action, onDismiss, className }: NotificationProps) {
  const Icon = FEEDBACK_TONE_ICON[tone];
  return (
    <Surface border elevation="floating" padding="sm" role={feedbackRole(tone)} className={cn("flex items-start gap-3", className)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", FEEDBACK_TONE_TEXT[tone])} aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : null}
        <Body size="sm" className="text-ink-secondary">
          {message}
        </Body>
        {timestamp ? <Caption className="text-ink-tertiary">{timestamp}</Caption> : null}
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
    </Surface>
  );
}
