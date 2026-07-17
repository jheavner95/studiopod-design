import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Card } from "./Card";

describe("Card", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Card>Body</Card>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders as a different element via `as`", () => {
      render(<Card as="section">Body</Card>);
      expect(screen.getByText("Body").tagName).toBe("SECTION");
    });
  });

  describe("state coverage", () => {
    it("defaults to md padding", () => {
      render(<Card>Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("p-6");
    });

    it("supports every value on the shared structural padding scale, including the DS-5A-added none", () => {
      const { rerender } = render(<Card padding="none">Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("p-0");
      rerender(<Card padding="sm">Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("p-4");
      rerender(<Card padding="md">Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("p-6");
      rerender(<Card padding="lg">Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
    });

    it("applies the interactive treatment only when interactive is set", () => {
      const { rerender } = render(<Card>Body</Card>);
      expect(screen.getByText("Body")).not.toHaveClass("hover:-translate-y-0.5");
      rerender(<Card interactive>Body</Card>);
      expect(screen.getByText("Body")).toHaveClass("hover:-translate-y-0.5");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Card>Body</Card>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
