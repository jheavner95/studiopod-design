"use client";

import { Play, Pause, RotateCcw, Accessibility, Columns3, Crosshair, Tag, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useMotion } from "@/hooks/useMotion";
import { useMotionControls } from "@/hooks/useMotionControls";
import type { PlaybackSpeed, MotionDiagnostics } from "@/providers/MotionProvider";

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2];

const DIAGNOSTIC_TOGGLES: { key: keyof MotionDiagnostics; label: string; icon: typeof Columns3 }[] = [
  { key: "bounds", label: "Bounds", icon: Columns3 },
  { key: "origins", label: "Origins", icon: Crosshair },
  { key: "timingLabels", label: "Timing", icon: Tag },
  { key: "frameDiagnostics", label: "Frames", icon: Activity },
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
      <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-canvas/90 px-3 py-2 shadow-floating backdrop-blur">
        <Button size="sm" variant="secondary" onClick={replay} leadingIcon={<RotateCcw className="size-3.5" />}>
          Replay
        </Button>
        <Button
          size="sm"
          variant={paused ? "primary" : "secondary"}
          onClick={togglePaused}
          leadingIcon={paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
        >
          {paused ? "Play" : "Pause"}
        </Button>

        <div className="flex items-center gap-1 rounded-full border border-border-subtle p-0.5">
          {SPEEDS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setSpeed(value)}
              aria-pressed={speed === value}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[11px] transition-colors duration-[var(--duration-fast)]",
                speed === value ? "bg-accent-500 text-white" : "text-ink-tertiary hover:text-ink-primary",
              )}
            >
              {value}x
            </button>
          ))}
        </div>

        <Button
          size="sm"
          variant={reducedActive ? "primary" : "secondary"}
          onClick={() => setReducedMotionOverride(reducedActive ? null : true)}
          leadingIcon={<Accessibility className="size-3.5" />}
        >
          Reduced motion
        </Button>

        <div className="mx-1 h-5 w-px shrink-0 bg-border" />

        {DIAGNOSTIC_TOGGLES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setDiagnostic(key, !diagnostics[key])}
            aria-pressed={diagnostics[key]}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-[var(--duration-fast)]",
              diagnostics[key]
                ? "border-accent-500 bg-accent-soft text-accent-400"
                : "border-border-subtle text-ink-tertiary hover:text-ink-primary",
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
