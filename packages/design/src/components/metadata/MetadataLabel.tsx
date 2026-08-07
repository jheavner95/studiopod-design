import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetadataLabelProps {
  children: ReactNode;
  className?: string;
}

/** The label half of a metadata pairing — consistent styling wherever a label appears, standalone or inside MetadataRow/MetadataField. */
export function MetadataLabel({ children, className }: MetadataLabelProps) {
  return <span className={cn("text-body-sm font-medium text-ink-primary", className)}>{children}</span>;
}
