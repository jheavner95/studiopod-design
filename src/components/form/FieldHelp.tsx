import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldHelpProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/** Neutral supporting copy below a field — non-blocking, distinct from FieldError's assertive tone. */
export function FieldHelp({ children, id, className }: FieldHelpProps) {
  return (
    <p id={id} className={cn("text-caption text-ink-tertiary", className)}>
      {children}
    </p>
  );
}
