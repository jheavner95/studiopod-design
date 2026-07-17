import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Panel } from "./Panel";

describe("Panel", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Panel>Body</Panel>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders the optional header row, separated by a border", () => {
      render(<Panel header="Title">Body</Panel>);
      expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it("omits the header row when none is given", () => {
      render(<Panel>Body</Panel>);
      expect(screen.queryByText("Title")).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to md body padding", () => {
      render(<Panel>Body</Panel>);
      expect(screen.getByText("Body")).toHaveClass("p-6");
    });

    it("supports every value on the shared structural padding scale — the same map Surface reads from directly (DS-5A: no more local bodyPaddingMap copy)", () => {
      const { rerender } = render(<Panel padding="none">Body</Panel>);
      expect(screen.getByText("Body")).toHaveClass("p-0");
      rerender(<Panel padding="sm">Body</Panel>);
      expect(screen.getByText("Body")).toHaveClass("p-4");
      rerender(<Panel padding="lg">Body</Panel>);
      expect(screen.getByText("Body")).toHaveClass("p-8");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Panel header="Title">Body</Panel>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
