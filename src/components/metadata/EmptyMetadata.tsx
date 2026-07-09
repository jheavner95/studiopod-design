import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";

interface EmptyMetadataProps {
  title: string;
  description?: ReactNode;
  className?: string;
}

/** A centered placeholder for a metadata region with nothing to show — the non-tabular counterpart to Foundation Table's own TableEmptyState. */
export function EmptyMetadata({ title, description, className }: EmptyMetadataProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border-subtle px-6 py-8 text-center",
        className,
      )}
    >
      <span className="text-body-sm font-medium text-ink-primary">{title}</span>
      {description ? (
        <Body size="sm" muted className="max-w-sm">
          {description}
        </Body>
      ) : null}
    </div>
  );
}
