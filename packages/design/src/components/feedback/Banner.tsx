import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";
import { FEEDBACK_TONE_ICON, FEEDBACK_TONE_TEXT, FEEDBACK_TONE_BG, feedbackRole, type FeedbackTone } from "./Alert";

interface BannerProps {
  tone?: FeedbackTone;
  children: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/**
 * A full-bleed, edge-to-edge strip for page- or workspace-level announcements —
 * distinct from Alert's boxed, inline placement. Persistent until dismissed.
 * src/components/form/UnsavedChangesBanner.tsx is a real, already-shipped instance
 * of this exact pattern built directly on Surface+Inline rather than this primitive
 * (see Promotion Candidates) — not migrated here, since this package doesn't touch
 * existing pages or components outside src/components/feedback/.
 */
export function Banner({ tone = "info", children, action, onDismiss, className }: BannerProps) {
  const Icon = FEEDBACK_TONE_ICON[tone];
  return (
    <div role={feedbackRole(tone)} className={cn("w-full border-b border-border-subtle", FEEDBACK_TONE_BG[tone], className)}>
      <div className="mx-auto flex max-w-[var(--container-wide)] items-center gap-3 px-[var(--spacing-gutter)] py-3">
        <Icon className={cn("size-4 shrink-0", FEEDBACK_TONE_TEXT[tone])} aria-hidden />
        <Body size="sm" className="min-w-0 flex-1 text-ink-secondary">
          {children}
        </Body>
        {action}
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
    </div>
  );
}
