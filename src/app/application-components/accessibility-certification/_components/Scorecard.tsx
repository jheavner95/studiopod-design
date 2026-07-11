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

/** The two-tier x six-dimension accessibility scorecard, built on Foundation Table directly — the same primitive every other tier's own certification scorecard already composes from. */
export function Scorecard() {
  return (
    <Table caption="Accessibility & Interaction Quality certification scorecard, two tiers by six verification dimensions" minWidth="900px">
      <TableHeader>
        <TableRow>
          <TableHead>Tier</TableHead>
          {VERIFICATION_DIMENSIONS.map((dimension) => (
            <TableHead key={dimension}>{dimension}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {SCORECARD.map((row) => (
          <TableRow key={row.tier}>
            <TableCell nowrap className="font-medium text-ink-primary">
              {row.tier}
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
