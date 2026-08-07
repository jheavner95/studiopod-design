import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Surface } from "./Surface";

describe("Surface", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Surface>Body</Surface>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("omits the border when border is false", () => {
      const { rerender } = render(<Surface>Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("border");
      rerender(<Surface border={false}>Body</Surface>);
      expect(screen.getByText("Body")).not.toHaveClass("border");
    });
  });

  describe("state coverage", () => {
    it("defaults to no padding", () => {
      render(<Surface>Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("p-0");
    });

    it("supports every value on the shared structural padding scale — the same one Card and Panel use (DS-5A)", () => {
      const { rerender } = render(<Surface padding="none">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("p-0");
      rerender(<Surface padding="sm">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("p-4");
      rerender(<Surface padding="md">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("p-6");
      rerender(<Surface padding="lg">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
    });

    it("applies every elevation level", () => {
      const { rerender } = render(<Surface elevation="subtle">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("shadow-subtle");
      rerender(<Surface elevation="floating">Body</Surface>);
      expect(screen.getByText("Body")).toHaveClass("shadow-floating");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Surface>Body</Surface>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
