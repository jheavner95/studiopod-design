"use client";

import { useEffect, useState } from "react";
import { CardGrid } from "@/components/layout";
import { Caption } from "@/components/ui";
import { Activate, QueueFlow, PublishFlow, type ActivateState } from "@/motion";
import { useMotion } from "@/hooks/useMotion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

const STATES: ActivateState[] = ["inactive", "active", "complete"];

function AutoActivate() {
  const { paused, replayKey } = useMotion();
  const [index, setIndex] = useState(0);
  const [lastReplayKey, setLastReplayKey] = useState(replayKey);

  if (replayKey !== lastReplayKey) {
    setLastReplayKey(replayKey);
    setIndex(0);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % STATES.length), 1200);
    return () => clearInterval(id);
  }, [paused, replayKey]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Activate state={STATES[index]}>
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-surface" />
      </Activate>
      <Caption>{STATES[index]}</Caption>
    </div>
  );
}

export function ActivateFlowSection() {
  return (
    <PreviewSection
      id="activate-flow"
      eyebrow="activate · queue · publish"
      title="Activate, Queue Flow, Publish Flow"
      description="Three more primitives for system-style motion: a node's state transition, a stream of items moving through a queue, and a repeating 'item published' loop."
    >
      <CardGrid columns={3}>
        <DemoCard label="Activate (cycling)" timingLabel="fast · standard">
          <AutoActivate />
        </DemoCard>
        <DemoCard label="Queue Flow" timingLabel="hero · flow · loop">
          <QueueFlow trackWidth={160} />
        </DemoCard>
        <DemoCard label="Publish Flow" timingLabel="hero · flow · loop">
          <PublishFlow>
            <div className="flex size-10 items-center justify-center rounded-md bg-accent-500/70 text-white">↑</div>
          </PublishFlow>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}
