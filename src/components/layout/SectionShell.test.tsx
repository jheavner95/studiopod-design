import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { SectionShell } from "./SectionShell";

describe("SectionShell", () => {
  describe("rendering", () => {
    it("renders as a <section> wrapping its children in a Container", () => {
      const { container } = render(<SectionShell>Body</SectionShell>);
      expect(container.querySelector("section")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("passes id through to the section element", () => {
      const { container } = render(<SectionShell id="pricing">Body</SectionShell>);
      expect(container.querySelector("section#pricing")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults to md vertical rhythm and a transparent background", () => {
      const { container } = render(<SectionShell>Body</SectionShell>);
      expect(container.querySelector("section")).toHaveClass("py-[var(--spacing-section-md)]", "bg-transparent");
    });

    it("supports every spacing and background value", () => {
      const { container, rerender } = render(
        <SectionShell spacing="xl" background="surface">
          Body
        </SectionShell>,
      );
      expect(container.querySelector("section")).toHaveClass("py-[var(--spacing-section-xl)]", "bg-surface");
      rerender(
        <SectionShell spacing="xs" background="raised">
          Body
        </SectionShell>,
      );
      expect(container.querySelector("section")).toHaveClass("py-[var(--spacing-section-xs)]", "bg-canvas-raised");
    });

    it("adds a top border only when divider is set", () => {
      const { container, rerender } = render(<SectionShell>Body</SectionShell>);
      expect(container.querySelector("section")).not.toHaveClass("border-t");
      rerender(<SectionShell divider>Body</SectionShell>);
      expect(container.querySelector("section")).toHaveClass("border-t");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<SectionShell>Body</SectionShell>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
