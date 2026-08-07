import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { MetadataField } from "./MetadataField";

describe("MetadataField", () => {
  describe("rendering", () => {
    it("renders its label and value", () => {
      render(<MetadataField label="SKU" value="TEE-ST-014" />);
      expect(screen.getByText("SKU")).toBeInTheDocument();
      expect(screen.getByText("TEE-ST-014")).toBeInTheDocument();
    });

    it("renders as a real <dl> with a matching <dt>/<dd> pair — DS-5F fix, same as MetadataRow", () => {
      const { container } = render(<MetadataField label="SKU" value="TEE-ST-014" />);
      const dl = container.querySelector("dl");
      expect(dl).toBeInTheDocument();
      expect(dl?.querySelector("dt")).toHaveTextContent("SKU");
      expect(dl?.querySelector("dd")).toHaveTextContent("TEE-ST-014");
    });
  });

  describe("state coverage", () => {
    it("stacks label above value", () => {
      const { container } = render(<MetadataField label="SKU" value="TEE-ST-014" />);
      expect(container.querySelector("dl")).toHaveClass("flex-col");
    });

    it("shows the empty fallback when value is empty", () => {
      render(<MetadataField label="Kind" value="" />);
      expect(screen.getByText("—")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<MetadataField label="SKU" value="TEE-ST-014" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
