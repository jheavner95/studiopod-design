import { Card, Badge, Body } from "@/components/ui";
import type { PlatformExample } from "../_data/platform-examples";

/** A small preview card — deliberately lighter than the large anatomy region cards. */
export function PlatformPreviewCard({ example }: { example: PlatformExample }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-body-sm font-medium text-ink-primary">{example.title}</span>
        <Badge tone="accent" size="sm">
          {example.primaryMode}
        </Badge>
      </div>
      <Body size="sm" muted>
        {example.purpose}
      </Body>
    </Card>
  );
}
