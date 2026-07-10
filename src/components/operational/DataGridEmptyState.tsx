import type { ReactNode } from "react";
import { TableEmptyState } from "@/components/table";

export type DataGridEmptyVariant = "no-data" | "no-results" | "error";

const VARIANT_DEFAULTS: Record<DataGridEmptyVariant, { title: string; description: string }> = {
  "no-data": { title: "No data yet", description: "Nothing has been added here." },
  "no-results": { title: "No results", description: "Try a different search or filter." },
  error: { title: "Failed to load", description: "Check your connection and try again." },
};

interface DataGridEmptyStateProps {
  variant?: DataGridEmptyVariant;
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  /** Pass the grid's real column count (including the selection column, if any) so the row spans the full width. */
  colSpan: number;
  className?: string;
}

/**
 * The in-grid empty row — delegates entirely to Foundation Table's own
 * TableEmptyState (a real <tr><td>, the only valid DOM shape inside a
 * <tbody>) rather than Foundation Feedback's EmptyState, which renders a
 * plain <div> and isn't valid table markup. Adds the No data/No
 * results/Error variant presets DataGrid's states call for.
 */
export function DataGridEmptyState({ variant = "no-data", title, description, action, colSpan, className }: DataGridEmptyStateProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  return (
    <TableEmptyState title={title ?? defaults.title} description={description ?? defaults.description} action={action} colSpan={colSpan} className={className} />
  );
}
