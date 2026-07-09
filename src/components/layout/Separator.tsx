import { cn } from "@/lib/utils";

export type SeparatorOrientation = "horizontal" | "vertical";

interface SeparatorProps {
  className?: string;
  orientation?: SeparatorOrientation;
  /** Shrinks the separator in from both ends, for use inside padded content rather than flush against a container's edge. */
  inset?: boolean;
  /** Set false when the separator is purely decorative and adjacent content already conveys the grouping (e.g. inside a already-labeled list). */
  decorative?: boolean;
}

/** A semantic boundary between regions — Divider's layout-level counterpart. Renders a single thin rule; direction and inset are the only two decisions a caller has to make. */
export function Separator({ className, orientation = "horizontal", inset = false, decorative = true }: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0 bg-border-subtle",
        orientation === "horizontal" ? cn("h-px w-full", inset && "mx-4") : cn("h-full w-px", inset && "my-4"),
        className,
      )}
    />
  );
}
