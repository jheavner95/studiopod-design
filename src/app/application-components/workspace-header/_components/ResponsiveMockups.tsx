import type { ReactNode } from "react";
import { CardGrid } from "@/components/layout";
import { Card, Body, Caption } from "@/components/ui";

function Chip({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap rounded-md border border-border bg-canvas-raised px-2 py-1 text-caption text-ink-secondary">
      {children}
    </span>
  );
}

function MockupFrame({ label, caption, children }: { label: string; caption: string; children: ReactNode }) {
  return (
    <Card padding="lg" className="flex h-full flex-col gap-4">
      <Caption className="text-ink-tertiary">{label}</Caption>
      <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-border-subtle bg-canvas p-3">{children}</div>
      <Body size="sm" muted>
        {caption}
      </Body>
    </Card>
  );
}

/**
 * Three illustrative mockups, not a live responsive header — the same
 * region chips, deliberately rearranged to show what collapses first at
 * each breakpoint. No pixel widths: each frame is sized by its own
 * content and the surrounding CardGrid, not a hardcoded device width.
 */
export function ResponsiveMockups() {
  return (
    <CardGrid columns={3} gap="sm">
      <MockupFrame
        label="Desktop"
        caption="All four regions visible at once: full Identity with description, up to three Status badges, and the full Actions hierarchy."
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Icon</Chip>
            <Chip>Name</Chip>
            <Chip>Description</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Health</Chip>
            <Chip>Validation</Chip>
            <Chip>Sync</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Primary</Chip>
            <Chip>Secondary</Chip>
            <Chip>Utility</Chip>
            <Chip>⋯</Chip>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip>Breadcrumbs / Context</Chip>
        </div>
      </MockupFrame>

      <MockupFrame
        label="Tablet"
        caption="Description drops. Status collapses to one badge plus a count. Secondary and Utility actions move into the Overflow Menu."
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Icon</Chip>
            <Chip>Name</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Health</Chip>
            <Chip>+2</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Primary</Chip>
            <Chip>⋯</Chip>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip>Context</Chip>
        </div>
      </MockupFrame>

      <MockupFrame
        label="Mobile"
        caption="Identity and Overflow share the top line. Status collapses to a single summary badge on its own line with the Primary Action. Context hides behind Overflow."
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Chip>Icon</Chip>
            <Chip>Name</Chip>
          </div>
          <Chip>⋯</Chip>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Chip>2 issues</Chip>
          <Chip>Primary</Chip>
        </div>
      </MockupFrame>
    </CardGrid>
  );
}
