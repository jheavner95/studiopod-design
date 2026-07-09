"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading } from "@/components/ui";
import { Activate } from "@/motion";
import { WORKSPACE_REGIONS, type WorkspaceRegion } from "../_data/regions";

const COLUMN_SPAN: Record<WorkspaceRegion["column"], string> = {
  full: "lg:col-span-4",
  narrow: "lg:col-span-1",
  wide: "lg:col-span-2",
};

interface RegionCardProps {
  region: WorkspaceRegion;
  selected: boolean;
  onSelect: () => void;
}

function RegionCard({ region, selected, onSelect }: RegionCardProps) {
  return (
    <div className={COLUMN_SPAN[region.column]}>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="focus-ring block w-full rounded-lg text-left"
      >
        <Activate state={selected ? "active" : "inactive"} className="rounded-lg">
          <Card
            interactive
            className={cn("flex h-full min-h-32 flex-col gap-2", selected && "border-accent-500/60 bg-accent-soft/30")}
          >
            <span className="text-body-md font-medium text-ink-primary">{region.name}</span>
            <Body size="sm" muted className="line-clamp-2">
              {region.purpose}
            </Body>
            <Caption className="mt-auto text-ink-tertiary">
              {region.required.length} required · {region.optional.length} optional
            </Caption>
          </Card>
        </Activate>
      </button>
    </div>
  );
}

function RegionDetail({ region }: { region: WorkspaceRegion }) {
  return (
    <Card padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level={3}>{region.name}</Heading>
        <Body muted>{region.purpose}</Body>
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Responsibilities</Caption>
        <ul className="flex flex-col gap-1.5">
          {region.responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-2 text-body-sm text-ink-secondary">
              <span className="text-ink-tertiary" aria-hidden>
                –
              </span>
              {responsibility}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <Caption className="text-ink-tertiary">Required</Caption>
          <div className="flex flex-wrap gap-2">
            {region.required.map((item) => (
              <Badge key={item} tone="accent" size="sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Caption className="text-ink-tertiary">Optional</Caption>
          <div className="flex flex-wrap gap-2">
            {region.optional.map((item) => (
              <Badge key={item} tone="neutral" size="sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border-subtle pt-4">
        <Caption className="text-ink-tertiary">Reuse notes</Caption>
        <Body size="sm" muted>
          {region.reuseNotes}
        </Body>
        {region.reuseLinks.length > 0 ? (
          <div className="flex flex-wrap gap-4 pt-1">
            {region.reuseLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring flex items-center gap-1 rounded-md text-caption font-medium text-accent-400 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent-300"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

/** The exploded workspace anatomy diagram: seven regions laid out spatially, each a selectable card whose full detail renders below. */
export function WorkspaceAnatomyExplorer() {
  const [selectedId, setSelectedId] = useState(WORKSPACE_REGIONS[0].id);
  const selectedRegion = WORKSPACE_REGIONS.find((region) => region.id === selectedId) ?? WORKSPACE_REGIONS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {WORKSPACE_REGIONS.map((region) => (
            <RegionCard
              key={region.id}
              region={region}
              selected={region.id === selectedId}
              onSelect={() => setSelectedId(region.id)}
            />
          ))}
        </div>
      </div>

      <RegionDetail region={selectedRegion} />
    </div>
  );
}
