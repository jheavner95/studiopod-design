import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MetadataLabel } from "./MetadataLabel";
import { MetadataValue } from "./MetadataValue";

export type MetadataRowLayout = "responsive" | "stacked" | "inline";

interface MetadataRowProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  /** "responsive" (default) stacks on mobile and sits side by side from sm: up — the same row shape DescriptionList uses for a full list. MetadataRow is the standalone version, usable inside a Card without a surrounding <dl>. */
  layout?: MetadataRowLayout;
}

const containerClass: Record<MetadataRowLayout, string> = {
  responsive: "flex-col gap-1.5 sm:flex-row sm:gap-6",
  stacked: "flex-col gap-1.5",
  inline: "flex-row items-baseline gap-2",
};

const labelWrapClass: Record<MetadataRowLayout, string> = {
  responsive: "w-full shrink-0 sm:w-56",
  stacked: "w-full",
  inline: "shrink-0",
};

export function MetadataRow({ label, value, className, layout = "responsive" }: MetadataRowProps) {
  return (
    <div className={cn("flex", containerClass[layout], className)}>
      <div className={labelWrapClass[layout]}>
        <MetadataLabel>{label}</MetadataLabel>
      </div>
      <MetadataValue>{value}</MetadataValue>
    </div>
  );
}
