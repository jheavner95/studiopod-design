import type { DiagramNode } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { DEFAULT_NODE_SIZE, DEFAULT_SPACING, DEFAULT_PADDING } from "./defaults";

/** Row-major grid. Column count is explicit, or derived from `width`, or falls back to a square-ish default. */
export function layoutGrid(nodes: DiagramNode[], options: LayoutOptions = {}): LayoutResult {
  const nodeSize = options.nodeSize ?? DEFAULT_NODE_SIZE;
  const spacing = options.spacing ?? DEFAULT_SPACING;
  const padding = options.padding ?? DEFAULT_PADDING;

  const columns =
    options.columns ??
    (options.width
      ? Math.max(1, Math.floor((options.width - padding * 2 + spacing) / (nodeSize.width + spacing)))
      : Math.max(1, Math.ceil(Math.sqrt(nodes.length))));

  const positions: LayoutResult["positions"] = {};
  nodes.forEach((node, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    positions[node.id] = {
      x: padding + col * (nodeSize.width + spacing) + nodeSize.width / 2,
      y: padding + row * (nodeSize.height + spacing) + nodeSize.height / 2,
    };
  });

  const usedColumns = Math.min(columns, Math.max(nodes.length, 1));
  const rows = Math.max(1, Math.ceil(nodes.length / columns));
  const width = padding * 2 + usedColumns * nodeSize.width + (usedColumns - 1) * spacing;
  const height = padding * 2 + rows * nodeSize.height + (rows - 1) * spacing;

  return { positions, width, height };
}
