import type { ReactNode } from "react";
import { CardGrid } from "@/components/layout";
import { DocsLinkCard } from "./DocsLinkCard";

interface DocsRelatedGridEntry {
  id?: string;
  href: string;
  title: ReactNode;
  description?: ReactNode;
  external?: boolean;
}

interface DocsRelatedGridProps {
  entries: DocsRelatedGridEntry[];
  columns?: 2 | 3 | 4;
}

/**
 * DS-7.5 Part 3/11 — the shared "Related Components" / "See Also" / "Built
 * From" grid. Introduced because the same hand-rolled
 * `relatedComponents.map(...) => <Link><Card interactive>...` block was
 * independently duplicated across ~58 page.tsx files — real repetition
 * that justifies one shared primitive per Part 11, rather than fixing the
 * card affordance 58 times over.
 */
export function DocsRelatedGrid({ entries, columns = 3 }: DocsRelatedGridProps) {
  return (
    <CardGrid columns={columns} gap="md">
      {entries.map((entry) => (
        <DocsLinkCard
          key={entry.id ?? entry.href}
          href={entry.href}
          title={entry.title}
          description={entry.description}
          external={entry.external}
        />
      ))}
    </CardGrid>
  );
}
