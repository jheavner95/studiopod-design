import type { ReactNode } from "react";
import { Grid } from "@/components/layout";

interface DashboardGridProps {
  children: ReactNode;
  minWidgetWidth?: string;
  className?: string;
}

/** The dashboard's own responsive tile track — a thin preset over Foundation Layout's Grid in "auto-fit" mode, so widgets reflow by count rather than a fixed breakpoint map (CardGrid's own strategy, better suited to a fixed card collection). */
export function DashboardGrid({ children, minWidgetWidth = "280px", className }: DashboardGridProps) {
  return (
    <Grid columns="auto-fit" minChildWidth={minWidgetWidth} gap="md" className={className}>
      {children}
    </Grid>
  );
}
