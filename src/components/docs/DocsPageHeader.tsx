import type { ReactNode } from "react";
import { Display, Body, Badge } from "@/components/ui";
import { Inline } from "@/components/layout";
import type { NavEntry, NavStatus } from "@/lib/design-system-navigation";

const STATUS_TONE: Record<NavStatus, "success" | "accent" | "neutral" | "warning"> = {
  certified: "success",
  established: "accent",
  placeholder: "neutral",
  legacy: "warning",
};

const STATUS_LABEL: Record<NavStatus, string> = {
  certified: "Certified",
  established: "Established",
  placeholder: "Placeholder",
  legacy: "Legacy",
};

interface DocsPageHeaderProps {
  entry: NavEntry;
  children?: ReactNode;
}

/** Title, description, and status badge — all derived from the entry's own registry record, never restated per page. */
export function DocsPageHeader({ entry, children }: DocsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <Inline gap="sm" align="center">
        <Badge tone={STATUS_TONE[entry.status]} size="sm">
          {STATUS_LABEL[entry.status]}
        </Badge>
      </Inline>
      <Display>{entry.title}</Display>
      <Body size="lg" muted className="max-w-[var(--container-narrow)]">
        {entry.description}
      </Body>
      {children}
    </div>
  );
}
