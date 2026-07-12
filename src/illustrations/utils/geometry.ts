import type { ConnectionDirection } from "../types";

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

/**
 * Extra distance added to a node's bare radius when computing where a
 * connector should stop — covers the node's own border stroke plus a small
 * visible gap, so lines never appear to touch (let alone continue under) a
 * node's rendered edge. Applied to every connector endpoint uniformly.
 */
export const NODE_BOUNDARY_CLEARANCE = 3;

/**
 * Additional clearance for a node that's currently selected or in an
 * active/processing status: `Activate` (src/motion/primitives/Activate.tsx)
 * scales those nodes to 1.05x and adds a 6px glow ring via box-shadow,
 * both of which sit outside the node's own layout box (and therefore
 * outside its bare `radius`). Using this wider clearance for those nodes
 * is the "outer visible radius" the ring/glow renders at, not the node's
 * static size.
 */
export const SELECTION_RING_CLEARANCE = 8;

/**
 * Extra pullback for whichever endpoint(s) will render an arrowhead
 * marker. `ConnectionArrow`'s marker (refX=8 of a 0–10 viewBox, tip at
 * x=10) overhangs its path vertex by a couple of px scaled by stroke
 * width; a flat clearance reads as more visually consistent across every
 * connector than a stroke-proportional one, and comfortably covers the
 * realistic overhang range plus a visible gap before the node border.
 */
export const ARROWHEAD_CLEARANCE = 6;

/**
 * The point on a circle of `radius` centered at `center`, in the direction
 * of `toward`, pulled back by `clearance` (border width, selection ring,
 * arrowhead, etc). Works for any angle — derived from the normalized
 * direction vector between the two points, never a hardcoded axis.
 */
export function getNodeBoundaryPoint(center: Point, radius: number, toward: Point, clearance = 0): Point {
  const angle = angleBetween(center, toward);
  const offset = radius + clearance;
  return { x: center.x + offset * Math.cos(angle), y: center.y + offset * Math.sin(angle) };
}

export interface ConnectorEndpoints {
  start: Point;
  end: Point;
}

export interface ConnectorEndpointOptions {
  /** Extra clearance for the source node's boundary (border + ring/glow when selected or active). */
  sourceClearance?: number;
  /** Extra clearance for the target node's boundary (border + ring/glow when selected or active). */
  targetClearance?: number;
  /** Which end(s) will render an arrowhead marker — pulls that endpoint back by ARROWHEAD_CLEARANCE. */
  direction?: ConnectionDirection;
}

/**
 * Where a connector should actually start and end: the visible edge of the
 * source node's circle to the visible edge of the target node's circle —
 * never the raw centers — so lines touch node boundaries instead of
 * passing through their icons. Every clearance source (border width,
 * selection/active ring, arrowhead) is folded into one offset per
 * endpoint, computed from the normalized source→target direction vector,
 * so the math is identical at any angle.
 *
 * This is the one shared entry point every connector-drawing primitive in
 * the Illustration Engine consumes — no component computes its own
 * center-to-center line or duplicates this offset logic.
 */
export function getConnectorEndpoints(
  sourceCenter: Point,
  targetCenter: Point,
  sourceRadius: number,
  targetRadius: number,
  options: ConnectorEndpointOptions = {},
): ConnectorEndpoints {
  const { sourceClearance = 0, targetClearance = 0, direction = "forward" } = options;
  const hasStartArrow = direction === "backward" || direction === "bidirectional";
  const hasEndArrow = direction !== "backward";

  const sourceOffset = NODE_BOUNDARY_CLEARANCE + sourceClearance + (hasStartArrow ? ARROWHEAD_CLEARANCE : 0);
  const targetOffset = NODE_BOUNDARY_CLEARANCE + targetClearance + (hasEndArrow ? ARROWHEAD_CLEARANCE : 0);

  return {
    start: getNodeBoundaryPoint(sourceCenter, sourceRadius, targetCenter, sourceOffset),
    end: getNodeBoundaryPoint(targetCenter, targetRadius, sourceCenter, targetOffset),
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

export interface ConnectorObstacle {
  center: Point;
  /** The obstacle node's own effective radius (bare radius + its clearance, if it's selected/active). */
  radius: number;
}

/** Perpendicular (signed) distance from `point` to the infinite line through `a`→`b`, and the projection parameter `t` of its closest point on that line. */
function closestPointOnSegment(a: Point, b: Point, point: Point): { t: number; distance: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return { t: 0, distance: distance(a, point) };
  const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSq));
  const closest = { x: a.x + t * dx, y: a.y + t * dy };
  return { t, distance: distance(closest, point) };
}

