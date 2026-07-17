import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { STATUS_TONE_PILL_CLASSES, type StatusTone } from "@/lib/tone";

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
  className?: string;
}

/** Inline status/label pill — counts, "Beta", plan tiers, pipeline states. */
export function Badge({ children, tone, size, className }: BadgeProps) {
  return <span className={cn(badgeStyles({ tone, size }), className)}>{children}</span>;
}
