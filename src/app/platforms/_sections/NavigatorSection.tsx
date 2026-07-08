"use client";

import { useState } from "react";
import { PlatformNavigator, PlatformArchitectureDiagram, PlatformMiniMap } from "@/platforms";
import { completeArchitecture } from "@/platforms/examples";
import { PreviewSection, DemoLabel } from "../_components/preview-primitives";

/**
 * Keyboard-navigable platform selection driving focus mode: selecting a
 * platform highlights only the relationships that touch it and dims the
 * rest, while the mini map echoes the same selection.
 */
export function NavigatorSection() {
  const [focusId, setFocusId] = useState<string | undefined>(undefined);

  return (
    <PreviewSection
      id="navigator"
      eyebrow="navigator and focus mode"
      title="Select to focus"
      description="Arrow keys move focus between platforms, Enter or a click selects one. Selecting a platform highlights its relationships and dims everything unrelated."
    >
      <div className="flex flex-col gap-6">
        <PlatformNavigator
          architecture={completeArchitecture}
          selectedPlatformId={focusId}
          onSelectPlatform={(id) => setFocusId((current) => (current === id ? undefined : id))}
        />

        <div className="scrollbar-none overflow-x-auto">
          <PlatformArchitectureDiagram
            architecture={completeArchitecture}
            layout="horizontal"
            selectedPlatformId={focusId}
            onSelectPlatform={(id) => setFocusId((current) => (current === id ? undefined : id))}
            focusPlatformId={focusId}
          />
        </div>

        <div className="flex flex-col gap-2">
          <DemoLabel>Mini map</DemoLabel>
          <PlatformMiniMap architecture={completeArchitecture} activePlatformId={focusId} />
        </div>
      </div>
    </PreviewSection>
  );
}
