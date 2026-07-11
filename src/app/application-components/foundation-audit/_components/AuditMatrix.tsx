import type { ReactNode } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/table";

export interface AuditMatrixColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface AuditMatrixProps<T> {
  caption: string;
  columns: AuditMatrixColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Overrides Table's 640px default floor — matrices with many columns or long-text cells need more room before horizontal scroll kicks in. */
  minWidth?: string;
}

/**
 * The first real, non-demo use of Foundation Table anywhere in the codebase — this audit's own
 * matrices are built on it rather than a one-off hand-rolled table, which is exactly the adoption
 * this audit finds missing everywhere else.
 */
export function AuditMatrix<T>({ caption, columns, rows, rowKey, minWidth }: AuditMatrixProps<T>) {
  return (
    <Table caption={caption} minWidth={minWidth}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={rowKey(row)}>
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
