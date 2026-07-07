"use client";

import { useEffect, useState, type ReactNode } from "react";
import { RotateCcw, Play, Pause, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Caption, Button } from "@/components/ui";
import {
  FadeIn,
  SlideUp,
  ScaleIn,
  StaggerGroup,
  StaggerItem,
  PulseStatus,
  MotionPreferenceProvider,
} from "@/components/motion";
import { AnimatedNode, AnimatedConnector, ProgressRail, type SystemStatus } from "@/components/illustration";
import { PreviewSection } from "../_components/preview-primitives";

const NODE_FRAMES: SystemStatus[] = ["idle", "active", "success"];
const CONNECTOR_FRAMES = [false, true];
const PROGRESS_FRAMES: { label: string; status: SystemStatus }[][] = [
  [
    { label: "Received", status: "active" },
    { label: "Production", status: "idle" },
    { label: "QA", status: "idle" },
    { label: "Packed", status: "idle" },
    { label: "Shipped", status: "idle" },
  ],
  [
    { label: "Received", status: "success" },
    { label: "Production", status: "active" },
    { label: "QA", status: "idle" },
    { label: "Packed", status: "idle" },
    { label: "Shipped", status: "idle" },
  ],
  [
    { label: "Received", status: "success" },
    { label: "Production", status: "success" },
    { label: "QA", status: "active" },
    { label: "Packed", status: "idle" },
    { label: "Shipped", status: "idle" },
  ],
  [
    { label: "Received", status: "success" },
    { label: "Production", status: "success" },
    { label: "QA", status: "success" },
    { label: "Packed", status: "active" },
    { label: "Shipped", status: "idle" },
  ],
  [
    { label: "Received", status: "success" },
    { label: "Production", status: "success" },
    { label: "QA", status: "success" },
    { label: "Packed", status: "success" },
    { label: "Shipped", status: "success" },
  ],
];

function useCycle<T>(frames: T[], intervalMs: number, isPlaying: boolean, resetKey: number) {
  const [index, setIndex] = useState(0);
  const [lastResetKey, setLastResetKey] = useState(resetKey);

  // Reset to frame 0 when resetKey changes, computed during render rather
  // than in an effect — the recommended pattern for "adjust state when a
  // prop changes" (see react.dev "You Might Not Need an Effect").
  if (resetKey !== lastResetKey) {
    setLastResetKey(resetKey);
    setIndex(0);
  }

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % frames.length), intervalMs);
    return () => clearInterval(id);
  }, [isPlaying, frames.length, intervalMs]);

  return frames[index];
}

function DemoCard({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-4", className)}>
      <Caption className="font-mono text-[11px] uppercase tracking-wide text-ink-tertiary">{label}</Caption>
      <div className="flex min-h-16 items-center">{children}</div>
    </Card>
  );
}

function ToolbarButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  icon: typeof Play;
  label: string;
}) {
  return (
    <Button
      variant={active ? "primary" : "secondary"}
      size="sm"
      onClick={onClick}
      leadingIcon={<Icon className="size-3.5" />}
      aria-pressed={active}
    >
      {label}
    </Button>
  );
}

export function MotionSection() {
  const [replayKey, setReplayKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [forceReduced, setForceReduced] = useState(false);

  const nodeStatus = useCycle(NODE_FRAMES, 1400, isPlaying, replayKey);
  const connectorActive = useCycle(CONNECTOR_FRAMES, 1400, isPlaying, replayKey);
  const progressSteps = useCycle(PROGRESS_FRAMES, 1600, isPlaying, replayKey);

  const toolbar = (
    <div className="flex flex-wrap items-center gap-2">
      <ToolbarButton onClick={() => setReplayKey((k) => k + 1)} icon={RotateCcw} label="Replay" />
      <ToolbarButton
        active={!isPlaying}
        onClick={() => setIsPlaying((p) => !p)}
        icon={isPlaying ? Pause : Play}
        label={isPlaying ? "Pause" : "Play"}
      />
      <ToolbarButton
        active={forceReduced}
        onClick={() => setForceReduced((f) => !f)}
        icon={Accessibility}
        label="Reduced motion"
      />
    </div>
  );

  return (
    <PreviewSection
      id="motion"
      eyebrow="motion"
      title="Motion gallery"
      description="Replay re-triggers every entrance. Pause freezes the looping demos. Reduced motion simulates the accessibility preference regardless of your OS setting."
      actions={toolbar}
    >
      <MotionPreferenceProvider reduceMotion={forceReduced ? true : null}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DemoCard label="Fade">
            <FadeIn key={`fade-${replayKey}`} repeat>
              <span className="text-body-sm font-medium text-ink-primary">Opacity only</span>
            </FadeIn>
          </DemoCard>

          <DemoCard label="Slide">
            <SlideUp key={`slide-${replayKey}`} repeat>
              <span className="text-body-sm font-medium text-ink-primary">Opacity + y</span>
            </SlideUp>
          </DemoCard>

          <DemoCard label="Scale">
            <ScaleIn key={`scale-${replayKey}`} repeat>
              <span className="text-body-sm font-medium text-ink-primary">Opacity + scale</span>
            </ScaleIn>
          </DemoCard>

          <DemoCard label="Stagger">
            <StaggerGroup key={`stagger-${replayKey}`} repeat className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <StaggerItem key={i}>
                  <div className="size-6 rounded-full bg-accent-500/70" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </DemoCard>

          <DemoCard label="Status pulse">
            <div className="flex items-center gap-3">
              <PulseStatus tone="accent" active={isPlaying} />
              <span className="text-body-sm text-ink-secondary">Live</span>
            </div>
          </DemoCard>

          <DemoCard label="Node activation">
            <AnimatedNode status={nodeStatus} size="sm" />
          </DemoCard>

          <DemoCard label="Connector flow">
            <div className="flex items-center gap-1">
              <AnimatedNode status="success" size="sm" />
              <AnimatedConnector active={connectorActive} length={64} />
              <AnimatedNode status={connectorActive ? "active" : "idle"} size="sm" />
            </div>
          </DemoCard>

          <DemoCard label="Progress" className="sm:col-span-2">
            <ProgressRail steps={progressSteps} className="w-full" />
          </DemoCard>
        </div>
      </MotionPreferenceProvider>
    </PreviewSection>
  );
}
