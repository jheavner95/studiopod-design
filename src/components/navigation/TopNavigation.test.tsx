import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { TopNavigation, type TopNavigationItemDef } from "./TopNavigation";

const ITEMS: TopNavigationItemDef[] = [
  { id: "overview", label: "Overview", href: "/overview" },
  { id: "products", label: "Products", href: "/products" },
];

describe("TopNavigation", () => {
  describe("rendering", () => {
    it("renders the brand slot and every item's label", () => {
      render(<TopNavigation brand={<span>Acme</span>} items={ITEMS} />);
      expect(screen.getByText("Acme")).toBeInTheDocument();
      expect(screen.getByText("Overview")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders the trailing slot only when given", () => {
      const { rerender } = render(<TopNavigation brand="Acme" items={ITEMS} />);
      expect(screen.queryByText("Search…")).not.toBeInTheDocument();
      rerender(<TopNavigation brand="Acme" items={ITEMS} trailing={<span>Search…</span>} />);
      expect(screen.getByText("Search…")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks the item matching activeHref as current", () => {
      render(<TopNavigation brand="Acme" items={ITEMS} activeHref="/products" />);
      expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
    });

    it("renders each item's icon and badge when given — DS-5E fix, previously dropped despite NavigationItem itself supporting both", () => {
      render(
        <TopNavigation
          brand="Acme"
          items={[{ id: "inbox", label: "Inbox", href: "/inbox", icon: <span data-testid="icon">★</span>, badge: <span>3</span> }]}
        />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("is sticky by default", () => {
      render(<TopNavigation brand="Acme" items={ITEMS} />);
      expect(screen.getByText("Acme").closest("header")).toHaveClass("sticky");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<TopNavigation brand="Acme" items={ITEMS} activeHref="/overview" trailing={<span>Search…</span>} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
