"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading } from "@/components/ui";
import { Activate } from "@/motion";
import { METADATA_ANATOMY_REGIONS, type MetadataAnatomyRegion } from "../_data/anatomy";

interface RegionCardProps {
  region: MetadataAnatomyRegion;
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

/** The eight metadata anatomy regions, stacked top to bottom — select one to see the component that owns it. */
export function MetadataAnatomyExplorer() {
  const [selectedId, setSelectedId] = useState(METADATA_ANATOMY_REGIONS[0].id);
  const selected = METADATA_ANATOMY_REGIONS.find((region) => region.id === selectedId) ?? METADATA_ANATOMY_REGIONS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        {METADATA_ANATOMY_REGIONS.map((region) => (
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
