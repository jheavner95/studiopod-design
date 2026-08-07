"use client";

import { PreviewSection, VariantLabel, DeviceFrame } from "./preview-primitives";
import { REGISTRY } from "../_lib/registry";

const GROUP_DESCRIPTIONS: Record<string, string> = {
  Hero: "The top-of-page opener. Centered, split, and illustration-first layouts share one content model.",
  Workflow: "Explains a sequential process: an animated pipeline up top, expandable detail cards below.",
  Platform: "Platform module cards and an architecture diagram, kept in sync through one active-selection state.",
  "Feature grid": "A responsive grid of feature cards, from 2 to 6 columns.",
  Comparison: "Side-by-side cards, a before/after pair, or a full feature matrix.",
  Metrics: "Animated counters for statistics, or a status-driven health dashboard.",
  Timeline: "Milestones and schedules, as a vertical list or a compact horizontal rail.",
  CTA: "A closing call-to-action band, in three sizes and three layouts, with an enterprise treatment.",
  FAQ: "An accordion with category filters and search wired in.",
  Testimonial: "Customer proof, as an even grid or one spotlighted quote.",
  Empty: "A polished stand-in for a section that hasn't been built yet.",
};

function slugify(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

const GROUPS = Array.from(new Set(REGISTRY.map((entry) => entry.group)));

/**
 * Renders every registry entry, grouped by composition. This is a client
 * boundary because several registry entries (Metrics' `format` callbacks,
 * Workflow/Platform/FAQ's inherent interactivity) can't cross a
 * Server-to-Client props boundary — functions aren't serializable. Keeping
 * that boundary here, rather than on the whole page, lets the page's own
 * static header stay a plain Server Component.
 */
export function PlaygroundBody() {
  return (
    <>
      {GROUPS.map((group) => {
        const entries = REGISTRY.filter((entry) => entry.group === group);
        return (
          <PreviewSection
            key={group}
            id={slugify(group)}
            eyebrow={group.toLowerCase()}
            title={`${group} Composition`}
            description={GROUP_DESCRIPTIONS[group]}
          >
            <div className="flex flex-col gap-16">
              {entries.map((entry) => (
                <div key={entry.slug} className="flex flex-col gap-6">
                  <VariantLabel>{entry.label}</VariantLabel>
                  <div className="overflow-hidden rounded-xl border border-border-subtle">{entry.render()}</div>
                  {entry.primary ? (
                    <div className="flex justify-center pt-2">
                      <DeviceFrame slug={entry.slug} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </PreviewSection>
        );
      })}
    </>
  );
}
