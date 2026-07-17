import { describe, it, expect } from "vitest";
import { render, screen } from "@test/render";
import { runA11yCheck } from "@test/a11y";
import { NavigationGroup } from "./NavigationGroup";
import { NavigationCollapsedContext } from "./NavigationItem";

describe("NavigationGroup", () => {
  describe("rendering", () => {
    it("renders its children", () => {
      render(<NavigationGroup>Body</NavigationGroup>);
      expect(screen.getByText("Body")).toBeInTheDocument();
    });

    it("renders its label when given and not collapsed", () => {
      render(<NavigationGroup label="Workspace">Body</NavigationGroup>);
      expect(screen.getByText("Workspace")).toBeInTheDocument();
    });
  });

  describe("state coverage", () => {
    it("omits the label entirely (not just visually) when collapsed — there's no room for it", () => {
      render(
        <NavigationGroup label="Workspace" collapsed>
          Body
        </NavigationGroup>,
      );
      expect(screen.queryByText("Workspace")).not.toBeInTheDocument();
    });

    it("defaults collapsed state from NavigationCollapsedContext when its own prop is omitted", () => {
      render(
        <NavigationCollapsedContext.Provider value={true}>
          <NavigationGroup label="Workspace">Body</NavigationGroup>
        </NavigationCollapsedContext.Provider>,
      );
      expect(screen.queryByText("Workspace")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(<NavigationGroup label="Workspace">Body</NavigationGroup>);
      expect(await runA11yCheck(container)).toHaveNoA11yViolations();
    });
  });
});
