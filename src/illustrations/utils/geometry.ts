export interface Point {
  x: number;
  y: number;
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function angleBetween(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

/** The point on a circle of `radius` centered at `center`, in the direction of `toward`. */
export function pointOnCircle(center: Point, radius: number, toward: Point): Point {
  const angle = angleBetween(center, toward);
  return { x: center.x + radius * Math.cos(angle), y: center.y + radius * Math.sin(angle) };
}

export interface ConnectorAnchor {
  start: Point;
  end: Point;
}

/**
 * Where a connector should actually start and end: the edge of the source
 * node's circle to the edge of the target node's circle, so lines touch
 * node boundaries instead of passing through their icons.
 */
export function computeConnectorAnchor(
  sourceCenter: Point,
  targetCenter: Point,
  sourceRadius: number,
  targetRadius: number,
): ConnectorAnchor {
  return {
    start: pointOnCircle(sourceCenter, sourceRadius, targetCenter),
    end: pointOnCircle(targetCenter, targetRadius, sourceCenter),
  };
}

export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** The point a fraction `t` (0-1) of the way from a to b. t=0.5 is the midpoint. */
export function pointAlongLine(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/**
 * A point on the a-b line (its midpoint, by default), nudged off the line
 * by `distance`. For a roughly horizontal connector, this pulls the label
 * up, away from the node-label band that always sits below nodes. For a
 * steep/vertical connector between closely stacked nodes, there is often
 * no safe point *on* the line at all — both endpoints' label zones can
 * meet in the middle of a short vertical gap — so the label instead moves
 * out to the side, far enough to clear a label's own half-width. Pass
 * `from` (e.g. a `pointAlongLine` result) to offset a different point
 * along the same line direction, for spreading multiple edges that share
 * an endpoint instead of stacking them all on the exact midpoint.
 */
export function offsetAlongPerpendicular(a: Point, b: Point, distance: number, from: Point = midpoint(a, b)): Point {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (Math.abs(dy) > Math.abs(dx)) {
    const side = dx >= 0 ? -1 : 1;
    return { x: from.x + side * distance * 2.5, y: from.y - distance * 0.3 };
  }

  const length = Math.hypot(dx, dy) || 1;
  let px = -dy / length;
  let py = dx / length;
  if (py > 0) {
    px = -px;
    py = -py;
  }
  const blendedX = px * 0.6;
  const blendedY = py * 0.6 - 0.45;
  const blendLength = Math.hypot(blendedX, blendedY) || 1;
  return { x: from.x + (blendedX / blendLength) * distance, y: from.y + (blendedY / blendLength) * distance };
}

export type RoutingStyle = "straight" | "orthogonal";

/** Builds an SVG path `d` string between two points, straight or elbowed (out horizontally, then vertically). */
export function buildConnectorPath(start: Point, end: Point, routing: RoutingStyle = "straight"): string {
  if (routing === "orthogonal") {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  }
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}
