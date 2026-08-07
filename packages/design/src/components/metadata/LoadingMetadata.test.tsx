import { describe, it, expect } from "vitest";
import { render } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { LoadingMetadata } from "./LoadingMetadata";

describe("LoadingMetadata", () => {
  describe("rendering", () => {
    it("renders 4 skeleton rows by default", () => {
      const { container } = render(<LoadingMetadata />);
      expect(container.querySelectorAll(".animate-pulse")).toHaveLength(4);
    });

    it("renders the given number of rows", () => {
      const { container } = render(<LoadingMetadata rows={2} />);
      expect(container.querySelectorAll(".animate-pulse")).toHaveLength(2);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<LoadingMetadata />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
