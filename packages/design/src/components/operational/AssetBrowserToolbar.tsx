/**
 * Re-export, not a rebuild. Data Grid's own DataGridToolbar (built in
 * DS-2.5.1) already covers this exactly — a search/filter/view-toggle row
 * normally, an accent-tinted bulk-action bar once assets are selected —
 * with nothing table-specific in its own implementation (it delegates to
 * Foundation Table's TableToolbar underneath either way).
 */
export { DataGridToolbar as AssetBrowserToolbar } from "./DataGridToolbar";
