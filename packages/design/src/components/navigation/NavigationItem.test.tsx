import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { NavigationItem, NavigationCollapsedContext } from "./NavigationItem";

describe("NavigationItem", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<NavigationItem href="/products">Products</NavigationItem>);
      expect(screen.getByText("Products")).toBeInTheDocument();
    });

    it("renders as a link when href is given, and a button otherwise", () => {
      const { rerender } = render(<NavigationItem href="/products">Products</NavigationItem>);
      expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
      rerender(<NavigationItem onClick={() => {}}>Products</NavigationItem>);
      expect(screen.getByRole("button", { name: "Products" })).toBeInTheDocument();
    });

    it("renders a badge only when both given and not collapsed", () => {
      const { rerender } = render(
        <NavigationItem href="/inbox" badge={<span>3</span>}>
          Inbox
        </NavigationItem>,
      );
      expect(screen.getByText("3")).toBeInTheDocument();
      rerender(
        <NavigationItem href="/inbox" badge={<span>3</span>} collapsed>
          Inbox
        </NavigationItem>,
      );
      expect(screen.queryByText("3")).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks the current destination with aria-current=page", () => {
      const { rerender } = render(<NavigationItem href="/products">Products</NavigationItem>);
      expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
      rerender(
        <NavigationItem href="/products" active>
          Products
        </NavigationItem>,
      );
      expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
    });

    it("falls back to a button with href present once disabled — clicking it never navigates", () => {
      render(
        <NavigationItem href="/products" disabled>
          Products
        </NavigationItem>,
      );
      const button = screen.getByRole("button", { name: "Products" });
      expect(button).toBeDisabled();
    });

    it("calls onClick for the button variant", () => {
      const onClick = vi.fn();
      render(<NavigationItem onClick={onClick}>Products</NavigationItem>);
      screen.getByRole("button").click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("defaults collapsed state from NavigationCollapsedContext when its own prop is omitted", () => {
      render(
        <NavigationCollapsedContext.Provider value={true}>
          <NavigationItem href="/products" tooltip="Products">
            Products
          </NavigationItem>
        </NavigationCollapsedContext.Provider>,
      );
      // Collapsed renders icon-only — the label span is omitted, so the visible text query fails
      // and the accessible name instead comes from the wired aria-label (tooltip fallback).
      expect(screen.queryByText("Products")).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    });

    it("an explicit collapsed prop overrides the inherited context value", () => {
      render(
        <NavigationCollapsedContext.Provider value={true}>
          <NavigationItem href="/products" collapsed={false}>
            Products
          </NavigationItem>
        </NavigationCollapsedContext.Provider>,
      );
      expect(screen.getByText("Products")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, expanded and collapsed", async () => {
      const { container, rerender } = render(
        <NavigationItem href="/products" icon={<span aria-hidden>★</span>}>
          Products
        </NavigationItem>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
      rerender(
        <NavigationItem href="/products" tooltip="Products" collapsed>
          Products
        </NavigationItem>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
