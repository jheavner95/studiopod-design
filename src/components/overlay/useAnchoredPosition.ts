"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type AnchorPlacement = "top" | "bottom" | "left" | "right";
export type AnchorAlign = "start" | "center" | "end";

interface UseAnchoredPositionOptions {
  placement?: AnchorPlacement;
  align?: AnchorAlign;
  offset?: number;
}

interface AnchoredPosition {
  top: number;
  left: number;
}

const VIEWPORT_MARGIN = 8;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

/**
 * Computes viewport-relative { top, left } for content anchored to a trigger element —
 * shared by Popover, Menu, and Tooltip so each doesn't reimplement placement, flipping,
 * and viewport clamping on its own. Not a full collision-aware floating-position engine
 * (no scroll-container-relative anchoring, no auto-placement on every axis) — just enough
 * to keep anchored content on-screen for this system's real use cases.
 */
export function useAnchoredPosition(
  triggerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  active: boolean,
  { placement = "bottom", align = "start", offset = 8 }: UseAnchoredPositionOptions = {},
): AnchoredPosition {
  const [position, setPosition] = useState<AnchoredPosition>({ top: -9999, left: -9999 });

  useLayoutEffect(() => {
    if (!active) return;

    function recalculate() {
      const trigger = triggerRef.current;
      const content = contentRef.current;
      if (!trigger || !content) return;

      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let resolvedPlacement = placement;
      if (placement === "bottom" && triggerRect.bottom + offset + contentRect.height > viewportHeight) {
        resolvedPlacement = "top";
      } else if (placement === "top" && triggerRect.top - offset - contentRect.height < 0) {
        resolvedPlacement = "bottom";
      }

      let top: number;
      let left: number;

      if (resolvedPlacement === "left" || resolvedPlacement === "right") {
        top = triggerRect.top;
        left = resolvedPlacement === "left" ? triggerRect.left - offset - contentRect.width : triggerRect.right + offset;
      } else {
        top = resolvedPlacement === "bottom" ? triggerRect.bottom + offset : triggerRect.top - offset - contentRect.height;
        if (align === "start") left = triggerRect.left;
        else if (align === "center") left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        else left = triggerRect.right - contentRect.width;
      }

      setPosition({
        top: clamp(top, VIEWPORT_MARGIN, viewportHeight - contentRect.height - VIEWPORT_MARGIN),
        left: clamp(left, VIEWPORT_MARGIN, viewportWidth - contentRect.width - VIEWPORT_MARGIN),
      });
    }

    recalculate();
    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, true);
    return () => {
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate, true);
    };
  }, [active, placement, align, offset, triggerRef, contentRef]);

  return position;
}
