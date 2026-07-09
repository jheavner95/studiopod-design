import { Card, Body, Caption } from "@/components/ui";
import type { PlatformExample } from "../_data/platform-examples";

export function PlatformExampleCard({ example }: { example: PlatformExample }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <span className="text-body-md font-medium text-ink-primary">{example.title}</span>
      <Body size="sm" muted>
        {example.purpose}
      </Body>

      <div className="flex flex-col gap-1.5">
        <Caption className="text-ink-tertiary">Primary operational data</Caption>
        <Body size="sm" muted>
          {example.primaryData}
        </Body>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Shared status anatomy</Caption>
        <Body size="sm" muted>
          {example.sharedAnatomy}
        </Body>
      </div>
    </Card>
  );
}
