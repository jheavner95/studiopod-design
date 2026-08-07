import type { Platform, PlatformLayer, PlatformArchitecture } from "../types";

export interface LayerGroup {
  layer: PlatformLayer;
  platforms: Platform[];
}

/** Groups an architecture's platforms by their layer, ordered by PlatformLayer.order (falling back to array order). */
export function groupPlatformsByLayer(architecture: PlatformArchitecture): LayerGroup[] {
  const layers = architecture.layers ?? [];
  const ordered = [...layers].sort((a, b) => (a.order ?? layers.indexOf(a)) - (b.order ?? layers.indexOf(b)));

  return ordered.map((layer) => ({
    layer,
    platforms: architecture.platforms.filter((platform) => platform.layer === layer.id),
  }));
}
