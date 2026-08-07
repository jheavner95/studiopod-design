import type { DiagramNode } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { DEFAULT_NODE_SIZE, DEFAULT_SPACING, DEFAULT_PADDING } from "./defaults";

/** A single column, top to bottom. Node positions are each node's center point. */
export function layoutVertical(nodes: DiagramNode[], options: LayoutOptions = {}): LayoutResult {
  const nodeSize = options.nodeSize ?? DEFAULT_NODE_SIZE;
  const spacing = options.spacing ?? DEFAULT_SPACING;
  const padding = options.padding ?? DEFAULT_PADDING;

  const positions: LayoutResult["positions"] = {};
  nodes.forEach((node, index) => {
    positions[node.id] = {
      x: padding + nodeSize.width / 2,
      y: padding + index * (nodeSize.height + spacing) + nodeSize.height / 2,
    };
  });

  const height =
    nodes.length > 0
      ? padding * 2 + nodes.length * nodeSize.height + (nodes.length - 1) * spacing
      : padding * 2;
  const width = padding * 2 + nodeSize.width;

  return { positions, width, height };
}
