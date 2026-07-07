"use client";

import { useState } from "react";
import { CardGrid } from "@/components/layout";
import { Button, Body } from "@/components/ui";
import { Pulse, Highlight } from "@/motion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

export function PulseSection() {
  return (
    <PreviewSection
      id="pulse"
      eyebrow="pulse"
      title="Pulse"
      description="A gentle looping breathing effect: scale and opacity. Marks something as live or in-progress; set active=false for a static, completed state."
    >
      <CardGrid columns={2}>
        <DemoCard label="Active" timingLabel="hero · flow · loop">
          <Pulse>
            <div className="flex size-12 items-center justify-center rounded-full bg-accent-500/70 text-white">●</div>
          </Pulse>
        </DemoCard>
        <DemoCard label="Inactive (static)">
          <Pulse active={false}>
            <div className="flex size-12 items-center justify-center rounded-full bg-success/70 text-white">●</div>
          </Pulse>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}

export function HighlightSection() {
  const [count, setCount] = useState(0);

  return (
    <PreviewSection
      id="highlight"
      eyebrow="highlight"
      title="Highlight"
      description="Flashes a brief accent ring once, whenever its `trigger` prop changes, for 'this just updated' moments, without needing a full re-entrance animation."
    >
      <DemoCard label="Click to flash">
        <div className="flex w-full flex-col items-center gap-4">
          <Highlight trigger={count} className="rounded-lg">
            <div className="rounded-lg border border-border bg-surface px-6 py-4 text-center">
              <Body size="sm" className="font-medium">
                Updated {count} time{count === 1 ? "" : "s"}
              </Body>
            </div>
          </Highlight>
          <Button size="sm" variant="secondary" onClick={() => setCount((c) => c + 1)}>
            Trigger update
          </Button>
        </div>
      </DemoCard>
    </PreviewSection>
  );
}
