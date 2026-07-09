import { Card, Badge, Body, Caption } from "@/components/ui";
import type { HeaderVariant } from "../_data/variants";

export function VariantCard({ variant }: { variant: HeaderVariant }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{variant.title}</span>
      <Body size="sm" muted>
        {variant.purpose}
      </Body>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Additional regions</Caption>
        {variant.additionalRegions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {variant.additionalRegions.map((region) => (
              <Badge key={region} tone="accent" size="sm">
                {region}
              </Badge>
            ))}
          </div>
        ) : (
          <Body size="sm" muted>
            None — the four base regions only.
          </Body>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Typical actions</Caption>
        <div className="flex flex-wrap gap-2">
          {variant.typicalActions.map((action) => (
            <Badge key={action} tone="neutral" size="sm">
              {action}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">When to use</Caption>
        <Body size="sm" muted>
          {variant.whenToUse}
        </Body>
      </div>
    </Card>
  );
}
