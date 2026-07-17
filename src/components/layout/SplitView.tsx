"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/components/motion/MotionPreference";

/**
 * SplitView — the primitive that divides a region into independently
 * resizable, scrollable panes.
 *
 * `Workspace` owns overall page structure (header/toolbar/nav/content/
 * inspector/footer); `SplitView` owns *pane composition* — dividing
 * whatever region it's placed in (typically a `WorkspaceContent`, but it
 * has no dependency on Workspace at all) into two or more resizable
 * children. Workspace's own docs describe `WorkspaceBody` as "a place for
 * a future SplitView to slot into" — this is that primitive. Nothing about
 * Workspace changes to support it; a plain flex row already anticipated it.
 *
 * ─── Composition, not configuration ─────────────────────────────────────────
 *
 *   <SplitView orientation="horizontal">
 *     <SplitPane defaultSize={25} minSize={15} collapsible>…</SplitPane>
 *     <SplitDivider aria-label="Resize sidebar" />
 *     <SplitPane>…</SplitPane>
 *   </SplitView>
 *
 * `SplitPane` and `SplitDivider` MUST be direct children of `SplitView` —
 * not wrapped in an intermediate component. `SplitView` reads its children
 * synchronously (`Children.toArray`) to compute each pane's index and each
 * divider's two flanking panes, then clones every pane/divider element with
 * the size/ARIA-value data it needs and shares its drag/keyboard handlers
 * through context (see "Why context, not just cloneElement" below). This is
 * a deliberate, written-down constraint, not a silent limitation — a
 * `SplitPane`/`SplitDivider` rendered outside a `SplitView` logs a clear
 * dev-mode warning rather than silently behaving as an unstyled block.
 * Nesting is still fully supported: an inner `<SplitView>` is just another
 * child's content, with its own independent size state and context.
 *
 * ─── Sizing model ────────────────────────────────────────────────────────────
 *
 * Every size (`defaultSize`/`minSize`/`maxSize`, and the array passed to
 * `onSizesChange`) is a percentage of `SplitView`'s main axis, summing to
 * 100 across all panes. Dragging or keyboard-resizing one divider transfers
 * size between exactly its two flanking panes — clamped so neither exceeds
 * its own `[minSize, maxSize]` — and never "pushes" a third pane further
 * down the row. This keeps resize behavior predictable: a divider's effect
 * is always local to its two neighbors, never a cascade across the whole
 * layout.
 *
 * ─── Controlled vs. uncontrolled ─────────────────────────────────────────────
 *
 * Uncontrolled (the common case): each `SplitPane`'s `defaultSize` seeds
 * `SplitView`'s internal size state; panes without one split the remaining
 * space evenly. Controlled: pass `sizes` + `onSizesChange` on `SplitView`
 * itself — sizes are a group concern (one divider moves two panes at once),
 * so the controlled pair lives at the `SplitView` level, not per-pane,
 * mirroring every other controlled component in this system (`value` +
 * `onChange`, not one prop per keystroke). `SplitView` has no built-in
 * persistence — wiring `sizes`/`onSizesChange` to `localStorage` is the
 * consumer's few lines of code, not a hidden feature here.
 *
 * Per-pane `collapsed` is a separate, orthogonal override — pass it to make
 * a specific pane's collapse state consumer-controlled, exactly like
 * `WorkspaceNavigation`/`WorkspaceInspector`'s own `collapsed` prop: this
 * primitive owns the resulting size, never the toggle button or the state.
 * `collapsible` (no relation) is what lets *interactive* resize — dragging
 * or the divider's Enter key — collapse a pane on its own, independent of
 * any consumer-controlled prop.
 *
 * ─── Why context, not just cloneElement, for the drag/keyboard handlers ────
 *
 * Non-function per-child data (computed size, ARIA values, this child's
 * index) is injected via `cloneElement`, same as `DS-2`'s compound
 * components. The actual pointer/keyboard handlers are threaded through
 * context instead and wired up inside `SplitDivider`'s own JSX: those
 * handlers close over refs (drag-start position, the container's measured
 * size), and the React Compiler's ref-safety analysis correctly won't let a
 * ref-touching function be embedded into a `cloneElement` props object
 * built during a render-time `.map()` — assigning a handler to a plain
 * `onPointerDown={...}` prop inside the element that owns it is the
 * standard, unrestricted pattern, so that's where these are wired.
 *
 * ─── Why this needs a client boundary (unlike Workspace) ───────────────────
 *
 * Workspace stays server-component-safe because it's a static shell with no
 * inherent interactivity. SplitView's entire purpose is live, pointer- and
 * keyboard-driven resizing, so a client boundary here isn't a compromise —
 * it's the actual feature. That's also why this file uses the same
 * `useMotionPreference` hook every other interactive primitive in this
 * system uses, rather than Workspace's CSS-only `motion-reduce:` fallback:
 * there's no server-safety constraint here forcing the CSS-only route.
 */

