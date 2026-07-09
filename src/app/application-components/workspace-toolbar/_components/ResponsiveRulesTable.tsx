import { TOOLBAR_RESPONSIVE_RULES } from "../_data/responsive-rules";

/** A real <table> for row/column header association — horizontally scrollable, never forces the page wider. */
export function ResponsiveRulesTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">
          Responsive rules: how five dimensions of toolbar behavior change across desktop, tablet, and mobile.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 text-metadata text-ink-tertiary">
              Dimension
            </th>
            <th scope="col" className="px-4 py-3 text-metadata text-ink-tertiary">
              Desktop
            </th>
            <th scope="col" className="px-4 py-3 text-metadata text-ink-tertiary">
              Tablet
            </th>
            <th scope="col" className="px-4 py-3 text-metadata text-ink-tertiary">
              Mobile
            </th>
          </tr>
        </thead>
        <tbody>
          {TOOLBAR_RESPONSIVE_RULES.map((rule) => (
            <tr key={rule.dimension} className="border-b border-border-subtle last:border-b-0">
              <th scope="row" className="sticky left-0 z-10 bg-surface px-4 py-3 text-left text-body-sm font-medium text-ink-primary">
                {rule.dimension}
              </th>
              <td className="min-w-0 break-words px-4 py-3 text-body-sm text-ink-secondary">{rule.desktop}</td>
              <td className="min-w-0 break-words px-4 py-3 text-body-sm text-ink-secondary">{rule.tablet}</td>
              <td className="min-w-0 break-words px-4 py-3 text-body-sm text-ink-secondary">{rule.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
