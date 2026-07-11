import Link from "next/link";
import { Card, Body, Badge } from "@/components/ui";
import { CardGrid } from "@/components/layout";
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

interface DocsEntryGridProps {
  entries: NavEntry[];
  columns?: 2 | 3 | 4 | 6;
}

/** The grouped-card pattern every /docs/* landing page reuses to list its own registry entries. */
export function DocsEntryGrid({ entries, columns = 3 }: DocsEntryGridProps) {
  return (
    <CardGrid columns={columns} gap="md">
      {entries.map((entry) => (
        <Link key={entry.id} href={entry.href} className="focus-ring block rounded-lg">
          <Card interactive className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-body-md font-medium text-ink-primary">{entry.title}</span>
              <Badge tone={STATUS_TONE[entry.status]} size="sm">
                {STATUS_LABEL[entry.status]}
              </Badge>
            </div>
            <Body size="sm" muted>
              {entry.description}
            </Body>
          </Card>
        </Link>
      ))}
    </CardGrid>
  );
}
