import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { SideNavigation } from "./SideNavigation";
import { NavigationItem } from "./NavigationItem";

describe("SideNavigation", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<SideNavigation>Body</SideNavigation>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to the 'Primary' landmark name", () => {
      render(<SideNavigation>Body</SideNavigation>);
      expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    });

    it("accepts a custom landmark name", () => {
      render(<SideNavigation aria-label="Settings">Body</SideNavigation>);
      expect(screen.getByRole("navigation", { name: "Settings" })).toBeInTheDocument();
    });

    it("cascades collapsed state to NavigationItem children via context — no label span renders", () => {
      render(
        <SideNavigation collapsed>
          <NavigationItem href="/products" tooltip="Products">
            Products
          </NavigationItem>
        </SideNavigation>,
      );
      expect(screen.queryByText("Products")).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, expanded and collapsed", async () => {
      const { container, rerender } = render(
        <SideNavigation>
          <NavigationItem href="/products">Products</NavigationItem>
        </SideNavigation>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(
        <SideNavigation collapsed>
          <NavigationItem href="/products" tooltip="Products">
            Products
          </NavigationItem>
        </SideNavigation>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
