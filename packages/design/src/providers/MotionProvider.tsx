"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { MotionPreferenceProvider, useMotionPreference } from "@/components/motion/MotionPreference";

export interface MotionDiagnostics {
  bounds: boolean;
  origins: boolean;
  timingLabels: boolean;
  frameDiagnostics: boolean;
}

const defaultDiagnostics: MotionDiagnostics = {
  bounds: false,
  origins: false,
  timingLabels: false,
  frameDiagnostics: false,
};

export type PlaybackSpeed = 0.5 | 1 | 2;

export interface MotionContextValue {
  /** Spatial amplitude multiplier — scales the distance/scale-delta tokens. Independent of playback speed. */
  scale: number;
  setScale: (value: number) => void;
  /** Temporal multiplier — 0.5x / 1x / 2x. Every resolved duration/delay is divided by this. */
  speed: PlaybackSpeed;
  setSpeed: (value: PlaybackSpeed) => void;
  /** Global soft-pause: looping primitives freeze; one-shot primitives skip animating. */
  paused: boolean;
  setPaused: (value: boolean) => void;
  togglePaused: () => void;
  /** Explicit override, mirrors MotionPreferenceProvider's own prop. null defers to the OS setting. */
  reducedMotionOverride: boolean | null;
  setReducedMotionOverride: (value: boolean | null) => void;
  /** Resolved reduced-motion state (override ?? OS preference) — the single source of truth. */
  reducedMotion: boolean;
  diagnostics: MotionDiagnostics;
  setDiagnostic: (key: keyof MotionDiagnostics, value: boolean) => void;
  /** Bumped by replay(); demo instances can key off this to force a remount and re-trigger their entrance. */
  replayKey: number;
  replay: () => void;
}

/**
 * Raw context object. Prefer the hooks in `src/hooks` (useMotion,
 * useAnimationSpeed, useMotionEnabled, useReducedMotion, useMotionControls)
 * over consuming this directly — they're the intended public API.
 */
export const MotionContext = createContext<MotionContextValue | null>(null);

interface BridgeProps {
  children: ReactNode;
  base: Omit<MotionContextValue, "reducedMotion">;
}

/** Reads the resolved reduced-motion state from MotionPreferenceProvider (rendered by the parent) so there's exactly one source of truth for "is motion allowed" across old and new primitives alike. */
function MotionContextBridge({ children, base }: BridgeProps) {
  const reducedMotion = useMotionPreference();
  const value = useMemo<MotionContextValue>(() => ({ ...base, reducedMotion }), [base, reducedMotion]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/**
 * The global motion engine. Wraps the app once (see src/app/layout.tsx) so
 * every component, anywhere, can read/control playback speed, spatial
 * scale, pause state, reduced motion, and developer diagnostics from one
 * place. Internally renders MotionPreferenceProvider — the accessibility
 * override built in MS-1 — rather than reimplementing it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [paused, setPaused] = useState(false);
  const [reducedMotionOverride, setReducedMotionOverride] = useState<boolean | null>(null);
  const [diagnostics, setDiagnostics] = useState<MotionDiagnostics>(defaultDiagnostics);
  const [replayKey, setReplayKey] = useState(0);

  const togglePaused = useCallback(() => setPaused((prev) => !prev), []);
  const replay = useCallback(() => setReplayKey((key) => key + 1), []);
  const setDiagnostic = useCallback((key: keyof MotionDiagnostics, diagnosticValue: boolean) => {
    setDiagnostics((prev) => ({ ...prev, [key]: diagnosticValue }));
  }, []);

  const base = useMemo<Omit<MotionContextValue, "reducedMotion">>(
    () => ({
      scale,
      setScale,
      speed,
      setSpeed,
      paused,
      setPaused,
      togglePaused,
      reducedMotionOverride,
      setReducedMotionOverride,
      diagnostics,
      setDiagnostic,
      replayKey,
      replay,
    }),
    [scale, speed, paused, togglePaused, reducedMotionOverride, diagnostics, setDiagnostic, replayKey, replay],
  );

  return (
    <MotionPreferenceProvider reduceMotion={reducedMotionOverride}>
      <MotionContextBridge base={base}>{children}</MotionContextBridge>
    </MotionPreferenceProvider>
  );
}
