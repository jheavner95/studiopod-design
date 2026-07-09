import type { ReactNode } from "react";
import { Stack } from "@/components/layout";

interface MetadataGroupProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

/** A titled group of MetadataRows — built on Stack directly rather than re-declaring vertical spacing. */
export function MetadataGroup({ children, title, className }: MetadataGroupProps) {
  return (
    <Stack gap="sm" className={className}>
      {title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : null}
      <Stack gap="xs">{children}</Stack>
    </Stack>
  );
}
