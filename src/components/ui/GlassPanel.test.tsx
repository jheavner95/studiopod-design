import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { GlassPanel } from "./GlassPanel";

describe("GlassPanel", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<GlassPanel>Body</GlassPanel>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("switches shadow treatment when glow is set", () => {
      const { rerender } = render(<GlassPanel>Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("shadow-glass");
      rerender(<GlassPanel glow>Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("shadow-glass-glow");
    });
  });

  describe("state coverage", () => {
    it("defaults to md padding", () => {
      render(<GlassPanel>Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
    });

    it("supports every value on the shared spotlight padding scale — deliberately not the structural (Card/Surface/Panel) scale (DS-5A)", () => {
      const { rerender } = render(<GlassPanel padding="sm">Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("p-4");
      rerender(<GlassPanel padding="md">Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
      rerender(<GlassPanel padding="lg">Body</GlassPanel>);
      expect(screen.getByText("Body")).toHaveClass("p-12");
    });

    it("has no 'none' padding option — a hero/glass panel with zero padding serves no documented purpose", () => {
      // @ts-expect-error — "none" is intentionally absent from SpotlightPadding.
      render(<GlassPanel padding="none">Body</GlassPanel>);
      expect(screen.getByText("Body")).not.toHaveClass("p-0");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<GlassPanel>Body</GlassPanel>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
