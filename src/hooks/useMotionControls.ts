"use client";

import { useMotion } from "./useMotion";
import type { PlaybackSpeed } from "@/providers/MotionProvider";

/** The imperative control surface a playback toolbar (Play/Pause/Replay/speed/reduced motion) wires up to. */
export function useMotionControls() {
  const {
    paused,
    setPaused,
    togglePaused,
    replay,
    speed,
    setSpeed,
    reducedMotionOverride,
    setReducedMotionOverride,
    scale,
    setScale,
  } = useMotion();

  return {
    paused,
    setPaused,
    togglePaused,
    replay,
    speed,
    setSpeed: (value: PlaybackSpeed) => setSpeed(value),
    reducedMotionOverride,
    setReducedMotionOverride,
    scale,
    setScale,
  };
}
