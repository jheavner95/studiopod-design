import { describe, it, expect } from "vitest";
import { STRUCTURAL_PADDING_MAP, SPOTLIGHT_PADDING_MAP } from "./spacing";

/**
 * DS-5A — the shared spacing infrastructure's own integrity tests. Every
 * component that imports these maps (Card, Surface, Panel, GlassPanel,
 * SurfacePanel) trusts them to stay complete and stay on their documented
 * values; this is that trust made explicit and checked.
 */
describe("STRUCTURAL_PADDING_MAP", () => {
  it("has exactly the four documented keys, each a real Tailwind padding utility", () => {
    expect(Object.keys(STRUCTURAL_PADDING_MAP).sort()).toEqual(["lg", "md", "none", "sm"]);
    expect(STRUCTURAL_PADDING_MAP).toEqual({ none: "p-0", sm: "p-4", md: "p-6", lg: "p-8" });
  });
});

describe("SPOTLIGHT_PADDING_MAP", () => {
  it("has exactly the three documented keys — deliberately no 'none' — each a real Tailwind padding utility", () => {
    expect(Object.keys(SPOTLIGHT_PADDING_MAP).sort()).toEqual(["lg", "md", "sm"]);
    expect(SPOTLIGHT_PADDING_MAP).toEqual({ sm: "p-4", md: "p-8", lg: "p-12" });
  });

  it("diverges from the structural map at md/lg — the two-family split this module encodes — while sharing the same sm value by coincidence, not design intent", () => {
    expect(SPOTLIGHT_PADDING_MAP.sm).toBe(STRUCTURAL_PADDING_MAP.sm);
    expect(SPOTLIGHT_PADDING_MAP.md).not.toBe(STRUCTURAL_PADDING_MAP.md);
    expect(SPOTLIGHT_PADDING_MAP.lg).not.toBe(STRUCTURAL_PADDING_MAP.lg);
  });
});
