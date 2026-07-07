"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardGrid } from "@/components/layout";
import { Body } from "@/components/ui";
import { Collapse, Expand } from "@/motion";
import { PreviewSection } from "../_components/preview-primitives";
import { DemoCard } from "../_components/DemoCard";

export function CollapseExpandSection() {
  const [collapseOpen, setCollapseOpen] = useState(true);
  const [expandOpen, setExpandOpen] = useState(false);

  return (
    <PreviewSection
      id="collapse-expand"
      eyebrow="collapse & expand"
      title="Collapse & Expand"
      description="One height-animation mechanism, two names for two directions of intent: Collapse starts open and shrinks away; Expand starts closed and grows open."
    >
      <CardGrid columns={2}>
        <DemoCard label="Collapse (starts open)">
          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => setCollapseOpen((open) => !open)}
              className="focus-ring flex items-center gap-2 self-start rounded-md border border-border bg-surface px-3 py-1.5 text-body-sm text-ink-primary"
            >
              {collapseOpen ? "Collapse it" : "Bring it back"}
              <ChevronDown className={cn("size-3.5 transition-transform", !collapseOpen && "rotate-180")} />
            </button>
            <Collapse open={collapseOpen}>
              <div className="rounded-md border border-border-subtle bg-canvas-raised p-3">
                <Body size="sm" muted>
                  This content shrinks to nothing when collapsed.
                </Body>
              </div>
            </Collapse>
          </div>
        </DemoCard>
        <DemoCard label="Expand (starts closed)">
          <div className="flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={() => setExpandOpen((open) => !open)}
              className="focus-ring flex items-center gap-2 self-start rounded-md border border-border bg-surface px-3 py-1.5 text-body-sm text-ink-primary"
            >
              {expandOpen ? "Hide details" : "Show details"}
              <ChevronDown className={cn("size-3.5 transition-transform", expandOpen && "rotate-180")} />
            </button>
            <Expand open={expandOpen}>
              <div className="rounded-md border border-border-subtle bg-canvas-raised p-3">
                <Body size="sm" muted>
                  This content grows into view when expanded.
                </Body>
              </div>
            </Expand>
          </div>
        </DemoCard>
      </CardGrid>
    </PreviewSection>
  );
}
