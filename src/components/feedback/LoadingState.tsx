import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";
import { Spinner } from "./Spinner";

const SIZE_MAP = { sm: "size-4", md: "size-6", lg: "size-8" };

interface LoadingStateProps {
  label?: ReactNode;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

/**
 * The **composed tier** of the loading family: a full-region placeholder —
 * spinner + label, centered, owning the region's `role="status"`.
 *
 * DS-5P: the glyph, its animation and its reduced-motion behaviour are
 * `Spinner`'s now, not a second copy of the same `Loader2 + animate-spin`.
 * This still owns the *region* — its three steps are region dimensions
 * (16/24/32px), which is why they come through `className` rather than
 * Spinner's own scale; tailwind-merge resolves the size class so the
 * rendering is unchanged. The spinner stays `aria-hidden` here because this
 * wrapper is the live region and the label is already visible.
 *
 * Reach for a sibling instead when: the busy indicator goes *inside* a layout
 * you own (`Spinner`), content is streaming into a known shape (`Skeleton`),
 * an action is pending (`Button loading`), or you can express real progress
 * (`ProgressBar`/`ProgressRing`).
 */
export function LoadingState({ label = "Loading…", size = "md", className }: LoadingStateProps) {
  return (
    <div role="status" className={cn("flex flex-col items-center justify-center gap-3 py-10 text-center", className)}>
      <Spinner className={cn("text-ink-tertiary", SIZE_MAP[size])} />
      <Body size="sm" muted>
        {label}
      </Body>
    </div>
  );
}
