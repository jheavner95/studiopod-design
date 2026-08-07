import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const ITEMS: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Holiday Collection" },
];

describe("Breadcrumbs", () => {
  describe("rendering", () => {
    it("renders every crumb's label", () => {
      render(<Breadcrumbs items={ITEMS} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Holiday Collection")).toBeInTheDocument();
    });

    it("renders every crumb but the last as a link", () => {
      render(<Breadcrumbs items={ITEMS} />);
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Holiday Collection" })).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks only the last crumb as aria-current=page", () => {
      render(<Breadcrumbs items={ITEMS} />);
      expect(screen.getByText("Holiday Collection")).toHaveAttribute("aria-current", "page");
    });

    it("collapses middle items behind an overflow trigger once there are more than maxVisible", () => {
      const many: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Apparel", href: "/apparel" },
        { label: "Tees", href: "/tees" },
        { label: "Holiday Collection" },
      ];
      render(<Breadcrumbs items={many} maxVisible={3} />);
      expect(screen.getByRole("button", { name: "Show hidden breadcrumb items" })).toBeInTheDocument();
      expect(screen.queryByText("Apparel")).not.toBeInTheDocument();
    });

    it("renders every crumb inline with no overflow trigger when under maxVisible", () => {
      render(<Breadcrumbs items={ITEMS} maxVisible={4} />);
      expect(screen.queryByRole("button", { name: "Show hidden breadcrumb items" })).not.toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("opens the overflow menu listing every hidden item", () => {
      const many: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Apparel", href: "/apparel" },
        { label: "Tees", href: "/tees" },
        { label: "Holiday Collection" },
      ];
      render(<Breadcrumbs items={many} maxVisible={3} />);
      fireEvent.click(screen.getByRole("button", { name: "Show hidden breadcrumb items" }));
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Apparel" })).toBeInTheDocument();
    });

    it("navigates via the router when a hidden item is selected from the overflow menu", () => {
      push.mockClear();
      const many: BreadcrumbItem[] = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: "Apparel", href: "/apparel" },
        { label: "Tees", href: "/tees" },
        { label: "Holiday Collection" },
      ];
      render(<Breadcrumbs items={many} maxVisible={3} />);
      fireEvent.click(screen.getByRole("button", { name: "Show hidden breadcrumb items" }));
      fireEvent.click(screen.getByRole("menuitem", { name: "Apparel" }));
      expect(push).toHaveBeenCalledWith("/apparel");
    });
  });

  describe("accessibility", () => {
    it("is a Breadcrumb nav landmark with an ordered list, and has no axe violations", async () => {
      const { container } = render(<Breadcrumbs items={ITEMS} />);
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
      expect(container.querySelector("ol")).toBeInTheDocument();
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
