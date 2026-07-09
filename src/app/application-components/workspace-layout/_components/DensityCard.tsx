import { Card, Body, Caption } from "@/components/ui";
import type { DensityLevel } from "../_data/density";

export function DensityCard({ level }: { level: DensityLevel }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{level.name}</span>
      <Body size="sm" muted>
        {level.recommendedUsage}
      </Body>
      <div className="flex flex-col gap-3 border-t border-border-subtle pt-4">
        {level.dimensions.map((dimension) => (
          <div key={dimension.label} className="flex flex-col gap-1">
            <Caption className="text-ink-tertiary">{dimension.label}</Caption>
            <Body size="sm" muted className="min-w-0 break-words">
              {dimension.value}
            </Body>
          </div>
        ))}
      </div>
    </Card>
  );
}
