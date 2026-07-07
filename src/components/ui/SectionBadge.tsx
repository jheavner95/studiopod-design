import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/** Bordered pill label at the top of a section, distinct from inline Badge/status use. */
export function SectionBadge({ children, icon, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-metadata text-ink-secondary",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
