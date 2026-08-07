import type { ReactNode } from "react";
import { Grid, type GridGap } from "@/components/layout";

interface FormRowProps {
  children: ReactNode;
  /** 1 stacks fields in a single column (an Inspector-width form); 2–3 sit side by side on wide screens, one per row on narrow ones. */
  columns?: 1 | 2 | 3;
  gap?: GridGap;
  className?: string;
}

/** Two or three fields side by side on wide screens, one per row on narrow ones — built directly on Grid's own responsive column collapse. */
export function FormRow({ children, columns = 2, gap = "md", className }: FormRowProps) {
  return (
    <Grid columns={columns} gap={gap} className={className}>
      {children}
    </Grid>
  );
}
