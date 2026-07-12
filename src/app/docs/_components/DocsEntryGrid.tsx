import { Badge } from "@/components/ui";
import { CardGrid } from "@/components/layout";
import { DocsLinkCard } from "@/components/docs";
import { BADGE_TONE, BADGE_LABEL, type NavEntry } from "@/lib/design-system-navigation";

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
            entry.badge ? (
              <Badge tone={BADGE_TONE[entry.badge]} size="sm">
                {BADGE_LABEL[entry.badge]}
              </Badge>
            ) : undefined
          }
        />
      ))}
    </CardGrid>
  );
}
