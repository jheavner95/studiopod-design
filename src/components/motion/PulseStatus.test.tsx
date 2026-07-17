import { describe, it, expect } from "vitest";
import { render } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { PulseStatus } from "./PulseStatus";

describe("PulseStatus", () => {
  describe("rendering", () => {
    it("renders a static dot when active is false", () => {
      const { container } = render(<PulseStatus active={false} />);
      expect(container.querySelectorAll("span")).toHaveLength(1);
    });

    it("renders an expanding-ring pair when active", () => {
      const { container } = render(<PulseStatus active />);
      expect(container.querySelectorAll("span").length).toBeGreaterThan(1);
    });
  });

  describe("state coverage", () => {
    it("defaults to accent tone, md size", () => {
      const { container } = render(<PulseStatus active={false} />);
      expect(container.querySelector("span")).toHaveClass("bg-accent-500", "size-2.5");
    });

    it("supports every value on PulseTone — DS-5B: an alias of the canonical StatusTone, not a separately declared union", () => {
      const { container, rerender } = render(<PulseStatus active={false} tone="neutral" />);
      expect(container.querySelector("span")).toHaveClass("bg-neutral");
      rerender(<PulseStatus active={false} tone="success" />);
      expect(container.querySelector("span")).toHaveClass("bg-success");
      rerender(<PulseStatus active={false} tone="warning" />);
      expect(container.querySelector("span")).toHaveClass("bg-warning");
      rerender(<PulseStatus active={false} tone="error" />);
      expect(container.querySelector("span")).toHaveClass("bg-error");
    });

    it("supports the sm size", () => {
      const { container } = render(<PulseStatus active={false} size="sm" />);
      expect(container.querySelector("span")).toHaveClass("size-1.5");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<PulseStatus />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
