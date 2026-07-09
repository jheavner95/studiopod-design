import type { ReactNode } from "react";
import { Surface, Inline } from "@/components/layout";
import { Body } from "@/components/ui";

interface UnsavedChangesBannerProps {
  message?: ReactNode;
  primary: ReactNode;
  discard: ReactNode;
  className?: string;
}

/** A persistent bar for unsaved edits — built on Surface and Inline, appearing above FormActions rather than replacing it (Save here still requires the same primary action FormActions defines at the bottom). */
export function UnsavedChangesBanner({ message = "You have unsaved changes", primary, discard, className }: UnsavedChangesBannerProps) {
  return (
    <div role="status" className={className}>
      <Surface border elevation="floating" padding="sm">
        <Inline justify="between">
          <Body size="sm">{message}</Body>
          <Inline gap="sm">
            {discard}
            {primary}
          </Inline>
        </Inline>
      </Surface>
    </div>
  );
}
