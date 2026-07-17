import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  describe("rendering", () => {
    it("renders its label", () => {
      render(<FilterChip label="Status: Active" />);
      expect(screen.getByText("Status: Active")).toBeInTheDocument();
    });

    it("renders a remove button only when onRemove is given", () => {
      const { rerender } = render(<FilterChip label="Status: Active" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      rerender(<FilterChip label="Status: Active" onRemove={() => {}} />);
      expect(screen.getByRole("button", { name: "Remove Status: Active filter" })).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to neutral tone — the same shared pill treatment Badge uses (DS-5B)", () => {
      render(<FilterChip label="T" />);
      expect(screen.getByText("T")).toHaveClass("bg-neutral-soft", "text-neutral");
    });

    it("supports every value on the shared StatusTone scale", () => {
      const { rerender } = render(<FilterChip label="T" tone="accent" />);
      expect(screen.getByText("T")).toHaveClass("bg-accent-soft", "text-accent-400");
      rerender(<FilterChip label="T" tone="error" />);
      expect(screen.getByText("T")).toHaveClass("bg-error-soft", "text-error");
    });
  });

  describe("interaction", () => {
    it("calls onRemove when the remove button is clicked", async () => {
      const onRemove = vi.fn();
      const user = userEvent.setup();
      render(<FilterChip label="Status: Active" onRemove={onRemove} />);

      await user.click(screen.getByRole("button", { name: "Remove Status: Active filter" }));
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<FilterChip label="Status: Active" onRemove={() => {}} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
