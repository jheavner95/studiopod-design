"use client";

import { File, Folder, Terminal, ChevronRight } from "lucide-react";
import { SplitView, SplitPane, SplitDivider } from "@/components/layout";
import { DescriptionList } from "@/components/metadata";
import { Body, Caption, Badge } from "@/components/ui";
import { CANONICAL_PRODUCTS, CANONICAL_JOBS, CANONICAL_PEOPLE } from "@/lib/canonical";

/**
 * DS-3 Part 7 — six representative compositions, mirroring
 * WorkspaceExamples.tsx's own pattern: real components, canonical demo
 * data, no decorative placeholder boxes. Every example renders inside a
 * fixed-height `DemoFrame` so the resizable panes have real, non-zero
 * layout to drag within — SplitView itself has no opinion about height.
 */
function DemoFrame({ children, height = "18rem" }: { children: React.ReactNode; height?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border" style={{ height }}>
      {children}
    </div>
  );
}

function PaneSurface({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div className={`flex h-full flex-col overflow-y-auto bg-surface ${padded ? "p-3" : ""}`}>{children}</div>
  );
}

/** 1. Two-pane editor — the minimal real shape: a file list beside its content. */
export function TwoPaneEditorExample() {
  return (
    <DemoFrame>
      <SplitView orientation="horizontal">
        <SplitPane defaultSize={28} minSize={18} maxSize={50}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Files</Caption>
            <div className="flex flex-col gap-0.5">
              {["catalog.tsx", "listings.tsx", "inventory.ts"].map((file, i) => (
                <div
                  key={file}
                  className={i === 0 ? "flex items-center gap-1.5 rounded-md bg-accent-soft/30 px-2 py-1 text-body-sm text-accent-300" : "flex items-center gap-1.5 rounded-md px-2 py-1 text-body-sm text-ink-secondary"}
                >
                  <File className="size-3.5" aria-hidden />
                  {file}
                </div>
              ))}
            </div>
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize file list" />
        <SplitPane>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">catalog.tsx</Caption>
            <Body size="sm" className="font-mono text-ink-secondary">
              export function Catalog() {"{"}
              <br />
              &nbsp;&nbsp;return &lt;ProductGrid /&gt;;
              <br />
              {"}"}
            </Body>
          </PaneSurface>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}

/** 2. Three-pane inspector — the canonical browse/work/inspect triple, each independently resizable. */
export function ThreePaneInspectorExample() {
  return (
    <DemoFrame>
      <SplitView orientation="horizontal">
        <SplitPane defaultSize={22} minSize={15} maxSize={40}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Batches</Caption>
            {["#204", "#203", "#202"].map((id, i) => (
              <div key={id} className={i === 0 ? "rounded-md bg-accent-soft/30 px-2 py-1 text-body-sm text-accent-300" : "rounded-md px-2 py-1 text-body-sm text-ink-secondary"}>
                {id}
              </div>
            ))}
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize batch list" />
        <SplitPane defaultSize={48}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Batch items</Caption>
            <div className="flex flex-col gap-1.5">
              {CANONICAL_JOBS.slice(0, 3).map((job) => (
                <div key={job.id} className="flex items-center justify-between rounded-md border border-border-subtle px-2 py-1">
                  <Body size="sm" className="text-ink-primary">
                    {job.name} {job.ref}
                  </Body>
                  <Badge tone="accent" size="sm">
                    Queued
                  </Badge>
                </div>
              ))}
            </div>
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize inspector" />
        <SplitPane minSize={15} maxSize={45}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Selected job</Caption>
            <DescriptionList items={[{ label: "Assignee", value: CANONICAL_PEOPLE[0].name }, { label: "Status", value: "Queued" }]} bordered={false} />
          </PaneSurface>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}

/** 3. Vertical split — a preview stacked over its own console, the divider drags up/down. */
export function VerticalSplitExample() {
  return (
    <DemoFrame>
      <SplitView orientation="vertical">
        <SplitPane defaultSize={65} minSize={30}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Preview</Caption>
            <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-border text-ink-tertiary">
              <Caption>Canvas / preview area</Caption>
            </div>
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize console" />
        <SplitPane minSize={15}>
          <PaneSurface>
            <Caption className="mb-2 flex items-center gap-1.5 text-ink-tertiary">
              <Terminal className="size-3.5" aria-hidden />
              Console
            </Caption>
            <Body size="sm" className="font-mono text-ink-tertiary">
              ✓ Build complete in 1.2s
            </Body>
          </PaneSurface>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}

/** 4. Nested split — an outer horizontal SplitView whose right pane contains its own independent vertical SplitView, each with its own size state. */
export function NestedSplitExample() {
  return (
    <DemoFrame height="20rem">
      <SplitView orientation="horizontal">
        <SplitPane defaultSize={26} minSize={18} maxSize={45}>
          <PaneSurface>
            <Caption className="mb-2 flex items-center gap-1.5 text-ink-tertiary">
              <Folder className="size-3.5" aria-hidden />
              Project
            </Caption>
            {CANONICAL_PRODUCTS.map((p, i) => (
              <div key={p.id} className={i === 0 ? "rounded-md bg-accent-soft/30 px-2 py-1 text-body-sm text-accent-300" : "rounded-md px-2 py-1 text-body-sm text-ink-secondary"}>
                {p.name}
              </div>
            ))}
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize project panel" />
        <SplitPane>
          <SplitView orientation="vertical">
            <SplitPane defaultSize={70} minSize={30}>
              <PaneSurface>
                <Caption className="mb-2 text-ink-tertiary">Editor</Caption>
                <Body size="sm" className="font-mono text-ink-secondary">
                  const sku = &quot;{CANONICAL_PRODUCTS[0].sku}&quot;;
                </Body>
              </PaneSurface>
            </SplitPane>
            <SplitDivider aria-label="Resize terminal" />
            <SplitPane minSize={15}>
              <PaneSurface>
                <Caption className="mb-2 flex items-center gap-1.5 text-ink-tertiary">
                  <Terminal className="size-3.5" aria-hidden />
                  Terminal
                </Caption>
                <Body size="sm" className="font-mono text-ink-tertiary">
                  $ npm run build
                </Body>
              </PaneSurface>
            </SplitPane>
          </SplitView>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}

/** 5. Collapsible inspector — drag the divider closed, or focus it and press Enter, to collapse the pane fully. There's no separate toggle-button API: collapse is the divider's own interaction, not a consumer-owned prop (that's `WorkspaceInspector`'s `collapsed` pattern, a different, consumer-controlled mechanism). */
export function CollapsibleInspectorExample() {
  return (
    <DemoFrame>
      <SplitView orientation="horizontal">
        <SplitPane>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Content</Caption>
            <Body size="sm" muted>
              Drag the divider to the right edge, or focus it and press Enter, to collapse Properties fully.
            </Body>
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize or collapse properties" />
        <SplitPane defaultSize={26} minSize={18} maxSize={45} collapsible>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Properties</Caption>
            <DescriptionList
              items={[
                { label: "SKU", value: CANONICAL_PRODUCTS[1].sku },
                { label: "Kind", value: CANONICAL_PRODUCTS[1].kind },
              ]}
              bordered={false}
            />
          </PaneSurface>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}

/** 6. IDE-style layout — the flagship composition: a collapsible file explorer beside a nested editor/terminal split, the full anatomy an IDE-shaped tool actually needs. */
export function IdeStyleLayoutExample() {
  return (
    <DemoFrame height="22rem">
      <SplitView orientation="horizontal">
        <SplitPane defaultSize={20} minSize={14} maxSize={40} collapsible>
          <PaneSurface>
            <Caption className="mb-2 flex items-center gap-1.5 text-ink-tertiary">
              <Folder className="size-3.5" aria-hidden />
              Explorer
            </Caption>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-body-sm text-ink-secondary">
                <ChevronRight className="size-3" aria-hidden />
                src
              </div>
              {["catalog.tsx", "inventory.ts"].map((file) => (
                <div key={file} className="ml-4 flex items-center gap-1.5 rounded-md px-2 py-0.5 text-body-sm text-ink-secondary">
                  <File className="size-3.5" aria-hidden />
                  {file}
                </div>
              ))}
            </div>
          </PaneSurface>
        </SplitPane>
        <SplitDivider aria-label="Resize or collapse explorer" />
        <SplitPane defaultSize={55}>
          <SplitView orientation="vertical">
            <SplitPane defaultSize={70} minSize={30}>
              <PaneSurface>
                <Caption className="mb-2 text-ink-tertiary">catalog.tsx</Caption>
                <Body size="sm" className="font-mono text-ink-secondary">
                  export default function Catalog() {"{"} … {"}"}
                </Body>
              </PaneSurface>
            </SplitPane>
            <SplitDivider aria-label="Resize terminal" />
            <SplitPane minSize={15} collapsible>
              <PaneSurface>
                <Caption className="mb-2 flex items-center gap-1.5 text-ink-tertiary">
                  <Terminal className="size-3.5" aria-hidden />
                  Terminal
                </Caption>
                <Body size="sm" className="font-mono text-ink-tertiary">
                  ✓ Build complete in 1.2s
                </Body>
              </PaneSurface>
            </SplitPane>
          </SplitView>
        </SplitPane>
        <SplitDivider aria-label="Resize inspector" />
        <SplitPane minSize={16} maxSize={40}>
          <PaneSurface>
            <Caption className="mb-2 text-ink-tertiary">Outline</Caption>
            <Body size="sm" muted>
              Catalog() → ProductGrid → ProductCard × {CANONICAL_PRODUCTS.length}
            </Body>
          </PaneSurface>
        </SplitPane>
      </SplitView>
    </DemoFrame>
  );
}
