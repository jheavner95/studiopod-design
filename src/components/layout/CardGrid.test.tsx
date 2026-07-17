import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { CardGrid } from "./CardGrid";

describe("CardGrid", () => {
  describe("rendering", () => {
    it("renders its children in a grid", () => {
      render(<CardGrid>Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("grid");
    });
  });

  describe("state coverage", () => {
    it("defaults to md gap, matching Grid's — they share one map, not two copies (DS-4/DS-5A)", () => {
      render(<CardGrid>Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("gap-6");
    });

    it("supports every value on the shared gap scale", () => {
      const { rerender } = render(<CardGrid gap="sm">Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("gap-4");
      rerender(<CardGrid gap="lg">Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("gap-8");
    });

    it("applies the responsive column breakpoints for each columns value", () => {
      const { rerender } = render(<CardGrid columns={2}>Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("sm:grid-cols-2");
      rerender(<CardGrid columns={6}>Body</CardGrid>);
      expect(screen.getByText("Body")).toHaveClass("sm:grid-cols-3", "md:grid-cols-4", "lg:grid-cols-6");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<CardGrid>Body</CardGrid>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
