import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableStatusCell } from "@/components/table";
import { PLATFORM_CERTIFICATION_ROWS, phaseLabel } from "../_data/platform-certification";
import type { CertificationLevelId } from "../_data/certification-levels";

const PHASE_TONE: Record<CertificationLevelId, "neutral" | "warning" | "accent" | "success"> = {
  draft: "neutral",
  prototype: "warning",
  "production-ready": "accent",
  certified: "success",
  "enterprise-certified": "success",
};

function boolTone(value: boolean): "success" | "neutral" {
  return value ? "success" : "neutral";
}

function PercentCell({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-body-sm text-ink-tertiary">Not tracked</span>;
  }
  return <span className="text-body-sm text-ink-secondary">{value}%</span>;
}

export function CertificationMatrix() {
  return (
    <Table
      minWidth="820px"
      caption="Platform certification matrix: for each of StudioPOD’s nine platforms, whether its architecture is defined, whether the workspace is certified, its component coverage, operational readiness, and certification tier."
    >
      <TableHeader sticky={false}>
        <tr>
          <TableHead sticky>Platform</TableHead>
          <TableHead className="px-3">Architecture defined</TableHead>
          <TableHead className="px-3">Workspace certified</TableHead>
          <TableHead className="px-3">Component coverage</TableHead>
          <TableHead className="px-3">Operational readiness</TableHead>
          <TableHead className="px-3">Certification tier</TableHead>
        </tr>
      </TableHeader>
      <TableBody>
        {PLATFORM_CERTIFICATION_ROWS.map((row) => (
          <TableRow key={row.platform}>
            <TableHead scope="row" sticky>
              <span className="text-body-sm font-medium text-ink-primary">{row.platform}</span>
            </TableHead>
            <TableStatusCell
              label={row.architectureDefined ? "Defined" : "Unranked"}
              tone={boolTone(row.architectureDefined)}
              className="px-3"
            />
            <TableStatusCell
              label={row.workspaceCertified ? "Certified" : "Not certified"}
              tone={boolTone(row.workspaceCertified)}
              className="px-3"
            />
            <TableCell className="px-3">
              <PercentCell value={row.componentCoverage} />
            </TableCell>
            <TableCell className="px-3">
              <PercentCell value={row.operationalReadiness} />
            </TableCell>
            <TableStatusCell label={phaseLabel(row.currentPhase)} tone={PHASE_TONE[row.currentPhase]} className="px-3" />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
