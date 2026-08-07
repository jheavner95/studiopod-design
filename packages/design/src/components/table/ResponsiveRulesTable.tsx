import type { ReactNode } from "react";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";

export interface ResponsiveRulesTableColumn {
  id: string;
  label: string;
}

/** One row — a named dimension plus a value per column, keyed by column id. */
export type ResponsiveRulesTableRow = {
  dimension: string;
} & Record<string, ReactNode>;

interface ResponsiveRulesTableProps {
  /** Announced to screen readers; visually hidden — state what the table documents and across which columns. */
  caption: string;
  rows: ResponsiveRulesTableRow[];
  /** Defaults to the three-breakpoint shape every current consumer uses; override for a different column set. */
  columns?: ResponsiveRulesTableColumn[];
  /** Header label for the sticky first column. */
  dimensionLabel?: string;
}

const DEFAULT_COLUMNS: ResponsiveRulesTableColumn[] = [
  { id: "desktop", label: "Desktop" },
  { id: "tablet", label: "Tablet" },
  { id: "mobile", label: "Mobile" },
];

/**
 * A matrix table for documenting how a set of dimensions behaves across breakpoints (or any other
 * small column set) — one row per dimension, a sticky first column naming it. Generalizes the
 * ResponsiveRulesTable pattern that was hand-rolled identically across workspace-layout,
 * workspace-toolbar, and primary-workspace (DS-2.1.7.2) — not tied to any one page's terminology,
 * so a future documentation page can reuse it for its own dimensions and columns.
 */
export function ResponsiveRulesTable({ caption, rows, columns = DEFAULT_COLUMNS, dimensionLabel = "Dimension" }: ResponsiveRulesTableProps) {
  return (
    <Table minWidth="760px" caption={caption}>
      <TableHeader sticky={false}>
        <tr>
          <TableHead sticky>{dimensionLabel}</TableHead>
          {columns.map((column) => (
            <TableHead key={column.id}>{column.label}</TableHead>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.dimension}>
            <TableHead scope="row" sticky className="whitespace-normal text-body-sm font-medium text-ink-primary">
              {row.dimension}
            </TableHead>
            {columns.map((column) => (
              <TableCell key={column.id}>{row[column.id]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
