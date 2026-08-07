/**
 * Re-export, not a rebuild. Data Grid's own DataGridSearch (built in
 * DS-2.5.1) already covers this exactly — a width-constrained preset over
 * Foundation Forms' SearchInput, with nothing table-specific in its
 * implementation at all.
 */
export { DataGridSearch as AssetSearch } from "./DataGridSearch";
