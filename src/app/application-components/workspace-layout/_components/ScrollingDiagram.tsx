"use client";

import { useState } from "react";
import { Card, Badge, Body, Caption, SelectableCard } from "@/components/ui";
import { SCROLL_REGIONS, type ScrollBehavior, type ScrollRegion } from "../_data/scrolling";

const BEHAVIOR_TONE: Record<ScrollBehavior, "accent" | "warning" | "neutral"> = {
  Sticky: "accent",
  "Independent scroll": "warning",
  Fixed: "neutral",
};

function RegionChip({ region, selected, onSelect }: { region: ScrollRegion; selected: boolean; onSelect: () => void }) {
  return (
    <SelectableCard
      title={region.name}
      badge={
        <Badge tone={BEHAVIOR_TONE[region.behavior]} size="sm" className="w-fit">
          {region.behavior}
        </Badge>
      }
      selected={selected}
      onSelect={onSelect}
      padding="sm"
    />
  );
}

/** The workspace's own regions, laid out in order, each tagged with its scroll behavior — click one to see why. */
export function ScrollingDiagram() {
  const [selectedId, setSelectedId] = useState(SCROLL_REGIONS[0].id);
  const selected = SCROLL_REGIONS.find((region) => region.id === selectedId) ?? SCROLL_REGIONS[0];

  const header = SCROLL_REGIONS.find((r) => r.id === "workspace-header")!;
  const toolbar = SCROLL_REGIONS.find((r) => r.id === "toolbar")!;
  const library = SCROLL_REGIONS.find((r) => r.id === "library")!;
  const primary = SCROLL_REGIONS.find((r) => r.id === "primary-workspace")!;
  const inspector = SCROLL_REGIONS.find((r) => r.id === "inspector")!;
  const status = SCROLL_REGIONS.find((r) => r.id === "status-bar")!;

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-4">
          <RegionChip region={header} selected={selectedId === header.id} onSelect={() => setSelectedId(header.id)} />
          <RegionChip region={toolbar} selected={selectedId === toolbar.id} onSelect={() => setSelectedId(toolbar.id)} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <RegionChip region={library} selected={selectedId === library.id} onSelect={() => setSelectedId(library.id)} />
            <RegionChip region={primary} selected={selectedId === primary.id} onSelect={() => setSelectedId(primary.id)} />
            <RegionChip region={inspector} selected={selectedId === inspector.id} onSelect={() => setSelectedId(inspector.id)} />
          </div>
          <RegionChip region={status} selected={selectedId === status.id} onSelect={() => setSelectedId(status.id)} />
        </div>
      </div>

      <Card padding="lg" className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-body-md font-medium text-ink-primary">{selected.name}</span>
          <Badge tone={BEHAVIOR_TONE[selected.behavior]} size="sm">
            {selected.behavior}
          </Badge>
        </div>
        <Caption className="text-ink-tertiary">Why</Caption>
        <Body size="sm" muted>
          {selected.why}
        </Body>
      </Card>
    </div>
  );
}
