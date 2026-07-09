import Link from "next/link";
import { Card, Badge, Body, Caption } from "@/components/ui";
import { COMPONENT_FAMILIES } from "../_data/families";
import { templateReadiness, type PlatformTemplate } from "../_data/templates";

export function TemplateCard({ template }: { template: PlatformTemplate }) {
  const families = template.requiredFamilyIds
    .map((id) => COMPONENT_FAMILIES.find((f) => f.id === id))
    .filter((f): f is (typeof COMPONENT_FAMILIES)[number] => f !== undefined);
  const readiness = templateReadiness(template);

  return (
    <Card padding="lg" className="flex h-full flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-body-md font-medium text-ink-primary">{template.title}</span>
        <Badge tone="neutral" size="sm" className="whitespace-nowrap">
          {readiness}% ready
        </Badge>
      </div>

      <Body size="sm" muted>
        {template.purpose}
      </Body>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Required component families</Caption>
        <div className="flex flex-wrap gap-2">
          {families.map((family) => (
            <Link key={family.id} href={`/application-components/architecture#${family.id}`} className="focus-ring rounded-full">
              <Badge tone="accent" size="sm">
                {family.title}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Caption className="text-ink-tertiary">Core layout pattern</Caption>
        <Body size="sm" muted className="min-w-0 break-words">
          {template.layoutPattern}
        </Body>
      </div>

      <div className="flex flex-col gap-1.5">
        <Caption className="text-ink-tertiary">Current status</Caption>
        <Body size="sm" muted>
          Not started — required families average {readiness}% complete.
        </Body>
      </div>

      <div className="mt-auto flex flex-col gap-1.5 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Reuse opportunities</Caption>
        <Body size="sm" muted>
          {template.reuseOpportunities}
        </Body>
      </div>
    </Card>
  );
}
