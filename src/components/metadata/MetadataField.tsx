import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MetadataLabel } from "./MetadataLabel";
import { MetadataValue } from "./MetadataValue";

interface MetadataFieldProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}

/** Label stacked above value — the compact unit PropertyGroup arranges into a grid, distinct from MetadataRow's full-width list row. */
export function MetadataField({ label, value, className }: MetadataFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <MetadataLabel>{label}</MetadataLabel>
      <MetadataValue>{value}</MetadataValue>
    </div>
  );
}
