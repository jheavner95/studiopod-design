import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IdentityBlock } from "@/components/metadata";
import { Badge } from "@/components/ui";
import type { StatusTone } from "@/lib/tone";

/**
 * One status dimension — a label and the tone it reads in. Structured rather
 * than a ReactNode on purpose: the design system owns how a status badge
 * looks, so callers describe *what* the status is, never how to draw it.
 */
export interface InspectorHeaderStatus {
  label: string;
  tone?: StatusTone;
}

interface InspectorHeaderProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  /**
   * The selected object's quick status.
   *
   * - **One object** — a single status dimension. Renders exactly as it always
   *   has, inside `IdentityBlock`.
   * - **An array** — several *independent* dimensions a reader needs at a
   *   glance, such as lifecycle **and** health (DS-6.9C6A). Badges render in
   *   the order given: order is caller-owned, and this component never merges,
   *   reorders, deduplicates or drops entries.
   * - **An empty array** — no status region at all, and no empty wrapper left
   *   behind.
   *
   * Arbitrary JSX is intentionally unsupported. If a header needs something
   * that is not a labelled status, it belongs in the panel body, not here.
   */
  status?: InspectorHeaderStatus | InspectorHeaderStatus[];
  /**
   * Descriptive header information that is **not** a status — version, counts,
   * ownership, timestamps, and the like (DS-6.9C6E-A).
   *
   * Rendered on its own subordinate line beneath the name/status row, so it
   * **wraps rather than truncates** and never pushes status badges out of the
   * header. Caller-owned formatting: pass a string, or your own inline runs
   * with separators.
   *
   * This exists because such information is not a state dimension — it does not
   * belong in `status` (see the status/metadata guidance in the docs) and, on
   * the single `type` line, it competed with `type` for width and disappeared
   * through truncation on narrow panels. Two application inspectors
   * (`OverlayPresetInspector`, `GenerationProfileInspector`) proved that
   * length-dependent behaviour before this slot existed.
   *
   * Omit it, or pass an empty node, and no metadata row is rendered at all.
   */
  metadata?: ReactNode;
  /**
   * **This is the inspector's dismiss/close affordance.** Pass it and the
   * header renders a close button labelled "Close inspector"; omit it and no
   * dismiss control appears at all.
   *
   * The name says `onCollapse` for historical reasons — it dismisses the
   * inspector, it does not collapse it to a rail. There is no separate
   * `onClose` prop, and no other component in this family owns dismissal.
   *
   * Typical callers: an inspector inside a `Drawer`, or a persistent
   * `WorkspaceInspector` the user can close.
   */
  onCollapse?: () => void;
  className?: string;
}

/**
 * "What's selected" — icon, name, type, quick status. Composes Foundation
 * Metadata's IdentityBlock directly rather than re-declaring that layout;
 * stays sticky at the top of InspectorPanel's scroll area, matching the
 * sticky behavior already documented for the Inspector Workspace's own
 * Inspector Header region.
 *
 * @example One status dimension
 * ```tsx
 * <InspectorHeader name="Hero Image" type="Asset" status={{ label: "Published", tone: "success" }} />
 * ```
 *
 * @example Independent dimensions — lifecycle AND health
 * ```tsx
 * <InspectorHeader
 *   name="Portrait Profile"
 *   type="Generation Profile"
 *   status={[
 *     { label: "Published", tone: "success" },
 *     { label: "Degraded", tone: "warning" },
 *   ]}
 * />
 * ```
 *
 * @example Descriptive metadata that is not status
 * ```tsx
 * <InspectorHeader
 *   name="iPhone Premium Case Overlay"
 *   type="Overlay Preset"
 *   status={{ label: "Published", tone: "success" }}
 *   metadata={<>v5 <span aria-hidden>·</span> 2 blueprints <span aria-hidden>·</span> owned by Design</>}
 * />
 * ```
 */
export function InspectorHeader({ icon, name, type, status, metadata, onCollapse, className }: InspectorHeaderProps) {
  // A single object keeps the original path untouched — IdentityBlock renders
  // it, so existing callers get byte-identical markup. An array renders here
  // instead, because IdentityBlock owns exactly one badge slot and widening a
  // Foundation Metadata component for an Inspector-only need would be the
  // wrong place to absorb this.
  const statusList = Array.isArray(status) ? status : undefined;
  const singleStatus = Array.isArray(status) ? undefined : status;

  // Metadata is a subordinate SECOND row, not part of the identity/status flex
  // row — that is what lets it wrap and preserve its full content on a narrow
  // panel instead of truncating, and keeps it from stealing width from the
  // status badges. `false`/`null`/`undefined`/`""` render no row and no wrapper.
  const hasMetadata = metadata !== undefined && metadata !== null && metadata !== false && metadata !== "";

  return (
    <div className={cn("sticky top-0 z-10 border-b border-border-subtle bg-surface px-6 py-4", className)}>
      <div className="flex items-center gap-3">
        <IdentityBlock icon={icon} name={name} type={type} status={singleStatus} className="min-w-0 flex-1" />
        {statusList && statusList.length > 0 ? (
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
            {statusList.map((entry, index) => (
              <Badge key={index} tone={entry.tone ?? "neutral"} size="sm">
                {entry.label}
              </Badge>
            ))}
          </div>
        ) : null}
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Close inspector"
            className="focus-ring shrink-0 rounded-md p-1.5 text-ink-tertiary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-ink-primary"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
      {hasMetadata ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-caption text-ink-tertiary">
          {metadata}
        </div>
      ) : null}
    </div>
  );
}
