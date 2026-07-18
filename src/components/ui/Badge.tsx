import type { ReactNode } from "react";
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

interface BadgeProps extends VariantProps<typeof badgeStyles> {
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
export function Badge({ children, tone, size, dot = false, className }: BadgeProps) {
  return (
    <span className={cn(badgeStyles({ tone, size }), className)}>
      {dot ? <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", STATUS_TONE_DOT_CLASSES[tone ?? "neutral"])} /> : null}
      {children}
    </span>
  );
}
