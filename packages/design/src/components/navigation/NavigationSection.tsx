import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavigationSectionProps {
  title?: string;
  /** Falls back to `title` — every NavigationSection is its own nav landmark, so it needs an accessible name one way or the other. */
  "aria-label"?: string;
  children: ReactNode;
  className?: string;
}

/** The outermost semantic boundary in this family — a real nav landmark (e.g. "Main", "Settings") that holds one or more NavigationGroups. Distinct from NavigationGroup: a section is a landmark, a group is just a labeled visual cluster inside one. */
export function NavigationSection({ title, "aria-label": ariaLabel, children, className }: NavigationSectionProps) {
  return (
    <nav aria-label={ariaLabel ?? title} className={cn("flex flex-col gap-4", className)}>
      {title ? <span className="px-3 text-metadata font-semibold text-ink-tertiary">{title}</span> : null}
      {children}
    </nav>
  );
}
