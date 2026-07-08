"use client";

import { Play, Pause, RotateCcw } from "lucide-react";
import { Button, SegmentedControl, ToggleSwitch } from "@/components/ui";
import { useMotion } from "@/hooks/useMotion";
import { useMotionControls } from "@/hooks/useMotionControls";
import type { PlaybackSpeed, MotionDiagnostics } from "@/providers/MotionProvider";

const SPEED_OPTIONS: { value: string; label: string }[] = [
  { value: "0.5", label: "0.5x" },
  { value: "1", label: "1x" },
  { value: "2", label: "2x" },
];

const DIAGNOSTIC_TOGGLES: { key: keyof MotionDiagnostics; label: string }[] = [
  { key: "bounds", label: "Bounds" },
  { key: "origins", label: "Origins" },
  { key: "timingLabels", label: "Timing" },
  { key: "frameDiagnostics", label: "Frames" },
];

/**
 * The one real control surface for the whole playground. Every button here
 * writes to MotionProvider, so every demo on the page — regardless of
 * which section it's in — responds to the same Play/Pause/Replay/Speed/
 * Reduced Motion/Diagnostics state at once. Sticky, not fixed: it stays
 * reachable while scrolling without needing viewport-corner placement.
 */
export function ControlDock() {
  const { paused, togglePaused, replay, speed, setSpeed, reducedMotionOverride, setReducedMotionOverride } =
    useMotionControls();
  const { diagnostics, setDiagnostic } = useMotion();
  const reducedActive = reducedMotionOverride === true;

  return (
    <div className="sticky top-4 z-[var(--z-sticky)] flex justify-center px-4">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-border bg-canvas/90 px-3 py-2 shadow-floating backdrop-blur">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={replay} leadingIcon={<RotateCcw className="size-3.5" />}>
            Replay
          </Button>
          <Button
            size="sm"
            variant={paused ? "primary" : "secondary"}
            onClick={togglePaused}
            aria-pressed={paused}
            leadingIcon={paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          >
            {paused ? "Play" : "Pause"}
          </Button>
        </div>

        <SegmentedControl
          aria-label="Playback speed"
          value={String(speed)}
          onChange={(value) => setSpeed(Number(value) as PlaybackSpeed)}
          options={SPEED_OPTIONS}
        />

        <ToggleSwitch
          checked={reducedActive}
          onChange={(checked) => setReducedMotionOverride(checked ? true : null)}
          label="Reduced motion"
        />

        <div className="mx-1 h-5 w-px shrink-0 bg-border" />

        <div className="flex flex-wrap items-center gap-3">
          {DIAGNOSTIC_TOGGLES.map(({ key, label }) => (
            <ToggleSwitch
              key={key}
              checked={diagnostics[key]}
              onChange={(checked) => setDiagnostic(key, checked)}
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
