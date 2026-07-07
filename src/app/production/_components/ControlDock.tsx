"use client";

import { Play, Pause, RotateCcw, Accessibility, Columns3, Crosshair, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useMotionControls } from "@/hooks/useMotionControls";
import { useIllustrationDevControls, type IllustrationDevState } from "@/illustrations";
import type { PlaybackSpeed } from "@/providers/MotionProvider";

const SPEEDS: PlaybackSpeed[] = [0.5, 1, 2];

const DEV_TOGGLES: { key: keyof IllustrationDevState; label: string; icon: typeof Columns3 }[] = [
  { key: "nodeBounds", label: "Node Bounds", icon: Columns3 },
  { key: "anchorPoints", label: "Anchor Points", icon: Crosshair },
  { key: "connectorRouting", label: "Routing", icon: Waypoints },
];

/**
 * The one real control surface for the production playground. Speed,
 * pause, replay, and reduced motion write to the MS-2.1 MotionProvider;
 * the dev overlay toggles write to the MS-2.2 IllustrationDevProvider.
 * Every diagram on the page responds to both.
 */
export function ControlDock() {
  const { paused, togglePaused, replay, speed, setSpeed, reducedMotionOverride, setReducedMotionOverride } =
    useMotionControls();
  const { state, setToggle } = useIllustrationDevControls();
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

        {DEV_TOGGLES.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setToggle(key, !state[key])}
            aria-pressed={state[key]}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-[var(--duration-fast)]",
              state[key]
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