export type SplitOrientation = "horizontal" | "vertical";

const DEFAULT_MIN_SIZE = 10;
const DEFAULT_MAX_SIZE = 90;
const KEYBOARD_STEP = 2;
const KEYBOARD_STEP_LARGE = 10;
const COLLAPSE_EPSILON = 0.01;

// ── Context (drag/keyboard handlers only — see file doc comment) ────────────

interface SplitViewContextValue {
  onDividerPointerDown: (dividerIndex: number, event: ReactPointerEvent<HTMLDivElement>) => void;
  onDividerPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDividerPointerUp: (event: ReactPointerEvent<HTMLDivElement>) => void;
  onDividerKeyDown: (dividerIndex: number, event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

const SplitViewContext = createContext<SplitViewContextValue | null>(null);

// ── SplitView ────────────────────────────────────────────────────────────────

export interface SplitViewProps {
  /** `SplitPane`/`SplitDivider` elements, alternating, as DIRECT children — see the file doc comment. */
  children: ReactNode;
  /**
   * `"horizontal"` → panes sit side by side (a row); the divider is a
   * vertical line dragged left/right. `"vertical"` → panes stack (a
   * column); the divider is a horizontal line dragged up/down.
   * @default "horizontal"
   */
  orientation?: SplitOrientation;
  className?: string;
  /** Controlled sizes (percent per pane, summing to 100). Omit for uncontrolled. */
  sizes?: number[];
  /** Fires with the full sizes array whenever any divider moves — drag, keyboard, or a controlled-collapse toggle. */
  onSizesChange?: (sizes: number[]) => void;
}

interface PaneMeta {
  defaultSize?: number;
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsed?: boolean;
}

function isElementOfType<P>(node: ReactNode, type: unknown): node is ReactElement<P> {
  return isValidElement(node) && node.type === type;
}

/** Seeds the initial uncontrolled sizes array from each pane's `defaultSize`, splitting whatever's left evenly across panes that didn't specify one, and normalizing so the total is always exactly 100. */
function seedSizes(metas: PaneMeta[]): number[] {
  const specifiedSum = metas.reduce((sum, m) => sum + (m.defaultSize ?? 0), 0);
  const unspecifiedCount = metas.filter((m) => m.defaultSize === undefined).length;
  const remaining = Math.max(0, 100 - specifiedSum);
  const share = unspecifiedCount > 0 ? remaining / unspecifiedCount : 0;
  const raw = metas.map((m) => m.defaultSize ?? share);
  const total = raw.reduce((a, b) => a + b, 0);
  return total > 0 ? raw.map((v) => (v / total) * 100) : raw;
}

/** A controlled `collapsed` prop fully overrides a pane's rendered size — `true` forces 0; `false` forces it open. Since this never writes back into the tracked sizes array, `sizes[idx]` itself is always "the size before it was overridden to 0" — no separate memory needed. `undefined` (the common case) falls through to the tracked/dragged size untouched. */
function resolvePaneSize(idx: number, meta: PaneMeta, sizes: number[]): number {
  if (meta.collapsed === true) return 0;
  if (meta.collapsed === false) {
    const current = sizes[idx];
    return current > COLLAPSE_EPSILON ? current : (meta.defaultSize ?? meta.minSize);
  }
  return sizes[idx];
}

export function SplitView({ children, orientation = "horizontal", className, sizes: controlledSizes, onSizesChange }: SplitViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ dividerIndex: number; startClientPos: number; containerSize: number } | null>(null);
  const lastExpandedSize = useRef<Map<number, number>>(new Map());
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Everything derived from `children` lives in one useMemo, including the
  // pane/divider index each child maps to — the React Compiler requires
  // arrays used as callback dependencies to be provably stable, and render
  // itself is not allowed to mutate a counter across a `.map()` (see the
  // immutable lookup-by-position maps below, used instead of a running `let`
  // during the actual render pass further down).
  const { childArray, paneMetas, paneIndexOf, dividerIndexOf } = useMemo(() => {
    const array = Children.toArray(children);
    const metas: PaneMeta[] = [];
    const paneIndexOfPosition = new Map<number, number>();
    const dividerIndexOfPosition = new Map<number, number>();
    array.forEach((child, position) => {
      if (isElementOfType<SplitPaneProps>(child, SplitPane)) {
        paneIndexOfPosition.set(position, metas.length);
        metas.push({
          defaultSize: child.props.defaultSize,
          minSize: child.props.minSize ?? DEFAULT_MIN_SIZE,
          maxSize: child.props.maxSize ?? DEFAULT_MAX_SIZE,
          collapsible: child.props.collapsible ?? false,
          collapsed: child.props.collapsed,
        });
      } else if (isElementOfType<SplitDividerProps>(child, SplitDivider)) {
        dividerIndexOfPosition.set(position, dividerIndexOfPosition.size);
      }
    });
    return { childArray: array, paneMetas: metas, paneIndexOf: paneIndexOfPosition, dividerIndexOf: dividerIndexOfPosition };
  }, [children]);

  const [internalSizes, setInternalSizes] = useState<number[]>(() => seedSizes(paneMetas));
  // Defensive re-seed if the pane count itself changes across renders (a
  // consumer conditionally rendering an extra pane) — NOT triggered by
  // defaultSize changing after mount, matching HTML defaultValue semantics.
  if (internalSizes.length !== paneMetas.length) {
    setInternalSizes(seedSizes(paneMetas));
  }

  const isControlled = controlledSizes !== undefined;
  const sizes = isControlled ? controlledSizes : internalSizes;

  const effectiveMin = useCallback((idx: number) => (paneMetas[idx]?.collapsible ? 0 : (paneMetas[idx]?.minSize ?? DEFAULT_MIN_SIZE)), [paneMetas]);

  const commitSizes = useCallback(
    (next: number[]) => {
      if (!isControlled) setInternalSizes(next);
      onSizesChange?.(next);
    },
    [isControlled, onSizesChange],
  );

  /** The single code path both pointer-drag and keyboard resizing funnel through — a divider only ever exchanges size between its two immediate neighbors, clamped to each one's own bounds. */
  const resizeDivider = useCallback(
    (dividerIndex: number, rawDeltaPercent: number) => {
      const beforeIdx = dividerIndex;
      const afterIdx = dividerIndex + 1;
      const beforeMeta = paneMetas[beforeIdx];
      const afterMeta = paneMetas[afterIdx];
      if (!beforeMeta || !afterMeta) return;

      const startBefore = sizes[beforeIdx];
      const startAfter = sizes[afterIdx];

      let delta = rawDeltaPercent;
      delta = Math.max(delta, effectiveMin(beforeIdx) - startBefore);
      delta = Math.min(delta, beforeMeta.maxSize - startBefore);
      delta = Math.min(delta, startAfter - effectiveMin(afterIdx));
      delta = Math.max(delta, -(afterMeta.maxSize - startAfter));

      if (delta === 0) return;

      const nextBefore = startBefore + delta;
      const nextAfter = startAfter - delta;
      if (nextBefore > COLLAPSE_EPSILON) lastExpandedSize.current.set(beforeIdx, nextBefore);
      if (nextAfter > COLLAPSE_EPSILON) lastExpandedSize.current.set(afterIdx, nextAfter);

      const next = sizes.slice();
      next[beforeIdx] = nextBefore;
      next[afterIdx] = nextAfter;
      commitSizes(next);
    },
    [paneMetas, sizes, effectiveMin, commitSizes],
  );

  /**
   * Enter/Space on a divider toggles whichever flanking pane declares
   * `collapsible` (the trailing pane wins if, unusually, both do). This
   * deliberately bypasses `resizeDivider`'s clamp pipeline: that pipeline
   * exists to cap a continuous DRAG at each pane's own `maxSize`, but a
   * collapse is a discrete, all-or-nothing state change — the neighbor
   * should absorb every bit of freed space (or give back exactly what the
   * pane is about to reclaim), not stop short at its own normal ceiling.
   */
  const toggleCollapse = useCallback(
    (dividerIndex: number) => {
      const beforeIdx = dividerIndex;
      const afterIdx = dividerIndex + 1;
      const beforeMeta = paneMetas[beforeIdx];
      const afterMeta = paneMetas[afterIdx];
      if (!beforeMeta || !afterMeta) return;

      const targetIsAfter = afterMeta.collapsible;
      const targetIsBefore = !targetIsAfter && beforeMeta.collapsible;
      if (!targetIsAfter && !targetIsBefore) return;

      const targetIdx = targetIsAfter ? afterIdx : beforeIdx;
      const otherIdx = targetIsAfter ? beforeIdx : afterIdx;
      const targetMeta = paneMetas[targetIdx];
      const current = sizes[targetIdx];
      const isCollapsed = current <= COLLAPSE_EPSILON;
      const restoreSize = Math.min(Math.max(lastExpandedSize.current.get(targetIdx) ?? targetMeta.defaultSize ?? targetMeta.minSize, targetMeta.minSize), targetMeta.maxSize);
      const targetSize = isCollapsed ? restoreSize : 0;
      const otherSize = sizes[beforeIdx] + sizes[afterIdx] - targetSize;

      if (targetSize > COLLAPSE_EPSILON) lastExpandedSize.current.set(targetIdx, targetSize);

      const next = sizes.slice();
      next[targetIdx] = targetSize;
      next[otherIdx] = otherSize;
      commitSizes(next);
    },
    [paneMetas, sizes, commitSizes],
  );

  const onDividerKeyDown = useCallback(
    (dividerIndex: number, event: ReactKeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
      const increaseKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
      const decreaseKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

      if (event.key === increaseKey) {
        event.preventDefault();
        resizeDivider(dividerIndex, step);
      } else if (event.key === decreaseKey) {
        event.preventDefault();
        resizeDivider(dividerIndex, -step);
      } else if (event.key === "Home") {
        event.preventDefault();
        resizeDivider(dividerIndex, effectiveMin(dividerIndex) - sizes[dividerIndex]);
      } else if (event.key === "End") {
        event.preventDefault();
        resizeDivider(dividerIndex, paneMetas[dividerIndex].maxSize - sizes[dividerIndex]);
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCollapse(dividerIndex);
      }
    },
    [orientation, resizeDivider, effectiveMin, sizes, paneMetas, toggleCollapse],
  );

  const onDividerPointerDown = useCallback(
    (dividerIndex: number, event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = {
        dividerIndex,
        startClientPos: orientation === "horizontal" ? event.clientX : event.clientY,
        containerSize: orientation === "horizontal" ? containerRect.width : containerRect.height,
      };
      setDraggingIndex(dividerIndex);
    },
    [orientation],
  );

  const onDividerPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragState.current;
      if (!drag || drag.containerSize <= 0) return;
      const clientPos = orientation === "horizontal" ? event.clientX : event.clientY;
      const deltaPercent = ((clientPos - drag.startClientPos) / drag.containerSize) * 100;
      resizeDivider(drag.dividerIndex, deltaPercent);
      drag.startClientPos = clientPos;
    },
    [orientation, resizeDivider],
  );

  const onDividerPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
    setDraggingIndex(null);
  }, []);

  const contextValue = useMemo<SplitViewContextValue>(
    () => ({ onDividerPointerDown, onDividerPointerMove, onDividerPointerUp, onDividerKeyDown }),
    [onDividerPointerDown, onDividerPointerMove, onDividerPointerUp, onDividerKeyDown],
  );

  const rendered = childArray.map((child, position) => {
    const paneIdx = paneIndexOf.get(position);
    if (paneIdx !== undefined && isElementOfType<SplitPaneProps>(child, SplitPane)) {
      const meta = paneMetas[paneIdx];
      return cloneElement(child, {
        __splitViewSize: resolvePaneSize(paneIdx, meta, sizes),
        __splitViewOrientation: orientation,
        __splitViewIsDragging: draggingIndex !== null,
      } satisfies Partial<SplitPaneProps>);
    }
    const dividerIdx = dividerIndexOf.get(position);
    if (dividerIdx !== undefined && isElementOfType<SplitDividerProps>(child, SplitDivider)) {
      const beforeIdx = dividerIdx;
      const afterIdx = dividerIdx + 1;
      return cloneElement(child, {
        __splitViewDividerIndex: dividerIdx,
        __splitViewOrientation: orientation,
        __splitViewIsDragging: draggingIndex === dividerIdx,
        __splitViewValueNow: sizes[beforeIdx],
        __splitViewValueMin: effectiveMin(beforeIdx),
        __splitViewValueMax: paneMetas[afterIdx] ? Math.min(paneMetas[beforeIdx].maxSize, 100 - effectiveMin(afterIdx)) : paneMetas[beforeIdx].maxSize,
      } satisfies Partial<SplitDividerProps>);
    }
    return child;
  });

  return (
    <SplitViewContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn(
          "group/splitview flex min-h-0 min-w-0 flex-1 overflow-hidden",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          draggingIndex !== null && "select-none",
          draggingIndex !== null && (orientation === "horizontal" ? "cursor-col-resize" : "cursor-row-resize"),
          className,
        )}
      >
        {rendered}
      </div>
    </SplitViewContext.Provider>
  );
}

