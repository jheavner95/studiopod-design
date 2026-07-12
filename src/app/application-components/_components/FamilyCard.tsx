import { Card, Badge, Body, Caption } from "@/components/ui";
import { resolveFamilyItems, type ComponentFamily } from "../_data/families";

export function FamilyCard({ family }: { family: ComponentFamily }) {
  const items = resolveFamilyItems(family);

  return (
    <Card padding="lg" className="flex h-full flex-col gap-5">
      <span className="text-body-md font-medium text-ink-primary">{family.title}</span>

      <Body size="sm" muted>
        {family.purpose}
      </Body>

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

      {items.length > 0 ? (
        <div className="flex flex-col gap-2">
          <Caption className="text-ink-tertiary">Components</Caption>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge key={item.name} tone="neutral" size="sm">
                {item.name}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-1 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Architectural notes</Caption>
        <Body size="sm" muted>
          {family.roadmapNotes}
        </Body>
      </div>
    </Card>
  );
}
