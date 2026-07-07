"use client";

import { useGridOverlay } from "../_lib/grid-overlay-context";

/**
 * Fixed-to-viewport developer overlays (layout columns, baseline rhythm,
 * container bounds, safe-area gutters). Toggled from the Grid Tools
 * section but rendered once near the page root so they stay visible while
 * scrolling past every other section.
 */
export function GridOverlay() {
  const { state } = useGridOverlay();
  const anyActive = state.layoutGrid || state.baselineGrid || state.containerWidth || state.safeArea;

  if (!anyActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[var(--z-overlay)]">
      {state.baselineGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(91,127,255,0.14) 0, rgba(91,127,255,0.14) 1px, transparent 1px, transparent 8px)",
          }}
        />
      )}

      {state.safeArea && (
        <>
          <div className="absolute inset-y-0 left-0 bg-accent-500/[0.08]" style={{ width: "var(--spacing-gutter)" }} />
          <div
            className="absolute inset-y-0 right-0 bg-accent-500/[0.08]"
            style={{ width: "var(--spacing-gutter)" }}
          />
        </>
      )}

      {state.containerWidth && (
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-accent-400/50"
          style={{ width: "var(--container-content)", maxWidth: "100%" }}
        >
          <span className="absolute top-2 left-2 rounded-full bg-accent-500 px-2 py-0.5 font-mono text-[10px] text-white">
            content · 1200px
          </span>
        </div>
      )}

      {state.layoutGrid && (
        <div
          className="absolute inset-y-0 left-1/2 grid w-full max-w-[var(--container-content)] -translate-x-1/2 grid-cols-12 gap-4 px-[var(--spacing-gutter)]"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-x border-success/25 bg-success/[0.06]" />
          ))}
        </div>
      )}
    </div>
  );
}
