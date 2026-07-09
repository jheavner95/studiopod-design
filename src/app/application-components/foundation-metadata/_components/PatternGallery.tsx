"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, Body, Caption, Heading } from "@/components/ui";
import { Stack, Panel } from "@/components/layout";
import { DescriptionList, PropertyGroup, MetadataField, IdentityBlock, RelationshipList, StatGroup, HealthSummary, TagCollection } from "@/components/metadata";
import { PRESENTATION_PATTERNS, type PresentationPattern } from "../_data/patterns";

const ITEMS = [
  { label: "Name", value: "Homepage Banner" },
  { label: "Type", value: "Artwork Project" },
  { label: "Created", value: "3 days ago" },
];

function PatternDemo({ id }: { id: string }) {
  switch (id) {
    case "single-column":
      return (
        <div className="max-w-sm">
          <DescriptionList layout="stacked" items={ITEMS} />
        </div>
      );
    case "two-column":
      return (
        <div className="max-w-sm">
          <DescriptionList layout="two-column" items={ITEMS} />
        </div>
      );
    case "compact":
      return (
        <PropertyGroup columns={3}>
          <MetadataField label="Type" value="PNG" />
          <MetadataField label="Size" value="2.4 MB" />
          <MetadataField label="DPI" value="300" />
          <MetadataField label="Owner" value="J. Heavner" />
          <MetadataField label="Status" value="Draft" />
          <MetadataField label="Created" value="3d ago" />
        </PropertyGroup>
      );
    case "inspector-layout":
      return (
        <Panel header={<span className="text-body-sm font-medium text-ink-primary">Inspector</span>} className="max-w-sm">
          <Stack gap="md">
            <IdentityBlock icon={<ImageIcon className="size-4" aria-hidden />} name="Homepage Banner" type="Artwork Project" />
            <PropertyGroup>
              <MetadataField label="Format" value="PNG" />
              <MetadataField label="Size" value="2.4 MB" />
            </PropertyGroup>
            <RelationshipList items={[{ label: "Spring Catalog", href: "#", meta: "Style" }]} />
          </Stack>
        </Panel>
      );
    case "dashboard-layout":
      return (
        <Stack gap="md">
          <StatGroup
            columns={3}
            items={[
              { value: "24", label: "Active jobs" },
              { value: "128", label: "Assets" },
              { value: "99.2%", label: "Uptime" },
            ]}
          />
          <HealthSummary metrics={[{ label: "Provider", state: "healthy" }, { label: "Queue", state: "degraded" }]} />
        </Stack>
      );
    case "card-layout":
      return (
        <Card padding="sm" className="max-w-xs">
          <Stack gap="sm">
            <IdentityBlock icon={<ImageIcon className="size-4" aria-hidden />} name="Homepage Banner" type="Artwork Project" />
            <TagCollection tags={["Marketing", "Q4"]} />
          </Stack>
        </Card>
      );
    case "responsive-stacking":
      return (
        <div className="max-w-sm">
          <DescriptionList layout="responsive" items={ITEMS} />
        </div>
      );
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

/** Seven ways the same metadata components can be arranged — select one for a live example plus its advantages and tradeoffs. */
export function PatternGallery() {
  const [selectedId, setSelectedId] = useState(PRESENTATION_PATTERNS[0].id);
  const selected: PresentationPattern = PRESENTATION_PATTERNS.find((p) => p.id === selectedId) ?? PRESENTATION_PATTERNS[0];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {PRESENTATION_PATTERNS.map((pattern) => (
          <PillButton key={pattern.id} label={pattern.name} active={pattern.id === selectedId} onClick={() => setSelectedId(pattern.id)} />
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{selected.description}</Body>
        </div>

        <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">
          <PatternDemo id={selected.id} />
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-border-subtle pt-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Advantages</Caption>
            <ul className="flex flex-col gap-1">
              {selected.advantages.map((advantage) => (
                <li key={advantage} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="text-ink-tertiary" aria-hidden>
                    –
                  </span>
                  <span className="min-w-0 break-words">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1.5">
            <Caption className="text-ink-tertiary">Tradeoffs</Caption>
            <ul className="flex flex-col gap-1">
              {selected.tradeoffs.map((tradeoff) => (
                <li key={tradeoff} className="flex gap-2 text-body-sm text-ink-secondary">
                  <span className="text-ink-tertiary" aria-hidden>
                    –
                  </span>
                  <span className="min-w-0 break-words">{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
