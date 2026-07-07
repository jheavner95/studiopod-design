"use client";

import { Columns3, Rows3, ScanLine, Ruler } from "lucide-react";
import { Button, Body } from "@/components/ui";
import { useGridOverlay, type GridOverlayState } from "../_lib/grid-overlay-context";
import { PreviewSection } from "../_components/preview-primitives";

const TOGGLES: { key: keyof GridOverlayState; label: string; icon: typeof Columns3; hint: string }[] = [
  { key: "layoutGrid", label: "Show layout grid", icon: Columns3, hint: "12-column guide within the content container" },
  { key: "baselineGrid", label: "Show baseline grid", icon: Rows3, hint: "8px horizontal rhythm across the viewport" },
  { key: "containerWidth", label: "Show container width", icon: ScanLine, hint: "Outlines the 1200px content boundary" },
  { key: "safeArea", label: "Show safe area", icon: Ruler, hint: "Tints the responsive side gutters" },
];

export function GridToolsSection() {
  const { state, toggle } = useGridOverlay();

  return (
    <PreviewSection
      id="grid-tools"
      eyebrow="grid tools"
      title="Grid overlay"
      description="Developer-only overlays for checking alignment. They render fixed to the viewport, so they stay visible while you scroll through every section above."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TOGGLES.map(({ key, label, icon: Icon, hint }) => {
          const active = state[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              aria-pressed={active}
              className="focus-ring flex items-start gap-4 rounded-lg border border-border bg-surface p-4 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:bg-surface-hover"
            >
              <span
                className={
                  active
                    ? "flex size-9 shrink-0 items-center justify-center rounded-md border border-accent-500 bg-accent-soft text-accent-400"
                    : "flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-canvas-raised text-ink-tertiary"
                }
              >
                <Icon className="size-4" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-body-sm font-medium text-ink-primary">{label}</span>
                <span className="text-caption text-ink-tertiary">{hint}</span>
              </span>
              <span className="ml-auto shrink-0 text-caption font-mono text-ink-tertiary">
                {active ? "on" : "off"}
              </span>
            </button>
          );
        })}
      </div>
      <Body size="sm" muted className="mt-6 max-w-[var(--container-narrow)]">
        These toggles are wired to a page-level overlay, not per-section previews. Scroll back up with any of them on to
        check how the color, typography, and component sections align to the grid.
      </Body>
      <div className="mt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            (Object.keys(state) as (keyof GridOverlayState)[]).forEach((key) => {
              if (state[key]) toggle(key);
            });
          }}
        >
          Clear all overlays
        </Button>
      </div>
    </PreviewSection>
  );
}
