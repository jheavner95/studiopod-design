import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { IdentityBlock } from "./IdentityBlock";

describe("IdentityBlock", () => {
  describe("rendering", () => {
    it("renders its required name", () => {
      render(<IdentityBlock name="Homepage banner" />);
      expect(screen.getByText("Homepage banner")).toBeInTheDocument();
    });

    it("renders icon, type, and status only when given", () => {
      const { rerender } = render(<IdentityBlock name="Homepage banner" />);
      expect(screen.queryByText("Artwork Project")).not.toBeInTheDocument();
      expect(screen.queryByText("Draft")).not.toBeInTheDocument();
      rerender(
        <IdentityBlock
          name="Homepage banner"
          icon={<span data-testid="icon">★</span>}
          type="Artwork Project"
          status={{ label: "Draft" }}
        />,
      );
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Artwork Project")).toBeInTheDocument();
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("defaults status tone to neutral when omitted", () => {
      render(<IdentityBlock name="Homepage banner" status={{ label: "Draft" }} />);
      expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it("never wraps onto multiple lines — no flex-wrap class, relying on the flex default of nowrap", () => {
      const { container } = render(<IdentityBlock name="Homepage banner" />);
      expect(container.firstElementChild).not.toHaveClass("flex-wrap");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations with every field present", async () => {
      const { container } = render(
        <IdentityBlock
          name="Homepage banner"
          icon={<span aria-hidden>★</span>}
          type="Artwork Project"
          status={{ label: "Draft", tone: "warning" }}
        />,
      );
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
