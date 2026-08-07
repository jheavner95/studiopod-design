import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Cluster } from "./Cluster";

describe("Cluster", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Cluster>Body</Cluster>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("always wraps and centers its items — the two decisions that distinguish it from a general-purpose Inline", () => {
      render(<Cluster>Body</Cluster>);
      expect(screen.getByText("Body")).toHaveClass("flex-wrap", "items-center");
    });
  });

  describe("state coverage", () => {
    it("defaults to a tighter gap than Inline's own default — sm, not md, since Cluster's peers (tags, chips) sit closer together", () => {
      render(<Cluster>Body</Cluster>);
      expect(screen.getByText("Body")).toHaveClass("gap-2");
    });

    it("supports every gap value on Inline's shared scale", () => {
      const { rerender } = render(<Cluster gap="none">Body</Cluster>);
      expect(screen.getByText("Body")).toHaveClass("gap-0");
      rerender(<Cluster gap="lg">Body</Cluster>);
      expect(screen.getByText("Body")).toHaveClass("gap-6");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Cluster>Body</Cluster>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
