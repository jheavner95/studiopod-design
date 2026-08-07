import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ContextNavigation } from "./ContextNavigation";

describe("ContextNavigation", () => {
  describe("rendering", () => {
    it("renders its label", () => {
      render(<ContextNavigation label="Holiday Collection" />);
      expect(screen.getByText("Holiday Collection")).toBeInTheDocument();
    });

    it("renders every related link when given", () => {
      render(
        <ContextNavigation
          label="Holiday Collection"
          links={[
            { id: "assets", label: "Assets", href: "/assets" },
            { id: "orders", label: "Orders", href: "/orders" },
          ]}
        />,
      );
      expect(screen.getByRole("link", { name: "Assets" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
    });

    it("renders no related-links nav landmark when links is empty", () => {
      render(<ContextNavigation label="Holiday Collection" />);
      expect(screen.queryByRole("navigation", { name: "Related" })).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("wraps its links in a 'Related' nav landmark, distinct from Breadcrumbs' path-based model — no current-item concept of its own", () => {
      render(<ContextNavigation label="Holiday Collection" links={[{ id: "assets", label: "Assets", href: "/assets" }]} />);
      const nav = screen.getByRole("navigation", { name: "Related" });
      expect(nav).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Assets" })).not.toHaveAttribute("aria-current");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(
        <ContextNavigation label="Holiday Collection" links={[{ id: "assets", label: "Assets", href: "/assets" }]} />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
