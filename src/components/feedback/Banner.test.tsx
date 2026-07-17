import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Banner } from "./Banner";
import { feedbackRole } from "./Alert";

describe("Banner", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Banner>Scheduled maintenance tonight</Banner>);
      expect(screen.getByText("Scheduled maintenance tonight")).toBeInTheDocument();
    });

    it("has no title prop — unlike Alert, its body text is the whole message", () => {
      render(<Banner>Body</Banner>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders action content only when given", () => {
      render(<Banner action={<button type="button">Dismiss for now</button>}>Body</Banner>);
      expect(screen.getByRole("button", { name: "Dismiss for now" })).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("agrees with the shared feedbackRole() helper for every tone", () => {
      (["info", "success", "warning", "error"] as const).forEach((tone) => {
        const { unmount } = render(<Banner tone={tone}>Body</Banner>);
        expect(screen.getByRole(feedbackRole(tone))).toBeInTheDocument();
        unmount();
      });
    });

    it("renders no dismiss button when onDismiss is omitted, and calls it on click when given", () => {
      const { rerender } = render(<Banner>Body</Banner>);
      expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();

      const onDismiss = vi.fn();
      rerender(<Banner onDismiss={onDismiss}>Body</Banner>);
      screen.getByRole("button", { name: "Dismiss" }).click();
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it("spans full width, edge-to-edge — the trait distinguishing it from Alert's boxed placement", () => {
      render(<Banner>Body</Banner>);
      expect(screen.getByRole("status")).toHaveClass("w-full");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with an action and dismiss button", async () => {
      const { container } = render(
        <Banner action={<button type="button">Learn more</button>} onDismiss={() => {}}>
          Body
        </Banner>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations for the assertive error tone", async () => {
      const { container } = render(<Banner tone="error">Body</Banner>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
