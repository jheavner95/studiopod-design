/**
 * Re-export, not a rebuild. Data Grid's own DataGridEmptyState (a real
 * <tr><td>, the only valid DOM shape inside a <tbody>, with No data/No
 * results/Error variant presets) already covers this exactly — Queue's own
 * table body needs the identical shape — so this system reuses it directly.
 */
export { DataGridEmptyState as QueueEmptyState, type DataGridEmptyVariant as QueueEmptyVariant } from "./DataGridEmptyState";
