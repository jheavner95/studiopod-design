import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { feedbackRole } from "@/components/feedback/Alert";

export type FieldMessageTone = "error" | "warning";

/**
 * DS-5B: exported so ValidationSummary — which renders the same two
 * severities in an aggregate list — imports this instead of keeping an
 * independently hand-typed copy of the same two colors (found during the
 * tone-mapping consolidation audit). Deliberately its own two-value map,
 * not folded into the five-value StatusTone (src/lib/tone.ts): form
 * validation genuinely has no neutral/accent/success state to represent,
 * matching engineering note 03's own "may be a correct intentional
 * difference" suspicion about this narrower vocabulary.
 */
export const FIELD_MESSAGE_TEXT: Record<FieldMessageTone, string> = {
  error: "text-error",
  warning: "text-warning",
};

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
    <p id={id} role={feedbackRole(tone)} className={cn("text-caption", FIELD_MESSAGE_TEXT[tone], className)}>
      {children}
    </p>
  );
}
