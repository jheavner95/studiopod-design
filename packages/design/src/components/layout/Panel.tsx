import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STRUCTURAL_PADDING_MAP, type SurfacePadding } from "@/lib/spacing";
import { Surface } from "./Surface";

export interface PanelProps {
  children: ReactNode;
  className?: string;
  /** A title/actions row rendered above the content, separated by a border. */
  header?: ReactNode;
  padding?: SurfacePadding;
  bordered?: boolean;
}

/** A bounded workspace subdivision — Inspector, sidebar, drawer, or library region — one step more structured than a bare Surface. Built on Surface directly rather than re-declaring its own border/background/radius. */
export function Panel({ children, className, header, padding = "md", bordered = true }: PanelProps) {
  return (
    <Surface border={bordered} elevation="panel" className={cn("flex flex-col overflow-hidden", className)}>
      {header ? <div className="border-b border-border-subtle px-6 py-4">{header}</div> : null}
      <div className={STRUCTURAL_PADDING_MAP[padding]}>{children}</div>
    </Surface>
  );
}
