"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, Badge, Body, Caption, Heading, SelectableCard } from "@/components/ui";
import { PRIMARY_WORKSPACE_REGIONS, type PrimaryWorkspaceRegion } from "../_data/regions";

interface RegionCardProps {
  region: PrimaryWorkspaceRegion;
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
      className="min-h-24"
    />
  );
}

function RegionDetail({ region }: { region: PrimaryWorkspaceRegion }) {
  return (
    <Card padding="lg" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Heading level={3}>{region.name}</Heading>
        <Body muted>{region.purpose}</Body>
      </div>

      <div className="flex flex-col gap-2">
        <Caption className="text-ink-tertiary">Examples</Caption>
        <div className="flex flex-wrap gap-2">
          {region.examples.map((example) => (
            <Badge key={example} tone="accent" size="sm">
              {example}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border-subtle pt-4">
        {region.guidance.map((note) => (
          <div key={note.label} className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">{note.label}</Caption>
            <Body size="sm" muted>
              {note.text}
            </Body>
          </div>
        ))}
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

/** The Primary Workspace's four regions, stacked top to bottom exactly as the anatomy diagram shows — select one to see its full detail below. */
export function PrimaryWorkspaceAnatomyExplorer() {
  const [selectedId, setSelectedId] = useState(PRIMARY_WORKSPACE_REGIONS[0].id);
  const selected = PRIMARY_WORKSPACE_REGIONS.find((region) => region.id === selectedId) ?? PRIMARY_WORKSPACE_REGIONS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 rounded-xl border border-border-subtle bg-surface/40 p-6 sm:p-10">
        {PRIMARY_WORKSPACE_REGIONS.map((region) => (
          <RegionCard
            key={region.id}
            region={region}
            selected={region.id === selectedId}
            onSelect={() => setSelectedId(region.id)}
          />
        ))}
      </div>

      <RegionDetail region={selected} />
    </div>
  );
}
