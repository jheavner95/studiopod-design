import type { ReactNode } from "react";
import type { MotionDuration, MotionDelay, MotionDistance } from "../tokens";

/**
 * The shared contract every motion primitive accepts. Individual
 * primitives only destructure the fields they actually use — a primitive
 * with no spatial component (Fade, Crossfade) still types `distance` as
 * accepted, it just ignores it, so callers can treat every primitive the
 * same way.
 */
export interface MotionPrimitiveProps {
  duration?: MotionDuration | number;
  delay?: MotionDelay | number;
  distance?: MotionDistance | number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}
