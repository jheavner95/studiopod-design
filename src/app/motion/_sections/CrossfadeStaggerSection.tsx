"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Body } from "@/components/ui";
import { Crossfade, Stagger } from "@/motion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

const TABS = ["Inventory", "Production", "Fulfillment"];

export function CrossfadeSection() {
  const [active, setActive] = useState(0);

  return (
    <PreviewSection
      id="crossfade"
      eyebrow="crossfade"
      title="Crossfade"
      description="Swaps between differently-keyed content with a fade, instead of both states existing at once: tab panels, step content, anything that replaces rather than reveals."
    >
      <DemoCard label="Crossfade (click a tab)">
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-body-sm transition-colors",
                  active === index
                    ? "border-accent-500 bg-accent-soft text-accent-400"
                    : "border-border text-ink-secondary hover:text-ink-primary",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <Crossfade contentKey={active} className="rounded-md border border-border-subtle bg-canvas-raised p-4">
            <Body size="sm" muted>
              Showing: <span className="font-medium text-ink-primary">{TABS[active]}</span>
            </Body>
          </Crossfade>
        </div>
      </DemoCard>
    </PreviewSection>
  );
}

export function StaggerSection() {
  return (
    <PreviewSection
      id="stagger"
      eyebrow="stagger"
      title="Stagger"
      description="A parent and child pair: the parent times when each child's own entrance fires, so identical siblings reveal in sequence instead of all at once."
    >
      <DemoCard label="Stagger.Group / Stagger.Item">
        <Stagger.Group className="flex gap-3" repeat>
          {[0, 1, 2, 3].map((index) => (
            <Stagger.Item key={index}>
              <div className="flex size-10 items-center justify-center rounded-full bg-accent-500/70 text-body-sm font-medium text-white">
                {index + 1}
              </div>
            </Stagger.Item>
          ))}
        </Stagger.Group>
      </DemoCard>
    </PreviewSection>
  );
}

