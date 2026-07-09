"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Body, Caption, Heading, Badge } from "@/components/ui";
import { Activate } from "@/motion";
import { TABLE_ANATOMY_REGIONS, type TableAnatomyRegion } from "../_data/anatomy";

interface RegionCardProps {
  region: TableAnatomyRegion;
  selected: boolean;
  onSelect: () => void;
}

function RegionCard({ region, selected, onSelect }: RegionCardProps) {
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected} className="focus-ring block w-full rounded-lg text-left">
      <Activate state={selected ? "active" : "inactive"} className="rounded-lg">
        <Card
          interactive
          padding="sm"
          className={cn("flex h-full min-h-16 flex-col gap-1", selected && "border-accent-500/60 bg-accent-soft/30")}
        >
          <span className="text-body-sm font-medium text-ink-primary">{region.name}</span>
          <Body size="sm" muted className="line-clamp-1">
            {region.purpose}
          </Body>
        </Card>
      </Activate>
    </button>
  );
}

/** The seven table anatomy regions, stacked top to bottom exactly as the real DOM order runs — select one to see its owning component and notes. */
export function TableAnatomyExplorer() {
  const [selectedId, setSelectedId] = useState(TABLE_ANATOMY_REGIONS[0].id);
  const selected = TABLE_ANATOMY_REGIONS.find((region) => region.id === selectedId) ?? TABLE_ANATOMY_REGIONS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        {TABLE_ANATOMY_REGIONS.map((region) => (
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
