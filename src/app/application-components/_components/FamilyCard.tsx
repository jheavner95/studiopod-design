import { Card, Badge, Body, Caption } from "@/components/ui";
import { resolveFamilyItems, familyCompletion, type ComponentFamily } from "../_data/families";
import type { InventoryStatus, InventoryPriority } from "../inventory/_data/inventory";

const STATUS_TONE: Record<InventoryStatus, "success" | "warning" | "neutral"> = {
  Exists: "success",
  Partial: "warning",
  Needed: "neutral",
};

const PRIORITY_TONE: Record<InventoryPriority, "error" | "warning" | "neutral"> = {
  High: "error",
  Medium: "warning",
  Low: "neutral",
};

export function FamilyCard({ family }: { family: ComponentFamily }) {
  const items = resolveFamilyItems(family);
  const completion = familyCompletion(family);

  return (
    <Card padding="lg" className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-body-md font-medium text-ink-primary">{family.title}</span>
        <Badge tone={PRIORITY_TONE[family.priority]} size="sm">
          {family.priority}
        </Badge>
      </div>

      <Body size="sm" muted>
        {family.purpose}
      </Body>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Caption className="text-ink-tertiary">Completion</Caption>
          <Caption className="font-mono text-ink-tertiary">{completion}%</Caption>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-canvas-raised">
          <div className="h-full rounded-full bg-accent-500" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Responsibilities</Caption>
        <ul className="flex flex-col gap-1.5">
          {family.responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-2 text-body-sm text-ink-secondary">
              <span className="text-ink-tertiary" aria-hidden>
                –
              </span>
              {responsibility}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Child components</Caption>
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={item.name} tone={STATUS_TONE[item.status]} size="sm">
                {item.name}
              </Badge>
            ))}
          </div>
        ) : (
          <Body size="sm" muted>
            Not represented in the inventory yet.
          </Body>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-1 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Architectural notes</Caption>
        <Body size="sm" muted>
          {family.roadmapNotes}
        </Body>
      </div>
    </Card>
  );
}
