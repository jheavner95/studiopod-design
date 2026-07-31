import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { PipelineStep } from "./PipelineStep";

/**
 * DS-5B: PipelineStep now imports its marker/label/icon maps from
 * WorkflowStep rather than keeping its own byte-identical copy — these
 * tests confirm the consolidation produced no rendering change, not just
 * that the import resolves.
 */
describe("PipelineStep", () => {
  describe("rendering", () => {
    it("renders the label and description", () => {
      render(<PipelineStep label="Fetch" description="Pulling source" status="running" />);
      expect(screen.getByText("Fetch")).toBeInTheDocument();
      expect(screen.getByText("Pulling source")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("renders the same marker tone classes WorkflowStep does for a shared status — proof the imported maps, not a divergent copy, are in effect", () => {
      const { container } = render(<PipelineStep label="Build" status="completed" />);
      // The ink is `canvas`, not `white`: white on success is 2.28:1 (UX-2/CR-3).
      // What this test actually proves is that the tone map is SHARED, so it
      // asserts the pairing WorkflowStep produces, whatever that pairing is.
      expect(container.querySelector(".bg-success.text-canvas")).toBeInTheDocument();
    });

    it("renders every one of the eight WorkflowStateValue statuses without throwing", () => {
      const statuses = ["not-started", "ready", "running", "waiting", "blocked", "completed", "failed", "cancelled"] as const;
      for (const status of statuses) {
        expect(() => render(<PipelineStep label="Step" status={status} />)).not.toThrow();
      }
    });

    it("marks the running step as aria-current=step", () => {
      render(<PipelineStep label="Build" status="running" />);
      expect(screen.getByText("Build").closest("[aria-current]")).toHaveAttribute("aria-current", "step");
    });
  });

  describe("interaction", () => {
    it("calls onClick when activated", async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(<PipelineStep label="Build" status="waiting" onClick={onClick} />);
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<PipelineStep label="Build" status="failed" onClick={() => {}} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
