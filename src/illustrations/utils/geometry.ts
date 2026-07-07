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

export type RoutingStyle = "straight" | "orthogonal";

/** Builds an SVG path `d` string between two points, straight or elbowed (out horizontally, then vertically). */
export function buildConnectorPath(start: Point, end: Point, routing: RoutingStyle = "straight"): string {
  if (routing === "orthogonal") {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  }
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}
