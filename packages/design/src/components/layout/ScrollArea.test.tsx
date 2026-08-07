import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<ScrollArea>Body</ScrollArea>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("is a keyboard stop — tabIndex=0 — so arrow keys can scroll it even when its content has no focusable children of its own", () => {
      render(<ScrollArea>Body</ScrollArea>);
      expect(screen.getByText("Body")).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("state coverage", () => {
    it("defaults to vertical-only scrolling", () => {
      render(<ScrollArea>Body</ScrollArea>);
      expect(screen.getByText("Body")).toHaveClass("overflow-y-auto", "overflow-x-hidden");
    });

    it("supports horizontal-only and both-axis scrolling", () => {
      const { rerender } = render(<ScrollArea direction="horizontal">Body</ScrollArea>);
      expect(screen.getByText("Body")).toHaveClass("overflow-x-auto", "overflow-y-hidden");
      rerender(<ScrollArea direction="both">Body</ScrollArea>);
      expect(screen.getByText("Body")).toHaveClass("overflow-auto");
    });

    it("caps height via maxHeight when given", () => {
      render(<ScrollArea maxHeight="240px">Body</ScrollArea>);
      expect(screen.getByText("Body")).toHaveStyle({ maxHeight: "240px" });
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<ScrollArea>Body</ScrollArea>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
