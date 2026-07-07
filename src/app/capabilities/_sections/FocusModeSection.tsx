"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CapabilityRegistryDiagram } from "@/capabilities";
import { completeCapabilityArchitecture } from "@/capabilities/examples";
import { PreviewSection } from "../_components/preview-primitives";

/** Selecting a capability highlights only the adapters and relationships that touch it, dimming everything else. */
export function FocusModeSection() {
  const [focusId, setFocusId] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="focus-mode"
      eyebrow="capability focus"
      title="Focus on one capability"
      description="Every capability in the complete architecture, connected through the same abstraction. Select one to highlight its relationships and dim the rest."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Capabilities">
          {completeCapabilityArchitecture.capabilities.map((capability) => (
            <button
              key={capability.id}
              type="button"
              aria-pressed={focusId === capability.id}
              onClick={() => setFocusId((current) => (current === capability.id ? undefined : capability.id))}
              className={cn(
                "focus-ring rounded-full border px-3 py-1.5 text-body-sm transition-colors duration-[var(--duration-fast)]",
                focusId === capability.id
                  ? "border-accent-500 bg-accent-soft text-accent-400"
                  : "border-border-subtle text-ink-secondary hover:text-ink-primary",
              )}
            >
              {capability.name}
            </button>
          ))}
        </div>

        <div className="scrollbar-none overflow-x-auto">
          <CapabilityRegistryDiagram
            registry={completeCapabilityArchitecture}
            selectedId={focusId}
            onSelect={(id) => setFocusId((current) => (current === id ? undefined : id))}
            focusId={focusId}
          />
        </div>
      </div>
    </PreviewSection>
  );
}
