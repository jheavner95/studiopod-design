import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { SCORECARD_CATEGORIES, contributionPercent } from "../_data/scorecard";

/** A real <table> so screen readers get row/column header association — horizontally scrollable, never forces the page wider. */
export function ScorecardTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <caption className="sr-only">
          Workspace certification scorecard: nine categories, their point weight, purpose, passing criteria, and
          share of the total possible score.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 text-metadata text-ink-tertiary">
              Category
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Weight
            </th>
            <th scope="col" className="px-3 py-3 text-metadata text-ink-tertiary">
              Purpose
            </th>
            <th scope="col" className="px-3 py-3 text-metadata text-ink-tertiary">
              Passing criteria
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Contribution
            </th>
          </tr>
        </thead>
        <tbody>
          {SCORECARD_CATEGORIES.map((category) => (
            <tr key={category.id} className="border-b border-border-subtle last:border-b-0">
              <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-3 text-left align-top">
                {category.href ? (
                  <Link
                    href={category.href}
                    className="focus-ring flex w-fit items-center gap-1 rounded-md text-body-sm font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
                  >
                    {category.label}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                ) : (
                  <span className="text-body-sm font-medium text-ink-primary">{category.label}</span>
                )}
              </th>
              <td className="px-3 py-3 align-top">
                <Badge tone="accent" size="sm" className="w-fit whitespace-nowrap">
                  {category.weight} pts
                </Badge>
              </td>
              <td className="min-w-0 max-w-xs break-words px-3 py-3 align-top text-body-sm text-ink-secondary">
                {category.purpose}
              </td>
              <td className="min-w-0 max-w-xs break-words px-3 py-3 align-top text-body-sm text-ink-secondary">
                {category.passingCriteria}
              </td>
              <td className="whitespace-nowrap px-3 py-3 align-top text-body-sm text-ink-secondary">
                {contributionPercent(category)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
