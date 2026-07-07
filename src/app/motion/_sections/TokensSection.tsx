"use client";

import { motion } from "framer-motion";
import { Caption } from "@/components/ui";
import { useMotion } from "@/hooks/useMotion";
import { transition, resolveDuration } from "@/motion";
import { motionDuration, motionDelay, motionDistance, motionEase } from "@/motion/tokens";
import { PreviewSection } from "../_components/preview-primitives";

const EASE_LABELS: Record<keyof typeof motionEase, string> = {
  standard: "confident decelerate, the general default",
  enter: "snappy ease-out, things arriving",
  exit: "accelerating ease-in, things leaving",
  flow: "symmetric ease-in-out, continuous/looping motion",
  emphasis: "slight overshoot, moments that should draw the eye",
};

const RACE_TRACK_WIDTH = 140;
const RACE_DOT_WIDTH = 14;

function DurationRace() {
  const { replayKey, speed } = useMotion();

  return (
    <div className="flex flex-col gap-3">
      {(Object.keys(motionDuration) as (keyof typeof motionDuration)[]).map((name) => (
        <div key={name} className="flex items-center gap-3">
          <span className="w-12 shrink-0 font-mono text-caption text-ink-secondary">{name}</span>
          <div
            className="relative h-2 shrink-0 overflow-hidden rounded-full bg-border"
            style={{ width: RACE_TRACK_WIDTH }}
          >
            <motion.div
              key={`${name}-${replayKey}`}
              className="absolute inset-y-0 left-0 rounded-full bg-accent-500"
              style={{ width: RACE_DOT_WIDTH }}
              initial={{ x: 0 }}
              animate={{ x: RACE_TRACK_WIDTH - RACE_DOT_WIDTH }}
              transition={transition({ duration: name, ease: "standard", speed })}
            />
          </div>
          <span className="w-12 shrink-0 text-right font-mono text-caption text-ink-tertiary">
            {Math.round(resolveDuration(name, speed) * 1000)}ms
          </span>
        </div>
      ))}
    </div>
  );
}

export function TokensSection() {
  return (
    <PreviewSection
      id="tokens"
      eyebrow="tokens"
      title="Motion tokens"
      description="Five durations, four delays, four distances, five easing curves. Every primitive resolves its motion from these: nothing is hardcoded."
    >
      <div className="flex flex-col gap-12">
        <div>
          <Caption className="mb-4">Durations: a dot racing across each track at its real resolved speed</Caption>
          <DurationRace />
        </div>

        <div>
          <Caption className="mb-4">Delays</Caption>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(Object.entries(motionDelay) as [string, number][]).map(([name, seconds]) => (
              <div key={name} className="rounded-lg border border-border-subtle bg-surface p-4">
                <span className="text-body-sm font-medium text-ink-primary">{name}</span>
                <div className="mt-1 font-mono text-caption text-ink-tertiary">{Math.round(seconds * 1000)}ms</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">Distances (px, for translate) &amp; scale deltas (unitless, for Scale)</Caption>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(Object.entries(motionDistance) as [string, number][]).map(([name, px]) => (
              <div key={name} className="rounded-lg border border-border-subtle bg-surface p-4">
                <span className="text-body-sm font-medium text-ink-primary">{name}</span>
                <div className="mt-1 font-mono text-caption text-ink-tertiary">{px}px</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Caption className="mb-4">Easing curves</Caption>
          <div className="flex flex-col gap-3">
            {(Object.keys(motionEase) as (keyof typeof motionEase)[]).map((name) => (
              <div key={name} className="flex flex-col gap-1 rounded-lg border border-border-subtle bg-surface p-4 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-24 shrink-0 font-mono text-body-sm font-medium text-ink-primary">{name}</span>
                <span className="text-caption text-ink-tertiary">{EASE_LABELS[name]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
