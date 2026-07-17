import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { SurfacePanel } from "./SurfacePanel";

describe("SurfacePanel", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<SurfacePanel>Body</SurfacePanel>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("switches background/shadow treatment when elevated is set", () => {
      const { rerender } = render(<SurfacePanel>Body</SurfacePanel>);
      expect(screen.getByText("Body")).toHaveClass("bg-surface");
      rerender(<SurfacePanel elevated>Body</SurfacePanel>);
      expect(screen.getByText("Body")).toHaveClass("bg-surface-active", "shadow-md");
    });
  });

  describe("state coverage", () => {
    it("defaults to md padding", () => {
      render(<SurfacePanel>Body</SurfacePanel>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
    });

    it("supports every value on the shared spotlight padding scale — the same map GlassPanel reads from (DS-5A)", () => {
      const { rerender } = render(<SurfacePanel padding="sm">Body</SurfacePanel>);
      expect(screen.getByText("Body")).toHaveClass("p-4");
      rerender(<SurfacePanel padding="lg">Body</SurfacePanel>);
      expect(screen.getByText("Body")).toHaveClass("p-12");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<SurfacePanel>Body</SurfacePanel>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
