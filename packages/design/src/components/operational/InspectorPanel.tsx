import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Surface, ScrollArea } from "@/components/layout";
import { LoadingState, EmptyState } from "@/components/feedback";

export interface InspectorPanelProps {
  /** An InspectorHeader element — sticky, rendered above the scroll area. */
  header: ReactNode;
  /** An InspectorTabs element — not sticky (only Header is, per the Inspector Workspace's own guidance). */
  tabs?: ReactNode;
  /** Sections/Groups/Properties/Validation/Status/History content — omit when tabs already owns all of the panel's content via TabPanels. */
  children?: ReactNode;
  /** An InspectorFooter element — sticky, rendered below the scroll area. */
  footer?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  /**
   * Whether there is nothing selected. This is the explicit switch for the
   * empty state — set it from your own selection state rather than relying on
   * `emptyState` being present.
   *
   * Omit it and the panel falls back to `Boolean(emptyState)`, which is how
   * this component behaved before `isEmpty` existed (DS-6.9C3B).
   */
  isEmpty?: boolean;
  /**
   * What to show when the panel is empty.
   *
   * - **An element** — rendered as given, so you own the title, description
   *   and any action. Pass a full `EmptyState` when you want one.
   * - **A string** — kept for backwards compatibility: it becomes the
   *   description under the fixed title "Nothing selected".
   * - **Omitted** — the panel renders the default "Nothing selected" state.
   */
  emptyState?: ReactNode;
  maxHeight?: string;
  className?: string;
}

/**
 * The canonical StudioPOD Inspector Panel — the standard inspector shell
 * used across every StudioPOD platform. Composes Foundation Layout
 * (Surface, ScrollArea) and Foundation Feedback (LoadingState, EmptyState)
 * for its own chrome; Header/Tabs/Sections/etc. are separate components
 * this panel arranges rather than rendering itself.
 *
 * Body precedence is `loading` → empty → `children`.
 *
 * @example Explicit empty state, with a title of your own
 * ```tsx
 * <InspectorPanel
 *   header={<InspectorHeader name="Asset Inspector" />}
 *   isEmpty={!selectedId}
 *   emptyState={<EmptyState title="No asset selected" description="Pick one from the list." />}
 * >
 *   <InspectorSection title="Identity">…</InspectorSection>
 * </InspectorPanel>
 * ```
 *
 * @example Default empty state
 * ```tsx
 * <InspectorPanel header={header} isEmpty={!selectedId}>…</InspectorPanel>
 * ```
 */
export function InspectorPanel({
  header,
  tabs,
  children,
  footer,
  loading = false,
  loadingLabel,
  isEmpty,
  emptyState,
  maxHeight,
  className,
}: InspectorPanelProps) {
  // DS-6.9C3B: `isEmpty` owns the decision when it is supplied. Falling back to
  // the truthiness of `emptyState` keeps every pre-`isEmpty` caller rendering
  // exactly as before, so this widening is additive rather than breaking.
  const showEmptyState = isEmpty ?? Boolean(emptyState);

  // A string stays legacy — description under the fixed title. Anything else
  // the caller supplies is theirs to own, so it renders untouched.
  const emptyContent =
    emptyState === undefined || typeof emptyState === "string" ? (
      <EmptyState title="Nothing selected" description={emptyState} />
    ) : (
      emptyState
    );

  return (
    <Surface border elevation="panel" className={cn("flex h-full flex-col overflow-hidden", className)}>
      {header}
      {tabs}
      <ScrollArea direction="vertical" maxHeight={maxHeight} className="flex-1">
        <div className="flex flex-col gap-6 p-6">
          {loading ? <LoadingState label={loadingLabel} /> : showEmptyState ? emptyContent : children}
        </div>
      </ScrollArea>
      {footer}
    </Surface>
  );
}
