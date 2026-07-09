import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/table";
import { CELL_TYPES } from "../_data/cell-types";

/** The eleven documented cell types, rendered as a real Table — using the foundation system to document itself. */
export function CellTypesTable() {
  return (
    <Table minWidth="900px" caption="Cell types: alignment, wrapping, truncation, and accessibility guidance">
      <TableHeader>
        <TableRow>
          <TableHead>Cell type</TableHead>
          <TableHead>Alignment</TableHead>
          <TableHead>Wrapping</TableHead>
          <TableHead>Truncation</TableHead>
          <TableHead>Accessibility</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CELL_TYPES.map((cellType) => (
          <TableRow key={cellType.id}>
            <TableCell nowrap className="font-medium text-ink-primary">
              {cellType.name}
            </TableCell>
            <TableCell>{cellType.alignment}</TableCell>
            <TableCell>{cellType.wrapping}</TableCell>
            <TableCell>{cellType.truncation}</TableCell>
            <TableCell>{cellType.accessibility}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
