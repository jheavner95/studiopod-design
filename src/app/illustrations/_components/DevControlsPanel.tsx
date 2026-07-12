"use client";

import { Columns3, Crosshair, Waypoints, Grid3x3, Route, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { ControlDockShell } from "@/motion";
import { useIllustrationDevControls, type IllustrationDevState } from "@/illustrations";

const TOGGLES: { key: keyof IllustrationDevState; label: string; icon: typeof Columns3 }[] = [
  { key: "nodeBounds", label: "Node Bounds", icon: Columns3 },
  { key: "anchorPoints", label: "Anchor Points", icon: Crosshair },
  { key: "connectorRouting", label: "Connector Routing", icon: Waypoints },
  { key: "grid", label: "Grid", icon: Grid3x3 },
  { key: "animationPaths", label: "Animation Paths", icon: Route },
  { key: "labelRegions", label: "Label Regions", icon: Tag },
];

/** The one real control surface for the playground's developer overlays — every toggle writes to IllustrationDevProvider, so every diagram on the page responds at once. */
export function DevControlsPanel() {
  const { state, setToggle } = useIllustrationDevControls();

  return (
    <ControlDockShell label="Developer overlay controls">
      {TOGGLES.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => setToggle(key, !state[key])}
          aria-pressed={state[key]}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-[var(--duration-fast)]",
            state[key]
              ? "border-accent-500 bg-accent-soft text-accent-400"
              : "border-border-subtle text-ink-tertiary hover:text-ink-primary",
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </ControlDockShell>
  );
}
