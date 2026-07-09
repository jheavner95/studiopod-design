import { Card, Body, Caption } from "@/components/ui";
import type { InspectorVariant } from "../_data/variants";

export function VariantCard({ variant }: { variant: InspectorVariant }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{variant.title}</span>
      <Body size="sm" muted>
        {variant.purpose}
      </Body>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Differences</Caption>
        <ul className="flex flex-col gap-1.5">
          {variant.differences.map((difference) => (
            <li key={difference} className="flex gap-2 text-body-sm text-ink-secondary">
              <span className="text-ink-tertiary" aria-hidden>
                –
              </span>
              {difference}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Shared anatomy</Caption>
        <Body size="sm" muted>
          {variant.sharedAnatomy}
        </Body>
      </div>
    </Card>
  );
}
