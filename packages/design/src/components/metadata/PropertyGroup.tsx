import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Grid } from "@/components/layout";

interface PropertyGroupProps {
  children: ReactNode;
  title?: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

/** A titled grid of MetadataFields — the read-only counterpart to a Property Editor's own field grid, built on Grid directly. */
export function PropertyGroup({ children, title, columns = 2, className }: PropertyGroupProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {title ? <span className="text-body-sm font-medium text-ink-primary">{title}</span> : null}
      <Grid columns={columns} gap="sm">
        {children}
      </Grid>
    </div>
  );
}
