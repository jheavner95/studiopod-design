import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { WorkflowStep } from "./WorkflowStep";

describe("WorkflowStep", () => {
  describe("rendering", () => {
    it("renders the label and description", () => {
      render(<WorkflowStep label="Review" description="Awaiting approval" status="waiting" />);
      expect(screen.getByText("Review")).toBeInTheDocument();
      expect(screen.getByText("Awaiting approval")).toBeInTheDocument();
    });

    it("renders as a button when onClick is given, a plain div otherwise", () => {
      const { rerender } = render(<WorkflowStep label="Review" status="waiting" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      rerender(<WorkflowStep label="Review" status="waiting" onClick={() => {}} />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks the running step as aria-current=step", () => {
      render(<WorkflowStep label="Build" status="running" />);
      expect(screen.getByText("Build").closest("[aria-current]")).toHaveAttribute("aria-current", "step");
    });

    it("renders a screen-reader-only status label for terminal states, omitted for the unstarted default", () => {
      const { rerender } = render(<WorkflowStep label="Deploy" status="failed" />);
      expect(screen.getByText("(Failed)")).toBeInTheDocument();
      rerender(<WorkflowStep label="Deploy" status="not-started" />);
      expect(screen.queryByText(/\(.*\)/)).not.toBeInTheDocument();
    });

    it("renders every one of the eight WorkflowStateValue statuses without throwing", () => {
      const statuses = ["not-started", "ready", "running", "waiting", "blocked", "completed", "failed", "cancelled"] as const;
      for (const status of statuses) {
        expect(() => render(<WorkflowStep label="Step" status={status} />)).not.toThrow();
      }
    });
  });

  describe("interaction", () => {
    it("calls onClick when activated", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<WorkflowStep label="Review" status="waiting" onClick={onClick} />);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<WorkflowStep label="Review" status="running" onClick={() => {}} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
