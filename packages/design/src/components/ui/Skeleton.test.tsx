import { describe, it, expect } from "vitest";
import { render } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  describe("rendering", () => {
    it("renders a single placeholder block", () => {
      const { container } = render(<Skeleton className="my-skeleton" />);
      expect(container.querySelector(".my-skeleton")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to the block variant", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass("rounded-md");
    });

    it("supports every variant's shape class", () => {
      const { container, rerender } = render(<Skeleton variant="text" />);
      expect(container.firstChild).toHaveClass("h-3", "rounded-full");
      rerender(<Skeleton variant="circle" />);
      expect(container.firstChild).toHaveClass("aspect-square", "rounded-full");
    });

    it("animates via plain CSS animate-pulse, not framer-motion — covered by the global prefers-reduced-motion rule automatically", () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toHaveClass("animate-pulse");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Skeleton />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
