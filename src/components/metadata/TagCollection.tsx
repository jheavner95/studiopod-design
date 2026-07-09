import { Badge } from "@/components/ui";
import { Cluster } from "@/components/layout";

interface TagCollectionProps {
  tags: string[];
  className?: string;
}

/** A wrapping group of tags — built directly on Cluster. Individual tags render as Badge until a dedicated Tag component exists (still "Needed" in the Foundation Component Catalog). */
export function TagCollection({ tags, className }: TagCollectionProps) {
  return (
    <Cluster gap="xs" className={className}>
      {tags.map((tag) => (
        <Badge key={tag} tone="neutral" size="sm">
          {tag}
        </Badge>
      ))}
    </Cluster>
  );
}
