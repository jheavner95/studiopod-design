import type { ReactNode } from "react";
import { Display, Body, Badge } from "@/components/ui";
import { Inline } from "@/components/layout";
import { BADGE_TONE, BADGE_LABEL, type NavEntry } from "@/lib/design-system-navigation";

interface DocsPageHeaderProps {
  entry: NavEntry;
  children?: ReactNode;
}

/** Title, description, and classification badge — all derived from the entry's own registry record, never restated per page. */
export function DocsPageHeader({ entry, children }: DocsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      {entry.badge ? (
        <Inline gap="sm" align="center">
          <Badge tone={BADGE_TONE[entry.badge]} size="sm">
            {BADGE_LABEL[entry.badge]}
          </Badge>
        </Inline>
      ) : null}
      <Display>{entry.title}</Display>
      <Body size="lg" muted className="max-w-[var(--container-narrow)]">
        {entry.description}
      </Body>
      {children}
    </div>
  );
}
