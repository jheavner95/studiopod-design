import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { Separator } from "./Separator";

describe("Separator", () => {
  describe("rendering", () => {
    it("renders a single rule element", () => {
      const { container } = render(<Separator className="my-separator" />);
      expect(container.querySelector(".my-separator")).toBeInTheDocument();
    });

    it("is decorative by default — no separator role exposed to assistive tech", () => {
      render(<Separator />);
      expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    });

    it("exposes role='separator' and aria-orientation when decorative is false", () => {
      render(<Separator decorative={false} />);
      expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    });
  });

  describe("state coverage", () => {
    it("defaults to a horizontal rule spanning full width", () => {
      render(<Separator decorative={false} />);
      expect(screen.getByRole("separator")).toHaveClass("h-px", "w-full");
    });

    it("renders a vertical rule spanning full height", () => {
      render(<Separator decorative={false} orientation="vertical" />);
      const el = screen.getByRole("separator");
      expect(el).toHaveClass("h-full", "w-px");
      expect(el).toHaveAttribute("aria-orientation", "vertical");
    });

    it("insets from both ends when inset is set, per orientation", () => {
      const { rerender } = render(<Separator decorative={false} inset />);
      expect(screen.getByRole("separator")).toHaveClass("mx-4");
      rerender(
        <Separator decorative={false} orientation="vertical" inset />,
      );
      expect(screen.getByRole("separator")).toHaveClass("my-4");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations when decorative", async () => {
      const { container } = render(<Separator />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });

    it("has no axe violations when semantic (decorative=false)", async () => {
      const { container } = render(<Separator decorative={false} />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
