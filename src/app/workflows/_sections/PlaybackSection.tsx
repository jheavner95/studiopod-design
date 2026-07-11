"use client";

import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui";
import { WorkflowDiagram, WorkflowProgress, WorkflowMiniMap, useWorkflowPlayback } from "@/workflows";
import { prepareValidateProduce } from "@/workflows/examples";
import { DemoLabel } from "../_components/preview-primitives";

// Static example data sets `completion` explicitly; clearing it here lets
// WorkflowProgress fall back to its live completed-step count instead, so
// the bar actually tracks the scrubber.
const PLAYBACK_WORKFLOW = { ...prepareValidateProduce, completion: undefined };

/** A single workflow driven by useWorkflowPlayback: play/pause auto-advance plus a manual scrubber. */
export function PlaybackSection() {
  const { playedWorkflow, activeIndex, setActiveIndex, isPlaying, togglePlaying } =
    useWorkflowPlayback(PLAYBACK_WORKFLOW);

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="sm"
          variant={isPlaying ? "secondary" : "primary"}
          onClick={togglePlaying}
          leadingIcon={isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <input
          type="range"
          min={0}
          max={playedWorkflow.steps.length - 1}
          step={1}
          value={activeIndex}
          onChange={(event) => setActiveIndex(Number(event.target.value))}
          className="h-1.5 flex-1 accent-accent-500"
          aria-label="Scrub workflow step"
        />
      </div>

      <div className="scrollbar-none overflow-x-auto">
        <WorkflowDiagram workflow={playedWorkflow} />
      </div>

      <div className="flex flex-col gap-2">
        <DemoLabel>Mini map</DemoLabel>
        <WorkflowMiniMap workflow={playedWorkflow} />
      </div>

      <WorkflowProgress workflow={playedWorkflow} />
    </div>
  );
}
