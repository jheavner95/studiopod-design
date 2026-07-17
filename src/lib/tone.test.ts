import { describe, it, expect } from "vitest";
import { STATUS_TONE_PILL_CLASSES } from "./tone";

/**
 * DS-5B — the shared tone infrastructure's own integrity tests. Every
 * component that imports STATUS_TONE_PILL_CLASSES (Badge, FilterChip,
 * SavedFilter) trusts it to stay complete and stay on the exact values
 * Badge originally shipped; this is that trust made explicit.
 */
describe("STATUS_TONE_PILL_CLASSES", () => {
  it("has exactly the five canonical StatusTone keys", () => {
    expect(Object.keys(STATUS_TONE_PILL_CLASSES).sort()).toEqual(["accent", "error", "neutral", "success", "warning"]);
  });

  it("matches the exact values Badge originally shipped, byte for byte", () => {
    expect(STATUS_TONE_PILL_CLASSES).toEqual({
      neutral: "bg-neutral-soft text-neutral",
      accent: "bg-accent-soft text-accent-400",
      success: "bg-success-soft text-success",
      warning: "bg-warning-soft text-warning",
      error: "bg-error-soft text-error",
    });
  });

  it("every value pairs a bg-*-soft background with a matching text color — no bare background or bare text entries", () => {
    for (const value of Object.values(STATUS_TONE_PILL_CLASSES)) {
      expect(value).toMatch(/^bg-\S+-soft text-\S+$/);
    }
  });
});
