import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Stack } from "./Stack";

describe("Stack", () => {
  describe("rendering", () => {
    it("renders its children in a column", () => {
      render(<Stack>Body</Stack>);
      expect(screen.getByText("Body")).toHaveClass("flex-col");
    });
  });

  describe("state coverage", () => {
    it("defaults to md gap", () => {
      render(<Stack>Body</Stack>);
      expect(screen.getByText("Body")).toHaveClass("gap-6");
    });

    it("supports every value on its own gap scale — DS-5A audited this as intentionally distinct from Inline's, not merged", () => {
      const { rerender } = render(<Stack gap="none">Body</Stack>);
      expect(screen.getByText("Body")).toHaveClass("gap-0");
      rerender(<Stack gap="xs">Body</Stack>);
      expect(screen.getByText("Body")).toHaveClass("gap-1.5");
      rerender(<Stack gap="xl">Body</Stack>);
      expect(screen.getByText("Body")).toHaveClass("gap-12");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Stack>Body</Stack>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
