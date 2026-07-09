import { Card, Body, Caption } from "@/components/ui";
import type { StatusVariant } from "../_data/variants";

export function VariantCard({ variant }: { variant: StatusVariant }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{variant.title}</span>
      <Body size="sm" muted>
        {variant.purpose}
      </Body>

      <div className="flex flex-col gap-1.5">
        <Caption className="text-ink-tertiary">Shared anatomy</Caption>
        <Body size="sm" muted>
          {variant.sharedAnatomy}
        </Body>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Unique additions</Caption>
        <Body size="sm" muted>
          {variant.uniqueAdditions}
        </Body>
      </div>
    </Card>
  );
}
