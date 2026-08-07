import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ContentColumns } from "./ContentColumns";

describe("ContentColumns", () => {
  describe("rendering", () => {
    it("renders both primary and secondary content", () => {
      render(<ContentColumns primary="Primary" secondary="Secondary" />);
      expect(screen.getByText("Primary")).toBeInTheDocument();
      expect(screen.getByText("Secondary")).toBeInTheDocument();
    });

    it("stacks to a single column on mobile, splitting only from md", () => {
      render(<ContentColumns primary="Primary" secondary="Secondary" />);
      const grid = screen.getByText("Primary").parentElement!;
      expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
    });
  });

  describe("state coverage", () => {
    it("defaults to md gap, on its own page-level scale — categorically larger than Stack/Grid's item-level gaps (DS-5A)", () => {
      const grid = render(<ContentColumns primary="Primary" secondary="Secondary" />).container.firstChild;
      expect(grid).toHaveClass("gap-12");
    });

    it("supports every value on its own gap scale", () => {
      const { container, rerender } = render(<ContentColumns primary="P" secondary="S" gap="sm" />);
      expect(container.firstChild).toHaveClass("gap-8");
      rerender(<ContentColumns primary="P" secondary="S" gap="lg" />);
      expect(container.firstChild).toHaveClass("gap-16");
    });

    it("applies every column ratio", () => {
      const { container, rerender } = render(<ContentColumns primary="P" secondary="S" ratio="narrow-wide" />);
      expect(container.firstChild).toHaveClass("md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]");
      rerender(<ContentColumns primary="P" secondary="S" ratio="wide-narrow" />);
      expect(container.firstChild).toHaveClass("md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<ContentColumns primary="Primary" secondary="Secondary" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
