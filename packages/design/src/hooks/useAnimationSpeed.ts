"use client";

import { useMotion } from "./useMotion";
import type { PlaybackSpeed } from "@/providers/MotionProvider";

/** A slice of useMotion() for the common case of just reading/setting playback speed. */
export function useAnimationSpeed(): { speed: PlaybackSpeed; setSpeed: (value: PlaybackSpeed) => void } {
  const { speed, setSpeed } = useMotion();
  return { speed, setSpeed };
}
