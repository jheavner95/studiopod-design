import { Badge } from "@/components/ui";
import { COVERAGE_ROWS, PLATFORMS, type CoverageState } from "../_data/coverage";

const STATE_TONE: Record<CoverageState, "success" | "warning" | "neutral"> = {
  Used: "success",
  Partial: "warning",
  Planned: "neutral",
};

/** A real <table> (not a card grid) so screen readers get row/column header association for free — horizontally scrollable, never forces the page wider. */
export function CoverageMatrix() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">
          Platform coverage matrix: for each reusable component, whether it is used, partially used, or planned for
          each of StudioPOD&rsquo;s 8 platforms.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 text-metadata text-ink-tertiary">
              Component
            </th>
            {PLATFORMS.map((platform) => (
              <th key={platform} scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
                {platform}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COVERAGE_ROWS.map((row) => (
            <tr key={row.itemName} className="border-b border-border-subtle last:border-b-0">
              <th
                scope="row"
                className="sticky left-0 z-10 whitespace-nowrap bg-surface px-4 py-3 text-left text-body-sm font-medium text-ink-primary"
              >
                {row.itemName}
              </th>
              {PLATFORMS.map((platform) => {
                const state = row.cells[platform];
                return (
                  <td key={platform} className="px-3 py-3">
                    <Badge tone={STATE_TONE[state]} size="sm" className="w-fit whitespace-nowrap">
                      {state}
                    </Badge>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
