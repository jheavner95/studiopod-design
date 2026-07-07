"use client";

import { Columns3, Crosshair, Tag, Activity } from "lucide-react";
import { CardGrid } from "@/components/layout";
import { Slide } from "@/motion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

const TOOLS = [
  { icon: Columns3, label: "Bounds", description: "Outlines each demo's bounding box with a dashed accent border." },
  { icon: Crosshair, label: "Origins", description: "Marks the transform-origin point scale/rotate animations pivot around." },
  { icon: Tag, label: "Timing", description: "Shows the resolved duration · easing · delay for that specific demo." },
  { icon: Activity, label: "Frames", description: "A live, throttled frame-rate readout plus the current speed/scale/pause state." },
];

/** Explains the four developer overlays. Toggle them in the dock above and scroll back through the page to see them apply everywhere at once. */
export function DiagnosticsSection() {
  return (
    <PreviewSection
      id="diagnostics"
      eyebrow="developer mode"
      title="Developer diagnostics"
      description="Four toggleable overlays, live in the dock above. They're invisible chrome: turning them on never changes a demo's actual layout, only what's drawn on top of it."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOOLS.map(({ icon: Icon, label, description }) => (
          <div key={label} className="flex gap-4 rounded-lg border border-border bg-surface p-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-canvas-raised text-accent-400">
              <Icon className="size-4" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-body-sm font-medium text-ink-primary">{label}</span>
              <span className="text-caption text-ink-tertiary">{description}</span>
            </div>
          </div>
        ))}
      </div>

      <CardGrid columns={2}>
        <DemoCard label="Try the overlays on this one" timingLabel="normal · enter · medium distance">
          <Slide repeat>
            <div className="rounded-lg border border-border bg-canvas-raised px-6 py-4 text-center text-body-sm font-medium text-ink-primary">
              Toggle Bounds / Origins / Timing / Frames above
            </div>
          </Slide>
        </DemoCard>
        <DemoCard label="And this one" timingLabel="slow · enter · large distance">
          <Slide direction="left" duration="slow" distance="large" repeat>
            <div className="rounded-lg border border-border bg-canvas-raised px-6 py-4 text-center text-body-sm font-medium text-ink-primary">
              Different timing, same overlays
            </div>
          </Slide>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}
