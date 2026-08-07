import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Alert, feedbackRole } from "./Alert";

describe("Alert", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Alert>Body copy</Alert>);
      expect(screen.getByText("Body copy")).toBeInTheDocument();
    });

    it("renders a title only when given", () => {
      const { rerender } = render(<Alert>Body</Alert>);
      expect(screen.queryByText("Heads up")).not.toBeInTheDocument();
      rerender(<Alert title="Heads up">Body</Alert>);
      expect(screen.getByText("Heads up")).toBeInTheDocument();
    });

    it("renders action content only when given", () => {
      render(
        <Alert action={<button type="button">Retry</button>}>
          Body
        </Alert>,
      );
      expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to info tone, exposed as role=status", () => {
      render(<Alert>Body</Alert>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("exposes role=alert only for error tone — every other tone stays role=status, matching feedbackRole()", () => {
      const { rerender } = render(<Alert tone="error">Body</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      rerender(<Alert tone="success">Body</Alert>);
      expect(screen.getByRole("status")).toBeInTheDocument();
      rerender(<Alert tone="warning">Body</Alert>);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("agrees with the shared feedbackRole() helper for every tone — not an independent role computation", () => {
      (["info", "success", "warning", "error"] as const).forEach((tone) => {
        const { unmount } = render(<Alert tone={tone}>Body</Alert>);
        expect(screen.getByRole(feedbackRole(tone))).toBeInTheDocument();
        unmount();
      });
    });

    it("renders no dismiss button when onDismiss is omitted, and calls it on click when given", async () => {
      const { rerender } = render(<Alert>Body</Alert>);
      expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();

      const onDismiss = vi.fn();
      rerender(<Alert onDismiss={onDismiss}>Body</Alert>);
      const dismissButton = screen.getByRole("button", { name: "Dismiss" });
      dismissButton.click();
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with a title, body, action, and dismiss button", async () => {
      const { container } = render(
        <Alert title="Heads up" action={<button type="button">Retry</button>} onDismiss={() => {}}>
          Body
        </Alert>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations for the assertive error tone", async () => {
      const { container } = render(<Alert tone="error">Something went wrong</Alert>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
