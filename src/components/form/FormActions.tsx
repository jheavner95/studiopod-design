import type { ReactNode } from "react";
import { Inline, Separator } from "@/components/layout";

interface FormActionsProps {
  /** The primary submit/save action — one, per Implementation Guidance's own "one primary action" rule. */
  primary: ReactNode;
  /** Cancel is always available — pass it explicitly rather than omitting it. */
  cancel: ReactNode;
  /** Extra secondary actions (e.g. "Save as draft"), rendered between Cancel and the primary action. */
  secondary?: ReactNode;
  className?: string;
}

/** The bottom action bar every form ends with — a Separator above, Cancel on the left, secondary and primary actions on the right. */
export function FormActions({ primary, cancel, secondary, className }: FormActionsProps) {
  return (
    <div className={className}>
      <Separator className="mb-4" />
      <Inline justify="between">
        {cancel}
        <Inline gap="sm">
          {secondary}
          {primary}
        </Inline>
      </Inline>
    </div>
  );
}
