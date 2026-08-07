"use client";

import { useEffect, useState } from "react";
import type { Workflow } from "../types";

export interface WorkflowPlayback {
  /** The workflow with `active`/`completed` derived from the current scrubber position — feed this straight into WorkflowDiagram. */
  playedWorkflow: Workflow;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlaying: () => void;
}

/**
 * Drives a workflow's step-by-step playback: which step is "active" right
 * now, auto-advancing on an interval when playing. Playback state only
 * ever produces a new `Workflow` value — it never bypasses the
 * render-from-data contract the rest of the library depends on.
 */
export function useWorkflowPlayback(workflow: Workflow, intervalMs = 1600): WorkflowPlayback {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || workflow.steps.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((index) => (index + 1) % workflow.steps.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [isPlaying, workflow.steps.length, intervalMs]);

  const playedWorkflow: Workflow = {
    ...workflow,
    steps: workflow.steps.map((step, index) => ({
      ...step,
      active: index === activeIndex,
      completed: index < activeIndex,
    })),
  };

  return {
    playedWorkflow,
    activeIndex,
    setActiveIndex,
    isPlaying,
    setIsPlaying,
    togglePlaying: () => setIsPlaying((playing) => !playing),
  };
}
