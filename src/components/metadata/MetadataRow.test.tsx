import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { MetadataRow } from "./MetadataRow";

describe("MetadataRow", () => {
  describe("rendering", () => {
    it("renders its label and value", () => {
      render(<MetadataRow label="Status" value="Active" />);
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders as a real <dl> with a matching <dt>/<dd> pair — DS-5F fix, previously a plain div/span with no label-value semantics", () => {
      const { container } = render(<MetadataRow label="Status" value="Active" />);
      const dl = container.querySelector("dl");
      expect(dl).toBeInTheDocument();
      expect(dl?.querySelector("dt")).toHaveTextContent("Status");
      expect(dl?.querySelector("dd")).toHaveTextContent("Active");
    });

    it("the dt/dd wrappers add no layout footprint — the label/value spans remain the direct flex items, same visual output as before the fix", () => {
      const { container } = render(<MetadataRow label="Status" value="Active" />);
      expect(container.querySelector("dt")).toHaveClass("contents");
      expect(container.querySelector("dd")).toHaveClass("contents");
    });
  });

  describe("state coverage", () => {
    it("defaults to the responsive layout — stacked classes present", () => {
      const { container } = render(<MetadataRow label="Status" value="Active" />);
      expect(container.querySelector("dl")).toHaveClass("flex-col", "sm:flex-row");
    });

    it("supports stacked and inline layouts", () => {
      const { container, rerender } = render(<MetadataRow label="Status" value="Active" layout="stacked" />);
      expect(container.querySelector("dl")).toHaveClass("flex-col");
      expect(container.querySelector("dl")).not.toHaveClass("sm:flex-row");
      rerender(<MetadataRow label="Status" value="Active" layout="inline" />);
      expect(container.querySelector("dl")).toHaveClass("flex-row", "items-baseline");
    });

    it("shows the empty fallback when value is empty", () => {
      render(<MetadataRow label="Owner" value={null} />);
      expect(screen.getByText("—")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<MetadataRow label="Status" value="Active" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
