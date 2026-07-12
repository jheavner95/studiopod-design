import { Badge } from "@/components/ui";
import { CardGrid } from "@/components/layout";
import { DocsLinkCard } from "@/components/docs";
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
        <DocsLinkCard
          key={entry.id}
          href={entry.href}
          title={entry.title}
          description={entry.description}
          adornment={
            <Badge tone={STATUS_TONE[entry.status]} size="sm">
              {STATUS_LABEL[entry.status]}
            </Badge>
          }
        />
      ))}
    </CardGrid>
  );
}
