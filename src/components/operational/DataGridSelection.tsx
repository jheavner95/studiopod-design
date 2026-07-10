"use client";

import { useCallback, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Body, Button } from "@/components/ui";

export function toggleSelection(selected: Set<string>, id: string): Set<string> {
  const next = new Set(selected);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function selectAll<T>(rows: T[], getRowId: (row: T) => string): Set<string> {
  return new Set(rows.map(getRowId));
}

export function isAllSelected<T>(rows: T[], getRowId: (row: T) => string, selected: Set<string>): boolean {
  return rows.length > 0 && rows.every((row) => selected.has(getRowId(row)));
}

export function isPartiallySelected<T>(rows: T[], getRowId: (row: T) => string, selected: Set<string>): boolean {
  return selected.size > 0 && !isAllSelected(rows, getRowId, selected);
}

interface UseDataGridSelectionResult {
  selectedIds: Set<string>;
  setSelectedIds: (ids: Set<string>) => void;
  clear: () => void;
}

/** Uncontrolled selection state for a standalone DataGrid — pass selectedIds/onSelectionChange directly to DataGrid instead if the caller already owns this state one level up (e.g. to sync with a page-level bulk-action bar). */
export function useDataGridSelection(): UseDataGridSelectionResult {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const clear = useCallback(() => setSelectedIds(new Set()), []);
  return { selectedIds, setSelectedIds, clear };
}

interface DataGridSelectionSummaryProps {
  count: number;
  onClear?: () => void;
  className?: string;
}

/** "12 selected" plus a clear action — the text half of Foundation Table's TableToolbar bulk mode, paired with DataGridBulkActions' action buttons. */
export function DataGridSelectionSummary({ count, onClear, className }: DataGridSelectionSummaryProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Body size="sm" className="font-medium text-ink-primary">
        {count} selected
      </Body>
      {onClear ? (
        <Button size="sm" variant="ghost" leadingIcon={<X className="size-3.5" />} onClick={onClear}>
          Clear
        </Button>
      ) : null}
    </div>
  );
}
