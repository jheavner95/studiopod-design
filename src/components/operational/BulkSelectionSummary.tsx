/**
 * Re-export, not a rebuild. Data Grid's own DataGridSelectionSummary (built
 * in DS-2.5.1) already covers this exactly — a "N selected" line plus a
 * Clear action, with nothing table-specific in its implementation. Reused
 * unchanged under a family-appropriate name, the same precedent AssetSearch/
 * SearchField already established for DataGridSearch.
 */
export { DataGridSelectionSummary as BulkSelectionSummary } from "./DataGridSelection";
