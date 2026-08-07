import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Spinner } from "./Spinner";
import { LoadingState } from "./LoadingState";
import { CONTROL_SPINNER_CLASSES } from "@/lib/control-size";

/**
 * DS-5P — the bare tier of the loading family.
 *
 * The accessibility contract is the whole point of this component, so it is
 * asserted from both directions: silent by default (so it can be dropped into
 * a caller's live region without nesting one), announced only when it is the
 * sole indication that something is happening.
 */

function spinnerEl(container: HTMLElement) {
  return container.querySelector("svg") as SVGElement;
}

describe("Spinner", () => {
  describe("accessibility", () => {
    it("is aria-hidden by default — the inline case must not announce", () => {
      const { container } = render(<Spinner />);
      expect(spinnerEl(container)).toHaveAttribute("aria-hidden", "true");
      expect(spinnerEl(container)).not.toHaveAttribute("role");
    });

    it("becomes a named role=status only when given a label", () => {
      render(<Spinner label="Loading results" />);
      const el = screen.getByRole("status", { name: "Loading results" });
      expect(el).toBeInTheDocument();
      expect(el).not.toHaveAttribute("aria-hidden");
    });

    it("does not nest a live region inside a caller's own — the inline usage this exists for", () => {
      const { container } = render(
        <div role="status" aria-live="polite">
          <Spinner />
          Saving to your library…
        </div>,
      );
      // Exactly one live region: the caller's.
      expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
      expect(spinnerEl(container)).toHaveAttribute("aria-hidden", "true");
    });

    it("has no axe violations inline or standalone", async () => {
      const inline = render(
        <div role="status">
          <Spinner /> Working…
        </div>,
      );
      expect(await runA11yCheck(inline.container)).toHaveNoA11yViolations();
      const standalone = render(<Spinner label="Loading" />);
      expect(await runA11yCheck(standalone.container)).toHaveNoA11yViolations();
    });
  });

  describe("size", () => {
    it.each(["xs", "sm", "md", "lg"] as const)("applies the shared scale at %s", (size) => {
      const { container } = render(<Spinner size={size} />);
      for (const cls of CONTROL_SPINNER_CLASSES[size].split(" ")) {
        expect(spinnerEl(container)).toHaveClass(cls);
      }
    });

    it("defaults to md", () => {
      const { container } = render(<Spinner />);
      expect(spinnerEl(container)).toHaveClass(CONTROL_SPINNER_CLASSES.md);
    });

    it("lets a caller override the size through className — tailwind-merge resolves the conflict", () => {
      const { container } = render(<Spinner size="md" className="size-8" />);
      const el = spinnerEl(container);
      expect(el).toHaveClass("size-8");
      expect(el).not.toHaveClass("size-4");
    });
  });

  describe("animation", () => {
    it("spins, and never shrinks in a flex row", () => {
      // shrink-0 is the DS-5N lesson: square in isolation, collapsed as a flex
      // item. A spinner beside a long label is exactly that situation.
      const { container } = render(<Spinner />);
      expect(spinnerEl(container)).toHaveClass("animate-spin", "shrink-0");
    });

    it("relies on the package's global reduced-motion rule rather than its own branch", () => {
      // No per-component media query: animate-spin is disabled globally, the
      // same baseline Skeleton's pulse uses. Asserting the class is present is
      // the contract; the global stylesheet does the disabling.
      const { container } = render(<Spinner />);
      expect(spinnerEl(container).className.baseVal ?? spinnerEl(container).getAttribute("class")).toContain(
        "animate-spin",
      );
    });
  });

  describe("composition (DS-5P)", () => {
    it("LoadingState renders exactly one spinner — it composes this component, not a second copy", () => {
      const { container } = render(<LoadingState />);
      expect(container.querySelectorAll("svg")).toHaveLength(1);
      expect(spinnerEl(container)).toHaveClass("animate-spin");
    });

    it("LoadingState keeps its own region role and leaves the spinner silent", () => {
      const { container } = render(<LoadingState label="Loading assets" />);
      expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
      expect(spinnerEl(container)).toHaveAttribute("aria-hidden", "true");
    });

    it.each([
      ["sm", "size-4"],
      ["md", "size-6"],
      ["lg", "size-8"],
    ] as const)("LoadingState size=%s still renders its own %s region dimension", (size, cls) => {
      const { container } = render(<LoadingState size={size} />);
      expect(spinnerEl(container)).toHaveClass(cls);
    });
  });
});
