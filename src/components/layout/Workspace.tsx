import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Workspace — generic application-shell primitive.
 *
 * A workspace is the full-bleed, chrome-owning layout an application tool lives
 * in: a header strip, an optional left navigation column, a primary content
 * region, an optional inspector column, and an optional status footer. It is
 * distinct from `PageShell`, which is a *document* wrapper (`min-h-screen`,
 * page scrolls). A workspace does not scroll — its content region does.
 *
 * ─── Composition, not configuration ─────────────────────────────────────────
 *
 *   <Workspace fullHeight>
 *     <WorkspaceHeader>…</WorkspaceHeader>
 *     <WorkspaceToolbar>…</WorkspaceToolbar>
 *     <WorkspaceBody>
 *       <WorkspaceNavigation label="Primary">…</WorkspaceNavigation>
 *       <WorkspaceContent>…</WorkspaceContent>
 *       <WorkspaceInspector label="Details">…</WorkspaceInspector>
 *     </WorkspaceBody>
 *     <WorkspaceFooter>…</WorkspaceFooter>
 *   </Workspace>
 *
 * `WorkspaceBody` exists because header/footer stack vertically while
 * navigation/content/inspector sit in a horizontal row. Something has to own
 * that row and its `min-h-0`; making it explicit keeps the tree honest and
 * gives `SplitView` (src/components/layout/SplitView.tsx) a place to slot
 * in — e.g. as `WorkspaceContent`'s children, to divide it into resizable
 * panes. Every region is optional.
 *
 * ─── Anatomy: this maps onto the canonical six-tier workspace blueprint ─────
 *
 * (docs/engineering-notes/05-workspace-architecture.md): Tier 1 Global
 * Navigation is the site chrome outside this primitive's concern (`GlobalNav`).
 * Tier 2 is `WorkspaceHeader`. Tier 3 is `WorkspaceToolbar` — "reads Header's
 * context, never repeats it": Header carries identity/status, Toolbar carries
 * actions/interaction, and the two must not duplicate each other. Tier 4 is
 * the three peers inside `WorkspaceBody` (`WorkspaceNavigation` /
 * `WorkspaceContent` / `WorkspaceInspector`). Tier 5 is documented as
 * "deliberately unoccupied/reserved, not a gap" — this primitive intentionally
 * has no corresponding region; do not add one. Tier 6 (Operational Status) is
 * `WorkspaceFooter`.
 *
 * ─── Who owns scrolling ─────────────────────────────────────────────────────
 *
 * `Workspace` is always `overflow-hidden`. This is deliberate: it prevents the
 * classic nested-page-scroll bug where an inner region grows and the whole shell
 * scrolls behind fixed chrome. Exactly one descendant should scroll, and it is
 * opt-in per region:
 *
 *   <WorkspaceContent scroll>        content region scrolls (the common case)
 *   <WorkspaceContent>               content does NOT scroll — for canvas/map
 *                                    views that manage their own viewport
 *   <WorkspaceInspector scroll>      inspector scrolls independently
 *
 * For document-scrolling layouts, use `PageShell`, not `Workspace`.
 *
 * ─── Density ────────────────────────────────────────────────────────────────
 *
 * `density` is published as a `data-density` attribute and consumed through
 * Tailwind group variants — NOT React context. That keeps the whole family
 * server-component-safe: static composition needs no client runtime, and no
 * "use client" directive appears in this file.
 *
 * ─── Deliberately absent ────────────────────────────────────────────────────
 *
 * No route knowledge, no workspace IDs, no navigation logic, no storage, no
 * hardcoded inspector width, no product concepts. Inspector sizing is the
 * consumer's (`width`), and drag-to-resize belongs to `SplitView` — compose
 * it inside a region rather than asking Workspace to grow a resize API.
 *
 * Also no ref forwarding. The package supports React 18 and 19, and a plain
 * `ref` prop only works on 19 — on 18 a function component never receives it,
 * so the API would be silently dead for half the supported range. No other
 * component in this package forwards a ref either. If refs are needed later,
 * add them deliberately via forwardRef across the whole family, not ad hoc.
 */

// ── Density ──────────────────────────────────────────────────────────────────

export type WorkspaceDensity = "comfortable" | "compact";

/**
 * Region padding per density. Exported so sibling primitives can align with a
 * workspace's rhythm, mirroring `densityPaddingMap` in the table family.
 */
export const workspaceDensityPadding: Record<WorkspaceDensity, string> = {
  comfortable: "px-4 py-3",
  compact: "px-3 py-2",
};

/** Header height per density — the one dimension a shell must agree on. */
export const workspaceDensityHeaderHeight: Record<WorkspaceDensity, string> = {
  comfortable: "h-12",
  compact: "h-9",
};

