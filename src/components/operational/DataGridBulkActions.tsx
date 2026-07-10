import type { ReactNode } from "react";
import { Inline } from "@/components/layout";
import { DataGridSelectionSummary } from "./DataGridSelection";

interface DataGridBulkActionsProps {
  count: number;
  onClear: () => void;
  children: ReactNode;
}

/**
 * The content of a bulk-action bar — a "N selected" summary plus a row of
 * action buttons. Meant to be passed as DataGridToolbar's bulkActions (which
 * renders it inside Foundation Table's own TableToolbar bulk mode) rather
 * than declaring its own bar chrome.
 */
export function DataGridBulkActions({ count, onClear, children }: DataGridBulkActionsProps) {
  return (
    <>
      <DataGridSelectionSummary count={count} onClear={onClear} />
      <Inline gap="sm">{children}</Inline>
    </>
  );
}
