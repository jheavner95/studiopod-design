"use client";

import { Play, Pause, RotateCcw } from "lucide-react";
import { Button, SegmentedControl, ToggleSwitch } from "@/components/ui";
import { ControlDockShell } from "@/motion";
import { useMotionControls } from "@/hooks/useMotionControls";
import { useIllustrationDevControls, type IllustrationDevState } from "@/illustrations";
import type { PlaybackSpeed } from "@/providers/MotionProvider";

const SPEED_OPTIONS: { value: string; label: string }[] = [
  { value: "0.5", label: "0.5x" },
  { value: "1", label: "1x" },
  { value: "2", label: "2x" },
];

const DEV_TOGGLES: { key: keyof IllustrationDevState; label: string }[] = [
  { key: "nodeBounds", label: "Node Bounds" },
  { key: "anchorPoints", label: "Anchor Points" },
  { key: "connectorRouting", label: "Routing" },
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
    <ControlDockShell>
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
        {DEV_TOGGLES.map(({ key, label }) => (
          <ToggleSwitch key={key} checked={state[key]} onChange={(checked) => setToggle(key, checked)} label={label} />
        ))}
      </div>
    </ControlDockShell>
  );
}
