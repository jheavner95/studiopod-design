import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { StatusIndicator } from "./StatusIndicator";

describe("StatusIndicator", () => {
  describe("rendering", () => {
    it("renders its default label per status", () => {
      render(<StatusIndicator status="active" />);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders a caller-supplied label instead of the default", () => {
      render(<StatusIndicator status="active" label="Syncing" />);
      expect(screen.getByText("Syncing")).toBeInTheDocument();
      expect(screen.queryByText("Active")).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("exposes role=status for every non-error status — DS-5D fix, previously no role at all", () => {
      (["idle", "active", "success", "warning"] as const).forEach((status) => {
        const { unmount } = render(<StatusIndicator status={status} />);
        expect(screen.getByRole("status")).toBeInTheDocument();
        unmount();
      });
    });

    it("exposes the assertive role=alert only for error — matching the rest of the feedback family's feedbackRole() convention", () => {
      render(<StatusIndicator status="error" />);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("only pulses the dot for active and warning statuses — idle/success/error render a single static dot, active/warning render the expanding-ring pair", () => {
      const { container, rerender } = render(<StatusIndicator status="idle" />);
      expect(container.querySelector(".relative.inline-flex")).not.toBeInTheDocument();
      rerender(<StatusIndicator status="active" />);
      expect(container.querySelector(".relative.inline-flex")).toBeInTheDocument();
      rerender(<StatusIndicator status="warning" />);
      expect(container.querySelector(".relative.inline-flex")).toBeInTheDocument();
      rerender(<StatusIndicator status="success" />);
      expect(container.querySelector(".relative.inline-flex")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations for every status", async () => {
      for (const status of ["idle", "active", "success", "warning", "error"] as const) {
        const { container, unmount } = render(<StatusIndicator status={status} />);
        expect(await runA11yCheck(container)).toHaveNoA11yViolations();
        unmount();
      }
    });
  });
});
