import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { NavigationSection } from "./NavigationSection";

describe("NavigationSection", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<NavigationSection>Body</NavigationSection>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders its title as visible text when given", () => {
      render(<NavigationSection title="Settings">Body</NavigationSection>);
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("is its own nav landmark, named by title", () => {
      render(<NavigationSection title="Settings">Body</NavigationSection>);
      expect(screen.getByRole("navigation", { name: "Settings" })).toBeInTheDocument();
    });

    it("aria-label overrides title as the landmark's accessible name when both are given", () => {
      render(
        <NavigationSection title="Settings" aria-label="Account settings">
          Body
        </NavigationSection>,
      );
      expect(screen.getByRole("navigation", { name: "Account settings" })).toBeInTheDocument();
      expect(screen.queryByRole("navigation", { name: "Settings" })).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<NavigationSection title="Settings">Body</NavigationSection>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
