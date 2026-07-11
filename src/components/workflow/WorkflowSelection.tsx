/**
 * Re-export plus one thin composition, not a rebuild. Every gallery demo
 * in DS-3.1–3.7 formalized single selection with ad hoc onClick + useState;
 * nothing in this tier owns a real multi-select model. Rather than invent
 * one, this reuses Data Grid's own DataGridSelection helpers (plain
 * Set<string> operations over any T[] + getRowId, already generic — the
 * same reuse Asset Browser's own AssetSelection.tsx already made) plus
 * Bulk Actions System's own BulkActionBar, whose doc comment explicitly
 * scopes it "for any selection context: AssetGrid's cards, a Filter &
 * Search result list, or a table row" — a workflow canvas's own selected
 * nodes are exactly one more such context.
 */
export {
  useDataGridSelection as useWorkflowSelection,
  toggleSelection,
  selectAll,
  isAllSelected,
  isPartiallySelected,
} from "@/components/operational";
export { BulkActionBar as WorkflowSelection } from "@/components/operational";
