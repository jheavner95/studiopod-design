import { Badge, Caption } from "@/components/ui";
import { MATURITY_ROWS, type MaturityLevel } from "../_data/maturity";

const LEVEL_TONE: Record<MaturityLevel, "neutral" | "warning" | "success" | "accent"> = {
  Concept: "neutral",
  Prototype: "warning",
  "Production Ready": "success",
  Certified: "accent",
  Locked: "accent",
};

const ROW_COLUMNS = "sm:grid-cols-[1.3fr_1.6fr_1fr]";

/** Every inventory item's default maturity level, in one scannable table — components, not file paths, so overflow risk is low, but min-w-0 stays as insurance. */
export function MaturityTable() {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
      <div className={`hidden min-w-0 border-b border-border pb-3 sm:grid sm:gap-4 ${ROW_COLUMNS}`}>
        <span className="text-metadata text-ink-tertiary">Component</span>
        <span className="text-metadata text-ink-tertiary">Family</span>
        <span className="text-metadata text-ink-tertiary">Maturity</span>
      </div>
      <div className="flex flex-col">
        {MATURITY_ROWS.map((row) => (
          <div
            key={row.itemName}
            className={`grid min-w-0 grid-cols-1 gap-2 border-b border-border-subtle py-3 last:border-b-0 sm:items-center sm:gap-4 ${ROW_COLUMNS}`}
          >
            <div className="flex min-w-0 flex-col gap-1 sm:contents">
              <Caption className="text-ink-tertiary sm:hidden">Component</Caption>
              <span className="min-w-0 break-words text-body-sm font-medium text-ink-primary">{row.itemName}</span>
            </div>
            <div className="flex min-w-0 flex-col gap-1 sm:contents">
              <Caption className="text-ink-tertiary sm:hidden">Family</Caption>
              <span className="min-w-0 break-words text-body-sm text-ink-secondary">{row.groupTitle}</span>
            </div>
            <div className="flex min-w-0 flex-col gap-1 sm:contents">
              <Caption className="text-ink-tertiary sm:hidden">Maturity</Caption>
              <Badge tone={LEVEL_TONE[row.level]} size="sm" className="w-fit">
                {row.level}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
