import { Badge } from "@/components/ui";
import { PLATFORM_CERTIFICATION_ROWS, phaseLabel } from "../_data/platform-certification";
import type { CertificationLevelId } from "../_data/certification-levels";

const PHASE_TONE: Record<CertificationLevelId, "neutral" | "warning" | "accent" | "success"> = {
  draft: "neutral",
  prototype: "warning",
  "production-ready": "accent",
  certified: "success",
  "enterprise-certified": "success",
};

function BoolBadge({ value, trueLabel, falseLabel }: { value: boolean; trueLabel: string; falseLabel: string }) {
  return (
    <Badge tone={value ? "success" : "neutral"} size="sm" className="w-fit whitespace-nowrap">
      {value ? trueLabel : falseLabel}
    </Badge>
  );
}

function PercentCell({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-body-sm text-ink-tertiary">Not yet tracked</span>;
  }
  return <span className="text-body-sm text-ink-secondary">{value}%</span>;
}

/** A real <table>, horizontally scrollable — every cell is derived live from templates.ts / coverage.ts, never hand-typed. */
export function CertificationMatrix() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface">
      <table className="w-full min-w-[820px] border-collapse text-left">
        <caption className="sr-only">
          Platform certification matrix: for each of StudioPOD&rsquo;s nine platforms, whether its architecture is
          defined, whether the workspace is certified, its component coverage, operational readiness, and current
          phase.
        </caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 z-10 bg-surface px-4 py-3 text-metadata text-ink-tertiary">
              Platform
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Architecture defined
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Workspace certified
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Component coverage
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Operational readiness
            </th>
            <th scope="col" className="whitespace-nowrap px-3 py-3 text-metadata text-ink-tertiary">
              Current phase
            </th>
          </tr>
        </thead>
        <tbody>
          {PLATFORM_CERTIFICATION_ROWS.map((row) => (
            <tr key={row.platform} className="border-b border-border-subtle last:border-b-0">
              <th scope="row" className="sticky left-0 z-10 whitespace-nowrap bg-surface px-4 py-3 text-left text-body-sm font-medium text-ink-primary">
                {row.platform}
              </th>
              <td className="px-3 py-3">
                <BoolBadge value={row.architectureDefined} trueLabel="Defined" falseLabel="Not yet defined" />
              </td>
              <td className="px-3 py-3">
                <BoolBadge value={row.workspaceCertified} trueLabel="Certified" falseLabel="Not yet certified" />
              </td>
              <td className="px-3 py-3">
                <PercentCell value={row.componentCoverage} />
              </td>
              <td className="px-3 py-3">
                <PercentCell value={row.operationalReadiness} />
              </td>
              <td className="px-3 py-3">
                <Badge tone={PHASE_TONE[row.currentPhase]} size="sm" className="w-fit whitespace-nowrap">
                  {phaseLabel(row.currentPhase)}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
