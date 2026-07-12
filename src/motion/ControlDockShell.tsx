import type { ReactNode } from "react";

interface ControlDockShellProps {
  children: ReactNode;
  /** Accessible name for the dock landmark. Defaults to "Motion controls". */
  label?: string;
}

/**
 * Shared bottom-anchored dock chrome for every page-scoped playground
 * control surface (motion, illustrations, workflows, platforms, production,
 * capabilities). Owns positioning and pill styling only — each page keeps
 * its own control content (playback, diagnostics, dev-overlay toggles) and
 * renders it as children here, so the single fix to dock placement applies
 * everywhere at once.
 *
 * Fixed rather than sticky: sticky positioning let the dock scroll under
 * the persistent GlobalNav header once a page scrolled past it. Anchoring
 * to the bottom of the viewport instead keeps it clear of GlobalNav (which
 * anchors to the top) at every scroll position.
 */
export function ControlDockShell({ children, label = "Motion controls" }: ControlDockShellProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[var(--z-sticky)] flex justify-center px-4"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        role="region"
        aria-label={label}
        className="pointer-events-auto flex max-h-[40vh] max-w-full flex-wrap items-center justify-center gap-3 overflow-y-auto rounded-full border border-border bg-canvas/90 px-3 py-2 shadow-floating backdrop-blur"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Bottom clearance every dock-consuming page applies to its PageShell (or
 * DocsShell content column) so the fixed dock never covers final-section
 * content. One shared value — dock height varies as controls wrap across
 * breakpoints, so this is sized for the worst case (two wrapped rows) plus
 * the dock's own bottom offset, rather than a per-page guess.
 */
export const DOCK_CLEARANCE_CLASS = "pb-[calc(7rem+env(safe-area-inset-bottom))]";
