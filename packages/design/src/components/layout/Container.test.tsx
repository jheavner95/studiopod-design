import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Container } from "./Container";

describe("Container", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Container>Body</Container>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders as a div by default and as the given element via `as`", () => {
      const { container, rerender } = render(<Container>Body</Container>);
      expect(container.firstChild).toHaveProperty("nodeName", "DIV");
      rerender(<Container as="main">Body</Container>);
      expect(container.firstChild).toHaveProperty("nodeName", "MAIN");
    });
  });

  describe("state coverage", () => {
    it("defaults to the content width bound", () => {
      render(<Container>Body</Container>);
      expect(screen.getByText("Body")).toHaveClass("max-w-[var(--container-content)]");
    });

    it("supports every width bound, including full (no max-width)", () => {
      const { rerender } = render(<Container size="narrow">Body</Container>);
      expect(screen.getByText("Body")).toHaveClass("max-w-[var(--container-narrow)]");
      rerender(<Container size="wide">Body</Container>);
      expect(screen.getByText("Body")).toHaveClass("max-w-[var(--container-wide)]");
      rerender(<Container size="full">Body</Container>);
      expect(screen.getByText("Body")).toHaveClass("max-w-none");
    });

    it("always centers horizontally and applies the fluid gutter", () => {
      render(<Container>Body</Container>);
      expect(screen.getByText("Body")).toHaveClass("mx-auto", "px-[var(--spacing-gutter)]");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Container>Body</Container>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
