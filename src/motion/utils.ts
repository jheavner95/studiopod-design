/**
 * Pure, context-free helpers for turning motion tokens into framer-motion
 * Transition/Variants objects. Every primitive in `src/motion/primitives`
 * builds its animation through these instead of hand-rolling one — that's
 * what keeps "never hardcode a duration" actually true across fourteen
 * different components.
 *
 * These take no React state; primitives resolve `speed`/`scale` via
 * `useMotion()` and pass the numbers in here.
 */
import type { Transition, Variants } from "framer-motion";
import {
  motionDuration,
  motionDelay,
  motionDistance,
  motionScaleDelta,
  motionEase,
  type MotionDuration,
  type MotionDelay,
  type MotionDistance,
  type MotionEasing,
} from "./tokens";

/** Resolves a duration token (or a raw number, for the rare escape hatch) to seconds, adjusted for playback speed. */
export function resolveDuration(value: MotionDuration | number = "normal", speed = 1): number {
  const base = typeof value === "number" ? value : motionDuration[value];
  return speed > 0 ? base / speed : base;
}

/** Resolves a delay token to seconds, adjusted for playback speed. */
export function resolveDelay(value: MotionDelay | number = "none", speed = 1): number {
  const base = typeof value === "number" ? value : motionDelay[value];
  return speed > 0 ? base / speed : base;
}

/** Resolves a distance token to pixels, adjusted for the global motion scale (spatial amplitude). */
export function resolveDistance(value: MotionDistance | number = "medium", scale = 1): number {
  const base = typeof value === "number" ? value : motionDistance[value];
  return base * scale;
}

/** Resolves a distance token to a unitless scale delta (how far a Scale-family primitive starts from 1.0). */
export function resolveScaleDelta(value: MotionDistance | number = "medium", scale = 1): number {
  const base = typeof value === "number" ? value : motionScaleDelta[value];
  return base * scale;
}

/** Resolves an easing token to a cubic-bezier curve. */
export function resolveEase(value: MotionEasing = "standard") {
  return motionEase[value];
}

interface TransitionOptions {
  duration?: MotionDuration | number;
  delay?: MotionDelay | number;
  ease?: MotionEasing;
  speed?: number;
}

/** The core transition builder. Every primitive calls this instead of hand-rolling a Transition object. */
export function transition({ duration = "normal", delay = "none", ease = "standard", speed = 1 }: TransitionOptions = {}): Transition {
  return {
    duration: resolveDuration(duration, speed),
    delay: resolveDelay(delay, speed),
    ease: resolveEase(ease),
  };
}

interface StaggerOptions {
  each?: MotionDelay | number;
  delay?: MotionDelay | number;
  speed?: number;
}

/** Transition for a stagger container — staggerChildren/delayChildren, resolved from tokens. */
export function stagger({ each = "short", delay = "none", speed = 1 }: StaggerOptions = {}): Transition {
  return {
    staggerChildren: resolveDelay(each, speed),
    delayChildren: resolveDelay(delay, speed),
  };
}

interface SequenceOptions {
  gap?: MotionDelay | number;
  start?: MotionDelay | number;
  speed?: number;
}

/**
 * Delay offsets (seconds), one per item, for choreographing distinct,
 * differently-typed elements one after another — e.g. a node activating,
 * then its connector drawing in, then the next node. Use `stagger()`
 * instead when the children are identical and share one parent variant.
 */
export function sequence(count: number, { gap = "short", start = "none", speed = 1 }: SequenceOptions = {}): number[] {
  const gapSeconds = resolveDelay(gap, speed);
  const startSeconds = resolveDelay(start, speed);
  return Array.from({ length: count }, (_, index) => startSeconds + gapSeconds * index);
}

interface RepeatOptions {
  repeatType?: "loop" | "reverse" | "mirror";
  repeatDelay?: MotionDelay | number;
  speed?: number;
}

/** Wraps a resolved transition with infinite-repeat behavior. */
export function repeat(base: Transition, { repeatType = "loop", repeatDelay = "none", speed = 1 }: RepeatOptions = {}): Transition {
  return {
    ...base,
    repeat: Infinity,
    repeatType,
    repeatDelay: resolveDelay(repeatDelay, speed),
  };
}

interface FlowOptions {
  duration?: MotionDuration | number;
  speed?: number;
  loop?: boolean;
}

/** Preset transition for continuous "flow" motion — connectors, queues, publish loops. */
export function flow({ duration = "slow", speed = 1, loop = true }: FlowOptions = {}): Transition {
  const base = transition({ duration, ease: "flow", speed });
  return loop ? repeat(base, { speed }) : base;
}

interface PulseOptions {
  duration?: MotionDuration | number;
  amount?: MotionDistance | number;
  speed?: number;
  scale?: number;
}

/** A ready-made breathing pulse: scale + opacity, looping. Hand to `animate="idle"` on a motion element. */
export function pulse({ duration = "hero", amount = "small", speed = 1, scale = 1 }: PulseOptions = {}): Variants {
  const delta = resolveScaleDelta(amount, scale);
  return {
    idle: {
      scale: [1, 1 + delta, 1],
      opacity: [1, 0.85, 1],
      transition: repeat(transition({ duration, ease: "flow", speed }), { speed }),
    },
  };
}
