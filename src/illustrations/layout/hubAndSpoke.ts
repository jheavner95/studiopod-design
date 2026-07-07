import type { DiagramNode } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { DEFAULT_NODE_SIZE, DEFAULT_SPACING, DEFAULT_PADDING } from "./defaults";

/** The first node is the hub, centered above a row of spokes — for one-core-many-modules relationships. */
export function layoutHubAndSpoke(nodes: DiagramNode[], options: LayoutOptions = {}): LayoutResult {
  const nodeSize = options.nodeSize ?? DEFAULT_NODE_SIZE;
  const spacing = options.spacing ?? DEFAULT_SPACING;
  const padding = options.padding ?? DEFAULT_PADDING;

  const [hub, ...spokes] = nodes;
  const positions: LayoutResult["positions"] = {};

  if (!hub) {
    return { positions, width: padding * 2, height: padding * 2 };
  }

  const spokesWidth =
    spokes.length > 0 ? spokes.length * nodeSize.width + (spokes.length - 1) * spacing : 0;
  const width = Math.max(padding * 2 + nodeSize.width, padding * 2 + spokesWidth);
  const hubY = padding + nodeSize.height / 2;
  const spokeY = padding + nodeSize.height + spacing + nodeSize.height / 2;

  positions[hub.id] = { x: width / 2, y: hubY };

  const startX = width / 2 - spokesWidth / 2 + nodeSize.width / 2;
  spokes.forEach((node, index) => {
    positions[node.id] = {
      x: startX + index * (nodeSize.width + spacing),
      y: spokeY,
    };
  });

  const height = padding * 2 + nodeSize.height * 2 + spacing;
  return { positions, width, height };
}
