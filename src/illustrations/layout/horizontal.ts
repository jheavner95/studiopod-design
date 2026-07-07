import type { DiagramNode } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { DEFAULT_NODE_SIZE, DEFAULT_SPACING, DEFAULT_PADDING } from "./defaults";

/** A single row, left to right. Node positions are each node's center point. */
export function layoutHorizontal(nodes: DiagramNode[], options: LayoutOptions = {}): LayoutResult {
  const nodeSize = options.nodeSize ?? DEFAULT_NODE_SIZE;
  const spacing = options.spacing ?? DEFAULT_SPACING;
  const padding = options.padding ?? DEFAULT_PADDING;

  const positions: LayoutResult["positions"] = {};
  nodes.forEach((node, index) => {
    positions[node.id] = {
      x: padding + index * (nodeSize.width + spacing) + nodeSize.width / 2,
      y: padding + nodeSize.height / 2,
    };
  });

  const width =
    nodes.length > 0
      ? padding * 2 + nodes.length * nodeSize.width + (nodes.length - 1) * spacing
      : padding * 2;
  const height = padding * 2 + nodeSize.height;

  return { positions, width, height };
}
