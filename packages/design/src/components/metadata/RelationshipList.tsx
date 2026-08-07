import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Stack } from "@/components/layout";
import { Caption } from "@/components/ui";
import type { LinkComponent } from "@/framework";

export interface RelationshipItem {
  label: ReactNode;
  href?: string;
  meta?: ReactNode;
}

export interface RelationshipListProps {
  items: RelationshipItem[];
  className?: string;
  emptyLabel?: ReactNode;
  /** What renders the link. Defaults to `"a"`; pass your framework's link component for client-side navigation. A prop, not context, so this component stays server-safe. */
  linkComponent?: LinkComponent;
}

/**
 * A list of linked/related objects — the generalized shape every
 * workspace's own regions.ts file already establishes ad hoc via a
 * reuseLinks array (seven separate times — see Promotion Candidates).
 */
export function RelationshipList({ items, className, emptyLabel = "No related items", linkComponent }: RelationshipListProps) {
  const LinkEl = linkComponent ?? "a";
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
          <LinkEl key={index} href={item.href} className="focus-ring rounded-md">
            {content}
          </LinkEl>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </Stack>
  );
}
