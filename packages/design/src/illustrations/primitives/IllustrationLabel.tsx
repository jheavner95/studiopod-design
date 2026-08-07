import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IllustrationLabelProps {
  children: ReactNode;
  className?: string;
}

/** A small floating annotation — for a connection's label, a region caption, anything positioned atop a canvas. */
export function IllustrationLabel({ children, className }: IllustrationLabelProps) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border border-border bg-canvas/90 px-2 py-0.5 text-caption text-ink-secondary backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
