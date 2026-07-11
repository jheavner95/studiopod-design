import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { feedbackRole } from "@/components/feedback/Alert";

export type FieldMessageTone = "error" | "warning";

interface FieldErrorProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** "error" (default) is blocking and uses role="alert" for an assertive screen-reader announcement; "warning" is non-blocking and uses role="status" instead. */
  tone?: FieldMessageTone;
}

/** A field's validation message, announced to assistive tech — the accessible piece plain helper text (or the base inputs' own built-in helperText slot) doesn't provide on its own. Shares its tone->role mapping with feedback/Alert.tsx's own feedbackRole() rather than reimplementing the same ternary a second time. */
export function FieldError({ children, id, className, tone = "error" }: FieldErrorProps) {
  return (
    <p id={id} role={feedbackRole(tone)} className={cn("text-caption", tone === "error" ? "text-error" : "text-warning", className)}>
      {children}
    </p>
  );
}
