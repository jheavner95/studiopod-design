import { Card, Badge, Body, Caption } from "@/components/ui";
import { ProgressBar } from "@/components/feedback";
import {
  getCertificationRecord,
  getChecklistCoverage,
  getChecklistItem,
  CERTIFICATION_LEVEL_DESCRIPTIONS,
  type CertificationLevel,
} from "@/lib/certification";
import { cn } from "@/lib/utils";

const LEVEL_TONE: Record<CertificationLevel, "neutral" | "accent" | "success" | "warning"> = {
  Concept: "neutral",
  Prototype: "neutral",
  "Production Ready": "accent",
  Certified: "success",
  Locked: "success",
};

interface CertificationPanelProps {
  /** Must match a componentName in CERTIFICATION_REGISTRY (src/lib/certification.ts). */
  componentName: string;
  className?: string;
}

/**
 * DS-1F — the one certification-status display, reading entirely from
 * CERTIFICATION_REGISTRY (src/lib/certification.ts). No page hand-types a
 * status badge, a percentage, or a checklist — exactly the "avoid hardcoding
 * certification data inside component pages" instruction this framework
 * exists to satisfy. A component with no registry entry renders an honest
 * "not yet certified" state instead of crashing — this repo has a specific,
 * recent, well-documented lesson about `getEntry(id)!`-style non-null
 * assertions on registry lookups (see design-system-navigation.test.ts and
 * docs/DOCUMENTATION.md) that this component deliberately does not repeat.
 */
export function CertificationPanel({ componentName, className }: CertificationPanelProps) {
  const record = getCertificationRecord(componentName);

  if (!record) {
    return (
      <Card className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-center gap-2">
          <Badge tone="neutral" size="sm">
            Not yet certified
          </Badge>
          <Body size="sm" muted>
            {componentName}
          </Body>
        </div>
        <Caption className="text-ink-tertiary">
          No certification record exists yet for this component. See docs/CERTIFICATION.md for how one gets added.
        </Caption>
      </Card>
    );
  }

  const coverage = getChecklistCoverage(record);

  return (
    <Card className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge tone={LEVEL_TONE[record.level]} size="sm">
            {record.level}
          </Badge>
          <Body size="sm" className="font-medium text-ink-primary">
            {record.componentName}
          </Body>
        </div>
        <Caption className="text-ink-tertiary">Reviewed {record.lastReviewed}</Caption>
      </div>

      <Body size="sm" muted>
        {CERTIFICATION_LEVEL_DESCRIPTIONS[record.level]}
      </Body>

      <ProgressBar value={coverage.completed / coverage.total} showPercentage label={`${coverage.completed} of ${coverage.total} checks complete`} />

      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
        {coverage.byCategory.map(({ category, total, completed }) => (
          <div key={category.id} className="flex items-baseline justify-between gap-2">
            <Caption className="text-ink-tertiary">{category.title}</Caption>
            <Caption className={completed === total ? "text-success" : "text-ink-tertiary"}>
              {completed}/{total}
            </Caption>
          </div>
        ))}
      </div>

      {coverage.remaining.length > 0 ? (
        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-3">
          <Caption className="text-ink-tertiary">Remaining ({coverage.remaining.length})</Caption>
          <ul className="flex flex-col gap-1">
            {coverage.remaining.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <Badge tone={item.owner === "manual" ? "warning" : "neutral"} size="sm">
                  {item.owner}
                </Badge>
                <Caption className="text-ink-secondary">{item.label}</Caption>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {record.notes ? (
        <Body size="sm" muted className="border-t border-border-subtle pt-3">
          {record.notes}
        </Body>
      ) : null}
    </Card>
  );
}

/** Re-exported for callers that already have a checklist item id and want its label/owner without a second lookup. */
export { getChecklistItem };