// ── SplitPane ────────────────────────────────────────────────────────────────

export interface SplitPaneProps {
  children: ReactNode;
  className?: string;
  /** Initial size, percent of SplitView's main axis (uncontrolled). Panes without one split whatever's left evenly. */
  defaultSize?: number;
  /** Percent. @default 10 */
  minSize?: number;
  /** Percent. @default 90 */
  maxSize?: number;
  /** Lets dragging or the flanking divider's Enter key collapse this pane fully (to 0%). @default false */
  collapsible?: boolean;
  /** Consumer-controlled collapse — overrides everything else when set. See the file doc comment's "Controlled vs. uncontrolled" section. */
  collapsed?: boolean;
  /** Give this pane its own scrollbar. @default false, matching WorkspaceContent's own opt-in default. */
  scroll?: boolean;
  /** @internal injected by SplitView — do not pass directly. */
  __splitViewSize?: number;
  /** @internal */
  __splitViewOrientation?: SplitOrientation;
  /** @internal */
  __splitViewIsDragging?: boolean;
}

export function SplitPane({ children, className, scroll = false, __splitViewSize, __splitViewIsDragging }: SplitPaneProps) {
  if (__splitViewSize === undefined && process.env.NODE_ENV !== "production") {
    console.error("SplitPane must be a direct child of SplitView — it received no computed size. See SplitView's own doc comment for why.");
  }
  const reduceMotion = useMotionPreference();
  const size = __splitViewSize ?? 0;

  const style: CSSProperties = { flexBasis: `${size}%` };

  return (
    <div
      style={style}
      data-collapsed={size <= COLLAPSE_EPSILON}
      className={cn(
        "flex min-h-0 min-w-0 shrink-0 grow-0 flex-col",
        !__splitViewIsDragging && !reduceMotion && "transition-[flex-basis] duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        scroll ? "overflow-auto" : "overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── SplitDivider ─────────────────────────────────────────────────────────────

export interface SplitDividerProps {
  className?: string;
  /** Accessible name — required in practice whenever a SplitView has more than one divider. */
  "aria-label"?: string;
  /** @internal */
  __splitViewDividerIndex?: number;
  /** @internal */
  __splitViewOrientation?: SplitOrientation;
  /** @internal */
  __splitViewIsDragging?: boolean;
  /** @internal */
  __splitViewValueNow?: number;
  /** @internal */
  __splitViewValueMin?: number;
  /** @internal */
  __splitViewValueMax?: number;
}

/**
 * The draggable, keyboard-operable boundary between two panes — WAI-ARIA's
 * "Window Splitter" pattern (`role="separator"` with `aria-orientation`,
 * `aria-valuenow`/min/max, and arrow/Home/End/Enter keyboard support).
 *
 * `aria-orientation` is deliberately the OPPOSITE of `SplitView`'s own
 * `orientation` prop: side-by-side panes (`orientation="horizontal"`) are
 * divided by a VERTICAL line, so the separator's orientation is
 * `"vertical"` — this describes the divider's own axis, not the layout's.
 */
export function SplitDivider({
  className,
  "aria-label": ariaLabel,
  __splitViewDividerIndex,
  __splitViewOrientation,
  __splitViewIsDragging,
  __splitViewValueNow,
  __splitViewValueMin,
  __splitViewValueMax,
}: SplitDividerProps) {
  const context = useContext(SplitViewContext);
  if ((context === null || __splitViewDividerIndex === undefined) && process.env.NODE_ENV !== "production") {
    console.error("SplitDivider must be a direct child of SplitView — it received no drag handlers. See SplitView's own doc comment for why.");
  }
  const orientation = __splitViewOrientation ?? "horizontal";
  const ariaOrientation = orientation === "horizontal" ? "vertical" : "horizontal";
  const dividerIndex = __splitViewDividerIndex ?? 0;

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={ariaOrientation}
      aria-label={ariaLabel}
      aria-valuenow={__splitViewValueNow !== undefined ? Math.round(__splitViewValueNow) : undefined}
      aria-valuemin={__splitViewValueMin !== undefined ? Math.round(__splitViewValueMin) : undefined}
      aria-valuemax={__splitViewValueMax !== undefined ? Math.round(__splitViewValueMax) : undefined}
      onPointerDown={context ? (event) => context.onDividerPointerDown(dividerIndex, event) : undefined}
      onPointerMove={context?.onDividerPointerMove}
      onPointerUp={context?.onDividerPointerUp}
      onPointerCancel={context?.onDividerPointerUp}
      onKeyDown={context ? (event) => context.onDividerKeyDown(dividerIndex, event) : undefined}
      className={cn(
        "focus-ring group/divider relative shrink-0 touch-none bg-border-subtle outline-none",
        orientation === "horizontal" ? "w-px cursor-col-resize" : "h-px cursor-row-resize",
        __splitViewIsDragging && "bg-accent-500",
        className,
      )}
    >
      {/* A wider invisible hit target than the 1px visual line — spacing-scale values, not arbitrary ones. */}
      <div
        aria-hidden
        className={cn(
          "absolute rounded-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-reduce:transition-none",
          orientation === "horizontal" ? "inset-y-0 -left-1 -right-1" : "inset-x-0 -top-1 -bottom-1",
          "group-hover/divider:bg-accent-500/20",
        )}
      />
    </div>
  );
}