// ── Workspace ────────────────────────────────────────────────────────────────

export interface WorkspaceProps {
  children: ReactNode;
  className?: string;
  /**
   * `true`  → the workspace owns the viewport (`h-dvh`). For a top-level tool.
   * `false` → contained: fills whatever height its parent gives it (`h-full`).
   *           Use when embedding a workspace inside an existing page.
   * @default false
   */
  fullHeight?: boolean;
  /** @default "comfortable" */
  density?: WorkspaceDensity;
}

export function Workspace({
  children,
  className,
  fullHeight = false,
  density = "comfortable",
}: WorkspaceProps) {
  return (
    <div
      data-density={density}
      className={cn(
        "group/workspace flex flex-col overflow-hidden bg-panel text-ink-primary",
        // h-dvh (not h-screen) so mobile browser chrome doesn't clip the footer.
        fullHeight ? "h-dvh" : "h-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────────────

export interface WorkspaceHeaderProps {
  children: ReactNode;
  className?: string;
  /**
   * Render as a plain `div` instead of `<header>`. Use when the workspace is
   * embedded and a `banner`-ish landmark would be misleading.
   * @default false
   */
  asDiv?: boolean;
}

export function WorkspaceHeader({ children, className, asDiv = false }: WorkspaceHeaderProps) {
  const Tag = (asDiv ? "div" : "header") as ElementType;
  return (
    <Tag
      className={cn(
        "flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface",
        "px-4 group-data-[density=compact]/workspace:px-3",
        "h-12 group-data-[density=compact]/workspace:h-9",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

// ── Toolbar ──────────────────────────────────────────────────────────────────

export interface WorkspaceToolbarProps {
  children: ReactNode;
  className?: string;
}

/**
 * Tier 3 of the canonical anatomy — a secondary strip below the header for
 * page-specific actions and interaction (filters, view toggles, bulk-action
 * triggers), never identity or status (that stays in `WorkspaceHeader`).
 *
 * Deliberately a plain `div`, not `role="toolbar"`. The ARIA `toolbar` role
 * implies a single cohesive widget with roving-tabindex arrow-key navigation
 * between its controls (WAI-ARIA APG) — correct for something like a
 * text-formatting toolbar, wrong for a strip of otherwise-independent
 * controls (a search field, a few buttons, a menu) that should each remain
 * normally Tab-reachable. Applying the role without implementing that
 * keyboard pattern would be a real accessibility regression, not a
 * enhancement — so this stays unstyled ARIA-wise, exactly like `WorkspaceBody`.
 */
export function WorkspaceToolbar({ children, className }: WorkspaceToolbarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 border-b border-border-subtle bg-surface",
        "px-4 py-2 group-data-[density=compact]/workspace:px-3 group-data-[density=compact]/workspace:py-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── Body ─────────────────────────────────────────────────────────────────────

export interface WorkspaceBodyProps {
  children: ReactNode;
  className?: string;
}

/**
 * The horizontal row holding navigation, content and inspector.
 *
 * `min-h-0` is load-bearing, not decoration: a flex child defaults to
 * `min-height:auto`, which refuses to shrink below its content and silently
 * breaks every descendant's `overflow-y-auto`.
 */
export function WorkspaceBody({ children, className }: WorkspaceBodyProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 overflow-hidden", className)}>
      {children}
    </div>
  );
}

// ── Navigation ───────────────────────────────────────────────────────────────

export interface WorkspaceNavigationProps {
  children: ReactNode;
  className?: string;
  /**
   * Accessible name. Required when a page has more than one navigation
   * landmark, which is the norm for a workspace inside a site.
   */
  label?: string;
  /**
   * Hide below the `lg` breakpoint. The consumer is responsible for offering an
   * alternative (drawer, menu) at narrow widths — the primitive will not invent
   * one, but it also will not leave an unusable column in the way.
   * @default false
   */
  hideBelowLg?: boolean;
  /**
   * Width. Number → px; string → any CSS length; `undefined` → shrink to
   * content, unchanged from before this prop existed. Mirrors
   * `WorkspaceInspector`'s `width` prop — the two peer side-regions now share
   * one sizing API instead of only one of them having it.
   * @default undefined (content width)
   */
  width?: number | string;
  /**
   * A user-triggered collapse to an icon-only rail, distinct from
   * `hideBelowLg`: that's a CSS-only, viewport-driven removal; this is an
   * explicit, always-controlled boolean the consumer owns the state for (a
   * button + their own `useState`, in their own Client Component — this
   * primitive stays server-safe and opinion-free about *how* collapse is
   * triggered). When true, renders at a fixed 3.5rem rail width regardless of
   * `width`, and publishes `data-collapsed` so children can switch to
   * icon-only content via the same group-variant mechanism `density` uses —
   * no context, no prop drilling. Still present in the DOM and focus order
   * (unlike `hideBelowLg`'s `hidden`): a deliberate user choice to collapse
   * is not the same as content being genuinely unusable at this width.
   * @default false
   */
  collapsed?: boolean;
}

export function WorkspaceNavigation({
  children,
  className,
  label,
  hideBelowLg = false,
  width,
  collapsed = false,
}: WorkspaceNavigationProps) {
  return (
    <nav
      aria-label={label}
      data-collapsed={collapsed}
      style={collapsed ? undefined : width !== undefined ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
      className={cn(
        "flex shrink-0 flex-col overflow-y-auto border-r border-border-subtle bg-surface",
        "transition-[width] duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-reduce:transition-none",
        collapsed && "w-14 overflow-x-hidden",
        hideBelowLg && "hidden lg:flex",
        className,
      )}
    >
      {children}
    </nav>
  );
}

// ── Content ──────────────────────────────────────────────────────────────────

export interface WorkspaceContentProps {
  children: ReactNode;
  className?: string;
  /**
   * Give this region its own scrollbar. Leave off for canvas/viewport views
   * that manage their own scrolling.
   * @default false
   */
  scroll?: boolean;
  /** Apply density padding. Off by default so tables and canvases start flush. */
  padded?: boolean;
  /**
   * Render as a plain `div` instead of `<main>`. Use when the surrounding page
   * already has a `main`, since a document must not contain two.
   * @default false
   */
  asDiv?: boolean;
  label?: string;
}

export function WorkspaceContent({
  children,
  className,
  scroll = false,
  padded = false,
  asDiv = false,
  label,
}: WorkspaceContentProps) {
  const Tag = (asDiv ? "div" : "main") as ElementType;
  return (
    <Tag
      aria-label={label}
      className={cn(
        // min-w-0 stops long unbreakable content forcing the row wider than the
        // shell and pushing the inspector off-screen.
        "flex min-h-0 min-w-0 flex-1 flex-col",
        scroll ? "overflow-y-auto" : "overflow-hidden",
        padded && "p-4 group-data-[density=compact]/workspace:p-3",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

// ── Inspector ────────────────────────────────────────────────────────────────

export interface WorkspaceInspectorProps {
  children: ReactNode;
  className?: string;
  /** Accessible name — recommended, since "complementary" alone is not descriptive. */
  label?: string;
  /**
   * Width. Number → px; string → any CSS length. The primitive has no opinion
   * and no default dimension; sizing is the consumer's decision.
   * @default "20rem"
   */
  width?: number | string;
  /** @default false */
  scroll?: boolean;
  /**
   * Hide below `lg`. An inspector beside content is unusable on a narrow
   * viewport; hiding is the honest default rather than crushing the content
   * region. `hidden` also removes it from the focus order — a CSS-only
   * narrowing must not strand keyboard users in an invisible panel.
   * @default true
   */
  hideBelowLg?: boolean;
  /**
   * A user-triggered collapse to a narrow rail — see `WorkspaceNavigation`'s
   * `collapsed` for the full rationale (consumer-owned state, CSS-only
   * transition, distinct from `hideBelowLg`). Overrides `width` while active.
   * @default false
   */
  collapsed?: boolean;
}

export function WorkspaceInspector({
  children,
  className,
  label,
  width = "20rem",
  scroll = false,
  hideBelowLg = true,
  collapsed = false,
}: WorkspaceInspectorProps) {
  return (
    <aside
      aria-label={label}
      data-collapsed={collapsed}
      style={{ width: collapsed ? undefined : typeof width === "number" ? `${width}px` : width }}
      className={cn(
        "shrink-0 flex-col border-l border-border-subtle bg-surface",
        "transition-[width] duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-reduce:transition-none",
        collapsed && "w-14 overflow-x-hidden",
        hideBelowLg ? "hidden lg:flex" : "flex",
        scroll ? "overflow-y-auto" : "overflow-hidden",
        className,
      )}
    >
      {children}
    </aside>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────

export interface WorkspaceFooterProps {
  children: ReactNode;
  className?: string;
  /** @default false */
  asDiv?: boolean;
}

/** Status strip pinned below the body. Never scrolls. */
export function WorkspaceFooter({ children, className, asDiv = false }: WorkspaceFooterProps) {
  const Tag = (asDiv ? "div" : "footer") as ElementType;
  return (
    <Tag
      className={cn(
        "flex shrink-0 items-center gap-3 border-t border-border-subtle bg-surface",
        "px-4 group-data-[density=compact]/workspace:px-3",
        "h-9 group-data-[density=compact]/workspace:h-7",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
