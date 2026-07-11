import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/table";
import { Badge, Body } from "@/components/ui";
import { FINAL_SCORECARD, type FinalVerdict } from "../_data/final-scorecard";

const VERDICT_TONE: Record<FinalVerdict, "success" | "warning" | "error"> = {
  Pass: "success",
  Partial: "warning",
  Fail: "error",
};

function VerdictBadge({ verdict }: { verdict: FinalVerdict }) {
  return (
    <Badge tone={VERDICT_TONE[verdict]} size="sm">
      {verdict}
    </Badge>
  );
}

/** The eleven-dimension final scorecard — one row per dimension, not a tier matrix, since this page synthesizes across all nine tiers rather than re-scoring any one of them. */
export function FinalScorecard() {
  return (
    <Table caption="DS-6.5 Final Enterprise Certification scorecard, eleven dimensions" minWidth="720px">
      <TableHeader>
        <TableRow>
          <TableHead>Dimension</TableHead>
          <TableHead>Verdict</TableHead>
          <TableHead>Evidence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {FINAL_SCORECARD.map((row) => (
          <TableRow key={row.dimension}>
            <TableCell nowrap className="align-top font-medium text-ink-primary">
              {row.dimension}
            </TableCell>
            <TableCell className="align-top">
              <VerdictBadge verdict={row.verdict} />
            </TableCell>
            <TableCell className="align-top">
              <Body size="sm" muted>
                {row.evidence}
              </Body>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
