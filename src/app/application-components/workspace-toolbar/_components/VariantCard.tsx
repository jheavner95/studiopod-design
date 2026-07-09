import { Card, Badge, Body, Caption } from "@/components/ui";
import type { ToolbarVariant } from "../_data/variants";

export function VariantCard({ variant }: { variant: ToolbarVariant }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{variant.title}</span>
      <Body size="sm" muted>
        {variant.purpose}
      </Body>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Common controls</Caption>
        <div className="flex flex-wrap gap-2">
          {variant.commonControls.map((control) => (
            <Badge key={control} tone="neutral" size="sm">
              {control}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Unique behaviors</Caption>
        <Body size="sm" muted>
          {variant.uniqueBehaviors}
        </Body>
      </div>
    </Card>
  );
}
