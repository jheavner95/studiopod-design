import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { MetadataValue } from "./MetadataValue";

describe("MetadataValue", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<MetadataValue>Active</MetadataValue>);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("renders the default em-dash fallback for undefined, null, and empty-string children", () => {
      const { rerender } = render(<MetadataValue>{undefined}</MetadataValue>);
      expect(screen.getByText("—")).toBeInTheDocument();
      rerender(<MetadataValue>{null}</MetadataValue>);
      expect(screen.getByText("—")).toBeInTheDocument();
      rerender(<MetadataValue>{""}</MetadataValue>);
      expect(screen.getByText("—")).toBeInTheDocument();
    });

    it("does not treat 0 or false as empty — only undefined, null, and empty string", () => {
      render(<MetadataValue>{0}</MetadataValue>);
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("supports a custom emptyFallback", () => {
      render(<MetadataValue emptyFallback="Not set">{null}</MetadataValue>);
      expect(screen.getByText("Not set")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<MetadataValue>Active</MetadataValue>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
