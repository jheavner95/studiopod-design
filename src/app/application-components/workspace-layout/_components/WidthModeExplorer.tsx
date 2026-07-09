"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading } from "@/components/ui";
import { Activate } from "@/motion";
import { WIDTH_MODES, type WidthMode } from "../_data/width-modes";

function ModeCard({ mode, selected, onSelect }: { mode: WidthMode; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} className="focus-ring block w-full rounded-lg text-left">
      <Activate state={selected ? "active" : "inactive"} className="rounded-lg">
        <Card
          interactive
          className={cn("flex h-full min-h-28 flex-col gap-2", selected && "border-accent-500/60 bg-accent-soft/30")}
        >
          <span className="text-body-md font-medium text-ink-primary">{mode.name}</span>
          <Body size="sm" muted className="line-clamp-2">
            {mode.purpose}
          </Body>
        </Card>
      </Activate>
    </button>
  );
}

/** Five selectable width-mode cards with a shared detail panel — no pixel value appears anywhere in this component. */
export function WidthModeExplorer() {
  const [selectedId, setSelectedId] = useState(WIDTH_MODES[0].id);
  const selected = WIDTH_MODES.find((mode) => mode.id === selectedId) ?? WIDTH_MODES[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {WIDTH_MODES.map((mode) => (
          <ModeCard key={mode.id} mode={mode} selected={mode.id === selectedId} onSelect={() => setSelectedId(mode.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{selected.purpose}</Body>
        </div>

        <div className="flex flex-col gap-2">
          <Caption className="text-ink-tertiary">Typical use cases</Caption>
          <div className="flex flex-wrap gap-2">
            {selected.useCases.map((useCase) => (
              <Badge key={useCase} tone="neutral" size="sm">
                {useCase}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Caption className="text-ink-tertiary">Maximum content width</Caption>
          <Body size="sm" muted>
            {selected.maxWidth}
          </Body>
        </div>

        <div className="flex flex-col gap-2 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Examples</Caption>
          <div className="flex flex-wrap gap-2">
            {selected.examples.map((example) => (
              <Badge key={example} tone="accent" size="sm">
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
