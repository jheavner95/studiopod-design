"use client";

import { useEffect, useState } from "react";
import { CardGrid } from "@/components/layout";
import { Progress, ConnectorFlow } from "@/motion";
import { useMotion } from "@/hooks/useMotion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

function AutoProgress() {
  const { paused, replayKey } = useMotion();
  const [value, setValue] = useState(0);
  const [lastReplayKey, setLastReplayKey] = useState(replayKey);

  // Reset to 0 when Replay is clicked — computed during render rather than
  // in an effect (see react.dev "You Might Not Need an Effect").
  if (replayKey !== lastReplayKey) {
    setLastReplayKey(replayKey);
    setValue(0);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setValue((v) => (v >= 1 ? 0 : v + 0.2)), 900);
    return () => clearInterval(id);
  }, [paused, replayKey]);

  return <Progress value={value} className="w-full" />;
}

function AutoConnector() {
  const { paused, replayKey } = useMotion();
  const [active, setActive] = useState(false);
  const [lastReplayKey, setLastReplayKey] = useState(replayKey);

  if (replayKey !== lastReplayKey) {
    setLastReplayKey(replayKey);
    setActive(false);
  }

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => !a), 1400);
    return () => clearInterval(id);
  }, [paused, replayKey]);

  return (
    <div className="flex items-center gap-1">
      <div className="size-3 rounded-full bg-success" />
      <ConnectorFlow active={active} length={80} />
      <div className="size-3 rounded-full border border-border" />
    </div>
  );
}

export function ProgressSection() {
  return (
    <PreviewSection
      id="progress"
      eyebrow="progress"
      title="Progress"
      description="An animated fill: the generic mechanism behind progress rails and connector fills. Horizontal or vertical, driven by a single 0 to 1 value."
    >
      <CardGrid columns={2}>
        <DemoCard label="Auto-cycling 0 → 100%" timingLabel="slow · standard">
          <AutoProgress />
        </DemoCard>
        <DemoCard label="Fixed at 65%" timingLabel="slow · standard">
          <Progress value={0.65} className="w-full" />
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}

export function ConnectorFlowSection() {
  return (
    <PreviewSection
      id="connector-flow"
      eyebrow="connector flow"
      title="Connector Flow"
      description="A line between two points whose accent overlay draws in when active: the base mechanism behind every pipeline diagram, decoupled from any specific node shape."
    >
      <DemoCard label="Auto-toggling connection" timingLabel="slow · flow">
        <AutoConnector />
      </DemoCard>
    </PreviewSection>
  );
}
