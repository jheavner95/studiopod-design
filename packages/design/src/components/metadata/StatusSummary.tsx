import { Badge } from "@/components/ui";
import { Inline } from "@/components/layout";
import type { StatusTone } from "@/lib/tone";

export interface StatusSummaryItem {
  label: string;
  tone?: StatusTone;
}

interface StatusSummaryProps {
  items: StatusSummaryItem[];
  className?: string;
}

/** One or more status Badges in a row — the object-level counterpart to Operational Status's own Workspace Status region, scoped to a single record instead of the whole workspace. */
export function StatusSummary({ items, className }: StatusSummaryProps) {
  return (
    <Inline gap="xs" className={className}>
      {items.map((item) => (
        <Badge key={item.label} tone={item.tone ?? "neutral"} size="sm">
          {item.label}
        </Badge>
      ))}
    </Inline>
  );
}
