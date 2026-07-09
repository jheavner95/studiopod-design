"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, Badge, Body, Caption, Heading, Button, TextInput, Textarea } from "@/components/ui";
import { Stack, Inline, Grid, Cluster, Surface, Panel, ScrollArea, Separator, DescriptionList } from "@/components/layout";
import { LAYOUT_PRIMITIVES, catalogEntryFor } from "../_data/primitives";

const ELEVATIONS = ["none", "subtle", "card", "panel", "floating"] as const;

function LiveDemo({ id }: { id: string }) {
  switch (id) {
    case "stack":
      return (
        <Stack gap="sm" className="max-w-sm">
          <TextInput label="Name" placeholder="e.g. Homepage Banner" />
          <TextInput label="Type" placeholder="e.g. Artwork Project" />
          <Textarea label="Description" placeholder="Optional notes" rows={2} />
        </Stack>
      );
    case "inline":
      return (
        <Inline gap="sm">
          <Button size="sm">Publish</Button>
          <Button size="sm" variant="secondary">
            Duplicate
          </Button>
          <Button size="sm" variant="ghost">
            Archive
          </Button>
          <Badge tone="success" size="sm">
            3 selected
          </Badge>
        </Inline>
      );
    case "grid":
      return (
        <Grid columns={3} gap="sm">
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i} padding="sm" className="flex h-20 items-center justify-center">
              <Caption className="text-ink-tertiary">Tile {i + 1}</Caption>
            </Card>
          ))}
        </Grid>
      );
    case "cluster":
      return (
        <Cluster>
          {["Marketing", "Q4", "Approved", "Homepage", "High priority", "Design", "Needs review"].map((tag) => (
            <Badge key={tag} tone="neutral" size="sm">
              {tag}
            </Badge>
          ))}
        </Cluster>
      );
    case "surface":
      return (
        <Inline gap="sm">
          {ELEVATIONS.map((elevation) => (
            <Surface key={elevation} elevation={elevation} padding="sm" className="flex w-24 items-center justify-center">
              <Caption className="text-ink-tertiary">{elevation}</Caption>
            </Surface>
          ))}
        </Inline>
      );
    case "panel":
      return (
        <Panel header={<span className="text-body-sm font-medium text-ink-primary">Inspector</span>} className="max-w-sm">
          <Stack gap="xs">
            <Body size="sm" muted>
              Selected: Homepage Banner
            </Body>
            <Body size="sm" muted>
              Status: Draft
            </Body>
          </Stack>
        </Panel>
      );
    case "scroll-area":
      return (
        <ScrollArea direction="vertical" maxHeight="160px" className="max-w-sm rounded-lg border border-border-subtle">
          <Stack gap="none">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="border-b border-border-subtle px-4 py-3 last:border-b-0">
                <Body size="sm" muted>
                  Activity entry {i + 1}
                </Body>
              </div>
            ))}
          </Stack>
        </ScrollArea>
      );
    case "separator":
      return (
        <Stack gap="sm" className="max-w-sm">
          <Body size="sm">Section one</Body>
          <Separator />
          <Body size="sm">Section two</Body>
          <Inline gap="sm" className="h-6">
            <Body size="sm">Left</Body>
            <Separator orientation="vertical" />
            <Body size="sm">Right</Body>
          </Inline>
        </Stack>
      );
    case "description-list":
      return (
        <div className="max-w-sm">
          <DescriptionList
            items={[
              { label: "Object", value: "Homepage Banner" },
              { label: "Type", value: "Artwork Project" },
              { label: "Status", value: "Draft" },
            ]}
          />
        </div>
      );
    default:
      return null;
  }
}

/** Select a primitive to see its purpose, live example, and documentation topics — the detail panel and demo always stay in sync with the selected id. */
export function PrimitiveGallery() {
  const [selectedId, setSelectedId] = useState(LAYOUT_PRIMITIVES[0].id);
  const selected = LAYOUT_PRIMITIVES.find((p) => p.id === selectedId) ?? LAYOUT_PRIMITIVES[0];
  const catalogEntry = catalogEntryFor(selected.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {LAYOUT_PRIMITIVES.map((primitive) => (
          <button
            key={primitive.id}
            type="button"
            onClick={() => setSelectedId(primitive.id)}
            aria-pressed={primitive.id === selectedId}
            className={cn(
              "focus-ring rounded-full border px-3 py-1.5 text-caption font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
              primitive.id === selectedId
                ? "border-accent-500/60 bg-accent-soft/30 text-accent-300"
                : "border-border-subtle bg-surface text-ink-tertiary hover:text-ink-secondary",
            )}
          >
            {primitive.name}
          </button>
        ))}
      </div>

      <Card padding="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Heading level={3}>{selected.name}</Heading>
          <Body muted>{catalogEntry.purpose}</Body>
        </div>

        <div className="flex flex-col gap-2">
          <Caption className="text-ink-tertiary">Used for</Caption>
          <div className="flex flex-wrap gap-1.5">
            {selected.examples.map((example) => (
              <Badge key={example} tone="accent" size="sm">
                {example}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Live example</Caption>
          <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">
            <LiveDemo id={selected.id} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Usage</Caption>
          <Body size="sm" muted>
            {selected.usage}
          </Body>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-border-subtle pt-4 sm:grid-cols-2">
          {selected.topics.map((topic) => (
            <div key={topic.label} className="flex min-w-0 flex-col gap-1">
              <span className="text-body-sm font-medium text-ink-primary">{topic.label}</span>
              <Body size="sm" muted className="min-w-0 break-words">
                {topic.note}
              </Body>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Responsive notes</Caption>
          <Body size="sm" muted>
            {selected.responsiveNotes}
          </Body>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Accessibility notes</Caption>
          <ul className="flex flex-col gap-1">
            {catalogEntry.accessibility.map((note) => (
              <li key={note} className="flex gap-2 text-body-sm text-ink-secondary">
                <span className="text-ink-tertiary" aria-hidden>
                  –
                </span>
                <span className="min-w-0 break-words">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-border-subtle pt-4">
          <Caption className="text-ink-tertiary">Common mistakes</Caption>
          <ul className="flex flex-col gap-1">
            {selected.commonMistakes.map((mistake) => (
              <li key={mistake} className="flex gap-2 text-body-sm text-ink-secondary">
                <span className="text-ink-tertiary" aria-hidden>
                  –
                </span>
                <span className="min-w-0 break-words">{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
