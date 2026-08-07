import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stack } from "@/components/layout";
import { Caption } from "@/components/ui";

export interface RelationshipItem {
  label: ReactNode;
  href?: string;
  meta?: ReactNode;
}

interface RelationshipListProps {
  items: RelationshipItem[];
  className?: string;
  emptyLabel?: ReactNode;
}

/**
 * A list of linked/related objects — the generalized shape every
 * workspace's own regions.ts file already establishes ad hoc via a
 * reuseLinks array (seven separate times — see Promotion Candidates).
 */
export function RelationshipList({ items, className, emptyLabel = "No related items" }: RelationshipListProps) {
  if (items.length === 0) {
    return <Caption className="text-ink-tertiary">{emptyLabel}</Caption>;
  }

  return (
    <Stack gap="xs" className={className}>
      {items.map((item, index) => {
        const content = (
          <span className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-body-sm text-ink-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:bg-canvas-raised">
            <span className="min-w-0 truncate">{item.label}</span>
            <span className="flex shrink-0 items-center gap-1 text-ink-tertiary">
              {item.meta}
              {item.href ? <ArrowUpRight className="size-3.5" aria-hidden /> : null}
            </span>
          </span>
        );
        return item.href ? (
          <Link key={index} href={item.href} className="focus-ring rounded-md">
            {content}
          </Link>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </Stack>
  );
}
