/**
 * The canonical general-purpose search field — Data Grid's own DataGridSearch
 * is already a fully generic preset over Foundation Forms' SearchInput (no
 * grid-specific behavior in its implementation), so the Filter & Search
 * System reuses it directly under a family-appropriate name rather than a
 * second identical wrapper.
 */
export { DataGridSearch as SearchField } from "./DataGridSearch";
