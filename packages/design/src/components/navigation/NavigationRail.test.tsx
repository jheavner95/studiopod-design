import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { NavigationRail, type NavigationRailItemDef } from "./NavigationRail";

const ITEMS: NavigationRailItemDef[] = [
  { id: "overview", label: "Overview", href: "/overview" },
  { id: "settings", label: "Settings", href: "/settings" },
];

describe("NavigationRail", () => {
  describe("rendering", () => {
    it("renders every item's label", () => {
      render(<NavigationRail items={ITEMS} />);
      expect(screen.getByText("Overview")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("marks the item matching activeId as current when scrollSpy is off — DS-5E fix, previously nothing was ever marked active in plain href mode", () => {
      render(<NavigationRail items={ITEMS} activeId="settings" />);
      expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
    });

    it("marks nothing active when activeId is omitted, matching prior behavior", () => {
      render(<NavigationRail items={ITEMS} />);
      expect(screen.getByRole("link", { name: "Overview" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Settings" })).not.toHaveAttribute("aria-current");
    });

    it("links each item to a hash anchor when scrollSpy is on, and to its own href otherwise", () => {
      const { rerender } = render(<NavigationRail items={ITEMS} scrollSpy />);
      expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "#overview");
      rerender(<NavigationRail items={ITEMS} />);
      expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/overview");
    });

    it("ignores the activeId prop while scrollSpy is on — the observer owns activeId in that mode", () => {
      render(<NavigationRail items={ITEMS} scrollSpy activeId="settings" />);
      // scrollSpy's own initial state defaults active to the first item, not the passed activeId.
      expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<NavigationRail items={ITEMS} activeId="overview" />);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
