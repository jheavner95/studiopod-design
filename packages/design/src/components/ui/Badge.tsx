import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { STATUS_TONE_DOT_CLASSES, STATUS_TONE_PILL_CLASSES, type StatusTone } from "@/lib/tone";

/** Re-exported at this path for compatibility and discoverability — src/lib/tone.ts is the canonical owner (DS-5B); Badge is merely this type's most natural, most-consumed name. */
export type { StatusTone };

const badgeStyles = cva("inline-flex w-fit items-center gap-1.5 rounded-full font-medium", {
  variants: {
    tone: STATUS_TONE_PILL_CLASSES,
    size: {
      sm: "px-2 py-0.5 text-[11px] leading-4",
      md: "px-2.5 py-1 text-caption",
    },
  },
  defaultVariants: { tone: "neutral", size: "md" },
});

/**
 * Badge owns one `span` and exposes that element's contract (UX-5.7A) — it is
 * the element a caller reasonably believes they are addressing.
 *
 * It stays **non-interactive on purpose**. A Badge states a status; it is not
 * a control, so nothing here turns it into one, and a status that needs an
 * action belongs beside a `Button` rather than inside a pill. The dot remains
 * `aria-hidden`: status meaning is carried by the text, never by colour or a
 * mark alone (UII-7, ADR 0071).
 */
export interface BadgeProps
  extends VariantProps<typeof badgeStyles>,
    Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  children: ReactNode;
  /**
   * DS-5I: render a static leading indicator dot inside the pill, inheriting
   * the badge's own tone. Decorative (`aria-hidden`) — the label text always
   * carries the meaning. For a standalone or animated "live" dot use
   * `PulseStatus`; for a dot-plus-label status row use `StatusIndicator`.
   */
  dot?: boolean;
  className?: string;
}

/** Inline status/label pill — counts, "Beta", plan tiers, pipeline states. */
export function Badge({ children, tone, size, dot = false, className, ...domProps }: BadgeProps) {
  return (
    <span {...domProps} className={cn(badgeStyles({ tone, size }), className)}>
      {dot ? <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", STATUS_TONE_DOT_CLASSES[tone ?? "neutral"])} /> : null}
      {children}
    </span>
  );
}
