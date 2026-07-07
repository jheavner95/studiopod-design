"use client";

import { CardGrid } from "@/components/layout";
import { Body } from "@/components/ui";
import { Fade, Slide, Pulse, QueueFlow } from "@/motion";
import { useMotion } from "@/hooks/useMotion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

export function MotionControlsSection() {
  const { paused } = useMotion();

  return (
    <PreviewSection
      id="motion-controls"
      eyebrow="motion controls"
      title="Play, pause, replay"
      description="The dock above is the real control surface: it writes to the same MotionProvider every demo on this page reads from. Pause freezes the looping examples below; Replay remounts every entrance so it re-triggers."
    >
      <Body size="sm" muted>
        Current state: <span className="font-medium text-ink-primary">{paused ? "paused" : "playing"}</span>
      </Body>
      <CardGrid columns={2}>
        <DemoCard label="Pulse (responds to pause)" timingLabel="hero · flow · loop">
          <Pulse>
            <div className="flex size-12 items-center justify-center rounded-full bg-accent-500/70 text-white">●</div>
          </Pulse>
        </DemoCard>
        <DemoCard label="Slide (responds to replay)" timingLabel="normal · enter">
          <Slide repeat>
            <Body size="sm" className="font-medium">
              Click Replay above
            </Body>
          </Slide>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}

export function SpeedControlsSection() {
  const { speed } = useMotion();

  return (
    <PreviewSection
      id="speed-controls"
      eyebrow="speed controls"
      title="0.5x, 1x, 2x playback"
      description="Every resolved duration and delay divides by this multiplier. It's a testing/QA aid; real pages always ship at 1x."
    >
      <Body size="sm" muted>
        Current speed: <span className="font-mono font-medium text-ink-primary">{speed}x</span>
      </Body>
      <DemoCard label="QueueFlow at current speed" timingLabel="hero · flow · loop">
        <QueueFlow />
      </DemoCard>
    </PreviewSection>
  );
}

export function ReducedMotionSection() {
  const { reducedMotion } = useMotion();

  return (
    <PreviewSection
      id="reduced-motion"
      eyebrow="reduced motion"
      title="One switch, every primitive"
      description="Toggling Reduced Motion in the dock overrides both the OS-level prefers-reduced-motion setting and every primitive on this page, through the same MotionPreferenceProvider MS-1 already built."
    >
      <Body size="sm" muted>
        Resolved state:{" "}
        <span className="font-medium text-ink-primary">{reducedMotion ? "reduced (static)" : "motion allowed"}</span>
      </Body>
      <CardGrid columns={2}>
        <DemoCard label="Fade" timingLabel="normal · enter">
          <Fade repeat>
            <Body size="sm" className="font-medium">
              Opacity only
            </Body>
          </Fade>
        </DemoCard>
        <DemoCard label="Slide" timingLabel="normal · enter">
          <Slide repeat>
            <Body size="sm" className="font-medium">
              Opacity + position
            </Body>
          </Slide>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}
