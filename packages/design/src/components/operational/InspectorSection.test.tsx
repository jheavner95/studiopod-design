import { describe, it, expect, vi } from "vitest";
import { render, screen, userEvent } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { InspectorSection } from "./InspectorSection";
import { PropertySection } from "./PropertySection";

describe("InspectorSection", () => {
  describe("rendering", () => {
    it("renders its title and children", () => {
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.getByText("Identity")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("forwards className", () => {
      const { container } = render(
        <InspectorSection title="Identity" className="custom-section">
          <p>Body</p>
        </InspectorSection>,
      );
      expect(container.querySelector(".custom-section")).toBeInTheDocument();
    });
  });

  describe("collapsible behaviour", () => {
    it("is collapsible by default, exposing a disclosure trigger", () => {
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.getByRole("button", { name: /Identity/ })).toBeInTheDocument();
    });

    it("is open by default — common fields visible without a click", () => {
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.getByRole("button", { name: /Identity/ })).toHaveAttribute("aria-expanded", "true");
    });

    it("honours defaultOpen=false for advanced sections", () => {
      render(
        <InspectorSection title="Advanced" defaultOpen={false}>
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.getByRole("button", { name: /Advanced/ })).toHaveAttribute("aria-expanded", "false");
    });

    it("toggles on click", async () => {
      const user = userEvent.setup();
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      const trigger = screen.getByRole("button", { name: /Identity/ });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("toggles from the keyboard", async () => {
      const user = userEvent.setup();
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      const trigger = screen.getByRole("button", { name: /Identity/ });
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("supports controlled open state", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <InspectorSection title="Identity" open={false} onOpenChange={onOpenChange}>
          <p>Body</p>
        </InspectorSection>,
      );
      const trigger = screen.getByRole("button", { name: /Identity/ });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      // Controlled: clicking reports intent but does not self-open.
      await user.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      rerender(
        <InspectorSection title="Identity" open onOpenChange={onOpenChange}>
          <p>Body</p>
        </InspectorSection>,
      );
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    /**
     * DS-6.9C3A finding F1, pinned rather than hidden.
     *
     * The disclosure exposes `aria-expanded` (the REQUIRED half of the ARIA
     * disclosure pattern) but no `aria-controls` linking trigger to region —
     * the underlying `ui/Expandable` sets neither the attribute nor an id on
     * its content. `aria-controls` is a SHOULD in the disclosure pattern, not
     * a MUST, and axe raises no violation, so this is a refinement rather
     * than a defect. Fixing it belongs to `Expandable` — a stable `ui`
     * component outside this package's Inspector/Property scope.
     *
     * This test asserts the contract as it actually is. If `Expandable` later
     * gains `aria-controls`, this test fails and the improvement gets recorded
     * deliberately instead of drifting in unnoticed.
     */
    it("exposes aria-expanded, and today does NOT link the region via aria-controls", () => {
      render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      const trigger = screen.getByRole("button", { name: /Identity/ });
      expect(trigger).toHaveAttribute("aria-expanded");
      expect(trigger).not.toHaveAttribute("aria-controls");
    });
  });

  describe("non-collapsible mode", () => {
    it("renders a static section with no disclosure trigger", () => {
      render(
        <InspectorSection title="Identity" collapsible={false}>
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.queryByRole("button", { name: /Identity/ })).not.toBeInTheDocument();
      expect(screen.getByText("Identity")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("still renders content — content is never gated on collapsibility", () => {
      render(
        <InspectorSection title="Identity" collapsible={false} defaultOpen={false}>
          <p>Body</p>
        </InspectorSection>,
      );
      expect(screen.getByText("Body")).toBeInTheDocument();
    });
  });

  describe("re-export alias", () => {
    it("PropertySection is the same component as InspectorSection", () => {
      expect(PropertySection).toBe(InspectorSection);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations in either mode", async () => {
      const { container: collapsible } = render(
        <InspectorSection title="Identity">
          <p>Body</p>
        </InspectorSection>,
      );
      expect(await runA11yCheck(collapsible)).toHaveNoA11yViolations();
      const { container: staticSection } = render(
        <InspectorSection title="Identity" collapsible={false}>
          <p>Body</p>
        </InspectorSection>,
      );
      expect(await runA11yCheck(staticSection)).toHaveNoA11yViolations();
    });
  });
});
