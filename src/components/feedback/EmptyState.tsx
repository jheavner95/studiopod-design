import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading, Body } from "@/components/ui";
import { FEEDBACK_TONE_TEXT, FEEDBACK_TONE_BG, feedbackRole, type FeedbackTone } from "./Alert";
import { CONTROL_EMPTY_STATE_CLASSES, type ControlSize } from "@/lib/control-size";

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
  /**
   * DS-5P — the shared `ControlSize` density. `md` (default) is the primary
   * page-level state and renders exactly as it did before. `sm` is the
   * operational density for inspectors, table regions, library panels and
   * console cards, landing the icon badge at 28px.
   */
  size?: ControlSize;
  className?: string;
}

/**
 * A dedicated placeholder for a region with nothing to show — no data, no results,
 * or a failed load. The Foundation Component Catalog's "empty-state" entry
 * (derived from the DS-0.2 Error State inventory item).
 */
export function EmptyState({ tone = "neutral", icon, title, description, action, size = "md", className }: EmptyStateProps) {
  const textClass = tone === "neutral" ? NEUTRAL_TEXT : FEEDBACK_TONE_TEXT[tone];
  const bgClass = tone === "neutral" ? NEUTRAL_BG : FEEDBACK_TONE_BG[tone];
  const role = tone === "neutral" ? "status" : feedbackRole(tone);
  const scale = CONTROL_EMPTY_STATE_CLASSES[size];

  return (
    <div role={role} className={cn("flex flex-col items-center text-center", scale.wrapper, className)}>
      <span className={cn("flex items-center justify-center rounded-full", scale.badge, bgClass, textClass)}>
        {icon ?? <Inbox className={scale.icon} aria-hidden />}
      </span>
      <div className={cn("flex flex-col", scale.gap)}>
        {/* Still a real heading at both densities — `sm` only shrinks the type
            (tailwind-merge resolves it against text-heading-4), so the dense
            variant never trades semantics for size. */}
        <Heading level={4} className={size === "sm" ? "text-body-sm font-medium" : undefined}>
          {title}
        </Heading>
        {description ? (
          <Body size="sm" muted className={cn("max-w-[var(--container-narrow)]", size === "sm" && "text-caption")}>
            {description}
          </Body>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
