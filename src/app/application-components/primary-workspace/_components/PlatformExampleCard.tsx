import { Card, Badge, Body, Caption } from "@/components/ui";
import type { PlatformExample } from "../_data/platform-examples";

export function PlatformExampleCard({ example }: { example: PlatformExample }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-body-md font-medium text-ink-primary">{example.title}</span>
        <Badge tone="accent" size="sm">
          {example.workspaceType}
        </Badge>
      </div>

      <div className="flex flex-col gap-1.5">
        <Caption className="text-ink-tertiary">Why this type</Caption>
        <Body size="sm" muted>
          {example.why}
        </Body>
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Supporting regions</Caption>
        <div className="flex flex-wrap gap-2">
          {example.supportingRegions.map((region) => (
            <Badge key={region} tone="neutral" size="sm">
              {region}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Workflow characteristics</Caption>
        <Body size="sm" muted>
          {example.workflow}
        </Body>
      </div>
    </Card>
  );
}
