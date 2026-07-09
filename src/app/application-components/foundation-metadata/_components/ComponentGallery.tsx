"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Body, Caption, Heading } from "@/components/ui";
import {
  MetadataRow,
  MetadataGroup,
  PropertyGroup,
  MetadataField,
  DescriptionList,
  IdentityBlock,
  RelationshipList,
  StatusSummary,
  HealthSummary,
  StatGroup,
  TagCollection,
} from "@/components/metadata";
import { METADATA_COMPONENTS } from "../_data/components";

function LiveDemo({ id }: { id: string }) {
  switch (id) {
    case "metadata-row":
      return (
        <div className="max-w-sm">
          <MetadataRow label="Owner" value="J. Heavner" />
        </div>
      );
    case "metadata-group":
      return (
        <div className="max-w-sm">
          <MetadataGroup title="Ownership">
            <MetadataRow label="Owner" value="J. Heavner" />
            <MetadataRow label="Team" value="Marketing" />
          </MetadataGroup>
        </div>
      );
    case "property-group":
      return (
        <PropertyGroup title="Properties">
          <MetadataField label="Type" value="Artwork Project" />
          <MetadataField label="Format" value="PNG" />
          <MetadataField label="Dimensions" value="1920×1080" />
          <MetadataField label="Size" value="2.4 MB" />
        </PropertyGroup>
      );
    case "description-list":
      return (
        <div className="max-w-sm">
          <DescriptionList
            items={[
              { label: "Name", value: "Homepage Banner" },
              { label: "Type", value: "Artwork Project" },
              { label: "Created", value: "3 days ago" },
            ]}
          />
        </div>
      );
    case "identity-block":
      return (
        <div className="max-w-sm">
          <IdentityBlock
            icon={<ImageIcon className="size-4" aria-hidden />}
            name="Homepage Banner"
            type="Artwork Project"
            status={{ label: "Published", tone: "success" }}
          />
        </div>
      );
    case "relationship-list":
      return (
        <div className="max-w-sm">
          <RelationshipList
            items={[
              { label: "Spring Catalog", href: "#", meta: "Style" },
              { label: "Q4 Campaign", href: "#", meta: "Style" },
              { label: "Archived Draft", meta: "No longer linked" },
            ]}
          />
        </div>
      );
    case "status-summary":
      return <StatusSummary items={[{ label: "Published", tone: "success" }, { label: "Needs review", tone: "warning" }]} />;
    case "health-summary":
      return (
        <HealthSummary
          metrics={[
            { label: "Provider", state: "healthy" },
            { label: "Queue", state: "degraded", detail: "3 jobs delayed" },
            { label: "Sync", state: "down", detail: "Last synced 2h ago" },
          ]}
        />
      );
    case "stat-group":
      return (
        <StatGroup
          items={[
            { value: "24", label: "Active jobs" },
            { value: "128", label: "Assets" },
            { value: "99.2%", label: "Uptime" },
          ]}
        />
      );
    case "tag-collection":
      return <TagCollection tags={["Marketing", "Q4", "Approved", "Homepage"]} />;
    default:
      return null;
  }
}

function PillButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        active
          ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
          : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
      )}
    >
      {label}
    </button>
  );
}

/** Select a component to see its purpose, a live example, and when (not) to reach for it. */
export function ComponentGallery() {
  const [selectedId, setSelectedId] = useState(METADATA_COMPONENTS[0].id);
  const selected = METADATA_COMPONENTS.find((c) => c.id === selectedId) ?? METADATA_COMPONENTS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {METADATA_COMPONENTS.map((component) => (
          <PillButton key={component.id} label={component.name} active={component.id === selectedId} onClick={() => setSelectedId(component.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{selected.purpose}</Body>
        </div>

        <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">
          <LiveDemo id={selected.id} />
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">When to use</Caption>
            <Body size="sm" muted>
              {selected.whenToUse}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">When NOT to use</Caption>
            <Body size="sm" muted>
              {selected.whenNotToUse}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Accessibility</Caption>
            <Body size="sm" muted>
              {selected.accessibility}
            </Body>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Responsive behavior</Caption>
            <Body size="sm" muted>
              {selected.responsive}
            </Body>
          </div>
        </div>
      </Card>
    </div>
  );
}
