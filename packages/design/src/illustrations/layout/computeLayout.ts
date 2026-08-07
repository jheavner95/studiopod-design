import type { DiagramNode, DiagramLayoutKind } from "../types";
import type { LayoutOptions, LayoutResult } from "./types";
import { layoutHorizontal } from "./horizontal";
import { layoutVertical } from "./vertical";
import { layoutGrid } from "./grid";
import { layoutRadial } from "./radial";
import { layoutHubAndSpoke } from "./hubAndSpoke";

type LayoutFn = (nodes: DiagramNode[], options?: LayoutOptions) => LayoutResult;

const LAYOUTS: Record<DiagramLayoutKind, LayoutFn> = {
  horizontal: layoutHorizontal,
  vertical: layoutVertical,
  grid: layoutGrid,
  radial: layoutRadial,
  "hub-and-spoke": layoutHubAndSpoke,
};

/**
 * The one entry point every consumer calls. Nodes with an explicit
 * `position` win over the computed layout — the escape hatch for the rare
 * hand-authored diagram.
 */
export function computeLayout(
  nodes: DiagramNode[],
  kind: DiagramLayoutKind,
  options: LayoutOptions = {},
): LayoutResult {
  const layoutFn = LAYOUTS[kind] ?? layoutHorizontal;
  const result = layoutFn(nodes, options);

  const positions = { ...result.positions };
  let hasOverride = false;
  nodes.forEach((node) => {
    if (node.position) {
      positions[node.id] = node.position;
      hasOverride = true;
    }
  });

  if (!hasOverride) {
    return result;
  }

  return { ...result, positions };
}
