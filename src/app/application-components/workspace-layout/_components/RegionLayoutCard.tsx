import { Card, Body, Caption } from "@/components/ui";
import type { RegionLayout } from "../_data/region-layouts";

const SEGMENT_STYLE = [
  "bg-accent-500/70",
  "bg-accent-500/30",
  "bg-accent-500/70",
] as const;

/** A proportion bar rendered from relative flex weights — no pixel or percent literal in the markup. */
export function RegionLayoutCard({ layout }: { layout: RegionLayout }) {
  return (
    <Card padding="lg" className="flex flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{layout.name}</span>
      <Body size="sm" muted>
        {layout.description}
      </Body>

      <div className="flex h-10 w-full overflow-hidden rounded-md border border-border-subtle" role="img" aria-label={`${layout.name} proportions: ${layout.segments.map((s) => `${s.label} ${s.weight}`).join(", ")}`}>
        {layout.segments.map((segment, index) => (
          <div
            key={`${segment.label}-${index}`}
            className={`flex items-center justify-center border-r border-canvas last:border-r-0 ${SEGMENT_STYLE[index % SEGMENT_STYLE.length]}`}
            style={{ flexGrow: segment.weight, flexBasis: 0 }}
          >
            <Caption className="truncate px-1 text-[10px] text-white/90">{segment.label}</Caption>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">When to use</Caption>
        <Body size="sm" muted>
          {layout.whenToUse}
        </Body>
      </div>
    </Card>
  );
}
