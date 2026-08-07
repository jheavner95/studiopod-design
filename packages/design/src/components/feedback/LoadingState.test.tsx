import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  describe("rendering", () => {
    it("defaults its label to 'Loading…'", () => {
      render(<LoadingState />);
      expect(screen.getByText("Loading…")).toBeInTheDocument();
    });

    it("renders a custom label when given", () => {
      render(<LoadingState label="Fetching assets…" />);
      expect(screen.getByText("Fetching assets…")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("exposes role=status wrapping the spinner and label — the visible label is the region's own accessible content, no extra aria-label needed", () => {
      render(<LoadingState label="Loading assets" />);
      expect(screen.getByRole("status")).toHaveTextContent("Loading assets");
    });

    it("supports every size", () => {
      const { container, rerender } = render(<LoadingState size="sm" />);
      expect(container.querySelector("svg")).toHaveClass("size-4");
      rerender(<LoadingState size="lg" />);
      expect(container.querySelector("svg")).toHaveClass("size-8");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<LoadingState />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
