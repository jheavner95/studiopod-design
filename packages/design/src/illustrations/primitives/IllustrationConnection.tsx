"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { useMotion, useMotionEnabled } from "@/hooks";
import { transition } from "@/motion";
import { buildConnectorPath, type Point, type RoutingStyle } from "../utils";
import { ConnectionArrow } from "./ConnectionArrow";
import { useIllustrationDev } from "../dev";
import type { DiagramConnection, ConnectionStatus, ConnectionStyle } from "../types";

export interface IllustrationConnectionProps {
  connection: DiagramConnection;
  start: Point;
  end: Point;
  routing?: RoutingStyle;
  /** Required when `routing="curved"` — the quadratic-bezier control point that bows the path around an obstructing node. */
  controlPoint?: Point;
}

const STATUS_COLOR: Record<ConnectionStatus, string> = {
  inactive: "var(--color-border-strong)",
  active: "var(--color-accent-500)",
  flowing: "var(--color-accent-500)",
  highlighted: "var(--color-accent-300)",
  disabled: "var(--color-border-subtle)",
};

const DASH_ARRAY: Record<ConnectionStyle, string | undefined> = {
  solid: undefined,
  dashed: "6 6",
  dotted: "2 6",
};

/** One connector between two computed anchor points — the base always-visible line, plus an emphasized accent overlay that draws in when flowing. */
export function IllustrationConnection({
  connection,
  start,
  end,
  routing = "straight",
  controlPoint,
}: IllustrationConnectionProps) {
  const markerId = useId().replace(/:/g, "");
  const motionEnabled = useMotionEnabled();
  const { speed } = useMotion();
  const dev = useIllustrationDev();

  const status = connection.status ?? "inactive";
  const isEmphasized =
    status === "active" || status === "flowing" || status === "highlighted" || Boolean(connection.highlighted);
  const shouldAnimate = isEmphasized && (connection.animated ?? true) && motionEnabled;
  const color = STATUS_COLOR[status];
  const strokeWidth = 1 + (connection.weight ?? 1) * 0.5;
  const path = buildConnectorPath(start, end, routing, controlPoint);

  const hasEndArrow = connection.direction !== "backward";
  const hasStartArrow = connection.direction === "backward" || connection.direction === "bidirectional";
  const arrowUrl = `url(#arrow-${markerId})`;

  return (
    <g>
      <defs>
        <ConnectionArrow id={`arrow-${markerId}`} color={isEmphasized ? color : "var(--color-border-strong)"} />
      </defs>

      <path
        d={path}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={strokeWidth}
        strokeDasharray={DASH_ARRAY[connection.style ?? "solid"]}
        opacity={status === "disabled" ? 0.35 : 1}
        markerEnd={!isEmphasized && hasEndArrow ? arrowUrl : undefined}
        markerStart={!isEmphasized && hasStartArrow ? arrowUrl : undefined}
      />

      {isEmphasized ? (
        shouldAnimate ? (
          <motion.path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            markerEnd={hasEndArrow ? arrowUrl : undefined}
            markerStart={hasStartArrow ? arrowUrl : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={transition({ duration: "slow", ease: "flow", speed })}
          />
        ) : (
          <path
            d={path}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            markerEnd={hasEndArrow ? arrowUrl : undefined}
            markerStart={hasStartArrow ? arrowUrl : undefined}
          />
        )
      ) : null}

      {dev.connectorRouting ? (
        <path d={path} fill="none" stroke="var(--color-accent-300)" strokeWidth={1} strokeDasharray="2 4" opacity={0.6} />
      ) : null}
      {dev.animationPaths && shouldAnimate ? (
        <path d={path} fill="none" stroke="var(--color-warning)" strokeWidth={1} strokeDasharray="1 3" opacity={0.5} />
      ) : null}
    </g>
  );
}
