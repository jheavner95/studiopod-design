import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Notification } from "./Notification";
import { feedbackRole } from "./Alert";

describe("Notification", () => {
  describe("rendering", () => {
    it("renders its message", () => {
      render(<Notification message="Export finished" />);
      expect(screen.getByText("Export finished")).toBeInTheDocument();
    });

    it("renders title and timestamp only when given — both optional, unlike message", () => {
      const { rerender } = render(<Notification message="Body" />);
      expect(screen.queryByText("Export ready")).not.toBeInTheDocument();
      rerender(<Notification title="Export ready" message="Body" timestamp="2m ago" />);
      expect(screen.getByText("Export ready")).toBeInTheDocument();
      expect(screen.getByText("2m ago")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("agrees with the shared feedbackRole() helper for every tone", () => {
      (["info", "success", "warning", "error"] as const).forEach((tone) => {
        const { unmount } = render(<Notification tone={tone} message="Body" />);
        expect(screen.getByRole(feedbackRole(tone))).toBeInTheDocument();
        unmount();
      });
    });

    it("renders no dismiss button when onDismiss is omitted, and calls it on click when given", () => {
      const { rerender } = render(<Notification message="Body" />);
      expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();

      const onDismiss = vi.fn();
      rerender(<Notification message="Body" onDismiss={onDismiss} />);
      screen.getByRole("button", { name: "Dismiss" }).click();
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it("renders as a floating, tightly-padded Surface — the trait distinguishing it from Alert's own padding/elevation", () => {
      render(<Notification message="Body" />);
      expect(screen.getByRole("status")).toHaveClass("shadow-floating", "p-4");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with title, timestamp, action, and dismiss button", async () => {
      const { container } = render(
        <Notification
          title="Export ready"
          message="homepage-banner.zip"
          timestamp="2m ago"
          action={<button type="button">Download</button>}
          onDismiss={() => {}}
        />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations for the assertive error tone", async () => {
      const { container } = render(<Notification tone="error" message="Export failed" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
