import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ProgressBar, PROGRESS_TONE_CLASSES } from "./ProgressBar";

describe("ProgressBar", () => {
  describe("rendering", () => {
    it("renders a progressbar with the correct ARIA value", () => {
      render(<ProgressBar value={0.42} />);
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("aria-valuenow", "42");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
    });

    it("clamps out-of-range values", () => {
      const { rerender } = render(<ProgressBar value={2} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
      rerender(<ProgressBar value={-1} />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    });

    it("omits aria-valuenow when indeterminate", () => {
      render(<ProgressBar indeterminate />);
      expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
    });
  });

  describe("state coverage", () => {
    it("PROGRESS_TONE_CLASSES has exactly the four documented keys, each a full static class string (not a template-literal construction Tailwind's build-time scanner can't see)", () => {
      expect(Object.keys(PROGRESS_TONE_CLASSES).sort()).toEqual(["accent", "error", "success", "warning"]);
      expect(PROGRESS_TONE_CLASSES).toEqual({
        accent: { fill: "bg-accent-500", stroke: "stroke-accent-500" },
        success: { fill: "bg-success", stroke: "stroke-success" },
        warning: { fill: "bg-warning", stroke: "stroke-warning" },
        error: { fill: "bg-error", stroke: "stroke-error" },
      });
    });

    it("shows a percentage label when showPercentage is set", () => {
      render(<ProgressBar value={0.5} showPercentage />);
      expect(screen.getByText("50%")).toBeInTheDocument();
    });

    it("wires a visible label to the progressbar via aria-labelledby, pointing at the label element's own id — the fix for a gap found during DS-5B: label used to render as unconnected sibling text", () => {
      render(<ProgressBar value={0.5} label="Upload" />);
      const bar = screen.getByRole("progressbar");
      const labelledBy = bar.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy!)).toHaveTextContent("Upload");
    });

    it("does not set aria-labelledby when there is no label", () => {
      render(<ProgressBar value={0.5} />);
      expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-labelledby");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations on an indeterminate bar with no label (aria-label='Loading')", async () => {
      const { container } = render(<ProgressBar indeterminate />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations on a labeled, determinate bar — aria-labelledby now wires the accessible name (previously a known gap, fixed)", async () => {
      const { container } = render(<ProgressBar value={0.5} label="Upload" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations on a labeled, indeterminate bar", async () => {
      const { container } = render(<ProgressBar indeterminate label="Syncing" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("labels an indeterminate bar with no other label as 'Loading'", () => {
      render(<ProgressBar indeterminate />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Loading");
    });

    it("prefers aria-labelledby over the 'Loading' fallback when both a label and indeterminate are set", () => {
      render(<ProgressBar indeterminate label="Syncing" />);
      const bar = screen.getByRole("progressbar");
      expect(bar).not.toHaveAttribute("aria-label", "Loading");
      expect(bar).toHaveAttribute("aria-labelledby");
    });
  });
});
