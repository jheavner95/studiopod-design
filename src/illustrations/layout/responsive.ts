import type { DiagramLayoutKind } from "../types";
import type { Breakpoint } from "./types";

/** Classifies a *measured container width* — not the viewport — so layout stays correct even inside a constrained parent. */
export function getBreakpoint(width: number): Breakpoint {
  if (width < 480) return "mobile";
  if (width < 768) return "tablet";
  return "desktop";
}

export interface ResponsiveAdjustment {
  layout: DiagramLayoutKind;
  spacingScale: number;
}

/**
 * Desktop: the authored layout runs free. Tablet: same layout, compressed
 * spacing. Mobile: automatic stacking into a single vertical column
 * regardless of the authored layout, so connector routing stays legible
 * on narrow screens no matter how the diagram was authored.
 */
export function getResponsiveAdjustment(layout: DiagramLayoutKind, breakpoint: Breakpoint): ResponsiveAdjustment {
  if (breakpoint === "mobile") {
    return { layout: "vertical", spacingScale: 0.7 };
  }
  if (breakpoint === "tablet") {
    return { layout, spacingScale: 0.85 };
  }
  return { layout, spacingScale: 1 };
}
