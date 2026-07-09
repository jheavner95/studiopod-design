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
}

/**
 * The first real, non-demo use of Foundation Table anywhere in the codebase — this audit's own
 * matrices are built on it rather than a one-off hand-rolled table, which is exactly the adoption
 * this audit finds missing everywhere else.
 */
export function AuditMatrix<T>({ caption, columns, rows, rowKey }: AuditMatrixProps<T>) {
  return (
    <Table caption={caption}>
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
