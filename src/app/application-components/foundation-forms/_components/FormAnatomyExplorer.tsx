"use client";

import { useState } from "react";
import { Card, Badge, Body, Caption, Heading, SelectableCard } from "@/components/ui";
import { FORM_ANATOMY_REGIONS, type FormAnatomyRegion } from "../_data/anatomy";

interface RegionCardProps {
  region: FormAnatomyRegion;
  selected: boolean;
  onSelect: () => void;
}

function RegionCard({ region, selected, onSelect }: RegionCardProps) {
  return (
    <SelectableCard
      title={region.name}
      description={region.purpose}
      selected={selected}
      onSelect={onSelect}
      padding="sm"
      descriptionClamp={1}
      className="min-h-16"
    />
  );
}

/** The eight form anatomy regions, stacked top to bottom — select one to see the component that owns it. */
export function FormAnatomyExplorer() {
  const [selectedId, setSelectedId] = useState(FORM_ANATOMY_REGIONS[0].id);
  const selected = FORM_ANATOMY_REGIONS.find((region) => region.id === selectedId) ?? FORM_ANATOMY_REGIONS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        {FORM_ANATOMY_REGIONS.map((region) => (
          <RegionCard key={region.id} region={region} selected={region.id === selectedId} onSelect={() => setSelectedId(region.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <Heading level={3}>{selected.name}</Heading>
          <Badge tone="accent" size="sm">
            {selected.component}
          </Badge>
        </div>
        <Body muted>{selected.purpose}</Body>
        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Notes</Caption>
          <Body size="sm" muted>
            {selected.notes}
          </Body>
        </div>
      </Card>
    </div>
  );
}
