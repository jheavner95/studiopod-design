import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Badge } from "./Badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to neutral tone, md size", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toHaveClass("bg-neutral-soft", "text-neutral", "px-2.5", "py-1");
    });

    it("supports every value on the canonical StatusTone scale — DS-5B: sourced from src/lib/tone.ts, not a local copy", () => {
      const { rerender } = render(<Badge tone="accent">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-accent-soft", "text-accent-400");
      rerender(<Badge tone="success">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-success-soft", "text-success");
      rerender(<Badge tone="warning">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-warning-soft", "text-warning");
      rerender(<Badge tone="error">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-error-soft", "text-error");
    });

    it("supports both sizes", () => {
      render(<Badge size="sm">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("px-2", "py-0.5");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Badge>New</Badge>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
