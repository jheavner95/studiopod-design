import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorHeader } from "./InspectorHeader";

describe("InspectorHeader", () => {
  describe("rendering", () => {
    it("renders the name — the one required prop", () => {
      render(<InspectorHeader name="Hero Image" />);
      expect(screen.getByText("Hero Image")).toBeInTheDocument();
    });

    it("renders the optional type alongside the name", () => {
      render(<InspectorHeader name="Hero Image" type="Asset" />);
      expect(screen.getByText("Asset")).toBeInTheDocument();
    });

    it("renders the optional status label", () => {
      render(<InspectorHeader name="Hero Image" status={{ label: "Published", tone: "success" }} />);
      expect(screen.getByText("Published")).toBeInTheDocument();
    });

    it("renders the optional icon", () => {
      render(<InspectorHeader name="Hero Image" icon={<span data-testid="icon">◆</span>} />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("accepts a ReactNode name — needed for multi-select headers like '3 Selected'", () => {
      render(<InspectorHeader name={<strong>3 Selected</strong>} />);
      expect(screen.getByText("3 Selected").tagName).toBe("STRONG");
    });

    it("forwards className", () => {
      const { container } = render(<InspectorHeader name="Hero Image" className="custom-header" />);
      expect(container.querySelector(".custom-header")).toBeInTheDocument();
    });

    it("stays sticky at the top of the panel's scroll area", () => {
      const { container } = render(<InspectorHeader name="Hero Image" />);
      expect(container.firstElementChild).toHaveClass("sticky", "top-0");
    });
  });

  describe("dismiss affordance", () => {
    /**
     * DS-6.9C1 reported this affordance as missing; DS-6.9C2 corrected that.
     * It exists, it is a real button, and it is labelled "Close inspector" —
     * only the PROP name (`onCollapse`) reads as collapse rather than dismiss.
     * These tests pin the behaviour so the correction cannot silently regress.
     */
    it("renders no dismiss control when onCollapse is omitted", () => {
      render(<InspectorHeader name="Hero Image" />);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders a labelled close button when onCollapse is given", () => {
      render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(screen.getByRole("button", { name: "Close inspector" })).toBeInTheDocument();
    });

    it("calls onCollapse on click", async () => {
      const onCollapse = vi.fn();
      const user = userEvent.setup();
      render(<InspectorHeader name="Hero Image" onCollapse={onCollapse} />);
      await user.click(screen.getByRole("button", { name: "Close inspector" }));
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });

    it("is keyboard reachable and activates on Enter and Space", async () => {
      const onCollapse = vi.fn();
      const user = userEvent.setup();
      render(<InspectorHeader name="Hero Image" onCollapse={onCollapse} />);
      await user.tab();
      expect(screen.getByRole("button", { name: "Close inspector" })).toHaveFocus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");
      expect(onCollapse).toHaveBeenCalledTimes(2);
    });

    it("is a type=button so it never submits a surrounding form", () => {
      render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(screen.getByRole("button", { name: "Close inspector" })).toHaveAttribute("type", "button");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations, with and without the dismiss control", async () => {
      const { container: plain } = render(<InspectorHeader name="Hero Image" type="Asset" />);
      expect(await runA11yCheck(plain)).toHaveNoA11yViolations();
      const { container: closable } = render(<InspectorHeader name="Hero Image" onCollapse={() => {}} />);
      expect(await runA11yCheck(closable)).toHaveNoA11yViolations();
    });
  });
});
