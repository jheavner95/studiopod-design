import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { PropertyGroup } from "./PropertyGroup";
import { MetadataField } from "./MetadataField";

describe("PropertyGroup", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(
        <PropertyGroup>
          <MetadataField label="SKU" value="TEE-ST-014" />
        </PropertyGroup>,
      );
      expect(screen.getByText("SKU")).toBeInTheDocument();
    });

    it("renders its title only when given", () => {
      const { rerender } = render(<PropertyGroup>Body</PropertyGroup>);
      expect(screen.queryByText("Details")).not.toBeInTheDocument();
      rerender(<PropertyGroup title="Details">Body</PropertyGroup>);
      expect(screen.getByText("Details")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to a 2-column grid", () => {
      const { container } = render(<PropertyGroup>Body</PropertyGroup>);
      expect(container.querySelector('[class*="grid-cols"]')).toBeInTheDocument();
    });

    it("supports 1 and 3 column layouts", () => {
      const { container, rerender } = render(<PropertyGroup columns={1}>Body</PropertyGroup>);
      expect(container.querySelector('[class*="grid-cols-1"]')).toBeInTheDocument();
      rerender(<PropertyGroup columns={3}>Body</PropertyGroup>);
      expect(container.innerHTML).toContain("grid-cols");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(
        <PropertyGroup title="Details">
          <MetadataField label="SKU" value="TEE-ST-014" />
        </PropertyGroup>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
