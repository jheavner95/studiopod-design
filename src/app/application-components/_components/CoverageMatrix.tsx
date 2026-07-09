import { Table, TableHeader, TableHead, TableBody, TableRow, TableStatusCell } from "@/components/table";
import { COVERAGE_ROWS, PLATFORMS, type CoverageState } from "../_data/coverage";

const STATE_TONE: Record<CoverageState, "success" | "warning" | "neutral"> = {
  Used: "success",
  Partial: "warning",
  Planned: "neutral",
};

export function CoverageMatrix() {
  return (
    <Table
      minWidth="760px"
      caption="Platform coverage matrix: for each reusable component, whether it is used, partially used, or planned for each of StudioPOD’s 8 platforms."
    >
      <TableHeader sticky={false}>
        <tr>
          <TableHead sticky>Component</TableHead>
          {PLATFORMS.map((platform) => (
            <TableHead key={platform} className="px-3">
              {platform}
            </TableHead>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {COVERAGE_ROWS.map((row) => (
          <TableRow key={row.itemName}>
            <TableHead scope="row" sticky>
              <span className="text-body-sm font-medium text-ink-primary">{row.itemName}</span>
            </TableHead>
            {PLATFORMS.map((platform) => {
              const state = row.cells[platform];
              return <TableStatusCell key={platform} label={state} tone={STATE_TONE[state]} className="px-3" />;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
