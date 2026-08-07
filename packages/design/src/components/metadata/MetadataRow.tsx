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

/**
 * DS-5F: renders as a real <dl>/<dt>/<dd> — previously a plain div/span
 * structure with no list or label-value semantics at all, running as an
 * unrelated parallel system to DescriptionList's own real <dl>. dt/dd use
 * `contents` so they add zero layout footprint (MetadataLabel/MetadataValue's
 * own spans remain the actual flex items, byte-identical to before) while
 * still giving assistive tech a real label-value association.
 */
export function MetadataRow({ label, value, className, layout = "responsive" }: MetadataRowProps) {
  return (
    <dl className={cn("flex", containerClass[layout], className)}>
      <dt className="contents">
        <MetadataLabel className={labelWrapClass[layout]}>{label}</MetadataLabel>
      </dt>
      <dd className="contents">
        <MetadataValue>{value}</MetadataValue>
      </dd>
    </dl>
  );
}
