import type { ReactNode } from "react";
import { Display, Body, Badge } from "@/components/ui";
import { Inline } from "@/components/layout";
import { BADGE_TONE, BADGE_LABEL, type NavEntry } from "@/lib/design-system-navigation";

interface DocsPageHeaderProps {
  entry: NavEntry;
  children?: ReactNode;
}

/**
 * Title, description, and classification badge — all derived from the entry's own registry record,
 * never restated per page. Title scale follows the entry's pageType: "landing" and "architecture"
 * pages keep the full hero Display size, while the far more numerous "reference" and "pattern" pages
 * (the vast majority of the site) use a more compact heading scale so the title doesn't overpower a
 * page whose job is to get the reader into examples quickly.
 */
export function DocsPageHeader({ entry, children }: DocsPageHeaderProps) {
  const isCompactTitle = entry.pageType === "reference" || entry.pageType === "pattern";
  return (
    <div className="flex flex-col gap-4">
      {entry.badge ? (
        <Inline gap="sm" align="center">
          <Badge tone={BADGE_TONE[entry.badge]} size="sm">
            {BADGE_LABEL[entry.badge]}
          </Badge>
        </Inline>
      ) : null}
      <Display className={isCompactTitle ? "text-heading-1" : undefined}>{entry.title}</Display>
      <Body size="lg" muted className="max-w-[var(--container-narrow)]">
        {entry.description}
      </Body>
      {children}
    </div>
  );
}
