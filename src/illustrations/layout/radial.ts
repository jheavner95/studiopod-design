import type { DiagramNode } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { DEFAULT_NODE_SIZE, DEFAULT_PADDING } from "./defaults";

/** Nodes distributed evenly around a circle, starting at 12 o'clock — for peer/cyclic relationships with no distinguished center. */
export function layoutRadial(nodes: DiagramNode[], options: LayoutOptions = {}): LayoutResult {
  const nodeSize = options.nodeSize ?? DEFAULT_NODE_SIZE;
  const padding = options.padding ?? DEFAULT_PADDING;
  const count = nodes.length;
  const radius = options.spacing ? options.spacing * Math.max(1, count / 2) : Math.max(80, count * 28);

  const centerX = padding + radius + nodeSize.width / 2;
  const centerY = padding + radius + nodeSize.height / 2;

  const positions: LayoutResult["positions"] = {};
  nodes.forEach((node, index) => {
    const angle = (index / Math.max(count, 1)) * Math.PI * 2 - Math.PI / 2;
    positions[node.id] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const size = padding * 2 + radius * 2 + nodeSize.width;
  return { positions, width: size, height: size };
}
