import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FEEDBACK_TONE_ICON, FEEDBACK_TONE_TEXT, feedbackRole, type FeedbackTone } from "./Alert";

interface InlineMessageProps {
  tone?: FeedbackTone;
  children: ReactNode;
  className?: string;
}

/**
 * A compact, borderless icon+text line for lightweight contextual feedback that
 * isn't attached to one form field — "Saved 2 minutes ago", "This can't be undone".
 * Field-level validation stays on src/components/form/FieldError.tsx and
 * FieldHelp.tsx; this is for feedback anywhere else in the UI.
 */
export function InlineMessage({ tone = "info", children, className }: InlineMessageProps) {
  const Icon = FEEDBACK_TONE_ICON[tone];
  return (
    <span role={feedbackRole(tone)} className={cn("flex items-center gap-1.5 text-caption", FEEDBACK_TONE_TEXT[tone], className)}>
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {children}
    </span>
  );
}
