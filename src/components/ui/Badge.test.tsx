import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Badge } from "./Badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to neutral tone, md size", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toHaveClass("bg-neutral-soft", "text-neutral", "px-2.5", "py-1");
    });

    it("supports every value on the canonical StatusTone scale — DS-5B: sourced from src/lib/tone.ts, not a local copy", () => {
      const { rerender } = render(<Badge tone="accent">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-accent-soft", "text-accent-400");
      rerender(<Badge tone="success">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-success-soft", "text-success");
      rerender(<Badge tone="warning">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-warning-soft", "text-warning");
      rerender(<Badge tone="error">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("bg-error-soft", "text-error");
    });

    it("supports both sizes", () => {
      render(<Badge size="sm">T</Badge>);
      expect(screen.getByText("T")).toHaveClass("px-2", "py-0.5");
    });
  });

  // DS-5I — optional static leading indicator dot, tone inherited from the badge.
  describe("dot (DS-5I)", () => {
    const dotOf = (c: HTMLElement) => c.querySelector<HTMLElement>('[aria-hidden="true"]');

    it("renders no dot by default", () => {
      const { container } = render(<Badge>New</Badge>);
      expect(dotOf(container)).toBeNull();
    });

    it("renders a leading dot when requested, as the pill's first child, label intact", () => {
      const { container } = render(<Badge dot>Active</Badge>);
      const pill = container.firstElementChild!;
      const dot = dotOf(container);
      expect(dot).not.toBeNull();
      expect(pill.firstElementChild).toBe(dot); // dot precedes the label
      expect(pill.textContent).toBe("Active"); // children preserved intact
    });

    it("marks the dot decorative with aria-hidden", () => {
      const { container } = render(<Badge dot>Active</Badge>);
      expect(dotOf(container)).toHaveAttribute("aria-hidden", "true");
    });

    it("uses the neutral dot class by default", () => {
      const { container } = render(<Badge dot>Idle</Badge>);
      expect(dotOf(container)).toHaveClass("bg-neutral", "size-1.5", "rounded-full", "shrink-0");
    });

    it("inherits each canonical tone's dot color from the badge tone", () => {
      const cases = [
        ["neutral", "bg-neutral"],
        ["accent", "bg-accent-400"],
        ["success", "bg-success"],
        ["warning", "bg-warning"],
        ["error", "bg-error"],
      ] as const;
      const { container, rerender } = render(<Badge dot>T</Badge>);
      for (const [tone, cls] of cases) {
        rerender(
          <Badge dot tone={tone}>
            T
          </Badge>,
        );
        expect(dotOf(container)).toHaveClass(cls);
      }
    });

    it("keeps size behavior on the pill when a dot is present", () => {
      render(
        <Badge dot size="sm">
          T
        </Badge>,
      );
      expect(screen.getByText("T")).toHaveClass("px-2", "py-0.5");
    });

    it("keeps className behavior on the pill when a dot is present", () => {
      render(
        <Badge dot className="ml-4">
          T
        </Badge>,
      );
      expect(screen.getByText("T")).toHaveClass("ml-4", "rounded-full");
    });

    it("introduces no interactive behavior — pill and dot are plain spans", () => {
      const { container } = render(
        <Badge dot tone="success">
          Active
        </Badge>,
      );
      const pill = container.firstElementChild!;
      const dot = dotOf(container)!;
      for (const el of [pill, dot]) {
        expect(el.getAttribute("role")).toBeNull();
        expect(el.getAttribute("tabindex")).toBeNull();
        expect(el.getAttribute("href")).toBeNull();
        expect(el.tagName).toBe("SPAN");
      }
    });

    it("has no axe violations with a dot", async () => {
      const { container } = render(
        <Badge dot tone="warning">
          Attention
        </Badge>,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<Badge>New</Badge>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
