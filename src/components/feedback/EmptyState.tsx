import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading, Body } from "@/components/ui";
import { FEEDBACK_TONE_TEXT, FEEDBACK_TONE_BG, feedbackRole, type FeedbackTone } from "./Alert";

export type EmptyStateTone = FeedbackTone | "neutral";

const NEUTRAL_TEXT = "text-ink-tertiary";
const NEUTRAL_BG = "bg-surface-hover";

export interface EmptyStateProps {
  /** neutral (default) for "no data"/"no results" — the four semantic tones are for an outcome, not an absence. SuccessState/WarningState/ErrorState/InfoState are thin presets over this same layout. */
  tone?: EmptyStateTone;
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/**
 * A dedicated placeholder for a region with nothing to show — no data, no results,
 * or a failed load. The Foundation Component Catalog's "empty-state" entry
 * (derived from the DS-0.2 Error State inventory item).
 */
export function EmptyState({ tone = "neutral", icon, title, description, action, className }: EmptyStateProps) {
  const textClass = tone === "neutral" ? NEUTRAL_TEXT : FEEDBACK_TONE_TEXT[tone];
  const bgClass = tone === "neutral" ? NEUTRAL_BG : FEEDBACK_TONE_BG[tone];
  const role = tone === "neutral" ? "status" : feedbackRole(tone);

  return (
    <div role={role} className={cn("flex flex-col items-center gap-3 py-10 text-center", className)}>
      <span className={cn("flex size-11 items-center justify-center rounded-full", bgClass, textClass)}>
        {icon ?? <Inbox className="size-5" aria-hidden />}
      </span>
      <div className="flex flex-col gap-1">
        <Heading level={4}>{title}</Heading>
        {description ? (
          <Body size="sm" muted className="max-w-[var(--container-narrow)]">
            {description}
          </Body>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
