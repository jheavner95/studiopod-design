import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PropertyLabel } from "./PropertyLabel";
import { PropertyValue } from "./PropertyValue";
import { PropertyReset } from "./PropertyReset";

interface PropertyRowProps {
  label?: ReactNode;
  /** Read mode value — ignored when editor is provided. */
  value?: ReactNode;
  /** Edit mode control — a Foundation Forms field, or one of this family's PropertyToggle/PropertySelect/PropertyNumber/PropertyColor/PropertyEditor. It already renders its own label, so PropertyRow doesn't render a second one when editor is present. */
  editor?: ReactNode;
  /** Shows PropertyReset next to the row — pass both together, or omit either to hide it. */
  modified?: boolean;
  onReset?: () => void;
  className?: string;
}

/**
 * A single property — the smallest unit PropertyGroup arranges into a grid.
 * Read mode composes PropertyLabel + PropertyValue directly; edit mode
 * renders whatever editor the caller passes, matching the Inspector
 * Workspace's own "fields edit in place, no separate edit-mode toggle"
 * guidance carried over from Inspector Panel.
 */
export function PropertyRow({ label, value, editor, modified, onReset, className }: PropertyRowProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <div className="min-w-0 flex-1">
        {editor ?? (
          <div className="flex flex-col gap-1">
            <PropertyLabel>{label}</PropertyLabel>
            <PropertyValue>{value}</PropertyValue>
          </div>
        )}
      </div>
      {modified && onReset ? <PropertyReset onReset={onReset} className="mt-0.5" /> : null}
    </div>
  );
}
