import { Body, Caption } from "@/components/ui";
import { HEIGHT_RULES, type HeightRule } from "../_data/heights";

/** Tailwind's own height scale, not a pixel literal — the ranking is what matters, not the exact step. */
const RANK_HEIGHT: Record<HeightRule["rank"], string> = {
  4: "h-14",
  3: "h-11",
  2: "h-9",
  1: "h-7",
};

/** A relative height comparison — four tiers, ranked tallest to shortest, never a literal measurement. */
export function HeightComparison() {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border-subtle bg-surface p-4 sm:p-6">
      {HEIGHT_RULES.map((rule) => (
        <div key={rule.label} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
          <div className="flex w-full shrink-0 items-center gap-3 sm:w-48">
            <div className={`w-3 shrink-0 rounded-sm bg-accent-500/70 ${RANK_HEIGHT[rule.rank]}`} aria-hidden />
            <span className="text-body-sm font-medium text-ink-primary">{rule.label}</span>
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <Body size="sm" muted className="min-w-0 break-words">
              {rule.description}
            </Body>
            <Caption className="text-ink-tertiary">Relative rank {rule.rank} of 4</Caption>
          </div>
        </div>
      ))}
    </div>
  );
}
