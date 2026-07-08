import type { LayoutNodeSize } from "./types";

export const DEFAULT_NODE_SIZE: LayoutNodeSize = { width: 96, height: 96 };
/**
 * Center-to-center gap beyond each node's own size. Sized so that even a
 * node's full-width label (see IllustrationNode's per-size max-width)
 * clears its neighbor's label with a comfortable gutter, not just the
 * node icons themselves.
 */
export const DEFAULT_SPACING = 96;
export const DEFAULT_PADDING = 28;
