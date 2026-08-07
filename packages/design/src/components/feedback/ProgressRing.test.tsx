import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { ProgressRing } from "./ProgressRing";

describe("ProgressRing", () => {
  describe("rendering", () => {
    it("renders a progressbar with the correct ARIA value", () => {
      render(<ProgressRing value={0.75} />);
      const ring = screen.getByRole("progressbar");
      expect(ring).toHaveAttribute("aria-valuenow", "75");
    });

    it("shows a percentage label at large enough sizes", () => {
      const { rerender } = render(<ProgressRing value={0.5} size={40} />);
      expect(screen.getByText("50%")).toBeInTheDocument();
      rerender(<ProgressRing value={0.5} size={20} />);
      expect(screen.queryByText("50%")).not.toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("renders the correct stroke class for every tone — the same fill/stroke pair ProgressBar owns (DS-5B), not an independent copy", () => {
      const { container, rerender } = render(<ProgressRing value={0.5} tone="accent" />);
      expect(container.querySelector("circle.stroke-accent-500")).toBeInTheDocument();
      rerender(<ProgressRing value={0.5} tone="success" />);
      expect(container.querySelector("circle.stroke-success")).toBeInTheDocument();
      rerender(<ProgressRing value={0.5} tone="warning" />);
      expect(container.querySelector("circle.stroke-warning")).toBeInTheDocument();
      rerender(<ProgressRing value={0.5} tone="error" />);
      expect(container.querySelector("circle.stroke-error")).toBeInTheDocument();
    });

    /**
     * ProgressRing's `label` prop is typed `string` (not ReactNode, unlike
     * ProgressBar's), so passing it directly to `aria-label` was always
     * type-safe and correct — confirmed here, not assumed, while fixing
     * ProgressBar's parallel ReactNode-label gap.
     */
    it("wires a given label directly to aria-label — always valid since label is typed as a plain string, not ReactNode", () => {
      render(<ProgressRing value={0.5} label="Sync progress" />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Sync progress");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with a label", async () => {
      const { container } = render(<ProgressRing value={0.5} label="Sync progress" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations on an indeterminate ring with no label (aria-label='Loading')", async () => {
      const { container } = render(<ProgressRing indeterminate />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("labels an indeterminate ring with no other label as 'Loading'", () => {
      render(<ProgressRing indeterminate />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Loading");
    });

    it("prefers the given label over the 'Loading' fallback when both indeterminate and label are set", () => {
      render(<ProgressRing indeterminate label="Syncing" />);
      expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "Syncing");
    });
  });
});