/**
 * Whether a straight connector from `start` to `end` would visually pass
 * through any node that isn't its own source/target, and if so, the
 * control point for a quadratic-bezier curve that bows just far enough
 * around the worst offender to clear it. Returns `null` when the straight
 * line is already clear — the common case for a simple chain.
 *
 * This is what actually fixes a "skip" connector (e.g. Stage 1 straight to
 * Stage 3, jumping over a parallel Stage 2 node laid out on the same row):
 * boundary-correct endpoints alone don't help when an *unrelated* third
 * node's circle sits on the line between them. Curving around it — rather
 * than letting the node's own opaque fill paint over the straight
 * line underneath — means the geometry is actually correct at every
 * point along the path, not just visually hidden by paint order.
 */
export function computeObstructionCurve(start: Point, end: Point, obstacles: ConnectorObstacle[]): Point | null {
  const clearance = NODE_BOUNDARY_CLEARANCE * 2;
  let worstPenetration = 0;
  let worstObstacle: ConnectorObstacle | null = null;

  for (const obstacle of obstacles) {
    const { t, distance: perpDistance } = closestPointOnSegment(start, end, obstacle.center);
    // Only obstacles the segment actually passes alongside (not off one end) can occlude it.
    if (t <= 0.02 || t >= 0.98) continue;
    const penetration = obstacle.radius + clearance - perpDistance;
    if (penetration > worstPenetration) {
      worstPenetration = penetration;
      worstObstacle = obstacle;
    }
  }

  if (!worstObstacle || worstPenetration <= 0) return null;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  // Perpendicular unit vector to the source→target direction.
  let px = -dy / length;
  let py = dx / length;
  // Bow away from the obstacle: if the obstacle sits on the perpendicular's
  // positive side, curve toward the negative side, and vice versa.
  const toObstacleX = worstObstacle.center.x - start.x;
  const toObstacleY = worstObstacle.center.y - start.y;
  const side = px * toObstacleX + py * toObstacleY;
  if (side > 0) {
    px = -px;
    py = -py;
  }

  const bow = worstPenetration + NODE_BOUNDARY_CLEARANCE;
  const mid = midpoint(start, end);
  // A quadratic curve's midpoint sits halfway between its control point
  // and the line's own midpoint, so the control point must overshoot the
  // desired bow by 2x for the curve itself to actually clear by `bow`.
  return { x: mid.x + px * bow * 2, y: mid.y + py * bow * 2 };
}

export type RoutingStyle = "straight" | "orthogonal" | "curved";

/** Builds an SVG path `d` string between two points — straight, elbowed (grid layouts), or a quadratic curve bowed around an obstruction. */
export function buildConnectorPath(start: Point, end: Point, routing: RoutingStyle = "straight", controlPoint?: Point): string {
  if (routing === "orthogonal") {
    const midX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} L ${midX} ${start.y} L ${midX} ${end.y} L ${end.x} ${end.y}`;
  }
  if (routing === "curved" && controlPoint) {
    return `M ${start.x} ${start.y} Q ${controlPoint.x} ${controlPoint.y} ${end.x} ${end.y}`;
  }
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}
