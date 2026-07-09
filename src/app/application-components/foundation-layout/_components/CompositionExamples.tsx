import type { ReactNode } from "react";
import { Badge, Body, Caption } from "@/components/ui";
import { Stack, Inline, Panel, Surface, Cluster, DescriptionList } from "@/components/layout";

interface CompositionExampleProps {
  title: string;
  builtFrom: string[];
  children: ReactNode;
}

function CompositionExample({ title, builtFrom, children }: CompositionExampleProps) {
  return (
    <Stack gap="sm">
      <Stack gap="xs">
        <span className="text-body-sm font-medium text-ink-primary">{title}</span>
        <Caption className="text-ink-tertiary">Built from: {builtFrom.join(", ")}</Caption>
      </Stack>
      <div className="rounded-lg border border-dashed border-border-subtle bg-canvas/40 p-6">{children}</div>
    </Stack>
  );
}

/** Five recognizable UI shapes, each assembled entirely from the nine layout primitives (plus Badge as a leaf atom) — no business logic, no fetched data, just placeholder content. */
export function CompositionExamples() {
  return (
    <Stack gap="lg">
      <CompositionExample title="Inspector Section" builtFrom={["Panel", "Stack", "Description List"]}>
        <Panel header={<span className="text-body-sm font-medium text-ink-primary">Identity</span>} className="max-w-sm">
          <DescriptionList
            bordered={false}
            items={[
              { label: "Name", value: "Homepage Banner" },
              { label: "Type", value: "Artwork Project" },
            ]}
          />
        </Panel>
      </CompositionExample>

      <CompositionExample title="Toolbar" builtFrom={["Surface", "Inline"]}>
        <Surface elevation="panel" padding="sm">
          <Inline justify="between">
            <Inline gap="sm">
              <Badge tone="accent" size="sm">
                Grid
              </Badge>
              <Badge tone="neutral" size="sm">
                Table
              </Badge>
            </Inline>
            <Badge tone="success" size="sm">
              12 items
            </Badge>
          </Inline>
        </Surface>
      </CompositionExample>

      <CompositionExample title="Asset Card" builtFrom={["Surface", "Stack", "Inline", "Cluster"]}>
        <Surface elevation="card" padding="sm" className="max-w-xs">
          <Stack gap="sm">
            <div className="flex h-24 items-center justify-center rounded-md bg-canvas-raised">
              <Caption className="text-ink-tertiary">Preview</Caption>
            </div>
            <Inline justify="between">
              <Body size="sm">homepage-banner.png</Body>
              <Badge tone="neutral" size="sm">
                2.4 MB
              </Badge>
            </Inline>
            <Cluster gap="xs">
              <Badge tone="neutral" size="sm">
                PNG
              </Badge>
              <Badge tone="neutral" size="sm">
                1920×1080
              </Badge>
            </Cluster>
          </Stack>
        </Surface>
      </CompositionExample>

      <CompositionExample title="Metadata Panel" builtFrom={["Panel", "Description List"]}>
        <Panel header={<span className="text-body-sm font-medium text-ink-primary">Metadata</span>} className="max-w-sm">
          <DescriptionList
            bordered={false}
            layout="two-column"
            items={[
              { label: "Created", value: "3 days ago" },
              { label: "Owner", value: "J. Heavner" },
              { label: "Status", value: "Draft" },
            ]}
          />
        </Panel>
      </CompositionExample>

      <CompositionExample title="Dashboard Tile" builtFrom={["Surface", "Stack"]}>
        <Surface elevation="card" padding="md" className="max-w-40">
          <Stack gap="xs" align="start">
            <span className="text-display-2 font-semibold text-ink-primary">24</span>
            <Caption className="text-ink-tertiary">Active jobs</Caption>
          </Stack>
        </Surface>
      </CompositionExample>
    </Stack>
  );
}
