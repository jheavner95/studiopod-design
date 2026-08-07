export interface LayoutNodeSize {
  width: number;
  height: number;
}

export interface LayoutOptions {
  /** Assumed bounding box per node, used for spacing math. */
  nodeSize?: LayoutNodeSize;
  /** Base gap between nodes, in px. */
  spacing?: number;
  /** Outer padding around the whole layout, in px. */
  padding?: number;
  /** Available width — used by the grid layout to compute a column count. */
  width?: number;
  /** Explicit column count for the grid layout. Computed from `width` if omitted. */
  columns?: number;
}

export interface LayoutResult {
  /** The center point of each node, keyed by node id. */
  positions: Record<string, { x: number; y: number }>;
  width: number;
  height: number;
}

export type Breakpoint = "desktop" | "tablet" | "mobile";
