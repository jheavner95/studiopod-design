"use client";

import { useEffect, useState } from "react";
import { SurfacePanel } from "@/components/ui";
import { Activate, ConnectorFlow, QueueFlow, Progress, type ActivateState } from "@/motion";
import { useMotion } from "@/hooks/useMotion";
import { PreviewSection } from "../_components/preview-primitives";

const STEP_COUNT = 3;

function useCycleStep() {
  const { paused, replayKey } = useMotion();
  const [step, setStep] = useState(0);
  const [lastReplayKey, setLastReplayKey] = useState(replayKey);

  if (replayKey !== lastReplayKey) {
    setLastReplayKey(replayKey);
    setStep(0);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (STEP_COUNT + 1)), 1400);
    return () => clearInterval(id);
  }, [paused, replayKey]);

  return step;
}

function nodeState(step: number, index: number): ActivateState {
  if (step > index) return "complete";
  if (step === index) return "active";
  return "inactive";
}

/**
 * A deliberately abstract scene — no business labels, no StudioPOD-specific
 * steps. The point isn't the illustration, it's that four independently
 * built primitives compose into one coherent piece of motion without any
 * glue code beyond ordinary React composition.
 */
export function LivePreviewSection() {
  const step = useCycleStep();

  return (
    <PreviewSection
      id="live-preview"
      eyebrow="live preview"
      title="Composed together"
      description="Nothing here is a StudioPOD illustration yet, just proof that Activate, Connector Flow, Queue Flow, and Progress compose cleanly into one scene. That composability is the entire point of building the engine before building illustrations."
    >
      <SurfacePanel elevated className="flex flex-col items-center gap-10">
        <div className="flex items-center gap-2">
          {Array.from({ length: STEP_COUNT }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Activate state={nodeState(step, index)}>
                <div className="flex size-12 items-center justify-center rounded-full border border-border bg-surface text-body-sm font-medium text-ink-primary">
                  {index + 1}
                </div>
              </Activate>
              {index < STEP_COUNT - 1 ? <ConnectorFlow active={step > index} length={48} /> : null}
            </div>
          ))}
        </div>
        <QueueFlow trackWidth={280} />
        <Progress value={Math.min(step / STEP_COUNT, 1)} className="w-full max-w-sm" />
      </SurfacePanel>
    </PreviewSection>
  );
}
