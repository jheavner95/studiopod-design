import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InlineMessage } from "./InlineMessage";
import { feedbackRole } from "./Alert";

describe("InlineMessage", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<InlineMessage>Saved 2 minutes ago</InlineMessage>);
      expect(screen.getByText("Saved 2 minutes ago")).toBeInTheDocument();
    });

    it("renders as an inline <span>, not a block — the trait distinguishing it from Alert/Banner/Notification", () => {
      render(<InlineMessage>Body</InlineMessage>);
      expect(screen.getByRole("status").tagName).toBe("SPAN");
    });
  });

  describe("state coverage", () => {
    it("agrees with the shared feedbackRole() helper for every tone", () => {
      (["info", "success", "warning", "error"] as const).forEach((tone) => {
        const { unmount } = render(<InlineMessage tone={tone}>Body</InlineMessage>);
        expect(screen.getByRole(feedbackRole(tone))).toBeInTheDocument();
        unmount();
      });
    });

    it("has no title, action, or dismiss button props — the smallest surface in the family, by design", () => {
      render(<InlineMessage>Body</InlineMessage>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<InlineMessage>Body</InlineMessage>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations for the assertive error tone", async () => {
      const { container } = render(<InlineMessage tone="error">This can&apos;t be undone</InlineMessage>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
