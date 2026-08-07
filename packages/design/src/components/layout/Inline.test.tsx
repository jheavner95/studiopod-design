import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Inline } from "./Inline";

describe("Inline", () => {
  describe("rendering", () => {
    it("renders its children in a row that wraps by default", () => {
      render(<Inline>Body</Inline>);
      expect(screen.getByText("Body")).toHaveClass("flex-row", "flex-wrap");
    });

    it("omits wrapping when wrap is false", () => {
      render(<Inline wrap={false}>Body</Inline>);
      expect(screen.getByText("Body")).not.toHaveClass("flex-wrap");
    });
  });

  describe("state coverage", () => {
    it("defaults to md gap — tighter than Stack's md by design (DS-5A)", () => {
      render(<Inline>Body</Inline>);
      expect(screen.getByText("Body")).toHaveClass("gap-4");
    });

    it("supports every value on its own gap scale", () => {
      const { rerender } = render(<Inline gap="none">Body</Inline>);
      expect(screen.getByText("Body")).toHaveClass("gap-0");
      rerender(<Inline gap="xl">Body</Inline>);
      expect(screen.getByText("Body")).toHaveClass("gap-8");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Inline>Body</Inline>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
