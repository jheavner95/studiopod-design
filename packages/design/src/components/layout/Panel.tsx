import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STRUCTURAL_PADDING_MAP, type SurfacePadding } from "@/lib/spacing";
import { Surface } from "./Surface";

/**
 * Panel renders three elements — the `Surface` it is built on, an optional
 * header row, and the content wrapper — so its contract has to say which one
 * a caller is addressing (UX-5.7A § multi-element).
 *
 * **It is the Surface**: the panel's own outer boundary, the thing that is
 * visibly the panel. The header and content wrappers are interior structure
 * this component owns, and forwarding to either would let a caller address a
 * box they cannot see. A caller who needs to reach inside puts their own
 * element in `header` or `children`, where they own it outright.
 */
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** A title/actions row rendered above the content, separated by a border. */
  header?: ReactNode;
  padding?: SurfacePadding;
  bordered?: boolean;
}

/** A bounded workspace subdivision — Inspector, sidebar, drawer, or library region — one step more structured than a bare Surface. Built on Surface directly rather than re-declaring its own border/background/radius. */
export function Panel({ children, className, header, padding = "md", bordered = true, ...domProps }: PanelProps) {
  return (
    <Surface {...domProps} border={bordered} elevation="panel" className={cn("flex flex-col overflow-hidden", className)}>
      {header ? <div className="border-b border-border-subtle px-6 py-4">{header}</div> : null}
      <div className={STRUCTURAL_PADDING_MAP[padding]}>{children}</div>
    </Surface>
  );
}
