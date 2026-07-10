import type { ReactNode } from "react";
import { MetadataField } from "@/components/metadata";

interface InspectorPropertyProps {
  /** Read mode: rendered via Foundation Metadata's own MetadataField (label stacked above value). Omit both when passing an edit control as children instead. */
  label?: ReactNode;
  value?: ReactNode;
  /** Edit mode: a real Foundation Forms field (InputField, SelectField, SwitchField, ...) — it already renders its own label, so InspectorProperty just positions it and doesn't wrap it in a second one. */
  children?: ReactNode;
  className?: string;
}

/**
 * A single property row — the smallest unit InspectorGroup arranges into a
 * grid. Read mode delegates to Foundation Metadata's MetadataField; edit
 * mode delegates entirely to whatever Foundation Forms field the caller
 * passes, matching the Inspector Workspace's own "fields edit in place, no
 * separate edit-mode toggle" guidance — this component doesn't own an
 * edit/read mode switch itself, the caller decides per field.
 */
export function InspectorProperty({ label, value, children, className }: InspectorPropertyProps) {
  if (children) return <div className={className}>{children}</div>;
  return <MetadataField label={label} value={value} className={className} />;
}
