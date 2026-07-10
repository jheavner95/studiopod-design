/**
 * Re-export, not a rebuild. Data Grid's own DataGridSelection helpers
 * (built in DS-2.5.1) already cover this — plain Set<string> operations
 * over any T[] + getRowId, with nothing table-specific in their
 * implementation. Reused unchanged for Asset Browser's own grid/list
 * selection rather than a second set of identical helpers.
 */
export {
  useDataGridSelection as useAssetSelection,
  DataGridSelectionSummary as AssetSelectionSummary,
  toggleSelection,
  selectAll,
  isAllSelected,
  isPartiallySelected,
} from "./DataGridSelection";
