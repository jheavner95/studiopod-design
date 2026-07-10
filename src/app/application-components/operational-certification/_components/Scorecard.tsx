import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/table";
import { Badge } from "@/components/ui";
import { SCORECARD, VERIFICATION_DIMENSIONS, type DimensionVerdict } from "../_data/scorecard";

const VERDICT_TONE: Record<DimensionVerdict, "success" | "warning" | "error"> = {
  Pass: "success",
  Partial: "warning",
  Fail: "error",
};

function VerdictBadge({ verdict }: { verdict: DimensionVerdict }) {
  return (
    <Badge tone={VERDICT_TONE[verdict]} size="sm">
      {verdict}
    </Badge>
  );
}

/** The full 9-system x 11-dimension matrix, built on Foundation Table directly — the same primitive every certified system in this library already composes from, rather than a bespoke matrix component. */
export function Scorecard() {
  return (
    <Table caption="Operational Component Library certification scorecard, nine systems by eleven verification dimensions" minWidth="1400px">
      <TableHeader>
        <TableRow>
          <TableHead>System</TableHead>
          {VERIFICATION_DIMENSIONS.map((dimension) => (
            <TableHead key={dimension}>{dimension}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {SCORECARD.map((row) => (
          <TableRow key={row.system}>
            <TableCell nowrap className="font-medium text-ink-primary">
              {row.system}
            </TableCell>
            {VERIFICATION_DIMENSIONS.map((dimension) => (
              <TableCell key={dimension}>
                <VerdictBadge verdict={row.verdicts[dimension]} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
