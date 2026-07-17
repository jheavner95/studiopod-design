import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MetadataLabel } from "./MetadataLabel";
import { MetadataValue } from "./MetadataValue";

interface MetadataFieldProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}

/**
 * Label stacked above value — the compact unit PropertyGroup arranges into a grid,
 * distinct from MetadataRow's full-width list row.
 *
 * DS-5F: renders as a real <dl>/<dt>/<dd>, same fix and same `contents`-based
 * zero-layout-footprint technique as MetadataRow — see its own doc comment.
 */
export function MetadataField({ label, value, className }: MetadataFieldProps) {
  return (
    <dl className={cn("flex min-w-0 flex-col gap-1", className)}>
      <dt className="contents">
        <MetadataLabel>{label}</MetadataLabel>
      </dt>
      <dd className="contents">
        <MetadataValue>{value}</MetadataValue>
      </dd>
    </dl>
  );
}
