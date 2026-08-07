/**
 * Semantic motion tokens — the vocabulary every primitive in the motion
 * engine is built on. Nothing in `src/motion` or the illustration/
 * composition layers above it should hardcode a duration, delay, distance,
 * or easing curve; it should ask for "normal", "short", "medium", "standard".
 *
 * Mirrored as CSS custom properties in `src/styles/tokens.css` for the rare
 * case a plain CSS transition needs the same rhythm.
 */
import type { Easing } from "framer-motion";

export type MotionDuration = "instant" | "fast" | "normal" | "slow" | "hero";
export type MotionDelay = "none" | "short" | "medium" | "long";
export type MotionDistance = "micro" | "small" | "medium" | "large";
export type MotionEasing = "standard" | "enter" | "exit" | "flow" | "emphasis";

/** Seconds. */
export const motionDuration: Record<MotionDuration, number> = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.3,
  slow: 0.5,
  hero: 0.8,
};

/** Seconds. */
export const motionDelay: Record<MotionDelay, number> = {
  none: 0,
  short: 0.08,
  medium: 0.16,
  long: 0.32,
};

/** Pixels — for translate-based motion (Slide, Collapse/Expand's slight lift). */
export const motionDistance: Record<MotionDistance, number> = {
  micro: 4,
  small: 12,
  medium: 24,
  large: 48,
};

/**
 * Unitless — how far a Scale-family primitive starts from 1.0.
 * Keyed by the same semantic names as motionDistance so "small" always
 * means "the smallest effect that still reads," regardless of which
 * resolver interprets it.
 */
export const motionScaleDelta: Record<MotionDistance, number> = {
  micro: 0.02,
  small: 0.06,
  medium: 0.12,
  large: 0.25,
};

/**
 * Cubic-bezier curves. `readonly [number,number,number,number]` matches
 * framer-motion's BezierDefinition exactly, so these can be handed straight
 * to any `transition.ease`.
 */
export const motionEase: Record<MotionEasing, Easing> = {
  /** Confident, decelerating "arrive" curve. The general-purpose default. */
  standard: [0.16, 1, 0.3, 1],
  /** Snappier ease-out for things entering the screen. */
  enter: [0, 0, 0.2, 1],
  /** Accelerating ease-in for things leaving the screen. */
  exit: [0.4, 0, 1, 1],
  /** Symmetric ease-in-out for continuous or looping motion (connectors, queues). */
  flow: [0.65, 0, 0.35, 1],
  /** A slight overshoot — for moments that should draw the eye (Highlight, Activate). */
  emphasis: [0.34, 1.56, 0.64, 1],
};
